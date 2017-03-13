var eventBus = require('../../eventBus');

/**
 * Wire up event bus to appState controller
 */
module.exports = function(controller) {

  /**
   * Event: update-app-state
   * 
   * @param {Object} e - event bus event
   * @param {string} e.state - update state object
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('update-app-state', (e) => {
    var resp = controller.set(e.state);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-app-state
   * 
   * @param {Object} e - event bus event
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-app-state', (e) => {
    var resp = controller.get();
    if( e && e.handler ) e.handler(resp);
  });
}