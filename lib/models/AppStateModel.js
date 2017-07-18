var BaseModel = require('cork-app-utils').BaseModel;
var actions = require('../redux/actions/appState');

/**
 * Controller for handling various states of the application.
 * This includes current catalog and page and if we are editing a mark.
 */
class AppStateModel extends BaseModel {

  constructor() {
    super();
    this.bindMethods();
  }

  /**
   * Get the current redux appState
   * @returns {Object} appState
   */
  get() {
    return this.getState().appState;
  }

  /**
   * Update the app state
   * @returns {Object} update - keys to be updated
   */
  set(update) {
    this.dispatch(
      actions.updateState(update)
    )

    return this.getState().appState;
  }
}

module.exports = new AppStateModel();