import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-carousel-search.html"

export class AppPageCarouselSearch extends Mixin(PolymerElement)
  .with(EventBusMixin, ToggleStateMixin) {

  static get properties() {
    return {
      catalogId : {
        type : String,
        value : ''
      },
      searching : {
        type : Boolean,
        value : false
      },
      searchActive : {
        type : Boolean,
        value : false,
        reflectToAttribute : true
      },
      showResults : {
        type : Boolean,
        value : false
      },
      showTag : {
        type : Boolean,
        computed : '_computeShowTag(showResults, searching)',
        observer : '_onTagShow'
      },
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
    this._injectModel('AppStateModel', 'PagesModel');
  }

  _computeShowTag(showResults, searching) {
    return showResults || searching;
  }

  _onTagShow() {
    if( !this.showTag ) return;
    this.$.tag.resize();
  }

  _onAppStateUpdate(e) {
    if( e.searchText ) {
      this.searchActive = true;
      this.$.input.value = e.searchText;
    } else {
      this.searchActive = false;
      this.$.input.value = '';
    }
  }

  _onCatalogPagesSearchUpdate(e) {
    if( e.state === 'error' ) {
      this.searching = false;
      alert('Server error :(');
      return;
    }
    if( e.state !== 'loaded' ) return;

    this.searching = false;
    this.showResults = true;

    if( !this.$.input.value ) {
      return this.emit('ui-clear-search-catalog-pages');
    }

    this.total = e.payload.total;
  }

  _onActive() {
    if( !this.active ) return;

    if( this.searchActive ) {
      this._search();
    }
  }

  toggleActive() {
    this.searchActive = !this.searchActive;
    this.showResults = false;

    if( this.searchActive ) {
      this.$.input.value = '';
      setTimeout(() => {
        this.$.input.focus();
      }, 500);
    } else {
      this.emit('ui-clear-search-catalog-pages');
      this.AppStateModel.set({
        searchText : ''
      });
    }
  }

  _search() {
    this.showResults = false;

    if( !this.$.input.value ) {
      this.searching = false;
      return this.emit('ui-clear-search-catalog-pages');
    }

    this.searching = true;
    this.debounce('_searchAsync', this._searchAsync, 200);
  }

  _searchAsync() {
    if( !this.$.input.value ) {
      this.searching = false;
      this.showResults = true;
      return this.emit('ui-clear-search-catalog-pages');
    }

    this.AppStateModel.set({
      searchText : this.$.input.value
    });

    this.PagesModel.search({
      catalogId : this.catalogId,
      q : this.$.input.value,
    });
  }

}

window.customElements.define('app-page-carousel-search', AppPageCarouselSearch);