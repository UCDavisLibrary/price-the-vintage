var request = require('superagent');
var utils = require('./utils');
var BaseService = require('cork-app-utils').BaseService;
var PagesStore = require('../stores/PagesStore');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

var SELECT_PARAMS = ['page_id','page','catalog_id',
'media_id','editable','marks', 'completed'];

class PagesService extends BaseService {

  constructor() {
    super();
    this.store = PagesStore;
  }

  /**
   * Search catalog pages
   * 
   * @param {Object} query - query parameters
   * @param {string} [query.q] - text search value
   * @param {string} [query.catalogId] - catalog to search
   * @param {function} callback - service response handler
   */
  search(query = {}) {
    var q = (query.q || '').trim();

    var params = {
      catalog_id : `eq.${query.catalogId}`
    };

    this.store.setSearchLoading(params);

    return new Promise((resolve, reject) => {
      if( q ) {
        utils.escapeTSVector(q)
              .then((resp) => {
                var escaped = resp.body;
                params.q = escaped ? escaped[0].phrase : q;
                params.q = `@@.${params.q}`;
                this._search(params, resolve, reject);
              })
              .catch((e) => {
                this.store.setSearchError(e, params);
                reject(e);
              });
      } else {
        this._search(params, resolve, reject);
      }
    });
  }

  _search(params, resolve, reject) {
    this.call({
      request : this.request
                  .get(`${getHost()}/pages`)
                  .query(params)
                  .set('Prefer', 'count=exact'),
      onSuccess : this.store.setSearch,
      onSuccessMiddleware : (resp) => {
        var result = {
          results : resp.body
        }

        setResultInfo(resp.headers['content-range'], result);
        return result;
      },
      onError : this.store.setSearchError,
      params, resolve, reject
    })
  }

  /**
   * Get the catalog page
   *
   * @param {string} pageId - page id to get
   * @param {function} callback - service response handler
   */
  get(pageId) {
    this.store.setPageLoading(pageId);

    var query = {
      select : SELECT_PARAMS.join(','),
      page_id : `eq.${pageId}`
    };

    return this.call({
      request : this.request
                  .get(`${getHost()}/pages`)
                  .query(query),
      onSuccess : (body) => {
        if( body.length === 0 ) this.store.setPageError(pageId, {error: true, message: 'Invalid page id'});
        else this.store.setPage(body[0]);
      },
      onError : (error) => {
        this.store.setPageError(pageId, error);
      }
    });
  }

  /**
   * Get the catalog pages
   *
   * @param {string} catalogId - catalog id to get pages for
   */
  getPages(catalogId) {
    this.store.setPagesLoading(catalogId);

    var query = {
      select : SELECT_PARAMS.join(','),
      catalog_id : `eq.${catalogId}`,
      order : 'page'
    };

    return this.call({
      request : this.request
                    .get(`${getHost()}/pages`)
                    .query(query),
      onSuccess : (body) => {
        this.store.setPages(catalogId, body);
      },
      onError : (error) => {
        this.store.setPagesError(catalogId, error);
      }
    })
  }

  /**
   * Admin call to toggle a pages editable status
   * 
   * @param {string} pageId - page id to toggle
   * @param {boolean} ignore - should page be ignored
   * @param {string} jwt - user token
   */
  ignore(pageId, ignore, jwt) {
    
    var query = {
      page_id : `eq.${pageId}`
    };

    return this.request
              .patch(`${getHost()}/pages`)
              .query(query)
              .send({editable: !ignore})
              .set('Prefer','return=representation')
              .set('Authorization', `Bearer ${jwt}`);
  }

  /**
   * Admin call to toggle a pages completed status
   * 
   * @param {string} pageId - page id to toggle
   * @param {boolean} completed - is the page completed
   * @param {string} jwt - user token
   */
  completed(pageId, completed, jwt) {
    var query = {
      page_id : `eq.${pageId}`
    };

    return request
      .patch(`${getHost()}/pages`)
      .query(query)
      .send({completed: completed})
      .set('Prefer','return=representation')
      .set('Authorization', `Bearer ${jwt}`);
  }

}

module.exports = new PagesService();