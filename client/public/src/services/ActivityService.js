const {BaseService} = require('@ucd-lib/cork-app-utils');
const ActivityStore = require('../stores/ActivityStore');
const firebase = require('../firebase');

class ActivityService extends BaseService {

  constructor() {
    super();
    this.store = ActivityStore;
    this.disconnectRefs = {};
    this.listenerRefs = {};
  }

  /**
   * @method getUserActivity
   * @description get the user activity object
   * 
   * @param {String} uid user id
   * 
   * @returns {Promise} resolves to firebase snapshot
   */
  getUserActivity(uid) {
    return firebase
      .database()
      .ref(`users/${uid}/activity`)
      .once('value')
  }

  /**
   * @method setUserActivity
   * @description set the user activity via multi-path firebase update object
   * 
   * @param {Object} update multi-path firebase update object
   */
  async setUserActivity(update = {}) {
    this.setDisconnectRefs(update);
    
    if( Object.keys(update) === 0 ) return;
  
    return firebase
      .database()
      .ref()
      .update(update)
  }

  /**
   * @method clearUserActivity
   * @description clear out some user activity via multi-path firebase update object
   * 
   * @param {Object} update multi-path firebase update object
   */
  clearUserActivity(removeUpdate = {}) {
    if( Object.keys(removeUpdate).length === 0 ) {
      return; // noop
    }

    return firebase
      .database()
      .ref()
      .update(removeUpdate)
  }

  /**
   * @method setDisconnectRefs
   * @description If we lose connection, make sure that activity paths are set to null.
   * 
   * @param {Object} update - Firebase multi-path update object 
   * 
   * @return {Promise}
   */
  async setDisconnectRefs(update = {}) {
    // cancel any current disconnectRefs
    for( var key in this.disconnectRefs ) {
      this.disconnectRefs[key].cancel();
    }

    if( Object.keys(update).length === 0 ) return; 

    // set new disconnectRefs
    this.disconnectRefs = {};
    for( var key in update ) {
      var ref = firebase.database().ref(key).onDisconnect();
      await ref.set(null);
      this.disconnectRefs[key] = ref;
    }
  }

  /**
   * @method listen
   * @description Listen to resources activity.
   * 
   * @param {String} id resource guid to listen to.  This can be catalogId or pageId 
   */
  async listen(id) {
    // we already have a listener
    if( this.listenerRefs[id] ) return;

    // setting up FB listeners as cost, you may want to know when this happens
    if( this.log ) {
      console.warn(`Setting up activity listener for ${id}`);
    }
    
    // set up FB listener and listen for standard add, update, remove events.
    // update Redux on event
    var ref = firebase.database().ref(`activity/${id}`);
    this.listenerRefs[id] = ref;

    ref.on('child_added', (childSnapshot) => this._onChildAdded(id, childSnapshot));
    ref.on('child_changed', (childSnapshot) => this._onChildChanged(id, childSnapshot));
    ref.on('child_removed', (childSnapshot, prevChildKey) => this._onChildRemoved(id, childSnapshot));
  }

  /**
   * @method unlisten
   * @description Disconnect firebase listener for activity resource
   * 
   * @param {String} id resource id.  This can be catalogId or pageId 
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
    this.store.remove({id});
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

  /**
   * @method _onChildAdded
   * @description called when activity state for a certain resources updates
   * 
   * @param {String} id resource id
   * @param {Object} childSnapshot firebase snapshot
   */
  _onChildAdded(id, childSnapshot) {
    var timestamp = childSnapshot.val();
    var uid = childSnapshot.key;

    if( this.model.isStale(timestamp) ) {
      if( this.log ) console.warn(`Ignoring stale user activity: ${id}:${uid}`);
      return;
    }

    this.store.set({id, uid, timestamp});
  }

  /**
   * @method _onChildChanged
   * @description called when activity state for a certain resources updates
   * 
   * @param {String} id resource id
   * @param {Object} childSnapshot firebase snapshot
   */
  _onChildChanged(id, childSnapshot) {
    var timestamp = childSnapshot.val();
    var uid = childSnapshot.key;

    if( this.model.isStale(timestamp) ) {
      if( this.log ) console.warn(`Ignoring stale user activity: ${id}:${uid}`);
      return;
    }

    this.store.set({id, uid, timestamp});
  }

  /**
   * @method _onChildRemoved
   * @description called when activity state for a certain resources is removed
   * 
   * @param {String} id resource id
   * @param {Object} childSnapshot firebase snapshot
   */
  _onChildRemoved(id, childSnapshot) {
    var uid = childSnapshot.key;
    this.store.remove({id, uid});
  }
}

module.exports = new ActivityService();