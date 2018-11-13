import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-country.html"

import "./app-price-form-input"
import "@ucd-lib/cork-typeahead"

class AppPriceFormCountry extends Mixin(PolymerElement)
  .with(EventInterface) {
  
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

  constructor() {
    super();
    this._injectModel('SuggestModel');
  }

  get SUGGEST_KEY() {
    return 'name-suggest'
  }

  ready() {
    super.ready();
    this.$.suggest.search = this.suggest.bind(this);
  }

  _useSuggestion(e) {
    this.$.input.value = e.detail.value;
  }

  // called from typeahead widget
  suggest(value) {
    this.suggestOn = value;
    if( this.suggestOn.length < 1 ) {
      return [];
    }
    this.resolveSuggest = resolve;

    return this.SuggestModel.country(this.suggestOn);
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