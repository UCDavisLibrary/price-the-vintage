var EventLoopBehavior = (function() {

  function init() {
    if( !this.eventLoops ) return;

    if( !this.eventLoop ) {
      this.eventLoop = {};
    }

    for( var key in this.eventLoops ) {
      if( !this.eventLoop[key] ) {
        this.eventLoop[key] = {};
      }

      if( this.eventLoop[key]._attached ) continue;
      initLoop(key, this.eventLoops[key], this);
    }
  }

  function initLoop(name, options, ele) {
    var elObj = ele.eventLoop[name];

    if( options.req ) {
      initRequest(name, options.req, elObj, ele);
    }
    if( options.resp && options.resp.handler ) {
      initResponse(name, options.resp, elObj, ele);
      elObj._attached = true;
    }
    
  }

  function initRequest(name, options, elObj, ele) {
    // check to see if we are interested in the event
    // as well as add a pre-handler hook
    var handle = options.handle || function(){ return true };

    var fn = function(payload) {
      payload = (options.payload && options.payload.call(ele, payload || {})) ||  
                payload ||
                {};

      // set handler to null of false if you don't want to do anything
      if( options.handler !== null && options.handler !== false ) {
        if( options.handler ) {
          payload.handler = options.handler.bind(ele);
        } else if( elObj.resp ) { // default thing to do is bind to response
          payload.handler = elObj.resp.bind(ele);
        }
      }

      if( !options.event ) {
        console.warn(ele.nodeName+' EventLoopBehavior: '+name+' did not provide a request event');
        return;
      }

      ele.ebEmit(options.event, payload);
    };

    if( options.debounce ) {
      elObj.req = function(payload) {
        if( handle.call(ele) === false ) return;
        ele.debounce('eventLoop_'+name+'_req', function(){
          fn.call(ele, payload);
        }, options.debounce);
      }
    } else {
      elObj.req = function(payload) {
        if( handle.call(ele) === false ) return;
        fn.call(ele, payload);
      }
    }

  }

  function initResponse(name, options, elObj, ele) {
    elObj.resp = function(e) {
      // check to see if we are interested in the event
      // as well as add a pre-handler hook
      if( options.handle && options.handle.call(ele, e) === false ) {
        return;
      }

      ele.debounce('eventLoop_'+name+'_resp', function(){
        options.handler.call(ele, e);
      }, options.debounce !== undefined ? options.debounce : 25);
    }.bind(ele);

    if( !options.event ) {
      console.warn(ele.nodeName+' EventLoopBehavior: '+name+' did not provide a response event');
      return;
    }

    ele.getEventBus().on(options.event, elObj.resp);
  }

  return {
    ready : init,
    attached : init,
    detached : function() {
      if( !this.eventLoop ) return;

      for( var key in this.eventLoop ) {
        if( this.eventLoop[key]._attached ) continue;

        var elObj = this['_'+key];
        this.getEventBus().removeListener(this.eventLoops[key].resp.event, elObj.resp);
        this.eventLoop[key]._attached = false;
      }
    },

    getEventLoop : function() {
      if( !this.eventLoop ) init.call(this);
      return this.eventLoop;
    }
  }

})();