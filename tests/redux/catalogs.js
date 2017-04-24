var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/collections/catalogs');
var eventBus = require('app/eventBus');

describe('Redux: catalogs', function() {

    var grandTotal = 0;
    var catalogId = '';

    it('should let me get catalogs', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('search-catalogs-update', listener);
        } else {
          assert.equal(e.state, 'loaded');
          assert.equal(typeof e.results, 'object');
          assert.equal(e.results.start, 0);
          assert.equal(e.results.stop > 0, true);
          assert.equal(e.results.total > 0, true);
          assert.equal(typeof e.results.results, 'object');

          // for next test
          grandTotal = e.results.total;

          // validate a results as well
          var result = e.results.results[0];
          assert.equal(typeof result.pages, 'number');
          assert.equal(typeof result.catalog_id, 'string');
          assert.equal(typeof result.pages_finished, 'number');
          assert.equal(typeof result.title, 'string');
          assert.equal(typeof result.publisher, 'string');
          assert.equal(typeof result.completed, 'boolean');
          assert.equal(typeof result.media_id, 'string');

          // for later test
          catalogId = result.catalog_id;

          next();
        }
        
      }
      eventBus.once('search-catalogs-update', listener);

      store.dispatch(
        actions.search()
      )
    });

    it('should let me search the catalogs', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('search-catalogs-update', listener);
        } else {
          assert.equal(e.state, 'loaded');
          assert.equal(typeof e.results, 'object');
          assert.equal(e.results.start, 0);
          assert.equal(e.results.stop > 0, true);
          assert.equal(e.results.total > 0, true);
          assert.equal(e.results.total < grandTotal, true);
          next();
        }
        
      }
      eventBus.once('search-catalogs-update', listener);

      store.dispatch(
        actions.search({q: '1965'})
      )
    });

    it('should let me clear the catalog store', () => {
      store.dispatch(
        actions.clear()
      )

      assert.equal(Object.keys(store.getState().collections.catalogs.byId).length, 0);
    });

    it('should let me get a catalog', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
        } else {
          assert.equal(e.state, 'loaded');

          // validate a results as well
          var result = e.payload;
          assert.equal(typeof result.pages, 'number');
          assert.equal(typeof result.catalog_id, 'string');
          assert.equal(typeof result.pages_finished, 'number');
          assert.equal(typeof result.title, 'string');
          assert.equal(typeof result.publisher, 'string');
          assert.equal(typeof result.completed, 'boolean');
          assert.equal(typeof result.media_id, 'string');


          eventBus.removeListener('catalog-update', listener);
          next();
        }
      }
      eventBus.on('catalog-update', listener);

      store.dispatch(
        actions.get(catalogId)
      )
    });

});