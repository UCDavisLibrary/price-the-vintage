import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-admin-markup-control.html"

L.Control.AdminControl = L.Control.extend({
  onAdd: function(map) {
      var control = L.DomUtil.create('app-admin-markup-control');
      return control;
  },

  onRemove: function(map) {
      // Nothing to do here
  }
});

L.control.adminControl = function(opts) {
  return new L.Control.AdminControl(opts);
}


class AppAdminMarkupControl extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      show : {
        type : Boolean,
        value : false
      },
      isEditable : {
        type : Boolean,
        value : true
      },
      isCompleted : {
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
    this._injectModel('AuthModel', 'AppStateModel', 'PagesModel', 'AdminModel');
  }

  _onAuthUpdate(e) {
    this.authState = e;

    if( e.state === 'loggedIn' && e.user.isAdmin ) {
        this.show = true;
    } else {
        this.show = false;
    }
  }

  async _onAppStateUpdate(e) {
    this.pageId = e.pageId;
    if( !this.pageId ) return;

    e = await this.PagesModel.get(this.pageId)
    this._onCatalogPageUpdate(e);
  }

  _onCatalogPageUpdate(e) {
    if( e.state !== 'loaded' || e.id !== this.pageId ) return;

    this.page = e;

    this.isEditable = e.payload.editable;
    this.isCompleted = e.payload.completed;

    if( !this.isEditable || this.isCompleted ) {
      this.emit('ui-show-mark-noop-popup');
    }
  }

  async _adminCompletedPage() {
    try {
      await this.AdminModel.pageCompleted(this.pageId, !this.page.payload.completed);
    } catch(e) {
      console.error(e);
      alert('Failed to update page :( ');
    }
  }

  async _adminIgnorePage() {
    try {
      await this.AdminModel.ignorePage(this.pageId, this.page.payload.editable);
    } catch(e) {
      console.error(e);
      alert('Failed to update page :( ');
    }
  }
}
window.customElements.define('app-admin-markup-control', AppAdminMarkupControl);