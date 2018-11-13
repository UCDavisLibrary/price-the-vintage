import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-edit-spirit.html"

import "./widgets/app-price-form-name"
import "./widgets/app-price-form-country"
import "./widgets/app-price-form-input"

export class AppPriceEditSpirit extends PolymerElement {

  static get properties() {
    return {
      pageId : {
        type : String,
        value : null,
      },
      viewMode : {
        type : Boolean,
        value : false,
      }
    }
  }

  static get template() {
    return html([template]);
  }

  reset() {
    this.$.name.value = '';
    this.$.price.value = '';
    this.$.casePrice.value = '';
    this.$.country.value = '';
    this.$.spiritType.value = '';
  }

  edit(data) {
    this.$.name.value = data.name || this.getEmptyValue();
    this.$.spiritType.value = data.spiritType || this.getEmptyValue();
    this.$.country.value = data.country || this.getEmptyValue();
    this.$.price.value = this.getDollarValue(data.price);
    this.$.casePrice.value = this.getDollarValue(data.casePrice);
  }

  getDollarValue(val) {
    if( !val ) return this.getEmptyValue();
    return parseFloat(val).toFixed(2);
  }

  getEmptyValue(val) {
    return this.viewMode ? '-' : (val || '');
  }

  getData() {
    return {
       name : this.$.name.value,
       spiritType : this.$.spiritType.value,
       country : this.$.country.value,
       price : this.$.price.value,
       casePrice : this.$.casePrice.value,
    };
  }
}

window.customElements.define('app-price-edit-spirit', AppPriceEditSpirit);