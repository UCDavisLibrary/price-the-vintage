var BaseStore = require('cork-app-utils').BaseStore;


class AdminStore extends BaseStore {

  constructor() {
    super();

    this.events = {
      ADMIN_SEARCH_UPDATE : 'admin-search-update'
    }

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
    this.emit(this.events.ADMIN_SEARCH_UPDATE, this.data.search);
  }
}

module.exports = new AdminStore();