var BaseStore = require('cork-app-utils').BaseStore;


class CatalogsStore extends BaseStore {

  constructor() {
    this.UPDATE_EVENT = 'catalog-update';
    this.SEARCH_UPDATE_EVENT = 'search-catalogs-update';

    this.data = {
      search : {
        state : 'init'
      },
      byId : {}
    }
  }


  setData(id, catalog) {
    this.data.byId[id] = {
      id: id, 
      payload: catalog, 
      state: 'loaded'
    };

    this.emit(this.UPDATE_EVENT, this.data.byId[id]);
  }

  setError(id, error) {
    this.data.byId[id] = {
      id: id, 
      error: error, 
      state: 'error'
    };

    this.emit(this.UPDATE_EVENT, this.data.byId[id]);
  }

  setState(id, state) {
    this.data.byId[id] = Object.assign(
                                  {}, 
                                  this.data.byId[id], 
                                  {id: id, state: value}
                                );
    
    this.emit(this.UPDATE_EVENT, this.data.byId[id]);
  }

  setSearchData(payload) {
    var newIds = {};

    if( payload && payload.data ) {
      payload.data.forEach(item => { 
        newIds[item.id] = {id: item.id, payload: item, state: 'loaded'}
      });
    }

    var newSearch = {
      state : 'loaded',
      results : payload
    }

    var newState = {
      search : Object.assign({}, this.data.search, newSearch),
      byId : Object.assign({}, this.data.byId, newIds)
    }

    this.data = Object.assign({}, this.data, newState);


    this.emit(this.SEARCH_UPDATE_EVENT, this.data.search);
    for( var id in newIds ) {
      this.emit(this.UPDATE_EVENT, newIds[id]);
    }
  }

  setSearchError(error) {
    this.data.search = {state: 'error', error: error};
    this.emit(this.SEARCH_UPDATE_EVENT, this.data.search);
  }

  setSearchState(state) {
    this.data.search = {state};
    this.emit(this.SEARCH_UPDATE_EVENT, this.data.search);
  }

  clear() {
    this.data.byId = {};
  }

}

module.exports = new CatalogsStore();