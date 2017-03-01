/**
 * STATE ENUMs
 */
var ACTIONS = {
  UPDATE_APP_STATE : 'UPDATE_APP_STATE',
}

/**
 * Action Functions
 */
function updateState(state) {
  return {
    type : ACTIONS.UPDATE_APP_STATE,
    state : state
  }
}


module.exports = {
  ACTIONS,
  updateState
}