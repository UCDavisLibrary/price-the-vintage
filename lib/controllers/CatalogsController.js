var EventController = require('cork-app-utils').EventController;
var model = require('../models/CatalogsModel');

class CatalogsController extends EventController {
  
  constructor() {
    super();

    this.handleEvents = {
      search : 'search-catalogs',
      get : 'get-catalog',
      select : 'select-catalog',
      getSelected : 'get-selected-catalog'
    }

    this.bind();
  }

  /**
   * Event: search-catalogs
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.query - search parameters
   */
  search(e) {
    return model.search(e.query);
  }

  /**
   * Event: get-catalog
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.id - catalog id
   */
  get(e) {
    return model.get(e.id);
  }

  /**
   * Event: select-catalog
   * Select a catalog
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - catalog id to select
   */
  select(e) {
    return model.select(e.id);
  }

  getSelected() {
    return model.getSelected();
  }

}

module.exports = new CatalogsController();