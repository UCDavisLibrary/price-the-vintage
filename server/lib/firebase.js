const admin = require('firebase-admin');
const config = require('../config');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

if( config.GOOGLE_ENV ) {
  admin.initializeApp();
} else {
  admin.initializeApp({
    credential : admin.credential.cert(
      config.google.key
    )
  });
}

class Firebase {

  constructor() {
    this.admin = admin

    this.jwksClient = jwksClient({
      jwksUri: config.auth0.jwksUrl
    });

    this.getJwksKey = this.getJwksKey.bind(this);
  }

  async loginAuth0(token) {
    let profile = await this.parseAuth0Token(token);
    return admin.auth().createCustomToken(
      profile.sub,
      profile['https://ptv.library.ucdavis.edu/firebase_data']
    )
  }

  parseAuth0Token(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token, 
        this.getJwksKey, 
        { algorithms: ['RS256'] }, 
        (err, decoded) => {
          if( err ) reject(err);
          else resolve(decoded);
        }
      );
    });
  }

  getJwksKey(header, callback) {
    if( this.signingKey ) {
      return callback(null, this.signingKey);
    }

    this.jwksClient.getSigningKey(header.kid, (err, key) => {
      this.signingKey = key.publicKey || key.rsaPublicKey;
      setTimeout(() => this.signingKey = null, 60*60*1000);
      callback(null, this.signingKey);
    });
  }

}

module.exports = new Firebase();