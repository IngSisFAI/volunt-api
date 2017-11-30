'use strict'

var app = require('../../server/server');

const moment = require('moment');
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

      // hay que controlar primero que el usuario que hace este pedido sea una organizacion social
      // eso se haria dentro del validations del .json

      // la fecha de creación no se va a mostrar al usuario y debemos colocarle la fecha actual siempre
    ctx.req.body.creationDate = moment();

      // controlo que la cantidad ingresada sea mayor a 0
    console.log(ctx.req.body);
    if (ctx.req.body.ammount > 0) {
      console.log('La cantidad es mayor a 0');
        // next();
    } else {
      error.message = 'La cantidad debe obligatoriamente ser mayor a 0';
      error.status = 400;
      next(error);
    }

      // controlo que la fecha de expiracion sea valida y a su vez mayor, en al menos 2 dias a la fecha de creacion
    var exp = moment(ctx.req.body.expirationDate);
    if (exp.isValid() && exp.isAfter(moment().add(2, 'days'), 'day')) {
      console.log('La fecha de expiracion es correcta');
        // next();
    } else {
      error.message = 'La fecha de expiracion debe ser al menos 2 dias mayor';
      error.status = 400;
      next(error);
    }

      // por ultimo debo controlar que el productoid ingresado sea valido, es decir, este dentro del modelo productos

    var product = app.models.Product;
    product.findById(ctx.req.body.productId, function(err, producto) {
      if (err || producto == null) {
        error.message = 'No se encontró el producto';
        error.status = 404;
        next(error);
      } else {
          // si se encontro el producto
        console.log('el producto se encontro y es', producto.id);
        next();
      };
    });
  });

  DonationRequest.beforeRemote('prototype.patchAttributes',
      function(ctx, res, next) {
        var error = new Error();
        // console.log(ctx.req.body);
        DonationRequest.findById(ctx.req.body.id, function(err, onetime) {
          if (err) {
            error.message = 'Hubo un error desconocido';
            error.status = 404;
            next(err);
          } else {
            // si se encontro el pedido determino que se puede modificar solo el
            // expirationDate y ammount, por lo que los otros valores los seteo a lo que tenia antes...
            if  (onetime == null) {
              error.message = 'No tengo pedido de donacion';
              error.status = 400;
              next(error);
            } else {
              console.log('el covered es:');
              console.log(onetime.covered);
              ctx.req.body.covered = onetime.covered;
              ctx.req.body.promised = onetime.promised;
              ctx.req.body.creationDate = onetime.creationDate;
              ctx.req.body.productId = onetime.productId;
            }
          }
        });

        // ahora controlo los dos datos modificables
        // vuelvo a controlar que la expirationDate modificada sea valida
        // y a su vez mayor, en al menos 2 dias a la fecha de creacion
        var exp = moment(ctx.req.body.expirationDate);

        // busco cual era la creationDate
        var cre = moment(ctx.req.body.creationDate);

        if (exp.isValid() && exp.isAfter(cre.add(2, 'days'), 'day')) {
          console.log('La fecha de expiracion es correcta');
          // next();
        } else {
          error.message = 'La fecha de expiracion =+2 a la fecha de creacion';
          error.status = 400;
          next(error);
        }

        // ahora controlo que la cantidad sea mayor a lo covered, sino queda inconsistente
        if (ctx.req.body.ammount > ctx.req.body.covered) {
          console.log('La cantidad es mayor a covered');
          next();
        } else {
          error.message = 'La cantidad debe ser mayor a lo cubierto';
          error.status = 400;
          next(error);
        }
      });

  DonationRequest.beforeRemote('deleteById',
      function(ctx, res, next) {
        var error = new Error();
        console.log(ctx.req.body.id);
        // me fijo que el id del DonationRequest exista
        DonationRequest.findById(ctx.req.body.id, function(err, onetime) {
          if (err) {
            error.message = 'No se encontró el pedido de donacion';
            error.status = 404;
            next(error);
          } else {
            // si se encontro el pedido determino que se puede modificar solo el
            // expirationDate y ammount, por lo que los otros valores los seteo a lo que tenia antes...
            if  (onetime == null) {
              error.message = 'No tengo pedido de donacion';
              error.status = 400;
              next(error);
            }
          }
          // debo ver que ese pedido de donacion no tenga donaciones efectuadas(donationresponse),
          // si es asi no se debe permitir borrar
          var donationresponse = app.models.DonationResponse;
          donationresponse.findOne({where: {donationRequestId: ctx.req.body.id}},
            function(err, donres) {
              if (err) {
                console.log(donres);
                error.message = 'Hubo un error en buscar respuestaDonaciones';
                error.status = 404;
                next(error);
              } else {
                if (donres == null) {
                  console.log('no encontro una respuesta para ese pedido, se puede borrar');
                  error.message = 'no es error';
                  error.status = 400;
                  next(error);// despues cambiar a next()
                } else {
                  error.message = 'Hubo un error en buscar respuestaDonaciones';
                  error.status = 400;
                  next(error);
                }
              }
            });
        });
      });
};
