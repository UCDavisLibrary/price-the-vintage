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
        value : '0'
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

  _selectPage() {
    this.selectedPage = null;
    
    if( this.selectedPageIndex === -1 ) {
      if( this.pages.length > 0 ) {
        this.AppStateModel.set({
          pageIndex : this.pages[0].position
        });
      } else {
        alert('Catalog has no pages :(');
      }
      return;
    }

    for( var i = 0; i < this.pages.length; i++ ) {
      if( this.pages[i].position === this.selectedPageIndex ) {
        this.selectedPage = this.pages[i];
        this.selectedPageId = this.selectedPage['@id'];
        break;
      }
    }

    if( !this.selectedPage ) {
      alert('Unknown page index: '+this.selectedPageIndex);
    }
  }

  _getCatalogPage() {
    if( !this.selectedCatalogId ) return;
    return this.PagesModel.getPagesCrowdData(this.selectedCatalogId);
  }

}

export default PageMarkup_CatalogPageMixin;