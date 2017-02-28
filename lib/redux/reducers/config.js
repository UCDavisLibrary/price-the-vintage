var configActions = require('../actions/config');
var utils = require('./utils');

var actions = configActions.ACTIONS;

var initialState = require('../../config');

function setHost(state, action) {
  return utils.assign(state, {host: action.host});
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