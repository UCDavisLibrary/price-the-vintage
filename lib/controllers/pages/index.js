var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/pages');
var firebase = require('../../firebase')();

/**
 * Controller for handling page and catalog events
 */
class PagesController {

  constructor() {
    this.log = false;
    this.refs = {};
  }
  
  /**
   * Get a catalog page by id.  Loads if necessary.
   * 
   * @param {string} pageId - page Id
   */
  get(pageId) {
    store.dispatch(
      actions.get(pageId)
    );

    return store.getState().collections.pages.byId[pageId] || {};
  }

  /**
   * Get a catalog by id.  Loads if necessary.
   * 
   * @param {string} catalogId - catalog Id
   */
  getPages(catalogId) {
    store.dispatch(
      actions.getPages(catalogId)
    );

    return store.getState().collections.pages.byCatalogId[catalogId] || {};
  }


  /**
   * Select a catalog by id.
   * 
   * @param {string} id - catalog Id
   */
  select(id) {
    store.dispatch(
      actions.select(id)
    );

    return store.getState().collections.pages.selected;
  }

  /**
   * Get page metadata. Currently this is just a total number of marks count.
   * This will wire up Firebase listener
   * 
   * @param {string} pageId - page to grab data for 
   */
  getMetadata(pageId) {
    this.listen(pageId);
    return store.getState().collections.pages.metadata[pageId];
  }

  /**
   * Listen to metadata for given page
   * 
   * @param {string} pageId - page to grab data for 
   */
  listen(pageId) {
    if( this.refs[pageId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
    }

    var ref = firebase.database().ref(`pages/${pageId}`);
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

  /**
   * Remove firebase reference for given page
   * 
   * @param {string} pageId - page to stop listening to
   */
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

  /**
   * After interested parties request, this will be called.  It will let you know
   * all the resource ids that elements are still interested in.  You are free to 
   * remove any Firebase Reference that is NOT in this list.
   * 
   * @param {object} interested - hash of interested resource ids
   */
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