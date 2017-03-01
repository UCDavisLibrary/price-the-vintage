var store = require('../../redux/store');
var actions = require('../../redux/actions/appState');

function AppStateController() {

  this.get = function() {
    return store.getState().appState;
  }

  this.set = function(update) {
    store.dispatch(
      actions.updateState(update)
    )

    return store.getState().appState;
  }
}

var controller = new AppStateController();
require('./events')(controller);
module.exports = controller;