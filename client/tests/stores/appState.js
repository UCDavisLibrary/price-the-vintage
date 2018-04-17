var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var AppStateStore = require('../../lib/stores/AppStateStore');

describe('Stores: AppStateStore', function() {

    var state = {
      catalogSearchPopupDisplayed : false,
      section: 'list',
      editingMark: false,
      viewingMark: true,
      markId : 1234
    }

    it('should set appState', (next) => {
      EventBus.once(AppStateStore.events.APP_STATE_UPDATE, (e) => {
        assert.deepEqual(e, state);
        next();
      });

      AppStateStore.set(state);
    });
});