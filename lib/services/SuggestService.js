var request = require('cork-app-utils').request;
var BaseService = require('cork-app-utils').BaseService;
var SuggestStore = require('../stores/SuggestStore');
var ConfigStore = require('../stores/ConfigStore')

class CatalogsService extends BaseService {

  constructor() {
    super();
    this.apiHost = ConfigStore.data.suggestApiHost;
    this.store = SuggestStore;
  }

  /**
   * Suggest wine name
   * 
   * @param {Object} query - query parameters
   */
  wineName(query = '') {
    this.store.setWineName({state: 'loading'});

    var body = {suggest: {}};
    body.suggest['name-suggest'] = {
      prefix : query,
      completion : {
        field : 'name-suggest',
        fuzzy : {}
      }
    }

    return this.call({
      request : request.post(`${this.apiHost}/search`).send(body),
      onSuccess : (body) => {
        this.store.setWineName({
          state : this.store.STATE.LOADED,
          payload : body,
          query : query
        })
      },
      onError : (error) => {
        this.store.setWineName({
          state : this.store.STATE.ERROR,
          error : error,
          query : query
        });
      }
    });
  }


}

module.exports = new CatalogsService();