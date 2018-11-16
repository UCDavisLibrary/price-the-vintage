const BaseService = require('@ucd-lib/cork-app-utils').BaseService;
const AuthStore = require('../stores/AuthStore');

class AdminService extends BaseService {

  constructor() {
    super();
    this.store = AuthStore;
  }

  loginFirebase(auth0Token) {
    return this.request({
      url : `/auth/firebase-login?token=${auth0Token}`
    });
  }

}

module.exports = new AdminService();