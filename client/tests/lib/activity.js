const assert = require('assert');
const admin = require('../utils/firebase-admin');
const firebase = require('../../public/src/firebase');
const activity = require('../../public/src/lib/activity');
const AuthModel = require('../../public/src/models/AuthModel')
const auth = require('../utils/auth');
const wait = require('../utils/wait');
const assertEventOrder = require('../utils/assertEventOrder');

let testCatalogId = '10000000-0000-0000-0000-000000000000';
let testPageId = '00000000-0000-0000-0000-000000000001';

let testCatalogId2 = '20000000-0000-0000-0000-000000000000';
let testPageId2 = '00000000-0000-0000-0000-000000000002';


describe('activity library', function() {

  before(async () => {
    console.log(0);
    // login test user
    await auth.login();
    
    await cleanup();
  });

  it('should set activity state', async () => {
    let before = Date.now();
    await activity.set(TEST_UID, testCatalogId, testPageId);
    let after = Date.now();

    await assertActivityState(before, after, testCatalogId, testPageId);
  });

  it('should set new activity state after page change', async () => {
    let before = Date.now();
    await activity.set(TEST_UID, testCatalogId2, testPageId2);
    let after = Date.now();

    await assertActivityState(before, after, testCatalogId2, testPageId2);
  });

  it('should set just catalog activity', async () => {
    let before = Date.now();
    await activity.set(TEST_UID, testCatalogId);
    let after = Date.now();

    let uActivity = (await activity.service.getUserActivity(TEST_UID)).val();
    assert.equal(Object.keys(uActivity).length, 1);

    let rActivity = await firebase.database().ref(`/activity/${testCatalogId}`).once('value');
    rActivity = rActivity.val();

    assert.equal(Object.keys(rActivity).length, 1);
    assert.equal(rActivity[TEST_UID] <= after, true);
    assert.equal(rActivity[TEST_UID] >= before, true);

    rActivity = await firebase.database().ref(`/activity/${testCatalogId2}`).once('value');
    rActivity = rActivity.val();
    assert.equal(rActivity, null);
  });

  it('should remove activity on disconnect', async () => {
    // first ensure a activity state
    let before = Date.now();
    await activity.set(TEST_UID, testCatalogId, testPageId);
    activity.appState = {
      catalogId : testCatalogId,
      pageId : testPageId
    }
    let after = Date.now();

    await assertActivityState(before, after, testCatalogId, testPageId);

    // now disconnect
    await firebase.disconnect();
    
    // helper below, awaits 100ms for firebase to detect disconnect
    await ensureNull();
  });

  it('should reset activity on connect', (next) => {
    let before = Date.now();
    // reconnect
    firebase.connect();

    let connectionRef = firebase
      .database()
      .ref('.info/connected');

    connectionRef.on('value', async (snap) => {
      if (snap.val() !== true) return;

      await wait(200);

      let after = Date.now();
      await assertActivityState(before, after, testCatalogId, testPageId);

      next();
    });

    // fake a event from AppStateModel
    activity._onAppStateUpdate(activity.appState);
  });

  it('should remove activity on logout', async () => {
    // this was destroyed in test above
    AuthModel.enableFirebaseAuthListener();
    await wait(200);

    // logout test user
    await auth.logout();

    // helper below, awaits 100ms for firebase to detect logout
    await ensureNull();
  });

  after(async () => {
    activity.disableModelListeners();

    await cleanup();

    // logout test user
    await auth.logout();
  });

});

function ensureNull() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // use admin connection to ensure state
        let uActivity = (await admin.database().ref(`users/${TEST_UID}/activity`).once('value')).val();
        assert.equal(uActivity, null);
        
        let rActivity = await admin.database().ref(`/activity/${testCatalogId}`).once('value');
        assert.equal(rActivity.val(), null);

        rActivity = await admin.database().ref(`/activity/${testCatalogId}`).once('value');
        assert.equal(rActivity.val(), null);
      } catch(e) {
        reject(e);
      }

      resolve();
    }, 100);
  });
}

async function assertActivityState(before, after, catalogId, pageId) {
  let uActivity = (await activity.service.getUserActivity(TEST_UID)).val();
  assert.equal(Object.keys(uActivity).length, 2);

  let ids = [catalogId, pageId];
  for( var i = 0; i < ids.length; i++ ) {
    let id = ids[i];

    assert.equal(uActivity[id] <= after, true);
    assert.equal(uActivity[id] >= before, true);

    let rActivity = await firebase.database().ref(`/activity/${id}`).once('value');
    rActivity = rActivity.val();

    assert.equal(Object.keys(rActivity).length, 1);
    assert.equal(rActivity[TEST_UID] <= after, true);
    assert.equal(rActivity[TEST_UID] >= before, true);
  }
}

async function cleanup() {
  await admin.database().ref(`activity/${testPageId}`).set(null);
  await admin.database().ref(`activity/${testCatalogId}`).set(null);
  await admin.database().ref(`activity/${testPageId2}`).set(null);
  await admin.database().ref(`activity/${testCatalogId2}`).set(null);
  await admin.database().ref(`users/${TEST_UID}`).set(null);
}