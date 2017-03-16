var firebase = require('./firebase');

var listeners = [];
var connected = false;

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", (snap) => {
  connected = snap.val();
  if( connected ) {
    listeners.forEach(fn => fn());
    listeners = [];
  }
});

module.exports = function(listener) {
  if( connected ) {
    return listener();
  }
  listeners.push(listener);
}