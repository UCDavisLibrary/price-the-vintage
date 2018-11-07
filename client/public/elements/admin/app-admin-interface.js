import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-admin-interface.html"

import "@ucd-lib/cork-pagination"
import "@polymer/paper-spinner/paper-spinner-lite"

import "./app-admin-card"

class AppAdminInterface extends Mixin(PolymerElement)
  .with(EvenInterface, ToggleStateMixin) {

  static get properties() {
    return {
      itemsPerPage : {
        type : Number,
        value : 10
      },

      results : {
        type : Array,
        value : function() {
          return [];
        }
      }
    };
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('AdminModel');
  }

  _onActive() {
    if( !this.active ) return;
    this.AdminModel.searchPendingMarkPages(0, this.itemsPerPage);
  }

  _onAdminSearchUpdate(e) {
    this.toggleState(e.state);
    if( e.state !== 'loaded' ) return;
    
    this.start = e.payload.start;
    this.total = e.payload.total;
    this.results = e.payload.results;
  }

  _onNav(e) {
    this.AdminModel.searchPendingMarkPages(e.detail.startIndex, this.itemsPerPage);
  }

}

window.customElements.define('app-admin-interface', AppAdminInterface);