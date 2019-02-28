/* eslint-disable max-len */
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

var donationRequestSchema = {
  title: 'Donation request schema v1',
  type: 'object',
  required: ['creationDate',
    'amount',
    'expirationDate',
    'isPermanent',
    'covered',
    'promised',
    'isOpen',
    'description',
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
    description: {
      type: 'string',
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
describe('DonationRequest Retest 1', (done) => {
 /* before((done) => {
    chai.request(server)
      .delete('/api/DonationRequests')
      .end((err, res) => {
        console.log('Deleting Donation Requests..');
        done();
      });
  });
*/

  describe('/POST api/donationRequest ', function() {
    this.timeout(100000);
    it('it should fail adding a new donationrequest: inexistent product', (done) => {
      // no recupero el producto porque le voy a enviar uno que no existe....
      // recupero la organization que cree antes
      chai.request(server)
            .get('/api/Organizations')
            .end((err, reso) => {
             // console.log('Llegue a ...');
              // console.log(resp.body[0]);
              // console.log(reso.body[0]);
              chai.request(server).post('/api/donationRequests')
                .send({
                  creationDate: '2018-04-12',
                  amount: 10,
                  expirationDate: '2100-04-25',
                  isPermanent: false,
                  covered: 0,
                  promised: 0,
                  isOpen: true,
                  description: 'Leche',
                  productId: '1',
                  organizationId: reso.body[0].id,
                })
                .end((err, res) => {
                  // console.log(res.body);
                  res.body.should.be.a('object');
                  res.should.have.status(400);
                  done();
                });
            });
    });
    it('it should fail adding a new donationrequest: inexistent organization', (done) => {
      chai.request(server)
      // recupero el producto que cree antes
      // no recupero la organization porque le voy a enviar uno que no existe....
        .get('/api/Products')
        .end((err, resp) => {
          // console.log('Llegue a ...');
          // console.log(resp.body[0]);
          // console.log(reso.body[0]);
          chai.request(server).post('/api/donationRequests')
            .send({
              creationDate: '2018-04-12',
              amount: 10,
              expirationDate: '2100-04-25',
              isPermanent: false,
              covered: 0,
              promised: 0,
              isOpen: true,
              description: 'Leche',
              productId: resp.body[0].id,
              organizationId: '1',
            })
            .end((err, res) => {
              // console.log(res.body);
              res.body.should.be.a('object');
              res.should.have.status(400);
              done();
            });
        });
    });
    it('it should fail adding a new permanent donationrequest: expiration date must be 30 days' +
      ' greater than creation date', (done) => {
      chai.request(server)
      // recupero el producto que cree antes
        .get('/api/Products')
        .end((err, resp) => {
          // recupero la organization que cree antes
          chai.request(server)
            .get('/api/Organizations')
            .end((err, reso) => {
              //  console.log('Llegue a ...');
              //  console.log(resp.body[0]);
              // console.log(reso.body[0]);
              chai.request(server).post('/api/donationRequests')
                .send({
                  creationDate: '2018-04-12',
                  amount: 10,
                  expirationDate: '2018-05-13',
                  isPermanent: true,
                  covered: 0,
                  promised: 0,
                  isOpen: true,
                  description: 'Leche',
                  productId: resp.body[0].id,
                  organizationId: reso.body[0].id,
                })
                .end((err, res) => {
              // console.log(res.body);
                  res.body.should.be.a('object');
                  res.should.have.status(404);
                  done();
                });
            });
        });
    });
    it('it should fail adding a new onetime donationrequest: expiration date must be 2 days' +
      ' greater than creation date', (done) => {
      chai.request(server)
      // recupero el producto que cree antes
        .get('/api/Products')
        .end((err, resp) => {
          // recupero la organization que cree antes
          chai.request(server)
            .get('/api/Organizations')
            .end((err, reso) => {
              //  console.log('Llegue a ...');
              //  console.log(resp.body[0]);
              // console.log(reso.body[0]);
              chai.request(server).post('/api/donationRequests')
                .send({
                  creationDate: '2018-04-12',
                  amount: 0,
                  expirationDate: '2018-06-10',
                  isPermanent: false,
                  covered: 0,
                  promised: 0,
                  isOpen: true,
                  description: 'Leche',
                  productId: resp.body[0].id,
                  organizationId: reso.body[0].id,
                })
                .end((err, res) => {
                  // console.log(res.body);
                  res.body.should.be.a('object');
                  res.should.have.status(404);
                  done();
                });
            });
        });
    });
    it('it should fail adding a new onetime donationrequest: amount cannot be less than 0', (done) => {
      chai.request(server)
      // recupero el producto que cree antes
        .get('/api/Products')
        .end((err, resp) => {
          // recupero la organization que cree antes
          chai.request(server)
            .get('/api/Organizations')
            .end((err, reso) => {
              //  console.log('Llegue a ...');
              //  console.log(resp.body[0]);
              // console.log(reso.body[0]);
              chai.request(server).post('/api/donationRequests')
                .send({
                  creationDate: '2018-04-12',
                  amount: 0,
                  expirationDate: '2018-04-20',
                  isPermanent: false,
                  covered: 0,
                  promised: 0,
                  isOpen: true,
                  description: 'Leche',
                  productId: resp.body[0].id,
                  organizationId: reso.body[0].id,
                })
                .end((err, res) => {
                  // console.log(res.body);
                  res.body.should.be.a('object');
                  res.should.have.status(404);
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
});
