var BaseStore = require('cork-app-utils').BaseStore;


class ActivityStore extends BaseStore {

  constructor() {
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
    if( this.data.byId[activity.id] ) {
      this.data.byId[activity.id] = {};
    }

    this.data.byId[activity.id] = Object.assign(
                                    {}, 
                                    this.data.byId[activity.id], 
                                    {[activity.uid]: activity.timestamp}
                                  );

    this.emit('user-activity-update', {
      state: 'loaded',
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

    this.emit('user-activity-update', {
      state: 'loaded',
      id : activity.id,
      users : this.data.byId[activity.id]
    });
  }
}

module.exports = new ActivityStore();