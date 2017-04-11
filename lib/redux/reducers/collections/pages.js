var actions = require('../../actions/collections/pages').ACTIONS;

var initialState = {
  byId : {},
  byCatalogId : {},
  metadata : {},
  search : {},
  selected : ''
};

/**
 * Data
 */
function setData(state, catalogId, value) {
  var newByCatalogId = {
    [catalogId] : {
      id : catalogId,
      state : 'loaded',
      payload : value
    }
  };

  var newById = {};
  if( value && Array.isArray(value) ) {
    value.forEach((page) => {
      newById[page.page_id] = {
        id : page.page_id,
        state : 'loaded',
        payload : page
      }
    });
  }

  var byId = Object.assign({}, state.byId, newById);
  var byCatalogId = Object.assign({}, state.byCatalogId, newByCatalogId);
  return Object.assign({}, state, {byCatalogId, byId});
}

function setSearchError(state, value) {
  var newSearch = Object.assign({}, state.search, {state: 'error', error: value});
  return Object.assign({}, state, newSearch);
}

function setSearchState(state, value) {
  var newSearch = Object.assign({}, state.search, value);
  return Object.assign({}, state, {search: newSearch});
}

function setPage(state, pageId, itemState, value) {
  var newById = {
    [pageId] : {
      id : pageId,
      state : itemState,
      payload : value
    }
  };

  var byId = Object.assign({}, state.byId, newById);
  return Object.assign({}, state, {byId});
}

function setMetadata(state, pageId, metadataState, metadata) {
  var newId = {
    [pageId] : {
      id : pageId,
      state : metadataState,
      payload : metadata
    }
  };

  var metadata = Object.assign({}, state.metadata, newId);
  return Object.assign({}, state, {metadata: metadata});
}

function clearMetadata(state, pageId) {
  state.metadata = Object.assign({}, state.metadata);

  if( state.metadata[pageId] ) {
    delete state.metadata[pageId];
  }

  return Object.assign({}, state);
}

function setError(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      state : 'error',
      id : catalogId,
      error : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
}

function setState(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      id : catalogId,
      state : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function pages(state = initialState, action) {
  switch (action.type) {
    
    case actions.GET_CATALOG_PAGES_REQUEST:
      return setState(state, action.catalogId, 'loading');
    case actions.GET_CATALOG_PAGES_SUCCESS:
      return setData(state, action.catalogId, action.response);
    case actions.GET_CATALOG_PAGES_FAILURE:
      return setError(state, action.catalogId, action.error);
    
    case actions.SEARCH_CATALOG_PAGES_REQUEST:
      return setSearchState(state, {state:'loading'});
    case actions.SEARCH_CATALOG_PAGES_SUCCESS:
      return setSearchState(state, {state:'loaded', results: action.response});
    case actions.SEARCH_CATALOG_PAGES_FAILURE:
      return setSearchError(state, {error: action.error});

    case actions.GET_PAGE_REQUEST:
      return setPage(state, action.pageId, 'loading');
    case actions.GET_PAGE_SUCCESS:
      return setPage(state, action.pageId, 'loaded', action.response);
    case actions.GET_CATALOG_PAGES_FAILURE:
      return setPage(state, action.pageId, 'error', action.error);

    case actions.SET_PAGE:
      return setPage(state, action.page.page_id, 'loaded', action.page);


    case actions.SELECT_CATALOG_PAGE:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = pages;