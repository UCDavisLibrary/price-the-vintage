var combineReducers = require('cork-app-utils').ReduxCombineReducers;

module.exports = combineReducers({
  collections : require('./collections'),
  appState : require('./appState'),
  config : require('./config'),
  auth : require('./auth'),
  activity : require('./activity')
});

