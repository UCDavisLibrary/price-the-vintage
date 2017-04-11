var request = require('superagent');
var utils = require('./utils');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

var SELECT = ['pages','catalog_id','pages_finished','title','publisher','completed','media_id'];

/**
 * Search the catalogs
 * 
 * @param {Object} query - query parameters
 * @param {boolean} [query.exact] - exact query match?
 * @param {string} [query.q] - text search value
 * @param {function} callback - service response handler
 */
function search(query = {}, callback) {
  var params = {
    select : SELECT.join(',')
  };

  if( query.q ) {
    if( query.exact ) {
      params.q = query.q.trim().replace(/\s+/g,' <-> ');
    } else {
      params.q = query.q.trim().replace(/\s+/g,' & ');
    }

    params.q = `@@.${params.q}`;
  }

  request
    .get(`${getHost()}/catalogs`)
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
 * Get a catalog
 * 
 * @param {string} id - catalog to grab
 * @param {function} callback - service response handler
 */
function get(id, callback) {
  request
    .get(`${getHost()}/catalogs?catalog_id=eq.${id}`)
    .query({select: SELECT.join(',')})
    .end((error, resp) => {
      if( error ) return callback(error);
      if( resp.body.length === 0 ) {
        return callback({error: true, message: 'Invalid Id'});
      }
      callback(null, resp.body[0]);
    });
}


module.exports = {
  search, get
}