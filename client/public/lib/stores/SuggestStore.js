var BaseStore = require('cork-app-utils').BaseStore;

class SuggestStore extends BaseStore {

  constructor() {
    super();
    this.data = {
      'wine-name' : {
        state : 'init'
      },
      country : {
        state : 'init'
      }
    };

    this.events = {};
    for( var key in this.data ) {
      var eName = key.toUpperCase().replace(/-/g, '_');
      this.events[`${eName}_SUGGEST_UPDATE`] = `${key}-suggest-update`;
    }
  }

  setWineName(data) {
    this.data['wine-name'] = data;
    this.emitUpdateEvent('wine-name');
  }

  setCountry(data) {
    this.data.country = data;
    this.emitUpdateEvent('country');
  }

  emitUpdateEvent(type) {
    this.emit(`${type}-suggest-update`, this.data[type]);
  }

}

module.exports = new SuggestStore();