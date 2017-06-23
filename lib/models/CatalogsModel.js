var ReduxModel = require('./ReduxModel');
var actions = require('../../redux/actions/collections/catalogs');

/**
 * Controller for handling catalog state
 */
class CatalogsController extends ReduxModel {

  /**
   * Search the current catalogs.
   * @param {object} query - search parameters for service
   * @returns {object} - current search result state
   */
  search(query) {
    // API call handled by redux middleware
    this.dispatch(
      actions.search(query)
    );

    return this.getState().collections.catalogs.search;
  }

  /**
   * Get a specific catalog by id
   * @param {string} id 
   * @returns {object} - current catalog state
   */
  get(id) {
    // API call handled by redux middleware
    this.dispatch(
      actions.get(id)
    );

    return this.getState().collections.catalogs.byId[id];
  }

  /**
   * Clear the Redux store
   */
  clear() {
    // API call handled by redux middleware
    this.dispatch(
      actions.clear()
    );

    return this.getState().collections.catalogs.byId;
  }

}


module.exports = new CatalogsController();