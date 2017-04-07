var service = require('../../../services/pages');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  GET_CATALOG_PAGES_REQUEST: 'GET_CATALOG_PAGES_REQUEST',
  GET_CATALOG_PAGES_SUCCESS: 'GET_CATALOG_PAGES_SUCCESS', 
  GET_CATALOG_PAGES_FAILURE: 'GET_CATALOG_PAGES_FAILURE',

  GET_PAGE_REQUEST: 'GET_PAGE_REQUEST',
  GET_PAGE_SUCCESS: 'GET_PAGE_SUCCESS', 
  GET_PAGE_FAILURE: 'GET_PAGE_FAILURE',
  
  SELECT_CATALOG_PAGE : 'SELECT_CATALOG_PAGE',

  SET_PAGE : 'SET_PAGE',
}

/**
 * Action Functions
 */
function get(pageId) {
  return {
    types: [ACTIONS.GET_PAGE_REQUEST, ACTIONS.GET_PAGE_SUCCESS, ACTIONS.GET_PAGE_FAILURE],
    shouldCallAPI: (state) => {
      if( !state.collections.pages.byId[pageId] ) {
        return true;
      }
      return state.collections.pages.byId[pageId].state !== 'loaded'
    },
    callAPI: (callback) => { 
      service.get(pageId, callback);
    },
    payload: {
      pageId : pageId
    }
  }
}

function getPages(catalogId) {
  return {
    types: [ACTIONS.GET_CATALOG_PAGES_REQUEST, ACTIONS.GET_CATALOG_PAGES_SUCCESS, ACTIONS.GET_CATALOG_PAGES_FAILURE],
    shouldCallAPI: (state) => {
      if( !state.collections.pages.byCatalogId[catalogId] ) {
        return true;
      }
      return state.collections.pages.byCatalogId[catalogId].state !== 'loaded'
    },
    callAPI: (callback) => { 
      service.getPages(catalogId, callback);
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

function set(page) {
  return {
    type : ACTIONS.SET_PAGE,
    page : page
  }
}

module.exports = {
  ACTIONS, get, getPages, select, set
}