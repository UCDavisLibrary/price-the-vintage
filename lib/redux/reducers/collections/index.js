var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  catalogs : require('./catalogs')
});