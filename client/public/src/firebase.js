let firebase = require('firebase');
let config = require('./config').firebase;

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


let connected = true;
firebase.initializeApp(config);

// mostly for testing, so you can connect/disconnect from firebase
firebase.connect = function() {
  if( connected ) return;
  connected = true;
  firebase.initializeApp(config);
}

firebase.disconnect = async function() {
  if( !connected ) return;
  connected = false;
  await firebase.database().goOffline();
  return firebase.app().delete();
}


module.exports = firebase

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}