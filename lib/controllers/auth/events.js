
var eventBus = require('../../eventBus');

/**
 * Wire up event bus to auth controller
 */
module.exports = function(controller) {

  /**
   * Event: get-auth-state
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-auth-state', (e) => {
    let resp = controller.getAuthState();
    if( e.handler ) e.handler(resp);
  });

  /**
   * Event: auth-login-google
   */
  eventBus.on('auth-login-google', () => {
    controller.loginWithGoogle();
  });

  /**
   * Event: auth-login-ucd
   */
  eventBus.on('auth-login-ucd', () => {
    controller.loginWithUCD();
  });

  /**
   * Event: auth-logout
   */
  eventBus.on('auth-logout', () => {
    controller.logout();
  });
}