'use strict';

const moment = require('moment');

module.exports = function(Onetimerequest) {
  // el ctx posee la instancia que esta siendo creada
  // el res posee el json que se creo, se usa en afterremote
  // el next se coloca para que siga y que realmente paso los controles para insertar
  Onetimerequest.beforeRemote('create',
    function(ctx, res, next) {
      var error = new Error();

      // la fecha de creación no se va a mostrar al usuario y debemos coolocarle la fecha actual
      ctx.req.body.creationDate = moment();

      console.log(ctx.req.body);
      if (ctx.req.body.ammount > 0) {
        console.log('La cantidad es mayor a 0');
        next();
      } else {
        error.message = 'La cantidad debe obligatoriamente ser mayor a 0';
        error.status = 400;
        next(error);
      }
    });
};

