var actions = require('../../actions/collections/pages').ACTIONS;

var initialState = {
  byId : {},
  metadata : {},
  selected : ''
};

/**
 * Data
 */
function setData(state, catalogId, value) {
  var newId = {
    [catalogId] : {
      id : catalogId,
      state : 'loaded',
      payload : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
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

function catalogs(state = initialState, action) {
  switch (action.type) {
    
    case actions.GET_CATALOG_PAGES_REQUEST:
      return setState(state, action.catalogId, 'loading');
    case actions.GET_CATALOG_PAGES_SUCCESS:
      return setData(state, action.catalogId, action.response);
    case actions.GET_CATALOG_PAGES_FAILURE:
      return setError(state, action.catalogId, action.error);

    case actions.SET_PAGE_METADATA:
      return setMetadata(state, action.id, action.state, action.metadata);
    case actions.CLEAR_PAGE_METADATA:
      return clearMetadata(state, action.id);

    case actions.SELECT_CATALOG_PAGE:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = catalogs;