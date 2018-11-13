import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-edit-form.html"

import "@polymer/iron-pages"
import "@polymer/paper-icon-button"
import "@polymer/paper-button"
import "@ucd-lib/cork-cancel-button"

import "./widgets/app-price-form-wine-type"
import "./app-price-edit-wine"
import "./app-price-edit-spirit"

export class AppPriceEditForm extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      testing : {
        type : Boolean,
        value : true
      },
      editMode : {
        type : Boolean,
        value : false
      },
      userState : {
        type : Object,
        value : () => ({})
      },
      pageId: {
        type : String,
        value : ''
      },
      catalogId: {
        type : String,
        value : ''
      },
      viewMode : {
        type : Boolean,
        value : false
      },
      canApprove : {
        type : Boolean,
        computed : '_computeCanApprove(editMode, userState)'
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    super();
    this._injectModel('AuthModel', 'MarksModel', 'AdminModel');
  }

  _computeCanApprove() {
    if( this.editMode && this.userState.user && this.userState.user.isAdmin ) {
      return true;
    }
    return false;
  }

  _onAuthUpdate(e) {
    this.userState = e;
  }

  _reset() {
    this.type = 'wine';

    this.$.spirit.reset();
    this.$.wine.reset();

    setTimeout(() => {
      this.$.wineType.focus();
    }, 50);
  }

  async _approve() {
    var data = this._getData();

    try {
      await this.AdminModel.approveMark(this.editMark.pageId, this.editMark.id, data);
    } catch(e) {
      console.error(e);
      alert('Failed to approve mark :(\n'+e.response.body.message);
    }
  
    this.fire('cancel');
  }

  _delete() {
    if( !confirm('Are you sure you want to delete this mark?!') ) return;
    this.fire('delete', this.editMark);
  }

  _getData() {
    var data = this.$[this.type].getData();
    data.type = this.type;

    if( this.editMode ) {
      data.xy = this.editMark.data.xy;
      data.created = this.editMark.data.created;
      data.updated = this.editMark.data.updated;
      data.user = this.editMark.data.user;
    } else {
      data.xy = [this.ll.lng, this.ll.lat];
    }

    if( data.casePrice ) {
      data.casePrice = parseFloat(data.casePrice);
    }
    if( data.price ) {
      data.price = parseFloat(data.price);
    }
    if( data.year ) {
      data.year = parseInt(data.year);
    }

    return data;
  }

  _save() {
    var data = this._getData();

    if( !this.editMode ) {
      this.fire('add-mark');
      this._addMark(this.pageId, data);
    } else {
      this.editMark.data = data;
      this._editMark(this.pageId, this.editMark.id, data);
    }

    this.emit('ui-set-location', this.catalogId + '/' + this.pageId);
    this.fire('cancel');
  }

  _cancel() {
    this.fire('cancel', {resetMark : true});
  }

  show(mark) {
    this._reset();

    this.editMode = true;
    this.editMark = mark;
    
    this.type = mark.data.type;

    this.$.wineType.value = this.type;

    if( mark.data.type === 'wine' ) this.$.wine.edit(mark.data);
    else this.$.spirit.edit(mark.data);
  }

  create(ll) {
    this.ll = ll;
    this.editMode = false;
    this._reset();
  }

}

window.customElements.define('app-price-edit-form', AppPriceEditForm);