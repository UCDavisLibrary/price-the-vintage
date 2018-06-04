import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-name.html"

export class AppPriceFormName extends Mixin(PolymerElement)
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
    return html([template])
  }

  get SUGGEST_KEY() {
    return 'name-suggest'
  }

  ready() {
    super.ready();
    this.$.suggest.search = this.suggest.bind(this);
  }

  _useSuggestion(e) {
    var text = e.detail.value;
    var parts = this.$.input
      .value
      .split(' ')
      .filter(val => val.length ? true : false);

    parts[parts.length-1] = text;
    this.$.input.value = parts.join(' ');
  }

  // called from typeahead widget
  suggest(value) {
    return new Promise((resolve, reject) => {
      var parts = (value || '')
        .split(' ')
        .filter(val => val.length ? true : false);

      if( parts.length === 0 ) {
        return resolve([]);
      }

      this.suggestOn = parts[parts.length-1];

      if( this.suggestOn.length < 1 ) {
        return resolve([]);
      }

      this.resolveSuggest = resolve;

      this._suggestWineName(this.suggestOn);
    });
    
  }

  _cancelHide(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _onWineNameSuggestUpdate(e) {
    if( e.state !== 'loaded' ) return;
    if( !this.resolveSuggest ) return;

    var resp = e.payload;

    if( !resp.suggest ) return;
    if( !resp.suggest[this.SUGGEST_KEY] ) return;
    if( !resp.suggest[this.SUGGEST_KEY][0] ) return;

    var currentValue = e.query.toLowerCase();
    var suggestions = resp
                        .suggest[this.SUGGEST_KEY][0]
                        .options
                        .map((item) => item.text)
                        .reduce((arr, val) => {
                          val = val.toLowerCase();
                          if( arr.indexOf(val) === -1 && val !== currentValue ) {
                            arr.push(val);
                          } 
                          return arr;
                        }, []);
    
    this.resolveSuggest({results: suggestions, valueUsed: this.suggestOn});
    this.resolveSuggest = null;
  }

}

window.customElements.define('app-price-form-name', AppPriceFormName);