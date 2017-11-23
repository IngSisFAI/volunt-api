'use strict';

module.exports = function(Onetimerequest) {
  // el ctx posee la instancia que esta siendo creada
  // el res posee el json que se creo, se usa en afterremote
  // el next se coloca para que siga y que realmente paso los controles para insertar
  Onetimerequest.beforeRemote('create',
    function(ctx, res, next) {
      var error = new Error();
      if (ctx.req.body.Ammount > 0) {
        console.log('la cantidad es mayor a 0, bien!!');
        next();
      } else {
        error.message = 'La cantidad no es mayor a 0';
        error.status = 400;
        next(error);
      }
      console.log(ctx.req.body);
    });
};

