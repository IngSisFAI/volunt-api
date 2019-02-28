
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

var provinceSchema = {
  title: 'Province request schema v1',
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
describe('Province', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Provinces..');
    chai.request(server)
      .delete('/api/Provinces')
      .end((err, res) => {
        done();
      });
  });

  describe('/POST api/Province ', function() {
    this.timeout(100000);
    it('it should post one Province', (done) => {
      chai.request(server)
        .post('/api/Provinces')
        .send({
          name: 'Neuquen',
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.be.jsonSchema(provinceSchema);
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET api/Province ', function() {
    this.timeout(100000);
    it('it should get all provinces', (done) => {
      chai.request(server)
        .get('/api/Provinces')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(provinceSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

