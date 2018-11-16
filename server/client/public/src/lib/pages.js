var BaseModel = require('@ucd-lib/cork-app-utils').BaseModel;
var PagesStore = require('../stores/PagesStore');
var PagesService = require('../services/PagesService');

class PagesModel extends BaseModel {

  constructor() {
    super();

    this.store = PagesStore;
    this.service = PagesService;

    this.register('PagesModel');
  }

  /**
   * @method search
   * @description Search the catalog pages.
   * 
   * @param {String} query.q text search value
   * @param {String} query.catalogId catalog to search
   * 
   * @returns {Object} - current search result state
   */
  async search(query) {
    await this.service.search(query);
    return this.store.data.search;
  }
  
  /**
   * @method get
   * @description Get a catalog page by id.  
   * 
   * @param {String} pageId page Id
   * 
   * @returns {Promise}
   */
  async get(pageId) {
    let page = this.store.data.byId[pageId];
    if( page && (
          page.state === this.store.STATE.LOADING ||
          page.state === this.store.STATE.SAVING
        ) ) {
      await page.request;
      return page;
    }

    await this.service.getCrowdData(pageId);
    return this.store.data.byId[pageId];
  }

  /**
   * @method getPages
   * @description Get a catalog by id.  Loads if necessary.
   * 
   * @param {String} catalogId catalog Id
   * 
   * @returns {Promise}
   */
  async getPages(catalogId) {
    await this.service.getPagesCrowdData(catalogId);
    return this.store.data.byCatalogId[catalogId];
  }

  /**
   * @method ignore
   * @description toggle the pages ignore flag
   * 
   * @param {String} pageId 
   * @param {Boolean} ignore
   * @param {String} jwt users token
   * 
   * @returns {Promise}
   */
  async ignore(pageId, ignore, jwt) {
    await this.service.ignore(pageId, ignore, jwt);
    return this.store.data.byId[pageId];
  }

  /**
   * @method completed
   * @description toggle the pages ignore flag
   * 
   * @param {String} pageId 
   * @param {Boolean} completed
   * @param {String} jwt users token
   * 
   * @returns {Promise}
   */
  async completed(pageId, completed, jwt) {
    await this.service.completed(pageId, completed, jwt);
    return this.store.data.byId[pageId];
  }

}

module.exports = new PagesModel();