/***
 * Handle all mark actions for app-page-markup
 * */
const PageMarkup_MapMixin = subclass =>

class PageMarkup_MapControls extends subclass {
  static get properties() {
    return {
      mapMarkers : {
        type : Object,
        value : function() {
          return {};
        }
      },
      map: {
        type: Object,
        value: null
      },
      bounds: {
        type: Object,
        value: null
      },
      helpTextDismissed : {
        type : Boolean,
        value : false
      }
    }
  }

  get drawToolOptions() {
    return {
      position: 'topright',
      draw: {
        polyline:false,
        polygon: false,
        circle: false, // Turns off this drawing tool
        rectangle: false,
        marker: {
          icon: L.divIcon({html: '<app-marker draw-tool-marker></app-marker>'})
        }
      }
    }
  }

  ready() {
    super.ready();
    this.$.map.addEventListener('help-text-dismissed', this._onHelpTextDismissed.bind(this));
  }

  _renderMap() {
    if( !this.bounds ) return
    if( this.map ) this.map.remove();

    // make visible before we show map
    this.toggleState('loaded');

    this.map = L.map(this.$.map, {
      crs: L.CRS.Simple,
      minZoom: -2
    });

    // this is enabled on some browsers, not on others.  keeping css consistent
    this.$.map.classList.remove('leaflet-touch');

    L.imageOverlay(
      this.currentImg,
      this.bounds
    ).addTo(this.map);
    
    this.map.fitBounds(this.bounds);
    setTimeout(() => {
      this.map.zoomIn();
    }, 200);

    this.marksLayer = new L.FeatureGroup();
    
    this.map.addLayer(this.marksLayer);

    L.drawLocal.draw.handlers.marker.tooltip.start = 'Place by the name of the wine';
    this.drawControl = new L.Control.Draw(this.drawToolOptions);

    if( this.crowdData.editable && !this.crowdData.completed ) {
      if( !this.helpTextDismissed ) {
        this.helpTextControl = L.control.helpTextControl({ position: 'topright' }).addTo(this.map);
      }
      
      this.map.addControl(this.drawControl);

      this.map.on(L.Draw.Event.DRAWSTART, this._onDrawToolDrawStart.bind(this));
      this.map.on(L.Draw.Event.CREATED, this._onDrawToolCreated.bind(this));
    }

    L.control.adminControl({ position: 'topright' }).addTo(this.map);
    
    // hack
    var controls = this.$.map.querySelectorAll('.leaflet-control, .leaflet-top, .leaflet-bottom');
    for( var i = 0; i < controls.length; i++ ) {
      controls[i].style.zIndex = 500;
    }
  }

  _renderMapControls() {
    var mapControlLayer = this.$.map.querySelector('.leaflet-top.leaflet-right');

    if( this.viewState !== '' ) {
      this.$.carousel.style.display = 'none';
      if( mapControlLayer ) {
        mapControlLayer.style.display = 'none';
      }
      return;
    }

    this.$.carousel.style.display = 'block';
    if( mapControlLayer ) {
      mapControlLayer.style.display = 'block';
    }

    // render draw controls based on auth state
    if( !this.drawControl ) return;
    if( !this.drawControl._container ) return;

    if( !this.userState ) {
      this.drawControl._container.style.display = 'none';
      if( this.helpTextControl) this.helpTextControl._container.style.display = 'none';
      return 
    } else if ( this.userState.state === 'notLoggedIn' && this.userState.user && !this.userState.user.isAnonymous ) {
      this.drawControl._container.style.display = 'none';
      if( this.helpTextControl) this.helpTextControl._container.style.display = 'none';
      return 
    }

    this.drawControl._container.style.display = 'block';
  }

  _loadImage() {
    return new Promise((resolve, reject) => {
      var url = APP_CONFIG.damsApi.host+this.selectedPage.image.url;
      
      var img = new Image();
      img.onload = function() {
        this.bounds = [
          [0,0],
          [img.naturalHeight, img.naturalWidth]
        ];
        resolve();
      }.bind(this);

      this.currentImg = url;
      img.src = url;
    });
  }

  _onDrawToolDrawStart(e){
    if( this.userState && this.userState.user.isAnonymous && !this.isAnonymousAlertShow ) {
      alert('Reminder, you are creating marks as an anonymous user.');
      this.isAnonymousAlertShow = true;
    }

    if( this.helpTextControl ) {
      this.helpTextDismissed = true;
      this.helpTextControl._container.style.display = 'none';
    }
  }

  _onHelpTextDismissed() {
    this.helpTextDismissed = true;
  }

  _onDrawToolCreated(e) {
    var type = e.layerType,
        layer = e.layer;
    

    this.MarksModel.updateTempMark(
      this.userState.user.sub,
      this.selectedPage['@id'], 
      [e.layer._latlng.lng, e.layer._latlng.lat]
    );

    this.pendingAddMark = layer;
    this.emit('ui-set-location', 'create-mark'+this.selectedCatalogId + '/' + this.selectedPageIndex);
  }

  _updateMapSize() {
    if( !this.map ) return;

    this.debounce('_updateMapSize', () => {
      this.map.invalidateSize();
    }, 50);
  }

}

export default PageMarkup_MapMixin;