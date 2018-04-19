const {BaseService} = require('@ucd-lib/cork-app-utils');
const MarksStore = require('../stores/MarksStore');
const clone = require('clone');
const utils = require('./utils');
const config = require('../config');
const firebase = require('../firebase')();

var setResultInfo = utils.setResultInfo;
var API_HOST = config.apiHost;

class MarksService extends BaseService {

  constructor() {
    super();
    this.store = MarksStore;
    this.refs = {};
  }

  /**
   * @method getApprovedMarks
   * @description Postgrest. Get approved marks for page
   * 
   * @param {string} pageId - page id to get marks for
   * 
   * @return {Promise}
   */
  getApprovedMarks(pageId) {
    return this.request({
      url : `${API_HOST}/marks`,
      qs : {
        page_id: `eq.${pageId}`
      },
      onLoading : promise => this.store.setApprovedByPageLoading(pageId, promise), 
      onLoad : (result) => {
        this.store.setApprovedByPageLoaded(pageId, result.body.map(fromPgMark));
      },
      onError : e => console.error(e)
    });
  }

  /**
   * @method pendingMarkSearch
   * @description Postgrest. Search pending marks
   * 
   * TODO: who was using this?
   * 
   * @param {object} params - postgrest search params 
   * 
   * @return {Promise}
   */
  // pendingMarkSearch(params = {}, jwt) {
  //   return this.request({
  //     url : `${API_HOST}/pending_mark_index`,
  //     qs: params,
  //     fetchOptions : {
  //       headers : {
  //         Authorization: `Bearer ${jwt}`,
  //         Prefer: 'count=exact'
  //       }
  //     },
  //     onLoading : promise => this.store.setPendingSearchLoading(params, promise),
  //     onError : e => this.store.setPendingSearchError(e, params),
  //     onLoad : (resp) => {
  //       var result = {
  //         results : JSON.parse(resp.body)
  //       };
  //       setResultInfo(resp.headers['content-range'], result);

  //       this.store.setPendingSearchLoaded(result, params)
  //     }
  //   });
  // }

