var firebase = require('../../firebase')();
var store = require('../../redux/store');

/**
 * Preform admin tasks
 */
class AdminController {

  getPendingMarks(sort, lastChild, limit, callback) {
    var query = firebase
      .database()
      .ref(`pending-marks`)
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