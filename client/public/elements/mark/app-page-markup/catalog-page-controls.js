/***
 * Handle all mark actions for app-page-markup
 * */
const PageMarkup_CatalogPageMixin = subclass =>

class PageMarkup_CatalogPageControls extends subclass {

  static get properties() {
    return {
      selectedPage : {
        type : Object,
        value : null
      },

      selectedPageId : {
        type : String,
        value : ''
      },

      selectedCatalogId : {
        type : String,
        value : ''
      },
      
      loadedCatalog : {
        type : Object,
        value : function() {
          return {
            id : '',
            state : ''
          }
        }
      }
    }
  }

  _getCatalogPages() {
    return super._getCatalogPages(this.selectedCatalogId);
  }

  // _onCatalogPagesUpdate(e) {
  //   if( e.id !== this.selectedCatalogId ) return;

  //   this.loadedCatalog.id = this.selectedCatalogId;
  //   this.loadedCatalog.state = e.state;

  //   if (e.state !== 'loaded') return;
    
  //   this.pages = e.payload;
  //   this._checkLoaded();
  // }

  _selectPage() {
    this.selectedPage = null;

    if( !this.selectedPageId ) {
      if( this.pages.length > 0 ) {
        this._setAppState({
          pageId : this.pages[0].page_id
        });
      } else {
        alert('Catalog has no pages :(');
      }
      return;
    }

    for( var i = 0; i < this.pages.length; i++ ) {
      if( this.pages[i].page_id === this.selectedPageId ) {
        this.selectedPage = this.pages[i];
        break;
      }
    }

    if( !this.selectedPage ) {
      alert('Unknown page id: '+this.selectedPageId);
    }
  }

  _getCatalogPage() {
    if( !this.selectedCatalogId ) return;
    return super._getCatalogPage(this.selectedCatalogId);
  }

}