const BaseService = require('@ucd-lib/cork-app-utils').BaseService;
const PagesStore = require('../stores/PagesStore');
const utils = require('./utils');
const config = require('../config');

const API_HOST = config.apiHost;

class PagesService extends BaseService {

  constructor() {
    super();
    this.store = PagesStore;
  }

  /**
   * @method search
   * @description Search catalog pages
   * 
   * @param {Object} query query parameters
   * @param {String} query.q text search value
   * @param {String} query.catalogId catalog to search
   * 
   * @returns {Promise}
   */
  async search(query = {}) {
    let q = (query.q || '').trim();

    let params = {
      select : config.pages.searchSelectAttributes.join(','),
      catalog_id : `eq.${query.catalogId}`
    };

    this.store.setSearchLoading(params, q);

    if( q ) {
      params.q = await utils.escapeTSVector(q);
    }

    return this.request({
      url : `${API_HOST}/pages`,
      qs : params,
      fetchOptions : {
        headers : {
          Prefer : 'count=exact'
        }
      },
      onError : e => this.store.setSearchError(e, params, q),
      onLoad : result => {
        let response = result.response;
        result = {results : result.body};
        utils.setResultInfo(response.headers.get('content-range'), result);
        this.store.setSearchLoaded(result, params, q);
      }
    });
  }


  /**
   * @method get
   * @description Get the catalog page
   *
   * @param {String} pageId page id
   * 
   * @returns {Promise}
   */
  get(pageId) {
    return this.request({
      url : `${API_HOST}/pages`,
      qs : {
        select : config.pages.searchSelectAttributes.join(','),
        page_id : `eq.${pageId}`
      },
      onLoading : request => this.store.setPageLoading(pageId, request),
      onError : e => this.store.setPageError(pageId, e),
      onLoad : result => {
        let body = result;
        if( body.length === 0 ) this.store.setPageError(pageId, {error: true, message: 'Invalid page id'});
        else this.store.setPageLoaded(pageId, result.body[0])
      }
    });
  }

  /**
   * @method getPages
   * @description Get the catalog pages
   *
   * @param {String} catalogId catalog id
   * 
   * @returns {Promise}
   */
  getPages(catalogId) {
    return this.request({
      url : `${API_HOST}/pages`,
      qs : {
        select : config.pages.searchSelectAttributes.join(','),
        catalog_id : `eq.${catalogId}`,
        order : 'page'
      },
      onLoading : request => this.store.setPagesLoading(pageId, request),
      onError : e => this.store.setPagesError(id, e),
      onLoad : result => this.store.setPagesLoaded(pageId, result.body[0])
    });
  }

  /**
   * @method ignore
   * @description Admin call to toggle a pages editable status
   * 
   * @param {String} pageId page id to toggle
   * @param {Boolean} ignore should page be ignored
   * @param {String} jwt user token
   * 
   * @return {Promise}
   */
  ignore(pageId, ignore, jwt) {
    return this.request({
      url : `${API_HOST}/pages`,
      qs : {page_id : `eq.${pageId}`},
      fetchOptions : {
        method : 'PATCH',
        body : JSON.stringify({editable: !ignore}),
        headers : {
          Prefer : 'return=representation',
          Authorization : `Bearer ${jwt}`
        }
      },
      onLoading : request => this.store.setPageSaving(pageId, request),
      onError : async e => this.store.setPageError(pageId, e),
      onLoad : result => this.store.setPageLoaded(pageId, result.body[0])
    });
  }

  /**
   * @method completed
   * @description Admin call to toggle a pages completed status
   * 
   * @param {String} pageId page id to toggle
   * @param {Boolean} completed is the page completed
   * @param {String} jwt user token
   * 
   * @returns {Promise}
   */
  completed(pageId, completed, jwt) {
    return this.request({
      url : `${API_HOST}/pages`,
      qs : {page_id : `eq.${pageId}`},
      fetchOptions : {
        method : 'PATCH',
        body : JSON.stringify({completed: completed}),
        headers : {
          Prefer : 'return=representation',
          Authorization : `Bearer ${jwt}`
        }
      },
      onLoading : request => this.store.setPageSaving(pageId, request),
      onError : e => this.store.setPageError(pageId, e),
      onLoad : result => this.store.setPageLoaded(pageId, result.body[0])
    });
  }

}

module.exports = new PagesService();