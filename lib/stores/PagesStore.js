var BaseStore = require('cork-app-utils').BaseStore;


class PagesStore extends BaseStore {

  constructor() {
    super();

    this.CATALOG_PAGES_UPDATE = 'catalog-pages-update';
    this.PAGE_UPDATE = 'catalog-page-update';
    this.SEARCH_UPDATE = 'search-catalog-pages-update';

    this.data = {
      byId : {},
      byCatalogId : {},
      search : {
        state : this.STATE.INIT
      }
    };
  }

  setPages(catalogId, pages) {
    var newByCatalogId = {
      [catalogId] : {
        id : catalogId,
        state : this.STATE.LOADED,
        payload : pages
      }
    }

    var newById = {};
    pages.forEach((page) => {
      newById[page.page_id] = {
        id : page.page_id,
        state : this.STATE.LOADED,
        payload : page
      }
    });

    this.data.byId = Object.assign({}, this.data.byId, newById);
    this.data.byCatalogId = Object.assign({}, this.data.byCatalogId, newByCatalogId);

    for( var id in newById ) {
      this.emitPageUpdate(id);
    }
    this.emitPagesUpdate(catalogId);
  }

  setPagesLoading(catalogId) {
    var update = {
      [catalogId] : {
        id : catalogId,
        state : this.STATE.LOADING
      }
    }
    this.data.byCatalogId = Object.assign({}, this.data.byCatalogId, update);
    this.emitPagesUpdate(catalogId);
  }

  setPagesError(catalogId, error) {
    var update = {
      [catalogId] : {
        id : catalogId,
        error : error,
        state : this.STATE.ERROR
      }
    }
    this.data.byCatalogId = Object.assign({}, this.data.byCatalogId, update);
    this.emitPagesUpdate(catalogId);
  }

  emitPagesUpdate(id) {
    this.emit(this.CATALOG_PAGES_UPDATE, this.data.byCatalogId[id]);
  }

  setPage(page) {
    var update = {
      [page.page_id] : {
        id : page.page_id,
        state : this.STATE.LOADED,
        payload : page
      }
    }

    this.data.byId = Object.assign({}, this.data.byId, update);
    this.emitPageUpdate(page.page_id);
  }

  setPageLoading(pageId) {
    var update = {
      [pageId] : {
        id : pageId,
        state : this.STATE.LOADING
      }
    }

    this.data.byId = Object.assign({}, this.data.byId, update);
    this.emitPageUpdate(pageId);
  }

  setPageError(pageId, error) {
    var update = {
      [pageId] : {
        id : pageId,
        error : error,
        state : this.STATE.ERROR
      }
    }

    this.data.byId = Object.assign({}, this.data.byId, update);
    this.emitPageUpdate(pageId);
  }

  emitPageUpdate(id) {
    this.emit(this.PAGE_UPDATE, this.data.byId[id]);
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

  emitPageUpdate(id) {
    this.emit(this.SEARCH_UPDATE, this.data.search);
  }
}

module.exports = new PagesStore();