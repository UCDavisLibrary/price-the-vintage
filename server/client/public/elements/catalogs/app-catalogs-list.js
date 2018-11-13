import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-catalogs-list.html"

import "@ucd-lib/cork-pagination"
import "@polymer/paper-spinner/paper-spinner-lite"

import "./app-catalogs-search-results"
import "./app-catalog-thumbnail"

class AppCatalogsList extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      /**
       * Current list of catalog results
       **/
      results : {
        type : Object,
        value : function() {
          return {
            init: true,
            start : 0,
            total : 0,
            results : []
          }
        }
      },
      loading : {
        type : Boolean,
        value : false
      },
      active : {
        type : Boolean,
        value : false,
        observer : '_onActive'
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

  ready() {
    super.ready();
    this.loading = true;
  }

  _onActive() {
    if( !this.active ) return;

    // on active, start a catalog search for current search state
    if( !this.results.init ) return;

    this.CatalogsModel.search({
      offset : 0,
      limit : 12
    });
  }

  _onCatalogSearchUpdate(e) {
    if( e.state === 'loading' ) {
      this.loading = true;
      return;
    }

    if( e.state !== 'loaded' ) return;

    this.results = e.payload;
    this.loading = false;
  }

  _onPageNav(e) {
    var offset = e.detail.startIndex;
    this._search(offset);
  }

  _onAppStateUpdate(e) {
    this.searchText = e.searchText;
  }

  _search(offset) {
    this.CatalogsModel.search({
        q : this.searchText,
        offset : offset
    });
  }

}
window.customElements.define('app-catalogs-list', AppCatalogsList);