var EventController = require('./EventController');
var model = require('../models/PagesModel');

class PagesController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      getPages : 'get-catalog-pages',
      get : 'get-page',
      search : 'search-catalog-pages',
      getMetadata : 'get-page-metadata'
    }

    this.triggerEvents = {
      pagesUpdate : 'catalog-pages-update',
      pageUpdate : 'catalog-page-update',
      metadataUpdate : 'page-metadata-update',
      search : 'search-catalog-pages-update'
    }

    this.bind();
  }

  pagesUpdateObserver(state) {
    this.emit(this.triggerEvents.pagesUpdate, state);
  }

  pagesUpdateObserver(state) {
    this.emit(this.triggerEvents.pageUpdate, state);
  }
  
  metadataUpdateObserver(state) {
    this.emit(this.triggerEvents.metadataUpdate, state);
  }

  searchObserver(state) {
    this.emit(this.triggerEvents.search, state);
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
}

module.exports = new PagesController();