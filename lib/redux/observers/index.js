/**
 * Observe the redux store and send change events to UI
 */
var observe = require('redux-observers').observe;

var observers = []
          .concat(require('./appState'))
          .concat(require('./catalogs'))
          .concat(require('./pages'))
          .concat(require('./marks'))
          .concat(require('./auth'))
          .concat(require('./activity'));


module.exports = function(store) {
  observe(store, observers);
}