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

var donationRequesSchema = {
  title: 'Donnation request schema v1',
  type: 'object',
  required: ['creationDate',
    'amount',
    'expirationDate',
    'isPermanent',
    'covered',
    'promised',
    'status'],
  properties: {
    creationDate: {
      type: 'string',
    },
    amount: {
      type: 'number',
      minimum: 0,
    },
    expirationDate: {
      type: 'string',
    },
    isPermanent: {
      type: 'boolean',
    },
    covered: {
      type: 'number',
      minimum: 0,
    },
    promised: {
      type: 'number',
      minimum: 0,
    },
    status: {
      type: 'boolean',
    },
  },
};


describe('Donation Request', (done) => {
  describe('/GET api/DonationRequests ', function() {
    this.timeout(100000);
    it('it should get all donation requests', (done) => {
      chai.request(server)
        .get('/api/DonationRequests')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donationRequesSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});

