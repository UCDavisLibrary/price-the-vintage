/**
 * Wired up to suggest tools powered by: https://wine-search.library.ucdavis.edu/
 */
const BaseModel = require('@ucd-lib/cork-app-utils').BaseModel;
const SuggestStore = require('../stores/SuggestStore');
const MarksStore = require('../stores/MarksStore');
const SuggestService = require('../services/SuggestService');

class SuggestModel extends BaseModel {

  constructor() {
    super();
    this.store = SuggestStore;
    this.service = SuggestService;
    this.register('SuggestModel');
  }

  /**
   * @method wineName
   * @description suggest wine names based on given text
   * 
   * @param {String} text text to use to suggest name
   * 
   * @returns {Promise} resolves to array of wine names in state object
   */
  async wineName(text) {
    await this.service.wineName(text);
    return this.store.data['wine-name'][text];
  }

  /**
   * @method country
   * @description suggest country names based on given text
   * 
   * @param {String} text text to use to suggest name
   * 
   * @returns {Promise} resolves to array of country names in state object
   */
  async country(text) {
    await this.service.country(text);
    return this.store.data.country[text];
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
    for( var key in MarksStore.data.byId ) {
      item = MarksStore.data.byId[key];

      if( item.payload && item.payload.section && item.pageId === pageId  ) {
        results[item.payload.section] = 1;
      }
    }

    return {
      state: this.store.STATE.LOADED,
      payload : Object.keys(results),
      pageId
    }
  }

}

module.exports = new SuggestModel();