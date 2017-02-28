var actions = require('../../actions/collections/catalogs').ACTIONS;

var initialState = {
  byId : {},
  state : 'init',
  selected : ''
};


/**
 * Data
 */
function setData(state, value) {
  return Object.assign({}, state, {byId: value, error: null, state: 'loaded'});
}

function setError(state, value) {
  return Object.assign({}, state, {error: value, byId: {}, state: 'error'});
}

function setState(state, value) {
  return Object.assign({}, state, {state: value});
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function catalogs(state = initialState, action) {
  switch (action.type) {

    case actions.LOAD_CATALOGS_REQUEST:
      return setState(state, {state: 'loading'});
    case actions.LOAD_CATALOGS_SUCCESS:
      return setData(state, action.response.body);
    case actions.LOAD_CATALOGS_FAILURE:
      return setError(state, {error: action.error});

    case actions.SELECT_CATALOG:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = catalogs;