var eventBus = require('../eventBus');
var store = require('../redux/store');

class BaseModel {

  get store() {
    return store;
  }

  get eventBus() {
    return eventBus;
  }

  emit(event, payload) {
    return new Promise((resolve, reject) => {
      this.eventBus.emit(event, payload, resolve, reject);
    });
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  getState() {
    return this.store.getState();
  }

}

module.exports = BaseModel;