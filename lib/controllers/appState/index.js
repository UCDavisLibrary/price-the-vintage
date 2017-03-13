var store = require('../../redux/store');
var actions = require('../../redux/actions/appState');

/**
 * Controller for handling various states of the application.
 * This includes current catalog and page and if we are editing a mark.
 */
class AppStateController {

  /**
   * Get the current redux appState
   * @returns {Object} appState
   */
  get() {
    return store.getState().appState;
  }

  /**
   * Update the app state
   * @returns {Object} update - keys to be updated
   */
  set(update) {
    store.dispatch(
      actions.updateState(update)
    )

    return store.getState().appState;
  }
}

var controller = new AppStateController();
require('./events')(controller);
module.exports = controller;