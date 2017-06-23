var EventController = require('./EventController');
var model = require('../models/ConfigModel');

class ConfigController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      getApiHost : 'get-api-host'
    }

    this.bind();
  }

  /**
   * Event: get-api-host
   * Get the current host provided in config file.  Many elements need this
   * so they know where to retrieve images from.
   */
  getApiHost() {
    return model.getApiHost();
  }

}
