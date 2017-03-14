var uuid = require('uuid');
var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/marks');
var firebase = require('../../firebase')();

class MarksController {

  constructor() {
    this.log = false;
    this.tmpMarkId = uuid.v4();
    this.refs = {};
    this.tmpMarkRefs = {};
  }

  get(pageId) {
    store.dispatch(
      actions.get(pageId)
    );

    return store.getState().collections.marks.byId[pageId];
  }

  select(pageId) {
    store.dispatch(
      actions.select(pageId)
    );

    return this.getSelected();
  }

  getSelected() {
    return store.getState().collections.marks.selected;
  }

  set(pageId, markId, mark) {
    var user = store.getState().auth.user;
    var uid = user.uid;
    if( !uid ) {
      throw new Error('You must be logged in to create a mark');
    }

    if( typeof markId === 'object' ) {
      mark = markId;
      markId = uuid.v4();
    }
    mark.user = uid;
    mark.isAnonymous = user.isAnonymous ? true : false;

    store.dispatch(
      actions.saveMarkStart(pageId, markId, mark)
    );

    var dbns = store.getState().config.dbns;

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}`)
      .set(mark)
      .then(() => {
        store.dispatch(
          actions.saveMarkSuccess(pageId, markId)
        );
      })
      .catch((error) => {
        store.dispatch(
          actions.saveMarkFailure(pageId, markId, error)
        );
      });
  }

  vote(pageId, markId, vote) {
    var user = store.getState().auth.user;
    var uid = user.uid;

    if( !uid || user.isAnonymous ) {
      throw new Error('You must be logged in to vote');
    }

    var dbns = store.getState().config.dbns;

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}/votes/${uid}`)
      .set(vote)
      .then(() => {
        // noop... for now
      })
      .catch((error) => {
        throw error;
        // noop... for now
      });
  }

  remove(pageId, markId) {
    var dbns = store.getState().config.dbns;

    store.dispatch(
      actions.removeMarkStart(pageId, markId)
    );

    firebase
      .database()
      .ref(`${dbns}/marks/${pageId}/${markId}`)
      .set(null)
      .then(() => {
        store.dispatch(
          actions.removeMarkSuccess(pageId, markId)
        );
      })
      .catch((error) => {
        store.dispatch(
          actions.removeMarkFailure(pageId, markId, error)
        );
      });
  }

  get(pageId) {
    if( !this.refs[pageId] ) {
      this.listen(pageId);
    }

    var marks = store.getState().collections.marks.byId;
    var currentMarks = [];
    for( var key in marks ) {
      if( marks[key].pageId === pageId ) {
        currentMarks.push(marks[key]);
      }
    }

    return currentMarks;
  }

  listen(pageId) {
    if( this.refs[pageId] ) return;

    if( this.log ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
    }

    var dbns = store.getState().config.dbns;
    var ref = firebase.database().ref(`${dbns}/marks/${pageId}`);
    this.refs[pageId] = ref;

    /**
     * Individual Child Changes
     */
    ref.on('child_added', (childSnapshot, prevChildKey) => {
      var val = childSnapshot.val();
      var markId = childSnapshot.key;
      store.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });

    ref.on('child_changed', (childSnapshot, prevChildKey) => {
      var val = childSnapshot.val();
      var markId = childSnapshot.key;
      store.dispatch(
        actions.markChange(pageId, markId, val)
      );
    });

    ref.on('child_removed', (childSnapshot, prevChildKey) => {
      var markId = childSnapshot.key;
      store.dispatch(
        actions.markRemoved(markId)
      );
    });
  }

  updateTempMark(pageId, xy) {
    var dbns = store.getState().config.dbns;

    var ref;
    if( !this.tmpMarkRefs[pageId] ) {
      ref = firebase.database().ref(`${dbns}/marks/${pageId}/${this.tmpMarkId}`);
      var disconnect = ref.onDisconnect();
      disconnect.set(null);

      this.tmpMarkRefs[pageId] = {ref, disconnect};
    } else {
      ref = this.tmpMarkRefs[pageId].ref;
    }

    ref
      .set({
        isTemp : true,
        user : store.getState().auth.user.uid,
        updated : Date.now(),
        xy : xy
      });
  }

  removeTempMark(pageId) {
    if( !this.tmpMarkRefs[pageId] ) return;

    this.tmpMarkRefs[pageId].ref.set(null);
    this.tmpMarkRefs[pageId].disconnect.cancel();

    delete this.tmpMarkRefs[pageId];
  }

  unlisten(pageId) {
    if( !this.refs[pageId] ) return;

    if( this.log ) {
      console.warn(`Unlistening to page marks: ${pageId}`);
    }

    // TODO
    // store.dispatch(
    //   actions.clearMarks(pageId)
    // );

    this.refs[pageId].off();
    delete this.refs[pageId];
  }

  cleanup(interested) {
    for( var id in this.refs ) {
      if( !interested[id] ) {
        this.unlisten(id);
      }
    } 
  }

}

var controller = new MarksController();
require('./events')(controller);
module.exports = controller;
