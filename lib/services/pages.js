var request = require('superagent');
var getHost = require('./utils').getHost;

var SELECT_PARAMS = ['page_id','page','catalog_id',
'media_id','editable','marks'];

/**
 * Get the catalog page
 *
 * @param {string} pageId - page id to get
 * @param {function} callback - service response handler
 */
function get(pageId, callback) {

  var query = {
    select : SELECT_PARAMS.join(','),
    page_id : `eq.${pageId}`
  };

  request
    .get(`${getHost()}/pages`)
    .query(query)
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

  var query = {
    select : SELECT_PARAMS.join(','),
    catalog_id : `eq.${catalogId}`,
    order : 'page'
  };

  request
    .get(`${getHost()}/pages`)
    .query(query)
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

function ignore(pageId, ignore, jwt, callback) {
  
  var query = {
    page_id : `eq.${pageId}`
  };

  request
    .patch(`${getHost()}/pages`)
    .query(query)
    .send({editable: !ignore})
    .set('Prefer','return=representation')
    .set('Authorization', `Bearer ${jwt}`)
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

module.exports = {
  get, getPages, ignore
}
