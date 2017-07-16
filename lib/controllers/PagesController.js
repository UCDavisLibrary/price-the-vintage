var EventController = require('cork-app-utils').EventController;
var model = require('../models/PagesModel');

class PagesController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      getPages : 'get-catalog-pages',
      get : 'get-page',
      search : 'search-catalog-pages',
      getMetadata : 'get-page-metadata',
      select : 'select-catalog-page',
      getSelected : 'get-selected-catalog-page'
    }

    this.bind();
  }

  /**
   * Event: get-catalog-pages
   * Get all pages for catalog
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - catalog id
   */
  getPages(e) {
    return model.getPages(e.id);
  }

  /**
   * Event: get-page
   * Get page data
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   */
  get(e) {
    return model.get(e.id);
  }

  /**
   * Event: search-catalog-pages
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.query - search parameters
   */
  search(e) {
    debugger;
    return model.search(e.query);
  }

  /**
   * Event: get-page-metadata
   * Get metadata for page.  Currently this is just a total number of marks count.
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - page id
   */
  getMetadata(e) {
    return model.getMetadata(e.id);
  }

  select(e) {
    return model.select(e.id);
  }

  getSelected() {
    return model.getSelected();
  }
}

module.exports = new PagesController();