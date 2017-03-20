var store = require('../../redux/store');

/**
 * Controller for handling config file interactions
 */
function ConfigController() {

  /**
   * Get the current host provided in config file.
   * @returns {string} - host url
   */
  this.getApiHost = function() {
    return store.getState().config.apiHost;
  }

}

var controller = new ConfigController();
require('./events')(controller);
module.exports = controller;