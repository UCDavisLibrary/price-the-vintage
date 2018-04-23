const Auth0 = require('auth0-js');
const Auth0Lock = require('auth0-lock').default;
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const firebase = require('../firebase');
const config = require('../config');
const localStorage = require('../lib/local-storage');

var AuthStore = require('../stores/AuthStore');

class AuthModel extends BaseModel {

  /**
   * Initialize the model.  Start listening to when
   * the firebase auth state changes.
   */
  constructor() {
    super();

    this.store = AuthStore;
    this.config = config.auth0;

    if( config.env === 'dev' ) {
      this.config.clientID = config.auth0DevClient;
    }

    if( typeof window !== 'undefined' ) {
      // login UI
      this.lock = new Auth0Lock(this.config.clientID, this.config.domain, this.config.lockOptions);
      // used for silent login
      this.auth0WebAuth = new Auth0.WebAuth({clientID: this.config.clientID, domain: this.config.domain});
    }

    // auth0 library used for things like delegation 
    this.auth0 = new Auth0.Authentication({clientID: this.config.clientID, domain: this.config.domain});
    
    firebase.auth().onAuthStateChanged(user => this._onAuthStateChanged(user));

    setInterval(() => {
      this.autoRenewAuth0();
    }, 36000 * 1000)

    this.register('AuthModel');
  }

  /**
   * @method _onAuthStateChanged
   * @description bound to firebase auth onAuthStateChanged callback. Fired whenever
   * the firebase user changes
   * 
   * @param {Object} firebaseUser firebase user object
   * 
   * @returns {Promise} 
   */
  async _onAuthStateChanged(firebaseUser) {
    var profile = this.getUserProfile();

    // there is a firebase user
    if(firebaseUser && (firebaseUser.isAnonymous || profile) ) {

      if( firebaseUser.isAnonymous ) {
        await this.setAnonymousUserFlag(firebaseUser.uid);
        // TODO: wire up as event listener
        // await marks.cleanupStaleTmpMarks(firebaseUser.uid);
        this.store.setUser(firebaseUser);
        return;
      }

      // little bit of profile setup
      profile.uid = profile.user_id;
      if( !profile.photoURL ) {
        profile.photoURL = profile.picture;
      }

      // TODO: wire up as event listener
      // await marks.cleanupStaleTmpMarks(profile.uid);
      this.store.setUser(profile);

    // no firebase user
    } else {
      this.store.notLoggedIn();
    }
  }

  /**
   * @method setAnonymousUserFlag
   * @description set the anonymous flag for a user in firebase
   * 
   * @param {String} uid user id
   * @param {Boolean} isAnonymous defaults to true
   * 
   * @return {Promise} 
   */
  setAnonymousUserFlag(uid, isAnonymous=true) {
    return firebase
      .database()
      .ref(`users/${uid}/anonymous`)
      .set(true)
  }

  /**
   * @method initAuthRenewAuth0
   * @description initialize auto renew function.  If window is still loading,
   * register to onload handler, otherwise call autoRenew
   * 
   */
  initAuthRenewAuth0() {
    if( typeof window === 'undefined' ) return;

    if( window.document.body ) {
      this.autoRenewAuth0();
    } else {
      window.onload = this.autoRenewAuth0.bind(this);
    }
  }

  /**
   * @method autoRenewAuth0
   * @description run auth0 auto login function via messaging between silent-login.html
   * and this page.
   */
  autoRenewAuth0() {
    var userData = this.getUserProfile();
    if( !userData ) return;

    this.auth0WebAuth.renewAuth({
      scope: this.config.scope,
      redirectUri: window.location.protocol+'//'+window.location.host+'/silent-login.html',
      usePostMessage: true
    }, (e, result) => this._autoRenewAuth0Complete(e, result));
  }

  /**
   * @method _autoRenewAuth0Complete
   * @description fired when auth0 auto login completes.
   * 
   * @param {Object} err 
   * @param {Object} authResult 
   */
  _autoRenewAuth0Complete(err, authResult) {
    if( err ) {
      console.log('Silent login failed, logging out', err);
      return this.logout();
    }

    console.log('Silent login success, token renewed');

    var user = this.getAuthState().user;

    // update id token, old one might be expired
    user.auth0Token = authResult.idToken;

    this.setUserProfile(user);
    this.store.setUser(user);
  }

