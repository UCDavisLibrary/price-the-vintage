var admin = require('firebase-admin');
var firebaseWrapper = require('app/firebase');
var redux = require('app/redux/store');
var config = require('app/config').firebase;
var serviceAccount = require('app/config/ucd-library-apps-firebase-adminsdk-vrtjx-8eef33af91');

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
redux.getState().auth.user = {
  uid : '_test_'
}

module.exports = firebaseWrapper();