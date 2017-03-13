var store = require('../../redux/store');
var actions = require('../../redux/actions/activity');
var firebase = require('../../firebase')();
var eventBus = require('../../eventBus');

/**
 * Controller for handling user activity.  This is simply where
 * the user is, which catalog and or page. This controller both 
 * sets the current users location as well as listens for other
 * users who are at specific locations.
 */
class UserActivityController {

  /**
   * Initialize controller.  Setup ref objects and current location
   */
  constructor() {
    // show logging, mostly FB connections and disconnections
    this.log = false;

    // Used for hanging sessions.  anything over an hour hold 
    // will be removed when auth state changes
    this.CLEANUP_TIME = 60 * 60 * 1000;

    // local store for current location
    // TODO: perhaps grab this form redux store?
    this.currentLocation = {
      catalogId : '',
      pageId : ''
    }

    // firebase references for onDisconnect 
    this.disconnectRefs = {};
    // firebase references for updates
    this.listenerRefs = {};

    // cleanup hanging sessions
    this.cleanupSessions();

    // when auth state changes, if we have set a location but
    // not sent to FB cause we had no userId, do it now
    eventBus.on('auth-update', (e) => {
      if( this.pendingLocation ) {
        this.set(
          this.pendingLocation.catalogId, 
          this.pendingLocation.pageId
        );
      }

      // also, cleanup hanging sessions
      this.cleanupSessions();
    });
  }

  /**
   * Clean up hanging sessions
   */
  cleanupSessions() {
    // get the current User ID and database namespace
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) return;

