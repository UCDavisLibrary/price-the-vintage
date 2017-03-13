var MultiTestRig = require('./MultiTestRig');
var assert = require('assert');

class MultiStateTestRig {

  /**
   * init and start the multi state test rig.
   * @param {Object} config - definition of test
   * @param {Object} config.tests - hash of state string to test function
   * @param {Object} config.eventBus - eventBus to use
   * @param {string} config.event - event to emit to start test
   * @param {Object} config.eventPayload - payload to send with event
   * @param {string} config.updateEvent - event that is fired when Redux updates
   * @param {boolean} config.noHandler - do not expect callback handler to fire
   */
  constructor(config) {
    this.test = this.test.bind(this);

    this.tests = config.tests;

    config.eventBus.on(config.updateEvent, this.test);

    var total = Object.keys(this.tests).length;
    if( !config.noHandler ) {
      total++;
    }

    this.responses = new MultiTestRig(total, () => {
      config.eventBus.removeListener(config.updateEvent, this.test);
      config.next();
    });

    var payload = config.eventPayload || {};
    payload.handler = this.test.bind(this);

    config.eventBus.emit(config.event, payload);
  }

  /**
   * Perform individual state test
   * @param {object} e 
   */
  test(e) {
    assert.notEqual(this.tests[e.state], undefined);
    this.tests[e.state](e);
    this.responses.complete();
  }

}

module.exports = MultiStateTestRig;