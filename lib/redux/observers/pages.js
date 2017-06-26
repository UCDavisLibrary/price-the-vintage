var observer = require('redux-observers').observer;
var controller = require('../../controllers/PagesController');

var byCatalogId = observer(
  (state) => state.collections.pages.byCatalogId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.pagesUpdateObserver(current[key]);
      }
    }
  }
);

var byId = observer(
  (state) => state.collections.pages.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.pageUpdateObserver(current[key]);
      }
    }
  }
);

var metadata = observer(
  (state) => state.collections.pages.metadata,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.metadataUpdateObserver(current[key]);
      }
    }
  }
);

var selected = observer(
  (state) => state.collections.pages.selected,
  (dispatch, current, previous) => {
    controller.selectedObserver(current);
  }
);

var search = observer(
  (state) => state.collections.pages.search,
  (dispatch, current, previous) => {
    controller.searchObserver(current);
  }
);

module.exports = [byCatalogId, byId, selected, metadata, search];