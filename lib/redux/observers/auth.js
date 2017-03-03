var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var auth = observer(
  (state) => {
    return state.auth
  },
  (dispatch, current, previous) => {
    eventBus.emit('auth-update', current);
  }
);

module.exports = [auth];