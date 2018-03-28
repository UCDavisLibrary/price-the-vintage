var request = require('cork-app-utils').request;
var BaseService = require('cork-app-utils').BaseService;
var SuggestStore = require('../stores/SuggestStore');
var ConfigStore = require('../stores/ConfigStore')

class SuggestService extends BaseService {

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
      onSuccess : (resp) => {
        this.store.setWineName({
          state : this.store.STATE.LOADED,
          payload : resp.body,
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

  // https://wine-api.library.ucdavis.edu/countries?select=country&country=ilike.bel*
  country(text) {
    var apiHost = ConfigStore.data.apiHost;

    var params = {
      select : 'country',
      country : `ilike.*${text}*`,
      limit : 10
    }

    this.store.setCountry({state: this.store.STATE.LOADING, text: text});

    return this.call({
      request : request.get(`${apiHost}/countries`).query(params),
      onSuccess : (resp) => {
        this.store.setCountry({
          state : this.store.STATE.LOADED,
          payload : resp.body.map((item) => item.country),
          text : text
        })
      },
      onError : (error) => {
        this.store.setCountry({
          state : this.store.STATE.ERROR,
          error : error,
          text : text
        });
      }
    });
  }


}

module.exports = new SuggestService();