  /**
   * @method approveMark 
   * @description Approve mark (admin)
   * 
   * @param {object} mark - mark data
   * @param {string} markId - mark id
   * @param {string} pageId - page id
   * @param {string} jwt - user token
   * 
   * @returns {Promise}
   */
  approveMark(mark, markId, pageId, jwt) {
    var pgMark = toPgMark(mark, markId, pageId);

    return this.request({
      url : `${API_HOST}/marks`,
      fetchOptions : {
        method : 'POST',
        headers : {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(pgMark)
      },
      onLoading : promise => {
        this.store.setApprovingMarkLoading(markId, pageId, mark, promise);
      },
      onError : error => {
        this.setApprovingMarkError(markId, pageId, mark, error);
      },
      onLoad : resp => {
        this.store.setApprovingMarkLoaded(markId, pageId, mark);
        this.setFirebaseMark(pageId, markId, null);
      }
    });
  }

  /**
   * @method clearApprovedTestMarks
   * @description Clear test marks.  Test marks are marks where section=test.
   * 
   * @param {string} jwt - user token
   * 
   * @returns {Promise}
   */
  clearApprovedTestMarks(jwt) {
    return this.request({
      url : `${API_HOST}/marks`,
      fetchOptions : {
        method : 'DELETE',
        qs : {section: 'eq.test'},
        headers : {
          Authorization: `Bearer ${jwt}`
        }
      }
    });
  }

  /**
   * @method getTmpMarks
   * @description Firebase. get a users temp marks from Firebase.
   * 
   * @param {String} uid user id
   * 
   * @returns {Promise} 
   */
  getTmpMarks(uid) {
    return firebase
      .database()
      .ref(`users/${uid}/tempMarks`)
      .once('value')
  }

  /**
   * @method setFirebaseMark
   * @description Firebase. set a firebase mark.  Returns current state 
   * of mark after update attempt.  If mark is null, this is
   * delete operation
   * 
   * @param {String} pageId marks page Id
   * @param {String} markId mark id
   * @param {Object|null} mark mark object or null. if null this
   * is a delete.
   * 
   * @return {Promise} resolves to mark state
   */
  async setFirebaseMark(pageId, markId, mark) {
    this.store.setMark({
      state : mark ? this.store.STATE.SAVING : this.store.STATE.DELETING,
      markId, pageId,
      approved: false,
      payload : mark
    });

    try {
      await firebase
        .database()
        .ref(`marks/${pageId}/${markId}`)
        .set(mark)

      this.store.setMark({
        state : mark ? this.store.STATE.LOADED : this.store.STATE.DELETED,
        markId, pageId,
        approved: false,
        payload : mark
      });
    } catch(e) {
      this.store.setMark({
        state : mark ? this.store.STATE.SAVE_ERROR : this.store.STATE.DELETE_ERROR,
        markId, pageId, error,
        approved: false,
        payload : mark,
        error : e
      });
    }

    return this.store.getMark(markId);
  }

  /**
   * @method votePending
   * @description Firebase. Vote a page mark up or down
   * 
   * @param {String} userId - user id
   * @param {string} pageId - page id for mark
   * @param {string} markId - mark id to vote on
   * @param {string} vote - vote type.  Should be 'up' or 'down'
   * 
   * @return {Promise} firebase response
   */
  votePending(userId, pageId, markId, vote) {
    return firebase
      .database()
      .ref(`marks/${pageId}/${markId}/votes/${userId}`)
      .set({type: vote});
  }

  /**
   * @method getPendingMark
   * @description Firebase. get a pending mark
   * 
   * @param {String} pageId 
   * @param {String} markId 
   * 
   * @returns {Promse} resolves to mark state
   */
  async getPendingMark(pageId, markId) {
    this.store.setMarkLoading(markId, pageId, false);

    try {
      let snapshot = await firebase
        .database()
        .ref(`marks/${pageId}/${markId}`)
        .once('value')

      this.store.setPendingMarkLoaded(pageId, markId, snapshot.val());
    } catch(e) {
      this.store.setMarkError(markId, pageId, false, e);
    }

    return this.store.data.byId[markId];
  }

  /**
   * @method getPendingMarks
   * @description get all pending marks for a page
   * 
   * @param {String} pageId page id
   * 
   * @returns {Promise} resolves to Array of mark states
   */
  async getPendingMarks(pageId) {
    let resp = await firebase.database().ref(`marks/${pageId}`).once('value')
    resp = resp.val() || {};

    let marks = [];
    for( var markId in resp ) {
      this.store.setPendingMarkLoaded(pageId, markId, resp[markId]);
      marks.push(this.store.data.byId[markId]);
    }

    return marks;
  }

  /**
   * @method listenToPageMarks
   * @description This will setup a firebase listener.  Will listen for child 'add',
   * 'remove' and 'change' events.  Will ignore stale tmp marks.
   * 
   * @param {string} pageId - page id to listen for
   */
  listenToPageMarks(pageId) {
    if( this.refs[pageId] ) return;

    var ref = firebase.database().ref(`marks/${pageId}`);
    this.refs[pageId] = ref;

    ref.on('child_added', (snapshot, key) => this._onPageChildAdded(pageId, snapshot, key));
    ref.on('child_changed', (snapshot, key) => this._onPageChildChanged(pageId, snapshot, key));
    ref.on('child_removed', (snapshot, key) => this._onPageChildRemoved(pageId, snapshot, key));
  }

  // TODO: remove if not used
  // listenToMark(pageId, markId) {
  //   if( this.refs[markId] ) return;

  //   var ref = firebase.database().ref(`marks/${pageId}/${markId}`);
  //   this.refs[markId] = ref;

  //   ref.on('value', (snapshot) => this._onMarkChanged(pageId, markId, snapshot));
  // }

  /**
   * @method updateTempMark
   * @description Set or update a tmp user mark.  Will set
   * disconnect handlers to remove tmp mark if user connection
   * is lost
   * 
   * @param {Object} update firebase multipath update object
   * 
   * @returns {Promise}
   */
  async updateTempMark(update) {
    await this.setTmpMarkDisconnectRefs(update);
    return firebase
      .database()
      .ref()
      .update(update)
  }

  /**
   * @method setTmpMarkDisconnectRefs
   * @description If we lose connection, make sure that activity paths 
   * are set to null.
   * 
   * @param {Object} update - Firebase multi-path update object 
   * 
   * @returns {Promise}
   */
  async setTmpMarkDisconnectRefs(update = {}) {
    // cancel any current disconnectRefs
    for( var i = 0; i < this.model.tmpMark.disconnect.length; i++  ) {
      let key = this.model.tmpMark.disconnect[i];
      await firebase
        .database()
        .ref(key)
        .onDisconnect()
        .cancel()
    }
    this.model.tmpMark.disconnect = [];

    var count = 0;
    var total = Object.keys(update).length;
    
    if( total === 0 ) return;

    // set new disconnectRefs
    for( var key in update ) {
      await firebase
        .database()
        .ref(key)
        .onDisconnect()
        .set(null);
      this.model.tmpMark.disconnect.push(key)
    }
  }

  /**
   * @method unlistenRef
   * @description Stop listening to firebase reference.  Mostly called from cleanup().
   * 
   * @param {string} pageId - page id to stop listening to
   */
  unlistenRef(id) {
    if( !this.refs[id] ) return;

    if( this.log ) {
      console.warn(`Unlistening to mark(s): ${id}`);
    }

    this.refs[id].off();
    delete this.refs[id];
  }

  /**
   * @method cleanup
   * @description After interested parties request, this will be called.  It will let you know
   * all the resource ids that elements are still interested in.  You are free to 
   * remove any Firebase Reference that is NOT in this list.
   * 
   * @param {Object} interested - hash of interested resource ids
   */
  cleanup(interested = {}) {
    for( var id in this.refs ) {
      if( !interested[id] ) {
        this.unlistenRef(id);
      }
    } 
  }

  // TODO: remove if not used
  // _onMarkChanged(pageId, markId, snapshot) {
  //   var val = snapshot.val();

  //   if( this.model.isStale(val) ) {
  //     if( this.log ) {
  //       console.log(`Ignoring stale mark ${markId}`);
  //     }
  //     return;
  //   }

  //   this.store.setPendingMarkLoaded(pageId, markId, val);
  // }

  _onPageChildAdded(pageId, childSnapshot, prevChildKey) {
    var val = childSnapshot.val();
    var markId = childSnapshot.key;

    if( this.model.isStale(val) ) {
      if( this.log ) {
        console.log(`Ignoring stale mark ${markId}`);
      }
      return;
    }

    this.store.setPendingMarkLoaded(pageId, markId, val);
  }

  _onPageChildChanged(pageId, childSnapshot, prevChildKey) {
    var val = childSnapshot.val();
    var markId = childSnapshot.key;

    if( this.model.isStale(val) ) {
      if( this.log ) {
        console.log(`Ignoring stale mark ${markId}`);
      }
      return;
    }

    this.store.setPendingMarkLoaded(pageId, markId, val);
  }

  _onPageChildRemoved(pageId, childSnapshot, prevChildKey) {
    var markId = childSnapshot.key;

    this.store.setMark({
      markId, pageId,
      pending : true,
      state : this.store.STATE.DELETED
    });

    // This mark may have been approved...
    this.getApprovedMarks(pageId);
  };

}


/**
 * Transfer from firebase/app pending mark structure to pg mark structure
 */
function toPgMark(mark, markId, pageId) {
  mark.xy = mark.xy || [0,0];

  return {
    mark_id : markId,
    page_id : pageId,
    user_id : mark.user,
    type : mark.type,
    wine_type : mark.wineType,
    color : mark.color,
    country : mark.country,
    producer : mark.producer,
    section : mark.section,
    name : mark.name,
    vintage : mark.year || 0,
    bottle_type : mark.bottleType,
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
    wineType : pgMark.wine_type,
    color : pgMark.color,
    name : pgMark.name,
    country : pgMark.country,
    producer : pgMark.producer,
    section : pgMark.section,
    year : pgMark.vintage || '',
    bottleType : pgMark.bottle_type,
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