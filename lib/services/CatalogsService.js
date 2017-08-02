var request = require('superagent');
var utils = require('./utils');
var BaseService = require('cork-app-utils').BaseService;
var CatalogsStore = require('../stores/CatalogsStore');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

var SELECT = ['pages','catalog_id','pages_finished','title','publisher','completed','media_id'];

class CatalogsService extends BaseService {

  constructor() {
    super();
    this.store = CatalogsStore;
  }

  /**
   * Search the catalogs
   * 
   * @param {Object} query - query parameters
   * @param {boolean} [query.exact] - exact query match?
   * @param {string} [query.q] - text search value
   * @param {function} callback - service response handler
   */
  search(query = {}) {
    this.store.setSearchState('loading');

    return new Promise((resolve, reject) => {
      var params = {
        select : SELECT.join(','),
        offset : query.offset || 0,
        limit : query.limit || 12
      };

      if( query.q ) {
        params.q = query.q.trim()

        utils.escapeTSVector(params.q)
              .then((resp) => {
                var escaped = resp.body;
                params.q = escaped ? escaped[0].phrase : params.q;
                params.q = `@@.${params.q}`;
                this._search(params, resolve, reject);
              })
              .catch(reject);
      } else {
        this._search(params, resolve, reject);
      }
    });
  }

  _search(params, resolve, reject) {
    this.call({
      resolve,
      reject,
      request : request
                  .get(`${getHost()}/catalogs`)
                  .query(params)
                  .set('Prefer', 'count=exact'),
      onError   : this.store.setSearchError,
      onSuccess : this.store.setSearchData,
      onSuccessMiddleware : (resp) => {
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
   */
  get(id) {
    if( !id ) {
      return console.warn('Ignoring blank get catalog request');
    }

    this.store.setState(id, 'loading');

    return this.call({
      request : request
                  .get(`${getHost()}/catalogs?catalog_id=eq.${id}`)
                  .query({select: SELECT.join(',')}),
      onError   : this.store.setError,
      onSuccess : (body, params) => {
        this.store.setData(id, body); 
      },
      onSuccessMiddleware : (resp) => {
        return resp.body[0];
      }
    });
  }

}

module.exports = new CatalogsService();