var observer = require('cork-app-utils').ReduxObserver;
var ObserverEventEmitter = require('./ObserverEventEmitter');

var byId = observer(
  (state) => state.activity.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        ObserverEventEmitter.onUserActivityChange({
          state: 'loaded',
          id : key,
          users : current[key]
        });
      }
    }
  }
);

module.exports = [byId];