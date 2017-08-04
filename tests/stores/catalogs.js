var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var CatalogsStore = require('../../lib/stores/CatalogsStore');

describe('Stores: CatalogsStore', function() {

    var grandTotal = 0;
    var catalog = {
      catalog_id : "c130c26a-c60d-4ad8-a780-4d766f04c4a6",
      completed : false,
      media_id : "c130c26a-c60d-4ad8-a780-4d766f04c4a6",
      pages : 5, 
      pages_finished : 3,
      publisher : "M. Lehmann, Inc.",
      title : "Advance Offering 1964"
    }
    var catalog2 = {
      catalog_id : "123456",
      completed : false,
      media_id : "c098765",
      pages : 54, 
      pages_finished : 2,
      publisher : "M. Lehmann, Inc.",
      title : "test"
    }
    var search = {
      data : [catalog, catalog2],
      start : 0,
      stop : 2,
      total: 2
    }

    it('should let me set catalog data', (next) => {
      EventBus.once(CatalogsStore.UPDATE_EVENT, (e) => {
        assert.equal(e.id, catalog.catalog_id);
        assert.equal(e.state, CatalogsStore.STATE.LOADED);
        assert.deepEqual(e.payload, catalog);
        assert.deepEqual(CatalogsStore.data.byId[catalog.catalog_id], e);
        next();
      });

      CatalogsStore.setData(catalog.catalog_id, catalog);
    });

    it('should let set error state', (next) => {
      var error = new Error('Something went wrong');

      EventBus.once(CatalogsStore.UPDATE_EVENT, (e) => {
        assert.equal(e.id, catalog.catalog_id);
        assert.equal(e.state, CatalogsStore.STATE.ERROR);
        assert.equal(e.error, error);
        assert.deepEqual(CatalogsStore.data.byId[catalog.catalog_id], e);
        next();
      });

      CatalogsStore.setError(catalog.catalog_id, error);
    });

    it('should set loading state', (next) => {
      EventBus.once(CatalogsStore.UPDATE_EVENT, (e) => {
        assert.equal(e.state, CatalogsStore.STATE.LOADING);
        assert.deepEqual(CatalogsStore.data.byId[catalog.catalog_id], e);
        next();
      });

      CatalogsStore.setState(catalog.catalog_id, CatalogsStore.STATE.LOADING);
    });

    it('should set search data', (next) => {
      var count = 0;

      function done() {
        count++;
        if( count !== 3 ) return;
        EventBus.removeAllListeners();
        next();
      }

      EventBus.addListener(CatalogsStore.UPDATE_EVENT, (e) => {
        assert.equal(CatalogsStore.STATE.LOADED, e.state);
        done();
      });

      EventBus.once(CatalogsStore.SEARCH_UPDATE_EVENT, (e) => {
        assert.equal(e.state, CatalogsStore.STATE.LOADED);
        assert.deepEqual(e.results, search);
        assert.deepEqual(CatalogsStore.data.search, e);
        done();
      });

      CatalogsStore.setSearchData(search);
    });


    it('should let set search error state', (next) => {
      var error = new Error('Something went wrong');

      EventBus.once(CatalogsStore.SEARCH_UPDATE_EVENT, (e) => {
        assert.equal(e.state, CatalogsStore.STATE.ERROR);
        assert.equal(e.error, error);
        assert.deepEqual(CatalogsStore.data.search, e);
        next();
      });

      CatalogsStore.setSearchError(error);
    });

    it('should set loading state', (next) => {
      EventBus.once(CatalogsStore.SEARCH_UPDATE_EVENT, (e) => {
        assert.equal(e.state, CatalogsStore.STATE.LOADING);
        assert.deepEqual(CatalogsStore.data.search, e);
        next();
      });

      CatalogsStore.setSearchState(CatalogsStore.STATE.LOADING);
    });

    it('should let me clear catalog data', () => {
      CatalogsStore.clear();
      assert.equal(Object.keys(CatalogsStore.data.byId), 0);
    });

});