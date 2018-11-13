const BaseService = require('@ucd-lib/cork-app-utils').BaseService;
const CatalogsStore = require('../stores/CatalogsStore');

class CatalogsService extends BaseService {

  constructor() {
    super();
    this.store = CatalogsStore;
  }

  /**
   * @method search
   * @description Search the catalogs
   * 
   * @param {Object} query query parameters
   * @param {String} query.q text search value
   * @param {Number} query.offset result offset 
   * @param {Number} query.limit result limit 
   * 
   * @returns {Promise}
   */
  async search(query = {}) {
    var params = {
      facets : {},
      filters : {
        'isPartOf.@id' : {
          type : 'keyword',
          op : 'or',
          value : [APP_CONFIG.damsApi.catalogs.collection]
        }
      },
      offset : query.offset || 0,
      limit : query.limit || 12
    };

    if( query.q ) {
      params.text = query.q.trim();
      params.textFields = APP_CONFIG.damsApi.textFields
    }

    this.store.setSearchLoading(params, query.q);

    return this.request({
      url : `${APP_CONFIG.damsApi.host}/api/records/search`,
      body : JSON.stringify(params),
      json : true,
      fetchOptions : {
        method : 'POST',
        credentials : 'omit',
        body : params
      },
      onLoading : request =>  this.store.setSearchLoading(request, params),
      onError : e => this.store.setSearchError(e),
      onLoad : response => this.store.setSearchLoaded(params, response.body)
    });
  }

  /**
   * @method get
   * @description Get a catalog
   * 
   * @param {string} id - catalog id
   * 
   * @returns {Promise}
   */
  get(id) {
    if( !id ) {
      return console.warn('Ignoring blank get catalog request');
    }

    return this.request({
      url : `${APP_CONFIG.damsApi.host}/api/records${id}`,
      fetchOptions : {
        credentials : 'omit'
      },
      checkCached : () => this.store.data.byId[id],
      onLoading : request => this.store.setCatalogLoading(id, request),
      onError : e => this.store.setCatalogError(id, e),
      onLoad : response => {
        // set pages
        let catalog = response.body;
        let imageList = (catalog.associatedMedia || []).find(am => am.encodingFormat === 'ImageList') || {};
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

        this.store.setCatalogLoaded(id, response.body)
      }
    });
  }

}

module.exports = new CatalogsService();7