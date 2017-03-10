var MarkBehavior = {

  drawToolOptions : {
    position: 'topright',
    draw: {
      polyline:false,
      polygon: false,
      circle: false, // Turns off this drawing tool
      rectangle: false,
      marker: {
        icon: ''
      }
    }
  },

  ready : function() {
    this.bufferedEvents = new BufferedEvents();
  },

  _getBaseMarkerStyle : function() {
    return {
      'position' : 'relative',
      'box-shadow': '0 0 8px black',
      'background': '#9C27B0',
      'color': 'white',
      'border-radius': '20px 20px 0 20px',
      'top': '-32px',
      'left': '-32px'
    }
  },

  _redraw: function() {
    if ( !this.bounds ) return
    if( this.map ) this.map.remove();

    this.map = L.map(this.$.map, {
      crs: L.CRS.Simple,
      minZoom: -2
    });

    L.imageOverlay(
      this.apiHost+'/pages/'+this.selected+'/image', 
      this.bounds
    ).addTo(this.map);
    
    this.map.fitBounds(this.bounds);

    this.marksLayer = new L.FeatureGroup();
    
    this.map.addLayer(this.marksLayer);

    var style = this._getMarkBtnStyle();
    var myIcon = L.divIcon({html: this._getMarkBtn(style)});
    this.drawToolOptions.draw.marker.icon = myIcon;

    this.drawControl = new L.Control.Draw(this.drawToolOptions);
    this.map.addControl(this.drawControl);


    this.map.on(L.Draw.Event.DRAWSTART, this._onDrawToolDrawStart.bind(this));
    this.map.on(L.Draw.Event.DRAWSTOP, this._onDrawToolDrawStop.bind(this));
    this.map.on(L.Draw.Event.CREATED, this._onDrawToolCreated.bind(this));

    this.mapMakers = {};
    for( var key in this.marks ) {
      this.mapMakers[key] = this._drawMark(this.marks[key]);
    }

    // hack
    var controls = this.$.map.querySelectorAll('.leaflet-control, .leaflet-top, .leaflet-bottom');
    for( var i = 0; i < controls.length; i++ ) {
      controls[i].style.zIndex = 20;
    }

    this._updateMapSize();
  },

  _showHideControls : function(show) {
    if( this.$.carousel ) {
      this.$.carousel.style.display = show ? 'block' : 'none';
    }

    var ele = this.$.map.querySelector('.leaflet-control-container');
    if( !ele ) return;
    ele.style.display = show ? 'block' : 'none';
  },

  _onDrawToolDrawStart :  function(e){
    if( this.userState && this.userState.user.isAnonymous ) {
      alert('Reminder, you are creating marks as an anonymous user.');
    }

    // only a small hack...
    this.drawControl._toolbars.draw._modes.marker.handler._mouseMarker.on('move', function(e) {
      // only send one event every 100ms
      this.bufferedEvents.emit(
        'update-temp-catalog-page-mark', 
        {
          pageId : this.selected,
          xy : [e.latlng.lng, e.latlng.lat]
        }
      );
    }.bind(this));
  },

  _onDrawToolDrawStop : function() {
    this.ebEmit('remove-temp-catalog-page-mark', {pageId: this.selected});
  },

  _onDrawToolCreated : function (e) {
    var type = e.layerType,
        layer = e.layer;

    this.pendingLayer = layer;
    window.location.hash = this.catalogId + '/' + this.selected + '/edit';
  },

  _getMarkBtnStyle : function(otherUserMark) {
    var baseStyle = this._getBaseMarkerStyle();

    if( otherUserMark ) {
      baseStyle.background = '#4CAF50';
    }

    var styleArray = [];
    for( var key in baseStyle ) {
      styleArray.push(key+':'+baseStyle[key]);
    }
    return styleArray.join(';');
  },

  _getMarkBtn : function(style, mark) {
    if( mark && mark.data.isTemp ) {
      return '<app-icon-spinner icon="settings" spin style="'+style+'; padding: 8px"></app-icon-spinner>'
    }
    return '<paper-icon-button icon="device:gps-fixed" style="'+style+'"></paper-icon-button>';
  }
}