var EventController = require('./EventController');
var model = require('../models/AuthModel');

class AuthController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      getAuthState : 'get-auth-state',
      loginCustom : 'auth-login-custom',
      loginAuth0 : 'login-auth0',
      continueAuth0Login : 'continue-login-auth0',
      initAuthRenewAuth0 : 'init-auth-renew-auth0',
      loginAnonymous : 'auth-login-anonymous',
      logout : 'auth-logout'
    }

    this.triggerEvents = {
      authState : 'auth-update'
    }


    this.bind();
  }

  /**
   * Event: get-auth-state
   */
  getAuthState() {
    return model.getAuthState();
  }

  authStateObserver(state) {
    this.emit(this.triggerEvents.authState, state);
  }

  loginCustom(token) {
    return model.loginCustom(token);
  }

  /**
   * Event: login-auth0
   * 
   * Start the auth0 login (show the popup)
   */
  loginAuth0() {
    return model.loginAuth0();
  }

  /**
   * Event: continue-login-auth0 
   * 
   * Continue the auth0 login.  There should be access key info in the url hash.
   */
  continueAuth0Login(e) {
    return model.continueAuth0Login(e.hash, e.handler);
  }

  /**
   * Event: init-auth-renew-auth0
   * 
   * On login, if we are not finishing up the auth flow, see if the user
   * is logged in
   */
  initAuthRenewAuth0() {
    return model.initAuthRenewAuth0();
  }

  /**
   * Event: auth-login-anonymous
   */
  loginAnonymous() {
    return model.loginAnonymous();
  }

  /**
   * Event: auth-logout
   */
  logout() {
    return model.logout();
  }
}

module.exports = new AuthController();