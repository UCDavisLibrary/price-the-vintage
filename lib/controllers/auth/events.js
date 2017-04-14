
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
   * Event: auth-login-custom
   */
  eventBus.on('auth-login-custom', (token) => {
    controller.loginCustom(token);
  });

  /**
   * Event: login-auth0
   * 
   * Start the auth0 login (show the popup)
   */
  eventBus.on('login-auth0', () => {
    controller.loginAuth0();
  });

  /**
   * Event: continue-login-auth0 
   * 
   * Continue the auth0 login.  There should be access key info in the url hash.
   */
  eventBus.on('continue-login-auth0', (e) => {
    controller.continueAuth0Login(e.hash, e.handler);
  });

  /**
   * Event: init-auth-renew-auth0
   * 
   * On login, if we are not finishing up the auth flow, see if the user
   * is logged in
   */
  eventBus.on('init-auth-renew-auth0', (e) => {
    controller.initAuthRenewAuth0();
  });

  /**
   * Event: auth-login-anonymous
   */
  eventBus.on('auth-login-anonymous', () => {
    controller.loginAnonymous();
  });

  /**
   * Event: auth-logout
   */
  eventBus.on('auth-logout', () => {
    controller.logout();
  });
}