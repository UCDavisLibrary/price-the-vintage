import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-carousel.html"

import "./app-page-carousel-search"

class AppPageCarousel extends Mixin(PolymerElement)
  .with(EventBusMixin, ToggleStateMixin, AppStateMixin, CatalogsMixin, PagesMixin, ConfigMixin) {

  static get properties() {
    return {
      catalogId: {
        type: String,
        value : ''
      },
      open : {
        type : Boolean,
        value : true,
        reflectToAttribute : true
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this.bind = {
      'ui-clear-search-catalog-pages' : '_clearSearch'
    }
  }

  ready() {
    super.ready();

    this.toggleState('loading', 'loading-state');
    this.animateScroll = new AnimateScroll();
  }

  _onActive() {
    if( !this.active ) return;
    this._render();
  }

  _onAppStateUpdate(appState) {
    this.selected = appState.pageId;
    this.catalogId = appState.catalogId;

    this._render();
  }

  _render() {
    if( !this.selected || !this.catalogId ) return;

    this._getCatalogPages()
        .then((e) => this._onCatalogPagesUpdate({
            id: this.catalogId,
            state: 'loaded',
            payload: e
          }));
  }


  _getCatalogPages() {
    return super._getCatalogPages(this.catalogId);
  }

  _onCatalogPagesUpdate(e) {
    if( e.id !== this.catalogId ) return false;

    this.debounce('_onCatalogPagesUpdate', () => {
      this._asyncOnCatalogPagesUpdate(e);
    }, 200);
  }

  _asyncOnCatalogPagesUpdate(e) {
    this.toggleState(e.state, 'loading-state');
    if( e.state !== 'loaded' ) return;

    if( e.id === this.renderedPageId ) return;
    this.renderedPageId = e.id;

    this.pages = e.payload;
    this.pageOffset = this.pages[0].page;
    this._updateButtons();
    this._updateScroll();
    this._setPageMatches();
  }

  _onCatalogUpdate() {
    this._updateScroll();
  }

  _onCatalogPagesSearchUpdate(e) {
    if( e.state !== 'loaded' ) return;

    this.searchResults = e.payload.results;
    this._setPageMatches();
  }

  _setPageMatches() {
    if( !this.searchResults ) return;
    
    this.pages.forEach(function(page, index) {
      var matched = this._getResultsPageById(this.searchResults, page.page_id);
      this.set('pages.'+index+'.noMatch', !matched ? true : false);
    }.bind(this));

    // make sure the first page is showing
    var page = 0;
    while( !this._getResultsPageById(this.searchResults, this._getPageIdFromPageNumber(page)) ) {
      page++;
      if( page === this.pages.length ) {
        return;
      }
    }
    
    this.emit('ui-set-location', this.catalogId + '/' + this._getPageIdFromPageNumber(page));
  }

  _onSelectedCatalogPageUpdate(pageId) {
    this.selected = pageId;
    this._updateScroll();
    this._updateButtons();
  }

  _updateScroll() {
    if( !this.pages || !this.selected ) return;

    var currentPage;
    for( var i = 0; i < this.pages.length; i++ ) {
      if( this.selected === this.pages[i].page_id ) {
        currentPage = this.pages[i];
        break;
      }
    }

    if( currentPage ) {
      var hw = Math.floor( window.innerWidth / 2);
      var position = 114 * (currentPage.page - this.pageOffset);

      var start = this.$.scrollPanel.scrollLeft;
      var stop;

      if( position > hw ) {
        stop = position - hw + 95;
      } else {
        stop = 0;
      }

      this.animateScroll.run(start, stop, 300, function(scroll){
        this.$.scrollPanel.scrollLeft = scroll;
      }.bind(this));

    }
  }

  _getPageNumber() {
    if( !this.pages ) return -1;

    for( var i = 0; i < this.pages.length; i++ ) {
      if( this.pages[i].page_id === this.selected ) {
        return this.pages[i].page;
      }
    }
  }

  _getPageIdFromPageNumber(page) {
    if( !this.pages ) return -1;

    for( var i = 0; i < this.pages.length; i++ ) {
      if( this.pages[i].page === page ) {
        return this.pages[i].page_id;
      }
    }
  }

  _updateButtons() {
    var page = this._getPageNumber();
    
    this.$.previousBtn.classList.remove('disabled');
    this.$.nextBtn.classList.remove('disabled');
    
    if( this.pages && page == this.pages[0].page ) {
      this.$.previousBtn.classList.add('disabled');
    }

    if( this.pages && page === this.pages[this.pages.length-1].page ) {
      this.$.nextBtn.classList.add('disabled');
    }
  }

  _previous(e) {
    if( e.currentTarget.classList.contains('disabled') ) return;
    var page = this._getPageNumber()-1;
    
    if( this.searchResults ) {
      while( !this._getResultsPageById(this.searchResults, this._getPageIdFromPageNumber(page)) ) {
        page--;
        if( page === -1 ) {
          return;
        }
      }
    }

    this._onNavBtnClick(page);
  }

  _next(e) {
    if( e.currentTarget.classList.contains('disabled') ) return;
    var page = this._getPageNumber()+1

    if( this.searchResults ) {
      while( !this._getResultsPageById(this.searchResults, this._getPageIdFromPageNumber(page)) ) {
        page++;
        if( page === this.pages.length ) {
          return;
        }
      }
    }

    this._onNavBtnClick(page);
  }

  _onNavBtnClick(page) {
    this.selected = this._getPageIdFromPageNumber(page);
    this._updateScroll();
    this._updateButtons();

    var pages = this.shadowRoot.querySelectorAll('app-page-item');

    for( var i = 0; i < pages.length; i++ ) {
      pages[i].onTmpSelectPageUpdate(this.selected);
    }
  }

  _select(e) {
    this.emit('ui-set-location',  this.catalogId+'/'+e.currentTarget.page.page_id);
  }

  _clearSearch() {
    this.searchResults = null;

    this.pages.forEach(function(page, index){
      this.set('pages.'+index+'.noMatch', false);
    }.bind(this));
  }

  _getResultsPageById(results, id) {
    for( var i = 0; i < results.length; i++ ) {
      if( results[i].page_id === id ) {
        return results[i];
      }
    }
    return null;
  }

  toggle() {
    this.open = !this.open;
  }
}

window.customElements.define('app-page-carousel', AppPageCarousel);