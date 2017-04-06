var firebase = require('../../firebase')();
var store = require('../../redux/store');
var firebase = require('../../firebase')();
var service = require('../../services/marks');
var markActions = require('../../redux/actions/collections/marks');

/**
 * Preform admin tasks
 */
class AdminController {

  pendingMarkSearch(params) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return {error: true, message: 'Must be admin and have a token'};
    }

    store.dispatch(
      markActions.pendingMarkSearch(params, user.auth0Token)
    );

    return store.getState().collections.marks.pendingSearch;
  }

  approveMark(pageId, markId, callback) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return callback('Must be admin and have a token');
    }

    var uid = user.uid;

    this.getMarkForApproval(pageId, markId, (error, mark) => {
      if( error ) return callback(error);

      service.approveMark(mark, markId, pageId, user.auth0Token, (error) => {
        if( error ) return callback(error);

        var update = {
          [`marks/${pageId}/${markId}`] : null, 
          [`pending-marks/${markId}`] : null,
          [`users/${mark.user}/marks/approved`] : true
        }

        firebase
          .database()
          .ref()
          .update(update)
          .then(() => {
            callback(null, {success: true});
          })
          .catch(error => {
            callback(error);
          });

      });
    });
  }

  getMarkForApproval(pageId, markId, callback) {
    firebase
      .database()
      .ref(`marks/${pageId}/${markId}`)
      .once('value')
      .then((snapshot) => {
        callback(null, snapshot.val())
      })
      .catch((error) => {
        callback(error)
      });
  }

}

var controller = new AdminController();
require('./events')(controller);

module.exports = controller;