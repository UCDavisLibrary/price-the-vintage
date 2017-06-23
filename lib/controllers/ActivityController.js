var EventController = require('./EventController');
var model = require('../models/ActivityModel');

class ActivityController extends EventController {

  constructor() {
    super();
    
    this.handleEvents = {
      setUserActivity :'set-user-activity',
      getUserActivity : 'get-user-activity'
    }

    this.triggerEvents = {
      userActivity : 'user-activity-update'
    }

    this.bind();
  }

  /**
   * Event: set-user-activity
   * 
   * @param {Object} e - event bus event
   * @param {string} e.catalogId - activity catalogId
   * @param {string} e.pageId - activity pageId
   */
  setUserActivity(e) {
    model.set(e.catalogId, e.pageId);
  }

  userActivityObserver(state) {
    this.eventBus.emit(this.triggerEvents.userActivity, state);
  }

  /**
   * Event: get-user-activity
   * 
   * @param {Object} e - event bus event
   * @param {string} e.id - resource id, either catalogId or pageId
   */
  getUserActivity(e) {
    return model.listen(e.id);
  }


}

module.exports = new ActivityController();