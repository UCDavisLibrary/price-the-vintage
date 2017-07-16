var EventController = require('cork-app-utils').EventController;
var model = require('../models/AdminModel');

class AdminController extends EventController {

  constructor() {
    super();

    this.handleEvents = {
      approveMark : 'admin-approve-mark',
      ignorePage : 'admin-ignore-page',
      pageCompleted : 'admin-completed-page',
      clearTestMarks : 'admin-clean-test-marks'
    }

    this.bind();
  }

  /**
   * Event: admin-approve-mark
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {string} e.markId - mark id
   * @param {object} e.mark - mark data
   */
  approveMark(e) {
    return model.approveMark(e.pageId, e.markId, e.mark);
  }

  /**
   * Event: admin-ignore-page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {boolean} e.ignore - set page as not editable
   */
  ignorePage(e) {
    return model.ignorePage(e.pageId, e.ignore);
  }

  /**
   * Event: admin-completed-page
   * 
   * @param {Object} e - event bus event
   * @param {string} e.pageId - page id of mark
   * @param {boolean} e.completed - set page as completed
   */
  pageCompleted(e) {
    return model.pageCompleted(e.pageId, e.completed);
  }

  /**
   * Event: admin-clean-test-marks
   */
  clearTestMarks() {
    return model.clearTestMarks();
  }

}

module.exports = new AdminController();