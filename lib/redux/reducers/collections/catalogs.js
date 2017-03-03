var actions = require('../../actions/collections/catalogs').ACTIONS;

var initialState = {
  search : {
    state : 'init'
  },
  byId : {},
  selected : ''
};


function setData(state, id, value) {
  state.byId = Object.assign({}, state.byId, {[id]: {id: id, payload: value, state: 'loaded' }});
  return Object.assign({}, state);
}

function setError(state, id, value) {
  state.byId = Object.assign({}, state.search, {[id]: {id: id, state: 'error', error: value}});
  return Object.assign({}, state);
}

function setState(state, id, value) {
  state.byId = Object.assign({}, state.byId, {[id]: {id: id, state: value}});
  return Object.assign({}, state);
}


function setSearchData(state, value) {
  var newIds = {};

  if( value && value.data ) {
    value.data.forEach(item => { 
      newIds[item.id] = {id: item.id, payload: item, state: 'loaded'}
    });
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
    
    case actions.GET_CATALOG_REQUEST:
      return setState(state, action.id, 'loading');
    case actions.GET_CATALOG_SUCCESS:
      return setData(state, action.id, action.response);
    case actions.GET_CATALOG_FAILURE:
      return setError(state, action.id, action.error);

    case actions.SEARCH_CATALOGS_REQUEST:
      return setSearchState(state, 'loading');
    case actions.SEARCH_CATALOGS_SUCCESS:
      return setSearchData(state, action.response);
    case actions.SEARCH_CATALOGS_FAILURE:
      return setSearchError(state, {error: action.error});

    case actions.SELECT_CATALOG:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = catalogs;