var request = require('superagent');
var getHost = require('./utils').getHost;

/**
 * Get the approved price marks
 * TODO: not implemented yet
 * 
 * @param {*} pageId 
 * @param {*} callback 
 */
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