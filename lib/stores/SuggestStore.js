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
    this.emit(`suggest-${type}-update`, this.data[type]);
  }

}

module.exports = new SuggestStore();