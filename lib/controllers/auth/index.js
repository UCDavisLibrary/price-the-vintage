var firebase = require('../../firebase')();
var store = require('../../redux/store');
var actions = require('../../redux/actions/auth');

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

        this.loginAnonymous();
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
    firebase.auth().signOut();
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