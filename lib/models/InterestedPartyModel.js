var BaseModel = require('cork-app-utils').BaseModel;
var activityController = require('./ActivityModel');
var markupController = require('./MarksModel');
// var pagesController = require('./PagesModel');

// number of seconds to query for interested parties
var QUERY_INTERVAL = 10; 

/**
 * Controller for handling unregistering firebase listeners that are no longer used.
 */
class InterestedPartyModel extends BaseModel {

  constructor() {
    super();

    this.buffer = {};
    this.awaitingResponses = false;
    this.bufferTimer = -1;

    // we want to listen for elements telling us they are interested in a resource
    this.eventBus.on('interested-party-response', this.onResponse.bind(this));

    // run every QUERY_INTERVAL seconds
    setInterval(this.query.bind(this), QUERY_INTERVAL * 1000);

    this.bindMethods('InterestedPartyModel');
  }
  
  /**
   * Start the polling process.  This sends a single event that elements who 
   * listen to Firebase realtime resources should listen for.  They should then
   * send back a interested-party-response when received.  These responses will
   * be buffered in the 'buffer' buy resource type.  After 100ms of no responses
   * resources will be 'cleaned' (disconnected from firebase) based on resource
   * id/type that did NOT respond.
   */
  query() {
    this.buffer = {
      markup : {},
      activity : {},
      pages : {}
    };
    this.awaitingResponses = true;
    this.eventBus.emit('interested-party-request');
    this.onResponse();
  }

  /**
   * Handle interested-party-response
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
        if( e.ids ) {
          e.ids.forEach(id => this.buffer[type][id] = true);
        } else {
          this.buffer[type][e.id] = true
        }
      });
    }

    // wait 100ms past last response, then run cleanup methods
    if( this.bufferTimer != -1 ) {
      clearTimeout(this.bufferTimer);
    }

    this.bufferTimer = setTimeout(() => {
      this.awaitingResponses = false;
      this.bufferTimer = -1;

      activityController.cleanup(this.buffer.activity);
      markupController.cleanup(this.buffer.markup);
      // pagesController.cleanup(this.buffer.pages);
    }, 100);
  }
}


module.exports = new InterestedPartyModel();