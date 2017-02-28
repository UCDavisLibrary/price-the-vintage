var actions = require('../actions/appState');
var appSections = actions.APP_SECTIONS;
var actions = actions.ACTIONS;

var initialState = {
  section : ''
};

function setSection(state, action) {
  return Object.assign({}, state, {section: action.section});
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