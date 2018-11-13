import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-admin.html"

import "@polymer/paper-icon-button"

class AppHeaderAdmin extends PolymerElement {
  static get template() {
    return html([template]);
  }
}
window.customElements.define('app-header-admin', AppHeaderAdmin);