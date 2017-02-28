var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/catalogs');

function CatalogsController() {
  
  this.search = function(params) {
    store.dispatch(
      actions.search(params)
    );

    return store.getState().collections.catalogs.search;
  }

  this.select = function(id) {
    store.dispatch(
      actions.select(id)
    );

    return store.getState().collections.catalogs.selected;
  }
}

var controller = new CatalogsController();
require('./events')(controller);
module.exports = controller;