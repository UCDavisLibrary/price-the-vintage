var actions = require('../../actions/collections/marks').ACTIONS;

var initialState = {
  byId : {},
  selected : ''
};

/**
 * Data
 */
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


function remove(state, value) {
  state.byId = Object.assign({}, state.byId);
  if( state.byId[value.id] ){
    delete state.byId[value.id];
  }

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
      return remove(state, action);

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

    case actions.SELECT_CATALOG_PAGE_MARKS:
      return select(state, action.id);
    default:
      return state
  }
}
module.exports = marks;