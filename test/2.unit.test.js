
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

var unitSchema = {
  title: 'Unit request schema v1',
  type: 'object',
  required: [
    'name'],
  properties: {
    name: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('Unit', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Units..');
    chai.request(server)
      .delete('/api/Units')
      .end((err, res) => {
        done();
      });
  });


  describe('/POST api/Unit ', function() {
    this.timeout(100000);
    it('it should post one Unit', (done) => {
      chai.request(server)
        .post('/api/Units')
        .send({
          name: 'kilogramos',
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.be.jsonSchema(unitSchema);
          res.should.have.status(200);
          done();
        });
    });
  });


  describe('/GET api/Unit ', function() {
    this.timeout(100000);
    it('it should get all Units', (done) => {
      chai.request(server)
        .get('/api/Units')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(unitSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

