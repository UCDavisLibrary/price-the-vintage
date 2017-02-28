var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var search = observer(
  (state) => state.collections.catalogs.search,
  (dispatch, current, previous) => {
    eventBus.emit('search-catalogs-update', current);
  }
);


module.exports = [search];