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

var donationReviewSchema = {
  title: 'Donation review schema v1',
  type: 'object',
  required: ['creationDate',
    'amount',
    'expirationDate',
    'isPermanent',
    'covered',
    'promised',
    'isOpen',
    'productId',
    'organizationId'],
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
    isOpen: {
      type: 'boolean',
    },
    productId: {
      type: 'string',
    },
    organizationId: {
      type: 'string',
    },
  },
};

// esto se ejecuta primero de todo
describe('donnerReviews', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting donation requests..');
    chai.request(server)
      .delete('/api/donnerReviews')
      .end((err, res) => {
        done();
      });
  });
});

describe('/POST api/donnerReviews ', function() {
  this.timeout(100000);
  it('it should post one donation review', (done) => {
    chai.request(server)
      // recupero el producto que cree antes
      .get('/api/donnerReviews')
      .end((err, resp) => {
        // recupero la organization que cree antes
        chai.request(server)
          .get('/api/Organizations')
          .end((err, reso) => {
            console.log('Llegue a ...');
            console.log(resp.body[0]);
            chai.request(server).post('/api/donationRequests')
              .send({
                creationDate: '2018-04-12',
                amount: 10,
                expirationDate: '2100-04-25',
                isPermanent: false,
                covered: 0,
                promised: 0,
                isOpen: 'true',
                productId: resp.body[0].id,
                organizationId: reso.body[0].id,
              })
              .end((err, res) => {
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.be.jsonSchema(donationRequestSchema);
                res.should.have.status(200);
                done();
              });
          });
      });
  });
});

describe('Donation Request', (done) => {
  describe('/GET api/DonationRequests ', function() {
    this.timeout(100000);
    it('it should get all donation requests', (done) => {
      chai.request(server)
        .get('/api/DonationRequests')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donationRequestSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});
