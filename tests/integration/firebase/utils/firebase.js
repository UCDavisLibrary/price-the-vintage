var admin = require('firebase-admin');
var firebaseWrapper = require('../../../../lib/firebase');
var config = require('../../../../lib/config').firebase.prod;
var AuthStore = require('../../../../lib/stores/AuthStore');
var serviceAccount = require('../../../../lib/config/price-the-vintage-firebase-adminsdk');

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