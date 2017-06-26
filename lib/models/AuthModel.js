var Auth0 = require('auth0-js');
var Auth0Lock = require('auth0-lock').default;

var BaseModel = require('./BaseModel');
var firebase = require('../firebase')();
var actions = require('../redux/actions/auth');
var ConfigModel = require('../models/ConfigModel');


class AuthModel extends BaseModel {

  /**
   * Initialize the model.  Start listening to when
   * the firebase auth state changes.
   */
  constructor() {
    super();

    this.config = this.getState().config.auth0;

    var envVars = ConfigModel.getEnv();
    if( envVars.env === 'dev' ) {
      this.config.clientID = this.getState().config.auth0DevClient;
    }

    this.lock = new Auth0Lock(this.config.clientID, this.config.domain, this.config.lockOptions);
    this.auth0 = new Auth0.Authentication({clientID: this.config.clientID, domain: this.config.domain});

    this.auth0WebAuth = new Auth0.WebAuth({clientID: this.config.clientID, domain: this.config.domain});

    firebase.auth().onAuthStateChanged((user) => {
      var auth0User = localStorage.getItem(this.config.localStorageKey);

      if(user && (user.isAnonymous || auth0User) ) {

        if( user.isAnonymous ) {
          firebase
            .database()
            .ref(`users/${user.uid}/anonymous`)
            .set(true)
            .catch(error => console.error(error));

          this.dispatch(
            actions.setUser(user)
          )
          return;
        }

        auth0User = JSON.parse(auth0User);
        auth0User.uid = auth0User.user_id;
        if( !auth0User.photoURL ) {
          auth0User.photoURL = auth0User.picture;
        }

        this.dispatch(
          actions.setUser(auth0User)
        );
      } else {
        // mark not logged in and start anonymous login
        this.dispatch(
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

      var user = this.getState().auth.user;
      user.auth0Token = authResult.idToken;
      localStorage.setItem(this.config.localStorageKey, JSON.stringify(user));

      this.dispatch(
        actions.setUser(user)
      );
    });
  }

  loginAuth0() {
    window.localStorage.setItem('auth-redirect-hash', window.location.hash);
    this.lock.show();
  }

  continueAuth0Login(hash) {
    return new Promise((resolve, reject) => {
      this.lock.resumeAuth(hash, (error, authResult) => {
        if (error) {
          return alert("Could not parse hash");
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

            resolve();
          });
        });
      });
    });
    
  }

  /**
   * Login as anonymous user.  Auth state change handled in constructor
   */
  loginAnonymous() {
    this.cleanPresence()
        .then(() => firebase.auth().signInAnonymously())
        .catch((e) => {throw e});
  }
  
  /**
   * Start firebase login with Auth0 token
   * 
   * @param {string} token - Auth0 jwt
   */
  loginCustom(token) {
    // Exchange the delegate token for a Firebase auth token
    this.cleanPresence()
        .then(() => firebase.auth().signInWithCustomToken(token))
        .catch((e) => console.error(e));
  }

  /**
   * Start the FB logout flow.  Auth state change handled in constructor.
   */
  logout() {
    this.cleanPresence()
        .then(() => {
          localStorage.removeItem(this.config.localStorageKey);
          firebase.auth().signOut();
        });
  }

  /**
   * Before logout, make sure and remove any user presence data
   */
  cleanPresence() {
    return this.emit('remove-temp-catalog-page-mark')
               .then(() => this.emit('activity-before-logout'));
  }

  /**
   * Return the current Redux auth state.
   */
  getAuthState() {
    return this.getState().auth;
  }
}

module.exports = new AuthModel();