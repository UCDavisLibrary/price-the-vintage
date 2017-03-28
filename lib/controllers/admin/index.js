var firebase = require('../../firebase')();
var store = require('../../redux/store');

/**
 * Preform admin tasks
 */
class AdminController {

  getDbns() {
    return store.getState().config.dbns;
  }

  getPendingMarks(sort, lastChild, limit, callback) {
    var dbns = this.getDbns();

    var query = firebase
      .database()
      .ref(`${dbns}/pending-marks`)
      .orderByChild(sort || 'score');

    if( lastChild ) {
      query
        .startAt(null, lastChild)
        .limitToFirst(limit || 10)
    } else {
      query.limitToLast(limit || 10)
    }

    query
      .once('value')
      .then((snapshot) => {
        callback(null, snapshot.val())
      })
      .catch(callback);
  }

}

var controller = new AdminController();
require('./events')(controller);

module.exports = controller;