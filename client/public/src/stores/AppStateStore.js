var BaseStore = require('cork-app-utils').BaseStore;

class AppStateStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      firebaseConnection : false,
      section : '',
      editingMark : false,
      viewingMark : false,
      catalogSearchPopupDisplayed : false 
    }

    this.events = {
      APP_STATE_UPDATE : 'app-state-update'
    }
  }

  set(state) {
    this.data = Object.assign({}, this.data, state);
    this.emit(this.events.APP_STATE_UPDATE, this.data);
  }

}

module.exports = new AppStateStore();