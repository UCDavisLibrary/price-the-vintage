var request = require('superagent');
var getHost = require('./utils').getHost;

function get(catalogId, callback) {
  request
    .get(`${getHost()}/pages`)
    .query({
      catalog_id : `eq.${catalogId}`
    })
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

module.exports = {
  get
}