  /**
   * @method loginAuth0
   * @description login with Auth0 via lock UI library.  Stores current hash
   * in localstorage so user can be redirected after login flow.
   */
  loginAuth0() {
    localStorage.setItem('auth-redirect-hash', window.location.hash);
    this.lock.show();
  }

  /**
   * @method continueAuth0Login
   * @description after the loginAuth0 completes redirect flow, the user will
   * end up back at this app with a token in the url hash.  The price-the-vinage
   * element looks for these token values on load.  If found it means we need
   * to finish the login flow, which happens below
   * 
   * @param {String} hash current url location hash
   */
  continueAuth0Login(hash) {
    return new Promise((resolve, reject) => {

      // call lock UI's resume with current hash
      this.lock.resumeAuth(hash, (error, authResult) => {
        if (error) {
          return alert("Could not parse hash");
        }

        // see if we need to redirect the user
        var oldHash = window.localStorage.getItem('auth-redirect-hash');
        if( oldHash ) {
          window.location.hash = oldHash;
          localStorage.removeItem('auth-redirect-hash');
        } else {
          window.location.hash = '';
        }

        // grab the the Auth0 user profile
        this.lock.getProfile(authResult.idToken, (error, profile) => {
          if( error ) throw error;

          // set the profiles Auth0 Token
          profile.auth0Token = authResult.idToken;
          this.setUserProfile(profile);

          // Set the options to retreive a firebase delegation token
          var options = {
            grant_type : 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            id_token : authResult.idToken,
            api : 'firebase',
            scope : this.config.scope,
            target: this.config.clientID
          };

          // Make a call to the Auth0 '/delegate'
          // basically this uses the Auth0 token to generate a Firebase JWT
          this.auth0.delegation(options, (error, result) => {
            if( error ) throw error;

            // login into Firebase with Auth0 generated Firebase JWT
            this.loginCustom(result.idToken);
            resolve();
          });
        });
      });
    });
    
  }

  /**
   * @method loginAnonymous
   * @description Login as anonymous user.  Auth state change handled in constructor
   * 
   * @returns {Promise}
   */
  loginAnonymous() {
    this.cleanPresence();
    return firebase.auth().signInAnonymously()
  }
  
  /**
   * @method loginCustom
   * @description Start firebase login with JWT token.  Possibly generated from Auth0
   * delegation endpoint.  Or mint your own via firebase admin sdk.
   * 
   * @param {string} token Firebase JWT
   * 
   * @returns {Promise}
   */
  async loginCustom(token) {
    // Exchange the delegate token for a Firebase auth token
    this.cleanPresence();
    await firebase.auth().signInWithCustomToken(token);
    return this.store.data;
  }

  /**
   * @method createCustomLogin
   * @description create a Firebase JWT token to login with above
   * loginCustom() method.  The auth0 delegation endpoint is also used
   * to generate these tokens.  THIS METHOD ONLY WORKS IN NODEJS.
   * 
   * @param {String} uid user id
   * @param {Object} claim addiational claim information
   * 
   * @returns {Promise} resolves to JWT string
   */
  createCustomLogin(uid = '', claim = {}) {
    return firebase.auth().createCustomToken(uid, claim);
  }

  /**
   * @method logout
   * @description  Start the FB logout flow.  Auth state change handled in constructor.
   * TODO: should we be logging out of Auth0 as well?
   */
  async logout() {
    await this.cleanPresence();
    localStorage.removeItem(this.config.localStorageKey);
    await firebase.auth().signOut();
    return this.getAuthState();
  }

  /**
   * @method cleanPresence
   * @description Before logout, make sure and remove any user presence data
   */
  async cleanPresence() {
    // TODO: wire up as event listener
    // await MarksModel.removeTempMark();
  }

  /**
   * @method setUserProfile
   * @description store the user profile in localstorage.
   * 
   * @param {Object} profile 
   */
  setUserProfile(profile = {}) {
    localStorage.setItem(this.config.localStorageKey, profile);
  }

  /**
   * @method getUserProfile
   * @description store the user profile in localstorage.
   * 
   * @returns {Object} profile 
   */
  getUserProfile() {
    let profile = localStorage.getItem(this.config.localStorageKey);
    if( !profile ) return null;
    return JSON.parse(profile);
  }

  /**
   * @method getAuthState
   * @description return the current user information
   * 
   * @returns {Object}
   */
  getAuthState() {
    return this.store.data;
  }
}

module.exports = new AuthModel();