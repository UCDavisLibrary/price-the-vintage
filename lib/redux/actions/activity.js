var ACTIONS = {
  SET_USER_ACTIVITY: 'SET_USER_ACTIVITY',
  REMOVE_USER_ACTIVITY : 'REMOVE_USER_ACTIVITY'
}

function setUserActivity(id, uid, timestamp) {
  return {
    type : ACTIONS.SET_USER_ACTIVITY,
    id : id,
    uid : uid,
    timestamp : timestamp
  }
}

function removeUserActivity(id, uid) {
  return {
    type : ACTIONS.REMOVE_USER_ACTIVITY,
    id : id,
    uid : uid
  }
}

module.exports = {
  ACTIONS,
  setUserActivity,
  removeUserActivity
}