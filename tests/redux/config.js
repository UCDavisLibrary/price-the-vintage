var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/config');
var eventBus = require('app/eventBus');

describe('Redux: config', function() {

    var host = 'https://foo.com';

    it('should set host', () => {
      store.dispatch(
        actions.setConfigHost(host)
      );
      assert.equal(store.getState().config.apiHost, host);
    });
});