var eventBus = require('../../eventBus');

/**
 * Wire up event bus to auth controller
 */
module.exports = function(controller) {

  /**
   * Event: pending-mark-search
   * 
   * @param {Object} e - event bus event
   * @param {object} e.params - postgrest search params
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('pending-mark-search', (e) => {
    var resp = controller.pendingMarkSearch(e.params);
    if( e.handler ) e.handler(resp);
  });

  /**
   * Event: admin-approve-mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {string} e.markId - mark id
   * @param {object} e.mark - mark data
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('admin-approve-mark', (e) => {
     controller.approveMark(e.pageId, e.markId, e.mark, e.handler);
  });

  /**
   * Event: admin-ignore-page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {boolean} e.ignore - set page as not editable
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('admin-ignore-page', (e) => {
     controller.ignorePage(e.pageId, e.ignore, e.handler);
  });

  /**
   * Event: admin-completed-page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {boolean} e.completed - set page as completed
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('admin-completed-page', (e) => {
     controller.pageCompleted(e.pageId, e.completed, e.handler);
  });

  /**
   * Event: admin-clean-test-marks
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('admin-clean-test-marks', (e) => {
    controller.clearTestMarks(e.handler);
  });

};