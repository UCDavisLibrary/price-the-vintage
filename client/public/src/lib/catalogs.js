var BaseModel = require('@ucd-lib/cork-app-utils').BaseModel;
var CatalogsService = require('../services/CatalogsService');
var CatalogsStore = require('../stores/CatalogsStore');

/**
 * module for handling catalog state
 */
class CatalogsModel extends BaseModel {

  constructor() {
    super();
    this.store = CatalogsStore;
    this.service = CatalogsService;
    this.register('CatalogsModel');
  }

  /**
   * @method search
   * @description Search the current catalogs.
   * 
   * @param {Object} query query parameters
   * @param {String} query.q text search value
   * @param {Number} query.offset result offset 
   * @param {Number} query.limit result limit 
   * 
   * @returns {Object} current search result state
   */
  async search(query) {
    await this.service.search(query);
    return this.store.data.search;
  }

  /**
   * @method get
   * @description Get a specific catalog by id
   * 
   * @param {String} id catalog id 
   * 
   * @returns {Object} current catalog state
   */
  async get(id) {
    let catalog = await this.service.get(id);

    // if there is already a request pending, just wait on it
    if( catalog.state === this.store.STATE.LOADING ) {
      await catalog.request;
    }

    return this.store.data.byId[id];
  }

  /**
   * @method clear
   * @description clear the store
   */
  clear() {
    this.store.clear();
  }
}


module.exports = new CatalogsModel();