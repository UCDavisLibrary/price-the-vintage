/**
 * Handle unregistering firebase listeners that are no longer used.
 */

var eventBus = require('../../eventBus');
var activityController = require('../activity');
var markupController = require('../marks');

// number of seconds to query for interested parties
var QUERY_INTERVAL = 5; 

class InterestedPartyController {

  constructor() {
    this.buffer = {};
    this.awaitingResponses = false;
    this.bufferTimer = -1;

    eventBus.on('interested-party-response', this.onResponse.bind(this));
    setInterval(this.query.bind(this), QUERY_INTERVAL * 1000);
  }
  
  query() {
    this.buffer = {
      markup : {},
      activity : {}
    };
    this.awaitingResponses = true;
    eventBus.emit('interested-party-request');
    this.onResponse();
  }

  /**
   * Expects event with
   * id - guid
   * types - array of types of interests, currently 'activity' or 'markup'
   */
  onResponse(e) {
    if( !this.awaitingResponses ) {
      return console.warn('Received interested party response, but not expecting it');
    }

    if( e ) {
      e.types.forEach(type => this.buffer[type][e.id] = true);
    }

    if( this.bufferTimer != -1 ) {
      clearTimeout(this.bufferTimer);
    }

    this.bufferTimer = setTimeout(() => {
      this.awaitingResponses = false;
      this.bufferTimer = -1;

      activityController.cleanup(this.buffer.activity);
      markupController.cleanup(this.buffer.markup);
    }, 100);
  }
}


module.exports = new InterestedPartyController();