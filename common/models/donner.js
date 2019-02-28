'use strict';
var path = require('path');
const debug = require('debug')('info');


module.exports = function(Donner) {
  // Disable related model relations "Donation Response"
  Donner.disableRemoteMethodByName(
    'prototype.__get__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__create__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__delete__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__update__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__destroy__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__findById__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__count__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__createById__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__deleteById__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__updateById__donationResponses');
  Donner.disableRemoteMethodByName(
    'prototype.__destroyById__donationResponses');

  // Disable related model relations "Organization Review"
  Donner.disableRemoteMethodByName(
    'prototype.__get__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__create__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__delete__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__update__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__destroy__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__findById__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__count__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__createById__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__deleteById__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__updateById__organizationReviews');
  Donner.disableRemoteMethodByName(
    'prototype.__destroyById__organizationReviews');

// Importing user control

  // Disable ACLs
  Donner.settings.acls.length = 0;
  Donner.settings.acls = [
    {accessType: '*',
      principalType: 'ROLE',
      principalId: '$everyone',
      permission: 'ALLOW'}];

  Donner.beforeRemote('prototype.patchAttributes',
    function(ctx, res, next) {
      Donner.findById(ctx.req.accessToken.userId, function(err, user) {
        if (err) {
          var error = new Error('No se encontró el usuario');
          error.status = 404;
          next(error);
        }
        // Block intentional email change
        ctx.req.body.email = user.email;
        ctx.req.body.username = user.username;
        // User wants to patch password, this requires oldPassword
        if (ctx.req.body.password != null)        {
          user.hasPassword(ctx.req.body.oldPassword, function(err, isMatch) {
            if (!isMatch) {
              var error = new Error('El password antiguo no coincide');
              error.status = 401;
              next(error);
            } else {
              next();
            }
          });
        } else
          next();
      });
    });

  Donner.afterRemote('create', function(context, userInstance, next) {
    debug('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'voluntariadouncoma2017@gmail.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: userInstance,
      host: 'localhost',
      port: '',
    };

    options.verifyHref = options.verifyHref ||
      options.protocol +
      '://' +
      options.host +
      Donner.app.get('restApiRoot') +
      Donner.http.path +
      Donner.sharedClass.find('confirm', true).http.path +
      '?uid=' +
      options.user.id +
      '&redirect=' +
      options.redirect;

    userInstance.verify(options, function(err, response) {
      debug(err);
      if (err) return next(err);
      next();
    });
  });

  Donner.remoteMethod('emailExists', {
    accepts: [{
      arg: 'email',
      type: 'string',
      required: true,
      http: {source: 'body'}}],
    http: {
      'verb': 'post',
      'path': '/emailExists',
    },
    returns: {arg: 'emailExists', type: 'boolean'},
  });

  Donner.emailExists = function(mail, cb) {
    debug(mail);
    Donner.findOne({where: {email: mail}}, function(err, Donner) {
      if (err) debug('ERROR AL ENVIAR EL EMAIL');
      debug(Donner);
      cb(null, Donner != null);
    });
  };
};
