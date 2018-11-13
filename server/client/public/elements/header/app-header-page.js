import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-page.html"

import "@polymer/paper-icon-button"
import "../app-mark-help-popup"

class AppHeaderPage extends Mixin(PolymerElement)
  .with(EventInterface) {
   
  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('AuthModel', 'CatalogsModel', 'AppStateModel');
  }

  ready() {
    super.ready();

    window.addEventListener('resize', this._resize.bind(this));
    this._resize();

    this.$.helpPopup = document.querySelector('app-mark-help-popup');
  }

  _onCatalogUpdate(e) {
    if( e.state !== 'loaded' || e.id !== this.catalogId ) {
      return;
    }

    this.catalog = e.payload;
    this.title = this.catalog.title;
  }

  _onAuthUpdate(e) {
    this.userState = e;
  }

  _resize() {
    // 80 px is for padding
    var size = window.innerWidth - 232;
    if( window.innerWidth > 768 ) {
      size -= 80;
    }

    this.$.title.style.width = size + 'px';
  }

  _showHelp() {
    this.$.helpPopup.open();
  }

  _hideHelp() {
    this.$.helpPopup.close();
  }

  async _onAppStateUpdate(e) {
    this.catalogId = e.catalogId;
    if( !this.catalogId ) return;

    e = await this.CatalogsModel.get(this.catalogId);
    this._onCatalogUpdate(e);
  }

  _back() {
    this.emit('ui-set-location', '/');
  }

}

window.customElements.define('app-header-page', AppHeaderPage);