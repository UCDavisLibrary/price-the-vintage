var request = require('superagent');
var utils = require('./utils');
var BaseService = require('cork-app-utils').BaseService;
var CatalogsStore = require('../stores/CatalogsStore');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

var SELECT = ['pages','catalog_id','pages_finished','title','publisher','completed','media_id'];

class CatalogsService extends BaseService {

  /**
   * Search the catalogs
   * 
   * @param {Object} query - query parameters
   * @param {boolean} [query.exact] - exact query match?
   * @param {string} [query.q] - text search value
   * @param {function} callback - service response handler
   */
  search(query = {}) {
    return new Promise((resolve, reject) => {
      var params = {
        select : SELECT.join(','),
        offset : query.offset || 0,
        limit : query.limit || 12
      };

      if( query.q ) {
        params.q = query.q.trim()

        utils.escapeTSVector(params.q, (escaped) => {
          params.q = escaped ? escaped[0].phrase : params.q;
          params.q = `@@.${params.q}`;
          _search(params, resolve, reject);
        });

      } else {
        _search(params, resolve, reject);
      }
    });
  }

  _search(params, resolve, reject) {
    CatalogsStore.setSearchState('loading');

    this.call({
      resolve,
      reject,
      request : request
                  .get(`${getHost()}/catalogs`)
                  .query(params)
                  .set('Prefer', 'count=exact'),
      store     : CatalogsStore,
      onError   : CatalogsStore.setSearchError,
      onSuccess : CatalogsStore.setSearchState,
      onSuccessMiddleware : (body) => {
        var result = {results : resp.body};
        setResultInfo(resp.headers['content-range'], result);
        return result;
      }
    });
  }

  /**
   * Get a catalog
   * 
   * @param {string} id - catalog to grab
   * @param {function} callback - service response handler
   */
  get(id) {
    return new Promise((resolve, reject) => {
      CatalogsStore.setState(id, 'loading');

      this.call({
        resolve,
        reject,
        request : request
                    .get(`${getHost()}/catalogs?catalog_id=eq.${id}`)
                    .query({select: SELECT.join(',')}),
        store     : CatalogsStore,
        onError   : CatalogsStore.setError,
        onSuccess : CatalogsStore.setData,
        onSuccessMiddleware : (body) => {
          return resp.body[0];
        }
      });
    });
  }

}

module.exports = new CatalogsService();