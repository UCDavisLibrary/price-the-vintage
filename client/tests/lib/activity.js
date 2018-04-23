const assert = require('assert');
const admin = require('../utils/firebase-admin');
const firebase = require('../../public/src/firebase');
const activity = require('../../public/src/models/ActivityModel');
const auth = require('../utils/auth');
const assertEventOrder = require('../utils/assertEventOrder');

let testCatalogId = '10000000-0000-0000-0000-000000000000';
let testPageId = '00000000-0000-0000-0000-000000000001';

describe('marks library', function() {

  before(async () => {
    firebase.connect();

    await cleanup();

    // login test user
    await auth.login();
  });

  // it('should set activity state', async () => {
  //   activity.set(LOCAL_UID, testCatalogId, testPageId);
  // });

  after(async () => {
    firebase.disconnect();

    await cleanup();

    // login test user
    await auth.logout();
  });

});

async function cleanup() {
  await admin.database().ref(`activity/${testPageId}`).set(null);
  await admin.database().ref(`activity/${testCatalogId}`).set(null);
  await admin.database().ref(`users/${TEST_UID}`).set(null);
}