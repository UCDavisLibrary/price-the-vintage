var store = require('../../redux/store');
var config = require('../../config').apiHost;
var actions = require('../../redux/actions/config');

/**
 * Controller for handling config file interactions
 */
function ConfigController() {


  this.getEnv = function() {
    var location = 'remote';
    var env = 'dev';

    if( typeof window !== 'undefined' ) {


      if( getParameterByName('api') ) {
        location = getParameterByName('api');
      } else if( window.location.host.indexOf('localhost') > -1 ) {
        location = 'local';
      }

      if( getParameterByName('env') ) {
        env = getParameterByName('env');
      } else if( window.location.host === 'ptv.library.ucdavis.edu' ||
                window.location.host === 'price-the-vintage.firebaseapp.com' ) {
        env = 'prod';
      }
    } else {
      env = process.env.PRICE_THE_VINTAGE_ENV || 'dev';
    }

    return {location, env};
  }

  /**
   * Get the current host provided in config file.
   * @returns {string} - host url
   */
  this.getApiHost = function() {
    if( this.apiHost ) {
      return this.apiHost;
    }

    var host = config;
    var envVars = this.getEnv();
    host = host[envVars.location][envVars.env];

    this.apiHost = host;
    console.log('Current API ENV', envVars);
    console.log('API HOST', host);

    return host;
  }

  store.dispatch(
    actions.setConfigHost(this.getApiHost())
  )

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var controller = new ConfigController();
require('./events')(controller);
module.exports = controller;