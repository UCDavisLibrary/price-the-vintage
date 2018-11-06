import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-user.html"

import "@polymer/iron-icon"

class AppHeader extends PolymerElement {

  static get template() {
    return html([template]);
  }
}

window.customElements.define('app-header-user', AppHeader);