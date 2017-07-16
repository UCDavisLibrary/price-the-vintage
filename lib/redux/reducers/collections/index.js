var combineReducers = require('cork-app-utils').ReduxCombineReducers;

module.exports = combineReducers({
  catalogs : require('./catalogs'),
  pages : require('./pages'),
  marks : require('./marks')
});