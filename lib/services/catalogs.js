var request = require('superagent');
var getHost = require('./utils').getHost;

function search(params = {}, callback) {
  request
    .get(`${getHost()}/catalogs`)
    .query(params)
    .end(callback);
}

function get(id, callback) {
  request
    .get(`${getHost()}/catalogs/${id}`)
    .end(callback);
}

module.exports = {
  search, get
}