class MultiTestRig {

  constructor(total, callback) {
    this.count = 0;
    this.total = total;
    this.callback = callback;
  }

  complete() {
    this.count++;
    if( this.count === this.total ) {
      this.callback();
    }
  }

}

module.exports = MultiTestRig;