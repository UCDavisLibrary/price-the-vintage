var firebase = require('../../firebase')();
var store = require('../../redux/store');
var actions = require('../../redux/actions/auth');

function AuthController() {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // TODO: is user is anonymous set user object,
      // but leave status as not logged in.
      store.dispatch(
        actions.setUser(user)
      )
    } else {
      store.dispatch(
        actions.notLoggedIn()
      )

      this.loginAnonymous();
    }
  });

  this.loginAnonymous = function() {
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  
  this.loginWithGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider);
  }

  this.logout = function() {
    firebase.auth().signOut();
  }

  this.getAuthState = function() {
    return store.getState().auth;
  }

}

var controller = new AuthController();
require('./events')(controller);

module.exports = controller;