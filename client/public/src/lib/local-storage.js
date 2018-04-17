
class LocalStorage {

  constructor() {
    this.supported = (typeof window !== 'undefined' && window.localStorage ) ? true : false;
    this.data = {};
  }


  setItem(key, value) {
    if( typeof value === 'object' ) {
      value = JSON.stringify(value);
    }

    if( this.supported ) localStorage.setItem(key, value);
    else this.data[key] = value;
  }

  getItem(key) {
    if( this.supported ) {
      return localStorage.getItem(key);
    }
    
    return this.data[key];
  }

  removeItem(key) {
    if( this.supported ) {
      localStorage.removeItem(key);
    } else {
      if( this.data[key] ) {
        delete this.data[key];
      }
    }
  }

  clear() {
    if( this.supported ) localStorage.clear();
    else this.data = {} 
  }

}

module.exports = new LocalStorage();