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
    this._injectModel('UserActivityModel', 'PagesModel', 'CatalogsModel', 'InterestedPartyModel');
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
    if( e.id !== this.catalog['@id'] ) return;
    this.userCount = Object.keys(e.users || {}).length;
    this.showUserCount = (this.userCount > 0 ) ? true : false;
  }

  _getUserActivity() {
    if( !this._isCatalogIdSet() ) return;
    this.UserActivityModel.listen(this.catalog['@id']);
  }

  async _getCatalogPages() {
    if( !this._isCatalogIdSet() ) return;
    let e = await this.CatalogsModel.get(this.catalog['@id']);
    this._onCatalogPagesUpdate(e);
  }

  _isCatalogIdSet() {
    if( !this.catalog ) return false;
    if( !this.catalog['@id'] ) return false;
    return true;
  }

  _onCatalogPagesUpdate(e) {
    if( e.id === this.catalog['@id'] && 
        e.state === 'loaded' && this.pendingPagesLoad ) {

      this.pendingPagesLoad = false;

      if( e.payload.length === 0 ) {
        return alert('This catalog has no pages :(');
      }

      // var page = e.payload.pages[0];
      this.emit('ui-set-location', this.catalog['@id']+'/'+0);
    }
  }

  _createImgUrl(catalog) {
    if( !catalog ) return '';
    if( !catalog.image ) return '';

    this.$.image.style.display = 'none';
    let currentId = catalog['@id'];;
    var url = 'https://digital.ucdavis.edu'+catalog.image.url+'/svc:iiif/full/175,/0/default.jpg';
    var img = new Image();

    img.onload = function() {
      if( this.catalog['@id'] !== currentId ) return;

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
    if( !catalog ) return '';
    if( !catalog.image ) return '';
    return 'https://digital.ucdavis.edu'+catalog.image.url+'/svc:iiif/full/350,/0/default.jpg';
  }

  async _onUpdate() {
    if( !this.catalog ) return;
    this.catalog.pages_finished = 0;
    // this.catalog.pages = 0;
    let fullCatalog = (await this.CatalogsModel.get(this.catalog['@id'])).payload;

    this._getUserActivity();
    this.percentComplete = this.catalog.pages_finished+' / '+fullCatalog.pages.length;
  }

  _sendInterestedPartyResponse() {
    if( !this._isCatalogIdSet() ) return;
    super._sendInterestedPartyResponse(
      this.catalog['@id'],
      ['activity']
    )
  }

  _onInterestedPartyRequest(e) {
    if( !this._isCatalogIdSet() ) return;
    this._sendInterestedPartyResponse();
  }

}
window.customElements.define('app-catalog-thumbnail', AppCatalogThumbnail);
