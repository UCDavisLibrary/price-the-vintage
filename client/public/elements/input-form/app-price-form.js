import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form.html"

/* <link rel="import" href="app-price-form-voting.html">
<link rel="import" href="app-price-edit-form.html">
<link rel="import" href="app-price-edit-wine.html">
<link rel="import" href="app-price-edit-spirit.html">
<link rel="import" href="widgets/app-price-form-wine-type.html">
<link rel="import" href="widgets/app-price-form-input.html">
<link rel="import" href="widgets/app-price-form-select.html">
<link rel="import" href="widgets/app-price-form-name.html">
<link rel="import" href="widgets/app-price-form-section.html">
<link rel="import" href="widgets/app-price-form-country.html"> */

class AppPriceForm extends Mixin(PolymerElement)
  .with(EventBusMixin, AuthMixin, AppStateMixin) {

  static get properties() {
    return {
      addSpace : {
        type : Boolean,
        value : false
      },
      userState : {
        type : Object,
        value : function() {
          return {}
        }
      },
      pageId: {
        type : String,
        value : ''
      },
      viewMode : {
        type : Boolean,
        value : false
      },
      open : {
        type : Boolean,
        value : false
      }
    }
  }

  _onAuthUpdate(e) {
    this.userState = e;
    this._updateViewMode();
  }

  ready() {
    super.ready();
    window.addEventListener('keyup', this._onKeyUp.bind(this));
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _onKeyUp(e) {
    if( !this.open || e.keyCode !== 27 ) return;
    this.hide();
    this.fire('cancel', {resetMark: true});
  }

  _resize() {
    if( window.innerWidth < 720 ) {
      var h = Math.floor(window.innerHeight * 0.5);

      this.style.maxHeight = h+'px';

      var maxFormSize = 72 * 7;
    } else {
      this.style.maxHeight = '';
    }
  }

  _onAppStateUpdate(e) {
    this.catalogId = e.catalogId;
    this.pageId = e.pageId;

    if( !e.editingMark && !e.creatingMark && !e.viewingMark ) {
      this.hide();
    }
  }

  _headerCancel() {
    this.fire('cancel', {resetMark: true});
    this.hide();
  }

  show(mark) {
    if( !mark ) return;
    this.mark = mark;
    this.creating = false;

    this._updateViewMode();

    this.$.form.show(mark);
    this._show();
  }

  _updateViewMode() {
    this.viewMode = true;

    if( this.creating ) {
      this.viewMode = false;
      return;
    }

    if( !this.mark ) return;

    if( !this.mark.data.approved &&
        this.userState && 
        this.userState.user &&
        (this.userState.user.isAdmin || 
        this.mark.data.user === this.userState.user.uid) ) {

      this.viewMode = false;
    }
  }

  create(ll) {
    this.mark = null;
    this.creating = true;

    this._updateViewMode();
    
    this.$.form.create(ll);
    this._show();
  }

  _show() {
    this.open = true;
    this.style.display = 'block';
  }

  hide() {
    this.open = false;
    this.style.display = 'none';
  }
}

window.customElements.define('app-price-form', AppPriceForm);