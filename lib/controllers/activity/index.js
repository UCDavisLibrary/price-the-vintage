var store = require('../../redux/store');
var actions = require('../../redux/actions/activity');
var firebase = require('../../firebase')();
var eventBus = require('../../eventBus');

class UserActivityController {

  constructor() {
    this.log = false;

    this.CLEANUP_TIME = 60 * 60 * 1000;

    this.currentLocation = {
      catalogId : '',
      pageId : ''
    }

    this.disconnectRefs = {};
    this.listenerRefs = {};

    this.cleanupSessions();
    eventBus.on('auth-update', (e) => {
      if( this.pendingLocation ) {
        this.set(
          this.pendingLocation.catalogId, 
          this.pendingLocation.pageId
        );
      }
      this.cleanupSessions();
    });
  }

  // cleanup any hanging sessions
  cleanupSessions() {
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) return;

    firebase
      .database()
      .ref(`${dbns}/users/${uid}/activity`)
      .once('value')
      .then((snapshot) => {
        var activity = snapshot.val();
        if( !activity ) return;

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

        firebase.database().ref().update(removeUpdate)
      });
  }

  set(catalogId, pageId) {
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) {
      this.pendingLocation = {catalogId, pageId};
      return;
    }

    this.pendingLocation = null;

    // first, remove current location
    this.removeCurrentLocation((error) => {
      if( error ) throw error;

      if( !catalogId && !pageId ) {
        return; // nothing left todo
      }

      var time = Date.now();

      var update = {};
      if( catalogId ) {
        this.currentLocation.catalogId = catalogId;
        update[`${dbns}/activity/${catalogId}/${uid}`] = time;
        update[`${dbns}/users/${uid}/activity/${catalogId}`] = time;
      }

      if( pageId ) {
        pageId = catalogId+'--'+pageId;
        this.currentLocation.pageId = pageId;
        update[`${dbns}/activity/${pageId}/${uid}`] = time;
        update[`${dbns}/users/${uid}/activity/${pageId}`] = time;
      }

      firebase
        .database()
        .ref()
        .update(update)
        .then(() => {
          this.setDisconnectRefs(update);
        })
        .catch((error) => {
          throw error;
        })
    });
  }

  setDisconnectRefs(update) {
    for( var key in this.disconnectRefs ) {
      this.disconnectRefs[key].cancel();
    }

    for( var key in update ) {
      var ref = firebase.database().ref(key).onDisconnect();
      ref.set(null);
      this.disconnectRefs[key] = ref;
    }
  }

  removeCurrentLocation(callback) {
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) {
      throw new Error('You must be logged in');
    }

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
      return callback();
    }

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

  listen(id) {

    if( this.listenerRefs[id] ) {
     var users = store.getState().activity.byId[id] || {};
     return {id, users};
    }

    var dbns = store.getState().config.dbns;

    if( this.log ) {
      console.warn(`Setting up activity listener for ${id}`);
    }
    
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

  unlisten(id) {
    if( !this.listenerRefs[id] ) return;

    if( this.log ) {
      console.warn(`Unlistening to activity: ${id}`);
    }
    

    this.listenerRefs[id].off();
    delete this.listenerRefs[id];

    store.dispatch(
      actions.removeUserActivity(id)
    );

    if( this.disconnectRefs[id] ) {
      this.disconnectRefs[id].off();
      delete this.disconnectRefs[id];
    }
  }

  /**
   * Called from interested parties
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