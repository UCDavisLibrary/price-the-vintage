var firebase = require('../../firebase')();
var store = require('../../redux/store');
var actions = require('../../redux/actions/auth');
var activityController = require('../activity');

/**
 * Controller for handling all authentication events.
 */
class AuthController {

  /**
   * Initialize the controller.  Start listening to when
   * the firebase auth state changes.
   */
  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      //  new user object
      if (user) {
        store.dispatch(
          actions.setUser(user)
        )
      } else {
        // mark not logged in and start anonymous login
        store.dispatch(
          actions.notLoggedIn()
        )
      }
    });
  }

  /**
   * Login as anonymous user.  Auth state change handled in constructor
   */
  loginAnonymous() {
    firebase.auth().signInAnonymously().catch(function(error) {
      throw error;
    });
  }
  
  /**
   * login with google account.  No account selection will be shown if you
   * are already logged in with google account.  Auth state change handled
   * in constructor.
   */
  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);
  }

  /**
   * Login with 'UCD' account.  These accounts are handled by the Googles.
   * Basically this workflow will be the same as loginWithGoogle() but
   * will force account selection.  At this point the user can put in their
   * @ucdavis email and be redirected to the UCD login portal.  Very inception.
   */
  loginWithUCD() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      'login_hint': 'user@ucdavis.edu',
      'prompt': 'select_account'
    });
    firebase.auth().signInWithRedirect(provider);
  }

  /**
   * Create app firebase account.
   * 
   * @param {string} email - email address associated with account
   * @param {string} password - account password
   * @param {function} callback - function to handle result of create attempt
   */
  createUser(email, password, callback) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        callback(null, resp);
      })
      .catch((error) => {
        callback(error);
      });
  }

  /**
   * Reset app firebase account password.
   * 
   * @param {string} email - email address to reset password for
   * @param {function} callback - function to handle result of reset attempt
   */
  resetPassword(email, callback) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((resp) => {
        callback(null, resp);
      })
      .catch((error) => {
        callback(error);
      });
  }

  /**
   * Login with username and password to App's firebase account.
   * 
   * @param {string} email - email address associated with account
   * @param {string} password - account password
   * @param {function} callback - function to handle result of login attempt
   */
  loginWithPassword(email, password, callback) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        callback(null, resp);
      })
      .catch((error) => {
        callback(error);
      });
  }

  /**
   * Start the FB logout flow.  Auth state change handled in constructor.
   */
  logout() {
    activityController.set('', '', () => {
      firebase.auth().signOut();
    });
  }

  /**
   * Return the current Redux auth state.
   */
  getAuthState() {
    return store.getState().auth;
  }
}

var controller = new AuthController();
require('./events')(controller);

module.exports = controller;