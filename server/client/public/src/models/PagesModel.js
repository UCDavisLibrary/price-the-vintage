const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {ItemsModel} = require('@ucd-lib/crowd-source-js');

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
   * @param {String} query.text text search value
   * @param {String} query.catalogId catalog to search
   * 
   * @returns {Object} - current search result state
   */
  async search(query={}) {
    query.id = 'pages';
    query.allItems = true;
    query.filters = {
      // identifier : {
      //   type : 'keyword',
      //   op : 'or',
      //   value : [catalogId]
      // },
      parent: {
        type : 'keyword',
        op : 'or',
        value : [`${catalogId}/media/images`]
      }
    }
    if( query.text ) {
      query.textFields = APP_CONFIG.damsApi.textFields
    }

    return ItemsModel.search(query);
  }
  
  /**
   * @method get
   * @description Get a catalog page crowd data by id  
   * 
   * @param {String} pageId page Id
   * 
   * @returns {Promise}
   */
  getCrowdInfo(pageId) {
    return ItemsModel.getCrowdInfo(pageId)
  }

  /**
   * @method ignore
   * @description toggle the pages ignore flag
   * 
   * @param {String} pageId 
   * @param {Boolean} ignore
   * 
   * @returns {Promise}
   */
  async ignore(pageId, ignore) {
    return ItemsModel.updateCrowdInfo(pageId, {editable: !ignore});
  }

  /**
   * @method completed
   * @description toggle the pages ignore flag
   * 
   * @param {String} pageId 
   * @param {Boolean} completed
   * 
   * @returns {Promise}
   */
  async completed(pageId, completed) {
    return ItemsModel.updateCrowdInfo(pageId, {completed});
  }

}

module.exports = new PagesModel();