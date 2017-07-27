var bulk = require('bulk-require');
var path = require('path');

require('../lib/init')();
var App = bulk(path.join(__dirname, '..', 'lib'), [ '**/*.js']);

window.App = App;
window.EventBus = require('cork-app-utils').EventBus;
window.BufferedEvents = App.utils.bufferedEvents;
window.AnimateScroll = App.utils.AnimateScroll;