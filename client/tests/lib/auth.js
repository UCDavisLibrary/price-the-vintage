const assert = require('assert');
const firebase = require('../utils/firebase');
const auth = require('../../public/src/lib/auth');
const jwt = require('../utils/jwt');
const assertEventOrder = require('../utils/assertEventOrder');

let testUser = 'tester@ucdavis.edu';
let auth0Profile = {
  email : testUser,
  email_verified : true,
  firebase_data : {
    email : testUser,
    isAdmin : true
  },
  photoURL : 'foo',
  user_id : '123',
  uid : '123',
  role : 'admin',
  roles : ['admin']
};
let fbJwt;

describe('auth library', function() {

  before(async () => {
    await firebase.connect();

    // set a fake Auth0 profile
    auth.setUserProfile(auth0Profile)
  });

  it('should generate a firebase jwt', async () => {
    fbJwt = await firebase.auth().createCustomToken(testUser);
    assert.equal(typeof fbJwt, 'string');
    assert.equal(fbJwt.length > 0, true);
  });

  it('should let user login with custom token', () => {
    return assertEventOrder(
      auth.store.MasterController, 'auth-update', [auth.store.CUSTOM_STATES.LOGGED_IN],
      async () => {
        let result = await auth.loginCustom(fbJwt);
        assert.equal(result.state, auth.store.CUSTOM_STATES.LOGGED_IN);
        assert.deepEqual(result.user, auth0Profile);
      }
    )
  });

  it('should let user logout', () => {
    return assertEventOrder(
      auth.store.MasterController, 'auth-update', [auth.store.CUSTOM_STATES.NOT_LOGGED_IN],
      async () => {
        let result = await auth.logout();
        assert.equal(result.state, auth.store.CUSTOM_STATES.NOT_LOGGED_IN);
        assert.deepEqual(result.user, {});
      }
    )
  });

  after(async () => {
    await firebase.disconnect();  
  })

  // TODO: test anonymous

});

