var EventController = require('./EventController');
var model = require('../models/MarksModel');


class MarksController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      get : 'get-catalog-page-marks',
      getMark : 'get-catalog-page-mark',
      listenToMark : 'listen-to-mark',
      set : 'add-catalog-page-mark',
      edit : 'edit-catalog-page-mark',
      vote : 'vote-catalog-page-mark',
      remove : 'delete-catalog-page-mark',
      select : 'select-catalog-page',
      getSelected : 'get-selected-catalog-page',
      updateTempMark : 'update-temp-catalog-page-mark',
      removeTempMark : 'remove-temp-catalog-page-mark'
    }

    this.triggerEvents = {
      markUpdate : 'catalog-page-marks-update',
      approvedMark : 'approved-catalog-page-marks-update',
      // TODO: is this event a bug?
      selectedMark : 'selected-catalog-page-update',
      pendingSearch : 'pending-mark-search-update'
    }

    this.bind();
  }

  markUpdateObserver(state) {
    this.emit(this.triggerEvents.markUpdate, state);
  }

  approvedMarkObserver(state) {
    this.emit(this.triggerEvents.approvedMark, state);
  }

  selectedMarkObserver(state) {
    this.emit(this.triggerEvents.selectedMark, state);
  }

  pendingSearchObserver(state) {
    this.emit(this.triggerEvents.pendingSearch, state);
  }

  /**
   * Event: get-catalog-page-marks
   * Get all marks for a page.  This will setup a FB listener if needed
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   */
  get(e) {
    return model.get(e.id);
  }

  /**
   * Event: get-catalog-page-mark
   * Get a single mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   */
  getMark(e) {
    return model.getMark(e.pageId, e.markId);
  }

  /**
   * Event: listen-to-mark
   * Listen to a single mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {function} [e.handler] - function response handler
   */
  listenToMark(e) {
    return model.listenToMark(e.pageId, e.markId);
  }

  /**
   * Event: add-catalog-page-mark
   * Add a mark to a page.  Calls controller.set w/o MarkId
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.mark - new mark
   */
  set(e) {
    return model.set(e.pageId, e.mark);
  }

  /**
   * Event: add-catalog-page-mark
   * Update a mark on a page.
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {string} e.mark - mark data
   */
  edit(e) {
    return model.set(e.pageId, e.markId, e.mark);
  }

  /**
   * Event: vote-catalog-page-mark
   * Vote on a page mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {string} e.vote - vote type.  Should be 'up' or 'down'
   */
  vote(e) {
    return model.vote(e.pageId, e.markId, e.vote);
  }

  /**
   * Event: delete-catalog-page-mark
   * delete a page mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   */
  remove(e) {
    return model.remove(e.pageId, e.markId);
  }

  /**
   * Event: select-catalog-page
   * select a page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id to select
   */
  select(e) {
    return model.select(e.id);
  }

  /**
   * Event: get-selected-catalog-page
   * select a page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id to select
   */
  getSelected(e) {
    return model.getSelected();
  }

  /**
   * Event: update-temp-catalog-page-mark
   * set or update a users tmp mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id for the tmp mark
   * @param {Array} e.xy - x,y points for tmp mark
   */
  updateTempMark(e) {
    return model.updateTempMark(e.pageId, e.xy);
  }

  /**
   * Event: remove-temp-catalog-page-mark
   * remove users tmp mark
   */
  removeTempMark() {
    return model.removeTempMark();
  }

}

module.exports = new MarksController();