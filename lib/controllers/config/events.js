var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('get-api-host', (e) => {
    var resp = controller.getApiHost();
    if( e && e.handler ) e.handler(resp);
  });
}