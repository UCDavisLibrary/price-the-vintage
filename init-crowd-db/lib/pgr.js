// this file should have a property jwt-secret which is jwt secret for pgr
const secrets = require('../secrets');
const jwt = require('jsonwebtoken');
const request = require('request');

class PGR {

  constructor() {
    this.url = process.argv[2];
    console.log('Using PGR at: '+this.url);

    this.token = jwt.sign(
      {
        username: 'init-bot',
        role : 'admin' 
      }, 
      secrets['jwt-secret']
    );
  }

  insert(table, payload) {
    return this.request(
      this.url+'/'+table,
      {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )
  }

  request(uri, options={}) {
    if( !options.headers ) options.headers = {};
    options.headers.Authorization = 'Bearer '+this.token;

    return new Promise((resolve, reject) => {
      request(uri, options, (error, response) => {
        if( error ) reject(error);
        else resolve(response);
      })
    });
  }

}

module.exports = new PGR();