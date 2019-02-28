/* eslint-disable max-len */
'use strict';

let app = require('../../server/server');
const debug = require('debug')('info');

const moment = require('moment');

module.exports = function(DonationResponse) {
  DonationResponse.disableRemoteMethodByName(
    'prototype.__get__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__create__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__delete__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__update__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__destroy__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__findById__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__count__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__createById__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__deleteById__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__updateById__donationRequest');
  DonationResponse.disableRemoteMethodByName(
    'prototype.__destroyById__donationRequest');

  // Desabilitamos el PATCH  Rest de las respuestas de donaciones!
  DonationResponse.disableRemoteMethodByName(
    'prototype.updateAttributes');

//  "creationDate": "2017-12-05T12:01:01.521Z",
//    "amount": 0,
//    "alreadyDelivered": false,
//    "id": "string",
//    "donationRequestId": "string",
//    "donnerId": "string"

  DonationResponse.beforeRemote('create', function(ctx, res, next) {
    let error = new Error();

    // la fecha de creación no se va a mostrar al usuario y
    // debemos colocarle la fecha actual siempre
    ctx.req.body.creationDate = moment();

    // ahora debería verificar que existe el pedido de donación asociado
    // es decir el donation request
    let donationreq = app.models.DonationRequest;
    debug('el donationRequestid que viene es:' + ctx.req.body.donationRequestId);
    donationreq.findById(ctx.req.body.donationRequestId, function(err, donreq) {
      if (err) {
        error.message = 'No se encontró el pedido de donacion';
        error.status = 400;
        next(error);
      } else {
        // se encontro el pedido
        // next();

        // me fijo si el donador existe donnerId esValido
        let donador = app.models.Donner;
        donador.findById(ctx.req.body.donnerId, function(err, donadorrest) {
          if (err) {
            error.message = 'No se encontró el donador';
            error.status = 400;
            next(error);
          } else {
            // se encontro el donador asi que seguimos
            debug('Se encontro el donador');
            // ahora debemos ver que no haya expirado el pedido
            let exp = moment(donreq.expirationDate);
            if (exp.isValid() && exp.isSameOrAfter(moment())) {
              // la fecha de expiracion es igual o mayor a la fecha actual

              if (!donreq.isOpen) {
                // el pedido de donacion ya estaba cerrado...
                // esto pudo haber pasado porque una OS lo cerro unilaterlamente
                // o porque covered fue ya igual a lo donado (ammount)
                error.message = 'El pedido de donación se encuentra cerrado';
                error.status = 404;
                next(error);
              } else {
                // el isopen es true por lo que el pedido esta abierto todavia

                // solo controlo que la cantidad sea mayor a 0
                // el amount de la respuesta (donationrequest)
                // debe ser mayor a 0.. el productoId
                if (ctx.req.body.amount > 0) {
                  debug('La cantidad es mayor a 0');
                  next();
                } else {
                  error.message = 'La cantidad debe ser mayor a 0';
                  error.status = 404;
                  next(error);
                }
              }// de isopen
            } else {
              // error porque la fecha de expiracion ya expiro por lo que el
              // pedido ya no es valido
              error.message = 'El pedido de donacion ya no es válido';
              error.status = 404;
              next(error);
            }
          }
        });// de se encontro el donador
      }
    });// de se encontro el pedido
  });

  DonationResponse.afterRemote('create', function(ctx, res, next) {
    let error = new Error();

    // aca debemos primero buscar nuevamente el donationrequest al cual
    // se dono para cambiar el promised

    // como ya sabemos que estaria todo bien,
    // lo que tratamos de buscar es todas las instancias necesitadas

    // buscamos las donaciones request
    // let donationreq = app.models.DonationRequest;
    // despues debemos buscar el nombre del producto que se dono
    // let prod = app.models.Product;
    // tambien el email de la organizacion social
    // let org = app.models.Organization;
    // tambien el nombre y apellido del donador
    // let don = app.models.Donner;
    // User.find({include: ['posts', 'orders']}, function() { /* ... */ });

    debug('res tiene:' + res.donationRequestId);

    let donresp = app.models.DonationResponse;

    donresp.find({
      where: {id: res.id},
      include: {
        relation: 'donationRequest',
        scope: {
          include: ['product'],
        },
      },
    },  function(err, resultados) {
      if (err) {
        error.message = 'No encuentra la respuesta a donación.';
        error.status = 400;
        next(error);
      } else {
        resultados.forEach(function(post) {
          let p = post.toJSON();
          debug(p.donationRequest);

          // como no se como recuperar toda la instancia de donner y de organization
          // desde la consulta de arriba,lo hago de a uno...

          // busco el donador que esta en donnerId de res para conseguir
          // su nombre y apellido
          let don = app.models.Donner;
          don.findById(res.donnerId, function(err, donador) {
            if (err) {
              error.message = 'No se encontró el donador';
              error.status = 400;
              next(error);
            } else {
              // se encontro el donador asi que seguimos

              debug('el donador es:' + donador.name + ', ' + donador.lastName);

              // busco tambien el email de la organizacion social
              debug('la OS que viene en el json es: ' + p.donationRequest.organizationId);
              let org = app.models.Organization;
              org.findById(p.donationRequest.organizationId, function(err, organizacion) {
                let cuerpomail = '';

                if (err) {
                  error.message = 'No se encontró la OS que genero el pedido de donacion';
                  error.status = 400;
                  next(error);
                } else {
                  // se encontro la OS del pedido de donacion
                  debug('la OS es: ' + organizacion.email);

                  let cantidadadonar = res.amount;// ya sabiamos que era mayor a 0
                  let cantidadyacubierta = p.donationRequest.covered;

                  // esto se va a realizar solo si el pedido es particular
                  if (!p.donationRequest.isPermanent) {
                    // es un pedido particular
                    // ahora viene toda la parte de controlar las cantidades
                    // con lo que tiene el pedido de donacion....
                    // defini variables nuevas para dar mas semantica...sino no se
                    // entiende nada

                    let cantidadrequerida = p.donationRequest.amount;

                    // promised se modifica siempre...
                    // lo que nose toca es covered, eso lo hace donationrequest
                    // cantidadadonar = res.amount;// ya sabiamos que era mayor a 0

                    let cantidadfaltante = cantidadrequerida - cantidadyacubierta;

                    if (cantidadadonar >= cantidadfaltante) {
                      // no se debe cerrar el pedido por mas que que se haya cumplido
                      // con lo solicitado
                      // se debe sumar a cantidadyacubierta + cantidadadonar
                      p.donationRequest.promised = cantidadrequerida;

                      // p.donationRequest.status = false;

                      cuerpomail = 'El donador ' + donador.name + ', ' + donador.lastName + ' donó ' +
                        'la cantidad de productos solicitada, por lo que el pedido debe ser cerrado. Ud' +
                        'puede volver a abrilo en caso que el donador no cumpla con lo pactado';
                    } else {
                      // todavia el pedido queda abierto ya que no se cubrio la
                      // cantidad solicitada
                      p.donationRequest.promised = p.donationRequest.promised + cantidadadonar;

                      cuerpomail = 'El donador ' + donador.name + ', ' + donador.lastName + ' donó ' +
                        'la cantidad de ' + cantidadadonar + ' de productos. El pedido sigue ' +
                        'abierto ya que todavía no se cumplió la cantidad solicitada';
                    }// del else de cantidades
                  } else {
                    // si es permanente
                    // modificamos lo cubierto... no usa promised
                    p.donationRequest.promised = p.donationRequest.promised + cantidadadonar;

                    cuerpomail = 'El donador ' + donador.name + ', ' + donador.lastName + ' donó ' +
                      'la cantidad de ' + cantidadadonar + ' de productos a un pedido permanente ' +
                      'solicitado por Ud';
                  }

                    // ahora debo modificar el donationRequest para que refleje los
                    // cambios en las cantidades

                 // debug('lo que tengo ahora en el donationrequest es : ' +  p.donationRequest.toString());
                  debug('el mail dice: ' + cuerpomail);
                  let pedido = app.models.DonationRequest;
                  pedido.upsert(p.donationRequest, function(err, resp) {
                    if (err) {
                      error.message = 'No actualizo el pedido de donacion';
                      error.status = 404;
                      next(error);
                    } else {
                      // si funciono todo bien, mando mail
                      debug('funciono, lo que voy a guardar es lo mismo con isopen : ' +  p.donationRequest.isOpen);
                      let mail = {
                        to: organizacion.email,
                        from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
                        subject: 'Nueva Respuesta a Pedido de Donación',
                        html: cuerpomail};

                      DonationResponse.app.models.Email.send(mail,
                        function(err) {
                          if (err)
                            // throw err;
                            debug('ERROR AL ENVIAR EL EMAIL');
                          else
                        debug('> sending email to:', organizacion.email);
                        });
                      next();
                    }
                  });// de la actualizacion
                }// del else de la OS
              }); // idem de la OS
            }// del else del donner
          });// del donner
        });// siempre es uno solo? viene del foreach
      };// del else
    });
  });

  DonationResponse.remoteMethod('cancel', {
    accepts: [{
      arg: 'id',
      type: 'string',
      required: true,
    }],
    http: {
      'verb': 'POST',
      'path': '/:id/cancel',
    },
    returns: {},
  });

  DonationResponse.cancel = function(id, cb) {
    let error = new Error();

      // me fijo que el id del DonationResponse exista
    DonationResponse.findById(id, function(err, donationResponse) {
      if (err) {
        error.message = 'No se encontró la respuesta a la donacion';
        error.status = 400;
        cb(error);
      } else {
          // si se encontro la respuesta  determino que se puede modificar solo el isCanceled.
        if (!donationResponse) {
          error.message = 'No se encontro ningun pedido de donacion con ese id';
          error.status = 404;
          cb(error);
        } else {
          // Una vez que ya tengo el donationResponse, le actualizo solo el isCanceled a true.
          donationResponse.isCanceled = true;

          // ademas debo buscar el donation request y restarle la cantidad que habia
          // querido donar a promised.
          let donrequest = app.models.DonationRequest;

          donrequest.findById(donationResponse.donationRequestId, function(err, donreq) {
            if (err) {
              error.message = 'No se encontró el requerimiento de  donacion';
              error.status = 400;
              cb(error);
            } else {
              console.log('Found request: ', donreq);
              if (donreq) {
                donreq.promised = donreq.promised - donationResponse.amount;

              // guardo las dos cosas....
                donationResponse.save();
                donreq.save();
                console.log(donationResponse.donner());
                let cuerpomail = 'El donador ' + donationResponse.donner.name + ', ' +
                    donationResponse.donner.lastName + ' canceló ' +
                    'un pedido de donacion que habia realizado a una publicacion de ' +
                    donreq.product.name + ' de su organizacion.';

                let mail = {
                  to: donreq.organization.email,
                  from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
                  subject: 'Cancelacion de un Pedido de Donación',
                  html: cuerpomail,
                };

                DonationResponse.app.models.Email.send(mail,
                    function(err) {
                      if (err)
                        debug('ERROR AL ENVIAR EL EMAIL');
                      else
                        console.log('> sending email to:', donationResponse.donationRequest.organizacion.email);
                    });

                  // retornamos el mensaje de exito.

                cb(null, 'Eliminacion correcta de la respuesta de donacion');
              }
            }
          });
        }
      }
    });
  };

  DonationResponse.remoteMethod('donationArrival', {
    accepts: [{
      arg: 'id',
      type: 'string',
      required: true,
    }],
    http: {
      'verb': 'POST',
      'path': '/:id/donationArrival',
    },
    returns: {},
  });

  DonationResponse.donationArrival = function(id, cb) {
   // let donresp = app.models.DonationResponse;
    let error = new Error();
    DonationResponse.findOne({
      where: {id: id},
      include: {
        relation: 'donationRequest',
      },
    }, function(err, donres) {
      if (err) {
        error.message = 'No se encuentra la respuesta a donacion';
        error.status = 400;
        cb(error);
      } else {
        debug('resultados tiene:', donres);
        // es true con nulo, undefined, false y 0
        if (!donres) {
          error.message = 'No existe la respuesta a donacion ';
          error.status = 400;
          cb(error);
        } else {
          // resultados.forEach(function(post) {
         // let p = donres.toJSON();
          // aca debo pasar de el alreadyDelivered a true en donationresponse y
          // en donation request debo restar del promised y sumar al covered

          let amount = donres.amount;

          donres.alreadyDelivered = true;
         // si entrego menos de lo que se tenia en promised hay que cambiarlo

          DonationResponse.app.models.DonationRequest.findById(donres.donationRequest().id)
            .then((request)=>{
              request.promised = request.promised - amount;
              request.covered = request + amount;
              request.save();
            });

          donres.amount = amount;
          // no se cambia el isopen de donationrequest...

          donres.save();
          debug('llego hasta aca...');
          cb();
        }
      }
    });// del function y find
  };
};

// el pedido no se cierra solo hay que hacer un endpoint para cerrarlo

