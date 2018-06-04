import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-input.html"

export class AppPriceFormInput extends PolymerElement {

  static get properties() {
    return {
      value : {
        type : String,
        value : '',
        notify : true
      },
      formattedValue : {
        type : String,
        computed : '_computeFormattedValue(value, isDollar)'
      },
      placeholder : {
        type : String,
        value : ''
      },
      type : {
        type : String,
        value : 'text'
      },
      label : {
        type : String,
        value : ''
      },
      active : {
        type : Boolean,
        value : false
      },
      viewMode : {
        type : Boolean,
        value : false
      },
      isDollar : {
        type : Boolean,
        value : false
      }
    };
  }

  static get template() {
    return html([template]);
  }

  _computeFormattedValue(value, isDollar) {
    if( !isDollar ) return value;
    if( value === '-' ) return value;
    return '$'+parseFloat(value || 0).toFixed(2);
  }

  _onFocus() {
    this.active = true;
  }

  _onBlur() {
    this.active = false;
  }

}

window.customElements.define('app-price-form-input', AppPriceFormInput);