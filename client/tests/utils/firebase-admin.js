const admin = require('firebase-admin');
let config = require('../../public/src/config').firebase.dev;
const serviceAccount = require('../../public/src/config/price-the-vintage-dev-firebase-adminsdk');

config = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount)
};
admin.initializeApp(config);

global.TEST_UID = '_test_';

module.exports = admin;