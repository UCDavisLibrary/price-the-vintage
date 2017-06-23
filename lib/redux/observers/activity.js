var observer = require('redux-observers').observer;
var model = require('../../controllers/ActivityController');

var byId = observer(
  (state) => state.activity.byId,
  (dispatch, current, previous) => {
    for( var key in current ) {
      if( current[key] !== previous[key] ) {
        model.userActivityObserver({
          state: 'loaded',
          id : key,
          users : current[key]
        });
      }
    }
  }
);

module.exports = [byId];