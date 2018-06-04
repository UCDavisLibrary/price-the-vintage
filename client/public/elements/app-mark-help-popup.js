import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-mark-help-popup.html"

export class AppMarkHelpPopup extends PolymerElement {

  static get template() {
    return html([template]);
  }

  open() {
    this.$.helpPopup.open();
  }

  close() {
    this.$.helpPopup.close();
  }

}

window.customElements.define('app-mark-help-popup', AppMarkHelpPopup);