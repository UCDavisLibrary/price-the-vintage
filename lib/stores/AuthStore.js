var BaseStore = require('cork-app-utils').BaseStore;

class AuthStore extends BaseStore {

  constructor() {
    super();
    this.CUSTOM_STATES = {
      PENDING : 'pending',
      NOT_LOGGED_IN : 'notLoggedIn',
      LOGGED_IN : 'loggedIn'
    }

    this.data = {
      state : this.CUSTOM_STATES.PENDING,
      user : {}
    }
  }

  setUser(user) {
    this.data = {user, state: this.CUSTOM_STATES.LOGGED_IN};
    this.emit('auth-update', this.data);
  }

  notLoggedIn() {
    this.data = {
      user : {},
      state : this.CUSTOM_STATES.NOT_LOGGED_IN
    }

    this.emit('auth-update', this.data);
  }

}

module.exports = new AuthStore();