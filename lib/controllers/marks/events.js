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

  eventBus.on('vote-catalog-page-mark', (e) => {
    var resp = controller.vote(e.pageId, e.markId, e.vote);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('delete-catalog-page-mark', (e) => {
    var resp = controller.remove(e.pageId, e.markId);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('select-catalog-page', (e) => {
    var resp = controller.select(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('get-selected-catalog-page', (e) => {
    var resp = controller.getSelected();
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('update-temp-catalog-page-mark', (e) => {
    controller.updateTempMark(e.pageId, e.xy);
  });

  eventBus.on('remove-temp-catalog-page-mark', (e) => {
    controller.removeTempMark(e.handler);
  });

}