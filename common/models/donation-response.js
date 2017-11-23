'use strict';

module.exports = function(DonationResponse) {

  DonationResponse.afterRemote('find',(context,result, next)=>{

    //Lo que queremos hacer aca, es verificar si se pidio que la donacion.
    // tambien traiga al donador, y la donacion es anonima,
    // agregarle los datos necesarios para que la vista no tenga que comprobarlo.
    console.log("@@@@@@@@@@@@@@");
    console.log(context.args.filter);

    next();
  })
};
