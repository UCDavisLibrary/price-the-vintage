var request = require('superagent');
var clone = require('clone');
var utils = require('./utils');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

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

function pendingMarkSearch(params = {}, jwt, callback) {
  request
    .get(`${getHost()}/pending_mark_index`)
    .set('Authorization', `Bearer ${jwt}`)
    .set('Prefer', 'count=exact')
    .query(params)
    .end((error, resp) => {
      if( error ) return callback(error);

      var result = {
        results : resp.body
      }

      setResultInfo(resp.headers['content-range'], result);
      callback(null, result);
    });
}

function getApprovedMarks(pageId, callback) {
  request
    .get(`${getHost()}/marks`)
    .query({page_id: `eq.${pageId}`})
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body.map(fromPgMark));
    });
}

function approveMark(mark, markId, pageId, jwt, callback) {
  var pgMark = toPgMark(mark, markId, pageId);

  request
    .post(`${getHost()}/marks`)
    .send(pgMark)
    .set('Authorization', `Bearer ${jwt}`)
    .end((error, resp) => {
      if( error ) return callback(error);
      callback(null, resp.body);
    });
}

function toPgMark(mark, markId, pageId) {
  return {
    mark_id : markId,
    page_id : pageId,
    user_id : mark.user,
    type : mark.type,
    winetype : mark.wineType,
    color : mark.color,
    country : mark.country,
    producer : mark.producer,
    section : mark.section,
    vintage : mark.year || 0,
    bottletype : mark.bottleType,
    perprice : mark.price || 0,
    caseprice : mark.casePrice || 0,
    anonymous : mark.isAnonymous,
    xy : `{${Math.floor(mark.xy[0])},${Math.floor(mark.xy[1])}}`,
    created : new Date(mark.created).toISOString(),
    updated : new Date(mark.updated).toISOString()
  }
}

function fromPgMark(pgMark) {
  return {
    markId: pgMark.mark_id,
    pageId : pgMark.page_id,
    user : pgMark.user_id,
    type : pgMark.type,
    wineType : pgMark.winetype,
    color : pgMark.color,
    country : pgMark.country,
    producer : pgMark.producer,
    section : pgMark.section,
    year : pgMark.vintage || '',
    bottleType : pgMark.bottletype,
    price : pgMark.perprice || '',
    casePrice : pgMark.caseprice || '',
    xy : pgMark.xy,
    isAnonymous : pgMark.anonymous,
    approved : true,
    created : new Date(pgMark.created).getTime(),
    updated : new Date(pgMark.updated).getTime()
  }
}

module.exports = {
  get,
  pendingMarkSearch,
  approveMark,
  getApprovedMarks
}