var uuid = require('uuid');
var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/marks');
var firebase = require('../../firebase')();
var eventBus = require('../../eventBus');

class MarksController {

  constructor() {
    this.log = true;

    // Used for hanging temp marks.  anything over 5min old 
    // will be removed when auth state changes
    this.CLEANUP_TIME = 5 * 60 * 1000;

    this.tmpMark = {
      // temp mark UID
      id : uuid.v4(),
      // page id
      pageId : '',
      // disconnect references
      disconnect : {}
    }

    this.refs = {};

    // cleanup hanging sessions
    this.cleanupSessions();

    // when auth state changes, if we have set a location but
    // not sent to FB cause we had no userId, do it now
    eventBus.on('auth-update', (e) => {
      // also, cleanup hanging sessions
      this.cleanupSessions();
    });

    setInterval(this.checkStaleMarks.bind(this), 30 * 1000);
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
      .ref(`${dbns}/users/${uid}/tempMarks`)
      .once('value')
      .then((snapshot) => {
        var marks = snapshot.val();
        console.log(marks);
        if( !marks ) return; // noop

        // check for all activity past CLEANUP_TIME (1 hour)
        var now = Date.now();
        var removeUpdate = {};

        for( var markId in marks ) {
          if( now - marks[markId].updated > this.CLEANUP_TIME ) {
            removeUpdate[`${dbns}/users/${uid}/tempMarks/${markId}`] = null;
            removeUpdate[`${dbns}/marks/${marks[markId].pageId}/${markId}`] = null;
          } 
        }

        if( Object.keys(removeUpdate).length === 0 ) {
          return;
        }

        if( this.log ) {
          console.warn('Removing stale marks from cleanup ', removeUpdate);
        }

        // remove all expired activity
        firebase.database().ref().update(removeUpdate)
      });
  }

  get(pageId) {
    store.dispatch(
      actions.get(pageId)
    );

    return store.getState().collections.marks.byId[pageId];
  }

  select(pageId) {
    store.dispatch(
      actions.select(pageId)
    );

    return this.getSelected();
  }

  getSelected() {
    return store.getState().collections.marks.selected;
  }

