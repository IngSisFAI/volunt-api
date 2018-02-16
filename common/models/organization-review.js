/* eslint-disable max-len */
'use strict';

var app = require('../../server/server');

const moment = require('moment');

module.exports = function(Organizationreview) {
  // es la evaluacion que realiza un donador sobre una pedido de donacion realizado por una OS.
// Es decir el donador califica el pedido de la OS, sobre todo con respecto a como fue recepcionada su  donacion
// y cosas asi...

  Organizationreview.beforeRemote('create', function(ctx, res, next) {
    var error = new Error();

    // deberia  verificar que el donador que quiere calificar exista y ademas tenga algun
    // donationResponse de la donationrequest que se tiene que calificar...es decir
    // el donador puede calificar solo si ha respondido el pedido de donacion (que justamente quiere calificar)

    var org = app.models.Donner;
    org.findById(ctx.req.body.donnerId, function(err, donner) {
      if (err) {
        error.message = 'No se encontró el donador que esta generando la calificacion';
        error.status = 404;
        next(error);
      } else {
        // se encontro el donador
        // ahora me fijo que la donation request que va a calificar exista y que haya posea
        // al menos una donation response generada por este usuario

        var donreq = app.models.DonationRequest;

        donreq.find({
          where: {id: ctx.req.body.donationRequestId},
          include: {
            relation: 'donationResponse',
          },
        },  function(err, resultados) {
          if (err) {
            error.message = 'hubo un error';
            error.status = 404;
            next(error);
          } else {
            console.log('resultados tiene:', resultados);
            // es true con nulo, undefined, false y 0
            if (resultados.length === 0) {
              error.message = 'El donador no ha respondido al pedido de donacion que quiere calificar, por lo que no puede calificar';
              error.status = 404;
              next(error);
            } else {
              resultados.forEach(function(post) {
                var p = post.toJSON();
                console.log('el json tiene:', p);

                ////////////preguntar aca porque el donationrequest tiene indefinido para el donation response.. yo
                //creo que hay que asignarlo antes entonces??? MAXIII

                // luego  ver que no exista ya una calificacion... es decir
                // que no haya ya sido calificada la OS por este mismo donador
                // esto se hace buscando si el donationrequest que
                // tiene como indefinido el valor de donnerRewiewId
/*
                console.log('el review tiene: ', p.donnerReviewId);
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
                    console.log('todo ok..');
                    next();
                  } else {
                    error.message = 'Se esta calificando un pedido no generado por esa OS';
                    error.status = 404;
                    next(error);
                  }
                }// del else de ya esta calificada
                */
              });// del for each
            }// del else
          }// del else de resultados
        });// del function y find
      }// del else
    });// del find byid
  });
};
