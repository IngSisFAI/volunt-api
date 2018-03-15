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
  title: 'Donner review schema v1',
  type: 'object',
  required: ['liked',
    'description',
  ],
  properties: {
    liked: {
      type: 'boolean',
    },
    description: {
      type: 'string',
    },
  },
};

describe('Donner Review', (done) => {
  describe('/GET api/DonnerReview ', function() {
    this.timeout(100000);
    it('it should get all donner review', (done) => {
      chai.request(server)
        .get('/api/DonnerReviews')
        .end((err, res) => {
          res.body.should.be.a('array');
          for (let i = 0; i < res.body.length; i++)
            res.body[i].should.be.jsonSchema(donnerReviewSchema);
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Donner Review', (done) => {
    describe('/POST api/DonnerReview ', function() {
      this.timeout(100000);
      it('ERROR: a  donation response review already exists', (done) => {
        chai.request(server)
          .post('/api/DonnerReviews')
          .send({'liked': true,
            'description': 'string',
            'organizationId': '5a0df599e7f62421fe84b53c',
            'reviewedResponseId': '5a873ef2e4063618513362cb',
          })
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.be.jsonSchema(donnerReviewSchema);
            res.should.have.status(200);
            done();
          });
      }); // del it

      it('ERROR: a  donation response review already exists', (done) => {
        chai.request(server)
          .post('/api/DonnerReviews')
          .send({'liked': true,
            'description': 'string',
            'organizationId': '5a0df599e7f62421fe84b53c',
            'reviewedResponseId': '5a873ef2e4063618513362cb',
          })
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.be.jsonSchema(donnerReviewSchema);
            res.should.have.status(200);
            done();
          });
      });// del it
    });
  });
});

