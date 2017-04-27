var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/appState');
var eventBus = require('app/eventBus');

describe('Redux: appState', function() {

    var state = {
      catalogSearchPopupDisplayed : false,
      section: 'list',
      editingMark: false,
      viewingMark: true,
      markId : 1234
    }

    it('should set appState', (next) => {
      eventBus.once('app-state-update', (e) => {
      
        assert.deepEqual(e, state);
        next();
      });

      store.dispatch(
        actions.updateState(state)
      )
    });
});