var configActions = require('../actions/config');

var actions = configActions.ACTIONS;

var initialState = require('../../config');

function setHost(state, action) {
  return Object.assign({}, state, {apiHost: action.host});
}

function config(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CONFIG_HOST:
      return setHost(state, action);
    default:
      return state
  }
}
module.exports = config;