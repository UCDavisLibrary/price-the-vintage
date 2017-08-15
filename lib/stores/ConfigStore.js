var BaseStore = require('cork-app-utils').BaseStore;
var initConfig = require('../config');

class ConfigStore extends BaseStore {

  constructor() {
    super();
    this.data = initConfig;
    this.events = {
      APP_CONFIG_UPDATE : 'app-config-update'
    }
  }

  setHost(host) {
    this.data = Object.assign({}, this.data, {apiHost: host});
    this.emit(this.events.APP_CONFIG_UPDATE, this.data);
  }

}

module.exports = new ConfigStore();