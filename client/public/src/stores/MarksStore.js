const BaseStore = require('@ucd-lib/cork-app-utils').BaseStore;
const deepEqual = require('fast-deep-equal');

class MarksStore extends BaseStore {

  constructor() {
    super();

    this.events = {
      PENDING_MARK_SEARCH_UPDATE : 'pending-mark-search-update',
      MARKS_APPROVED : 'marks-approved',
      MARKS_UPDATE : 'marks-update'
    }

    this.data = {
      // admin search state
      // marks here will not be kept in byId
      pendingSearch : {
        state : this.STATE.INIT
      },

      byId : {},
      
      // we ask for approved marks by page from pg, they will be 
      // store in byId above, but this object will store the state
      // of the request for loading widgets
      approvedPageRequestState : {}
    };
  }

  setPendingSearchLoading(params, request) {
    this.data.pendingSearch = {state: this.STATE.LOADING, params, request};
    this.emitPendingSearchEvent();
  }

  setPendingSearchError(error, params) {
    this.data.pendingSearch = {
      state: this.STATE.ERROR, 
      params : params,
      error: error
    }
    this.emitPendingSearchEvent();
  }

  setPendingSearchLoaded(payload, params) {
    this.data.pendingSearch = {
      state: this.STATE.LOADED, 
      params : params,
      payload: payload
    }
    this.emitPendingSearchEvent();
  }
  
  emitPendingSearchEvent() {
    this.emit(this.events.PENDING_MARK_SEARCH_UPDATE, this.data.pendingSearch);
  }

  setApprovedByPageLoading(pageId, request) {
    this.data.approvedPageRequestState[pageId] = {state: this.STATE.LOADING, request};
    this.emitApprovedByPageEvent(pageId);
  }

  setApprovedByPageError(pageId, error) {
    this.data.approvedPageRequestState[pageId] = {state: this.STATE.ERROR, error};
    this.emitApprovedByPageEvent(pageId);
  }

  setApprovedByPageLoaded(pageId, marks) {
    this.data.approvedPageRequestState[pageId] = {state: this.STATE.LOADED, marks};

    marks.forEach((mark) => {
      this.setMark({
        state: this.STATE.LOADED,
        id: mark.markId,
        pageId: mark.pageId,
        approved : true,
        payload : mark
      })
    });

    this.emitApprovedByPageEvent(pageId);
  }

  emitApprovedByPageEvent(pageId) {
    this.emit(this.events.MARKS_APPROVED, this.data.approvedPageRequestState[pageId]);
  }

  setApprovingMarkLoading(markId, pageId, mark, request) {
    this.setMark({
      state : this.STATE.SAVING,
      markId, pageId, request,
      approved : true,
      payload : mark
    });
  }

  setApprovingMarkError(markId, pageId, mark, error) {
    this.setMark({
      state : this.STATE.SAVE_ERROR,
      error, markId, pageId,
      approved : false, 
      payload : mark 
    });
  }

  setApprovingMarkLoaded(markId, pageId, mark) {
    this.setMark({
      state : this.STATE.LOADED,
      markId, pageId,
      approved : true, 
      payload : mark 
    });
  }

  setPendingMarkLoaded(pageId, markId, mark) {
    this.setMark({
      state : mark ? this.STATE.LOADED : this.STATE.DELETED,
      markId, pageId,
      approved: false,
      payload : mark
    });
  }

  /**
   * Should already be structured
   * 
   * @param {object} mark - mark data
   * @param {string} mark.state - mark state
   * @param {string} mark.id - mark id
   * @param {string} mark.pageId - page id
   * @param {boolean} mark.approved - is mark approved
   * @param {object} mark.payload - actual mark data
   * @param {object} mark.error - error object
   */
  setMark(mark) {
    if( !mark.state ) {
      throw new Error('Mark must already have state set');
    }

    if( !mark.id ) mark.id = mark.markId;
    if( !mark.markId ) mark.markId = mark.id;

    // check that this isn't a delete pending mark event after
    // a user has approved a mark
    if( this.data.byId[mark.id] && 
      this.data.byId[mark.id].approved && !mark.approved ) {
      return; 
    }

    // check that something actually changed...
    if( this.data.byId[mark.id] && 
        this.data.byId[mark.id].state === mark.state &&
        deepEqual(this.data.byId[mark.id], mark) ) {
      return; // no change, skip event
    }

    this.data.byId[mark.id] = mark;
    this.emitMarkUpdateEvent(mark.id);
  }

  setMarkLoading(markId, pageId, approved) {
    this.setMark({
      state : this.STATE.LOADING,
      markId, pageId, approved
    });
  }

  setMarkDeleted(markId, pageId, approved = false) {
    this.setMark({
      state : this.STATE.DELETED,
      approved: approved || this.data.byId[markId].approved,
      pageId : pageId || this.data.byId[markId].pageId,
      markId
    });
  }

  setMarkError(markId, pageId, approved, error) {
    this.setMark({
      state : this.STATE.ERROR,
      markId, pageId, approved, error
    });
  }

  emitMarkUpdateEvent(markId) {
    this.emit(this.events.MARKS_UPDATE, this.data.byId[markId]);
  }

  getMark(markId) {
    return this.data.byId[markId];
  }

}

module.exports = new MarksStore();