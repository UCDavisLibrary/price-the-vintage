var ACTIONS = {
  SET_USER: 'SET_USER',
  NOT_LOGGED_IN : 'NOT_LOGGED_IN'
}

function setUser(user) {
  return {
    type : ACTIONS.SET_USER,
    user : user
  }
}

function notLoggedIn() {
  return {
    type : ACTIONS.NOT_LOGGED_IN
  }
}

module.exports = {
  ACTIONS : ACTIONS,
  setUser : setUser,
  notLoggedIn : notLoggedIn
}