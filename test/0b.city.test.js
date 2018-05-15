
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

var citySchema = {
  title: 'City request schema v1',
  type: 'object',
  required: [
    'name',
    'provinceId'],
  properties: {
    name: {
      type: 'string',
    },
    provinceId: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('City', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Cities..');
    chai.request(server)
      .delete('/api/Cities')
      .end((err, res) => {
        done();
      });
  });

  describe('/POST api/City ', function() {
    this.timeout(100000);
    it('it should post one City', (done) => {
      chai.request(server)
      // recupero las ciudades
        .get('/api/Provinces')
        .end((err, allprovinces) => {
          chai.request(server)
          .post('/api/Cities')
          .send({
            name: 'Neuquen',
            provinceId: allprovinces.body[0].id,
          })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.be.jsonSchema(citySchema);
          res.should.have.status(200);
          done();
        });
        });
    });
  });

  describe('/GET api/City ', function() {
    this.timeout(100000);
    it('it should get all cities', (done) => {
      chai.request(server)
        .get('/api/Cities')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(citySchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

