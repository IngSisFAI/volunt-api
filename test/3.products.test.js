
'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = require('../server/server');
const fs = require('fs');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);
chai.use(jsonSchema);

/* {
  "inscriptionCode": "8888",
  "name": "OSayudandoTest",
  "urlInscriptionPapers": "IP1",
  "address": "BsAs 1400",
  "pendingApprobal": true,
  "webPage": "http://njcdnv",
  "facebookPage": "http://njcdnv",
  "realm": "agustina.buccella1@fi.uncoma.edu.ar",
  "username": "agustina.buccella1@fi.uncoma.edu.ar",
  "email": "agustina.buccella1@fi.uncoma.edu.ar",
  "emailVerified": false,
  "id": "5ab4219f648cbf4a00dc050a"
} */

var productSchema = {
  title: 'Product request schema v1',
  type: 'object',
  required: [
    'name',
    'icon',
    'unitId'],
  properties: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    unitId: {
      type: 'string',
    },

  },
};

// esto se ejecuta primero de todo
describe('Product', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Products..');
    chai.request(server)
      .delete('/api/Products')
      .end((err, res) => {
        done();
      });
  });


  describe('/POST api/Product ', function() {
    this.timeout(100000);
    it('it should post one Product', (done) => {
      chai.request(server)
        .get('/api/Units')
        .end((err, res) => {

          console.log('Llegue a ...');
          console.log(res.body[0]);
          chai.request(server).post('/api/Products')
            .send({
              name: 'leche en polvo',
              icon: '12345',
              unitId: res.body[0].id
            })
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.be.jsonSchema(productSchema);
              res.should.have.status(200);
              done();
            });
        });
    });
  });


  describe('/GET api/Product ', function() {
    this.timeout(100000);
    it('it should get all Products', (done) => {
      chai.request(server)
        .get('/api/Products')
        .end((err, res) => {
          res.body.should.be.a('array');
          console.log("El objeto es.....");
          console.log(res.body[0]);
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(productSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

