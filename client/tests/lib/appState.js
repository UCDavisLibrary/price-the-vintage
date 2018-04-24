const assert = require('assert');
const AppStateModel = require('../../public/src/models/AppStateModel');
const assertEventOrder = require('../utils/assertEventOrder');

let testCatalogId = '10000000-0000-0000-0000-000000000000';
let testPageId = '00000000-0000-0000-0000-000000000001';

let testCatalogId2 = '20000000-0000-0000-0000-000000000000';
let testPageId2 = '00000000-0000-0000-0000-000000000002';

// fake a little bit of the window
AppStateModel.window = {
  events : {},
  addEventListener : function (e, fn) {
    if( !this.events[e] ) this.events[e] = [];
    this.events[e].push(fn);
  },
  location : {
    hash : `#${testCatalogId}/${testPageId}`
  }
}


describe('AppState Model', function() {

  it('should set app state', async () => {
    await assertEventOrder(
      AppStateModel.MasterController, 
      'app-state-update', 
      [{foo: 'bar'}, {foo: 'baz'}], 
      async() => {
        AppStateModel.set({foo: 'bar'});
        AppStateModel.set({foo: 'baz'});
      },
      (e, expected) => {
        assert.equal(e.foo, expected.foo);
      }
    )
  });

  it('should set app state on init', async() => {
    await assertEventOrder(
      AppStateModel.MasterController, 
      'app-state-update', 
      [{
        catalogId : testCatalogId,
        pageId : testPageId
      }], 
      async() => {
        // this will trigger a parse of the current window
        // hash state
        AppStateModel._initWindowEvents();
      },
      (e, expected) => {
        assert.equal(e.catalogId, expected.catalogId);
        assert.equal(e.pageId, expected.pageId);
      }
    )
  });

  it('should set app state on hash change', async() => {
    await assertEventOrder(
      AppStateModel.MasterController, 
      'app-state-update', 
      [{
        catalogId : testCatalogId2,
        pageId : testPageId2
      }], 
      async() => {
        AppStateModel.window.location.hash = `#${testCatalogId2}/${testPageId2}`
        AppStateModel.window.events.hashchange[0]();
      },
      (e, expected) => {
        assert.equal(e.catalogId, expected.catalogId);
        assert.equal(e.pageId, expected.pageId);
      }
    )
  });

});