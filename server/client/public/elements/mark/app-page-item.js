import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-item.html"

class AppPageItem extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      catalogId : {
        type : String,
        value : ''
      },
      page : {
        type : Object,
        value : function() {
          return {};
        },
        observer : '_onUpdate'
      },
      imgUrl : {
        type : String,
        computed : '_createImgUrl(page)'
      },
      userCount : {
        type : Number,
        value : 0
      },
      showUserCount : {
        type : Boolean,
        value : false
      },
      showNotEditable : {
        type : Boolean,
        value : false
      },
      showCompleted : {
        type : Boolean,
        value : false
      },
      
      markCount : {
        type : Number,
        value : 0
      },
      showMarkCount : {
        type : Boolean,
        value : false
      },
      showDetails : {
        type : Boolean,
        value : false,
        computed : '_showDetails(showUserCount, showMarkCount, showNotEditable, showCompleted)'
      }
    }
  }

  constructor() {
    super();
    this._injectModel(
      'AppStateModel', 'UserActivityModel', 
      'InterestedPartyModel', 'PagesModel'
    );
  }

  _createImgUrl(page) {
    return APP_CONFIG.damsApi.host + page.image.url + '/svc:iiif/full/,128/0/default.jpg';
  }
  
  _showDetails(showUserCount, showMarkCount, showNotEditable, showCompleted) {
    return showUserCount || showMarkCount || showNotEditable || showCompleted;
  }
  
  _onUpdate() {
    if( !this.page ) return;
    if( !this.page.page_id ) return;
    this.showCompleted = false;
    this.showMarkCount = false;
    this.showNotEditable = false;
    if( !this.page.editable ) {
      this.showNotEditable = true;
    } else if( this.page.completed ) {
      this.showCompleted = true;
    } else {
      this.showMarkCount = (this.page.marks > 0);
    }
    this._getAppState()
        .then((appState) => this._onAppStateUpdate(appState));
    this.debounce('_onUpdateAsync', function() {
      this._onUpdateAsync();
    }.bind(this), 50);
  }
  _onCatalogPageUpdate(e) {
    if( !this.page ) return;
    if( !this.page.page_id ) return;
    if( e.state === 'loaded' && this.page.page_id === e.id ) {
      this.page = e.payload;
    }
  }
  _onUpdateAsync() {
    this._getUserActivity(this.page.page_id)
        .then((e) => this._onUserActivityUpdate(e));
  }
  _onAppStateUpdate(appState) {
    var selectedPageId = appState.pageId;
    if( this.active && this.page && this.$.root ) {
      if( this.page.page_id+'' == selectedPageId ) {
        this.$.root.classList.add('current-page');
      } else {
        this.$.root.classList.remove('current-page');
      }
    } else {
      this.$.root.classList.remove('current-page');
    }
    this.onTmpSelectPageUpdate(selectedPageId);
  }
  onTmpSelectPageUpdate(selectedPageId) {
    if( this.active && this.page && this.$.root ) {
      if( this.page.page_id+'' == selectedPageId ) {
        this.$.root.classList.add('selected');
      } else {
        this.$.root.classList.remove('selected');
      }
    } else {
      this.$.root.classList.remove('selected');
    }
  }
  _onInterestedPartyRequest() {
    if( this.catalogId && this.page && this.page.page_id  ) {
      this._sendInterestedPartyResponse(this.page.page_id, ['activity']);
    }
  }
  _onUserActivityUpdate(e) {
    if( e.id !== this.page.page_id ) return;
    this.debounce('_onUserActivityUpdate', function(){
      this._onUserActivityUpdateAsync(e);
    }, 200);
  }
  _onUserActivityUpdateAsync(e) {
    var activeUsers = e.users;
    this.userCount = Object.keys(e.users).length;
    this.showUserCount = (this.userCount > 0 ) ? true : false;
  }
}

window.customElements.define('app-page-item', AppPageItem);