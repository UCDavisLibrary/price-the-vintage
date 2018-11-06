import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-editing.html"

import "@polymer/paper-icon-button"

class AppHeaderCatalogs extends Mixin(PolymerElement)
  .with(EventInterface) {
   
  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('CatalogModel', 'AppStateModel');
  }

  ready() {
    super.ready();
    
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this.$.title.style.width = (window.innerWidth - 132) + 'px';
  }

  async _onAppStateUpdate(e) {
    this.catalogId = e.catalogId;

    e = await this._getCatalog(e.catalogId)
    this._onCatalogUpdate(e);
  }

  _onCatalogUpdate(e) {
    if( this.catalogId !== e.id || e.state !== 'loaded' ) return;
    this.title = e.payload.title;
  }
}
window.customElements.define('app-header-catalogs', AppHeaderCatalogs);