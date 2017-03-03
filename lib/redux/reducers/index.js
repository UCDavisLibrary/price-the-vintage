var combineReducers = require('redux').combineReducers;

module.exports = combineReducers({
  collections : require('./collections'),
  appState : require('./appState'),
  config : require('./config'),
  auth : require('./auth')
});

