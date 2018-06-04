import {PolymerElement, html} from "@polymer/polymer"

export class AppShadowLine extends PolymerElement {

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 6px;
          pointer-events: none;
          position: absolute;
        }

        :host([top]) {
          box-shadow: inset 0px -10px 10px -10px var(--cork-shadow, rgba(0, 0, 0, 0.4));
          margin-top: -6px;
        }

        :host([bottom]) {
          box-shadow: inset 0px -10px 10px -10px var(--cork-shadow, rgba(0, 0, 0, 0.4));
        }
      </style>`
  }
}

window.customElements.define('app-shadow-line', AppShadowLine);
