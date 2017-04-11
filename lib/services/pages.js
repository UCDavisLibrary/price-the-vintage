var request = require('superagent');
var utils = require('./utils');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

var SELECT_PARAMS = ['page_id','page','catalog_id',
'media_id','editable','marks', 'completed'];

/**
 * Search catalog pages
 * 
 * @param {Object} query - query parameters
 * @param {string} [query.q] - text search value
 * @param {string} [query.catalogId] - catalog to search
 * @param {function} callback - service response handler
 */
function search(query = {}, callback) {
  var q = query.q.trim().replace(/\s+/g,' <-> ');

  var params = {
    q : `@@.${q}`,
    catalog_id : `eq.${query.catalogId}`
  };

  request
    .get(`${getHost()}/pages`)
    .query(params)
    .set('Prefer', 'count=exact')
    .end((error, resp) => {
      if( error ) return callback(error);

      var result = {
        results : resp.body
      }

      setResultInfo(resp.headers['content-range'], result);
      callback(null, result);
    });
}


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

function completed(pageId, completed, jwt, callback) {
  
  var query = {
    page_id : `eq.${pageId}`
  };

  request
    .patch(`${getHost()}/pages`)
    .query(query)
    .send({completed: completed})
    .set('Prefer','return=representation')
    .set('Authorization', `Bearer ${jwt}`)
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

module.exports = {
  get, getPages, ignore, completed, search
}
