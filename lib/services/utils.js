var store = require('../redux/store');
var request = require('superagent');

function getHost() {
  return require('../redux/store').getState().config.apiHost;
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

    result.start = parseInt(p1[0].replace(/\D/, '') || 0);
    result.stop = parseInt(p1[1] || 0);
    result.total = parseInt(p2[1] || 0);
  } catch(e) {
    console.error(e);
  }
}

function escapeTSVector(text, callback) {
  request
    .post(`${getHost()}/rpc/strto_tsquery`)
    .send({str: text})
    .end((err, resp) => {
      callback(resp.body);
    });
}

module.exports = {
  getHost,
  setResultInfo,
  escapeTSVector
}