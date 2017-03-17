var request = require('superagent');
var getHost = require('./utils').getHost;

function search(params = {}, callback) {
  request
    .get(`${getHost()}/catalogs`)
    .query(params)
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

function get(id, callback) {
  request
    .get(`${getHost()}/catalogs/${id}`)
    .end((error, resp) => {
      if( error ) return callback(error);
      if( resp.body.meta.error ) {
        return callback({error: true, message: resp.body.meta.error});
      }
      if( resp.body.data.length === 0 ) {
        return callback({error: true, message: 'Invalid Id'});
      }
      callback(null, resp.body.data[0]);
    });
}

// set 
// Prefer: count=exact
//
// get
// Content-Range:2-3/*

module.exports = {
  search, get
}