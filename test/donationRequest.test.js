'use strict';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const fs = require('fs');
const should = chai.should();

chai.use(chaiHttp);

describe('Donation Request', (done) => {
  describe('/POST api/ ', function() {
    it('it should post a donation', (done) => {
      chai.request(server)
        .post('/api/DonationRequests')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      done();
    });
  });
});

