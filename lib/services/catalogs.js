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
    .end(function(error, resp){
      if( error ) return callback(error);
      if( value.meta.error ) {
        return callback({error: true, message: value.meta.error});
      }
      if( value.data.length === 0 ) {
        return callback({error: true, message: 'Invalid Id'});
      }
      callback(null, resp.body.data[0]);
    });
}

module.exports = {
  search, get
}