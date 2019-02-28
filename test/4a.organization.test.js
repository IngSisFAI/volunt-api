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

var organizationSchema = {
  title: 'Organization request schema v1',
  type: 'object',
  required: [
    'inscriptionCode',
    'name',
    'urlInscriptionPapers',
    'street',
    'streetNumber',
    'cityId'],
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    emailVerified: {
      type: 'boolean',
    },
    inscriptionCode: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    urlInscriptionPapers: {
      type: 'string',
    },
    street: {
      type: 'string',
    },
    streetNumber: {
      type: 'string',
    },
    cityId: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('Organization', (done) => {
 /* before((done) => {
// runs before all tests in this block
    console.log('Deleting Organizations..');
    chai.request(server)
      .delete('/api/Organizations')
      .end((err, res) => {
        done();
      });
  });
*/

  describe('/POST api/Organization ', function() {
    this.timeout(100000);
    it('it should fail to login: wrong password', (done) => {
      chai.request(server)
        .post('/api/Organizations/login')
        .send({
          username: 'agustina.buccella@fi.uncoma.edu.ar',
          password: '111',
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(401);
          done();
        });
    });
    it('it should fail to login: wrong username', (done) => {
      chai.request(server)
        .post('/api/Organizations/login')
        .send({
          username: 'agustina.buccella@hotmail.fi.uncoma.edu.ar',
          password: '12345',
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('/GET api/Organization ', function() {
    this.timeout(100000);
    it('it should get all Organization', (done) => {
      chai.request(server)
        .get('/api/Organizations')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(organizationSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

