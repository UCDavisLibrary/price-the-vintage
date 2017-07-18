var uuid = require('uuid');
var BaseModel = require('cork-app-utils').BaseModel;

var actions = require('../redux/actions/collections/marks');
var firebase = require('../firebase')();


/**
 * Mark controller for handling page marks as well as connection to Firebase 
 * for those marks.
 */
class MarksModel extends BaseModel {

  constructor() {
    super();

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
    this.eventBus.on('auth-update', (e) => {
      // also, cleanup hanging sessions
      this.cleanupSessions();
    });

    setInterval(this.checkStaleMarks.bind(this), 30 * 1000);

    this.bindMethods();
  }

  /**
   * Clean up hanging sessions
   */
  cleanupSessions() {
    // get the current User ID and database namespace
    var uid = this.getUser();
    if( !uid ) return;

    // grab last know activity from user object in FB
    firebase
      .database()
      .ref(`users/${uid}/tempMarks`)
      .once('value')
      .then((snapshot) => {
        var marks = snapshot.val();
        if( !marks ) return; // noop

        // check for all activity past CLEANUP_TIME (1 hour)
        var now = Date.now();
        var removeUpdate = {};

        for( var markId in marks ) {
          if( now - marks[markId].updated > this.CLEANUP_TIME ) {
            removeUpdate[`/users/${uid}/tempMarks/${markId}`] = null;
            removeUpdate[`/marks/${marks[markId].pageId}/${markId}`] = null;
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

  /**
   * Select a page
   * 
   * @param {string} pageId - page id to select
   */
  select(pageId) {
    this.dispatch(
      actions.select(pageId)
    );

    return this.getSelected();
  }

  /**
   * Get selected page id
   */
  getSelected() {
    return this.getState().collections.marks.selected;
  }

  /**
   * Create or update an existing mark
   * 
   * @param {string} pageId - page id to add mark to 
   * @param {string|object} markId - mark id if update, or mark object if new mark
   * @param {object|function} [mark] - mark data if update
   */
  set(pageId, markId, mark) {
    return new Promise((resolve, reject) => {

      var user = this.getState().auth.user;
      var uid = user.uid;

      // user must be logged in to create a mark
      if( !uid ) {
        return reject(new Error('You must be logged in to create a mark'));
      }

      // we are creating a mark
      if( typeof markId === 'object' ) {
        mark = markId;
        markId = uuid.v4();
      }
      if( typeof mark === 'function' ) {
        callback = mark;
      }

      // make sure the current userId is set
      if( !mark.user ) {
        mark.user = uid;
        mark.isAnonymous = user.isAnonymous ? true : false;
      }

      // set timestamps
      if( !mark.created ) mark.created = Date.now();
      mark.updated = Date.now();

      this.dispatch(
        actions.saveMarkStart(pageId, markId, mark)
      );

      // update firebase
      firebase
        .database()
        .ref(`marks/${pageId}/${markId}`)
        .set(mark)
        .then(() => {
          this.dispatch(
            actions.saveMarkSuccess(pageId, markId)
          );
          resolve();
        })
        .catch((error) => {
          this.dispatch(
            actions.saveMarkFailure(pageId, markId, error)
          );
          reject(error);
        });  
      
    });
    
  }

  /**
   * Vote a page mark up or down
   * 
   * @param {string} pageId - page id for mark
   * @param {string} markId - mark id to vote on
   * @param {string} vote - vote type.  Should be 'up' or 'down'
   */
  vote(pageId, markId, vote) {
    var user = this.getState().auth.user;
    var uid = user.uid;

    // you must be REALLY logged in to vote
    if( !uid || user.isAnonymous ) {
      throw new Error('You must be logged in to vote');
    }

    // save vote to firebase
    firebase
      .database()
      .ref(`marks/${pageId}/${markId}/votes/${uid}`)
      .set({type: vote})
      .then(() => {
        // noop... for now
      })
      .catch((error) => {
        throw error;
        // noop... for now
      });
  }

  /**
   * Remove a mark
   * 
   * @param {string} pageId - page id for mark
   * @param {string} markId - mark id to remove
   */
  remove(pageId, markId) {
    return new Promise((resolve, reject) => {
      this.dispatch(
        actions.removeMarkStart(pageId, markId)
      );

      firebase
        .database()
        .ref(`marks/${pageId}/${markId}`)
        .set(null)
        .then(() => {
          this.dispatch(
            actions.removeMarkSuccess(pageId, markId)
          );
          
          resolve();
        })
        .catch((error) => {
          this.dispatch(
            actions.removeMarkFailure(pageId, markId, error)
          );

          reject(error);
        });
    });
    
  }

  /**
   * Get a pages marks.  This will setup a firebase listener.  Then return
   * the current state of marks for that page
   * 
   * @param {string} pageId - page id to listen for
   */
  get(pageId) {
    this.getApprovedMarks(pageId);

    if( !this.refs[pageId] ) {
      this.listen(pageId);
    }

    var marks = this.getState().collections.marks.byId;
    var currentMarks = [];
    for( var key in marks ) {
      if( marks[key].pageId === pageId ) {
        currentMarks.push(marks[key]);
      }
    }

    return currentMarks;
  }

  getMark(pageId, markId) {
    firebase
      .database()
      .ref(`marks/${pageId}/${markId}`)
      .once('value')
      .then((snapshot) => {
        this.dispatch(
          actions.markChange(pageId, markId, snapshot.val())
        );
      })

    return this.getState().collections.marks.byId[markId] || {state:'loading'};
  }

  /**
   * This will setup a firebase listener.  Will listen for child 'add',
   * 'remove' and 'change' events.  Will ignore stale tmp marks.  Fires
   * updates to redux.
   * 
   * @param {string} pageId - page id to listen for
   */
  listen(pageId) {
    if( this.refs[pageId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
    }

    var ref = firebase.database().ref(`marks/${pageId}`);
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

      this.dispatch(
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

      this.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });

    ref.on('child_removed', (childSnapshot, prevChildKey) => {
      var markId = childSnapshot.key;
      this.dispatch(
        actions.markRemoved(markId)
      );

      // This mark may have been approved...
      this.getApprovedMarks(pageId);
    });
  }

  listenToMark(pageId, markId) {
    if( this.refs[markId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId+', markId: '+markId);
    }

    var ref = firebase.database().ref(`marks/${pageId}/${markId}`);
    this.refs[markId] = ref;

    ref.on('value', (snapshot) => {
      var val = snapshot.val();

      if( this.isStale(val) ) {
        if( this.log ) {
          console.log(`Ignoring stale mark ${markId}`);
        }
        return;
      }

      this.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });
  }

  getApprovedMarks(pageId) {
    this.dispatch(
      actions.getApprovedMarks(pageId)
    );
  }

  /**
   * Set or update a tmp user mark
   * 
   * @param {string} pageId - page id for mark
   * @param {array} xy - array for the mark
   */
  updateTempMark(pageId, xy) {
    var uid = this.getUser();
    if( !uid ) return;
    
    var tmpMark = {
      isTemp : true,
      user : uid,
      pageId : pageId,
      updated : Date.now(),
      xy : xy
    }

    var update = {};
    update[`/users/${uid}/tempMarks/${this.tmpMark.id}`] = tmpMark;
    update[`/marks/${pageId}/${this.tmpMark.id}`] = tmpMark;

    if( this.tmpMark.pageId ) {
      update[`/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;
    }

    this.tmpMark.pageId = pageId;

    // setup disconnect information before we do anything
    // this will wait for verification that disconnect ref is set.
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
   * 
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

  /**
   * Remove a tmp user mark
   * 
   * @param {function} callback - called when tmp mark is verified remove from firbase.
   */
  removeTempMark(callback) {
    return new Promise((resolve, reject) => {
      if( !this.tmpMark.pageId ) return resolve();

      var uid = this.getUser();
      if( !uid ) return resolve();

      this.setDisconnectRefs({}, () => {
        var removeUpdate = {};

        removeUpdate[`/users/${uid}/tempMarks/${this.tmpMark.id}`] = null;
        removeUpdate[`/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;

        // set new disconnectRefs
        firebase
          .database()
          .ref()
          .update(removeUpdate)
          .then(resolve)
          .catch(reject);

        this.tmpMark.pageId = '';
      });
    });
   
  }

  /**
   * Search pending marks
   * 
   * @param {object} params - postgrest search params
   */
  pendingMarkSearch(params) {
    var user = this.getState().auth.user;
    if( !user.auth0Token ) {
      return {error: true, message: 'Must have a token'};
    }

    this.dispatch(
      actions.pendingMarkSearch(params)
    );

    return this.getState().collections.marks.pendingSearch;
  }

  /**
   * Stop listening to firebase reference.  Mostly called from cleanup().
   * 
   * @param {string} pageId - page id to stop listening to
   */
  unlisten(id) {
    if( !this.refs[id] ) return;

    if( this.log ) {
      console.warn(`Unlistening to mark(s): ${id}`);
    }

    this.refs[id].off();
    delete this.refs[id];
  }

  /**
   * After interested parties request, this will be called.  It will let you know
   * all the resource ids that elements are still interested in.  You are free to 
   * remove any Firebase Reference that is NOT in this list.
   * 
   * @param {object} interested - hash of interested resource ids
   */
  cleanup(interested) {
    for( var id in this.refs ) {
      if( !interested[id] ) {
        this.unlisten(id);
      }
    } 
  }

  /**
   * Check if a tmp mark is stale
   * 
   * @param {object} mark - tmp mark 
   */
  isStale(mark) {
    if( !mark ) return false;
    if( !mark.isTemp ) return false;

    var expired = Date.now() - this.CLEANUP_TIME;
    if( mark.updated > expired ) return false;
    return true;
  }

  /**
   * Check for stale tmp marks
   */
  checkStaleMarks() {
    var marks = this.getState().collections.marks.byId;
    var mark;

    for( var markId in marks ) {
      mark = marks[markId];

      if( mark.state !== 'loaded' ) continue;

      if( this.isStale(mark.data) ) {
        if( this.log ) {
          console.warn(`Removing stale tmp mark: ${markId}`);
        }
        this.dispatch(
          actions.markRemoved(markId)
        );
      }
    }
  }

  getUser() {
    return this.getState().auth.user.uid
  }
}


module.exports = new MarksModel();
