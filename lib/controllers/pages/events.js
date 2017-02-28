var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('get-catalog-pages', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });
}