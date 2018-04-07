var BaseModel = require('cork-app-utils').BaseModel;
var firebase = require('../firebase')();
var PagesStore = require('../stores/PagesStore');
var PagesService = require('../services/PagesService');

class PagesModel extends BaseModel {

  constructor() {
    super();

    this.store = PagesStore;
    this.service = PagesService;
  
    this.log = false;
    this.refs = {};

    this.registerIOC('PagesModel');
  }

  /**
   * Search the catalog pages.
   * @param {object} query - search parameters for service
   * @returns {object} - current search result state
   */
  search(query) {
    // API call handled by redux middleware
    this.service.search(query);
    return this.store.data.search;
  }
  
  /**
   * Get a catalog page by id.  Loads if necessary.
   * 
   * @param {string} pageId - page Id
   */
  get(pageId) {
    return this.service.get(pageId);
  }

  /**
   * Get a catalog by id.  Loads if necessary.
   * 
   * @param {string} catalogId - catalog Id
   */
  getPages(catalogId) {
    return this.service.getPages(catalogId);
  }

}

module.exports = new PagesModel();