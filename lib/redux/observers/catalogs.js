var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var search = observer(
  (state) => state.collections.catalogs.search,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onCatalogSearchChange(current);
  }
);

var byId = observer(
  (state) => state.collections.catalogs.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onCatalogChange(current[key]);
      }
    }
  }
);

module.exports = [search, byId];