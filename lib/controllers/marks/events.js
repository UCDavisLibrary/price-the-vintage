var eventBus = require('../../eventBus');

module.exports = function(controller) {

  /**
   * Event: get-catalog-page-marks
   * Get all marks for a page.  This will setup a FB listener if needed
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-catalog-page-marks', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-catalog-page-mark
   * Get a single mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-catalog-page-mark', (e) => {
    var resp = controller.getMark(e.pageId, e.markId, e.callback);
    if( e && e.handler ) e.handler(resp);
  });

  /*
   * Event: listen-to-mark
   * Listen to a single mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('listen-to-mark', (e) => {
    var resp = controller.listenToMark(e.pageId, e.markId);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: add-catalog-page-mark
   * Add a mark to a page.  Calls controller.set w/o MarkId
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.mark - new mark
   */
  eventBus.on('add-catalog-page-mark', (e) => {
    controller.set(e.pageId, e.mark);
  });

  /**
   * Event: add-catalog-page-mark
   * Update a mark on a page.
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {string} e.mark - mark data
   */
  eventBus.on('edit-catalog-page-mark', (e) => {
    controller.set(e.pageId, e.markId, e.mark);
  });

  /**
   * Event: vote-catalog-page-mark
   * Vote on a page mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   * @param {string} e.vote - vote type.  Should be 'up' or 'down'
   */
  eventBus.on('vote-catalog-page-mark', (e) => {
    controller.vote(e.pageId, e.markId, e.vote);
  });

  /**
   * Event: delete-catalog-page-mark
   * delete a page mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id
   * @param {string} e.markId - mark id
   */
  eventBus.on('delete-catalog-page-mark', (e) => {
    controller.remove(e.pageId, e.markId);
  });

  /**
   * Event: select-catalog-page
   * select a page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id to select
   */
  eventBus.on('select-catalog-page', (e) => {
    var resp = controller.select(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-selected-catalog-page
   * select a page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id to select
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-selected-catalog-page', (e) => {
    var resp = controller.getSelected();
    if( e && e.handler ) e.handler(resp);
  });


  /**
   * Event: update-temp-catalog-page-mark
   * set or update a users tmp mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id for the tmp mark
   * @param {Array} e.xy - x,y points for tmp mark
   */
  eventBus.on('update-temp-catalog-page-mark', (e) => {
    controller.updateTempMark(e.pageId, e.xy);
  });

  /**
   * Event: remove-temp-catalog-page-mark
   * remove users tmp mark
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.handler] - function response handler.  Called when mark 
   * has been successfully moved
   */
  eventBus.on('remove-temp-catalog-page-mark', (e) => {
    controller.removeTempMark(e.handler);
  });

}