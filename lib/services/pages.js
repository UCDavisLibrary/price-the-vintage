var request = require('superagent');
var getHost = require('./utils').getHost;

/**
 * Get the catalog page
 *
 * @param {string} pageId - page id to get
 * @param {function} callback - service response handler
 */
function get(pageId, callback) {
  request
    .get(`${getHost()}/pages`)
    .query({
      page_id : `eq.${pageId}`
    })
    .end((error, resp) => {
      if( error ) return callback(error);
      if( resp.body.length === 0 ) return callback({error: true, message: 'Invalid page id'});
      callback(null, resp.body[0]);
    });
}

/**
 * Get the catalog pages
 *
 * @param {string} catalogId - catalog id to get pages for
 * @param {function} callback - service response handler
 */
function getPages(catalogId, callback) {
  request
    .get(`${getHost()}/pages`)
    .query({
				catalog_id : `eq.${catalogId}`,
				order : 'page'
    })
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

module.exports = {
  get, getPages
}
