var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/config');
var eventBus = require('app/eventBus');

describe('Redux: config', function() {

    var host = 'https://foo.com';

    it('should set appState', () => {
      store.dispatch(
        actions.setConfigHost(host)
      );
      assert.equal(store.getState().config.host, host);
    });
});