/**
 * Wired up to suggest tools powered by: https://wine-search.library.ucdavis.edu/
 */

var BaseModel = require('cork-app-utils').BaseModel;
var SuggestStore = require('../stores/SuggestStore');
var MarksStore = require('../stores/MarksStore');
var SuggestService = require('../services/SuggestService');

/**
 * Controller for handling various states of the application.
 * This includes current catalog and page and if we are editing a mark.
 */
class SuggestModel extends BaseModel {

  constructor() {
    super();
    this.store = SuggestStore;
    this.service = SuggestService;
    this.bindMethods('SuggestModel');
  }

  wineName(text) {
    return this.service.wineName(text);
  }

  pageSection(pageId) {
    var results = {}, item;
    for( var key in MarksStore.data.byId ) {
      item = MarksStore.data.byId[key];

      if( item.pageId === pageId && item.data.section ) {
        results[item.data.section] = 1;
      }
    }

    return Object.keys(results);
  }

}

module.exports = new SuggestModel();