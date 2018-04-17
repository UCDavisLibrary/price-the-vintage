const assert = require('assert');
const firebase = require('../utils/firebase');
const marks = require('../../public/src/lib/marks');

let testPageId = '_testing_framework_123_';

let pendingMark = {
  name : 'foo',
  type : 'red',
  user : TEST_UID,
  isAnonymous : false
}
let testMarkId = '';

describe('marks library', function() {

  before(async () => {
    await firebase.database().ref(`marks/${testPageId}`).set(null);
  });

  it(`should set a pending mark`, async () => {
    let result = await marks.setPending(testPageId, pendingMark);
    testMarkId = result.markId;

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
    return new Promise(async (resolve, reject) => {
      let eventCount = 0;
      // note, you see multiple 'loaded' and 'deleted' event because the update 
      // function fires one and the page listener fires the other
      let eventOrder = ['saving', 'loaded', 'loaded', 'saving', 'loaded', 'loaded',
      'deleting', 'deleted', 'deleted'];
      
      marks.MasterController.on(marks.store.events.MARKS_UPDATE, (e) => {
        assert.equal(e.state, eventOrder[eventCount]);
        eventCount++;
        if( eventCount === eventOrder.length ) {
          marks.MasterController.removeAllListeners(marks.store.events.MARKS_UPDATE);
          resolve();
        }
      });

      marks.listenToPageMarks(testPageId);
      assert.equal(Object.keys(marks.service.refs).length === 1, true);
      assert.notEqual(marks.service.refs[testPageId], undefined);

      // set a new mark
      let result = await marks.setPending(testPageId, pendingMark);
      testMarkId = result.markId;
      pendingMark.bottle = 'tall';

      // update new mark
      await marks.setPending(testPageId, testMarkId, pendingMark);

      // delete new mark
      await marks.removePending(testPageId, testMarkId);
    });
  });

  it('should remove previous page listener', () => {
    marks.cleanup();
    assert.equal(Object.keys(marks.service.refs).length === 0, true);
    assert.equal(marks.service.refs[testPageId], undefined);

    // now making mark updates should fire like so
    return new Promise(async (resolve, reject) => {
      let eventCount = 0;
      let eventOrder = ['saving', 'loaded', 'saving', 'loaded',
      'deleting', 'deleted'];
      
      marks.MasterController.on(marks.store.events.MARKS_UPDATE, (e) => {
        assert.equal(e.state, eventOrder[eventCount]);
        eventCount++;
        if( eventCount === eventOrder.length ) {
          marks.MasterController.removeAllListeners(marks.store.events.MARKS_UPDATE);
          resolve();
        }
      });

      // set a new mark
      let result = await marks.setPending(testPageId, pendingMark);
      testMarkId = result.markId;
      pendingMark.bottle = 'big';

      // update new mark
      await marks.setPending(testPageId, testMarkId, pendingMark);

      // delete new mark
      await marks.removePending(testPageId, testMarkId);
    });
  });

  after(async () => {
    // clean test page
    await firebase.database().ref(`marks/${testPageId}`).set(null);
  });

});