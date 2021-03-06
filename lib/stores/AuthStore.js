var BaseStore = require('cork-app-utils').BaseStore;
var ConfigModel = require('../models/ConfigModel');

class AuthStore extends BaseStore {

  constructor() {
    super();
    this.CUSTOM_STATES = {
      PENDING : 'pending',
      NOT_LOGGED_IN : 'notLoggedIn',
      LOGGED_IN : 'loggedIn'
    }

    var user = {};
    if( typeof localStorage !== 'undefined' ) {
      user = localStorage.getItem(ConfigModel.get().auth0.localStorageKey);
      user = user ? JSON.parse(user) : {};
    }

    this.events = {
      AUTH_UPDATE : 'auth-update'
    }


    this.data = {
      state : this.CUSTOM_STATES.PENDING,
      user : user
    }
  }

  setUser(user) {
    this.data = {
      user, 
      state: user.isAnonymous ? this.CUSTOM_STATES.NOT_LOGGED_IN : this.CUSTOM_STATES.LOGGED_IN
    };
    
    this.emit(this.events.AUTH_UPDATE, this.data);
  }

  notLoggedIn() {
    this.data = {
      user : {},
      state : this.CUSTOM_STATES.NOT_LOGGED_IN
    }

    this.emit(this.events.AUTH_UPDATE, this.data);
  }

}

module.exports = new AuthStore();