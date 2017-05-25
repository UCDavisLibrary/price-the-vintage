var actions = require('../actions/activity').ACTIONS;

var initialState = {
  byId : {}
};

function set(state, action) {
  if( !state.byId[action.id] ) {
    state.byId[action.id] = {};
  }

  var newState = {[action.uid] : action.timestamp};

  state.byId = Object.assign({}, state.byId);
  state.byId[action.id] = Object.assign({}, state.byId[action.id], newState);
  

  return Object.assign({}, state);
}

function remove(state, action) {
  if( !state.byId[action.id] ) {
    return state;
  }

  if( action.uid ) {
    delete state.byId[action.id][action.uid];
  } else {
    delete state.byId[action.id];
  }

  state.byId = Object.assign({}, state.byId);
  state.byId[action.id] = Object.assign({}, state.byId[action.id]);
  
  return Object.assign({}, state);
}

function activity(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER_ACTIVITY:
      return set(state, action);
    case actions.REMOVE_USER_ACTIVITY:
      return remove(state, action);
    default:
      return state
  }
}

module.exports = activity;