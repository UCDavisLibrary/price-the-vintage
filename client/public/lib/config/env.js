const utils = require('../utils');

var location = 'remote';
var env = 'dev';

// browser land
if( typeof window !== 'undefined' ) {

  if( utils.getParameterByName('location') ) {
    location = utils.getParameterByName('location');
  } else if( window.location.host.indexOf('localhost') > -1 ) {
    location = 'local';
  }

  if( utils.getParameterByName('env') ) {
    env = getParameterByName('env');
  } else if( window.location.host === 'ptv.library.ucdavis.edu' ||
            window.location.host === 'price-the-vintage.firebaseapp.com' ) {
    env = 'prod';
  }

// node land
} else {
  env = process.env.PRICE_THE_VINTAGE_ENV || 'dev';
}

module.exports = {location, env};