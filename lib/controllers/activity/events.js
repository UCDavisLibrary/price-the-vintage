var eventBus = require('../../eventBus');

/**
 * Wire up event bus to activity controller
 */
module.exports = function(controller) {

  /**
   * Event: set-user-activity
   * 
   * @param {Object} e - event bus event
   * @param {string} e.catalogId - activity catalogId
   * @param {string} e.pageId - activity pageId
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('set-user-activity', (e) => {
    let resp = controller.set(e.catalogId, e.pageId);
    if( e.handler ) e.handler(resp);
  });

  /**
   * Event: get-user-activity
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - resource id, either catalogId or pageId
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-user-activity', (e) => {
    let resp = controller.listen(e.id);
    if( e.handler ) e.handler(resp);
  });
}