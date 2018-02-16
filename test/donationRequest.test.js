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
      type: 'date',
    },
    amount: {
      type: 'number',
      minimum: 1,
    },
    expirationDate: {
      type: 'date',
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
      minimum: 1,
    },
    status: {
      type: 'boolean',
    },
  },
};


describe('Donation Request', (done) => {
  describe('/POST api/ ', function() {
    it('it should get all donation requests', (done) => {
      chai.request(server)
        .get('/api/DonationRequests')
        .end((err, res) => {
          let body = JSON.parse(res.body);
          res.body.should.be.an.array();
          let i = 0;
          for (i = 0; i < res.body.length; i++)
            expect(body[i]).to.be.jsonSchema(donationRequesSchema);
          res.should.have.status(200);
          done();
        });
      done();
    });
  });
});

