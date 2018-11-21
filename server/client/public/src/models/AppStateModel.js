const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {Auth0Model} = require('@ucd-lib/crowd-source-js');
const AppStateStore = require('../stores/AppStateStore');


/**
 * Controller for handling various states of the application.
 * This includes current catalog and page and if we are editing a mark.
 */
class AppStateModel extends BaseModel {

  constructor() {
    super();
    this.store = AppStateStore;
    this.window = (typeof window === 'undefined') ? null : window;

    this.firstLoad = true;
    this._initWindowEvents();

    this.register('AppStateModel');
  }

  /**
   * @method _initWindowEvents
   * @description wire update window event listeners
   */
  _initWindowEvents() {
    if( !this.window ) return;

    this._setPageAndAppState();
    this.window.addEventListener('hashchange', e => this._setPageAndAppState());
  }

  /**
   * @method _setPageAndAppState
   * @description keeps app state in sync with window hash.  This method
   * is only for use in the browser
   */
  _setPageAndAppState() {
    // are we in the middle of auth0 redirect?
    // if so, ignore this.
    if( this.firstLoad && Auth0Model.isRedirect(true) ) {
      this.firstLoad = false;
      return;
    }

    // default route information
    this.route = {
      section : 'list',
      catalog : '',
      page : '',
      editMark : false,
      viewMark : false,
      markId : '',
      catalogId : '',
      pageIndex : -1
    }

    // split up the hash state
    var parts = this.window
      .location
      .hash
      .replace(/#/,'')
      .split('/');
    
    // remove any empty spots
    for( var i = parts.length-1; i >= 0; i-- ) {
      if( !parts[i] ) parts.splice(i, 1);
    }

    // parse app state information based on location in hash route
    this._parseRoute(this.window.location.hash);

    if( this.firstLoad && this.route.edit && !this.route.markId ) {
      return this.window.location.hash = this.route.catalogId+'/'+this.route.pageId
    }

    // set the current app state
    this.set({
      section: this.route.section,
      editingMark: this.route.editMark,
      viewingMark: this.route.viewMark,
      creatingMark : this.route.createMark,
      markId : this.route.markId,
      pageIndex : this.route.pageIndex,
      catalogId : this.route.catalogId
    });

    // set the user activity, ie which catalog and page the user
    // is currently viewing (this may be empty as well).
    // this._setUserActivity(this.route.catalogId, this.route.pageId);
  }

  /**
   * @method _setWindowLocation
   * @description sets the window hash.  All hash updates should use
   * this method.  very useful for debugging.
   */
  _setWindowLocation(location) {
    this.window.location.hash = location;
  }

  /**
   * Parse an individual route section
   **/
  _parseRoute(hash) {
    let parts = hash
      .replace(/#\/?/,'')
      .split('/');

    if( parts.length === 0 ) parts = ['list'];
    if( !parts[0] ) parts[0] = 'list';

    this.route.section = parts[0];
    
    if( this.route.section === 'admin' ) {
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
      return;
    }

    parts.splice(0,1);

    if( this.route.section === 'view-mark' || 
        this.route.section === 'edit-mark' ) {
      
      this.route.markId = parts.splice(parts.length-1, 1)[0];
    }

    if( this.route.section === 'view-mark' || 
        this.route.section === 'edit-mark' || 
        this.route.section === 'create-mark' || 
        this.route.section === 'catalog' ) {

      this.route.pageIndex = parseInt(parts.splice(parts.length-1, 1)[0]);
      this.route.catalogId = '/'+parts.join('/');
    }

    if( this.route.section === 'view-mark' ) {
      this.route.viewMark = true;
    } else if( this.route.section === 'create-mark' ) {
      this.route.createMark = true;
    } else if( this.route.section === 'edit-mark' ) {
      this.route.editMark = true;
    }
  }

  /**
   * @method get
   * @description get the current application state
   * 
   * @returns {Object} appState
   */
  async get() {
    return this.store.data;
  }

  /**
   * @method set
   * @description Update the app state
   * 
   * @param {Object} update state keys to update
   * 
   * @returns {Object}
   */
  set(update) {
    this.store.set(update);
    return this.get();
  }
}

module.exports = new AppStateModel();