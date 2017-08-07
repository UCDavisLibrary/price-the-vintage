var request = require('superagent');
var utils = require('./utils');
var BaseService = require('cork-app-utils').BaseService;
var AdminStore = require('../stores/AdminStore');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;


class AdminService extends BaseService {

  constructor() {
    super();
    this.store = AdminStore;
  }


  search(params) {
    this.store.setSearchLoading(params);

    /*
      var params = {
        select : SELECT.join(','),
        offset : query.offset || 0,
        limit : query.limit || 12
      };
    */

    return this.call({
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
      params
    })
  }

}

module.exports = new AdminService();