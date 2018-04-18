const admin = require('firebase-admin');
const firebaseWrapper = require('../../public/src/firebase');
let config = require('../../public/src/config').firebase.dev;
const serviceAccount = require('../../public/src/config/price-the-vintage-dev-firebase-adminsdk');

/**
 * Inject admin firebase in place of client (Oauth) verion
 */
config = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount)
};

// so we can text connecting/disconnecting from firebase
admin.connect = function() {
  admin.initializeApp(config);
}
admin.disconnect = async function() {
  await admin.database().goOffline();
  return admin.app().delete();
}

firebaseWrapper(admin);

global.TEST_UID = '_test_';

module.exports = admin;