const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

let serverEnv = process.env.SERVER_ENV || process.env.NODE_ENV || 'dams' || 'dev';
let clientEnv = process.env.CLIENT_ENV || 'dev';

let assetsDir = (clientEnv === 'prod') ? 'dist' : 'public';
let clientPackage = require(`./client/${assetsDir}/package.json`);

const GOOGLE_ENV = process.env.GOOGLE_CLOUD_PROJECT ? true : false;
let googleSecret;
if( !GOOGLE_ENV && fs) {
  let keyPath = path.join(__dirname, 'service-account.json');
  if( fs.existsSync(keyPath) ) {
    googleSecret = require(keyPath);
  }
}

let firebase = {
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
  },
  dams : {
    apiKey: "AIzaSyCJ3-m8UxxXBk7rWCwAVBVeDsGHH33uOOk",
    authDomain: "price-the-vintage-dams.firebaseapp.com",
    databaseURL: "https://price-the-vintage-dams.firebaseio.com",
    storageBucket: "price-the-vintage-dams.appspot.com"
  }
};
firebase = firebase[serverEnv];

let auth0ClientId = {
  dev : 'RmgYnxJ7hFnQ6HW5ja1I5NVYotPYO2PZ',
  prod : 'PKb1b9gAh5sdtzrqgdSLjzso0TedWfDf'
}
auth0ClientId = auth0ClientId[serverEnv];

module.exports = {
  GOOGLE_ENV,

  env : {
    server : serverEnv,
    client : clientEnv
  },

  server : {
    env : serverEnv,
    host : process.env.SERVER_HOST || `http://localhost:${PORT}`,
    port : PORT, 
    loglevel : process.env.SERVER_LOG_LEVEL || 'info',
    cookieSecret : process.env.SERVER_COOKIE_SECRET || 'changeme',
    cookieMaxAge : process.env.SERVER_COOKIE_MAX_AGE ? parseInt(process.env.SERVER_COOKIE_MAX_AGE) : (1000 * 60 * 60 * 24 * 7),
    appRoutes : [],
    sessionName : 'app-session'
  },

  client : {
    env :  clientEnv,
    assets : assetsDir,
    versions : {
      bundle : clientPackage.version,
      loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
    }
  },

  damsApi : {
    host : process.env.DAMS_HOST || 'https://digital.ucdavis.edu',
    textFields : ['name', 'description', 'abouts', 'alternativeHeadline', 'indexableContents'],
    catalogs : {
      collection : '/collection/sherry-lehmann',
      idRoot : '/collection/sherry-lehmann/catalogs/'
    }
  },

  pgrApi : {
    host : process.env.PGR_HOST || 'http://localhost:3000'
  },

  suggestApi : {
    host : process.env.SUGGEST_HOST || 'https://wine-search.library.ucdavis.edu'
  },

  google : {
    key : googleSecret,
    analyticsKey : 'UA-97570476-1'
  },

  firebase,

  auth0 : {
    domain : 'ucdlibrary.auth0.com', 
    clientID: auth0ClientId,
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