const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {CrowdInputModel, PresenceModel} = require('@ucd-lib/crowd-source-js')
const MarksStore = require('../stores/MarksStore');
const MarksService = require('../services/MarksService');


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
    this.tmpMark = {};

    setInterval(this.checkStaleMarks.bind(this), 30 * 1000);
    this.register('MarksModel');
  }

  /**
   * @method setPending
   * @description Create or update an existing mark.  Mark should
   * contain user (userid) or anonymous flag
   * 
   * @param {object} mark - mark data if update
   * 
   * @return {Promise} resolves to mark state
   */
  setPending(mark) {
    // set timestamps
    if( !mark.created ) mark.created = Date.now();
    mark.updated = Date.now();

    if( mark.id ) {
      return CrowdInputModel.addPending(mark);
    }
    return CrowdInputModel.updatePending(mark);
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
   * @param {string} markId mark id to remove
   * 
   * @returns {Promise} resolves to mark state
   */
  removePending(markId) {
    return CrowdInputModel.removePending(markId);  
  }

  /**
   * @method getPageMarks
   * @description Get a pages marks.  This will setup a firebase 
   * listener.  Then return the current state of marks for that page
   * 
   * @param {string} pageId - page id to listen for
   */
  async getPageMarks(pageId) {
    let state = await CrowdInputModel.getApprovedByItem(pageId);
    if( state.error ) throw error;
    let marks = Object.assign({}, state.payload);

    state = await CrowdInputModel.getPendingByItem(pageId);
    if( state.error ) throw error;
    marks = Object.assign(marks, state.payload);

    CrowdInputModel.listenPendingByItem(pageId);

    return marks;
  }

  /**
   * @method getPendingMark
   * @description Get a pending mark
   * 
   * @param {String} markId 
   * 
   * @returns {Promse} resolves to mark state
   */
  getPendingMark(markId) {
    return CrowdInputModel.getPending(markId);
  }

  /**
   * @method approveMark 
   * @description Approve mark (admin)
   * 
   * @param {string} markId - mark id
   * @param {string} jwt Optional. user pgr jwt token.  Defaults to auth model token
   * 
   * @returns {Promise}
   */
  approveMark(markId, jwt) {
    return CrowdInputModel.setApproved(markId, 'wine-mark', jwt)
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
    CrowdInputModel.listenPendingByItem(pageId);
  }

  /**
   * @method isTmpMarkStale
   * @description Check if a tmp mark is stale
   * 
   * @return {Boolean}
   */
  isTmpMarkStale() {
    if( !this.tmpMark.id ) return false;

    var expired = Date.now() - this.CLEANUP_TIME;
    if( this.tmpMark.updated > expired ) return false;
    return true;
  }

  /**
   * @method updateTempMark
   * @description Set or update a tmp user mark
   * 
   * @param {String} pageId page id for mark
   * @param {Array} xy array for the mark
   * 
   * @returns {Promise}
   */
  updateTempMark(pageId, xy) {
    this.tmpMark.itemId = pageId;
    this.tmpMark.updated = Date.now();
    this.tmpMark.data = {xy};

    return PresenceModel.updatePresence(this.tmpMark);
  }

  /**
   * @method removeTempMark
   * @description Remove a tmp mark
   * 
   */
  async removeTempMark() {
    // we haven't created a tmp mark yet
    if( !this.tmpMark.id ) return;
    return PresenceModel.removePresence(this.tmpMark.id);
  }

  /**
   * @method checkStaleMarks
   * @description Check for stale tmp marks
   */
  checkStaleTmpMarks() {
    if( !this.isTmpMarkStale() ) return;
    this.removeTempMark();
  }
}


module.exports = new MarksModel();
