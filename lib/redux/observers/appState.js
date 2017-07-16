var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var appState = observer(
  (state) => state.appState,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onAppStateChange(current);
  }
);

module.exports = [appState];