var actions = require('../../actions/collections/marks').ACTIONS;

var initialState = {
  byId : {},
  selected : '',
  pendingSearch : {},
  approvedByPage : {}
};


function setPendingSearch(state, value) {
  return Object.assign({}, state, {pendingSearch: value});
}

function setApproved(state, value) {
  var approvedByPage = Object.assign({}, state.approvedByPage, {[value.pageId]: value});
  return Object.assign({}, state, {approvedByPage: approvedByPage});
}

function set(state, value) {
  var newValue;
  var currentValue = state.byId[value.id];

  if( currentValue ) {
    if( currentValue.data && value.data ) {
      value.data = Object.assign({}, value.data);
    }
    newValue = Object.assign({}, currentValue, value);
  } else {
    newValue = Object.assign({}, value);
  }

  state.byId = Object.assign({}, state.byId, {[newValue.id]: newValue});
  return state;
}


function remove(state, id) {
  var newValue = Object.assign({}, state.byId[id]);
  newValue.state = 'deleted';
  newValue.deleted = true;
  newValue.data = null;

  state.byId = Object.assign({}, state.byId, {[id]: newValue});
  return state;
}

function select(state, value) {
  return Object.assign({}, state, {selected: value});
}

function marks(state = initialState, action) {
  switch (action.type) {

    case actions.MARK_CHANGE:
      return set(state, {
        state: 'loaded', 
        id: action.id, 
        data: action.mark, 
        pageId : action.pageId
      });
    
    case actions.MARK_REMOVED:
      return remove(state, action.id);

    case actions.SAVE_MARK_REQUEST:
      return set(state, {
        state: 'saving', 
        id: action.id, 
        data: action.mark, 
        pageId : action.pageId,
      });
    case actions.SAVE_MARK_FAILURE:
      return set(state, {
        state: 'save-error', 
        id: action.id, 
        error: action.error
      });
    case actions.SAVE_MARK_SUCCESS:
      return set(state, {
        state: 'loaded', 
        id: action.id, 
        error: null
      });

    case actions.PENDING_MARK_SEARCH_REQUEST:
      return setPendingSearch(state, {
        state: 'loading',
        params : action.params
      });
    case actions.PENDING_MARK_SEARCH_FAILURE:
      return setPendingSearch(state, {
        state: 'error', 
        params : action.params,
        error: action.error
      });
    case actions.PENDING_MARK_SEARCH_SUCCESS:
      return setPendingSearch(state, {
        state: 'loaded', 
        params : action.params,
        payload: action.response,
      });

    case actions.GET_APPROVED_PAGE_MARKS_REQUEST:
      return setApproved(state, {
        state: 'loading',
        pageId : action.pageId
      });
    case actions.GET_APPROVED_PAGE_MARKS_FAILURE:
      return setApproved(state, {
        state: 'error', 
        pageId : action.pageId,
        error: action.error
      });
    case actions.GET_APPROVED_PAGE_MARKS_SUCCESS:
      return setApproved(state, {
        state: 'loaded', 
        pageId : action.pageId,
        payload: action.response,
      });

    case actions.REMOVE_MARK_REQUEST:
      return set(state, {
        state: 'deleting', 
        id: action.id, 
        pageId : action.pageId,
      });
    case actions.REMOVE_MARK_FAILURE:
      return set(state, {
        state: 'delete-error', 
        id: action.id, 
        error: action.error
      });
    case actions.REMOVE_MARK_SUCCESS:
      return remove(state, action.id);

    case actions.SELECT_CATALOG_PAGE_MARKS:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = marks;