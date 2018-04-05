'use strict';

const cron = require('node-cron');
var loopback = require('loopback');

module.exports = function(server) {
  cron.schedule('* * */1 * *', function() {
    console.log('Checking requests validity');
    server.models.DonationRequest.find(
      {where: {isOpen: true}},
      (err, donations) =>{
        console.log(donations);
        donations.forEach((donation) =>{
          if (donation.expirationDate < Date.now()) {
            console.log('Expired..');
            console.log(donation);
            donation.isOpen = false;
            donation.save();
          }
        });
      });
  });
};
