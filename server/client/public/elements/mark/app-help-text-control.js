import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-marker.html"
import "@ucd-lib/cork-tag"

L.Control.HelpTextControl = L.Control.extend({
  onAdd: function(map) {
      var control = L.DomUtil.create('app-help-text-control');
      return control;
  },
  onRemove: function(map) {}
});

L.control.helpTextControl = function(opts) {
  return new L.Control.HelpTextControl(opts);
}

class AppHelpTextControl extends PolymerElement {

  static get template() {
    return html([template]);
  }

  hide() {
    this.style.display = 'none';
    var event = new CustomEvent('help-text-dismissed', {bubbles: true, composed: true});
    this.dispatchEvent(event);
  }

}
window.customElements.define('app-help-text-control', AppHelpTextControl);