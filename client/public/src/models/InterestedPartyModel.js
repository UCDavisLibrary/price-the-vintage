var BaseModel = require('@ucd-lib/cork-app-utils').BaseModel;
var activity = require('./lib/activity');
var marks = require('../lib/marks');

// number of seconds to query for interested parties
var QUERY_INTERVAL = 20; 

/**
 * Controller for handling unregistering firebase listeners that are no longer used.
 */
class InterestedPartyModel extends BaseModel {

  constructor() {
    super();

    this.responses = {};
    this.awaitingResponses = false;
    this.bufferTimer = -1;

    // run every QUERY_INTERVAL seconds
    setInterval(this.query.bind(this), QUERY_INTERVAL * 1000);

    this.TYPES = {
      ACTIVITY : 'activity',
      PAGE : 'page'
    }

    this.events = {
      INTERESTED_PARTY_REQUEST : 'interested-party-request'
    }

    this.register('InterestedPartyModel');
  }
  
  /**
   * @method query
   * @description Start the polling process.  This sends a single event that 
   * elements who listen to Firebase realtime resources should listen for.  They 
   * should then send back a interested-party-response when received.  These responses 
   * will be buffered in the 'responses' buy resource type.  After 100ms of no responses
   * resources will be 'cleaned' (disconnected from firebase) based on resource
   * id/type that did NOT respond.
   */
  query() {
    this.responses = {};
    this.awaitingResponses = true;
    this.eventBus.emit(this.events.INTERESTED_PARTY_REQUEST, {TYPES: this.TYPES});
    this.onResponse();
  }

  /**
   * @method onResponse
   * @description Handle interested-party-response
   * 
   * @param {Object} e - event bus event
   * @param {Object} e.id - resource id
   * @param {Object} e.types - resource type. Array of types of interests, currently 'pages', 'activity' or 'markup' are supported.
   */
  onResponse(e) {
    // proly badness
    if( !this.awaitingResponses ) {
      return console.warn('Received interested party response, but not expecting it');
    }

    // add to buffer
    if( e ) {
      e.types.forEach((type) => {
        if( !this.responses[type] ) {
          this.responses[type] = {};
        }

        if( e.ids ) {
          e.ids.forEach(id => this.buffer[type][id] = true);
        } else {
          this.buffer[type][e.id] = true
        }
      });
    }

    // wait 100ms past last response, then run cleanup methods
    if( this.bufferTimer !== -1 ) {
      clearTimeout(this.bufferTimer);
    }

    this.bufferTimer = setTimeout(() => {
      this.awaitingResponses = false;
      this.bufferTimer = -1;

      activity.cleanup(this.responses.activity);
      marks.cleanup(this.responses.page);
    }, 100);
  }
}


module.exports = new InterestedPartyModel();