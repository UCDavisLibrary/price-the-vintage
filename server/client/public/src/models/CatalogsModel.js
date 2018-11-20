const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {ItemsModel} = require('@ucd-lib/crowd-source-js');

/**
 * module for handling catalog state
 */
class CatalogsModel extends BaseModel {

  constructor() {
    super();
    this.register('CatalogsModel');
  }

  /**
   * @method search
   * @description Search the current catalogs.
   * 
   * @param {Object} query query parameters
   * @param {String} query.text text search value
   * @param {Number} query.offset result offset 
   * @param {Number} query.limit result limit 
   * 
   * @returns {Object} current search result state
   */
  search(query={}) {
    query.id = 'catalogs';
    query.filters = {
      'isPartOf.@id' : {
        type : 'keyword',
        op : 'or',
        value : [APP_CONFIG.damsApi.catalogs.collection]
      }
    }
    if( query.text ) {
      query.textFields = APP_CONFIG.damsApi.textFields
    }

    return ItemsModel.search(query);
  }

  /**
   * @method get
   * @description Get a specific catalog by id
   * 
   * @param {String} id catalog id 
   * @param {Boolean} noCache ignore cache, defaults to false
   * 
   * @returns {Object} current catalog state
   */
  get(id, noCache) {
    return ItemsModel.get(
      id, 
      noCache, 
      // set catalog pages reference via transform function
      catalog => {
        let imageList = (catalog.associatedMedia || [])
            .find(am => am.encodingFormat === 'ImageList') || {};

        catalog.pages = (imageList.hasPart || [])
          .map(page => {
            page.position = parseInt(page.position)
            return page;
          })
          .sort((a, b) => {
            if( a.position < b.position ) return -1;
            if( a.position > b.position ) return 1;
            return 0;
          }); 
        return catalog;
      }     
    );
  }

  /**
   * @method getCrowdPageStats
   * @description get summary crowd information for pages in catalog.  info includes:
   * editable, complete, etc.
   * 
   * @param {String} id catalog id
   * 
   * @returns {Promise}
   */
  getCrowdPageStats(id) {
    return ItemsModel.getCrowdChildStats(id);
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