var BaseModel = require('cork-app-utils').BaseModel;
var AppStateStore = require('../stores/AppStateStore');

/**
 * Controller for handling various states of the application.
 * This includes current catalog and page and if we are editing a mark.
 */
class AppStateModel extends BaseModel {

  constructor() {
    super();
    this.store = AppStateStore;

    this.firstLoad = true;
    this._initWindowEvents();

    firebase
      .database()
      .ref('.info/connected')
      .on('value', (snap) => {
        if (snap.val() === true) {
          if( this.log ) console.warn("connected to firebase");
          this.set({firebaseConnection: true});
        } else {
          if( this.log ) console.warn("not connected to firebase");
          this.set({firebaseConnection: false});
        }
      });

    this.register('AppStateModel');
  }

  /**
   * @method _initWindowEvents
   * @description wire update window event listeners
   */
  _initWindowEvents() {
    if( typeof window === 'undefined' ) return;

    this._setPageAndAppState(true);
    window.addEventListener('hashchange', e => this._setPageAndAppState());
  }

  /**
   * @method _setPageAndAppState
   * @description keeps app state in sync with window hash.  This method
   * is only for use in the browser
   */
  _setPageAndAppState() {
    // are we in the middle of auth0 redirect?
    // if so, ignore this.
    if( this.firstLoad && this._isAuthRedirect() ) {
      this.firstLoad = false;
      return;
    }

    // default route information
    this.route = {
      section : 'list',
      catalog : '',
      page : '',
      edit : false,
      viewMark : false,
      markId : '',
      catalogId : '',
      pageId : ''
    }

    // split up the hash state
    var parts = window
      .location
      .hash
      .replace(/#/,'')
      .split('/');
    
    // remove any empty spots
    for( var i = parts.length-1; i >= 0; i-- ) {
      if( !parts[i] ) parts.splice(i);
    }

    // parse app state information based on location in hash route
    parts.forEach(part => this._parseRoute(part));

    if( this.firstLoad && this.route.edit && !this.route.markId ) {
      return window.location.hash = this.route.catalogId+'/'+this.route.pageId
    }

    this.selectedSection = this.route.section;

    // set the current app state
    this.set({
      section: this.route.section,
      editingMark: this.route.edit,
      viewingMark: this.route.viewMark,
      creatingMark : (this.route.edit && !this.route.markId),
      markId : this.route.markId,
      pageId : this.route.pageId,
      catalogId : this.route.catalogId
    });

    // set the user activity, ie which catalog and page the user
    // is currently viewing (this may be empty as well).
    this._setUserActivity(this.route.catalogId, this.route.pageId);
  }

  /**
   * @method _setWindowLocation
   * @description sets the window hash.  All hash updates should use
   * this method.  very useful for debugging.
   */
  _setWindowLocation(location) {
    window.location.hash = location;
  }

  /**
   * Parse an individual route section
   **/
  _parseRoute(value, index) {
    switch(index) {
      case 0:
        if( value === 'admin') {

          if( this.authState ) {
            if( this.authState.state === 'notLoggedIn' || !this.authState.user ) {
              console.warn('No user, admin page not allowed, redirecting', this.authState);
              window.location.hash = '';
              return;
            } else if( !this.authState.user.isAdmin ) {
              console.warn('User is not an admin, redirecting', this.authState.user);
              window.location.hash = '';
              return;
            }
          }

          this.route.section = 'admin';
          return;
        } else if( value === 'user' ) {
          this.route.section = 'user';
          return;
        }

        this.route.section = 'page';
        this.route.catalogId = value;

        break;
      case 1:
        this.route.section = 'page';
        this.route.pageId = value;
        break;
      case 2:
        if( value === 'edit') this.route.edit = true;
        else if( value === 'view') this.route.viewMark = true;
        break;
      case 3:
        if( this.route.edit || this.route.viewMark ) {
          this.route.markId = value;
        }
        break;
    }
  }

  _isAuthRedirect() {
    var hash = '?'+window.location.hash.replace(/^#/,'');

    // crap..
    if( this._getParamByName('error', hash) || 
        (this._getParamByName('access_token', hash) && 
        this._getParamByName('id_token', hash)) ) {

        this._continueAuth0Login(window.location.hash);
        return true;
    } else {
      this._initAuthRenewAuth0();
    }
    return false;
  }

  _getParamByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * Get the current redux appState
   * @returns {Object} appState
   */
  async get() {
    return this.store.data;
  }

  /**
   * Update the app state
   * @returns {Object} update - keys to be updated
   */
  set(update) {
    this.store.set(update);
    return this.get();
  }
}

module.exports = new AppStateModel();