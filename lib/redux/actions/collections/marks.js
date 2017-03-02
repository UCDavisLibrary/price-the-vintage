var service = require('../../../services/pages');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  GET_CATALOG_PAGE_MARKS_REQUEST: 'GET_CATALOG_PAGE_MARKS_REQUEST',
  GET_CATALOG_PAGE_MARKS_SUCCESS: 'GET_CATALOG_PAGE_MARKS_SUCCESS', 
  GET_CATALOG_PAGE_MARKS_FAILURE: 'GET_CATALOG_PAGE_MARKS_FAILURE',
  
  SELECT_CATALOG_PAGE_MARKS : 'SELECT_CATALOG_PAGE_MARKS'
}

/**
 * Action Functions
 */
function get(pageId) {
  return {
    types: [ACTIONS.GET_CATALOG_PAGE_MARKS_REQUEST, ACTIONS.GET_CATALOG_PAGE_MARKS_SUCCESS, ACTIONS.GET_CATALOG_PAGE_MARKS_FAILURE],
    shouldCallAPI: (state) => {
      if( !state.collections.marks[pageId] ) {
        return true;
      }
      return state.collections.marks[pageId] !== 'loaded'
    },
    callAPI: (callback) => { 
      service.get(pageId, callback);
    },
    payload: {
      pageId
    }
  }
}

function select(id) {
  return {
    type : ACTIONS.SELECT_CATALOG_PAGE_MARKS,
    id : id
  }
}


module.exports = {
  ACTIONS, get, select
}