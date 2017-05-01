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

  _redraw: function() {
    if ( !this.bounds ) return
    if( this.map ) this.map.remove();

    this.map = L.map(this.$.map, {
      crs: L.CRS.Simple,
      minZoom: -2
    });

    L.imageOverlay(
      this.apiHost+'/media?select=contents&media_id=eq.'+this.selectedPage.media_id,
      this.bounds
    ).addTo(this.map);
    
    this.map.fitBounds(this.bounds);
    setTimeout(function(){
      this.map.zoomIn();
    }.bind(this), 200);
    

    this.marksLayer = new L.FeatureGroup();
    
    this.map.addLayer(this.marksLayer);

    var myIcon = L.divIcon({html: '<app-marker draw-tool-marker></app-marker>'});
    this.drawToolOptions.draw.marker.icon = myIcon;

    this.drawControl = new L.Control.Draw(this.drawToolOptions);

    if( this.selectedPage.editable && !this.selectedPage.completed ) {
      this.map.addControl(this.drawControl);

      this.map.on(L.Draw.Event.DRAWSTART, this._onDrawToolDrawStart.bind(this));
      this.map.on(L.Draw.Event.CREATED, this._onDrawToolCreated.bind(this));
    }

    this.mapMarkers = {};
    for( var key in this.marks ) {
      if( this.mapMarkers[key] ) continue;
      this.mapMarkers[key] = this._drawMark(this.marks[key]);
    }
    
    if( this.currentState.markId ) {
      this._selectAndShowPopup(this.currentState.markId);
    }

    L.control.adminControl({ position: 'topright' }).addTo(this.map);

    // hack
    var controls = this.$.map.querySelectorAll('.leaflet-control, .leaflet-top, .leaflet-bottom');
    for( var i = 0; i < controls.length; i++ ) {
      controls[i].style.zIndex = 500;
    }

    this._updateMapSize();
    this._renderMarkControls();
  },

  _showHideControls : function(show) {
    if( this.$.carousel ) {
      this.$.carousel.style.display = show ? 'block' : 'none';
    }

    var ele = this.$.map.querySelector('.leaflet-top.leaflet-right');
    if( !ele ) return;
    ele.style.display = show ? 'block' : 'none';
  },

  _onDrawToolDrawStart :  function(e){
    if( this.userState && this.userState.user.isAnonymous && !this.isAnonymousAlertShow ) {
      alert('Reminder, you are creating marks as an anonymous user.');
      this.isAnonymousAlertShow = true;
    }
  },

  _onDrawToolCreated : function (e) {
    var type = e.layerType,
        layer = e.layer;
    
    this.ebEmit(
      'update-temp-catalog-page-mark', 
      {
        pageId : this.selected,
        xy : [e.layer._latlng.lng, e.layer._latlng.lat]
      }
    );

    this.pendingLayer = layer;
    window.location.hash = this.catalogId + '/' + this.selected + '/edit';
  }
}