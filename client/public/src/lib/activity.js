var BaseModel = require('@ucd-lib/cork-app-utils').BaseModel;
var ActivityStore = require('../stores/ActivityStore');
var ActivityService = require('../services/ActivityService');
var firebase = require('../firebase');

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

    this.store = ActivityStore;
    this.service = ActivityService;
    // service uses the isStale method
    this.service.model = this;

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

    this.listenersEnabled = false;
    this._onAuthUpdate = this._onAuthUpdate.bind(this);
    this._onAppStateUpdate = this._onAppStateUpdate.bind(this);

    this.enableModelListeners();

    // make sure to remove user activity when it goes stale
    setInterval(this.checkStaleActivity.bind(this), 30 * 1000);

    this.register('UserActivityModel');
  }

  /**
   * @method enableModelListeners
   * @description wire up event listeners for auth and app state events.
   * Note.  This is mostly for testing so you can add/remove listeners.
   * The app will probably only ever call this method once, in
   * constructor above.
   */
  enableModelListeners() {
    if( this.listenersEnabled ) return;
    this.listenersEnabled = true;

    // when auth state changes update activity
    this.MasterController.on('auth-update', this._onAuthUpdate);

    // when app state changes update activity
    this.MasterController.on('app-state-update', this._onAppStateUpdate);
  }

  /**
   * @method disableModelListeners
   * @description remove event listeners for auth and app state events.
   * Note.  This is mostly for testing so you can add/remove listeners.
   * The app will probably only ever call this method from a integration test case
   * so this model is not reacting to events when not being tested.
   */
  disableModelListeners() {
    if( !this.listenersEnabled ) return;
    this.listenersEnabled = false;
    
    this.MasterController.removeListener('auth-update', this._onAuthUpdate);
    this.MasterController.removeListener('app-state-update', this._onAppStateUpdate);
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
    this.set(this.userId, this.appState.catalogId, this.appState.pageId);
  }

  /**
   * @method _onAppStateUpdate
   * @description when the app state updates, update activity state
   * 
   * @param {Object} e app state
   */
  _onAppStateUpdate(e) {
    this.appState = e;
    this.set(this.userId, this.appState.catalogId, this.appState.pageId);
  }

  /**
   * @method cleanupSessions
   * @description Clean up hanging sessions
   * 
   * @param {String} uid user id
   * @param {Boolean} force this flag will ignore activity time and current
   * app state catalogId and pageId values.  If passed, all registered user
   * activity for this user fill be removed.
   * 
   * @returns {Promise}
   */
  async cleanupSessions(uid, force = false) {
    if( !uid ) return;

    // grab last know activity from user object in FB
    let snapshot = await this.service.getUserActivity(uid);
    let activity = snapshot.val();

    if( !activity ) return; // noop

    var now = Date.now();
    var removeUpdate = {};

    for( var key in activity ) {
      if( this.appState.pageId !== key || 
          this.appState.catalogId !== key || 
          force ) {
        
        removeUpdate[`activity/${key}/${uid}`] = null;
        removeUpdate[`users/${uid}/activity/${key}`] = null;

      } else if( now - activity[key] > this.CLEANUP_TIME ) {
        
        removeUpdate[`activity/${key}/${uid}`] = null;
        removeUpdate[`users/${uid}/activity/${key}`] = null;
        
      } 
    }

    // remove all expired activity
    return this.service.clearUserActivity(removeUpdate);
  }


  /**
   * @method set
   * @description Set the current activity for the user
   * 
   * @param {String} userId current user id
   * @param {String} catalogId current catalog user is viewing
   * @param {String} pageId (optional) current catalog page user is viewing
   */
  async set(userId, catalogId, pageId) {
    if( !userId ) return;

    // we have no current location
    this.pendingLocation = null;

    // first, remove current location
    await this.cleanupSessions(userId);

    // create the update object with current timestamp
    let time = Date.now();
    let update = {};

    if( catalogId ) {
      update[`/activity/${catalogId}/${userId}`] = time;
      update[`/users/${userId}/activity/${catalogId}`] = time;
    }
    if( pageId ) {
      update[`/activity/${pageId}/${userId}`] = time;
      update[`/users/${userId}/activity/${pageId}`] = time;
    }

    await this.service.setUserActivity(update);
  }

  /**
   * @method listen
   * @description Listen to resources activity.
   * 
   * @param {String} id resource guid to listen to.  This can be catalogId or pageId 
   */
  async listen(id) {
    this.service.listen(id);
  }

  /**
   * @method unlisten
   * @description Disconnect firebase listener for activity resource
   * 
   * @param {String} id resource id.  This can be catalogId or pageId 
   */
  unlisten(id) {
    this.service.unlisten(id);
  }

  /**
   * @method cleanup
   * @description Called from interested parties controller.  remove all listeners that are NOT in object hash.
   * 
   * @param {Object} interested - hash of resource ids that have elements still interest in
   */
  cleanup(interested) {
    this.service.cleanup(interested);
  }

  /**
   * @method isStale
   * @description has a given child activity gone state?
   * 
   * @param {Number} timestamp activity timestamp
   * 
   * @returns {Boolean}
   */
  isStale(timestamp) {
    var expired = Date.now() - this.STALE_TIME;
    if( timestamp > expired ) return false;
    return true;
  }

  /**
   * @method checkStaleActivity
   * @description make sure old user activity is removed 
   */
  checkStaleActivity() {
    var activity = this.store.data.byId;
    var pageActivity;

    for( var pageId in activity ) {
      pageActivity = activity[pageId];

      for( var uid in pageActivity ) {
        if( this.isStale(pageActivity[uid]) ) {
          if( this.log ) {
            console.warn(`Removing stale user activity: ${pageId}:${uid}`);
          }
          this.store.remove({id: pageId, uid});
        }
      }
    }
  }

}

module.exports = new UserActivityModel();