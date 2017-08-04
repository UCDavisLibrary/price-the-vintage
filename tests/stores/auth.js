var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var AuthStore = require('../../lib/stores/AuthStore');

describe('Stores: AuthStore', function() {

    var user = {
      uid : '12345',
      email : 'foo@bar.com',
      roles : ['admin']
    }

    it('should set auth user', (next) => {
      EventBus.once('auth-update', (e) => {
        assert.equal(e.state, AuthStore.CUSTOM_STATES.LOGGED_IN);
        assert.deepEqual(e.user, user);
        next();
      });

      AuthStore.setUser(user);
    });

    it('should logout', (next) => {
      EventBus.once('auth-update', (e) => {
        assert.equal(e.state, AuthStore.CUSTOM_STATES.NOT_LOGGED_IN);
        assert.deepEqual(e.user, {});
        next();
      });

      AuthStore.notLoggedIn();
    });


});