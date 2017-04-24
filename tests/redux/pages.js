var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/collections/pages');
var eventBus = require('app/eventBus');

var pageId = '';
var catalogId = 'a60bb267-fe06-4fae-81db-4da9518b95ab';

describe('Redux: pages', function() {

    it('should search catalog pages', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('search-catalog-pages-update', listener);
        } else {
          assert.equal(e.state, 'loaded');
          assert.equal(typeof e.results, 'object');
          assert.equal(e.results.start, 0);
          assert.equal(e.results.stop > 0, true);
          assert.equal(e.results.total > 0, true);
          assert.equal(typeof e.results.results, 'object');

          // validate a results as well
          var result = e.results.results[0];
          assert.equal(typeof result.page_id, 'string');
          assert.equal(result.catalog_id, catalogId);
          assert.equal(typeof result.page, 'number');
          assert.equal(typeof result.media_id, 'string');
          assert.equal(typeof result.editable, 'boolean');
          assert.equal(typeof result.completed, 'boolean');
          assert.equal(typeof result.created_at, 'string');

          pageId = result.page_id; // for next test

          next();
        }
        
      }
      eventBus.once('search-catalog-pages-update', listener);

      store.dispatch(
        actions.search({
          catalogId: catalogId
        })
      )
    });

    it('should get a catalog page', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('catalog-page-update', listener);
        } else {
          assert.equal(e.state, 'loaded');
          assert.equal(typeof e.payload, 'object');


          // validate a results as well
          var result = e.payload;
          assert.equal(typeof result.page_id, 'string');
          assert.equal(typeof result.catalog_id, 'string');
          assert.equal(typeof result.page, 'number');
          assert.equal(typeof result.media_id, 'string');
          assert.equal(typeof result.editable, 'boolean');
          assert.equal(typeof result.completed, 'boolean');

          next();
        }
        
      }
      eventBus.once('catalog-page-update', listener);

      store.dispatch(
        actions.get(pageId)
      )
    });

    it('should get catalog pages', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('catalog-pages-update', listener);
        } else {
          assert.equal(e.state, 'loaded');
          assert.equal(Array.isArray(e.payload), true);
          assert.equal(e.payload.length > 0, true);

          // validate a results as well
          var result = e.payload[0];
          assert.equal(typeof result.page_id, 'string');
          assert.equal(result.catalog_id, catalogId);
          assert.equal(typeof result.page, 'number');
          assert.equal(typeof result.media_id, 'string');
          assert.equal(typeof result.editable, 'boolean');
          assert.equal(typeof result.completed, 'boolean');
          assert.equal(typeof result.marks, 'number');

          next();
        }
        
      }
      eventBus.once('catalog-pages-update', listener);

      store.dispatch(
        actions.getPages(catalogId)
      )
    });

});