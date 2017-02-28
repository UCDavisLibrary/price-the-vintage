var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var appState = observer(
  (state) => state.appState,
  (dispatch, current, previous) => {
    eventBus.emit('app-state-update', current);
  }
);

module.exports = [appState];