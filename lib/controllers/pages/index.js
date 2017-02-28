var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/pages');

function PagesController() {
  
  this.get = function(catalogId) {
    store.dispatch(
      actions.get(catalogId)
    );

    return store.getState().collections.pages.byId[catalogId];
  }

  this.select = function(id) {
    store.dispatch(
      actions.select(id)
    );

    return store.getState().collections.pages.selected;
  }
}

var controller = new PagesController();
require('./events')(controller);
module.exports = controller;