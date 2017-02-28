var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

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


module.exports = [byId];