/* eslint-disable max-len */

'use strict';

var app = require('../../server/server');

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

  Donnerreview.beforeRemote('create', function(ctx, res, next) {
    var error = new Error();

    // deberia primero verificar que la organizacion exista
    var org = app.models.Organization;
    org.findById(ctx.req.body.organizationId, function(err, organizacion) {
      if (err) {
        error.message = 'No se encontró la OS que esta generando el review';
        error.status = 404;
        next(error);
      } else {
        // se encontro la OS que esta haciendo el review
        // ahora me fijo que el donationResponse que va a calificar exista
        var donresp = app.models.DonationResponse;
        donresp.findById(ctx.req.body.reviewedResponseId, function(err, reviewresponse) {
          if (err) {
            error.message = 'No se encontró la respuesta a donacion que se quiere evaluar';
            error.status = 404;
            next(error);
          } else {
            // se encontro la respuesta...ahora ya la OS puede evaluar la respuesta
            next();
          }
        });// del donationresponse
      }// del else
    });
  });

  Donnerreview.afterRemote('create', function(ctx, res, next) {
    var error = new Error();
    // deberia enviar un mail al donador para avisarle que un OS califico su respuesta
    // a donacion... por lo que deberia desde donnerreview ir a donationresponse
    // y de ahi recuperar el donner para conocer su mail
    var donrev = app.models.DonnerReview;

    donrev.find({
      where: {id: res.id},
      include: {
        relation: 'donationResponse',
        scope: {
          include: ['donner'],
        },
      },
    },  function(err, resultados) {
      if (err) {
        error.message = 'hubo un error';
        error.status = 404;
        next(error);
      } else {
        resultados.forEach(function(post) {
          var p = post.toJSON();
          console.log(p.reviewedResponse);
        });
      }// del else
    });// del function
  });
};// del final
