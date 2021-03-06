var firebase = require('firebase');

var config = require('./config').firebase;

if( typeof window !== 'undefined' ) {
  if( window.location.host === 'ptv.library.ucdavis.edu' ||
      window.location.host === 'price-the-vintage.firebaseapp.com' || 
      getParameterByName('env') === 'prod' ) {
    config = config.prod;
  } else {
    config = config.dev;
  }
} else {
  config = config[process.env.PRICE_THE_VINTAGE_ENV || 'dev'];
}

console.log(`Using firebase database: ${config.databaseURL}`);


firebase.initializeApp(config);

/**
 * Inject method is for command line utility allowing you to 
 * inject the firebase-admin library if you want.
 */
module.exports = function(inject) {
  if( inject ) firebase = inject;
  return firebase;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}