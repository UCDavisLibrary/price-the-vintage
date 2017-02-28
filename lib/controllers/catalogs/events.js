var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('search-catalogs', (e) => {
    var resp = controller.search(e.params);
    if( e && e.handler ) e.handler(resp);
  });
}