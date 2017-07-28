var BaseStore = require('cork-app-utils').BaseStore;
var initConfig = require('../config');

class ConfigStore extends BaseStore {

  constructor() {
    super();
    this.data = initConfig;
  }

  setHost(host) {
    this.data = Object.assign({}, this.data, {apiHost: host});
    this.emit('app-config-update', this.data);
  }

}

module.exports = new ConfigStore();