    // grab last know activity from user object in FB
    firebase
      .database()
      .ref(`${dbns}/users/${uid}/activity`)
      .once('value')
      .then((snapshot) => {
        var activity = snapshot.val();
        if( !activity ) return; // noop

        // check for all activity past CLEANUP_TIME (1 hour)
        var now = Date.now();
        var removeUpdate = {};

        for( var key in activity ) {
          if( now - activity[key] > this.CLEANUP_TIME ) {
            removeUpdate[`${dbns}/activity/${key}/${uid}`] = null;
            removeUpdate[`${dbns}/users/${uid}/activity/${key}`] = null;
          } 
        }

        if( Object.keys(removeUpdate).length === 0 ) {
          return;
        }

        // remove all expired activity
        firebase.database().ref().update(removeUpdate)
      });
  }

  /**
   * Set the current activity for the user
   * @param {string} catalogId - current catalog user is viewing
   * @param {string} [pageId] - current catalog page user is viewing
   */
  set(catalogId, pageId) {
    var [uid, dbns] = getUserAndDBNS();

    // if there is no user object, just set to pending location for
    // now.  Activity will be handled when auth state changes.
    if( !uid ) {
      this.pendingLocation = {catalogId, pageId};
      return;
    }

    // we have no current location
    this.pendingLocation = null;

    // first, remove current location
    this.removeCurrentLocation((error) => {
      if( error ) throw error;

      if( !catalogId && !pageId ) {
        return; // nothing left todo
      }

      // create the update object with current timestamp
      var time = Date.now();

      var update = {};
      if( catalogId ) {
        this.currentLocation.catalogId = catalogId;
        update[`${dbns}/activity/${catalogId}/${uid}`] = time;
        update[`${dbns}/users/${uid}/activity/${catalogId}`] = time;
      }

      if( pageId ) {
        // TODO: remove this when we move to guids
        pageId = catalogId+'--'+pageId;

        this.currentLocation.pageId = pageId;
        update[`${dbns}/activity/${pageId}/${uid}`] = time;
        update[`${dbns}/users/${uid}/activity/${pageId}`] = time;
      }

      // update FB
      firebase
        .database()
        .ref()
        .update(update)
        .then(() => {
          // now set onDisconnect reference
          this.setDisconnectRefs(update);
        })
        .catch((error) => {
          throw error;
        })
    });
  }

  /**
   * If we lose connection, make sure that activity paths are set to null.
   * @param {Object} update - Firebase multi-path update object 
   */
  setDisconnectRefs(update) {
    // cancel any current disconnectRefs
    for( var key in this.disconnectRefs ) {
      this.disconnectRefs[key].cancel();
    }

    // set new disconnectRefs
    for( var key in update ) {
      var ref = firebase.database().ref(key).onDisconnect();
      ref.set(null);
      this.disconnectRefs[key] = ref;
    }
  }

  /**
   * Remove activity paths for current user location
   * @param {function} callback 
   */
  removeCurrentLocation(callback) {
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) {
      throw new Error('You must be logged in');
    }

    // create multi-path FB update object
    var removeUpdate = {};
    if( this.currentLocation.catalogId ) {
      removeUpdate[`${dbns}/activity/${this.currentLocation.catalogId}/${uid}`] = null;
      removeUpdate[`${dbns}/users/${uid}/activity/${this.currentLocation.catalogId}`] = null;
    }
    if( this.currentLocation.pageId ) {
      removeUpdate[`${dbns}/activity/${this.currentLocation.pageId}/${uid}`] = null;
      removeUpdate[`${dbns}/users/${uid}/activity/${this.currentLocation.pageId}`] = null;
    }

    if( Object.keys(removeUpdate).length === 0 ) {
      return callback(); // noop
    }

    // update FB
    firebase
      .database()
      .ref()
      .update(removeUpdate)
      .then(() => {
        this.currentLocation = {
          catalogId : '',
          pageId : ''
        }

        callback();
      })
      .catch((error) => {
        callback(error);
      })
  }

  /**
   * Listen to resources activity.  Listeners will update redux when FB state 
   * @param {string} id - resource guid to listen to.  This can be catalogId or pageId 
   * @returns {object} - contains resource id and list of active users
   */
  listen(id) {
    // if we already have a FB reference, just return the redux state
    if( this.listenerRefs[id] ) {
     var users = store.getState().activity.byId[id] || {};
     return {id, users};
    }

    var dbns = store.getState().config.dbns;

    // setting up FB listeners as cost, you may want to know when this happens
    if( this.log ) {
      console.warn(`Setting up activity listener for ${id}`);
    }
    
    // set up FB listener and listen for standard add, update, remove events.
    // update Redux on event
    var ref = firebase.database().ref(`${dbns}/activity/${id}`);
    this.listenerRefs[id] = ref;


    ref.on('child_added', (childSnapshot, prevChildKey) => {
      var timestamp = childSnapshot.val();
      var uid = childSnapshot.key;
      store.dispatch(
        actions.setUserActivity(id, uid, timestamp)
      );
    });

    ref.on('child_changed', (childSnapshot, prevChildKey) => {
      var timestamp = childSnapshot.val();
      var uid = childSnapshot.key;
      store.dispatch(
        actions.setUserActivity(id, uid, timestamp)
      );
    });

    ref.on('child_removed', (childSnapshot, prevChildKey) => {
      var uid = childSnapshot.key;
      store.dispatch(
        actions.removeUserActivity(id, uid)
      );
    });

    var users = store.getState().activity.byId[id] || {};
    return {id, users};
  }

  /**
   * Disconnect firebase listener for resource
   * @param {string} id - resource id
   */
  unlisten(id) {
    // noop
    if( !this.listenerRefs[id] ) return;

    if( this.log ) {
      console.warn(`Unlistening to activity: ${id}`);
    }
    
    // turn off FB listern
    this.listenerRefs[id].off();
    delete this.listenerRefs[id];

    // clear data from redux
    store.dispatch(
      actions.removeUserActivity(id)
    );

    // remove onDisconnect reference if one exists
    if( this.disconnectRefs[id] ) {
      this.disconnectRefs[id].off();
      delete this.disconnectRefs[id];
    }
  }

  /**
   * Called from interested parties controller.  remove all listeners that are NOT in object hash.
   * @param {object} interested - hash of resource ids that have elements still interest in
   */
  cleanup(interested) {
    for( var id in this.listenerRefs ) {
      if( !interested[id] ) {
        this.unlisten(id);
      }
    } 
  }

}

function getUserAndDBNS() {
  return [
    store.getState().auth.user.uid,
    store.getState().config.dbns
  ];
}

var controller = new UserActivityController();
require('./events')(controller);
module.exports = controller;