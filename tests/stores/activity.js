var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var ActivityStore = require('../../lib/stores/ActivityStore');

describe('Stores: ActivityStore', function() {

    var uid = '12345';
    var objectId = '09876';

    it('should let set users activity', (next) => {
      var timestamp = Date.now();

      EventBus.once(ActivityStore.UPDATE_EVENT, (e) => {
        assert.equal(e.state, ActivityStore.STATE.LOADED);
        assert.equal(e.id, objectId);
        assert.equal(e.users[uid], timestamp);
        assert.notEqual(ActivityStore.data.byId[objectId], undefined);
        next();
      });

      ActivityStore.set({
        id : objectId,
        uid, timestamp
      });
    });

    it('should remove users activity', (next) => {
      var timestamp = Date.now();

      EventBus.once(ActivityStore.UPDATE_EVENT, (e) => {
        assert.equal(e.state, ActivityStore.STATE.LOADED);
        assert.equal(e.id, objectId);
        assert.deepEqual(e.users, {});
        next();
      });

      ActivityStore.remove({
        id: objectId,
        timestamp
      });
    });

});