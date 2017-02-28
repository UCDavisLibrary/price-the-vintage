/**
 * STATE ENUMs
 */
var ACTIONS = {
  SET_CONFIG_HOST : 'SET_CONFIG_HOST',
}

/**
 * Action Functions
 */
function setConfigHost(host) {
  return {
    type : ACTIONS.SET_CONFIG_HOST,
    host : host
  }
}

module.exports = {
  ACTIONS : ACTIONS,
  setConfigHost : setConfigHost,
}