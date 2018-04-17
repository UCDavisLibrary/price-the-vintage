var assert = require('assert');

var eventBus = require('app/eventBus');
var MultiTestRig = require('../MultiTestRig');
var controller = require('app/controllers/appState');

describe('Integration: Internal - appState', function() {

  describe('app-state', function() {

    it('should let me set the app state', function(next) {
      var responses = new MultiTestRig(2, () => {
        eventBus.removeListener('app-state-update', test);
        next();
      });

      function test(appState) {
        assert.equal(appState.section, 'testing');
        responses.complete();
      }

      eventBus.on('app-state-update', test);
      eventBus.emit('update-app-state', {
        state : {
          section : 'testing'
        },
        handler : test
      });
    });

    it('should let me get the app state', function(next) {
      function test(appState) {
        assert.equal(appState.section, 'testing');
        next();
      }

      eventBus.emit('get-app-state', {
        state : {
          section : 'testing'
        },
        handler : test
      });
    });

  });

});