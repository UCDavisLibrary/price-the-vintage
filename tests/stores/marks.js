var assert = require('assert');
var EventBus = require('cork-app-utils').EventBus;
var MarksStore = require('../../lib/stores/MarksStore');

var pendingMarkId = '';
var approvedMarkId = '';

var mark1 = {
  state : MarksStore.STATE.LOADED,
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
  state : MarksStore.STATE.LOADED,
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

var marks = [mark1.data, mark2.data];

var pendingMarkSearchParams = {foo: 'bar'};
var approvedPageId = '12345';

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
  });

  it('should let me set approved loading state', (next) => {
    EventBus.once(MarksStore.APPROVE_PAGE_MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADING);
      assert.deepEqual(MarksStore.data.approvedPageRequestState[approvedPageId], e);
      next();
    });

    MarksStore.setApprovedByPageLoading(approvedPageId);
  });

  it('should let me set approved error state', (next) => {
    var error = new Error('Something went wrong');

    EventBus.once(MarksStore.APPROVE_PAGE_MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.ERROR);
      assert.equal(e.error, error);
      assert.deepEqual(MarksStore.data.approvedPageRequestState[approvedPageId], e);
      next();
    });

    MarksStore.setApprovedByPageError(approvedPageId, error);
  });

  it('should let me set approved loaded state', (next) => {

    EventBus.on(MarksStore.MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADED);
    });

    EventBus.once(MarksStore.APPROVE_PAGE_MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADED);
      assert.deepEqual(e.marks, marks);
      EventBus.removeAllListeners();
      next();
    });

    MarksStore.setApprovedByPageLoaded(approvedPageId, marks);
  });

  it('should let me set loaded mark', (next) => {
    EventBus.once(MarksStore.MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADED);
      assert.deepEqual(e, mark1);
      next();
    });

    MarksStore.setMark(mark1);
  });

  it('should let me set mark loading state', (next) => {
    EventBus.once(MarksStore.MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.LOADING);
      assert.equal(e.markId, mark1.markId);
      assert.equal(e.pageId, mark1.pageId);
      assert.equal(e.approved, true);
      next();
    });

    MarksStore.setMarkLoading(mark1.markId, mark1.pageId, true);
  });

  it('should let me set mark error state', (next) => {
    var error = new Error('Something went wrong');

    EventBus.once(MarksStore.MARK_UPDATE_EVENT, (e) => {
      assert.equal(e.state, MarksStore.STATE.ERROR);
      assert.equal(e.markId, mark1.markId);
      assert.equal(e.pageId, mark1.pageId);
      assert.equal(e.approved, false);
      assert.equal(e.error, error);
      next();
    });

    MarksStore.setMarkError(mark1.markId, mark1.pageId, false, error);
  });


});