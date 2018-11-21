const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {PresenceModel} = require('@ucd-lib/crowd-source-js');

/**
 * Controller for handling user activity.  This is simply where
 * the user is, which catalog and or page. This controller both 
 * sets the current users location as well as listens for other
 * users who are at specific locations.
 */
class UserActivityModel extends BaseModel {

  /**
   * Initialize controller.  Setup ref objects and current location
   */
  constructor() {
    super();

    // after 5 min and activity will be considered stale
    this.STALE_TIME = 5 * 60 * 1000;
    // Used for hanging sessions.  anything over an hour hold 
    // will be removed when auth state changes
    this.CLEANUP_TIME = 60 * 60 * 1000;

    // show logging, mostly FB connections and disconnections
    this.log = false;

    // cache data here from events below for setting current users activity
    this.userId = '';
    this.appState = {};

    // setup event listeners
    this.listenersEnabled = false;
    this._onAuthUpdate = this._onAuthUpdate.bind(this);
    this._onAppStateUpdate = this._onAppStateUpdate.bind(this);

    // object to use for presence
    this.userPageLocation = {
      type : 'location',
      locationType : 'page'
    };
    this.userCatalogLocation = {
      type : 'location',
      locationType : 'catalog'
    };

    // make sure to remove user activity when it goes stale
    setInterval(() => this.checkStaleActivity(), 30 * 1000);
    this.register('UserActivityModel');
  }

  /**
   * @method enableModelListeners
   * @description wire up event listeners for auth and app state events.
   * Note.  This is mostly for testing so you can add/remove listeners.
   * The app will probably only ever call this method once, in
   * constructor above.
   */
  enableListeners() {
    if( this.listenersEnabled ) return;
    this.listenersEnabled = true;

    // when auth state changes update activity
    this.EventBus.on('auth-update', this._onAuthUpdate);

    // when app state changes update activity
    this.EventBus.on('app-state-update', this._onAppStateUpdate);
  }

  /**
   * @method _onAuthUpdate
   * @description when the apps auth state updates, update activity state
   * 
   * @param {Object} e auth state
   */
  _onAuthUpdate(e) {
    let uid = (e.state === 'loggedIn') ? e.user.uid : '';
    this.userId = uid;
    this.set(this.appState.catalogId, this.appState.pageId);
  }

  /**
   * @method _onAppStateUpdate
   * @description when the app state updates, update activity state
   * 
   * @param {Object} e app state
   */
  _onAppStateUpdate(e) {
    this.appState = e;
    this.set(this.appState.catalogId, this.appState.pageId);
  }

  /**
   * @method set
   * @description Set the current activity for the user
   * 
   * @param {String} catalogId current catalog user is viewing
   * @param {String} pageId (optional) current catalog page user is viewing
   */
  async set(catalogId, pageId, userId) {
    if( !userId ) userId = this.userId;

    await this._setCatalogLocation(catalogId, userId);
    await this._setPageLocation(pageId, userId);
  }

  async _setPageLocation(pageId, userId) {
    if( !userId || !pageId ) {
      if( this.userPageLocation.id ) {
        await PresenceModel.removePresence(this.userPageLocation.id);
      }
      return;
    }

    this.userPageLocation.userId = userId;
    this.userPageLocation.itemId = catalogId;
    this.userPageLocation.pageId = pageId;
    this.userPageLocation.updated = Date.now();
    return PresenceModel.updatePresence(this.userPageLocation);
  }

  async _setCatalogLocation(catalogId, userId) {
    if( !userId || !catalogId ) {
      if( this.userCatalogLocation.id ) {
        await PresenceModel.removePresence(this.userCatalogLocation.id);
      }
      return;
    }

    this.userCatalogLocation.userId = userId;
    this.userCatalogLocation.itemId = catalogId;
    this.userCatalogLocation.catalogId = catalogId;
    this.userCatalogLocation.updated = Date.now();
    return PresenceModel.updatePresence(this.userCatalogLocation);
  }

  /**
   * @method listen
   * @description Listen to resources activity.
   * 
   * @param {String} id resource guid to listen to.  This can be catalogId or pageId 
   */
  listen(id) {
    return PresenceModel.listenPresenceByItem(id);
  }

  /**
   * @method unlisten
   * @description Disconnect firebase listener for activity resource
   * 
   * @param {String} id resource id.  This can be catalogId or pageId 
   */
  unlisten(id) {
    return PresenceModel.unlistenPresenceByItem(id);
  }
}

module.exports = new UserActivityModel();