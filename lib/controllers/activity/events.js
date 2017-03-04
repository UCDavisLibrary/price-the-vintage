var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('set-user-activity', (e) => {
    let resp = controller.set(e.catalogId, e.pageId);
    if( e.handler ) e.handler(resp);
  });

  eventBus.on('get-user-activity', (e) => {
    let resp = controller.listen(e.id);
    if( e.handler ) e.handler(resp);
  });
}