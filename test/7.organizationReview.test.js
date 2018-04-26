
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


var organizationReviewSchema = {
  title: 'Organization Review Schema V1',
  type: 'object',
  required: [
    'liked',
    'description',
    'donnerId',
    'donationRequestId'
  ],
  properties: {
    liked: {
      type: 'boolean',
    },
    description: {
      type: 'string',
    },
    donnerId: {
      type: 'string',
    },
    donationRequestId: {
      type: 'string',
    },

  },
};

// esto se ejecuta primero de todo
describe('Organization Review', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Organizations Reviews..');
    chai.request(server)
      .delete('/api/OrganizationReviews')
      .end((err, res) => {
        done();
      });
  });


  describe('/POST api/OrganizationReviews ', function() {
    this.timeout(100000);
    it('it should post one Organization Review', (done) => {
      chai.request(server)
        .get('/api/Donners')
        .end((err, res) => {
      chai.request(server)
        .get('/api/DonationRequests')
        .end((err, respuesta) => {
          console.log('Llegue a ...');
          console.log(res.body[0]);
          chai.request(server).post('/api/OrganizationReviews')
            .send({
              liked: true,
              description: 'Hola esto es una descripcion',
              donnerId: res.body[0].id,
              donationRequestId: respuesta.body[0].id,
            })
            .end((err, res) => {
              res.body.should.be.a('object');
              res.body.should.be.jsonSchema(organizationReviewSchema);
              res.should.have.status(200);
              done();
            });

          });
        });
    });
  });


  describe('/GET api/OrganizationReviews ', function() {
    this.timeout(100000);
    it('it should get all Organizations Reviews', (done) => {
      chai.request(server)
        .get('/api/OrganizationReviews')
        .end((err, res) => {
          res.body.should.be.a('array');
          console.log("El objeto es.....");
          console.log(res.body[0]);
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(organizationReviewSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});
