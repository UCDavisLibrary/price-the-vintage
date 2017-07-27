var EventBus = require('cork-app-utils').EventBus;

class ObserverEventEmitter {


  // auth
  static onAuthStateChange(state) {
    EventBus.emit('auth-update', state);
  }

  // marks
  static onMarkChange(state) {
    EventBus.emit('catalog-page-marks-update', state);
  }

  static onApprovedMarkChange(state) {
    EventBus.emit('approved-catalog-page-marks-update', state);
  }

  static onPendingMarkSearchChange(state) {
    EventBus.emit('pending-mark-search-update', state);
  }

  // pages
  static onPagesChange(state) {
    EventBus.emit('catalog-pages-update', state);
  }

  static onPageChange(state) {
    EventBus.emit('catalog-page-update', state);
  }
  
  static onPageMetadataChange(state) {
    EventBus.emit('page-metadata-update', state);
  }

  static onPageSearchChange(state) {
    EventBus.emit('search-catalog-pages-update', state);
  }


}

module.exports = ObserverEventEmitter;