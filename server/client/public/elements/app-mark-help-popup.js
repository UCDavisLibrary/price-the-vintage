import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-mark-help-popup.html"

import "./paper-dialog"

export class AppMarkHelpPopup extends PolymerElement {

  static get template() {
    return html([template]);
  }

  ready() {
    super.ready();
    
    if( !window.localStorage.getItem('first-catalog-viewing') ) {
      this.open();
      window.localStorage.setItem('first-catalog-viewing', 'true');
    } 
  }

  open() {
    this.$.helpPopup.open();
  }

  close() {
    this.$.helpPopup.close();
  }

}

window.customElements.define('app-mark-help-popup', AppMarkHelpPopup);