var BaseStore = require('cork-app-utils').BaseStore;

class MarksStore extends BaseStore {

  constructor() {
    super();

    this.PENDING_SEARCH_UPDATE_EVENT = 'pending-mark-search-update';
    this.APPROVE_PAGE_MARK_UPDATE_EVENT = 'approved-catalog-page-marks-update';
    this.MARK_UPDATE_EVENT = 'catalog-page-marks-update';

    this.data = {
      // admin search state
      // marks here will not be kept in byId
      pendingSearch : {
        state : this.STATE.INIT
      },
      // will store ALL marks here, they should look like:
      // {
      //   id : [Mark Id]
      //   pageId : [Page Id],
      //   approved : boolean,
      //   data : Object 
      // }
      byId : {},
      // we ask for approved marks by page from pg, they will be 
      // store in byId above, but this object will store the state
      // of the request for loading widgets
      approvedPageRequestState : {}
    };
  }

  setPendingSearchLoading(params) {
    this.data.pendingSearch = {state: this.STATE.LOADING, params};
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
    this.emit(this.PENDING_SEARCH_UPDATE_EVENT, this.data.pendingSearch);
  }

  setApprovedByPageLoading(pageId) {
    this.data.approvedPageRequestState[pageId] = {state: this.STATE.LOADING};
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
        data : mark
      })
    });

    this.emitApprovedByPageEvent(pageId);
  }

  emitApprovedByPageEvent(pageId) {
    this.emit(this.APPROVE_PAGE_MARK_UPDATE_EVENT, this.data.approvedPageRequestState[pageId]);
  }

  /**
   * Should already be structured
   * 
   * @param {object} mark - mark data
   * @param {string} mark.state - mark state
   * @param {string} mark.id - mark id
   * @param {string} mark.pageId - page id
   * @param {boolean} mark.approved - is mark approved
   * @param {object} mark.data - actual mark data
   * @param {object} mark.error - actual mark data
   */
  setMark(mark) {
    if( !mark.state ) {
      return console.error(new Error('Mark must already have state set'));
    }

    if( !mark.id ) mark.id = mark.markId;
    if( !mark.markId ) mark.markId = mark.id;

    var newData = {
      [mark.id] : mark
    };

    this.data.byId = Object.assign({}, this.data.byId, newData);
    this.emitMarkUpdateEvent(mark.id);
  }

  setMarkLoading(markId, pageId, approved) {
    this.setMark({
      state : this.STATE.LOADING,
      markId, pageId, approved
    });
  }

  setMarkError(markId, pageId, approved, error) {
    this.setMark({
      state : this.STATE.ERROR,
      markId, pageId, approved, error
    });
  }

  emitMarkUpdateEvent(markId) {
    this.emit(this.MARK_UPDATE_EVENT, this.data.byId[markId]);
  }

}

module.exports = new MarksStore();