var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  catalogs : require('./catalogs'),
  pages : require('./pages'),
  marks : require('./marks')
});