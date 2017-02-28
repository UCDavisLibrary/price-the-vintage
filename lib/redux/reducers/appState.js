var appStateActions = require('../actions/appState');
var utils = require('./utils');

var appSections = appStateActions.APP_SECTIONS;

var initialState = {
  section : ''
};

function setSection(state, action) {
  return utils.assign(state, {section: action.section});
}


function appState(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SECTION:
      return setSection(state, action);
    default:
      return state
  }
}
module.exports = appState;