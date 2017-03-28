
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
   * Event: auth-login-anonymous
   */
  eventBus.on('auth-login-anonymous', () => {
    controller.loginAnonymous();
  });

  /**
   * Event: auth-create-password
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.email] - user account email
   * @param {function} [e.password] - user account password
   * @param {function} [e.handler] - called after create attempt
   */
  eventBus.on('auth-create-password', (e) => {
    controller.createUser(e.email, e.password, e.handler);
  });

  /**
   * Event: auth-reset-password
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.email] - user account email
   * @param {function} [e.handler] - called after reset attempt
   */
  eventBus.on('auth-reset-password', (e) => {
    controller.resetPassword(e.email, e.handler);
  });

  /**
   * Event: auth-login-password
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.email] - user account email
   * @param {function} [e.password] - user account password
   * @param {function} [e.handler] - called after login attempt
   */
  eventBus.on('auth-login-password', (e) => {
    controller.loginWithPassword(e.email, e.password, e.handler);
  });

  /**
   * Event: auth-logout
   */
  eventBus.on('auth-logout', () => {
    controller.logout();
  });
}