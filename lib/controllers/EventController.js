var eventBus = require('../eventBus');
var observer = require('redux-observers').observer;

class EventController {
  constructor() {
    this.eventBus = eventBus;
    this.observer = observer;
  }

  emit(event, payload) {
    this.eventBus.emit(event, payload);
  }

  bind() {
    if( !this.handleEvents ) {
      console.warn('EventController attempting to wire events, but none given');
    }

    for( var fn in this.handleEvents ) {
      if( !this[fn] ) {
        console.warn(`EventController attempting to wire event: ${this.handleEvents[fn]}, but method ${fn} does not exist on class`);
        continue;
      }

      this._registerEvent(fn);
    }
  }

  _registerEvent(fn) {
    this.eventBus.on(this.handleEvents[fn], (payload, resolve, reject) => {
      try {
        var resp = this[fn].call(this, payload);

        if( resp && typeof resp === 'object' && typeof resp.then === 'function' ) {
          resp
            .then(() => resolve.call(null, arguments))
            .catch((error) => reject(error));
        } else {
          resolve(resp);
        }
      } catch(error) {
        reject(error);
      }
    });
  }

}

module.exports = EventController;