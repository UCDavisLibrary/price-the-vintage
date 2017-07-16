var observers = []
          .concat(require('./appState'))
          .concat(require('./catalogs'))
          .concat(require('./pages'))
          .concat(require('./marks'))
          .concat(require('./auth'))
          .concat(require('./activity'));

module.exports = observers;