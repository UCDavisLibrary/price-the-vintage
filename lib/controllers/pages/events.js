var eventBus = require('../../eventBus');

module.exports = function(controller) {
  /**
   * Event: get-catalog-pages
   * Get all pages for catalog
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - catalog id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-catalog-pages', (e) => {
    var resp = controller.getPages(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: search-catalog-pages
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.query - search parameters
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('search-catalog-pages', (e) => {
    var resp = controller.search(e.query);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-page
   * Get page data
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-page', (e) => {
    var resp = controller.get(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: get-page-metadata
   * Get metadata for page.  Currently this is just a total number of marks count.
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('get-page-metadata', (e) => {
    var resp = controller.getMetadata(e.id);
    if( e && e.handler ) e.handler(resp);
  });

  /**
   * Event: select-catalog
   * Select a catalog
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - catalog id to select
   * @param {function} [e.handler] - function response handler
   */
  eventBus.on('select-catalog', (e) => {
    var resp = controller.select(e.id);
    if( e && e.handler ) e.handler(resp);
  });
}