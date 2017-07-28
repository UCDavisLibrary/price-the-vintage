var BaseModel = require('cork-app-utils').BaseModel;
var firebase = require('../firebase')();

var MarkService = require('../services/MarksService');
var PagesService = require('../services/PagesService');
var MarksStore = require('../stores/MarksStore');
var PagesStore = require('../stores/PagesStore');
var AuthStore = require('../stores/AuthStore');

/**
 * Preform admin tasks
 */
class AdminModel extends BaseModel {

  constructor() {
    super();

    this.stores = {
      mark : MarksStore,
      pages : PagesStore
    };
    this.services = {
      mark : MarkService,
      pages : PagesService
    };

    this.bindMethods('AdminModel');
  }

  /**
   * Toggle a pages editable status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} ignore - set page as not editable
   */
  ignorePage(pageId, ignore) {
    return new Promise((resolve, reject) => {
      var user = this.getUser();

      if( !user.auth0Token || !user.isAdmin ) {
        return reject(new Error('Must be admin and have a token'));
      }

      pageService.ignore(pageId, ignore, user.auth0Token, (err, res) => {
        if( err ) return reject(err);
        if( res.length === 0 ) return reject(new Error('Bad response from server'));
        var page = res[0];

        this.stores.pages.setPage(page);

        resolve(page);
      });
    });
  }

  /**
   * Toggle a pages completed status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} completed - set page as completed
   */
  pageCompleted(pageId, completed) {
    return new Promise((resolve, reject) => {
      var user = this.getUser();
      
      if( !user.auth0Token || !user.isAdmin ) {
        return reject(new Error('Must be admin and have a token'));
      }

      pageService.completed(pageId, completed, user.auth0Token, (err, res) => {
        if( err ) return reject(err);
        if( res.length === 0 ) return reject(new Error('Bad response from server'));
        var page = res[0];

        this.stores.pages.setPage(page);

        resolve(page);
      });
    });
    
  }

  /**
   * Approve mark
   * 
   * @param {string} pageId - page id of mark
   * @param {string} markId - mark id
   * @param {object} mark - mark data
   */
  approveMark(pageId, markId, mark) {
    return new Promise((resolve, reject) => {
      var user = this.getUser();

      if( !user.auth0Token || !user.isAdmin ) {
        return reject(new Error('Must be admin and have a token'));
      }

      var uid = user.uid;

      this.services.mark
                  .approveMark(mark, markId, pageId, user.auth0Token)
                  .then(() => {
                    // have MarkModel remove mark
                    this.emit('delete-catalog-page-mark', {pageId, markId})
                        .then(resolve)
                        .catch(reject);
                  })
                  .catch(reject);
    });
  }

  /**
   * Clear test marks.  Test marks are any mark with section=test
   * 
   * @param {function} callback - function response handler
   */
  clearTestMarks(callback) {
    return new Promise((resolve, reject) => {
      
      var user = this.getUser();
      if( !user.auth0Token || !user.isAdmin ) {
        return reject(new Error('Must be admin and have a token'));
      }

      firebase
        .database()
        .ref('pending-marks')
        .orderByChild('test')
        .equalTo(true)
        .once('value', (snapshot) => {
          var marks = snapshot.val() || {};

          for( var id in marks ) {
            this.emit('delete-catalog-page-mark', {
              pageId: marks[id].pageId, 
              markId: id
            });
          }

          this.services.mark
                      .clearApprovedTestMarks(user.auth0Token)
                      .then(resolve)
                      .catch(reject);
        });

    });    
  }

  getUser() {
    return AuthStore.data.user;
  }

}

module.exports = new AdminModel();