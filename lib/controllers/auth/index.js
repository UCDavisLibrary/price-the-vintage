var Auth0 = require('auth0-js');
var Auth0Lock = require('auth0-lock').default;

var firebase = require('../../firebase')();
var store = require('../../redux/store');
var actions = require('../../redux/actions/auth');
var activityController = require('../activity');
var marksController = require('../marks');

/**
 * Controller for handling all authentication events.
 */
class AuthController {

  /**
   * Initialize the controller.  Start listening to when
   * the firebase auth state changes.
   */
  constructor() {
    this.config = store.getState().config.auth0;

    this.lock = new Auth0Lock(this.config.clientID, this.config.domain, this.config.lockOptions);
    this.auth0 = new Auth0.Authentication({clientID: this.config.clientID, domain: this.config.domain});

    firebase.auth().onAuthStateChanged((user) => {
      var auth0User = localStorage.getItem(this.config.localStorageKey);

      console.log(user, auth0User);

      //  new user object
      if(user && (user.isAnonymous || auth0User) ) {

        if( user.isAnonymous ) {
          store.dispatch(
            actions.setUser(user)
          )
          return;
        }

        auth0User = JSON.parse(auth0User);
        auth0User.uid = auth0User.user_id;
        if( !auth0User.photoURL ) {
          auth0User.photoURL = auth0User.picture;
        }
        

        store.dispatch(
          actions.setUser(auth0User)
        )
      } else {
        // mark not logged in and start anonymous login
        store.dispatch(
          actions.notLoggedIn()
        )

        this.loginAnonymous()
      }
    });
  }

  loginAuth0() {
    this.lock.show();
  }

  continueAuth0Login(hash, callback) {
    this.lock.resumeAuth(hash, (error, authResult) => {
      if (error) {
        alert("Could not parse hash");
      }

      console.log(authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error, profile) => {

        if( error ) throw error;
        localStorage.setItem(this.config.localStorageKey, JSON.stringify(profile));

        // Set the options to retreive a firebase delegation token
        var options = {
          grant_type : 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          id_token : authResult.idToken,
          api : 'firebase',
          scope : this.config.scope,
          target: this.config.clientId
        };

        // Make a call to the Auth0 '/delegate'
        this.auth0.delegation(options, (error, result) => {
          if( error ) throw error;
          this.loginCustom(result.idToken);

          if( callback ) callback();
        });
      });
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

  loginCustom(token) {
    // Exchange the delegate token for a Firebase auth token
    firebase.auth().signInWithCustomToken(token).catch(function(error) {
      console.log(error);
    });
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
    marksController.removeTempMark(() =>{
      activityController.set('', '', () => {
        localStorage.removeItem(this.config.localStorageKey);
        firebase.auth().signOut();
      });
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