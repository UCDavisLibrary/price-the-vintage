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
    try {
      await this.service.search(query);
    } catch(e) {}

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
    let catalog = this.store.data.byId[id];

    // if there is already a request pending, just wait on it
    if( catalog && catalog.state === this.store.STATE.LOADING ) {
      await catalog.request;
    } else {
      await this.service.get(id);
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

  /**
   * @method getPageId
   * @description get a page id by catalogId and page index in catalog
   * 
   * @param {String} catalogId
   * @param {Number} index
   */
  async getPageId(catalogId, index) {
    index = parseInt(index);
    let catalog = (await this.get(catalogId)).payload;
    return catalog.pages[index]['@id'];
  }
}


module.exports = new CatalogsModel();