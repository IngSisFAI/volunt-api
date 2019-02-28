
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


var donnerReviewSchema = {
  title: 'Donner Review Schema V1',
  type: 'object',
  required: [
    'liked',
    'description',
    'organizationId',
    'donationResponseId'
  ],
  properties: {
    liked: {
      type: 'boolean',
    },
    description: {
      type: 'string',
    },
    organizationId: {
      type: 'string',
    },
    donationResponseId: {
      type: 'string',
    },

  },
};

// esto se ejecuta primero de todo
describe('Donner Review', (done) => {
  before((done) => {
// runs before all tests in this block
    console.log('Deleting Donners Reviews..');
    chai.request(server)
      .delete('/api/DonnerReviews')
      .end((err, res) => {
        done();
      });
  });


  describe('/POST api/DonnerReviews ', function() {
    this.timeout(100000);
    it('it should post one Donner Review', (done) => {
      chai.request(server)
        .get('/api/Organizations')
        .end((err, res) => {
          chai.request(server)
            .get('/api/DonationResponses')
            .end((err, respuesta) => {
              console.log('Llegue a ...');
              console.log(res.body[0]);
              chai.request(server).post('/api/DonnerReviews')
                .send({
                  liked: true,
                  description: 'Hola esto es una descripcion',
                  organizationId: res.body[0].id,
                  donationResponseId: respuesta.body[0].id,
                })
                .end((err, res) => {
                  res.body.should.be.a('object');
                  res.body.should.be.jsonSchema(donnerReviewSchema);
                  res.should.have.status(200);
                  done();
                });

            });
        });
    });
  });


  describe('/GET api/DonnerReviews ', function() {
    this.timeout(100000);
    it('it should get all Donner Reviews', (done) => {
      chai.request(server)
        .get('/api/DonnerReviews')
        .end((err, res) => {
          res.body.should.be.a('array');
          console.log("El objeto es.....");
          console.log(res.body[0]);
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donnerReviewSchema);
          res.should.have.status(200);
          done();
        });
    });
  });
});
