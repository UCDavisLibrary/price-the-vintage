/**
 * Didn't want to import jQuery just for scroll animation.  This is used
 * By the carousel. 
 */
var interval = 25;
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