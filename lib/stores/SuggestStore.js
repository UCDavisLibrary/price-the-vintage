var BaseStore = require('cork-app-utils').BaseStore;

class SuggestStore extends BaseStore {

  constructor() {
    super();
    this.data = {
      'wine-name' : {
        state : 'init'
      } 
    };
  }

  setWineName(data) {
    this.data['wine-name'] = data;
    this.emitUpdateEvent('wine-name');
  }

  emitUpdateEvent(type) {
    this.emit('suggest-wine-name-update', this.data[type]);
  }

}

module.exports = new SuggestStore();