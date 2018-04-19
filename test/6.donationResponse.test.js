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
  title: 'Donation response schema v1',
  type: 'object',
  required: ['creationDate',
    'amount',
    'alreadyDelivered',
    'isCanceled',
    'donationRequestId',
    'donnerId'],
  properties: {
    creationDate: {
      type: 'string',
    },
    amount: {
      type: 'number',
      minimum: 0,
    },
    alreadyDelivered: {
      type: 'boolean',
    },
    isCanceled: {
      type: 'boolean',
    },
    donationRequestId: {
      type: 'string',
    },
    donnerId: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('donationResponse', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting donation response..');
    chai.request(server)
      .delete('/api/donationResponses')
      .end((err, res) => {
        done();
      });
  });

  describe('/POST api/donationResponse ', function() {
    this.timeout(100000);
    it('it should post one donation response', (done) => {
      chai.request(server)
    // recupero el donation request que cree antes
      .get('/api/donationRequests')
      .end((err, respdonation) => {
        // recupero el donador que cree antes
        chai.request(server)
          .get('/api/Donners')
          .end((err, resdonner) => {
            console.log('Llegue a ...');
            console.log(respdonation.body[0]);
            console.log(resdonner.body[0]);
            chai.request(server).post('/api/donationResponses')
              .send({
                creationDate: '2018-04-19',
                amount: 10,
                alreadyDelivered: false,
                isCanceled: false,
                donationRequestId: respdonation.body[0].id,
                donnerId: resdonner.body[0].id,
              })
              .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.be.jsonSchema(donationResponseSchema);
                res.should.have.status(200);
                done();
              });
          });
      });
    });
  });

  describe('Donation Response', (done) => {
    describe('/GET api/DonationResponse ', function() {
      this.timeout(100000);
      it('it should get all donation responses', (done) => {
        chai.request(server)
        .get('/api/DonationResponses')
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
});
