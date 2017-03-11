var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('get-catalog-pages', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('get-page-metadata', (e) => {
    var resp = controller.getMetadata(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('select-catalog', (e) => {
    var resp = controller.select(e.id);
    if( e && e.handler ) e.handler(resp);
  });
}