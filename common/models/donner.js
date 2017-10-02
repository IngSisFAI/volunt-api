'use strict';

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

  Donner.remoteMethod('sampleRemoteMethod', {
    accepts: [
      {arg: 'urlArg',
        type: 'string',
        required: true,
        description: ['Sample multiline', ' argument description'],
      },
      {arg: 'bodyArg',
        type: 'string',
        required: true,
        description: ['Sample multiline', ' argument description'],
        http: {
          source: 'body'},
      }],
    http: {'verb': 'post', 'path': '/routeName'},
    returns: {arg: 'sampleReturn', type: 'string'},
    description: 'Sample description',
  });

  Donner.sampleRemoteMethod = function(urlArg, bodyArg, cb) {
    console.log(urlArg, bodyArg);
    Donner.create(
      {email: 'sample@email.com',
        password: 'samplePassowrd'},
      function(error, donner) {
        if (error) throw error;
        console.log(donner);
      });
    cb('error', 'success');
  };

  // SAMPLE HOOKS
  Donner.beforeRemote('create',  function(context, donnerInstance, next) {
    console.log(context);
    console.log(donnerInstance);
    next();
  });

  Donner.afterRemote('create',  function(context, donnerInstance, next) {
    console.log(context);
    console.log(donnerInstance);
    next();
  });
};
