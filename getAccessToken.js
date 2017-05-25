var admin = require('firebase-admin');
var config = require('app/config').firebase.prod;
var serviceAccount = require('app/config/price-the-vintage-firebase-adminsdk');

/**
 * Inject admin firebase in place of client (Oauth) verion
 */
config = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount)
};

config.credential.getAccessToken().then((token) => {
  console.log(token);
});