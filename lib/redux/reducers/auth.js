var actions = require('../actions/auth').ACTIONS;

var STATES = {
  PENDING : 'pending',
  NOT_LOGGED_IN : 'notLoggedIn',
  LOGGED_IN : 'loggedIn'
}

var initialState = {
  state : STATES.PENDING,
  user : {}
};

function setUser(state, user, state) {
  return {user, state}
}

function notLoggedIn(state) {
  return {
    user : {},
    state : STATES.NOT_LOGGED_IN
  }
}

function auth(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER:
      var userState = action.user.isAnonymous ?  STATES.NOT_LOGGED_IN : STATES.LOGGED_IN;
      return setUser(state, action.user, userState);
    case actions.NOT_LOGGED_IN:
      return notLoggedIn(state);

    default:
      return state
  }
}
module.exports = auth;