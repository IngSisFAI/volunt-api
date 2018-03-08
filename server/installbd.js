/* eslint-disable max-len */
'use strict';
const server = require('./server');
const debug = require('debug');

module.exports = function(app,cb) {


  let donners = [
    {
      'name': 'Maximiliano',
      'lastName': 'Archundia',
      'phoneNumber': '+542995022314',
      'dni': '31256789',
      'username': 'ariasmaxi89@gmail.com',
      'password': 'maxi123',
      'email': 'ariasmaxi89@gmail.com',
      'emailVerified': false,
    },
    {
      'name': 'Martin',
      'lastName': 'Gonzales',
      'phoneNumber': '+542995034565',
      'dni': '38234567',
      'username': 'MartinGonzales@mailfailso.com',
      'password': 'martin123',
      'email': 'MartinGonzales@mailfailso.com',
      'emailVerified': false,
    },
    {
      'name': 'Juan Pablo',
      'lastName': 'Orlando',
      'phoneNumber': '12312312',
      'dni': '1231231',
      'username': 'asd333@asd.com',
      'password': 'mati123',
      'email': 'asd333@asd.com',
      'verificationToken': 'cf1f62ec197cf6cdd11cfd954c4d15276abfd050d5d651da2caaccf59961545837a0a64369ecc3ecd5f4e7bb71c3967750725eb83f5a66a80da248148fa63551',
    },
    {
      'name': 'Martin',
      'lastName': 'Moreira',
      'phoneNumber': '12312312312',
      'dni': '123131231',
      'username': 'moree@live.com',
      'password': 'more123',
      'email': 'moree@live.com',
      'verificationToken': 'a2931323f6626cd36babfc119b04aec4bd21a73ea8627635ad85917a7025954ec3c131a4ca36851731c5c7db7bdb119e24f6633d82f66c2edb328f68d1d5a559',
      'ejemplo': [{'$oid': '5a173c47e2e9d22a5824c2c6'}, {'$oid': '5a39069621cea0032f5c14b1'}],
    },
    {
      'name': 'Test',
      'lastName': 'User',
      'phoneNumber': '+549299874563',
      'dni': '11222555',
      'reputation': 0,
      'password': 'test123',
      'email': 'test@user.com',
      'verificationToken': '74315965a9e2e1899cf706cfa295687e35cd95d66e19375695215fa5c7c4c39d771df7df26c6abc6db47773726622c5acaed1ad3f63f1c95222f3f157909a0d0',
    },
  ];
  let mydata = donners.map(function(donner) {
    server.app.models.Donner.create(donner).then(function(job) {
      return job;
    });
  });
  Promise.all(mydata).then(donners => {
    debug('Inserted donners: ' + donners.length);
  });
};
