const uuid = require('uuid');
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const MarksStore = require('../stores/MarksStore');
const MarksService = require('../services/MarksService');
const firebase = require('../firebase')();


/**
 * Mark controller for handling page marks as well as connection to Firebase 
 * for those marks.
 */
class MarksModel extends BaseModel {

  constructor() {
    super();


    this.store = MarksStore;
    this.service = MarksService;
    MarksService.model = this;

    // Used for hanging temp marks.  anything over 5min old 
    // will be removed when auth state changes
    this.CLEANUP_TIME = 5 * 60 * 1000;

    // TODO: move this to the store
    this.tmpMark = {
      // temp mark UID
      id : uuid.v4(),
      // page id
      pageId : '',
      // disconnect references
      disconnect : {}
    }

    // open firebase refs
    this.refs = {};

    // cleanup hanging sessions
    this.cleanupSessions();

    this.user = {};

    // when auth state changes, if we have set a location but
    // not sent to FB cause we had no userId, do it now
    this.MasterController.on('auth-update', (e) => {
      // also, cleanup hanging sessions
      this.cleanupSessions();
    });

    setInterval(this.checkStaleMarks.bind(this), 30 * 1000);

    this.register('MarksModel');
  }

  /**
   * @method cleanupStaleTmpMarks
   * @description cleanup stale tmp marks made by user
   * 
   * @param {String} uid user id
   * 
   * @returns {Promise} 
   */
  async cleanupStaleTmpMarks(uid) {
    // get the current User ID and database namespace
    var uid = this.getUser().uid;
    if( !uid ) return;

    // grab last know activity from user object in FB
    let snapshot = await this.service.getTmpMarks();

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
      return; // noop
    }

    if( config.log ) {
      console.warn('Removing stale marks from cleanup ', removeUpdate);
    }

    // remove all expired activity
    await firebase.database().ref().update(removeUpdate)
  }



  /**
   * @method setPending
   * @description Create or update an existing mark
   * 
   * @param {String} userId - user id
   * @param {string} pageId - page id to add mark to 
   * @param {string|object} markId - mark id if update, or mark object if new mark
   * @param {object} [mark] - mark data if update
   * 
   * @return {Promise}
   */
  async setPending(userId, pageId, markId, mark) {
    // user must be logged in to create a mark
    if( !userId ) {
      throw(new Error('You must be logged in to create a mark'));
    }

    // we are creating a mark
    if( typeof markId === 'object' ) {
      mark = markId;
      markId = uuid.v4();
    }

    // make sure the current userId is set
    if( !mark.user ) {
      mark.user = uid;
      mark.isAnonymous = user.isAnonymous ? true : false;
    }

    // set timestamps
    if( !mark.created ) mark.created = Date.now();
    mark.updated = Date.now();

    return await this.service.setFirebaseMark(pageId, markId, mark);    
  }

  /**
   * @method votePending
   * @description Vote a page mark up or down
   * 
   * @param {String} userId - user id
   * @param {string} pageId - page id for mark
   * @param {string} markId - mark id to vote on
   * @param {string} vote - vote type.  Should be 'up' or 'down'
   * 
   * @return {Promise} firebase response
   */
  votePending(userId, pageId, markId, vote) {
    if( !userId ) {
      throw new Error('You must be logged in to vote');
    }

    // save vote to firebase
    return this.service.votePending(userId, pageId, markId, vote);
  }

  /**
   * @method removePending
   * @description Remove a mark
   * 
   * @param {string} pageId - page id for mark
   * @param {string} markId - mark id to remove
   * 
   * @returns {Promise} resolves to mark state
   */
  removePending(pageId, markId) {
    return this.setFirebaseMark(parkId, markId, null);    
  }

  /**
   * @method getPageMarks
   * @description Get a pages marks.  This will setup a firebase 
   * listener.  Then return the current state of marks for that page
   * 
   * @param {string} pageId - page id to listen for
   */
  async getPageMarks(pageId) {
    await this.getApprovedMarks(pageId);

    if( !this.refs[pageId] ) {
      this.listenToPage(pageId);
    }

    var marks = this.store.data.byId;
    var currentMarks = [];
    for( var key in marks ) {
      if( marks[key].pageId === pageId ) {
        currentMarks.push(marks[key]);
      }
    }

    return currentMarks;
  }

  /**
   * @method getPendingMark
   * @description Get a pending mark from firebase
   * 
   * @param {String} pageId 
   * @param {String} markId 
   * 
   * @returns {Promse} resolves to mark state
   */
  getPendingMark(pageId, markId) {
    return this.service.getPendingMark(pageId, markId);
  }

  /**
   * @method listenToPage
   * @description This will setup a firebase listener.  Will listen for child 'add',
   * 'remove' and 'change' events.  Will ignore stale tmp marks.  Fires
   * updates to redux.
   * 
   * @param {string} pageId - page id to listen for
   */
  listenToPage(pageId) {
    this.service.listenToPage(pageId);
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

      this.store.setPendingMarkLoaded(pageId, markId, val);
    });
  }

  getApprovedMarks(pageId) {
    return this.service.getApprovedMarks(pageId);
  }

  /**
   * Set or update a tmp user mark
   * 
   * @param {string} pageId - page id for mark
   * @param {array} xy - array for the mark
   */
  updateTempMark(pageId, xy) {
    var uid = this.getUser().uid;
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
   */
  removeTempMark() {
    return new Promise((resolve, reject) => {
      if( !this.tmpMark.pageId ) return resolve();

      var uid = this.getUser().uid;
      if( !uid ) return resolve();

      this.setDisconnectRefs({}, () => {
        var removeUpdate = {};

        removeUpdate[`/users/${uid}/tempMarks/${this.tmpMark.id}`] = null;
        removeUpdate[`/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;

        this.tmpMark.pageId = '';

        // set new disconnectRefs
        firebase
          .database()
          .ref()
          .update(removeUpdate)
          .then(resolve)
          .catch(reject);
      });
    });
   
  }

  /**
   * Search pending marks
   * 
   * @param {object} params - postgrest search params
   */
  pendingMarkSearch(params) {
    if( !this.getUser().auth0Token ) {
      throw new Error('Must have a token');
    }

    return this.service.pendingMarkSearch(params);
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
    var marks = this.store.data.byId;
    var mark;

    for( var markId in marks ) {
      mark = marks[markId];

      if( mark.state !== 'loaded' ) continue;

      if( this.isStale(mark.data) ) {
        if( this.log ) {
          console.warn(`Removing stale tmp mark: ${markId}`);
        }

        this.store.setMarkDeleted(markId);
      }
    }
  }
}


module.exports = new MarksModel();
