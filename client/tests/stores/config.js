var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var ConfigStore = require('../../lib/stores/ConfigStore');

describe('Stores: ConfigStore', function() {

    var host = 'https://foo.com';

    it('should set host', (next) => {
      EventBus.once(ConfigStore.events.APP_CONFIG_UPDATE, (e) => {
        assert.equal(e.apiHost, host);
        assert.equal(ConfigStore.data.apiHost, host);
        next();
      });

      ConfigStore.setHost(host);
    });
});