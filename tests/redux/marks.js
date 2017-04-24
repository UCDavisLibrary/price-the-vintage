var assert = require('assert');
var store = require('app/redux/store');
var actions = require('app/redux/actions/collections/marks');
var eventBus = require('app/eventBus');


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


describe('Redux: marks', function() {



    it('should search pending marks', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('pending-mark-search-update', listener);
        } else {
          assert.equal(e.state, 'loaded');

          assert.equal(typeof e.payload, 'object');
          assert.equal(e.payload.start, 0);
          assert.equal(typeof e.payload.start, 'number');
          assert.equal(typeof e.payload.stop, 'number');
          assert.equal(typeof e.payload.results, 'object');

          // validate a results as well
          var result = e.payload.results[0];

          assert.equal(typeof result.mark_id, 'string');
          assert.equal(typeof result.page_id, 'string');
          assert.equal(typeof result.created, 'string');
          assert.equal(typeof result.updated, 'string');
          assert.equal(typeof result.score, 'number');

          // for later test
          pendingMarkId = result.mark_id;


          next();
        }
        
      }
      eventBus.once('pending-mark-search-update', listener);

      store.dispatch(
        actions.pendingMarkSearch()
      )
    });

    it('should get approved marks by page', (next) => {
      var count = 0;
      function listener(e) {
        if( count === 0 ) {
          count++;
          assert.equal(e.state, 'loading');
          eventBus.once('approved-catalog-page-marks-update', listener);
        } else {
          assert.equal(e.state, 'loaded');

          assert.equal(typeof e.payload, 'object');
          assert.equal(Array.isArray(e.payload), true);

          // validate a results as well
          var result = e.payload[0];

          assert.equal(typeof result.markId, 'string');
          assert.equal(typeof result.pageId, 'string');
          assert.equal(typeof result.user, 'string');
          assert.equal(typeof result.type, 'string');

          // for later test
          approvedMarkId = result.markId;

          next();
        }
        
      }
      eventBus.once('approved-catalog-page-marks-update', listener);

      store.dispatch(
        actions.getApprovedMarks('8127aea9-78ca-475b-ad0f-5e094ee5a514')
      )
    });

    it('should set mark as saving', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'saving');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.data, mark1.data);

        next();
      });

      store.dispatch(
        actions.saveMarkStart(
          mark1.pageId,
          mark1.markId,
          mark1.data
        )
      )
    });

    it('should set mark as saved', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'loaded');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.data, mark1.data);

        next();
      });

      store.dispatch(
        actions.saveMarkSuccess(
          mark1.pageId,
          mark1.markId
        )
      )
    });

    it('should set mark as error', (next) => {
      var error = {
        error : true,
        message : 'fake'
      }

      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'save-error');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.data, mark1.data);
        assert.deepEqual(e.error, error);

        next();
      });

      store.dispatch(
        actions.saveMarkFailure(
          mark1.pageId,
          mark1.markId,
          error
        )
      )
    });

    it('should set mark as removing', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'deleting');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.data, mark1.data);

        next();
      });

      store.dispatch(
        actions.removeMarkStart(
          mark1.pageId,
          mark1.markId
        )
      )
    });

    it('should set mark as deleted', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'deleted');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);

        next();
      });

      store.dispatch(
        actions.removeMarkSuccess(
          mark1.pageId,
          mark1.markId
        )
      )
    });

    it('should set mark delete error', (next) => {
      var error = {
        error : true,
        message : 'faked'
      }

      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'delete-error');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.error, error);

        next();
      });

      store.dispatch(
        actions.removeMarkFailure(
          mark1.pageId,
          mark1.markId,
          error
        )
      )
    });

    it('should set mark delete error', (next) => {
      var error = {
        error : true,
        message : 'faked'
      }

      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'delete-error');
        assert.equal(e.id, mark1.markId);
        assert.equal(e.pageId, mark1.pageId);
        assert.deepEqual(e.error, error);

        next();
      });

      store.dispatch(
        actions.removeMarkFailure(
          mark1.pageId,
          mark1.markId,
          error
        )
      )
    });

    it('should add another mark', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'saving');
        assert.equal(e.id, mark2.markId);
        assert.equal(e.pageId, mark2.pageId);
        assert.deepEqual(e.data, mark2.data);

        next();
      });

      store.dispatch(
        actions.saveMarkStart(
          mark2.pageId,
          mark2.markId,
          mark2.data
        )
      )
    });

    it('should finish saving new mark', (next) => {
      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'loaded');
        assert.equal(e.id, mark2.markId);
        assert.equal(e.pageId, mark2.pageId);
        assert.deepEqual(e.data, mark2.data);

        next();
      });

      store.dispatch(
        actions.saveMarkSuccess(
          mark2.pageId,
          mark2.markId
        )
      )
    });

    it('should update new mark', (next) => {
      mark2.data.bottleType = 'UPDATED!!!';

      eventBus.once('catalog-page-marks-update', (e) => {
        assert.equal(e.state, 'loaded');
        assert.equal(e.id, mark2.markId);
        assert.equal(e.pageId, mark2.pageId);
        assert.deepEqual(e.data, mark2.data);

        next();
      });

      store.dispatch(
        actions.markChange(
          mark2.pageId,
          mark2.markId,
          mark2.data
        )
      )
    });

    it('should select mark', (next) => {
      eventBus.once('selected-catalog-page-update', (e) => {
        assert.equal(e, mark2.markId);
        next();
      });

      store.dispatch(
        actions.select(mark2.markId)
      )
    });



});