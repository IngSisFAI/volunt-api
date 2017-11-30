'use strict';

module.exports = function(Permanentrequest) {
  // Disable related model relations "product"
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__get__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__create__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__delete__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__update__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__destroy__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__findById__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__count__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__createById__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__deleteById__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__updateById__product');
  Permanentrequest.disableRemoteMethodByName(
    'prototype.__destroyById__product');
};
