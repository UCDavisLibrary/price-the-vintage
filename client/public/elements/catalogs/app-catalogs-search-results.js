import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-catalogs-search-results.html"

class AppCatalogsSearchResults extends Mixin(PolymerElement)
  .with(EventInterface, ToggleStateMixin) {

  static get properties() {
    return {
      total : {
        type : Number,
        value : 0
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('AppStateModel', 'CatalogsModel');
  }

  _searchCatalogs() {
    this.AppStateModel.set({
      searching : true,
      searchExact : this.$.typeToggle.checked
    });

    this.CatalogsModel.search({
      q : this.searchText,
      exact : this.$.typeToggle.checked
    });
  }

  _onCatalogSearchUpdate(e) {
    if( !e.state !== 'loaded' ) return;
    this.total = e.payload.results.total;
  }

  _onAppStateUpdate(e) {
    this.searchText = e.searchText;

    if( e.searching ) {
      this.toggleState('loading');
    } else {
      this.toggleState('loaded');
    }

    this.style.display = e.searchBoxActive ? 'block' : 'none';
  }

}
window.customElements.define('app-catalogs-search-results', AppCatalogsSearchResults);