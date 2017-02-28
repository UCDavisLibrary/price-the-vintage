var actions = require('../../actions/collections/pages').ACTIONS;

var initialState = {
  byId : {},
  selected : ''
};

/**
 * Data
 */
function setData(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      state : 'loaded',
      payload : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, byId);
}

function setError(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      state : 'error',
      error : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, byId);
}

function setState(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      state : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, byId);
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function catalogs(state = initialState, action) {
  switch (action.type) {
    
    case actions.GET_CATALOG_PAGES_REQUEST:
      return setState(state, action.catalogId, 'loading');
    case actions.GET_CATALOG_PAGES_SUCCESS:
      return setSearchData(state, action.catalogId, action.response.body);
    case actions.GET_CATALOG_PAGES_FAILURE:
      return setSearchError(state, action.catalogId, action.error);

    case actions.SELECT_CATALOG_PAGE:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = catalogs;