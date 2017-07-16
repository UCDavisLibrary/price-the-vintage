var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var byId = observer(
  (state) => {
    return state.collections.marks.byId;
  },
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onMarkChange(current[key]);
      }
    }
  }
);


var approvedByPage = observer(
  (state) => state.collections.marks.approvedByPage,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onApprovedMarkChange(current[key]);
      }
    }
  }
);

var pendingSearch = observer(
  (state) => state.collections.marks.pendingSearch,
  (dispatch, current, previous) => {
    ObserverEventEmitter.onPendingMarkSearchChange(current);
  }
);


module.exports = [byId, pendingSearch, approvedByPage];