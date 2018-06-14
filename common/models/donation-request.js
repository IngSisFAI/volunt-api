/* eslint-disable max-len */
'use strict';

var app = require('../../server/server');
const debug = require('debug')('info');

const moment = require('moment');

// agregar el control de la OS

module.exports = function(DonationRequest) {
  // Disable related model relations "product"
  DonationRequest.disableRemoteMethodByName(
    'prototype.__get__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__create__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__delete__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__update__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__destroy__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__findById__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__count__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__createById__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__deleteById__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__updateById__product');
  DonationRequest.disableRemoteMethodByName(
    'prototype.__destroyById__product');

  // el ctx posee la instancia que esta siendo creada
  // el res posee el json que se creo, se usa en afterremote
  // el next se coloca para que siga y que realmente paso los controles para insertar
  DonationRequest.beforeRemote('create', function(ctx, res, next) {
    var error = new Error();
    var exp = moment(ctx.req.body.expirationDate);

    // hay que controlar primero que el usuario que hace este pedido sea una organizacion social
    // eso se haria dentro del validations del .json

    // aca entran todos los pedidos, ya sean permanentes o particulares
    // sin embargo hay que saber que hay diferencias entre ambos, ya que no nos importan
    // los mismos atributos.

    // en ambos casos la fecha de creación no se va a mostrar al usuario y debemos colocarle la fecha actual siempre
    ctx.req.body.creationDate = moment();

    // idem el isopen, debe ser true, que significa abierta...
    ctx.req.body.isOpen = true;

    // debo controlar que el productoid ingresado sea valido, es decir, este dentro del modelo productos

    var product = app.models.Product;
    product.findById(ctx.req.body.productId, function(err, producto) {
      if (err || producto == null) {
        error.message = 'No se encontró el producto';
        error.status = 400;
        next(error);
      } else {
        // si se encontro el producto
        debug('el producto se encontro y es', producto.id);
        // next();
        // luego debemos ver que la organizacionId que viene exista
        var org = app.models.Organization;
        org.findById(ctx.req.body.organizationId, function(err, organizacion) {
          if (err || !organizacion) {
            error.message = 'No se encontró la organizacion';
            error.status = 400;
            next(error);
          } else {
            // si se encontro la organizacion
            debug('la organizacion se encontro y es', organizacion.id);
            // next();

            // luego lo mas importante es saber si se esta creando un pedido permanente o particular
            // eso viene definido como true en la propiedad isPermanent

            if (ctx.req.body.isPermanent) {
              // es un pedido permanente con lo que amount debe ser nulo
              ctx.req.body.amount = null;
              ctx.req.body.promised = 0;
              // covered debe iniciar en 0 y se va sumando a medida que van donando
              ctx.req.body.covered = 0;

              // controlo que la fecha de expiracion sea valida y a su vez mayor, en al menos 30 dias a la fecha de creacion
              if (exp.isValid() && exp.isAfter(moment().add(30, 'days'), 'day')) {
                debug('La fecha de expiracion es correcta');
                next();
              } else {
                error.message = 'La fecha de expiracion debe ser al menos 30 dias mayor';
                error.status = 404;
                next(error);
              }
            } else {
              // es un pedido particular
              // controlo que la cantidad ingresada sea mayor a 0
              debug(ctx.req.body);
              if (ctx.req.body.amount > 0) {
                debug('La cantidad es mayor a 0');
                // next();
              } else {
                error.message = 'La cantidad debe obligatoriamente ser mayor a 0';
                error.status = 404;
                next(error);
              }

              // controlo que la fecha de expiracion sea valida y a su vez mayor, en al menos 2 dias a la fecha de creacion
              if (exp.isValid() && exp.isAfter(moment().add(2, 'days'), 'day')) {
                debug('La fecha de expiracion es correcta');
                next();
              } else {
                error.message = 'La fecha de expiracion debe ser al menos 2 dias mayor';
                error.status = 404;
                next(error);
              }
            }// del else de isPermanent
          }// de la organizacion
        }); // tmb de la organizacion
      }// del producto
    }); // tmb del producto
  });

  DonationRequest.beforeRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      var error = new Error();
      var cre;
      debug(ctx.req.params.id);

      // para ambos donationrequest se va a hacer una parte similar que es la siguiente
      DonationRequest.findById(ctx.req.params.id, function(err, onetime) {
        if (err) {
          error.message = 'Hubo un error desconocido en encontrar el onetime';
          error.status = 400;
          next(err);
        } else {
          // si se encontro el pedido determino que se puede modificar solo el
          // expirationDate y amount, por lo que los otros valores los seteo a lo que tenia antes...
          if (!onetime) {
            // es true con nulo, undefined, false y 0
            error.message = 'No se encuentra el  pedido de donacion';
            error.status = 404;
            next(error);
          } else {
            debug('el pedido es:', onetime);
            // amount aca lo coloco igual que el que ya tenia antes de modificar,
            // pero luego si no es permanente
            // lo voy a dejar que se cambie
            ctx.req.body.amount = onetime.amount;
            ctx.req.body.covered = onetime.covered;
            ctx.req.body.promised = onetime.promised;
            ctx.req.body.creationDate = onetime.creationDate;
            ctx.req.body.productId = onetime.productId;
            ctx.req.body.isPermanent = onetime.isPermanent;
            cre = moment(onetime.creationDate);

            debug('el cre adentro, que lo modificado es:', cre);

            var exp = moment(ctx.req.body.expirationDate);
            debug('La fecha de expiracion', exp);
            // busco cual era la creationDate
            debug('La fecha de creacion ', cre);

            // ahora lo diferente si es permanente o particular
            if (ctx.req.body.isPermanent) {
              // es un pedido permanente

              // si cambia el isopen a cerrado, estaria bien...

              // vuelvo a controlar que la expirationDate modificada sea valida
              // y a su vez mayor, en al menos 30 dias a la fecha de creacion

              if (exp.isValid() && exp.isAfter(cre.add(30, 'days'), 'day')) {
                debug('La fecha de expiracion ', exp);
                next();
              } else {
                error.message = 'La fecha de expiracion =+30 a la fecha de creacion';
                error.status = 404;
                next(error);
              }
            } else {
              // es  un pedido particular

              // vuelvo a controlar que la expirationDate modificada sea valida
              // y a su vez mayor, en al menos 2 dias a la fecha de creacion

              if (exp.isValid() && exp.isAfter(cre.add(2, 'days'), 'day')) {
                debug('La fecha de expiracion ', exp);
                // next();
              } else {
                error.message = 'La fecha de expiracion =+2 a la fecha de creacion';
                error.status = 404;
                next(error);
              }

              // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              // si cambia el isopen a cerrado, que hacemos?????
              // lo dejamos por mas que tenga respuestas???
              // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

              // ahora controlo que la cantidad sea mayor a lo covered, sino queda inconsistente
              if (ctx.req.body.amount > ctx.req.body.covered) {
                debug('La cantidad es mayor a covered');
                next();
              } else {
                error.message = 'La cantidad debe ser mayor a lo cubierto';
                error.status = 404;
                next(error);
              }
            }
          }
        }
      });
    });

  DonationRequest.beforeRemote('deleteById',
    function(ctx, res, next) {
      var error = new Error();

      // me fijo que el id del DonationRequest exista
      DonationRequest.findById(ctx.req.params.id, function(err, onetime) {
        if (err) {
          error.message = 'No se encontró el pedido de donacion';
          error.status = 400;
          next(error);
        } else {
          // si se encontro el pedido determino que se puede modificar solo el
          // expirationDate y amount, por lo que los otros valores los seteo a lo que tenia antes...
          if (!onetime) {
            error.message = 'No se encontro el pedido de donacion';
            error.status = 404;
            next(error);
          } else {
            // debo ver que ese pedido de donacion no tenga donaciones efectuadas(donationresponse),
            // si es asi no se debe permitir borrar
            var donationresponse = app.models.DonationResponse;
            donationresponse.findOne({where: {donationRequestId: ctx.req.params.id}},
              function(err, donres) {
                if (err) {
                  debug(donres);
                  error.message = 'Hubo un error en buscar respuestaDonaciones';
                  error.status = 404;
                  next(error);
                } else {
                  if (!donres) {
                    debug('no encontro una respuesta para ese pedido, se puede borrar');
                    // error.message = 'no es error';
                    // error.status = 400;
                    next();
                  } else {
                    error.message = 'Hubo un error en buscar respuestaDonaciones';
                    error.status = 400;
                    next(error);
                  }
                }
              });
          }
        }
      });
    });

// el pedido no se cierra solo hay que hacer un endpoint para cerrarlo

  DonationRequest.remoteMethod('closeRequest', {
    accepts: [{
      arg: 'id',
      type: 'string',
      required: true,
    },
    {
      arg: 'data',
      type: 'object',
      required: true,
      http: {source: 'body'},
    }],
    http: {
      'verb': 'POST',
      'path': '/:id/closeRequest',
    },
    returns: {},
  });

  DonationRequest.closeRequest = function(id, data, cb) {
    // var donresp = app.models.DonationResponse;
    var error = new Error();
    DonationRequest.findOne({
      where: {id: id},
    }, function(err, donreq) {
      if (err) {
        error.message = 'No se encuentra el pedido de donacion';
        error.status = 400;
        cb(error);
      } else {
        debug('el json tiene:', donreq);
        // es true con nulo, undefined, false y 0
        if (!donreq) {
          error.message = 'No existe el pedido de donacion ';
          error.status = 400;
          cb(error);
        } else {
          // aca debemos solo cambiar el isopen a false
          donreq.isOpen = false;

          donreq.save();
          debug('llego hasta aca...');

          cb();
        }
      }
    });// del function y find
  };
};// ultimo
