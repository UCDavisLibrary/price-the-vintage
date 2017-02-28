var bulk = require('bulk-require');
var path = require('path');

var App = bulk(path.join(__dirname, '..', 'lib'), [ '**/*.js']);
window.App = App;
window.EventBus = App.eventBus;