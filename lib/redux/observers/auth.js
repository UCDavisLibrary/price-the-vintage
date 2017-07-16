var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var auth = observer(
  (state) => {
    return state.auth
  },
  (dispatch, current, previous) => {
    ObserverEventEmitter.onAuthStateChange(current);
  }
);

module.exports = [auth];