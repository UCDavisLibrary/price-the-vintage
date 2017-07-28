var admin = require('firebase-admin');
var firebaseWrapper = require('app/firebase');
var config = require('app/config').firebase.prod;
var AuthStore = require('app/stores/AuthStore');
var serviceAccount = require('app/config/price-the-vintage-firebase-adminsdk');

/**
 * Inject admin firebase in place of client (Oauth) verion
 */
config = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount)
};
admin.initializeApp(config);
firebaseWrapper(admin);

/**
 * Setup redux store with fake auth account
 */

AuthStore.data.user = {
  uid : '_test_'
}

module.exports = firebaseWrapper();