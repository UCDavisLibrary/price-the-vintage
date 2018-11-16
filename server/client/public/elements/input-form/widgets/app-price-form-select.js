import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-select.html"

import "@ucd-lib/cork-select"

export class AppPriceFormSelect extends PolymerElement {

  static get properties() {
    return {
      value : {
        type : String,
        value : '',
        observer : '_onValueChange',
        notify : true
      },
      icon : {
        type : String,
        value : ''
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
      options : {
        type : Array,
        value : function() {
          return [];
        }
      }
    };
  }

  static get template() {
    return html([template]);
  }

  _onValueChange() {
    setTimeout(() => {
      this.icon = this.$.select.icon;
    }, 50);
  }

  _onFocus() {
    this.active = true;
  }

  _onBlur() {
    this.active = false;
  }
}

window.customElements.define('app-price-form-select', AppPriceFormSelect);