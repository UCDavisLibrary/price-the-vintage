var eventBus = require('../../eventBus');

module.exports = function(controller) {

  /**
   * Event: get-api-host
   * Get the current host provided in config file.  Many elements need this
   * so they know where to retrieve images from.
   * 
   * @param {e} - event bus eventBus
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-api-host', (e) => {
    var resp = controller.getApiHost();
    if( e && e.handler ) e.handler(resp);
  });
}