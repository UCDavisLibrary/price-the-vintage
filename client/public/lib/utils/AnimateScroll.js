/**
 * Didn't want to import jQuery just for scroll animation.  This is used
 * By the carousel. 
 */
var interval = 25;
class AnimateScroll {

  run(start, stop, time, trigger) {
    this.trigger = trigger;
    this.current = start;
    this.start = start;
    this.stop = stop;
    this.stepLength = Math.abs(stop - start) / (time / interval);

    requestAnimationFrame(this.step.bind(this));
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

    requestAnimationFrame(this.step.bind(this));
  }
}

module.exports = AnimateScroll;