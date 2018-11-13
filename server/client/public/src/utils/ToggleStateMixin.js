const ToggleStateMixin = subclass =>
  class ToggleState extends subclass {
    ready() {
      super.ready();
      var states = this.states || [];
      if( states.indexOf('state') === -1 ) {
        states.push('state');
      }
      for( var j = 0; j < states.length; j++ ) {
        var type = states[j];
        var eles = this.shadowRoot.querySelectorAll('['+type+']');
        for( var i = 0; i < eles.length; i++ ) {
          eles[i].style.display = 'none';
        }
      }
    }
    toggleState(state, type = 'state') {
      if( !this.shadowRoot ) {
        return console.warn('Attempting to toggle state before shadowRoot is ready');
      }
      var eles = this.shadowRoot.querySelectorAll('['+type+']');
      var i, ele;
      for( i = 0; i < eles.length; i++ ) {
        ele = eles[i];
        ele.style.display = (ele.getAttribute(type) === state) ? 'block' : 'none';
      }
    }
  }

if( typeof window !== 'undefined' ) {
  window.ToggleStateMixin = ToggleStateMixin;
}

module.exports = ToggleStateMixin;