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

    this.auth0WebAuth = new Auth0.WebAuth({clientID: this.config.clientID, domain: this.config.domain});

    firebase.auth().onAuthStateChanged((user) => {
      var auth0User = localStorage.getItem(this.config.localStorageKey);

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
        );
      } else {
        // mark not logged in and start anonymous login
        store.dispatch(
          actions.notLoggedIn()
        )

        this.loginAnonymous()
      }
    });

    setInterval(() => {
      this.autoRenewAuth0();
    }, 36000 * 1000)
  }

  initAuthRenewAuth0() {
    if( typeof window !== undefined ) {
      if( window.document.body ) {
        this.autoRenewAuth0();
      } else {
        window.onload = this.autoRenewAuth0.bind(this);
      }
    }
  }

  autoRenewAuth0() {
    this.auth0WebAuth.renewAuth({
      scope: this.config.scope,
      redirectUri: window.location.protocol+'//'+window.location.host+'/silent-login.html',
      usePostMessage: true
    }, (err, authResult) => {
      if( err ) {
        console.log('Silent login failed, logging out');
        return this.logout();
      }
      console.log('Silent login success, token renewed');

      var user = store.getState().auth.user;
      user.auth0Token = authResult.idToken;
      localStorage.setItem(this.config.localStorageKey, JSON.stringify(user));

      store.dispatch(
        actions.setUser(user)
      );
    });
  }

  loginAuth0() {
    window.localStorage.setItem('auth-redirect-hash', window.location.hash);
    this.lock.show();
  }

  continueAuth0Login(hash, callback) {
    this.lock.resumeAuth(hash, (error, authResult) => {
      if (error) {
        alert("Could not parse hash");
      }

      var oldHash = window.localStorage.getItem('auth-redirect-hash');
      if( oldHash ) {
        window.location.hash = oldHash;
        window.localStorage.removeItem('auth-redirect-hash');
      } else {
        window.location.hash = '';
      }

      this.lock.getProfile(authResult.idToken, (error, profile) => {

        profile.auth0Token = authResult.idToken;

        if( error ) throw error;
        localStorage.setItem(this.config.localStorageKey, JSON.stringify(profile));

        // Set the options to retreive a firebase delegation token
        var options = {
          grant_type : 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          id_token : authResult.idToken,
          api : 'firebase',
          scope : this.config.scope,
          target: this.config.clientID
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
    this.cleanPresence(() => {
      firebase.auth().signInAnonymously().catch(function(error) {
        throw error;
      });
    });
  }
  
  /**
   * Start firebase login with Auth0 token
   * 
   * @param {string} token - Auth0 jwt
   */
  loginCustom(token) {
    // Exchange the delegate token for a Firebase auth token
    this.cleanPresence(() => {
      firebase.auth().signInWithCustomToken(token).catch(function(error) {
        console.log(error);
      });
    });
  }

  /**
   * Start the FB logout flow.  Auth state change handled in constructor.
   */
  logout() {
    this.cleanPresence(() => {
      localStorage.removeItem(this.config.localStorageKey);
      firebase.auth().signOut();
    });
  }

  /**
   * Before logout, make sure and remove any user presence data
   * 
   * @param {*} callback 
   */
  cleanPresence(callback) {
    marksController.removeTempMark(() => {
      activityController.beforeLogout(callback);
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