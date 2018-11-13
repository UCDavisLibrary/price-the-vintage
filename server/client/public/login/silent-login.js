var Auth0 = require('auth0-js');
var config = require('../lib/config');

var auth0 = new Auth0.WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientID
});

auth0.parseHash(window.location.hash, function (err, result) {
  parent.postMessage(err || result, window.location);
});