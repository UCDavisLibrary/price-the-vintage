var eventBus = require('../eventBus');

class BufferedEvents {

  constructor() {
    this.BUFFER_TIME = 50;
    this.buffers = {};
  }

  emit(e, data) {
    if( this.buffers[e] ) {
      this.buffers[e] = data;
      return;
    }

    this.buffers[e] = data;
    this.setTimeout(e);
  }

  setTimeout(e) {
    setTimeout(() => {
      this.trigger(e);
    }, this.BUFFER_TIME);
  }

  trigger(e) {
    if( !this.buffers[e] ) return;
    eventBus.emit(e, this.buffers[e]);
    this.buffers[e] = null;
  }

}

module.exports = BufferedEvents;