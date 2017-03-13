var eventBus = require('../../eventBus');

/**
 * Wire up event bus to auth controller
 */
module.exports = function(controller) {

  /**
   * Event: search-catalogs
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.params - search parameters
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('search-catalogs', (e) => {
    var resp = controller.search(e.params);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-catalog
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.id - catalog id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-catalog', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });
}