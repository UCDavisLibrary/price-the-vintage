const jwt = require('jsonwebtoken');
const secrets = require('../secrets.json');

module.exports = function(username, isAdmin=true) {

  let payload  = {
    email : username,
    email_verified : true
  }

  if( isAdmin ) {
    payload.role = 'admin',
    payload.isAdmin = true;
  }

  return jwt.sign(payload, secrets.jwtSecret.dev, {
    issuer: 'https://ucdlibrary.auth0.com/'
  });
}