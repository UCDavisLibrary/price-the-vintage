var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('get-catalog-page-marks', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('add-catalog-page-mark', (e) => {
    var resp = controller.set(e.pageId, e.mark);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('edit-catalog-page-mark', (e) => {
    var resp = controller.set(e.pageId, e.markId, e.mark);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('select-catalog-page', (e) => {
    var resp = controller.select(e.id);
    if( e && e.handler ) e.handler(resp);
  });
}