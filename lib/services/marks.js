var request = require('superagent');
var getHost = require('./utils').getHost;

function get(pageId, callback) {
  request
    .get(`${getHost()}/price_marks`)
    .query({
      page_id : pageId
    })
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

module.exports = {
  get
}