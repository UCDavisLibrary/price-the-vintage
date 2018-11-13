/***
 * Handle all mark actions for app-page-markup
 * */
const PageMarkup_MarkMixin = subclass =>

class PageMarkup_MarkControls extends subclass {
  static get properties() {
    return {
      marks : {
        type : Object,
        value : function() {
          return {};
        }
      }
    }
  }

  async _loadMarks() {
    let marks = await this.MarksModel.get(this.selectedPageId);
    marks.forEach(this._onMarksUpdate.bind(this));
  }

  _onMarksUpdate(e) {
    if( e.pageId !== this.selectedPageId ) return;

    // if mark is not loaded or has deleted flag, remove it
    if( e.state !== 'loaded' || e.deleted ) {
      return this._cleanOutMark(e.id);
    }

    // store mark object
    this.marks[e.id] = e;

    // map marks is a hash of the app-mark elements by mark id
    if( this.mapMarkers[e.id] ) {

      if( e.data.isTemp && this._isMyMark(e) ) {
        return; // don't draw my temp marks
      }

      // this mark already exists, just make sure it's in the correct spot
      this.mapMarkers[e.id].setLatLng([e.data.xy[1], e.data.xy[0]]);
    } else {

      // draw a new mark
      this.mapMarkers[e.id] = this._drawMark(e);
    }

    // tricky bit here, marks come in on at a time
    // once they are loaded and if this is the selected mark
    // we are now ready to render the form
    if( this.appState.markId === e.id ) {
      this._renderForm();
    }
  }

  // TODO: this still needed?
  _onMarksApproved(e) {
    if( e.state !== 'loaded' || e.pageId !== this.selectedPageId ) return;

    e.payload.forEach((mark) => {
      if( this.mapMarkers[mark.markId] && this.marksLayer ) {
        this.mapMarkers[mark.markId].removeFromLayer();
      }

      this.marks[mark.markId] = {
        state : 'loaded',
        pageId : mark.pageId,
        id : mark.markId,
        data : mark
      };

      this.mapMarkers[mark.markId] = this._drawMark(this.marks[mark.markId]);
    });
  }

  _removeMarkStart(pageId, markId) {
    this._removeMark(pageId, markId)
          .then(() => this._cleanOutMark(markId))
        .catch(e => {
          alert('Failed to remove mark');
          console.error(e);
        })
  }

  _cleanOutMark(markId) {
    if( this.marks[markId] ) {
      delete this.marks[markId];
    }

    if( this.mapMarkers[markId] ) {
      this.mapMarkers[markId].removeFromLayer();
      delete this.mapMarkers[markId];
    }
  }

  _renderMarks() {
    var mark;
    for( var key in this.marks ) {
      mark = this.marks[key];

      // remove any old mark
      if( mark.pageId !== this.selectedPageId ) {
        this._cleanOutMark(key);

      // draw new marks on screen
      } else {
        if( this.mapMarkers[key] ) continue;
        this.mapMarkers[key] = this._drawMark(this.marks[key]);
      }
    }
  }

  _isMyMark(mark) {
    if( this.userState && (this.userState.user.uid === mark.data.user) ) {
      return true;
    }
    return false;
  }

  _drawMark(mark) {
    if( !this.marksLayer ) return null;

    var marker = document.createElement('app-marker');
    marker.init(mark, this.selectedCatalogId, this.selectedPageId);
    marker.addTo(this.marksLayer);

    return marker;
  }

  _onAddMarkCancel(e) {
    // set mark back to where it was
    if( e.detail.resetMark && this.mapMarkers[this.appState.markId] ) {
      this.mapMarkers[this.appState.markId]._resetLocation();
    }

    this._removeTmpMark();
    this.emit('ui-set-location', this.selectedCatalogId + '/' + this.selectedPageId);
  }

  _onDeleteMark(e) {
    var mark = e.detail;
    this._removeMarkStart(this.selectedPageId, mark.id);
    this.emit('ui-set-location', this.selectedCatalogId + '/' + this.selectedPageId);
  }

  /**
   * Called from form
   */
  _onAddMark(e) {
    this._removeTmpMark();
  }

  _removeTmpMark() {
    super._removeTempMark();

    // this._isMyMark(this.marks[key]) 
    for( var key in this.marks ) {
      if( this.marks[key].data && 
          this.marks[key].data.isTemp ) {

        this._cleanOutMark(key);
      }

      if( this.addMarker ) {
        this.map.removeLayer(this.addMarker);
        this.addMarker = null;
      }
    }

    this._renderMarks();
  }

}

export default PageMarkup_MarkMixin;