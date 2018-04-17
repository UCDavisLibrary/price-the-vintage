var assert = require('assert');

var eventBus = require('app/eventBus');
var MultiStateTestRig = require('../MultiStateTestRig');
var controller = require('app/controllers/catalogs');

describe('Integration: Service - Catalogs', function() {

  describe('search-catalogs', function() {

    it('should let me set the search', function(next) {
      new MultiStateTestRig({
        tests : {
          loading : function(e) {
            assert.equal(e.state, 'loading');
          },
          loaded : function(e) {
            assert.equal(e.state, 'loaded');
            assert.equal(typeof e.results, 'object');
            assert.equal(typeof e.results.results, 'object');
            assert.equal(e.results.start, 0);
            assert.equal(Array.isArray(e.results.results), true);
          }
        },
        event : 'search-catalogs',
        eventPayload : {},
        updateEvent : 'search-catalogs-update',
        next : next,
        eventBus : eventBus
      });
    });
  });

  describe('clear-catalogs', function() {
    it('should clear all searched catalogs', function() {
      var result = controller.clear();
      assert.equal(Object.keys(result), 0);
    });
  });

  // TODO: service currently taking +20 sec
  // describe('get-catalogs', function() {

  //   it('should let me get a catalog', function(next) {
  //     this.timeout(5000);
      
  //     new MultiStateTestRig({
  //       tests : {
  //         loading : function(e) {
  //           assert.equal(e.state, 'loading');
  //           console.log(e);
  //         },
  //         loaded : function(e) {
  //           assert.equal(e.state, 'loaded');
  //           console.log(e);
  //         }
  //       },
  //       event : 'get-catalog',
  //       eventPayload : {
  //         id : 40
  //       },
  //       updateEvent : 'catalog-update',
  //       next : next,
  //       eventBus : eventBus
  //     });
  //   });

  // });


});