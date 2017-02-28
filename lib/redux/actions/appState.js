/**
 * STATE ENUMs
 */
var ACTIONS = {
  SET_SECTION : 'SET_SECTION',
}


var APP_SECTIONS = {
  list : 'list',
  show : 'show',
  page : 'page'
}


/**
 * Action Functions
 */
function setAppSection(section) {
  return {
    type : ACTIONS.SET_SECTION,
    section : section
  }
}


module.exports = {
  ACTIONS : ACTIONS,
  APP_SECTIONS : APP_SECTIONS,
  setAppSection : setAppSection
}