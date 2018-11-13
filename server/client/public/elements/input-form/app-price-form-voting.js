import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-form-voting.html"

export class AppPriceFormVoting extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get properties() {
    return {
      mark : {
        type : Object,
        value : function() {
          return {};
        }
      },
      count : {
        type : Number,
        value : 0
      },
      userState : {
        type : Object,
        value : function() {
          return {}
        }
      },
      showVoting : {
        type : Boolean,
        value : false
      }
    }
  }

  static get template() {
    return html([template]);
  }

  constructor() {
    this._injectModel('AuthModel', 'MarksModel');
  }

  async ready() {
    super.ready();
    this._onAuthUpdate(await this._getAuthState());
  }

  _onAuthUpdate(e) {
    this.userState = e;
    this._updateShowVoting();
  }

  _voteOnMark(vote) {
    return MarksModel.votePending(
      this.userState.user.uid,
      this.mark.pageId, 
      this.mark.id, 
      vote
    );
  }

  _onMarksUpdate(e) {
    if(this.mark.id !== e.id || e.state !== 'loaded') return;
    this.show(e);
  }

  _upVote() {
    this._voteOnMark('up');
  }

  _downVote() {
    this._voteOnMark('down');
  }

  show(mark) {
    if( !mark.data || mark.deleted ) return;

    this.count = 0;
    this.mark = mark;

    var eles = this.shadowRoot.querySelectorAll('.voting');
    for( var i = 0; i < eles.length; i++ ) {
      eles[i].classList.remove('voted');
    }

    var votes = this.mark.data.votes;
    var user = this.userState.user || {};
    this.userVote = '';

    if( votes ) {
      for( var key in votes ) {
        // TODO: remove
        if( typeof votes[key] === 'string' ) continue;

        // TODO: load user factor, so we know what to score.

        if( user.uid === key ) {
          this.userVote = votes[key].type;
        }
        if( votes[key].type === 'up' ) this.count += votes[key].factor || 1;
        else if( votes[key].type === 'down' ) this.count -= votes[key].factor || 1;
      }
    }

    if( this.userVote ) {
      this.$.voteCount.classList.add('voted');
      if( this.userVote === 'up' ) {
        this.$.upVote.classList.add('voted');
      } else if( this.userVote === 'down' ) {
        this.$.downVote.classList.add('voted');
      }
    }

    this._updateShowVoting();
  }

  _updateShowVoting() {
    if( this.userState.user && 
        this.userState.user.uid && 
        !this.userState.user.isAnonymous &&
        (this.mark && this.mark.data && !this.mark.data.approved ) ) {
      this.showVoting = true;
    } else {
      this.showVoting = false;
    }
  }

}

window.customElements.define('app-price-form-voting', AppPriceFormVoting);