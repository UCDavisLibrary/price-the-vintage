var service = require('../../../services/marks');

/**
 * STATE ENUMs
 */
var ACTIONS = {
  SAVE_MARK_REQUEST : 'SAVE_MARK_REQUEST',
  SAVE_MARK_SUCCESS : 'SAVE_MARK_SUCCESS',
  SAVE_MARK_FAILURE : 'SAVE_MARK_FAILURE',

  REMOVE_MARK_REQUEST : 'REMOVE_MARK_REQUEST',
  REMOVE_MARK_SUCCESS : 'REMOVE_MARK_SUCCESS',
  REMOVE_MARK_FAILURE : 'REMOVE_MARK_FAILURE',

  PENDING_MARK_SEARCH_REQUEST : 'PENDING_MARK_SEARCH_REQUEST',
  PENDING_MARK_SEARCH_SUCCESS : 'PENDING_MARK_SEARCH_SUCCESS',
  PENDING_MARK_SEARCH_FAILURE : 'PENDING_MARK_SEARCH_FAILURE',

  GET_APPROVED_PAGE_MARKS_REQUEST : 'GET_APPROVED_PAGE_MARKS_REQUEST',
  GET_APPROVED_PAGE_MARKS_SUCCESS : 'GET_APPROVED_PAGE_MARKS_SUCCESS',
  GET_APPROVED_PAGE_MARKS_FAILURE : 'GET_APPROVED_PAGE_MARKS_FAILURE',
  
  MARK_CHANGE : 'MARK_CHANGE',
  MARK_REMOVED : 'MARK_REMOVED',
  SELECT_CATALOG_PAGE_MARKS : 'SELECT_CATALOG_PAGE_MARKS'
}

function pendingMarkSearch(params = {}, jwt) {
  return {
    types: [ACTIONS.PENDING_MARK_SEARCH_REQUEST, ACTIONS.PENDING_MARK_SEARCH_SUCCESS, ACTIONS.PENDING_MARK_SEARCH_FAILURE],
    shouldCallAPI: (state) => {
      return true;
    },
    callAPI: (callback) => { 
      service.pendingMarkSearch(params, jwt, callback);
    },
    payload: {params}
  }
}

function getApprovedMarks(pageId) {
  return {
    types: [ACTIONS.GET_APPROVED_PAGE_MARKS_REQUEST, ACTIONS.GET_APPROVED_PAGE_MARKS_SUCCESS, ACTIONS.GET_APPROVED_PAGE_MARKS_FAILURE],
    shouldCallAPI: (state) => {
      return true;
    },
    callAPI: (callback) => { 
      service.getApprovedMarks(pageId, callback);
    },
    payload: {pageId}
  }
}

function saveMarkFailure(pageId, markId, error) {
  return {
    type : ACTIONS.SAVE_MARK_FAILURE,
    pageId : pageId,
    id: markId,
    error : error
  }
}

function saveMarkSuccess(pageId, markId) {
  return {
    type : ACTIONS.SAVE_MARK_SUCCESS,
    pageId : pageId,
    id: markId
  }
}

function saveMarkStart(pageId, markId, mark) {
  return {
    type : ACTIONS.SAVE_MARK_REQUEST,
    pageId : pageId,
    id : markId,
    mark : mark
  }
}

function removeMarkFailure(pageId, markId, error) {
  return {
    type : ACTIONS.REMOVE_MARK_FAILURE,
    pageId : pageId,
    id : markId,
    error : error
  }
}

function removeMarkSuccess(pageId, markId) {
  return {
    type : ACTIONS.REMOVE_MARK_SUCCESS,
    pageId : pageId,
    id : markId
  }
}

function removeMarkStart(pageId, markId) {
  return {
    type : ACTIONS.REMOVE_MARK_REQUEST,
    pageId : pageId,
    id : markId
  }
}


function markChange(pageId, markId, mark) {
  return {
    type : ACTIONS.MARK_CHANGE,
    pageId : pageId,
    id : markId,
    mark : mark
  }
}

function markRemoved(markId) {
  return {
    type : ACTIONS.MARK_REMOVED,
    id : markId
  }
}

function select(id) {
  return {
    type : ACTIONS.SELECT_CATALOG_PAGE_MARKS,
    id : id
  }
}

module.exports = {
  ACTIONS, select,
  saveMarkStart,
  saveMarkSuccess,
  saveMarkFailure,
  removeMarkStart,
  removeMarkSuccess,
  removeMarkFailure,
  markChange,
  markRemoved,
  pendingMarkSearch,
  getApprovedMarks
}