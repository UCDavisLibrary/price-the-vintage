import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-catalog-thumbnail.html"

import "@polymer/paper-material"
import "@polymer/iron-icon"
import "@polymer/paper-spinner/paper-spinner-lite"

class AppCatalogThumbnail extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      catalog : {
        type : Object,
        value : function() {
          return {};
        },
        observer : '_onUpdate'
      },
      imgUrl : {
        type : String,
        computed : '_createImgUrl(catalog)'
        // observer : '_setImgUrl'
      },
      imgSrcSet : {
        type : String,
        computed : '_createSrcSet(catalog)'
      },
      userCount : {
        type : Number,
        value : 0
      },
      showUserCount : {
        type : Boolean,
        value : false
      },
      percentComplete : {
        type : String,
        value : '',
      },
      loading: {
        type : Boolean,
        value : true
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('UserActivityModel', 'PagesModel', 'InterestedPartyModel', 'ConfigModel');
  }

  ready() {
    super.ready();
    this.addEventListener('click', e => {
      this.pendingPagesLoad = true;
      this._getCatalogPages(e)
    });

    this._resize = this._resize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._resize();
    window.addEventListener('resize', this._resize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._resize);
  }

  _resize() {
    if( window.innerWidth <= 600 ) {
      this.updateStyles({
        '--thumbnail-height': '144px',
        '--thumbnail-width': '131px'
      });
    } else {
      this.updateStyles({
        '--thumbnail-height': '192px',
        '--thumbnail-width': '175px'
      });
    }
  }

  _onUserActivityUpdate(e) {
    if( !this._isCatalogIdSet() ) return;
    if( e.id !== this.catalog.catalog_id ) return;
    this.userCount = Object.keys(e.users || {}).length;
    this.showUserCount = (this.userCount > 0 ) ? true : false;
  }

  _getUserActivity() {
    if( !this._isCatalogIdSet() ) return;
    this.UserActivityModel.get(this.catalog.catalog_id);
  }

  async _getCatalogPages() {
    if( !this._isCatalogIdSet() ) return;
    let e = await this.CatalogsModel.get(this.catalog.catalog_id)
    this._onCatalogPagesUpdate(e);
  }

  _isCatalogIdSet() {
    if( !this.catalog ) return false;
    if( !this.catalog.catalog_id ) return false;
    return true;
  }

  _onCatalogPagesUpdate(e) {
    if( e.id === this.catalog.catalog_id && 
        e.state === 'loaded' && this.pendingPagesLoad ) {

      this.pendingPagesLoad = false;

      if( e.payload.length === 0 ) {
        return alert('This catalog has no pages :(');
      }

      var page = e.payload[0];
      this.emit('ui-set-location', this.catalog.catalog_id+'/'+page.page_id);
    }
  }

  _createImgUrl(catalog) {
    this.$.image.style.display = 'none';
    var url = this.apiHost + '/media?select=thumbnail_png&media_id=eq.' + catalog.catalog_id;
    var img = new Image();

    img.onload = function() {
      setTimeout(() => {
        this.$.image.innerHTML = `<img 
          class="grid-card-img" 
          src="${url}" 
          srcset="${url} 1x, ${this.imgSrcSet} 2x" 
          alt="${this.catalog.title}" />`;
      }, 25);
      
      this.$.image.innerHTML = '';
      this.$.image.style.display = 'block';
      this.loading = false;
    }.bind(this);
    
    img.src = url;
    return url;
  }

  _createSrcSet(catalog) {
    return this.apiHost + '/media?select=thumbnail2x_png&media_id=eq.' + catalog.catalog_id;
  }

  _onUpdate() {
    if( !this.catalog ) return;

    this._getUserActivity();
    this.percentComplete = this.catalog.pages_finished+' / '+this.catalog.pages;
  }

  _sendInterestedPartyResponse() {
    if( !this._isCatalogIdSet() ) return;
    super._sendInterestedPartyResponse(
      this.catalog.catalog_id,
      ['activity']
    )
  }

  _onInterestedPartyRequest(e) {
    if( !this._isCatalogIdSet() ) return;
    this._sendInterestedPartyResponse();
  }

}
window.customElements.define('app-catalog-thumbnail', AppCatalogThumbnail);
