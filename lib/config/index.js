module.exports = {

  apiHost : {
    local : {
      dev : 'http://localhost:8081',
      prod : 'http://localhost:8080'
    },
    remote : {
      dev : 'https://dev-wine-api.library.ucdavis.edu',
      prod : 'https://wine-api.library.ucdavis.edu'
    }
  },



  // verbose, warn, error, info
  logLevel : 'info',

  firebase : {
    dev : {
      apiKey: "AIzaSyA-ZlKJv2J9rTEymwu5L-OpRtrZ4dOD7-M",
      authDomain: "price-the-vintage-dev.firebaseapp.com",
      databaseURL: "https://price-the-vintage-dev.firebaseio.com",
      storageBucket: "price-the-vintage-dev.appspot.com"
    },
    prod : {
      apiKey: "AIzaSyDBOM_JbgPFGyxhiNm_7yExGglEdGBtM1g",
      authDomain: "price-the-vintage.firebaseapp.com",
      databaseURL: "https://price-the-vintage.firebaseio.com",
      storageBucket: "price-the-vintage.appspot.com"
    }
  },

  auth0DevClient : 'RmgYnxJ7hFnQ6HW5ja1I5NVYotPYO2PZ',

  auth0 : {
    domain : 'ucdlibrary.auth0.com', 
    clientID: 'PKb1b9gAh5sdtzrqgdSLjzso0TedWfDf',
    scope : 'openid email role isAdmin',
    localStorageKey : 'auth0-profile',
    lockOptions : {
      auth : {
        autoParseHash: false,
        params: {
            responseType: 'token id_token',
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