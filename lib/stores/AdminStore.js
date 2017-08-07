var BaseStore = require('cork-app-utils').BaseStore;


class AdminStore extends BaseStore {

  constructor() {
    super();

    this.SEARCH_EVENT = 'admin-search-update';
    this.data = {
      search : {}
    }
  }

  setSearch(results, params) {
    this.data.search = {
      state : this.STATE.LOADED,
      payload : results,
      params : params
    }
    this.emitSearchUpdate();
  }

  setSearchLoading(params) {
    this.data.search = {
      state : this.STATE.LOADING,
      params : params
    }

    this.emitSearchUpdate();
  }

  setSearchError(error, params) {
    this.data.search = {
      state : this.STATE.ERROR,
      error : error,
      params : params
    }

    this.emitSearchUpdate();
  }

  emitSearchUpdate(id) {
    this.emit(this.SEARCH_EVENT, this.data.search);
  }
}

module.exports = new AdminStore();