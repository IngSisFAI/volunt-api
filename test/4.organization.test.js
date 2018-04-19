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
    'address',
    'webPage',
    'facebookPage'],
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
    address: {
      type: 'string',
    },
    webPage: {
      type: 'string',
    },
    facebookPage: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('Organization', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Organizations..');
    chai.request(server)
.delete('/api/Organizations')
.end((err, res) => {
  done();
});
  });

  describe('/POST api/Organization ', function() {
    this.timeout(100000);
    it('it should post one Organization', (done) => {
      chai.request(server)
.post('/api/Organizations')
.send({
  username: 'agustina.buccella@fi.uncoma.edu.ar',
  password: '12345',
  email: 'agustina.buccella@fi.uncoma.edu.ar',
  emailVerified: 'true',
  inscriptionCode: '8888',
  name: 'OSayudandoTest',
  urlInscriptionPapers: 'IP1',
  address: 'BsAs 1400',
  webPage: 'http://facebookPage.com',
  facebookPage: 'http://facebookPage.com',
  street: 'Av. Argentina',
  streetNumber: 1280,
  province: 'Neuquen',
  city: 'Neuquen',
  postalCode: 8300,
  logoUrl: 'https://cdn.dribbble.com/users/37879/screenshots/2037889/ong_logo-07.png',
})
.end((err, res) => {
  res.body.should.be.a('object');
  res.body.should.be.jsonSchema(organizationSchema);
  res.should.have.status(200);
  done();
});
    });

    it('it should login an Organization', (done) => {
      chai.request(server)
.post('/api/Organizations/login')
.send({
  username: 'agustina.buccella@fi.uncoma.edu.ar',
  password: '12345',
})
.end((err, res) => {
  res.body.should.be.a('object');
  res.should.have.status(200);
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

