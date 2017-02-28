var request = require('superagent');
var getHost = require('./utils').getHost;

function get(catalogId, callback) {
  request
    .get(`${getHost()}/pages`)
    .query({
      catalog_id : catalogId
    })
    .end(callback);
}

module.exports = {
  get
}