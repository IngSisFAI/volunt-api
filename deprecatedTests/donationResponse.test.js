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

var donationResponseSchema = {
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
    status: {
        type: "boolean"
      },
      alreadyDelivered: {
        type: "boolean"
      }
  },
};

describe('Donation Response', (done) => {
  describe('/GET api/DonationResponse ', function() {
    this.timeout(100000);
    it('it should get all donation responses', (done) => {
      chai.request(server)
        .get('/api/DonationResponse')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donationResponseSchema);
          res.should.have.status(200);
          done();
        });
    });
  });

  
});

