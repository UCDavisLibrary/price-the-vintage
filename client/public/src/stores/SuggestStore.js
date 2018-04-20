var BaseStore = require('@ucd-lib/cork-app-utils').BaseStore;

class SuggestStore extends BaseStore {

  constructor() {
    super();
    this.data = {
      'wine-name' : {},
      country : {}
    };

    this.events = {
      WINE_NAME_SUGGEST_UPDATE : 'wine-name-suggest-update',
      COUNTRY_SUGGEST_UPDATE : 'country-suggest-update'
    };
  }

  setWineNameLoading(text, query, request) {
    this.data['wine-name'][text] = {
      state : this.STATE.LOADING,
      query, request, text
    }
    this.emitUpdateEvent('wine-name', text);
  }

  setWineNameLoaded(text, query, payload) {
    this.data['wine-name'][text] = {
      state : this.STATE.LOADED,
      query, payload, text
    }
    this.emitUpdateEvent('wine-name', text);
  }

  setWineNameError(text, query, error) {
    this.data['wine-name'][text] = {
      state : this.STATE.ERROR,
      query, error, text
    }
    this.emitUpdateEvent('wine-name', text);
  }

  setCountryLoading(text, query, request) {
    this.data.country[text] = {
      state : this.STATE.LOADING,
      query, request, text
    }
    this.emitUpdateEvent('country', text);
  }

  setCountryLoaded(text, query, payload) {
    this.data.country[text] = {
      state : this.STATE.LOADED,
      query, payload, text
    }
    this.emitUpdateEvent('country', text);
  }

  setCountryError(text, query, error) {
    this.data.country[text] = {
      state : this.STATE.ERROR,
      query, error, text
    }
    this.emitUpdateEvent('country', text);
  }

  emitUpdateEvent(type, text) {
    this.emit(`${type}-suggest-update`, this.data[type][text]);
  }

}

module.exports = new SuggestStore();