var BaseService = require('cork-app-utils').BaseService;
var MarksStore = require('../stores/MarksStore');
var clone = require('clone');
var utils = require('./utils');

var getHost = utils.getHost;
var setResultInfo = utils.setResultInfo;

class MarksService extends BaseService {

  constructor() {
    super();
    this.store = MarksStore;
  }

  /**
   * Get approved marks for page
   * 
   * @param {string} pageId - page id to get marks for
   */
  getApprovedMarks(pageId) {
    this.store.setApprovedByPageLoading(pageId);

    return this.call({
      request : this.request
                      .get(`${getHost()}/marks`)
                      .query({page_id: `eq.${pageId}`}),
      onError : (error) => {
        this.setApprovedByPageError(pageId, error)
      },
      onSuccess : (marks) => {
        this.setApprovedByPageLoaded(pageId, marks);
      },
      onSuccessMiddleware : (resp) => {
        return resp.body.map(fromPgMark);
      }
    });
  }

  /**
   * Search pending marks
   * 
   * @param {object} params - postgrest search params 
   */
  pendingMarkSearch(params = {}) {
    this.store.setPendingSearchLoading(params);

    return this.call({
      request : this.request
                      .get(`${getHost()}/pending_mark_index`)
                      .set('Prefer', 'count=exact')
                      .query(params),
      onError : this.store.setPendingSearchError,
      onSuccess : this.store.setPendingSearchLoaded,
      onSuccessMiddleware : (resp) => {
        var result = {
          results : resp.body
        }

        setResultInfo(resp.headers['content-range'], result);
        return result;
      },
      params
    });
  }

  /**
   * Approve mark (admin)
   * 
   * @param {object} mark - mark data
   * @param {string} markId - mark id
   * @param {string} pageId - page id
   * @param {string} jwt - user token
   */
  approveMark(mark, markId, pageId, jwt) {
    this.store.setMark({
      state : this.store.STATE.SAVING,
      markId,
      pageId,
      approved : true,
      data : mark 
    })

    var pgMark = toPgMark(mark, markId, pageId);

    return this.call({
      request : this.request
                      .post(`${getHost()}/marks`)
                      .send(pgMark)
                      .set('Authorization', `Bearer ${jwt}`),
      onError : (error) => {
        this.store.setMark({
          state : this.store.STATE.SAVE_ERROR,
          error,
          markId,
          pageId,
          approved : true,
          data : mark 
        });
      },
      onSuccess : () => {
        this.store.setMark({
          state : this.store.STATE.LOADED,
          markId,
          pageId,
          approved : true,
          data : mark 
        });
      }
    });
  }

  /**
   * Clear test marks.  Test marks are marks where section=test.
   * 
   * @param {string} jwt - user token
   */
  clearApprovedTestMarks(jwt) {
    return request
            .delete(`${getHost()}/marks`)
            .query({section: 'eq.test'})
            .set('Authorization', `Bearer ${jwt}`);
  }

}


/**
 * Transfer from firebase/app pending mark structure to pg mark structure
 */
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
    name : mark.name,
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

/**
 * Transfer from pg mark structure to firebase/app mark structure
 */
function fromPgMark(pgMark) {
  return {
    markId: pgMark.mark_id,
    pageId : pgMark.page_id,
    user : pgMark.user_id,
    type : pgMark.type,
    wineType : pgMark.winetype,
    color : pgMark.color,
    name : pgMark.name,
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

module.exports = new MarksService();