const BaseStore = require('@ucd-lib/cork-app-utils').BaseStore;
const localStorage = require('../lib/local-storage');

class AuthStore extends BaseStore {

  constructor() {
    super();

    this.CUSTOM_STATES = {
      PENDING : 'pending',
      NOT_LOGGED_IN : 'notLoggedIn',
      LOGGED_IN : 'loggedIn'
    }

    this.events = {
      AUTH_UPDATE : 'auth-update'
    }

    this.data = {};

    this.reset();
  }

  // mostly used for testing
  reset() {
    let user = localStorage.getItem(APP_CONFIG.auth0.localStorageKey);
    user = user ? JSON.parse(user) : {};

    this.data = {
      state : this.CUSTOM_STATES.PENDING,
      user : user
    }
  }

  setUser(user) {
    let data = {
      user, 
      state: user.isAnonymous ? this.CUSTOM_STATES.NOT_LOGGED_IN : this.CUSTOM_STATES.LOGGED_IN
    };

    if( !this.stateChanged(this.data, data) ) return;

    this.data = data;
    this.emit(this.events.AUTH_UPDATE, this.data);
  }

  notLoggedIn() {
    let data = {
      user : {},
      state : this.CUSTOM_STATES.NOT_LOGGED_IN
    }

    if( !this.stateChanged(this.data, data) ) return;

    this.data = data;
    this.emit(this.events.AUTH_UPDATE, this.data);
  }

}

module.exports = new AuthStore();