var observer = require('redux-observers').observer;
var controller = require('../../controllers/MarksController');

var byId = observer(
  (state) => {
    return state.collections.marks.byId;
  },
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.markUpdateObserver(current[key]);
      }
    }
  }
);


var approvedByPage = observer(
  (state) => state.collections.marks.approvedByPage,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        controller.approvedMarkObserver(current[key]);
      }
    }
  }
);

var pendingSearch = observer(
  (state) => state.collections.marks.pendingSearch,
  (dispatch, current, previous) => {
    controller.pendingSearchObserver(current);
  }
);


module.exports = [byId, pendingSearch, approvedByPage];