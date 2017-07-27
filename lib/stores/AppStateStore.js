var BaseStore = require('cork-app-utils').BaseStore;

class AppStateStore extends BaseStore {

  constructor() {
    this.data = {
      section : '',
      editingMark : false,
      viewingMark : false,
      catalogSearchPopupDisplayed : false 
    }
  }

  set(state) {
    this.data = Object.assign({}, this.data, state);
    this.emit('app-state-update', this.data);
  }

}

module.exports = new AppStateStore();