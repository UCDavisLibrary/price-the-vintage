const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {ItemsModel, SuggestModel} = require('@ucd-lib/crowd-source-js');
const AdminService = require('../services/AdminService');

/**
 * Preform admin tasks
 */
class AdminModel extends BaseModel {

  constructor() {
    super();

    this.service = AdminService;

    this.register('AdminModel');
  }

  /**
   * @method ignorePage
   * @description Toggle a pages editable status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} ignore - set page as not editable
   */
  ignorePage(pageId, ignore) {
    return ItemsModel.updateCrowdInfo(pageId, {editable: !ignore});
  }

  /**
   * @method pageCompleted
   * @description Toggle a pages completed status
   * 
   * @param {string} pageId - page id of mark
   * @param {boolean} completed - set page as completed
   */
  pageCompleted(pageId, completed) {
    return ItemsModel.updateCrowdInfo(pageId, {completed});
  }

  /**
   * @method approveMark
   * @description Approve mark
   * 
   * @param {object} mark - mark data
   */
  approveMark(mark, jwt) {
    let mark = await CrowdInputModel.setApproved(mark, 'wine-mark', jwt);
    if( mark.state !== 'loaded') {
      return mark;
    }

    await SuggestModel.addSuggestion('wine-name', mark.payload.data.wineName);
    return mark;
  }

  /**
   * @method 
   * @description Clear test marks.  Test marks are any mark with collectionId=test-collection
   *
   */
  clearTestMarks() {
    return this.service.clearTestMarks();
  }

  getAllPageMarks() {
    return this.service.getAllPageMarks();
  }

}

module.exports = new AdminModel();