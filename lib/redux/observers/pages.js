var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var byCatalogId = observer(
  (state) => state.collections.pages.byCatalogId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onPagesChange(current[key]);
      }
    }
  }
);

var byId = observer(
  (state) => state.collections.pages.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onPageChange(current[key]);
      }
    }
  }
);

var metadata = observer(
  (state) => state.collections.pages.metadata,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onPageMetadataChange(current[key]);
      }
    }
  }
);

var search = observer(
  (state) => state.collections.pages.search,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onPageSearchChange(current);
  }
);

module.exports = [byCatalogId, byId, metadata, search];