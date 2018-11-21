const {BaseModel} = require('@ucd-lib/cork-app-utils');
const {SuggestModel, CrowdInputsModel} = require('@ucd-lib/crowd-source-js');

class SuggestModel extends BaseModel {

  constructor() {
    super();
    this.register('WineSuggestModel');
  }

  /**
   * @method wineName
   * @description suggest wine names based on given text
   * 
   * @param {String} text text to use to suggest name
   * 
   * @returns {Promise}
   */
  async wineName(text) {
    return SuggestModel.findSuggestion('wine-name', text);
  }

  /**
   * @method country
   * @description suggest country names based on given text
   * 
   * @param {String} text text to use to suggest name
   * 
   * @returns {Promise}
   */
  async country(text) {
    return SuggestModel.findSuggestion('country', text);
  }

  /**
   * @method pageSection
   * @description suggest the page section base on other sections
   * provided in this page.  This simply returns an array of all
   * section names for a page.  Uses the currently loaded marks 
   * in the marks store.
   * 
   * @param {String} pageId 
   * 
   * @returns {Object} array of section names in state object
   */
  pageSection(pageId) {
    var results = {}, item;

    [
      CrowdInputsModel.store.data.pending.byItem[pageId] || {},
      CrowdInputsModel.store.data.approved.byItem[pageId] || {}
    ].forEach(group => {
      for( let id in group) {
        item = group[id];
        if( item.payload && item.payload.data && item.payload.data.section ) {
          results[item.payload.data.section] = 1;
        }
      }
    });

    return {
      state: this.store.STATE.LOADED,
      payload : Object.keys(results),
      pageId
    }
  }

}

module.exports = new SuggestModel();