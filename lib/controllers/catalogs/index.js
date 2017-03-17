var store = require('../../redux/store');
var actions = require('../../redux/actions/collections/catalogs');

/**
 * Controller for handling catalog state
 */
class CatalogsController {

  /**
   * Search the current catalogs.
   * @param {object} query - search parameters for service
   * @returns {object} - current search result state
   */
  search(query) {
    // API call handled by redux middleware
    store.dispatch(
      actions.search(query)
    );

    return store.getState().collections.catalogs.search;
  }

  /**
   * Get a specific catalog by id
   * @param {string} id 
   * @returns {object} - current catalog state
   */
  get(id) {
    // API call handled by redux middleware
    store.dispatch(
      actions.get(id)
    );

    return store.getState().collections.catalogs.byId[id];
  }

  /**
   * Clear the Redux store
   */
  clear() {
    // API call handled by redux middleware
    store.dispatch(
      actions.clear()
    );

    return store.getState().collections.catalogs.byId;
  }

  /**
   * Select a specific catalog
   * @param {string} id - catalog id to select
   * @returns {string} - current selected catalog
   */
  select(id) {
    store.dispatch(
      actions.select(id)
    );

    return store.getState().collections.catalogs.selected;
  }
}

var controller = new CatalogsController();
require('./events')(controller);
module.exports = controller;