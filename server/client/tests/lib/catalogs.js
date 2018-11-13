const assert = require('assert');
const catalogs = require('../../public/src/lib/catalogs');

let catalogId;
let emptySearchTotal;

describe('catalogs library', function() {

  it('should do a basic empty search', async () => {
    let search = await catalogs.search();
    
    // expect first twelve results
    assert.equal(search.state, catalogs.store.STATE.LOADED);
    assert.equal(search.payload.results.length, 12);
    assert.equal(search.payload.start, 0);
    assert.equal(search.payload.stop, 11);
    assert.equal(search.payload.total > 12, true);

    // store for text search later
    emptySearchTotal = search.payload.total;

    // store a catalog id for later
    catalogId = search.payload.results[0].catalog_id;
  });

  it('should page an empty search with a limit set', async () => {
    let search = await catalogs.search({offset: 12, limit : 2});
    
    // expect first twelve results
    assert.equal(search.state, catalogs.store.STATE.LOADED);
    assert.equal(search.payload.results.length, 2);
    assert.equal(search.payload.start, 12);
    assert.equal(search.payload.stop, 13);
    assert.equal(search.payload.total > 12, true);
  });

  it('should search with text', async function() {
    this.timeout(10000);
    let search = await catalogs.search({q: 'red'});
    
    // expect first twelve results
    assert.equal(search.state, catalogs.store.STATE.LOADED);
    assert.equal(search.payload.results.length, 12);
    assert.equal(search.payload.start, 0);
    assert.equal(search.payload.stop, 11);
    assert.equal(search.payload.total < emptySearchTotal, true);
  });

  it('should search with text with offset/limit', async function() {
    this.timeout(10000);
    let search = await catalogs.search({q: 'red', offset: 12, limit : 2});
    
    // expect first twelve results
    assert.equal(search.state, catalogs.store.STATE.LOADED);
    assert.equal(search.payload.results.length, 2);
    assert.equal(search.payload.start, 12);
    assert.equal(search.payload.stop, 13);
    assert.equal(search.payload.total < emptySearchTotal, true);
  });

  it('should get a catalog', async () => {
    let catalog = await catalogs.get(catalogId);

    assert.equal(catalog.state, catalogs.store.STATE.LOADED);
    assert.equal(catalog.id, catalogId);
    assert.notEqual(typeof catalog.payload, 'undefined');
  });

});