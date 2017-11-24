'use strict';

var app = require('../../server/server');

const moment = require('moment');

module.exports = function(Onetimerequest) {
  // Disable related model relations "product"
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__get__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__create__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__delete__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__update__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__destroy__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__findById__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__count__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__createById__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__deleteById__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__updateById__product');
  Onetimerequest.disableRemoteMethodByName(
    'prototype.__destroyById__product');

  // el ctx posee la instancia que esta siendo creada
  // el res posee el json que se creo, se usa en afterremote
  // el next se coloca para que siga y que realmente paso los controles para insertar
  Onetimerequest.beforeRemote('create',
    function(ctx, res, next) {
      var error = new Error();

      // hay que controlar primero que el usuario que hace este pedido sea una organizacion social
      // eso se haria dentro del validations del .json

      // la fecha de creación no se va a mostrar al usuario y debemos colocarle la fecha actual siempre
      ctx.req.body.creationDate = moment();

      // controlo que la cantidad ingresada sea mayor a 0
      console.log(ctx.req.body);
      if (ctx.req.body.ammount > 0) {
        console.log('La cantidad es mayor a 0');
        // next();
      } else {
        error.message = 'La cantidad debe obligatoriamente ser mayor a 0';
        error.status = 400;
        next(error);
      }

      // controlo que la fecha de expiracion sea valida y a su vez mayor, en al menos 2 dias a la fecha de creacion
      var exp = moment(ctx.req.body.expirationDate);
      if (exp.isValid() && exp.isAfter(moment().add(2, 'days'), 'day')) {
        console.log('La fecha de expiracion es correcta');
        // next();
      } else {
        error.message = 'La fecha de expiracion debe ser al menos 2 dias mayor';
        error.status = 400;
        next(error);
      }

      // por ultimo debo controlar que el productoid ingresado sea valido, es decir, este dentro del modelo productos

      var product = app.models.Product;
      product.findById(ctx.req.body.productId, function(err, producto) {
        if (err || producto == null) {
          error.message = 'No se encontró el producto';
          error.status = 404;
          next(error);
        } else {
            // si se encontro el producto
          console.log('el producto se encontro y es', producto.id);
          next();
        };
      });
    });
};

