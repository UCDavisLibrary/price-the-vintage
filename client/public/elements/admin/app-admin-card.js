import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-admin-card.html"

import "@polymer/paper-material"
import "@polymer/iron-image"

class AppAdminCard extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      data : {
        type : Object,
        value : null
      },
      lastUpdated : {
        type : String,
        computed : '_computeLastUpdated(data)'
      },
      imgUrl : {
        type : String,
        computed : '_computeImgUrl(data, apiHost)'
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this.addEventListener('click', e => this.goToPage());
  }

  goToPage() {
    this.emit('ui-set-location', this.data.catalog_id+'/'+this.data.page_id);
  }

  _computeImgUrl() {
    if( !this.data ) return '';
    return APP_CONFIG.apiHost + '/media?select=thumbnail2x_png&media_id=eq.' + this.data.page_id;
  }

  _computeLastUpdated() {
    if( !this.data ) return '';
    return 'Updated '+new Date(this.data.updated).toLocaleString();
  }
}
window.customElements.define('app-admin-card', AppAdminCard);