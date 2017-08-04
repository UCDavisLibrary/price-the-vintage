var BaseStore = require('cork-app-utils').BaseStore;


class ActivityStore extends BaseStore {

  constructor() {
    super();

    this.UPDATE_EVENT = 'user-activity-update';
    this.data = {
      byId : {}
    }
  }

  /**
   * 
   * @param {Object} activity - update activity
   * @param {string} activity.id - id of object that has activity
   * @param {string} activity.uid - user id of who performed the activity
   * @param {number} activity.timestamp - timestamp of when activity occured
   */
  set(activity) {
    if( !activity.id ) throw new Error('Object id required');
    if( !activity.uid ) throw new Error('User id required');
    if( !activity.timestamp ) throw new Error('Timestamp id required');

    if( !this.data.byId[activity.id] ) {
      this.data.byId[activity.id] = {};
    }

    this.data.byId[activity.id] = Object.assign(
                                    {}, 
                                    this.data.byId[activity.id], 
                                    {[activity.uid]: activity.timestamp}
                                  );

    this.emit(this.UPDATE_EVENT, {
      state: this.STATE.LOADED,
      id : activity.id,
      users : this.data.byId[activity.id]
    });
  }

  /**
   * 
   * @param {Object} activity - update activity
   * @param {string} activity.id - id of object that has activity
   * @param {string} activity.uid - user id of who performed the activity (optional)
   */
  remove(activity) {
    if( !this.data.byId[activity.id] ) {
      return;
    }

    try {
      if( activity.uid ) {
        delete this.data.byId[activity.id][activity.uid];
        this.data.byId[activity.id] = Object.assign({}, this.data.byId[activity.id]);
      } else {
        delete this.data.byId[activity.id];
        this.data.byId = Object.assign({}, this.data.byId);
      }
    } catch(e) {
      console.error(e);
    }

    this.emit(this.UPDATE_EVENT, {
      state: this.STATE.LOADED,
      id : activity.id,
      users : this.data.byId[activity.id] || {}
    });
  }
}

module.exports = new ActivityStore();