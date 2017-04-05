module.exports = {
  dev : {
    apiHost : 'http://localhost:8081',
  },
  
  apiHost : 'https://api.catalogs.qjhart.org',

  // verbose, warn, error, info
  logLevel : 'info',

  firebase :   {
    apiKey: "AIzaSyDBOM_JbgPFGyxhiNm_7yExGglEdGBtM1g",
    authDomain: "price-the-vintage.firebaseapp.com",
    databaseURL: "https://price-the-vintage.firebaseio.com",
    storageBucket: "price-the-vintage.appspot.com"
  },

  auth0 : {
    domain : 'ucd-library-apps.auth0.com', 
    clientID: 'xEqd2tOh3Yo0GNTlGfFRxVDYgNvCOWm8',
    scope : 'openid email role isAdmin',
    localStorageKey : 'auth0-profile',
    lockOptions : {
      auth : {
        autoParseHash: false,
        params: {
            scope: 'openid email role isAdmin'
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