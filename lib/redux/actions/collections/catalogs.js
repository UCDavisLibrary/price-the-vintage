var services = require('../../../services/catalogs');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  SEARCH_CATALOGS_REQUEST: 'SEARCH_CATALOGS_REQUEST',
  SEARCH_CATALOGS_SUCCESS: 'SEARCH_CATALOGS_SUCCESS', 
  SEARCH_CATALOGS_FAILURE: 'SEARCH_CATALOGS_FAILURE',
  
  SELECT_CATALOG : 'SELECT_CATALOG'
}

/**
 * Action Functions
 */
function search(params = {}) {
  return {
    types: [ACTIONS.SEARCH_CATALOGS_REQUEST, ACTIONS.SEARCH_CATALOGS_SUCCESS, ACTIONS.SEARCH_CATALOGS_FAILURE],
    shouldCallAPI: (state) => {
      return state.collections.catalogs.state !== 'loaded'
    },
    callAPI: (callback) => { 
      services.search(params, callback);
    },
    payload: {}
  }
}

function select(id) {
  return {
    type : ACTIONS.SELECT_CATALOG,
    id : id
  }
}


module.exports = {
  ACTIONS, search, select
}