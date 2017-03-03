var actions = require('../../actions/collections/marks').ACTIONS;

var initialState = {
  byId : {},
  selected : ''
};

/**
 * Data
 */
function setData(state, pageId, value) {
  var newId = {
    [pageId] : {
      id : pageId,
      state : 'loaded',
      payload : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
}

function setError(state, pageId, value) {
  var newId = {
    [pageId] : {
      state : 'error',
      id : pageId,
      error : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
}

function setState(state, pageId, value) {
  var newId = {
    [pageId] : {
      id : pageId,
      state : value
    }
  };

  var byId = Object.assign({}, state.byId, newId);
  return Object.assign({}, state, {byId: byId});
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function marks(state = initialState, action) {
  switch (action.type) {

    case actions.GET_CATALOG_PAGE_MARKS_REQUEST:
      return setState(state, action.pageId, 'loading');
    case actions.GET_CATALOG_PAGE_MARKS_SUCCESS:
      return setData(state, action.pageId, action.response);
    case actions.GET_CATALOG_PAGE_MARKS_FAILURE:
      return setError(state, action.pageId, action.error);

    case actions.SELECT_CATALOG_PAGE_MARKS:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = marks;