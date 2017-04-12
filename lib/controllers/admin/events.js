var eventBus = require('../../eventBus');

/**
 * Wire up event bus to auth controller
 */
module.exports = function(controller) {

  eventBus.on('pending-mark-search', (e) => {
    var resp = controller.pendingMarkSearch(e.params);
    if( e.handler ) e.handler(resp);
  });

  eventBus.on('admin-approve-mark', (e) => {
     controller.approveMark(e.pageId, e.markId, e.mark, e.handler);
  });

  eventBus.on('admin-ignore-page', (e) => {
     controller.ignorePage(e.pageId, e.ignore, e.handler);
  });

  eventBus.on('admin-completed-page', (e) => {
     controller.pageCompleted(e.pageId, e.completed, e.handler);
  });

  eventBus.on('admin-clean-test-marks', (e) => {
    controller.clearTestMarks(e.handler);
  });

};