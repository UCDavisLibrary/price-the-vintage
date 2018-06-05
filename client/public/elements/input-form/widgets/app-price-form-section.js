import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-section.html"

import "@ucd-lib/cork-typeahead"
import "./app-price-form-input"

export class AppPriceFormSection extends Mixin(PolymerElement)
  .with(EventMixin, SuggestMixin) {
      
  static get properties() {
    return {
      value : {
        type : String,
        value : '',
        notify : true
      },
      placeholder : {
        type : String,
        value : '',
        notify : true
      },
      label : {
        type : String,
        value : ''
      },
      viewMode : {
        type : Boolean,
        value : false
      },
      pageId : {
        type : String,
        value : ''
      }
    }
  }

  static get template() {
    return html([template]);
  }

  ready() {
    super.ready();
    this.$.suggest.search = this.suggest.bind(this);
  }

  _onFocus() {
    this.$.suggest._searchAsync('');
  }

  _useSuggestion(e) {
    this.$.input.value = e.detail.value;
  }

  // called from typeahead widget
  suggest(value) {
    return new Promise((resolve, reject) => {
      this._suggestPageSection(this.pageId)
          .then(results => resolve(results))
          .catch(e => reject(e));
    });
    
  }
}
window.customElements.define('app-price-form-section', AppPriceFormSection);