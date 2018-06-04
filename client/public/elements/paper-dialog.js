import {PolymerElement, html} from "@polymer/polymer"
import template from "./paper-dialog.html"

export class PaperDialog extends PolymerElement {

  static get properties() {
    return {
      active : {
        type : Boolean,
        value : false,
        reflectToAttribute : true
      }
    }
  }

  static get template() {
    return html([template]);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('keyup', (e) => {
      if( this.active && e.which === 27 ) {
        this.close();
      }
    })

    var buttons = this.querySelector('.buttons');
    if( !buttons ) return;
    buttons.style.textAlign = 'right';
    buttons.style.marginTop = '15px';
  }

  open() {
    document.body.style.overflow = 'hidden';
    this.active = true;
  }

  close() {
    document.body.style.overflow = '';
    this.active = false;
  }
}
window.customElements.define('paper-dialog', PaperDialog);