var actions = require('../../actions/collections/catalogs').ACTIONS;

var initialState = {
  search : {
    state : 'init'
  },
  byId : {},
  selected : ''
};


/**
 * Data
 */
function setSearchData(state, value) {
  var newIds = {};

  if( value && value.data ) {
    value.data.forEach(item => newIds[item.id] = item);
  }

  var newSearch = {
    state : 'loaded',
    results : value
  }

  var newState = {
    search : Object.assign({}, state.search, newSearch),
    byId : Object.assign({}, state.byId, newIds)
  }

  return Object.assign({}, state, newState);
}

function setSearchError(state, value) {
  var newSearch = Object.assign({}, state.search, {state: 'error', error: value});
  return Object.assign({}, state, newSearch);
}

function setSearchState(state, value) {
  var newSearch = Object.assign({}, state.search, {state: value});
  return Object.assign({}, state, {search: newSearch});
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function catalogs(state = initialState, action) {
  switch (action.type) {
    
    case actions.SEARCH_CATALOGS_REQUEST:
      return setSearchState(state, {state: 'loading'});
    case actions.SEARCH_CATALOGS_SUCCESS:
      return setSearchData(state, action.response.body);
    case actions.SEARCH_CATALOGS_FAILURE:
      return setSearchError(state, {error: action.error});

    case actions.SELECT_CATALOG:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = catalogs;