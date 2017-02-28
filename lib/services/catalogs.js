var request = require('superagent');
var getHost = require('./utils').getHost;

function search(params = {}, callback) {
  request
    .get(`${getHost()}/catalogs`)
    .query(params)
    .end(callback);
}

module.exports = {
  search
}