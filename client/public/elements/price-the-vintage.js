import {PolymerElement, html} from "@polymer/polymer"
import template from "./price-the-vintage.html"

export class PriceTheVintage extends Mixin(PolymerElement)
  .with(EventBusMixin, AppStateMixin, AuthMixin, UserActivityMixin, CatalogsMixin) {

  static get properties() {
    return {
        /**
         * Controls the iron list selected page
         **/
        selectedSection : {
          type : String,
          value : ''
        }
      }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();

    this.bind = {
      'ui-set-location' : '_setWindowUrl'
    };
  }

  ready() {
    this.active = true;
    super.ready();
  }

  _onAuthUpdate(e) {
    this.authState = e;

    if( this.route && e.state === 'loggedIn' && this.route.catalogId && this.route.pageId ) {
      this._setUserActivity(this.route.catalogId, this.route.pageId);
    }
  }

  _setWindowUrl(hash) {
    window.location.hash = hash;
  } 

}

window.customElements.define('price-the-vintage', PriceTheVintage);