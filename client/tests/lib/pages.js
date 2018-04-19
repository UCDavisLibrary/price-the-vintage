const assert = require('assert');
const pages = require('../../public/src/lib/pages');
const catalogs = require('../../public/src/lib/catalogs');
const jwt = require('../utils/jwt');

let testUser = 'tester@ucdavis.edu';
let token = jwt(testUser);
let catalogId, pageId, page;
let emptySearchTotal;

describe('pages library', function() {

  // we need a catalog to work with... currently grabbing the first one :/
  before(async () => {
    let search = await catalogs.search();
    catalogId = search.payload.results[0].catalog_id;
  });

  it('should do a basic empty search', async () => {
    let search = await pages.search({catalogId});
    
    assert.equal(search.state, pages.store.STATE.LOADED);
    assert.equal(search.payload.results.length > 0, true);
    assert.equal(search.payload.start, 0);
    assert.equal(search.payload.stop > 0, true);
    assert.equal(search.payload.total > 0, true);

    // used below for text search
    emptySearchTotal = search.payload.total;

    // used for get below
    pageId = search.payload.results[0].page_id;
  });



  it('should search with text', async function() {
    this.timeout(10000);
    let search = await pages.search({catalogId, q: 'red'});

    // expect first twelve results
    assert.equal(search.state, pages.store.STATE.LOADED);
    assert.equal(search.payload.results.length > 0, true);
    assert.equal(search.payload.start, 0);
    assert.equal(search.payload.stop > 0, true);
    assert.equal(search.payload.total < emptySearchTotal, true);
    assert.equal(search.text, 'red');
  });

  it('should get a page', async () => {
    page = await pages.get(pageId);

    assert.equal(page.state, pages.store.STATE.LOADED);
    assert.equal(page.id, pageId);
    assert.notEqual(typeof page.payload, 'undefined');
  });

  it('should be able to toggle page ignore flag', async () => {
    let ignore = page.payload.editable;
    let updatedPage = await pages.ignore(pageId, ignore, token);
    
    assert.equal(updatedPage.state, pages.store.STATE.LOADED);
    assert.equal(updatedPage.payload.editable, !page.payload.editable);

    // reset state
    updatedPage = await pages.ignore(pageId, !ignore, token);

    assert.equal(updatedPage.state, pages.store.STATE.LOADED);
    assert.equal(updatedPage.payload.editable, page.payload.editable);
  });

  it('should be able to toggle page complete flag', async () => {
    let updatedPage = await pages.completed(pageId, !page.payload.completed, token);
    
    assert.equal(updatedPage.state, pages.store.STATE.LOADED);
    assert.equal(updatedPage.payload.completed, !page.payload.completed);

    // reset state
    updatedPage = await pages.completed(pageId, page.payload.completed, token);

    assert.equal(updatedPage.state, pages.store.STATE.LOADED);
    assert.equal(updatedPage.payload.completed, page.payload.completed);
  });



});