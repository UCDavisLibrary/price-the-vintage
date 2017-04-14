var firebase = require('../../firebase')();
var store = require('../../redux/store');
var firebase = require('../../firebase')();
var markController = require('../../controllers/marks');
var markService = require('../../services/marks');
var pageService = require('../../services/pages');
var pageActions = require('../../redux/actions/collections/pages');
var markActions = require('../../redux/actions/collections/marks');

/**
 * Preform admin tasks
 */
class AdminController {

  /**
   * Toggle a pages editable status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} ignore - set page as not editable
   * @param {function} callback - function response handler
   */
  ignorePage(pageId, ignore, callback) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return callback({error: true, message: 'Must be admin and have a token'});
    }

    pageService.ignore(pageId, ignore, user.auth0Token, (err, res) => {
      if( err ) return callback(err);
      if( res.length === 0 ) return callback({error: true, message: 'Bad response from server'});
      var page = res[0];

      store.dispatch(
        pageActions.set(page)
      );

      callback(null, page);
    });
  }

  /**
   * Toggle a pages completed status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} completed - set page as completed
   * @param {function} callback - function response handler
   */
  pageCompleted(pageId, completed, callback) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return callback({error: true, message: 'Must be admin and have a token'});
    }

    pageService.completed(pageId, completed, user.auth0Token, (err, res) => {
      if( err ) return callback(err);
      if( res.length === 0 ) return callback({error: true, message: 'Bad response from server'});
      var page = res[0];

      store.dispatch(
        pageActions.set(page)
      );

      callback(null, page);
    });
  }

  /**
   * Search pending marks
   * 
   * @param {object} params - postgrest search params
   */
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

  /**
   * Approve mark
   * 
   * @param {string} pageId - page id of mark
   * @param {string} markId - mark id
   * @param {object} mark - mark data
   * @param {function} callback - function response handler
   */
  approveMark(pageId, markId, mark, callback) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return callback('Must be admin and have a token');
    }

    var uid = user.uid;

    markService.approveMark(mark, markId, pageId, user.auth0Token, (error) => {
      if( error ) return callback(error);
      markController.remove(pageId, markId, callback);
    });
  }

  /**
   * Clear test marks.  Test marks are any mark with section=test
   * 
   * @param {function} callback - function response handler
   */
  clearTestMarks(callback) {
    var user = store.getState().auth.user;
    if( !user.auth0Token || !user.isAdmin ) {
      return callback('Must be admin and have a token');
    }

    firebase
      .database()
      .ref('pending-marks')
      .orderByChild('test')
      .equalTo(true)
      .once('value', (snapshot) => {
        var marks = snapshot.val() || {};

        for( var id in marks ) {
          markController.remove(marks[id].pageId, id);
        }

        markService.clearApprovedTestMarks(user.auth0Token, callback);
        callback();
      });
  }

}

var controller = new AdminController();
require('./events')(controller);

module.exports = controller;