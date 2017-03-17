var assert = require('assert');
var firebase = require('./utils/firebase');
var waitForFBConnection = require('./utils/connect');
var eventBus = require('app/eventBus');
var MultiStateTestRig = require('../MultiStateTestRig');
var controller = require('app/controllers/activity');


describe('Integration: Firebase - Activity', function() {

  before((done) => {
    this.timeout(5000);
    waitForFBConnection(done);
  });

  describe('get-user-activity', function() {
    it('should let me setup user activity listeners', function(next) {
      new MultiStateTestRig({
        tests : {
          loaded : function(e) {
            assert.equal(e.state, 'loaded');
            assert.equal(e.id, '_test_');
            assert.equal(typeof e.users, 'object');
            assert.equal(Object.keys(e.users).length, 0);
          }
        },
        event : 'get-user-activity',
        eventPayload : {
          id : '_test_'
        },
        next : next,
        eventBus : eventBus
      });
    });
  });

  describe('set-user-activity', function() {
    it('should let me set my user activity', function(next) {
      this.timeout(5000);
      new MultiStateTestRig({
        tests : {
          loaded : function(e) {
            assert.equal(e.state, 'loaded');
            assert.equal(e.id, '_test_');
            assert.equal(typeof e.users, 'object');
            assert.equal(Object.keys(e.users).length, 1);
          }
        },
        event : 'set-user-activity',
        eventPayload : {
          catalogId : '_test_',
          pageId : '_test_'
        },
        updateEvent : 'user-activity-update',
        next : next,
        eventBus : eventBus,
        noHandler : true
      });
    });

    it('should let me set me get updated activity', function(next) {
      new MultiStateTestRig({
        tests : {
          loaded : function(e) {
            assert.equal(e.state, 'loaded');
            assert.equal(e.id, '_test_');
            assert.equal(typeof e.users, 'object');
            assert.equal(Object.keys(e.users).length, 1);
            assert.notEqual(e.users._test_, undefined);
          }
        },
        event : 'get-user-activity',
        eventPayload : {
          id : '_test_'
        },
        next : next,
        eventBus : eventBus
      });
    });
  });

  describe('clear activity on disconnect', function() {
    
    it('should let me disconnect firebase', function(next) {
      this.timeout(4000);

      setTimeout(function(){
        firebase.database().goOffline();

        setTimeout(function(){
          next();
        }, 2000);
      }, 1000);
      
    });


    // TODO.
    // it('should let me connect firebase', function(next) {
    //   this.timeout(15000);

    //   firebase.database().goOnline();
    //   eventBus.on('user-activity-update', function(e){
    //     console.log(e);
    //     next();
    //   });
    // });


  });


});