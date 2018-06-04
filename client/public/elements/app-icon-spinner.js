import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-icon-spinner.html"

export class AppIconSpinner extends PolymerElement {

  static get properties() {
    return {
      /**
       * Icon name to be applied to iron-icon.
       **/
      icon : {
        type : String,
        value : ''
      },

      /**
       * Should the icon spin?
       **/
      spin : {
        type : Boolean,
        value : false
      }
    }
  }

  static get template() {
    return html([template]);
  }

}

window.customElements.define('app-icon-spinner', AppIconSpinner);