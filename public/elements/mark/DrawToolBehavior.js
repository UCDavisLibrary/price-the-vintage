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
      this.apiHost+'/media?select=contents&media_id=eq.'+this.selectedPage.media_id,
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
    this.map.on(L.Draw.Event.CREATED, this._onDrawToolCreated.bind(this));

    this.mapMarkers = {};
    for( var key in this.marks ) {
      if( this.mapMarkers[key] ) continue;
      this.mapMarkers[key] = this._drawMark(this.marks[key]);

      if( this.currentState.editMarkId ) {
        if( this.currentState.editMarkId === key) {
          this.$.priceItem.edit(this.marks[key]);
          this._selectMarker(this.mapMarkers[key], key);
        } else if( this.mapMarkers[key] ) {
          this.mapMarkers[key]._icon.style.display = 'none';
        }
      }
    }

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

    var ele = this.$.map.querySelector('.leaflet-control-container');
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
    // device:gps-fixed
    return '<paper-icon-button icon="device:gps-fixed" style="'+style+'"></paper-icon-button>';
  }
}