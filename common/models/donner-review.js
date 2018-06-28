/* eslint-disable max-len */

'use strict';

var app = require('../../server/server');
const debug = require('debug')('info');


const moment = require('moment');

module.exports = function(Donnerreview) {
  Donnerreview.disableRemoteMethodByName(
    'prototype.__get__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__create__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__delete__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__update__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__destroy__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__findById__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__count__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__createById__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__deleteById__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__updateById__reviewedResponse');
  Donnerreview.disableRemoteMethodByName(
    'prototype.__destroyById__reviewedResponse');

  // es la evaluacion que realiza una organizacion sobre una respuesta a donacion
  // realizada por un donador.
  //  Es decir la OS califica la respuesta de un donador...

  Donnerreview.beforeRemote('create', function(ctx, res, next) {
    var error = new Error();

    // deberia  verificar que la organizacion exista
    var org = app.models.Organization;
    org.findById(ctx.req.body.organizationId, function(err, organizacion) {
      if (err) {
        error.message = 'No se encontró la OS que esta generando el review';
        error.status = 400;
        next(error);
      } else {
        // se encontro la OS que esta haciendo el review
        // ahora me fijo que el donationResponse que va a calificar exista y que haya sido esa
        // OS la que genero el requerimiento

        var donresp = app.models.DonationResponse;

        donresp.findOne({
          where: {id: ctx.req.body.reviewedResponseId},
          include: {
            relation: 'donationRequest',
          },
        }, function(err, resultados) {
          if (err) {
            error.message = 'No se encuentra la respuesta a donacion';
            error.status = 400;
            next(error);
          } else {
            debug('resultados tiene:', resultados);
            // es true con nulo, undefined, false y 0
            if (resultados.length === 0) {
              error.message = 'No existe la respuesta a donacion que se quiere calificar';
              error.status = 400;
              next(error);
            } else {
              // resultados.forEach(function(post) {
              var p = resultados.toJSON();

              debug('el json tiene donationresponse con donationrequest es:', p);

              // primero ver que no exista ya una calificacion... es decir
              // que no haya ya sido calificado  el donador
              // esto se hace buscando si el donationresponse
              // tiene como indefinido el valor de donnerRewiewId

              debug('el review tiene: ', p.donnerReviewId);
              if (p.donnerReviewId) {
                // no estaria funcionando porque ese valor no se cambia...
                // lo tendre que hacer yo?
                error.message = 'Ya se ha calificado esa respuesta a donacion.';
                error.status = 404;
                next(error);
              } else {
                // esta bien, no ha sido calificada sigo

                // verifico que la organizacion que hizo el pedido de donacion sea la misma que ahora quiere
                // calificar al donador
                if (p.donationRequest.organizationId == ctx.req.body.organizationId) {
                    // esta bien
                  debug('todo ok..');
                  next();
                } else {
                  error.message = 'Se esta calificando un pedido no generado por esa OS';
                  error.status = 404;
                  next(error);
                }
              }// del else de ya esta calificada
              // });// del for each
            }// del else
          }// del else de resultados
        });// del function y find
      }// del else
    });// del find byid
  });

  Donnerreview.afterRemote('create', function(ctx, res, next) {
    var error = new Error();
    // deberia enviar un mail al donador para avisarle que un OS califico su respuesta
    // a donacion... por lo que deberia desde donnerreview ir a donationresponse
    // y de ahi recuperar el donner para conocer su mail
    var donresp = app.models.DonationResponse;

    donresp.findOne({
      where: {id: res.reviewedResponseId},
      include: {
        relation: 'donner',
      },
    }, function(err, resultados) {
      if (err) {
        error.message = 'No se encuentra la respuesta a donacion';
        error.status = 400;
        next(error);
      } else {
        // resultados.forEach(function(post) {
        var p = resultados.toJSON();
        debug('todo lo que recupere tiene: ', p);

        debug('el mail es: ', p.donner.email);
        var cuerpomail = '';

        cuerpomail = 'La OS a la que Ud donó ha calificado su donación';
        let mail = {
          to: p.donner.email,
          from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
          subject: 'Calificación realizada a donador',
          html: cuerpomail,
        };

        Donnerreview.app.models.Email.send(mail,
            function(err) {
              if (err)
                debug('ERROR AL ENVIAR EL EMAIL');
              else
                debug('> sending email to:', p.donner.email);
            });

        // debo primero modificar donnerReviewId dentro de donationResponse para
        // que posea el id del donnerreview que se esta creando...
        resultados.donnerReviewId = res.id;
        resultados.save();
        next();
        // });
      }// del else
    });// del function */
  });

  Donnerreview.beforeRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      var error = new Error();
      console.log(ctx.req.params.id);

      // que se pueda modificar una calificacion y mande los mails correspondientes del cambio.
      Donnerreview.findById(ctx.req.params.id, function(err, dreview) {
        if (err) {
          error.message = 'No se encuentra el review de la organizacion';
          error.status = 400;
          next(err);
        } else {
          // si se encontro el review, y determino que se puede modificar la description y el liked
          if (!dreview) {
            // es true con nulo, undefined, false y 0
            error.message = 'No se encuentra el review';
            error.status = 404;
            next(error);
          } else {
            console.log('el review es:', dreview);
            // a los atributos que no se permiten modificar se vuelve a asignar con lo que tenia
            //  aca lo coloco igual que el que ya tenia antes de modificar
            ctx.req.body.organizationId = dreview.organizationId;
            ctx.req.body.reviewedRequestId = dreview.reviewedRequestId;
            next();
          }
        }
      }); // del findbyid
    });

  // el ctx posee la instancia que esta siendo modificada
  // el res posee el json que se creo, se usa en afterremote
  Donnerreview.afterRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      var error = new Error();
      console.log(ctx.req.params.id);

      // hay que buscar lo modificado y mandar un mail diciendo que se cambio un review
      Donnerreview.findById(ctx.req.params.id, function(err, dreview) {
        if (err) {
          error.message = 'No se encuentra  el review de la organizacion';
          error.status = 400;
          next(err);
        } else {
          // si se encontro el review
          if (!dreview) {
            // es true con nulo, undefined, false y 0
            error.message = 'No se encuentra el review';
            error.status = 404;
            next(error);
          } else {
            // deberia enviar un mail al donador para avisarle que un OS cambio su respuesta
            // a donacion... por lo que deberia desde donnerreview ir a donationresponse
            // y de ahi recuperar el donner para conocer su mail
            var donresp = app.models.DonationResponse;

            donresp.findOne({
              where: {id: res.reviewedResponseId},
              include: {
                relation: 'donner',
              },
            }, function(err, resultados) {
              if (err) {
                error.message = 'No se encuentra la respuesta a donación.';
                error.status = 404;
                next(error);
              } else {
                // resultados.forEach(function(post) {
                var p = resultados.toJSON();
                console.log('todo lo que recupere tiene: ', p);

                console.log('el mail es: ', p.donner.email);
                var cuerpomail = '';

                cuerpomail = 'La OS a la que Ud donó ha cambiado su calificacion de un pedido de donación';
                let mail = {
                  to: p.donner.email,
                  from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
                  subject: 'Calificación realizada a donador',
                  html: cuerpomail,
                };

                Donnerreview.app.models.Email.send(mail,
                  function(err) {
                    if (err)
                      debug('ERROR AL ENVIAR EL EMAIL');
                    else
                      console.log('> sending email to:', p.donner.email);
                  });
                next();
                // });
              }// del else
            });// del function */
          }
        }
      }); // del findbyid
    });
};

