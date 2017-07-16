var EventController = require('cork-app-utils').EventController;
var model = require('../models/AppStateModel');

/**
 * Wire up event bus to appState controller
 */
class AppStateController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      updateAppState : 'update-app-state',
      getAppState : 'get-app-state'
    }

    this.bind();
  }

  /**
   * Event: update-app-state
   * 
   * @param {Object} e - event bus event
   * @param {string} e.state - update state object
   */
  updateAppState(e) {
    return model.set(e.state);
  }

  /**
   * Event: get-app-state
   */
  getAppState() {
    return model.get();
  }
}

module.exports = new AppStateController();