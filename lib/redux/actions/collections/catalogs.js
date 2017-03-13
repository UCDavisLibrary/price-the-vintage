var services = require('../../../services/catalogs');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  SEARCH_CATALOGS_REQUEST: 'SEARCH_CATALOGS_REQUEST',
  SEARCH_CATALOGS_SUCCESS: 'SEARCH_CATALOGS_SUCCESS', 
  SEARCH_CATALOGS_FAILURE: 'SEARCH_CATALOGS_FAILURE',

  GET_CATALOG_REQUEST: 'GET_CATALOG_REQUEST',
  GET_CATALOG_SUCCESS: 'GET_CATALOG_SUCCESS', 
  GET_CATALOG_FAILURE: 'GET_CATALOG_FAILURE',
  
  SELECT_CATALOG : 'SELECT_CATALOG',
  CLEAR_CATALOGS : 'CLEAR_CATALOGS'
}

/**
 * Action Functions
 */
function search(params = {}) {
  return {
    types: [ACTIONS.SEARCH_CATALOGS_REQUEST, ACTIONS.SEARCH_CATALOGS_SUCCESS, ACTIONS.SEARCH_CATALOGS_FAILURE],
    shouldCallAPI: (state) => {
      return state.collections.catalogs.search.state !== 'loaded'
    },
    callAPI: (callback) => { 
      services.search(params, callback);
    },
    payload: {}
  }
}

function get(id) {
  return {
    types: [ACTIONS.GET_CATALOG_REQUEST, ACTIONS.GET_CATALOG_SUCCESS, ACTIONS.GET_CATALOG_FAILURE],
    shouldCallAPI: (state) => {
      if( !state.collections.catalogs.byId[id] ) {
        return true;
      }
      return state.collections.catalogs.byId[id].state !== 'loaded'
    },
    callAPI: (callback) => { 
      services.get(id, callback);
    },
    payload: { id }
  }
}

function select(id) {
  return {
    type : ACTIONS.SELECT_CATALOG,
    id : id
  }
}

function clear() {
  return {
    type : ACTIONS.CLEAR_CATALOGS
  }
}


module.exports = {
  ACTIONS, search, select, get, clear
}