var BaseStore = require('@ucd-lib/cork-app-utils').BaseStore;

class PagesStore extends BaseStore {

  constructor() {
    super();

    this.events = {
      CATALOG_PAGES_UPDATE : 'catalog-pages-update',
      CATALOG_PAGE_UPDATE : 'catalog-page-update',
      CATALOG_PAGES_SEARCH_UPDATE : 'catalog-pages-search-update'
    };

    this.data = {
      byId : {},
      byCatalogId : {},
      search : {
        state : this.STATE.INIT
      }
    };
  }

  setPagesLoaded(catalogId, pages = []) {
    this.data.byCatalogId[catalogId] = {
      id : catalogId,
      state : this.STATE.LOADED,
      payload : pages
    }
    this.emitPagesUpdate(catalogId);


    pages.forEach((page) => this.setPageLoaded(page.page_id, page));
  }

  setPagesLoading(catalogId, request) {
    this.data.byCatalogId[catalogId] = {
      id : catalogId,
      request,
      state : this.STATE.LOADING
    }

    this.emitPagesUpdate(catalogId);
  }

  setPagesError(catalogId, error) {
    this.data.byCatalogId[catalogId] = {
      id : catalogId,
      error,
      state : this.STATE.ERROR
    }

    this.emitPagesUpdate(catalogId);
  }

  emitPagesUpdate(id) {
    this.emit(this.events.CATALOG_PAGES_UPDATE, this.data.byCatalogId[id]);
  }

  setPageLoaded(pageId, page) {
    this.data.byId[pageId] = {
      id : pageId,
      state : this.STATE.LOADED,
      payload : page
    }

    // TODO: should this emit a 'pages' update event?
    if( page.catalog_id && 
        this.data.byCatalogId[page.catalog_id] ) {
      let catalog = this.data.byCatalogId[page.catalog_id];
      let index = catalog.payload.findIndex(p => p.page_id === pageId);

      if( index > -1 ) catalog.payload[index] = page;
      else catalog.payload.push(page);
    }

    this.emitPageUpdate(pageId);
  }

  setPageLoading(pageId) {
    this.data.byId[pageId] = {
      id : pageId,
      state : this.STATE.LOADING
    }
    this.emitPageUpdate(pageId);
  }

  setPageError(pageId, error) {
    this.data.byId[pageId] = {
      id : pageId,
      error,
      state : this.STATE.ERROR
    }
    this.emitPageUpdate(pageId);
  }

  setPageSaving(pageId, request) {
    this.data.byId[pageId] = {
      id : pageId,
      request,
      state : this.STATE.SAVING
    }
    this.emitPageUpdate(pageId);
  }

  emitPageUpdate(id) {
    this.emit(this.events.CATALOG_PAGE_UPDATE, this.data.byId[id]);
  }

  setSearchLoaded(results, params, text) {
    this.data.search = {
      state : this.STATE.LOADED,
      payload : results,
      params, text
    }
    this.emitSearchUpdate();
  }

  setSearchLoading(params, text) {
    this.data.search = {
      state : this.STATE.LOADING,
      params, text
    }

    this.emitSearchUpdate();
  }

  setSearchError(error, params, text) {
    this.data.search = {
      state : this.STATE.ERROR,
      error : error,
      params, text
    }

    this.emitSearchUpdate();
  }

  emitSearchUpdate(id) {
    this.emit(this.events.CATALOG_PAGES_SEARCH_UPDATE, this.data.search);
  }
}

module.exports = new PagesStore();