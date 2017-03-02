var service = require('../../../services/pages');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  GET_CATALOG_PAGES_REQUEST: 'GET_CATALOG_PAGES_REQUEST',
  GET_CATALOG_PAGES_SUCCESS: 'GET_CATALOG_PAGES_SUCCESS', 
  GET_CATALOG_PAGES_FAILURE: 'GET_CATALOG_PAGES_FAILURE',
  
  SELECT_CATALOG_PAGE : 'SELECT_CATALOG_PAGE'
}

/**
 * Action Functions
 */
function get(catalogId) {
  return {
    types: [ACTIONS.GET_CATALOG_PAGES_REQUEST, ACTIONS.GET_CATALOG_PAGES_SUCCESS, ACTIONS.GET_CATALOG_PAGES_FAILURE],
    shouldCallAPI: (state) => {
      if( !state.collections.pages.byId[catalogId] ) {
        return true;
      }
      return state.collections.pages.byId[catalogId].state !== 'loaded'
    },
    callAPI: (callback) => { 
      service.get(catalogId, callback);
    },
    payload: {
      catalogId : catalogId
    }
  }
}

function select(id) {
  return {
    type : ACTIONS.SELECT_CATALOG_PAGE,
    id : id
  }
}


module.exports = {
  ACTIONS, get, select
}