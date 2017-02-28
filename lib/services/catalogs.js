var request = require('superagent');
var getHost = require('./utils').getHost;

function list(callback) {
  request
    .get(`${getHost()}/catalogs`)
    end(callback);
}