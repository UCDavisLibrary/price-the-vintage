var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var PagesStore = require('../../lib/stores/PagesStore');

var pageId = '';
var catalogId = 'a60bb267-fe06-4fae-81db-4da9518b95ab';

var page1 = {
  page_id : '1234332',
  catalog_id : catalogId,
  last_updated : 12330809823
}
var page2 = {
  page_id : '12234433772',
  catalog_id : catalogId,
  last_updated : 12349009234
}
var pages = [page1, page2];


var searchResults = {
  total : 2,
  start : 0,
  itemsPerPage : 10,
  results : pages
}
var searchParams = {
  foo : 'bar'
}

describe('Stores: PagesStore', function() {

  it('should set pages', (next) => {
    EventBus.on(PagesStore.events.CATALOG_PAGE_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADED);
    });

    EventBus.once(PagesStore.events.CATALOG_PAGES_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADED);
      assert.deepEqual(e.payload, pages);
      assert.equal(e.id, catalogId);
      EventBus.removeAllListeners();
      next();
    });

    PagesStore.setPages(catalogId, pages);
  });

  it('should set pages loading', (next) => {
    EventBus.once(PagesStore.events.CATALOG_PAGES_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADING);
      assert.equal(e.id, catalogId);
      next();
    });

    PagesStore.setPagesLoading(catalogId);
  });

  it('should set pages error', (next) => {
    var error = new Error('Something went wrong');

    EventBus.once(PagesStore.events.CATALOG_PAGES_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.ERROR);
      assert.equal(e.error, error);
      assert.equal(e.id, catalogId);
      next();
    });

    PagesStore.setPagesError(catalogId, error);
  });

  it('should set page', (next) => {
    EventBus.once(PagesStore.events.CATALOG_PAGE_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADED);
      assert.deepEqual(e.payload, page1);
      assert.equal(e.id, page1.page_id);
      next();
    });

    PagesStore.setPage(page1);
  });

  it('should set page loading', (next) => {
    EventBus.once(PagesStore.events.CATALOG_PAGE_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADING);
      assert.equal(e.id, page1.page_id);
      next();
    });

    PagesStore.setPageLoading(page1.page_id);
  });

  it('should set page error', (next) => {
    var error = new Error('Something went wrong');

    EventBus.once(PagesStore.events.CATALOG_PAGE_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.ERROR);
      assert.equal(e.error, error);
      assert.equal(e.id, page1.page_id);
      next();
    });

    PagesStore.setPageError(page1.page_id, error);
  });

  it('should set search loaded', (next) => {
    EventBus.once(PagesStore.events.CATALOG_PAGES_SEARCH_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADED);
      assert.deepEqual(e.params, searchParams);
      assert.deepEqual(e.payload, searchResults);
      next();
    });

    PagesStore.setSearch(searchResults, searchParams);
  });

  it('should set search loading', (next) => {
    EventBus.once(PagesStore.events.CATALOG_PAGES_SEARCH_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.LOADING);
      assert.deepEqual(e.params, searchParams);
      next();
    });

    PagesStore.setSearchLoading(searchParams);
  });

  it('should set search error', (next) => {
    var error = new Error('Something went wrong');

    EventBus.once(PagesStore.events.CATALOG_PAGES_SEARCH_UPDATE, (e) => {
      assert.equal(e.state, PagesStore.STATE.ERROR);
      assert.equal(e.error, error);
      assert.deepEqual(e.params, searchParams);
      next();
    });

    PagesStore.setSearchError(error, searchParams);
  });

});