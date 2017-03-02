var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var search = observer(
  (state) => state.collections.catalogs.search,
  (dispatch, current, previous) => {
    eventBus.emit('search-catalogs-update', current);
  }
);

var byId = observer(
  (state) => state.collections.catalogs.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        eventBus.emit('catalog-update', current[key]);
      }
    }
  }
);


module.exports = [search, byId];