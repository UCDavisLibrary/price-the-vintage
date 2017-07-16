var store = require('cork-app-utils').ReduxStore;
var reducers = require('./redux/reducers');
var observers = require('./redux/observers');

var middleware = [
  require('cork-app-utils').ReduxAPIMiddleware
]

module.exports = function() {
  store({reducers, observers, middleware});
}