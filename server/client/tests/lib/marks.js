const assert = require('assert');
const admin = require('../utils/firebase-admin');
const firebase = require('../../public/src/firebase');
const marks = require('../../public/src/lib/marks');
const auth = require('../utils/auth');
const jwt = require('../utils/jwt');
const wait = require('../utils/wait');
const AuthModel = require('../../public/src/models/AuthModel');
const assertEventOrder = require('../utils/assertEventOrder');

let testPageId = '00000000-0000-0000-0000-000000000001';

let pendingMark = {
  name : 'foo',
  wineType : 'Still',
  color : 'Red',
  section : 'test',
  user : TEST_UID,
  isAnonymous : false
}
let testMarkId = '';
let testUser = 'tester@ucdavis.edu';

let token = jwt(testUser);

describe('marks library', function() {

  before(async () => {
    // login test user
    await auth.login();

    await admin.database().ref(`marks/${testPageId}`).set(null);
    // clear marks db
    await marks.service.clearApprovedTestMarks(token);
  });

  it(`should set a pending mark`, async () => {
    let mark = await marks.setPending(testPageId, pendingMark);
    testMarkId = mark.id;

    assert.notEqual(testMarkId, '');
  });

  it(`should get a pending mark`, async () => {
    let mark = await marks.getPendingMark(testPageId, testMarkId);
    assert.equal(mark.state, 'loaded');
    assert.equal(mark.markId, testMarkId);
    assert.equal(mark.pageId, testPageId);
    assert.equal(mark.approved, false);

    for( var key in pendingMark ) {
      assert.equal(mark.payload[key], pendingMark[key]);
    }
  });

  it('should vote a pending mark', async () => {
    await marks.votePending(TEST_UID, testPageId, testMarkId, 'up');
    let mark = await marks.getPendingMark(testPageId, testMarkId);
    let votes = mark.payload.votes;
    assert.equal(votes[TEST_UID].type, 'up');
  });

  it('should delete a pending mark', async () => {
    let resp = await marks.removePending(testPageId, testMarkId);
    assert.equal(resp.state, 'deleted');
    assert.equal(resp.markId, testMarkId);
    assert.equal(resp.pageId, testPageId);
    assert.equal(resp.approved, false);
    assert.equal(resp.payload, null);
  });

  it('should set tmp mark', async () => {
    await marks.updateTempMark(TEST_UID, testPageId, [1,2]);
    let mark = await marks.getPendingMark(testPageId, marks.tmpMark.id);
    assert.deepEqual(mark.payload.xy, [1,2]);
  });

  it('should remove tmp mark on disconnect', async () => {
    // custom methods for testing
    await firebase.disconnect(); 

    firebase.connect();
    // this was destroyed on disconnect
    AuthModel.enableFirebaseAuthListener();

    let mark = await marks.getPendingMark(testPageId, marks.tmpMark.id);
    assert.equal(mark.state, 'deleted');
    assert.equal(mark.payload, null);
  });

  it('should remove tmp mark via method call', async function() {
    await marks.updateTempMark(TEST_UID, testPageId, [3,4]);
    let mark = await marks.getPendingMark(testPageId, marks.tmpMark.id);
    assert.equal(mark.state, 'loaded');
    assert.equal(mark.markId, marks.tmpMark.id);
    assert.deepEqual(mark.payload.xy, [3,4]);

    await marks.removeTempMark(TEST_UID);
    mark = await marks.getPendingMark(testPageId, marks.tmpMark.id);
    assert.equal(mark.state, 'deleted');
    assert.equal(mark.payload, null);
  });

  it('should wait a sec so we don\'t pollute next test', () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
  })

  it('should listen to page marks', () => {
    return assertEventOrder(
      marks.EventBus, 
      marks.store.events.MARKS_UPDATE,
      ['saving', 'loaded', 'saving', 'loaded', 'deleting', 'deleted'],
      async () => {
        marks.listenToPageMarks(testPageId);
        assert.equal(Object.keys(marks.service.refs).length === 1, true);
        assert.notEqual(marks.service.refs[testPageId], undefined);
  
        // set a new mark
        let mark = await marks.setPending(testPageId, pendingMark);
        testMarkId = mark.markId;
        pendingMark.bottle = 'tall';
  
        // update new mark
        await marks.setPending(testPageId, testMarkId, pendingMark);
  
        // delete new mark
        await marks.removePending(testPageId, testMarkId);
      }
    )
  });

  it('should wait a sec so we don\'t pollute next test', () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });
  });

  it('should remove previous page listener', () => {
    marks.cleanup();
    assert.equal(Object.keys(marks.service.refs).length === 0, true);
    assert.equal(marks.service.refs[testPageId], undefined);

    return assertEventOrder(
      marks.EventBus, 
      marks.store.events.MARKS_UPDATE,
      ['saving', 'loaded', 'saving', 'loaded', 'deleting', 'deleted'],
      async () => {
        // set a new mark
        let result = await marks.setPending(testPageId, pendingMark);
        testMarkId = result.markId;
        pendingMark.bottle = 'big';

        // update new mark
        await marks.setPending(testPageId, testMarkId, pendingMark);

        // delete new mark
        await marks.removePending(testPageId, testMarkId);
      }
    );
  });

  it('let you approve a mark', async () => {
    // check event order is as we expect
    let eventOrder = [{
      state : 'saving', 
      approved : false
    }, {
      state : 'loaded', 
      approved : false
    }, {
      state: 'saving', 
      approved : true
    }, {
      state : 'loaded',
      approved : true
    }]

    await assertEventOrder(
      marks.EventBus, marks.store.events.MARKS_UPDATE, eventOrder,
      async () => {
        // add mark
        let mark = await marks.setPending(testPageId, pendingMark);

        // now approve mark
        await marks.approveMark(mark.payload, mark.id, mark.pageId, token);
      },
      (e, checkData) => {
        assert.equal(e.state, checkData.state);
        assert.equal(e.approved, checkData.approved);
      }
    );

    marks.cleanup();
  });

  it('let you get all marks for page (pending and approved)', async function() {
    // add another mark so we have on pending (firebase) and one
    // approved (postgresql)
    let pm = await marks.setPending(testPageId, pendingMark);

    let resp = await marks.getPageMarks(testPageId);
    // we are only checking loaded marks.  the tests above will leave
    // deleted stubs in state store
    resp = resp.filter(mark => mark.state === 'loaded');

    assert.equal(resp.length, 2);
    assert.equal(resp.findIndex(mark => mark.approved === true) > -1 , true);
    assert.equal(resp.findIndex(mark => mark.approved === false) > -1 , true);

    // cleanup
    await marks.service.clearApprovedTestMarks(token);
    await admin.database().ref(`marks/${testPageId}`).set(null);
    marks.store.data.byId = {};
    await wait(200);
  });

  it('should check and remove stale tmp marks', async function() {
    // now lets add two tmp marks
    await marks.setPending(testPageId, Object.assign({isTemp: true}, pendingMark));
    await marks.setPending(testPageId, Object.assign({isTemp: true}, pendingMark));

    // verify we have two marks
    let loaded = [];
    for( var key in marks.store.data.byId ) {
      if( marks.store.data.byId[key].state === 'loaded' ) {
        loaded.push(marks.store.data.byId[key]);
      }
    }

    assert.equal(loaded.length, 2);

    // now set our stale time to 0
    marks.CLEANUP_TIME = 0;

    // now tell it to check for stale marks
    marks.checkStaleMarks();

    // no marks should be in a loaded state
    loaded = [];
    for( var key in marks.store.data.byId ) {
      if( marks.store.data.byId[key].state === 'loaded' ) {
        loaded.push(marks.store.data.byId[key]);
      }
    }
    assert.equal(loaded.length, 0);
  });

  after(async () => {
    // clean test page
    await admin.database().ref(`marks/${testPageId}`).set(null);

    // clear marks db
    await marks.service.clearApprovedTestMarks(token);

    // logout test user
    await auth.logout();
  });

});