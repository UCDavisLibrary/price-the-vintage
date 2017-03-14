
var interval = 15;
class AnimateScroll {

  constructor() {
    this.timer = -1;
  }

  run(start, stop, time, trigger) {
    if( this.timer ) {
      clearTimeout(this.timer);
    }

    this.trigger = trigger;
    this.current = start;
    this.start = start;
    this.stop = stop;
    this.stepLength = Math.abs(stop - start) / (time / interval);
    console.log(this.stepLength);

    this.timer = setTimeout(this.step.bind(this), interval);
  }

  step() {
    if( this.start <= this.stop ) {
      this.current += this.stepLength;
      if( this.stop <= this.current ) {
        return this.trigger(this.stop);
      }
    } else {
      this.current -= this.stepLength;
      if( this.stop >= this.current ) {
        return this.trigger(this.stop);
      }
    }

    this.trigger(this.current);

    this.timer = setTimeout(this.step.bind(this), interval);
  }
}

module.exports = AnimateScroll;