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
  .with(EventBusMixin, AuthMixin, AppStateMixin, PagesMixin, AdminMixin) {

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

  _onAuthUpdate(e) {
    this.authState = e;

    if( e.state === 'loggedIn' && e.user.isAdmin ) {
        this.show = true;
    } else {
        this.show = false;
    }
  }

  _onAppStateUpdate(e) {
    this.pageId = e.pageId;
    if( !this.pageId ) return;

    this._getCatalogPage().then((e) => this._onCatalogPageUpdate(e));
  }

  _getCatalogPage() {
    return super._getCatalogPage(this.pageId);
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

  _adminCompletedPage() {
    super._adminCompletedPage(this.pageId, !this.page.payload.completed)
        .catch((e) => {
          console.error(e);
          alert('Failed to update page :( ');
        });
  }

  _adminIgnorePage() {
    super._adminIgnorePage(this.pageId, this.page.payload.editable)
        .catch((e) => {
          console.error(e);
          alert('Failed to update page :(');
        });
  }
}
window.customElements.define('app-admin-markup-control', AppAdminMarkupControl);