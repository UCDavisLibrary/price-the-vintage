var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/activity');
var eventBus = require('app/eventBus');

describe('Redux: activity', function() {

    var uid = '12345';
    var objectId = '09876';

    it('should let set users activity', (next) => {
      var time = Date.now();

      eventBus.once('user-activity-update', (e) => {
        assert.equal(e.state, 'loaded');
        assert.equal(e.id, objectId);
        assert.equal(e.users[uid], time);
        next();
      });

      store.dispatch(
        actions.setUserActivity(objectId, uid, time)
      )
    });

    it('should remove users activity', (next) => {
      var time = Date.now();

      eventBus.once('user-activity-update', (e) => {
        assert.equal(e.state, 'loaded');
        assert.equal(e.id, objectId);
        assert.deepEqual(e.users, {});
        next();
      });

      store.dispatch(
        actions.removeUserActivity(objectId, uid)
      )
    });

});