var BaseStore = require('cork-app-utils').BaseStore;

class AuthStore extends BaseStore {

  constructor() {
    this.STATES = {
      PENDING : 'pending',
      NOT_LOGGED_IN : 'notLoggedIn',
      LOGGED_IN : 'loggedIn'
    }

    this.data = {
      state : STATES.PENDING,
      user : {}
    }
  }

  setUser(user) {
    this.data = {user, state: this.LOGGED_IN};
    this.emit('auth-update', this.data);
  }

  notLoggedIn() {
    this.data = {
      user : {},
      state : this.STATES.NOT_LOGGED_IN
    }

    this.emit('auth-update', this.data);
  }

}

module.exports = new AuthStore();