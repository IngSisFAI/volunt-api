'use strict';

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

  // DonationResponse.afterRemote('find', (context, result, next)=>{
    // Lo que queremos hacer aca, es verificar si se pidio que la donacion.
    // tambien traiga al donador, y la donacion es anonima,
    // agregarle los datos necesarios para que la vista no tenga que comprobarlo.
    // console.log('@@@@@@@@@@@@@@');
    // console.log(context.args.filter);

    // next();
  // });
};
