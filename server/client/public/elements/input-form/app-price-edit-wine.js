import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-price-edit-wine.html"

export class AppPriceEditWine extends PolymerElement {

  static get properties() {
    return {
      pageId : {
        type : String,
        value : '',
      },
      viewMode : {
        type : Boolean,
        value : false          
      }
    }
  }

  static get template() {
    return html([template]);
  }

  get wineTypeOptions() {
    return [
      {
        value : 'Still',
        icon : 'cork:wine-still'
      },
      {
        value : 'Sparkling',
        icon : 'cork:wine-sparkling'
      },
      {
        value : 'Fortified',
        icon : 'cork:wine-fortified'
      }
    ]
  }

  get wineColorOptions() {
    return [
      {
        value : 'Red',
        icon : 'cork:wine-red'
      },
      {
        value : 'White',
        icon : 'cork:wine-white'
      },
      {
        value : 'Rosé',
        icon : 'cork:wine-rose'
      }
    ]
  }

  get bottleTypeOptions() {
    return [
      {value : "Split"},
      {value : "Piccolo"},
      {value : "Pony"},
      {value : "Quarter Bottle"},
      {value : "Snipe"},
      {value : "Quarter"},
      {value : "Chopine"},
      {value : "Demi"},
      {value : "Half Bottle"},
      {value : "Tenth"},
      {value : "Jennie"},
      {value : "Pinte"},
      {value : "Clavelin"},
      {value : "Standard"},
      {value : "Fifth"},
      {value : "Litre"},
      {value : "Magnum"},
      {value : "Marie Jeanne"},
      {value : "Jeroboam"},
      {value : "Rehoboam"},
      {value : "McKenzie"},
      {value : "Imperial"},
      {value : "Methuselah"},
      {value : "Salmanazar"},
      {value : "Balthazar"},
      {value : "Nebuchadnezzar"},
      {value : "Melchior"},
      {value : "Solomon"},
      {value : "Sovereign"},
      {value : "Primat"},
      {value : "Goliath"},
      {value : "Melchizedek"},
      {value : "Midas"},
      {value : "Tenths"},
      {value : "Pint"},
      {value : "Quart"}
    ].sort((a, b) => {
      if( a.value > b.value ) return 1;
      if( a.value < b.value ) return -1;
      return 0;
    })
  }

  reset() {
    this.$.color.value = 'Red';
    this.$.wineType.value = 'Still';
    this.$.bottleType.value = 'Standard';
    this.$.name.value = '';
    this.$.price.value = '';
    this.$.casePrice.value = '';
    this.$.year.value = '';
    this.$.country.value = '';
    this.$.section.value = '';
  }

  edit(data) {
    this.$.color.value = data.color || this.getEmptyValue('Red');
    this.$.wineType.value = data.wineType || this.getEmptyValue('Still');
    this.$.bottleType.value = data.bottleType || this.getEmptyValue('Standard');
    this.$.section.value = data.section || this.getEmptyValue();
    this.$.name.value = data.name || this.getEmptyValue();
    this.$.price.value = this.getDollarValue(data.price);
    this.$.casePrice.value = this.getDollarValue(data.casePrice);
    this.$.country.value = data.country || this.getEmptyValue();
    this.$.year.value = data.year || this.getEmptyValue();
  }

  getDollarValue(val) {
    if( !val ) return this.getEmptyValue();
    return parseFloat(val).toFixed(2);
  }

  getEmptyValue(val) {
    return this.viewMode ? '-' : (val || '');
  }

  getData() {
    return {
      color: this.$.color.value,
      wineType : this.$.wineType.value,
      bottleType : this.$.bottleType.value,
      name : this.$.name.value,
      price : this.$.price.value,
      casePrice : this.$.casePrice.value,
      country : this.$.country.value,
      year : this.$.year.value,
      section : this.$.section.value
    };
  }

}

window.customElements.define('app-price-edit-wine', AppPriceEditWine);