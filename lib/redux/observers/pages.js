var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var byCatalogId = observer(
  (state) => state.collections.pages.byCatalogId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        eventBus.emit('catalog-pages-update', current[key]);
      }
    }
  }
);

var byId = observer(
  (state) => state.collections.pages.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        eventBus.emit('catalog-page-update', current[key]);
      }
    }
  }
);

var metadata = observer(
  (state) => state.collections.pages.metadata,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        eventBus.emit('page-metadata-update', current[key]);
      }
    }
  }
);

var selected = observer(
  (state) => state.collections.pages.selected,
  (dispatch, current, previous) => {
    eventBus.emit('selected-catalog-update', current);
  }
);

var search = observer(
  (state) => state.collections.pages.search,
  (dispatch, current, previous) => {
    eventBus.emit('search-catalog-pages-update', current);
  }
);

module.exports = [byCatalogId, byId, selected, metadata, search];