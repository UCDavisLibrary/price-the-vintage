import {PolymerElement, html} from "@polymer/polymer"
import template from "./price-the-vintage.html"

import "leaflet"
import "leaflet-draw"

import "@polymer/paper-header-panel"
import "@polymer/paper-toolbar"
import "@polymer/paper-button"
import "@polymer/iron-pages"
import "@polymer/iron-icons/social-icons"

import "@ucd-lib/cork-app-utils"

import "@ucd-lib/cork-style"
import "./styles/shared-styles"

import "../src"
import "../src/utils/AnimateScroll"
import "../src/utils/ToggleStateMixin"

import "./header/app-header"
import "./catalogs/app-catalogs-list"
import "./admin/app-admin-interface"
import "./mark/app-page-markup/app-page-markup"

class PriceTheVintage extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
        /**
         * Controls the iron list selected page
         **/
        selectedSection : {
          type : String,
          value : ''
        }
      }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();

    this._injectModel('AuthModel', 'UserActivityModel', 'AppStateModel');

    this.bind = {
      'ui-set-location' : '_setWindowUrl'
    };
  }

  ready() {
    this.active = true;
    super.ready();
  }

  _onAppStateUpdate(e) {
    if( (e.section || '').match(/.*-mark$/) ) {
      this.section = 'catalog';
    } else {
      this.selectedSection = e.section;
    }
  }

  _onAuthUpdate(e) {
    this.authState = e;

    if( this.route && e.state === 'loggedIn' && this.route.catalogId && this.route.pageId ) {
      this.UserActivityModel.set(this.route.catalogId, this.route.pageId);
    }
  }

  _setWindowUrl(hash) {
    window.location.hash = hash;
  } 

}

window.customElements.define('price-the-vintage', PriceTheVintage);