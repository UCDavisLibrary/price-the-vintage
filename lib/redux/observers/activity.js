var observer = require('redux-observers').observer;
var eventBus = require('../../eventBus');

var byId = observer(
  (state) => state.activity.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        eventBus.emit('user-activity-update', {
          id : key,
          users : current[key]
        });
      }
    }
  }
);

module.exports = [byId];