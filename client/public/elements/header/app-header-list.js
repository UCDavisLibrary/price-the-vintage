import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-list.html"

import "@polymer/iron-icon"

class AppHeaderList extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      searchBoxActive : {
        type : Boolean,
        value : false
      },
      appState : {
        type : Object,
        value : function() {
          return {}
        }
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('CatalogsModel', 'AppStateModel');
  }

  ready() {
    super.ready();
    this.$.helpPopup = document.querySelector('app-mark-help-popup');
  }

  _searchCatalogs() {
    this.AppStateModel.set({
      searchText : this.$.input.value
    });

    return this.CatalogsModel.search({
      q : this.$.input.value,
      exact : this.appState.searchExact
    });
  }


  _toggleSearch() {
    this.searchBoxActive = !this.searchBoxActive;

    if( this.searchBoxActive ) {
      this.$.input.focus();
    } else {
      this.$.input.value = '';
      this._searchCatalogs();
    }

    this.AppStateModel.set({
      searchBoxActive : this.searchBoxActive
    });
  }

  _showHelp() {
    this.$.helpPopup.open();
  }
}

window.customElements.define('app-header-list', AppHeaderList);