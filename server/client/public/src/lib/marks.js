const uuid = require('uuid');
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const MarksStore = require('../stores/MarksStore');
const MarksService = require('../services/MarksService');
const firebase = require('../firebase');


/**
 * Mark controller for handling page marks as well as connection to Firebase 
 * for those marks.
 */
class MarksModel extends BaseModel {

  constructor() {
    super();

    this.store = MarksStore;
    this.service = MarksService;
    // the mark service does some stale mark checking, method
    // included in this class...
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
      // disconnect keys
      disconnect : []
    }

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
    // grab last know activity from user object in FB
    let snapshot = await this.service.getTmpMarks(uid);

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

    // if( config.log ) {
    //   console.warn('Removing stale marks from cleanup ', removeUpdate);
    // }

    // remove all expired activity
    await firebase.database().ref().update(removeUpdate)
  }



  /**
   * @method setPending
   * @description Create or update an existing mark.  Mark should
   * contain user (userid) and isAnonumous flag
   * 
   * @param {string} pageId - page id to add mark to 
   * @param {string|object} markId - mark id if update, or mark object if new mark
   * @param {object} [mark] - mark data if update
   * 
   * @return {Promise} resolves to mark state
   */
  async setPending(pageId, markId, mark) {
    // we are creating a mark
    if( typeof markId === 'object' ) {
      mark = markId;
      markId = uuid.v4();
    }

    // set timestamps
    if( !mark.created ) mark.created = Date.now();
    mark.updated = Date.now();

    await this.service.setFirebaseMark(pageId, markId, mark);

    return this.store.data.byId[markId];
  }

  /**
   * @method votePending
   * @description Vote a page mark up or down
   * 
   * @param {String} userId user id
   * @param {string} pageId page id for mark
   * @param {string} markId mark id to vote on
   * @param {string} vote vote type.  Should be 'up' or 'down'
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
   * @param {string} pageId page id for mark
   * @param {string} markId mark id to remove
   * 
   * @returns {Promise} resolves to mark state
   */
  removePending(pageId, markId) {
    return this.service.setFirebaseMark(pageId, markId, null);    
  }

  /**
   * @method getPageMarks
   * @description Get a pages marks.  This will setup a firebase 
   * listener.  Then return the current state of marks for that page
   * 
   * @param {string} pageId - page id to listen for
   */
  async getPageMarks(pageId) {
    let resp = await this.getApprovedMarks(pageId);
    await this.service.getPendingMarks(pageId);

    this.listenToPageMarks(pageId);

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
   * @method approveMark 
   * @description Approve mark (admin)
   * 
   * @param {object} mark - mark data
   * @param {string} markId - mark id
   * @param {string} pageId - page id
   * @param {string} jwt - user token
   * 
   * @returns {Promise}
   */
  approveMark(mark, markId, pageId, jwt) {
    return this.service.approveMark(mark, markId, pageId, jwt);
  }

  /**
   * @method listenToPageMarks
   * @description This will setup a firebase listener.  Will listen for child 'add',
   * 'remove' and 'change' events.  Will ignore stale tmp marks.  Fires
   * updates to redux.
   * 
   * @param {string} pageId - page id to listen for
   */
  listenToPageMarks(pageId) {
    this.service.listenToPageMarks(pageId);
  }

  /**
   * @method listenToMark
   * @description This will setup a firebase listener.  Will listen for change 
   * events for a specific mark
   *
   * TODO: remove if not used
   *  
   * @param {string} pageId - page id to listen for
   * @param {string} pageId - mark id to listen for
   */
  // listenToMark(pageId, markId) {
  //   this.service.listenToMark(pageId, markId);
  // }

  /**
   * @method getApprovedMarks
   * @description Get approved marks for page.  Used by getPageMarks
   * 
   * @param {string} pageId - page id to get marks for
   * 
   * @return {Promise}
   */
  getApprovedMarks(pageId) {
    return this.service.getApprovedMarks(pageId);
  }

  /**
   * @method updateTempMark
   * @description Set or update a tmp user mark
   * 
   * @param {String} uid user id
   * @param {String} pageId page id for mark
   * @param {Array} xy array for the mark
   * 
   * @returns {Promise}
   */
  updateTempMark(uid, pageId, xy) {
    var tmpMark = {
      isTemp : true,
      user : uid,
      pageId : pageId,
      updated : Date.now(),
      xy : xy
    }

    var update = {
      [`/users/${uid}/tempMarks/${this.tmpMark.id}`] : tmpMark,
      [`/marks/${pageId}/${this.tmpMark.id}`] : tmpMark
    };

    if( this.tmpMark.pageId && this.tmpMark.pageId !== tmpMark.pageId ) {
      update[`/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] = null;
    }

    this.tmpMark.pageId = pageId;
    return this.service.updateTempMark(update);
  }

  /**
   * @method removeTempMark
   * @description Remove a tmp user mark
   * 
   * @param {String} uid user id
   */
  async removeTempMark(uid) {
    if( !this.tmpMark.pageId ) return;
    
    await this.service.setTmpMarkDisconnectRefs();

    let removeUpdate = {
      [`/users/${uid}/tempMarks/${this.tmpMark.id}`] : null,
      [`/marks/${this.tmpMark.pageId}/${this.tmpMark.id}`] : null
    };

    this.tmpMark.pageId = '';

    return firebase
      .database()
      .ref()
      .update(removeUpdate)   
  }

  /**
   * @method pendingMarkSearch
   * @description Search pending marks
   * 
   * TODO: who was using this?
   * 
   * @param {Object} params - postgrest search params
   * @param {String} jwt - access token
   */
  // pendingMarkSearch(params, jwt) {
  //   return this.service.pendingMarkSearch(params, jwt);
  // }

  /**
   * @method cleanup
   * @description After interested parties request, this will be called.  It will let you know
   * all the resource ids that elements are still interested in.  You are free to 
   * remove any Firebase Reference that is NOT in this list.
   * 
   * @param {Object} interested - hash of interested resource ids
   */
  cleanup(interested) {
    this.service.cleanup(interested);
  }

  /**
   * @method isStale
   * @description Check if a tmp mark is stale
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
   * @method checkStaleMarks
   * @description Check for stale tmp marks
   */
  checkStaleMarks() {
    var marks = this.store.data.byId;
    var mark;

    for( var markId in marks ) {
      mark = marks[markId];

      if( mark.state !== 'loaded' ) continue;

      if( this.isStale(mark.payload) ) {
        if( this.log ) {
          console.warn(`Removing stale tmp mark: ${markId}`);
        }

        this.store.setMarkDeleted(markId);
      }
    }
  }
}


module.exports = new MarksModel();
