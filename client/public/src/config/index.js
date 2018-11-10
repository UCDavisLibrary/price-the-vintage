const setApiHost = require('./apiHost');

const config = {

  env : require('./env'),
  
  apiHost : {
    local : {
      dev : 'http://localhost:8082',
      prod : 'http://localhost:8080'
    },
    remote : {
      dev : 'https://dev-wine-api.library.ucdavis.edu',
      prod : 'https://wine-api.library.ucdavis.edu'
    }
  },

  damsApi : {
    host : 'https:digital.ucdavis.edu',
    textFields : ['name', 'description', 'abouts', 'alternativeHeadline', 'indexableContents']
  },

  catalogs : {
    searchSelectAttributes : ['pages','catalog_id','pages_finished','title','publisher','completed'],
    collection : '/collection/sherry-lehmann',
    idRoot : '/collection/sherry-lehmann/catalogs/'
  },

  pages : {
    searchSelectAttributes : ['page_id','page','catalog_id','editable','marks', 'completed']
  },

  suggestApiHost : 'https://wine-search.library.ucdavis.edu',

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
        primaryColor: '#912046'
      }
    }
  }
}

setApiHost(config);

module.exports = config;