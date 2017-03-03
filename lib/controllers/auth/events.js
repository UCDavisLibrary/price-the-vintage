
var eventBus = require('../../eventBus');

module.exports = function(controller) {
  eventBus.on('get-auth-state', (e) => {
    let resp = controller.getAuthState();
    if( e.handler ) e.handler(resp);
  });

  eventBus.on('auth-login-google', (e) => {
    let resp = controller.loginWithGoogle();
    if( e && e.handler ) e.handler(resp);
  });

  eventBus.on('auth-logout', (e) => {
    let resp = controller.logout();
    if( e && e.handler ) e.handler(resp);
  });
}