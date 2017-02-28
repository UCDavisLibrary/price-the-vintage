var store = require('../../redux/store');

function ConfigController() {

  this.getApiHost = function() {
    return store.getState().config.apiHost;
  }

}

var controller = new ConfigController();
require('./events')(controller);
module.exports = controller;