/**
 * Observe the redux store and send change events to UI
 */
var observe = require('redux-observers').observe;

var observers = []
          .concat(require('./appState'))
          .concat(require('./catalogs'));


module.exports = function(store) {
  observe(store, observers);
}