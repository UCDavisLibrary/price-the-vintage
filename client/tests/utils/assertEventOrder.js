const assert = require('assert');

/**
 * @function assertEventOrder
 * @description allows you to write a check that asserts as both the result of a
 * async function call(s) as well as event emitted cause of the function call
 * 
 * @param {Object} controller the MasterController or EventEmitter class
 * @param {String} event event to listen for
 * @param {Array} stateOrder array of strings.  Expect state for each event
 * @param {Function} work do you testing in this function (can by async).  Once all
 * events fire and the work function is finished executing, the return promise will
 * resolve
 * @param {Function} assertState if you want to do some more advanced assertions on
 * on each state object, use this callback
 * 
 * @returns {Promise}
 */
module.exports = function assertEventOrder(controller, event, stateOrder, work, assertState) {
  let promise = new Promise(async (resolve, reject) => {
    let eventCount = 0;

    controller.on(event, (e) => {
      
      if( assertState ) {
        assertState(e, stateOrder[eventCount]);
      } else if( typeof stateOrder[eventCount] === 'string' ) {
        assert.equal(e.state, stateOrder[eventCount]);
      }
      
      eventCount++;
      if( eventCount === stateOrder.length ) {
        controller.removeAllListeners(event);
        resolve();
      }
    });
  });

  return Promise.all([promise, work()]);
}