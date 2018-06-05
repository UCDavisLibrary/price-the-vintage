import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-wine-type.html"

import "@polymer/iron-icon"

export class AppPriceFormWineType extends PolymerElement {

  static get properties() {
    return {
      edit : {
        type : Boolean,
        value : false
      },
      value : {
        type : String,
        value : 'wine',
        notify : true
      },
      isWine : {
        type : Boolean,
        computed : '_updateIsWine(value)'
      }
    };
  }

  static get template() {
    return html([template]);
  }

  _updateIsWine() {
    return (this.value === 'wine');
  }

  _onKeyUp(e) {
    if( e.which !== 13 ) return;
    this._setValue(e);
  }

  _setValue(e) {
    this.value = e.currentTarget.getAttribute('value');

    e = {
      detail: {
        value: this.value
      },
      bubble: true,
      composed : true
    }
    this.dispatchEvent(new CustomEvent('change', e));
  }

  focus() {
    this.$.spirit.focus();
  }

}

window.customElements.define('app-price-form-wine-type', AppPriceFormWineType);