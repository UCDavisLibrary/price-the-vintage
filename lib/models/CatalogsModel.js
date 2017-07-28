var BaseModel = require('cork-app-utils').BaseModel;
var CatalogsService = require('../services/CatalogsService');
var CatalogsStore = require('../stores/CatalogsStore');

/**
 * Controller for handling catalog state
 */
class CatalogsModel extends BaseModel {

  constructor() {
    super();
    this.store = CatalogsStore;
    this.service = CatalogsService;
    this.bindMethods('CatalogsModel');
  }

  /**
   * Search the current catalogs.
   * @param {object} query - search parameters for service
   * @returns {object} - current search result state
   */
  search(query) {
    this.service.search(query);
    return this.store.data.search;
  }

  /**
   * Get a specific catalog by id
   * @param {string} id 
   * @returns {object} - current catalog state
   */
  get(id) {
    this.service.get(id);
    return this.store.data.byId[id] || {};
  }

  /**
   * Clear the Redux store
   */
  clear() {
    this.store.clear();
  }
}


module.exports = new CatalogsModel();