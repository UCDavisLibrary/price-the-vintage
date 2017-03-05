var actions = require('../actions/appState').ACTIONS;

var initialState = {
  section : '',
  editingMark : false,
  catalogSearchPopupDisplayed : false 
};

function update(state, action) {
  return Object.assign({}, state, action.state);
}

function appState(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_APP_STATE:
      return update(state, action);
    default:
      return state
  }
}
module.exports = appState;