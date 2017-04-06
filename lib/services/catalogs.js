var request = require('superagent');
var getHost = require('./utils').getHost;

/**
 * Search the catalogs
 * 
 * @param {Object} query - query parameters
 * @param {boolean} [query.exact] - exact query match?
 * @param {string} [query.q] - text search value
 * @param {function} callback - service response handler
 */
function search(query = {}, callback) {
  var params = {};

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
 * Search the catalogs
 * 
 * @param {string} id - catalog to grab
 * @param {function} callback - service response handler
 */
function get(id, callback) {
  request
    .get(`${getHost()}/catalogs?catalog_id=eq.${id}`)
    .end((error, resp) => {
      if( error ) return callback(error);
      if( resp.body.length === 0 ) {
        return callback({error: true, message: 'Invalid Id'});
      }
      callback(null, resp.body[0]);
    });
}

// txtInfo in format: 10-20/196
/**
 * Helper for extracting the pagging information from the
 * response header.
 */
function setResultInfo(txtInfo, result) {
  result.start = 0;
  result.stop = 0;
  result.total = 0;

  if( !txtInfo ) return;

  try {
    var p2 = txtInfo.split('/');
    var p1 = p2[0].split('-');

    result.start = parseInt(p1[0]);
    result.stop = parseInt(p1[1]);
    result.total = parseInt(p2[1]);
  } catch(e) {
    console.error(e);
  }
}


module.exports = {
  search, get
}