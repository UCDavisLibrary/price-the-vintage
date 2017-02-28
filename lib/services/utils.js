var store = require('../redux/store');

function getHost() {
  return require('../redux/store').getState().config.apiHost;
}

module.exports = {
  getHost
}