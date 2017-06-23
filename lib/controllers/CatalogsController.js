var EventController = require('./EventController');
var model = require('../models/CatalogsModel');

class CatalogsController extends EventController {
  
  constructor() {
    super();

    this.handleEvents = {
      search : 'search-catalogs',
      get : 'get-catalog'
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

}

module.exports = new CatalogsController();