/**
 * Wire up our redux store with middleware, reducers and observers.
 */
var redux = require('redux');

var middleware = redux
                    .applyMiddleware(
                      require('./middleware/api')
                      ,require('./middleware/logging')
                    )

var store = redux
              .createStore(
                  require('./reducers'),
                  middleware
                );

store.initObserver = function() {
  require('./observers')(store);
}

setTimeout(function(){
  store.initObserver();
}, 0);

module.exports = store;