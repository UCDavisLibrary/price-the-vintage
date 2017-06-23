var observer = require('redux-observers').observer;
var controller = require('../../controllers/AuthController');

var auth = observer(
  (state) => {
    return state.auth
  },
  (dispatch, current, previous) => {
    controller.authStateObserver(current);
  }
);

module.exports = [auth];