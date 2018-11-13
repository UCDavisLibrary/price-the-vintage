import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header.html"

import "@polymer/iron-pages"

import "./app-header-list"
import "./app-header-catalogs"
import "./app-header-page"
import "./app-header-editing"
import "./app-header-admin"
import "./app-header-user"
import "./app-auth-header-button"

class AppHeader extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }
  
  constructor() {
    super();
    this._injectModel('AppStateModel', 'AppStateModel');
  }
  
  _onAppStateUpdate(e) {
    if ( e.section === 'home' ) {
      this.section = 'list';
    } else {
      this.section = e.section;
    }
  }
}

window.customElements.define('app-header', AppHeader);