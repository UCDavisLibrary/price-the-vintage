var services = require('../../../services/catalogs');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  LOAD_CATALOGS_REQUEST: 'LOAD_CATALOGS_REQUEST', 
  LOAD_CATALOGS_SUCCESS: 'LOAD_CATALOGS_SUCCESS', 
  LOAD_CATALOGS_FAILURE: 'LOAD_CATALOGS_FAILURE',
  
  SELECT_CATALOG : 'SELECT_CATALOG'
}

/**
 * Action Functions
 */
function load() {
  return {
    types: [ACTIONS.LOAD_CATALOGS_REQUEST, ACTIONS.LOAD_CATALOGS_SUCCESS, ACTIONS.LOAD_CATALOGS_FAILURE],
    shouldCallAPI: (state) => {
      return state.collections.catalogs.state !== 'loaded'
    },
    callAPI: (callback) => { 
      services.list(callback);
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
  ACTIONS, load, select
}