var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/marks');

class MarksController {

  get(pageId) {
    store.dispatch(
      actions.get(pageId)
    );

    return store.getState().collections.marks.byId[pageId];
  }

  select(pageId) {
    store.dispatch(
      actions.select(pageId)
    );

    return store.getState().collections.marks.selected;
  }

}

var controller = new MarksController();
require('./events')(controller);
module.exports = controller;
