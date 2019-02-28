'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonSchema = require('chai-json-schema');
const server = require('../server/server');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(jsonSchema);

var donnerSchema = {
  title: 'Donner request schema v1',
  type: 'object',
  required: [
    'name',
    'lastName',
    'phoneNumber',
    'dni',
    'cityId'],
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
    cityId: {
      type: 'string',
    },
  },
};

describe('Donner', (done) => {
  before((done) => {
    // runs before all tests in this block
    console.log('Deleting Donners..');
    chai.request(server)
      .delete('/api/Donners')
      .end((err, res) => {
        done();
      });
  });

  describe('/POST api/Donner ', function() {
    this.timeout(100000);
    it('it should post one Donner and login', (done) => {
      chai.request(server)
      // recupero las ciudades
        .get('/api/Cities')
        .end((err, allcities) => {
          chai.request(server)
            .post('/api/Donners')
            .send({
              name: 'Test',
              lastName: 'User',
              phoneNumber: '+549299874563',
              dni: '11222555',
              email: 'test@user.com',
              username: 'test@user.com',
              password: '12345',
              reputation: 0,
              cityId: allcities.body[0].id,
            })
            .end((err, res) => {
              expect(res.body).to.be.jsonSchema(donnerSchema);
              expect(res).to.have.status(200);
              chai.request(server)
                .post('/api/Donners/login')
                .send({
                  username: 'test@user.com',
                  password: '12345',
                })
                .end((err, res) => {
                  console.log(res.body);
                  expect(res.body).to.be.a('object');
                  expect(res).to.have.status(200);
                  done();
                });
            });
        });
    });
  });

  describe('/GET api/Donner ', function() {
    this.timeout(100000);
    it('it should get all Donners', (done) => {
      chai.request(server)
        .get('/api/Donners')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          for (let i = 0; i < res.body.length; i++)
            expect(res.body[i]).to.be.jsonSchema(donnerSchema);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

