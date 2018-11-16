import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-auth-header-button.html"

import "@polymer/iron-icon"
import "@polymer/paper-icon-button"
import "@ucd-lib/cork-popup-button"

class AppAuthHeaderButton extends Mixin(PolymerElement)
  .with(EventInterface, ToggleStateMixin) {

  static get properties() {
    return {
      user : {
        type : Object,
        value : null
      },

      isAdmin : {
        type : Boolean,
        value : false
      },

      isAnonymous : {
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
    this._injectModel('AuthModel', 'AppStateModel', 'CatalogsModel', 'PagesModel');
  }

  ready() {
    super.ready();
    this.toggleState(this.auth ? this.auth.state : 'pending');
  }

  _onAuthUpdate(e) {
    this.auth = e;
    this.hasPhoto = false;
    this.isAdmin = false;
    this.isAnonymous = false;

    if( this.auth.user ) {
      this.isAnonymous = this.auth.user.isAnonymous;

      if( this.auth.user.photoURL ) {
        this.photo = this.auth.user.photoURL;
        this.hasPhoto = true;
      }

      if( this.auth.user.roles  && this.auth.user.roles.indexOf('admin') > -1 ) {
        this.isAdmin = true;
      }

      this.username = this.auth.user.name || this.auth.user.email || 'Anonymous';
    }

    this.toggleState(this.auth.state);
  }

  /**
   * @method _onLoginClicked
   * @description bound to login click events
   */
  _onLoginClicked() {
    this.AuthModel.loginAuth0();
  }

  /**
   * @method _onLogoutClicked
   * @description bound to logout btn click events
   */
  _onLogoutClicked() {
    this.AuthModel.logout();
  }

  _onAppStateUpdate(e) {
    this.appState = e;
  }

  _onCatalogSelectedUpdate(e) {
    this.catalogId = e.id;
  }

  _onCatalogPageSelectedUpdate(e) {
    this.pageId = e.id;
  }

  _onLogout() {
    this.$.menuBtn.hide();
    this.AuthModel.logout();
  }

  _switch() {
    this._onLogout();
    this.AuthModel.loginAuth0();
  }

  _gotToAdmin() {
    this.emit('ui-set-location', 'admin');
    this.$.menuBtn.hide();
  }

}
window.customElements.define('app-auth-header-button', AppAuthHeaderButton);