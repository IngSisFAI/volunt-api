/* eslint-disable max-len */
'use strict';

var app = require('../../server/server');
const debug = require('debug')('info');


const moment = require('moment');

module.exports = function(Organizationreview) {
  // es la evaluacion que realiza un donador sobre una pedido de donacion realizado por una OS.
// Es decir el donador califica el pedido de la OS, principalmente con respecto a como fue recepcionada su  donacion
// y cosas asi...

  Organizationreview.beforeRemote('create', function(ctx, res, next) {
    var error = new Error();

    // deberia  verificar que el donador que quiere calificar exista y ademas tenga algun
    // donationResponse de la donationrequest que se tiene que calificar...es decir
    // el donador puede calificar solo si ha respondido el pedido de donacion (que justamente quiere calificar)

    var don = app.models.Donner;
    don.findById(ctx.req.body.donnerId, function(err, donner) {
      if (err) {
        error.message = 'No se encontra el donador que esta generando la calificacion';
        error.status = 400;
        next(error);
      } else {
        // se encontro el donador
        // ahora me fijo que la donation request que va a calificar exista y que haya posea
        // al menos una donation response generada por este usuario

        // recuperar todos los donationresponse y ver si alguno tiene como donner al donnerid que ingreso...
        // puede ser que no tenga ninguno... por lo que es vacio
        // No...-----------------
        // como cdo se creo cada donationresponse no se fue a modificar al donationrequest para agregarle
        // en el arreglo esta nueva respuesta, lo que hago es buscar al reves.. es decir,
        // todas las donationresponse que tengan como donationRequestId a la que ingreso y como donnerId al que ingreso

        var donresp = app.models.DonationResponse;

        donresp.find({
          where: {donationRequestId: ctx.req.body.donationRequestId,
            donnerId: ctx.req.body.donnerId},
          //include: {
          //  relation: 'donationRequest',
          //},
        },  function(err, resultados) {
          if (err) {
            error.message = 'No se encuentra  la revision de la organizacion.';
            error.status = 400;
            next(error);
          } else {
            debug('resultados tiene el donresp:', resultados);
            // es true con nulo, undefined, false y 0
            if (resultados.length === 0) {
              error.message = 'El donador no ha respondido al pedido de donacion que quiere calificar, por lo que no puede calificar';
              error.status = 404;
              next(error);
            } else {
              // si entro aca significa que existe al menos una

              // ahora debo verificar que ese donador no haya ya realizado una revision... busco al menos uno
              var orgrev = app.models.OrganizationReview;

              orgrev.find({
                where: {donationRequestId: ctx.req.body.donationRequestId,
                  donnerId: ctx.req.body.donnerId},
                //include: {
                //  relation: 'donationRequest',
                //},
              },  function(err, resultados) {
                if (err) {
                  error.message = 'No se encuentra  la revision de la organizacion.';
                  error.status = 400;
                  next(error);
                } else {
                  debug('resultados tiene el org review:', resultados);

                  if (resultados.length !== 0) {
                    error.message = 'El donador ya ha calificado a esa organizacion en este pedido';
                    error.status = 404;
                    next(error);
                  } else {
                    // todo bien, no existe la donacion
                    next();
                  }
                }
              });// del function y find
            }// del else
          }// del else de resultados
        });// del function y find
      }// del else
    });// del find byid
  });

  Organizationreview.afterRemote('create', function(ctx, res, next) {
    var error = new Error();
    // deberia enviar un mail a la organizacion para avisarle que un donador califico su request
    //  por lo que deberia desde organizationreview ir a donationrequest
    // y de ahi recuperar la OS para conocer su mail

    debug('------------en el after-----------------');
    var donreq = app.models.DonationRequest;

    donreq.findOne({
      where: {id: res.donationRequestId},
      include: {
        relation: 'organization',
      },
    },  function(err, resultados) {
      if (err) {
        error.message = 'No se encuentra el requerimiento de donación.';
        error.status = 400;
        next(error);
      } else {
        // resultados.forEach(function(post) {
        var p = resultados.toJSON();
        debug('todo lo que recupere tiene: ', p);

        debug('el mail es: ', p.organization.email);
        var cuerpomail = '';

        cuerpomail = 'Un donador que le efectuó una donación ha calificado su pedido';
        let mail = {
          to: p.organization.email,
          from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
          subject: 'Calificación realizada a OS',
          html: cuerpomail};

        Organizationreview.app.models.Email.send(mail,
            function(err) {
              if (err)
                debug('ERROR AL ENVIAR EL EMAIL');
              else
                debug('> sending email to:', p.organization.email);
            });

        /* esto no se hace porque es a mucho..un request tiene muchos reviews

        // debo primero modificar donnerReviewId dentro de donationResponse para
        // que posea el id del donnerreview que se esta creando...
        resultados.donnerReviewId = res.id;
        resultados.save();
        */
        next();
       // });
      }// del else
    });// del function
  });

  Organizationreview.beforeRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      var error = new Error();
      console.log(ctx.req.params.id);

      // que se pueda modificar una calificacion y mande los mails correspondientes del cambio.
      Organizationreview.findById(ctx.req.params.id, function(err, oreview) {
        if (err) {
          error.message = 'Hubo un error desconocido en encontrar el review del donador';
          error.status = 400;
          next(err);
        } else {
          // si se encontro el review, y determino que se puede modificar la description y el liked
          if (!oreview) {
            // es true con nulo, undefined, false y 0
            error.message = 'No se encuentra el review';
            error.status = 404;
            next(error);
          } else {
            console.log('el review es:', oreview);
            // a los atributos que no se permiten modificar se vuelve a asignar con lo que tenia
            // aca lo coloco igual que el que ya tenia antes de modificar
            ctx.req.body.donnerId = oreview.donnerId;
            ctx.req.body.donationRequestId = oreview.donationRequestId;
            next();
          }
        }
      }); // del findbyid
    });

  // el ctx posee la instancia que esta siendo modificada
  // el res posee el json que se creo, se usa en afterremote
  Organizationreview.afterRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      var error = new Error();
      console.log(ctx.req.params.id);

      // hay que buscar lo modificado y mandar un mail diciendo que se cambio un review
      Organizationreview.findById(ctx.req.params.id, function(err, oreview) {
        if (err) {
          error.message = 'Hubo un error desconocido en encontrar el review del donador';
          error.status = 400;
          next(err);
        } else {
          // si se encontro el review
          if (!oreview) {
            // es true con nulo, undefined, false y 0
            error.message = 'No se encuentra el review';
            error.status = 404;
            next(error);
          } else {
            var donreq = app.models.DonationRequest;

            donreq.findOne({
              where: {id: res.donationRequestId},
              include: {
                relation: 'organization',
              },
            },  function(err, resultados) {
              if (err) {
                error.message = 'No se encuentra el requerimiento de donación.';
                error.status = 400;
                next(error);
              } else {
                // resultados.forEach(function(post) {
                var p = resultados.toJSON();
                console.log('todo lo que recupere tiene: ', p);

                console.log('el mail es: ', p.organization.email);
                var cuerpomail = '';

                cuerpomail = 'Un donador que le efectuó una donación ha modificado su calificacion';
                let mail = {
                  to: p.organization.email,
                  from: 'Voluntariado <voluntariadouncoma2017@gmail.com>',
                  subject: 'Calificación realizada a OS',
                  html: cuerpomail};

                Organizationreview.app.models.Email.send(mail,
                  function(err) {
                    if (err)
                      debug('ERROR AL ENVIAR EL EMAIL');
                    else
                      console.log('> sending email to:', p.organization.email);
                  });
                next();
              }// del else
            });// del fundone
          }
        }
      }); // del findbyid
    });
};// del final
