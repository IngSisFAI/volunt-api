'use strict';

var loopback = require('loopback');
let categories = require('../mercadoLibreCategories.json');
let bootConfig = require('./bootConfig.json');

module.exports = function(server) {
  console.log(bootConfig.generateCategories);
  if (bootConfig.generateCategories)  {
    for (let category of categories) {
      let product = {
        name: category.categorieName,
        icon: 'https://image.flaticon.com/icons/svg/839/839245.svg',
      };
      server.models.Product
      .create(product)
      .then((product) => {
        let childrenPromises = [];
        if (category.children_categories) {
          console.log(category.categorieName);

          // for (let innerCat of category.children_categories) {
          //   console.log('\t' + innerCat.name);
          //   let product2 = {
          //     name: innerCat.name,
          //     icon: 'https://image.flaticon.com/icons/svg/839/839245.svg',
          //     parentProductId: product.id,
          //   };
          //   childrenPromises.push(server.models.Product.create(product2));
          // }
          // return Promise.all(childrenPromises);
        }
      })
      .then((results) => {
        // console.log(results);
      });
    }
  }
};
