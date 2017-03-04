var uuid = require('uuid');
var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/marks');
var firebase = require('../../firebase')();

class MarksController {

  constructor() {
    this.refs = {}
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

    return store.getState().collections.marks.selected;
  }

  set(pageId, markId, mark) {
    var uid = store.getState().auth.user.uid;
    if( !uid ) {
      throw new Error('You must be logged in to create a mark');
    }

    if( typeof markId === 'object' ) {
      mark = markId;
      markId = uuid.v4();
    }
    mark.user = uid;

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

  get(pageId) {
    if( !this.refs[pageId] ) {
      console.warn('Setting up page marks listener for pageId: '+pageId);
      this.listen(pageId);
    }

    var marks = store.getState().collections.marks.byId;
    var currentMarks = [];
    for( var key in marks ) {
      if( marks[key].pageId === pageId ) {
        currentMarks.push(mark);
      }
    }

    return currentMarks;
  }

  listen(pageId) {
    if( this.refs[pageId] ) return;

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
  }

  unlisten(pageId) {
    if( !this.refs[pageId] ) return;
    console.warn(`Unlistening to page marks: ${pageId}`);

    this.refs[pageId].off();
    delete this.refs[pageId];
  }

  cleanup(interestedPages) {
    for( var id in this.refs ) {
      if( !interestedPages[id] ) {
        this.unlisten(id);
      }
    } 
  }

}

var controller = new MarksController();
require('./events')(controller);
module.exports = controller;
