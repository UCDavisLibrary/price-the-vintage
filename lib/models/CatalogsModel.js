var BaseModel = require('cork-app-utils').BaseModel;
var actions = require('../redux/actions/collections/catalogs');

/**
 * Controller for handling catalog state
 */
class CatalogsController extends BaseModel {

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

  /**
   * Select a catalog by id.
   * 
   * @param {string} id - catalog Id
   */
  select(id) {
    this.dispatch(
      actions.select(id)
    );

    return this.getSelected();
  }

  getSelected() {
    return this.getState().collections.catalogs.selected;
  }

}


module.exports = new CatalogsController();