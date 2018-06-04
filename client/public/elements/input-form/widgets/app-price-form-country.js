import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-country.html"

import "./app-price-form-input"
import "@ucd-lib/cork-typeahead"

class AppPriceFormCountry extends Mixin(PolymerElement)
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
      }
    }
  }

  static get template() {
    return html([template]);
  }

  get SUGGEST_KEY() {
    return 'name-suggest'
  }

  ready() {
    super.ready();
    this.$.suggest.search = this.suggest.bind(this);
  }

  _useSuggestion(e) {
    // var text = e.detail.value;
    // var parts = this.$.input
    //   .value
    //   .split(' ')
    //   .filter(val => val.length ? true : false);

    // parts[parts.length-1] = text;
    this.$.input.value = e.detail.value;
  }

  // called from typeahead widget
  suggest(value) {
    return new Promise((resolve, reject) => {
      this.suggestOn = value;
      if( this.suggestOn.length < 1 ) {
        return resolve([]);
      }
      this.resolveSuggest = resolve;

      this._suggestCountry(this.suggestOn);
    });
  }

  _cancelHide(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _onCountrySuggestUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( !this.resolveSuggest ) return;

    this.resolveSuggest({results: e.payload, valueUsed: this.suggestOn});
    this.resolveSuggest = null;
  }

}

window.customElements.define('app-price-form-country', AppPriceFormCountry);