var firebase = require('firebase');
firebase.initializeApp(require('./config').firebase);

/**
 * Inject method is for command line utility allowing you to 
 * inject the firebase-admin library if you want.
 */
module.exports = function(inject) {
  if( inject ) firebase = inject;
  return firebase;
}