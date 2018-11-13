import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header-editing.html"

import "@polymer/paper-icon-button"

class AppHeaderEditing extends Mixin(PolymerElement)
  .with(EventInterface) {
      
  static get properties() {
    return {
      userState : {
        type : Object,
        value : function() {
          return {};
        }
      },
      title : {
        type : String,
        value : ''
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('AuthModel', 'AppStateModel');
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to AppStateModel
   */
  _onAppStateUpdate(e) {
    if( e.editingMark ) {
      this.title = 'Edit Mark';
    } else if( e.viewingMark ) {
      this.title = 'View Mark';
    }

    this.catalogId = e.catalogId;
    this.pageId = e.pageId;
  }

  /**
   * @method _onAuthUpdate
   * @description bound to AuthModel
   */
  _onAuthUpdate(e) {
    this.userState = e;
  }

  _cancelEdit() {
    this.emit('ui-set-location', this.catalogId + '/' + this.pageId);
  }
}
window.customElements.define('app-header-editing', AppHeaderEditing);