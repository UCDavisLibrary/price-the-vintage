var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var MarksStore = require('../../lib/stores/MarksStore');

var pendingMarkId = '';
var approvedMarkId = '';

var mark1 = {
  pageId : '1234',
  markId : '5678',
  data : { 
    user: '2468',
    type: 'wine',
    wineType: 'Sparkling',
    color: 'White',
    name: 'Brut',
    country: 'France',
    producer: 'Louis Roederer',
    section: 'Champagnes for the Holidays',
    year: 1945,
    bottleType: 'Standard',
    price: 7.75,
    casePrice: 83.69,
    xy: [1,2]
  }
}

var mark2 = {
  pageId : '235443',
  markId : '564354578',
  data : { 
    user: '2468',
    type: 'wine',
    wineType: 'Sparkling',
    color: 'White',
    name: 'Brut',
    country: 'France',
    producer: 'Louis Roederer',
    section: 'Champagnes for the Holidays',
    year: 1945,
    bottleType: 'Standard',
    price: 7.75,
    casePrice: 83.69,
    xy: [1,2]
  }
}

var pendingMarkSearchParams = {foo: 'bar'};

describe('Stores: MarksStore', function() {

  it('should let me set pending mark search state', (next) => {
    EventBus.once(MarksStore.PENDING_SEARCH_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADING);
      assert.deepEqual(e.params, pendingMarkSearchParams);
      assert.deepEqual(MarksStore.data.pendingSearch, e);
      next();
    });

    MarksStore.setPendingSearchLoading(pendingMarkSearchParams);
  });

  it('should let me set pending mark search error', (next) => {
    var error = new Error('Something went wrong');
    
    EventBus.once(MarksStore.PENDING_SEARCH_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.ERROR);
      assert.deepEqual(e.params, pendingMarkSearchParams);
      assert.equal(e.error, error);
      assert.deepEqual(MarksStore.data.pendingSearch, e);
      next();
    });

    MarksStore.setPendingSearchError(error, pendingMarkSearchParams);
  });

  it('should let me set pending mark loaded', (next) => {
    var payload = {marks: []};
    
    EventBus.once(MarksStore.PENDING_SEARCH_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADED);
      assert.deepEqual(e.params, pendingMarkSearchParams);
      assert.equal(e.payload, payload);
      assert.deepEqual(MarksStore.data.pendingSearch, e);
      next();
    });

    MarksStore.setPendingSearchLoaded(payload, pendingMarkSearchParams);
  })

});