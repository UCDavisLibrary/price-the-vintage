module.exports = {
  // apiHost : 'http://api.labels.qjhart.org',
  apiHost : 'https://api.catalogs.qjhart.org',

  // verbose, warn, error, info
  logLevel : 'info',

  dbns : 'price-the-vintage',

  firebase :   {
    apiKey: "AIzaSyBs84aDj1FqM2gMDMwk-ccmmLwL3LavP1I",
    authDomain: "ucd-library-apps.firebaseapp.com",
    databaseURL: "https://ucd-library-apps.firebaseio.com",
    storageBucket: "ucd-library-apps.appspot.com"
  },

  auth0 : {
    domain : 'ucd-library-apps.auth0.com', 
    clientID: 'xEqd2tOh3Yo0GNTlGfFRxVDYgNvCOWm8',
    scope : 'openid email roles isAdmin',
    localStorageKey : 'auth0-profile',
    lockOptions : {
      auth : {
        autoParseHash: false,
        params: {
            scope: 'openid email roles isAdmin'
        }
      },
      languageDictionary: {
        title: "Price the Vintage"
      },
      theme: {
        logo: '/images/library.png',
        primaryColor: '#9C27B0'
      }
    }
  }
}