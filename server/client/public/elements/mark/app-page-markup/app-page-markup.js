import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-markup.html"

import "../app-page-carousel"
import "../app-admin-markup-control"
import "../app-help-text-control"
import "../app-marker"
import "../../input-form/app-price-form"

import PageMarkup_CatalogPageMixin from "./catalog-page-controls"
import PageMarkup_MapMixin from "./map-controls"
import PageMarkup_MarkMixin from "./mark-controls"

import leafletCss from "leaflet/dist/leaflet.css"
import leafletDrawCss from "leaflet-draw/dist/leaflet.draw.css"

class AppPageMarkup extends Mixin(PolymerElement)
  .with(EventInterface, ToggleStateMixin,
        // flowing are partial mixins to break up this very big element
        PageMarkup_MarkMixin, PageMarkup_CatalogPageMixin, PageMarkup_MapMixin) {

  static get properties() {
    return {
      active : {
        type : Boolean,
        value : false,
        observer : '_activeObserver'
      },

      // should be one of: view, edit or create
      viewState : {
        type : String,
        value : 'view'
      },

      // for this to be set, everything must be rendered as this page.
      renderedPageId : {
        type : String,
        value : '--'
      }
    }
  }

  static get template() {
    return html([
      `<style>${leafletCss}</style>`+
      `<style>${leafletDrawCss}</style>`+
      template
    ])
  }

  constructor() {
    super();

    this._injectModel(
      'AuthModel', 'AppStateModel', 
      'PagesModel', 'MarksModel', 'CatalogsModel', 
      'InterestedPartyModel'
    );

    this.bind = {
      'ui-show-mark-noop-popup' : '_showPopup'
    }
  }

  ready() { 
    super.ready();
  }

  /**
   * @method _activeObserver
   * @description bound to active property
   */
  _activeObserver() {
    if( !this.active ) {
      if( this.addMarker && this.drawTool ) {
        this._removeTmpMark();
        this.addMarker = null;
        this.drawTool.disable();
        this.drawTool.enable();
      }
      return;
    }
    
    this._render();
  }

  _onAuthUpdate(e) {
    this.userState = e;
    console.log(e);
    this._renderMapControls();
  }

  _onAppStateUpdate(appState) {
    if( !appState.catalogId ) return;
    this.appState = appState;

    this.selectedCatalogId = appState.catalogId;
    this.selectedPageIndex = appState.pageIndex;  
    
    // helper
    this.viewState = '';
    if( appState.viewingMark ) this.viewState = 'view';
    else if( appState.creatingMark ) this.viewState = 'create';
    else if( appState.editingMark ) this.viewState = 'edit';

    this._render();
  }

  _render() {
    this.debounce('_render', () => this._renderAsync(), 50);
  }

  async _renderAsync() {
    this._hidePopup();

    // we need to be active and have a selected catalog
    if( !this.active ) return;
    if( !this.selectedCatalogId ) return;

    // if we are not creating a mark, make sure we remove tmp mark
    if( this.viewState !== 'create' ) {
      console.log('TODO: _removeTmpMark')
      // this._removeTmpMark()
    }

    // don't repeat yourself.  if the currently rendered page is
    // the same as the selected page there is nothing todo
    if( this.selectedPageIndex !== -1 &&
        this.selectedPageIndex === this.renderedPageIndex && 
        this.selectedCatalogId === this.renderedCatalogId ) {
      // render map controls visibility states
      this._renderMapControls();

      // render edit form state
      this._renderForm();

      // make sure map size is good
      this._updateMapSize();
      return;
    }

    // we haven't rendered current catalog/page yet but we are working on it.
    if( this.loading ) return;
    this.loading = true;

    // show we are loading
    this.toggleState('loading');

    // TODO: adding page info query
    this.pages = (await this.CatalogsModel.get(this.selectedCatalogId)).payload.pages;

    // make sure we have a page selected
    this._selectPage();

    // url only had a catalog id, go select first page
    // this will trip a state change and redo the render loop
    // so we will go ahead and quit out
    // there could have also been a bad page id passed
    if( !this.selectedPage ) {  
      return;
    }

    let state = await this.PagesModel.get(this.selectedPage['@id']);
    this.crowdData = state.payload;

    await this._loadImage();

    // render the leaflet map and add controls
    this._renderMap();

    // render controls visibility states
    this._renderMapControls();

    // go grab pending and active marks for page
    // this will trigger _onMarksUpdate and will render a selected
    // mark when it's loaded
    this._loadMarks();

    this.loading = false;
    this.renderedPageIndex = this.selectedPageIndex;
    this.renderedCatalogId = this.selectedCatalogId;
  }

  // called from _onMarksUpdate after selected mark is loaded
  _renderForm() {
    if( this.viewState === 'create' ) {
      // handle from the pendingAddMark from the draw control
      if( this.pendingAddMark ) {
        this.$.priceItem.create(this.pendingAddMark._latlng);
        this.marksLayer.addLayer(this.pendingAddMark);
        this.addMarker = this.pendingAddMark;
        this.pendingAddMark = null;
      }
    } else if( this.viewState === 'edit' || this.viewState === 'view' ) {
      this.$.priceItem.show(this.marks[this.appState.markId]);
    } else {
      this.$.priceItem.hide();
    }
  }

  _onInterestedPartyRequest(e) {
    if( !this.selectedPageId ) return;
    this._sendInterestedPartyResponse(e);
  }

  _sendInterestedPartyResponse(e) {
    this.InterestedPartyModel.onResponse({
      id: this.selectedPageId,
      types : [e.TYPES.PAGE]
    });
  }

  _hidePopup() {
    this.$.nothingToDo.style.display = 'none';
  }

  _showPopup() {
    this.$.nothingToDo.style.display = 'block';
  }
}

window.customElements.define('app-page-markup', AppPageMarkup);