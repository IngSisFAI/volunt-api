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

var donnerSchema = {
  title: 'Donner request schema v1',
  type: 'object',
  required: [
    'name',
    'lastName',
    'phoneNumber',
    'dni'],
  properties: {
    name: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    dni: {
      type: 'string',
    },
    reputation: {
      type: 'number',
    },
  },
};

describe('Donner', (done) => {
  before(function() {
    // runs before all tests in this block
  });

  describe('/GET api/Donner ', function() {
    this.timeout(100000);
    it('it should get all Donners', (done) => {
      chai.request(server)
        .get('/api/Donners')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donnerSchema);
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST api/Donner ', function() {
    this.timeout(100000);
    it('it should post one Donner', (done) => {
      chai.request(server)
        .post('/api/Donners')
        .send({
          name: 'Test',
          lastName: 'User',
          phoneNumber: '+549299874563',
          dni: '11222555',
          email: 'test@user.com',
          password: '12345',
          reputation: 0,
        }
        )
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.be.jsonSchema(donnerSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
  ;
});

