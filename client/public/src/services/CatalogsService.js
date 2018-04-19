
const utils = require('./utils');
const BaseService = require('@ucd-lib/cork-app-utils').BaseService;
const CatalogsStore = require('../stores/CatalogsStore');
const config = require('../config');

const API_HOST = config.apiHost;

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
      select : config.catalogs.searchSelectAttributes.join(','),
      offset : query.offset || 0,
      limit : query.limit || 12
    };

    this.store.setSearchLoading(params, query.q);

    if( query.q ) {
      params.q = query.q.trim()
      params.q = await utils.escapeTSVector(params.q);
    }

    return this.request({
      url : `${API_HOST}/catalogs`,
      qs : params,
      fetchOptions : {
        headers : {
          Prefer : 'count=exact'
        }
      },
      onError : e => this.store.setSearchError(e),
      onLoad : result => {
        let response = result.response;
        result = {results : result.body};
        utils.setResultInfo(response.headers.get('content-range'), result);
        this.store.setSearchLoaded(result);
      }
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
      url : `${API_HOST}/catalogs`,
      qs : {
        catalog_id : `eq.${id}`,
        select: config.catalogs.searchSelectAttributes.join(',')
      },
      checkCached : () => this.store.data.byId[id],
      onLoading : request => this.store.setCatalogLoading(id, request),
      onError : e => this.store.setCatalogError(id, e),
      onLoad : result => this.store.setCatalogLoaded(id, result.body[0])
    });
  }

}

module.exports = new CatalogsService();7