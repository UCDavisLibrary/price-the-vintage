var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('update-app-state', (e) => {
    var resp = controller.set(e.state);
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('get-app-state', (e) => {
    var resp = controller.get();
    if( e && e.handler ) e.handler(resp);
  });
}