  set(pageId, markId, mark) {
    var user = store.getState().auth.user;
    var uid = user.uid;
    if( !uid ) {
      throw new Error('You must be logged in to create a mark');
    }

    if( typeof markId === 'object' ) {
      mark = markId;
      markId = uuid.v4();
    }
    if( !mark.user ) {
      mark.user = uid;
      mark.isAnonymous = user.isAnonymous ? true : false;
    }

    if( !mark.created ) mark.created = Date.now();
    mark.updated = Date.now();

    store.dispatch(
      actions.saveMarkStart(pageId, markId, mark)
    );

    var dbns = store.getState().config.dbns;

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}`)
      .set(mark)
      .then(() => {
        store.dispatch(
          actions.saveMarkSuccess(pageId, markId)
        );
      })
      .catch((error) => {
        store.dispatch(
          actions.saveMarkFailure(pageId, markId, error)
        );
      });
  }

  vote(pageId, markId, vote) {
    var user = store.getState().auth.user;
    var uid = user.uid;

    if( !uid || user.isAnonymous ) {
      throw new Error('You must be logged in to vote');
    }

    var dbns = store.getState().config.dbns;

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}/votes/${uid}`)
      .set({type: vote})
      .then(() => {
        // noop... for now
      })
      .catch((error) => {
        throw error;
        // noop... for now
      });
  }

  remove(pageId, markId) {
    var dbns = store.getState().config.dbns;

    store.dispatch(
      actions.removeMarkStart(pageId, markId)
    );

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}`)
      .set(null)
      .then(() => {
        store.dispatch(
          actions.removeMarkSuccess(pageId, markId)
        );
      })
      .catch((error) => {
        store.dispatch(
          actions.removeMarkFailure(pageId, markId, error)
        );
      });
  }

  get(pageId) {
    if( !this.refs[pageId] ) {
      this.listen(pageId);
    }

    var marks = store.getState().collections.marks.byId;
    var currentMarks = [];
    for( var key in marks ) {
      if( marks[key].pageId === pageId ) {
        currentMarks.push(marks[key]);
      }
    }

    return currentMarks;
  }

  listen(pageId) {
    if( this.refs[pageId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
    }

    var dbns = store.getState().config.dbns;
    var ref = firebase.database().ref(`${dbns}/marks/${pageId}`);
    this.refs[pageId] = ref;

    /**
     * Individual Child Changes
     */
    ref.on('child_added', (childSnapshot, prevChildKey) => {
      var val = childSnapshot.val();
      var markId = childSnapshot.key;

      if( this.isStale(val) ) {
        if( this.log ) {
          console.log(`Ignoring stale mark ${markId}`);
        }
        return;
      }

      store.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });

    ref.on('child_changed', (childSnapshot, prevChildKey) => {
      var val = childSnapshot.val();
      var markId = childSnapshot.key;

      if( this.isStale(val) ) {
        if( this.log ) {
          console.log(`Ignoring stale mark ${markId}`);
        }
        return;
      }

      store.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });

    ref.on('child_removed', (childSnapshot, prevChildKey) => {
      var markId = childSnapshot.key;
      store.dispatch(
        actions.markRemoved(markId)
      );
    });
  }

  updateTempMark(pageId, xy) {
    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) return;

    var tmpMark = {
      isTemp : true,
      user : uid,
      pageId : pageId,
      updated : Date.now(),
      xy : xy
    }

    var update = {};
    update[`${dbns}/users/${uid}/tempMarks/${this.tmpMark.id}`] = tmpMark;
    update[`${dbns}/marks/${pageId}/${this.tmpMark.id}`] = tmpMark;

    if( this.tmpMark.pageId ) {
      update[`${dbns}/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;
    }

    this.tmpMark.pageId = pageId;


    this.setDisconnectRefs(update, () => {
      // update FB
      firebase
        .database()
        .ref()
        .update(update)
        .then((ref) => {
          // TODO: this is when we have really saved...
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  /**
   * If we lose connection, make sure that activity paths are set to null.
   * @param {Object} update - Firebase multi-path update object 
   */
  setDisconnectRefs(update, callback) {
    // cancel any current disconnectRefs
    for( var key in this.tmpMark.disconnect ) {
      this.tmpMark.disconnect[key].cancel();
    }

    var count = 0;
    var total = Object.keys(update).length;
    
    if( total === 0 && callback ) callback();
    
    var onComplete = function() {
      count++;
      if( count === total && callback ) callback();
    }

    // set new disconnectRefs
    for( var key in update ) {
      var ref = firebase.database().ref(key).onDisconnect();
      ref.set(null, onComplete);
      this.tmpMark.disconnect[key] = ref;
    }
  }

  removeTempMark(callback) {
    if( !this.tmpMark.pageId ) return;

    var [uid, dbns] = getUserAndDBNS();
    if( !uid ) return;

    this.setDisconnectRefs({}, () => {
      var removeUpdate = {};

      removeUpdate[`${dbns}/users/${uid}/tempMarks/${this.tmpMark.id}`] = null;
      removeUpdate[`${dbns}/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;

      // set new disconnectRefs
      firebase
        .database()
        .ref()
        .update(removeUpdate)
        .then(callback);

      this.tmpMark.pageId = '';
    });
  }

  getRemoveMark(callback) {
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

    this.currentLocation = {
      catalogId : '',
      pageId : ''
    }

    return removeUpdate;
  }

  unlisten(pageId) {
    if( !this.refs[pageId] ) return;

    if( this.log ) {
      console.warn(`Unlistening to page marks: ${pageId}`);
    }

    // TODO
    // store.dispatch(
    //   actions.clearMarks(pageId)
    // );

    this.refs[pageId].off();
    delete this.refs[pageId];
  }

  cleanup(interested) {
    for( var id in this.refs ) {
      if( !interested[id] ) {
        this.unlisten(id);
      }
    } 
  }

  isStale(mark) {
    if( !mark ) return false;
    if( !mark.isTemp ) return false;

    var expired = Date.now() - this.CLEANUP_TIME;
    if( mark.updated > expired ) return false;
    return true;
  }

  checkStaleMarks() {
    var marks = store.getState().collections.marks.byId;
    var mark;

    for( var markId in marks ) {
      mark = marks[markId];

      if( mark.state !== 'loaded' ) continue;

      if( this.isStale(mark.data) ) {
        if( this.log ) {
          console.warn(`Removing stale tmp mark: ${markId}`);
        }
        store.dispatch(
          actions.markRemoved(markId)
        );
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

var controller = new MarksController();
require('./events')(controller);
module.exports = controller;
