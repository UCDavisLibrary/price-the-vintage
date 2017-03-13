var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/pages');
var firebase = require('../../firebase')();

class PagesController {

  constructor() {
    this.log = true;
    this.refs = {};
  }
  
  get(catalogId) {
    store.dispatch(
      actions.get(catalogId)
    );

    return store.getState().collections.pages.byId[catalogId];
  }

  select(id) {
    store.dispatch(
      actions.select(id)
    );

    return store.getState().collections.pages.selected;
  }

  getMetadata(pageId) {
    this.listen(pageId);
    return store.getState().collections.pages.metadata[pageId];
  }

  listen(pageId) {
    if( this.refs[pageId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
    }

    var dbns = store.getState().config.dbns;
    var ref = firebase.database().ref(`${dbns}/pages/${pageId}`);
    this.refs[pageId] = ref;

    store.dispatch(
      actions.setMetadata(pageId, 'loading')
    );

    ref.on('value', (dataSnapshot, prevChildKey) => {
      var metadata = dataSnapshot.val();

      store.dispatch(
        actions.setMetadata(pageId, 'loaded', metadata)
      );
    });
  }

  unlisten(pageId) {
    if( !this.refs[pageId] ) return;

    if( this.log ) {
      console.warn(`Unlistening to page metadata: ${pageId}`);
    }

    store.dispatch(
      actions.clearMetadata(pageId)
    );

    this.refs[pageId].off();
    delete this.refs[pageId];
  }

  cleanup(interested) {
    for( var id in this.refs ) {
      if( !interested[id] ) {
        this.unlisten(id);
      }
    } 
  }

}

var controller = new PagesController();
require('./events')(controller);
module.exports = controller;