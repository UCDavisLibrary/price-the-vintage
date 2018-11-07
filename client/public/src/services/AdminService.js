var request = require('superagent');
var utils = require('./utils');
var BaseService = require('@ucd-lib/cork-app-utils').BaseService;
var AdminStore = require('../stores/AdminStore');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;


class AdminService extends BaseService {

  constructor() {
    super();
    this.store = AdminStore;
  }


  search(params = {}) {
    this.store.setSearchLoading(params);

    params.order = 'mark_count.desc';

    /*
      var params = {
        select : SELECT.join(','),
        offset : query.offset || 0,
        limit : query.limit || 12
      };
    */

    return this.call({
      request : this.request
                  .get(`${getHost()}/pending_marks_by_page`)
                  .query(params)
                  .set('Prefer', 'count=exact'),
       onSuccess : (resp) => {
        var result = {
          results : resp.body
        }

        setResultInfo(resp.headers['content-range'], result);
        this.store.setSearch(result, params);
      },
      onError : this.store.setSearchError,
      params
    })
  }

}

module.exports = new AdminService();