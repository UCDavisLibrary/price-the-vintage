var actions = require('../actions/auth').ACTIONS;

var initialState = {
  state : 'pending',
  user : {}
};

function setUser(state, user) {
  return {
    user : user,
    state : 'loggedIn'
  }
}

function notLoggedIn(state) {
  return {
    user : {},
    state : 'notLoggedIn'
  }
}


function auth(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER:
      return setUser(state, action.user);
    case actions.NOT_LOGGED_IN:
      return notLoggedIn(state);

    default:
      return state
  }
}
module.exports = auth;