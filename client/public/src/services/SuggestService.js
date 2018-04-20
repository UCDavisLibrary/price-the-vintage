const BaseService = require('@ucd-lib/cork-app-utils').BaseService;
const SuggestStore = require('../stores/SuggestStore');
const config = require('../config');

const API_HOST = config.apiHost;

class SuggestService extends BaseService {

  constructor() {
    super();
    this.store = SuggestStore;
  }

  /**
   * @method wineName
   * @description Suggest wine name.  This hits against
   * the wine search, elasticsearch backend.
   * 
   * @param {Object} text - query parameters
   */
  wineName(text = '') {
    let query = {
      suggest : {
        'name-suggest' : {
          prefix : text,
          completion : {
            field : 'name-suggest',
            fuzzy : {}
          }
        }
      }
    }

    return this.request({
      url : `${config.suggestApiHost}/search`,
      json : true,
      fetchOptions : {
        method : 'POST',
        body : query
      },
      checkCached : () => this.store.data['wine-name'][text],
      onLoading : request => this.store.setWineNameLoading(text, query, request),
      onError : e => this.store.setWineNameError(text, query, e),
      onLoad : result => {
        result = (result.body.suggest['name-suggest'] || [{options:[]}])[0];
        result = result.options
                  .map(opt => opt.text)
                  .reduce((arr, val) => {
                    if( arr.indexOf(val) === -1 ) arr.push(val);
                    return arr;
                  }, [])

        this.store.setWineNameLoaded(text, query, result);
      }
    });
  }

  /**
   * @method country
   * @description suggest country name
   * ex query: https://wine-api.library.ucdavis.edu/countries?select=country&country=ilike.bel*
   * 
   * @param {String} text
   * 
   * @returns {Promise}
   */
  country(text) {
    var query = {
      select : 'country',
      country : `ilike.*${text}*`,
      limit : 10
    }

    return this.request({
      url : `${API_HOST}/countries`,
      qs : query,
      checkCached : () => this.store.data.country[text],
      onLoading : request => this.store.setCountryLoading(text, query, request),
      onError : e => this.store.setCountryError(text, query, e),
      onLoad : result => this.store.setCountryLoaded(text, query, result.body.map((item) => item.country))
    });
  }


}

module.exports = new SuggestService();