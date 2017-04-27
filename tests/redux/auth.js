var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/auth');
var eventBus = require('app/eventBus');

describe('Redux: auth', function() {

    var user = {
      uid : '12345',
      email : 'foo@bar.com',
      roles : ['admin']
    }

    it('should set auth user', (next) => {
      var time = Date.now();

      eventBus.once('auth-update', (e) => {
        assert.equal(e.state, 'loggedIn');
        assert.deepEqual(e.user, user);
        next();
      });

      store.dispatch(
        actions.setUser(user)
      )
    });

    it('should logout', (next) => {
      var time = Date.now();

      eventBus.once('auth-update', (e) => {
        assert.equal(e.state, 'notLoggedIn');
        assert.deepEqual(e.user, {});
        next();
      });

      store.dispatch(
        actions.notLoggedIn()
      )
    });


});