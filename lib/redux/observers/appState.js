var observer = require('redux-observers').observer;
var controller = require('../../controllers/AppStateController');

var appState = observer(
  (state) => state.appState,
  (dispatch, current, previous) => {
    controller.appStateObserver(current);
  }
);

module.exports = [appState];