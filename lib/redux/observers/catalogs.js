var observer = require('redux-observers').observer;
var controller = require('../../controllers/CatalogsController');

var search = observer(
  (state) => state.collections.catalogs.search,
  (dispatch, current, previous) => {
    controller.searchObserver(current);
  }
);

var byId = observer(
  (state) => state.collections.catalogs.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.catalogUpdateObserver(current[key]);
      }
    }
  }
);

var selected = observer(
  (state) => state.collections.catalogs.selected,
  (dispatch, current, previous) => {
    controller.selectedObserver(current);
  }
);


module.exports = [search, byId, selected];