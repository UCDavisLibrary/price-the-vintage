/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/elements/price-the-vintage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/elements/price-the-vintage.html":
/*!************************************************!*\
  !*** ./public/elements/price-the-vintage.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<style>\n  :host {\n    display: block;\n    height: 100%;\n    position: relative;\n  }\n\n  paper-toolbar {\n    --paper-toolbar-background: var(--primary-color);\n  }\n\n  paper-header-panel {\n    --paper-header-panel-shadow: {\n      z-index: 500;\n    }\n  }\n\n  iron-pages {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n  }\n\n  #toolbar {\n    z-index: 550;\n  }\n</style>\n\n<paper-header-panel style=\"height: 100%\">\n  <paper-toolbar id=\"toolbar\" slot=\"header\">\n    <app-header class=\"flex\" slot=\"top\"></app-header>\n  </paper-toolbar>\n\n\n  <iron-pages \n    selected=\"[[selectedSection]]\" \n    attr-for-selected=\"section\" \n    selected-attribute=\"active\">\n\n    <app-admin-interface section=\"admin\"></app-admin-interface>\n    <app-catalogs-list section=\"list\"></app-catalogs-list>\n    <app-page-markup section=\"page\"></app-page-markup>\n    <app-user-dashboard section=\"user\"></app-user-dashboard>\n  </iron-pages>\n\n</paper-header-panel>\n";

/***/ }),

/***/ "./public/elements/price-the-vintage.js":
/*!**********************************************!*\
  !*** ./public/elements/price-the-vintage.js ***!
  \**********************************************/
/*! exports provided: PriceTheVintage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceTheVintage", function() { return PriceTheVintage; });
/* harmony import */ var _polymer_polymer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @polymer/polymer */ "./public/node_modules/@polymer/polymer/polymer-element.js");
/* harmony import */ var _price_the_vintage_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./price-the-vintage.html */ "./public/elements/price-the-vintage.html");
/* harmony import */ var _price_the_vintage_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_price_the_vintage_html__WEBPACK_IMPORTED_MODULE_1__);



class PriceTheVintage extends Mixin(_polymer_polymer__WEBPACK_IMPORTED_MODULE_0__["PolymerElement"])
  .with(EventBusMixin, AppStateMixin, AuthMixin, UserActivityMixin, CatalogsMixin) {

  static get properties() {
    return {
        /**
         * Controls the iron list selected page
         **/
        selectedSection : {
          type : String,
          value : ''
        }
      }
  }

  static get template() {
    return Object(_polymer_polymer__WEBPACK_IMPORTED_MODULE_0__["html"])([_price_the_vintage_html__WEBPACK_IMPORTED_MODULE_1___default.a]);
  }

  constructor() {
    super();

    this.bind = {
      'ui-set-location' : '_setWindowUrl'
    };
  }

  ready() {
    this.active = true;
    super.ready();
  }

  _onAuthUpdate(e) {
    this.authState = e;

    if( this.route && e.state === 'loggedIn' && this.route.catalogId && this.route.pageId ) {
      this._setUserActivity(this.route.catalogId, this.route.pageId);
    }
  }

  _setWindowUrl(hash) {
    window.location.hash = hash;
  } 

}

window.customElements.define('price-the-vintage', PriceTheVintage);

/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/elements/dom-module.js":
/*!*************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/elements/dom-module.js ***!
  \*************************************************************************/
/*! exports provided: DomModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomModule", function() { return DomModule; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolve-url.js */ "./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js");
/* harmony import */ var _utils_settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/settings.js */ "./public/node_modules/@polymer/polymer/lib/utils/settings.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





let modules = {};
let lcModules = {};
/**
 * Sets a dom-module into the global registry by id.
 *
 * @param {string} id dom-module id
 * @param {DomModule} module dom-module instance
 * @return {void}
 */
function setModule(id, module) {
  // store id separate from lowercased id so that
  // in all cases mixedCase id will stored distinctly
  // and lowercase version is a fallback
  modules[id] = lcModules[id.toLowerCase()] = module;
}
/**
 * Retrieves a dom-module from the global registry by id.
 *
 * @param {string} id dom-module id
 * @return {DomModule!} dom-module instance
 */
function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}

/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */
class DomModule extends HTMLElement {

  static get observedAttributes() { return ['id']; }

  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   *
   * @export
   * @nocollapse Referred to indirectly in style-gather.js
   */
  static import(id, selector) {
    if (id) {
      let m = findModule(id);
      if (m && selector) {
        return m.querySelector(selector);
      }
      return m;
    }
    return null;
  }

  /* eslint-disable no-unused-vars */
  /**
   * @param {string} name Name of attribute.
   * @param {?string} old Old value of attribute.
   * @param {?string} value Current value of attribute.
   * @param {?string} namespace Attribute namespace.
   * @return {void}
   * @override
   */
  attributeChangedCallback(name, old, value, namespace) {
    if (old !== value) {
      this.register();
    }
  }
  /* eslint-enable no-unused-args */

  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */
  get assetpath() {
    // Don't override existing assetpath.
    if (!this.__assetpath) {
      // note: assetpath set via an attribute must be relative to this
      // element's location; accomodate polyfilled HTMLImports
      const owner = window.HTMLImports && HTMLImports.importForElement ?
        HTMLImports.importForElement(this) || document : this.ownerDocument;
      const url = Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__["resolveUrl"])(
        this.getAttribute('assetpath') || '', owner.baseURI);
      this.__assetpath = Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__["pathFromUrl"])(url);
    }
    return this.__assetpath;
  }

  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   * @return {void}
   */
  register(id) {
    id = id || this.id;
    if (id) {
      // Under strictTemplatePolicy, reject and null out any re-registered
      // dom-module since it is ambiguous whether first-in or last-in is trusted
      if (_utils_settings_js__WEBPACK_IMPORTED_MODULE_2__["strictTemplatePolicy"] && findModule(id) !== undefined) {
        setModule(id, null);
        throw new Error(`strictTemplatePolicy: dom-module ${id} re-registered`);
      }
      this.id = id;
      setModule(id, this);
      styleOutsideTemplateCheck(this);
    }
  }
}

DomModule.prototype['modules'] = modules;

customElements.define('dom-module', DomModule);


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/element-mixin.js":
/*!**************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/element-mixin.js ***!
  \**************************************************************************/
/*! exports provided: version, ElementMixin, instanceCount, registrations, register, dumpRegistrations, updateStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementMixin", function() { return ElementMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instanceCount", function() { return instanceCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registrations", function() { return registrations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dumpRegistrations", function() { return dumpRegistrations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStyles", function() { return updateStyles; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/settings.js */ "./public/node_modules/@polymer/polymer/lib/utils/settings.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/* harmony import */ var _utils_style_gather_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/style-gather.js */ "./public/node_modules/@polymer/polymer/lib/utils/style-gather.js");
/* harmony import */ var _utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/resolve-url.js */ "./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js");
/* harmony import */ var _elements_dom_module_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../elements/dom-module.js */ "./public/node_modules/@polymer/polymer/lib/elements/dom-module.js");
/* harmony import */ var _property_effects_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./property-effects.js */ "./public/node_modules/@polymer/polymer/lib/mixins/property-effects.js");
/* harmony import */ var _properties_mixin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./properties-mixin.js */ "./public/node_modules/@polymer/polymer/lib/mixins/properties-mixin.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/










/**
 * Current Polymer version in Semver notation.
 * @type {string} Semver notation of the current version of Polymer.
 */
const version = '3.0.5';

/**
 * Element class mixin that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * Subclassers may provide the following static getters to return metadata
 * used to configure Polymer's features for the class:
 *
 * - `static get is()`: When the template is provided via a `dom-module`,
 *   users should return the `dom-module` id from a static `is` getter.  If
 *   no template is needed or the template is provided directly via the
 *   `template` getter, there is no need to define `is` for the element.
 *
 * - `static get template()`: Users may provide the template directly (as
 *   opposed to via `dom-module`) by implementing a static `template` getter.
 *   The getter must return an `HTMLTemplateElement`.
 *
 * - `static get properties()`: Should return an object describing
 *   property-related metadata used by Polymer features (key: property name
 *   value: object containing property metadata). Valid keys in per-property
 *   metadata include:
 *   - `type` (String|Number|Object|Array|...): Used by
 *     `attributeChangedCallback` to determine how string-based attributes
 *     are deserialized to JavaScript property values.
 *   - `notify` (boolean): Causes a change in the property to fire a
 *     non-bubbling event called `<property>-changed`. Elements that have
 *     enabled two-way binding to the property use this event to observe changes.
 *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
 *     To set a read-only property, use the private setter method
 *     `_setProperty(property, value)`.
 *   - `observer` (string): Observer method name that will be called when
 *     the property changes. The arguments of the method are
 *     `(value, previousValue)`.
 *   - `computed` (string): String describing method and dependent properties
 *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
 *     Computed properties are read-only by default and can only be changed
 *     via the return value of the computing method.
 *
 * - `static get observers()`: Array of strings describing multi-property
 *   observer methods and their dependent properties (e.g.
 *   `'observeABC(a, b, c)'`).
 *
 * The base class provides default implementations for the following standard
 * custom element lifecycle callbacks; users may override these, but should
 * call the super method to ensure
 * - `constructor`: Run when the element is created or upgraded
 * - `connectedCallback`: Run each time the element is connected to the
 *   document
 * - `disconnectedCallback`: Run each time the element is disconnected from
 *   the document
 * - `attributeChangedCallback`: Run each time an attribute in
 *   `observedAttributes` is set or removed (note: this element's default
 *   `observedAttributes` implementation will automatically return an array
 *   of dash-cased attributes based on `properties`)
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertyEffects
 * @appliesMixin PropertiesMixin
 * @property rootPath {string} Set to the value of `rootPath`,
 *   which defaults to the main document path
 * @property importPath {string} Set to the value of the class's static
 *   `importPath` property, which defaults to the path of this element's
 *   `dom-module` (when `is` is used), but can be overridden for other
 *   import strategies.
 * @summary Element class mixin that provides the core API for Polymer's
 * meta-programming features.
 */
const ElementMixin = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_2__["dedupingMixin"])(base => {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_PropertyEffects}
   * @implements {Polymer_PropertiesMixin}
   * @private
   */
  const polymerElementBase = Object(_properties_mixin_js__WEBPACK_IMPORTED_MODULE_7__["PropertiesMixin"])(Object(_property_effects_js__WEBPACK_IMPORTED_MODULE_6__["PropertyEffects"])(base));

  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `_properties`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} constructor Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */
  function propertyDefaults(constructor) {
    if (!constructor.hasOwnProperty(
      JSCompiler_renameProperty('__propertyDefaults', constructor))) {
      constructor.__propertyDefaults = null;
      let props = constructor._properties;
      for (let p in props) {
        let info = props[p];
        if ('value' in info) {
          constructor.__propertyDefaults = constructor.__propertyDefaults || {};
          constructor.__propertyDefaults[p] = info;
        }
      }
    }
    return constructor.__propertyDefaults;
  }

  /**
   * Returns a memoized version of the `observers` array.
   * @param {PolymerElementConstructor} constructor Element class
   * @return {Array} Array containing own observers for the given class
   * @protected
   */
  function ownObservers(constructor) {
    if (!constructor.hasOwnProperty(
      JSCompiler_renameProperty('__ownObservers', constructor))) {
        constructor.__ownObservers =
        constructor.hasOwnProperty(JSCompiler_renameProperty('observers', constructor)) ?
        /** @type {PolymerElementConstructor} */ (constructor).observers : null;
    }
    return constructor.__ownObservers;
  }

  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is deserialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * is also automatically set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttribute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   * Also consider adding warnings when an effect cannot be changed.
   *
   * @param {!PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @return {void}
   * @private
   */
  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    }
    // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.
    if (info.computed && !proto._hasReadOnlyEffect(name)) {
      proto._createComputedProperty(name, info.computed, allProps);
    }
    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    }
    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    }
    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    }
    // always add observer
    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    }
    // always create the mapping from attribute back to property for deserialization.
    proto._addPropertyToAttributeMap(name);
  }

  /**
   * Process all style elements in the element template. Styles with the
   * `include` attribute are processed such that any styles in
   * the associated "style modules" are included in the element template.
   * @param {PolymerElementConstructor} klass Element class
   * @param {!HTMLTemplateElement} template Template to process
   * @param {string} is Name of element
   * @param {string} baseURI Base URI for element
   * @private
   */
  function processElementStyles(klass, template, is, baseURI) {
    const templateStyles = template.content.querySelectorAll('style');
    const stylesWithImports = Object(_utils_style_gather_js__WEBPACK_IMPORTED_MODULE_3__["stylesFromTemplate"])(template);
    // insert styles from <link rel="import" type="css"> at the top of the template
    const linkedStyles = Object(_utils_style_gather_js__WEBPACK_IMPORTED_MODULE_3__["stylesFromModuleImports"])(is);
    const firstTemplateChild = template.content.firstElementChild;
    for (let idx = 0; idx < linkedStyles.length; idx++) {
      let s = linkedStyles[idx];
      s.textContent = klass._processStyleText(s.textContent, baseURI);
      template.content.insertBefore(s, firstTemplateChild);
    }
    // keep track of the last "concrete" style in the template we have encountered
    let templateStyleIndex = 0;
    // ensure all gathered styles are actually in this template.
    for (let i = 0; i < stylesWithImports.length; i++) {
      let s = stylesWithImports[i];
      let templateStyle = templateStyles[templateStyleIndex];
      // if the style is not in this template, it's been "included" and
      // we put a clone of it in the template before the style that included it
      if (templateStyle !== s) {
        s = s.cloneNode(true);
        templateStyle.parentNode.insertBefore(s, templateStyle);
      } else {
        templateStyleIndex++;
      }
      s.textContent = klass._processStyleText(s.textContent, baseURI);
    }
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is);
    }
  }

  /**
   * Look up template from dom-module for element
   *
   * @param {!string} is Element name to look up
   * @return {!HTMLTemplateElement} Template found in dom module, or
   *   undefined if not found
   * @protected
   */
  function getTemplateFromDomModule(is) {
    let template = null;
    // Under strictTemplatePolicy in 3.x+, dom-module lookup is only allowed
    // when opted-in via allowTemplateFromDomModule
    if (is && (!_utils_settings_js__WEBPACK_IMPORTED_MODULE_1__["strictTemplatePolicy"] || _utils_settings_js__WEBPACK_IMPORTED_MODULE_1__["allowTemplateFromDomModule"])) {
      template = _elements_dom_module_js__WEBPACK_IMPORTED_MODULE_5__["DomModule"].import(is, 'template');
      // Under strictTemplatePolicy, require any element with an `is`
      // specified to have a dom-module
      if (_utils_settings_js__WEBPACK_IMPORTED_MODULE_1__["strictTemplatePolicy"] && !template) {
        throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${is}`);
      }
    }
    return template;
  }

  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   */
  class PolymerElement extends polymerElementBase {

    /**
     * Current Polymer version in Semver notation.
     * @type {string} Semver notation of the current version of Polymer.
     */
    static get polymerElementVersion() {
      return version;
    }

    /**
     * Override of PropertiesMixin _finalizeClass to create observers and
     * find the template.
     * @return {void}
     * @protected
     * @override
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
   static _finalizeClass() {
      super._finalizeClass();
      if (this.hasOwnProperty(
        JSCompiler_renameProperty('is', this)) &&  this.is) {
        register(this.prototype);
      }
      const observers = ownObservers(this);
      if (observers) {
        this.createObservers(observers, this._properties);
      }
      // note: create "working" template that is finalized at instance time
      let template = /** @type {PolymerElementConstructor} */ (this).template;
      if (template) {
        if (typeof template === 'string') {
          console.error('template getter must return HTMLTemplateElement');
          template = null;
        } else {
          template = template.cloneNode(true);
        }
      }

      this.prototype._template = template;
    }

    /**
     * Override of PropertiesChanged createProperties to create accessors
     * and property effects for all of the properties.
     * @return {void}
     * @protected
     * @override
     */
     static createProperties(props) {
      for (let p in props) {
        createPropertyFromConfig(this.prototype, p, props[p], props);
      }
    }

    /**
     * Creates observers for the given `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {Object} observers Array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @return {void}
     * @protected
     */
    static createObservers(observers, dynamicFns) {
      const proto = this.prototype;
      for (let i=0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation
     * will return the first `<template>` in a `dom-module` whose `id`
     * matches this element's `is`.
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * must be an `HTMLTemplateElement`.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {!HTMLTemplateElement|string} Template to be stamped
     */
    static get template() {
      // Explanation of template-related properties:
      // - constructor.template (this getter): the template for the class.
      //     This can come from the prototype (for legacy elements), from a
      //     dom-module, or from the super class's template (or can be overridden
      //     altogether by the user)
      // - constructor._template: memoized version of constructor.template
      // - prototype._template: working template for the element, which will be
      //     parsed and modified in place. It is a cloned version of
      //     constructor.template, saved in _finalizeClass(). Note that before
      //     this getter is called, for legacy elements this could be from a
      //     _template field on the info object passed to Polymer(), a behavior,
      //     or set in registered(); once the static getter runs, a clone of it
      //     will overwrite it on the prototype as the working template.
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
        this._template =
          // If user has put template on prototype (e.g. in legacy via registered
          // callback or info object), prefer that first
          this.prototype.hasOwnProperty(JSCompiler_renameProperty('_template', this.prototype)) ?
          this.prototype._template :
          // Look in dom-module associated with this element's is
          (getTemplateFromDomModule(/** @type {PolymerElementConstructor}*/ (this).is) ||
          // Next look for superclass template (call the super impl this
          // way so that `this` points to the superclass)
          Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/ (this).prototype).constructor.template);
      }
      return this._template;
    }

    /**
     * Set the template.
     *
     * @param {!HTMLTemplateElement|string} value Template to set.
     */
    static set template(value) {
      this._template = value;
    }

    /**
     * Path matching the url from which the element was imported.
     *
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     *
     * For elements defined in ES modules, users should implement
     * `static get importMeta() { return import.meta; }`, and the default
     * implementation of `importPath` will  return `import.meta.url`'s path.
     * For elements defined in HTML imports, this getter will return the path
     * to the document containing a `dom-module` element matching this
     * element's static `is` property.
     *
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     * @suppress {missingProperties}
     */
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
        const meta = this.importMeta;
        if (meta) {
          this._importPath = Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__["pathFromUrl"])(meta.url);
        } else {
          const module = _elements_dom_module_js__WEBPACK_IMPORTED_MODULE_5__["DomModule"].import(/** @type {PolymerElementConstructor} */ (this).is);
          this._importPath = (module && module.assetpath) ||
            Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/ (this).prototype).constructor.importPath;
        }
      }
      return this._importPath;
    }

    constructor() {
      super();
      /** @type {HTMLTemplateElement} */
      this._template;
      /** @type {string} */
      this._importPath;
      /** @type {string} */
      this.rootPath;
      /** @type {string} */
      this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */
      this.root;
      /** @type {!Object<string, !Element>} */
      this.$;
    }

    /**
     * Overrides the default `PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @return {void}
     * @override
     * @suppress {invalidCasts}
     */
    _initializeProperties() {
      instanceCount++;
      this.constructor.finalize();
      // note: finalize template when we have access to `localName` to
      // avoid dependence on `is` for polyfilling styling.
      this.constructor._finalizeTemplate(/** @type {!HTMLElement} */(this).localName);
      super._initializeProperties();
      // set path defaults
      this.rootPath = _utils_settings_js__WEBPACK_IMPORTED_MODULE_1__["rootPath"];
      this.importPath = this.constructor.importPath;
      // apply property defaults...
      let p$ = propertyDefaults(this.constructor);
      if (!p$) {
        return;
      }
      for (let p in p$) {
        let info = p$[p];
        // Don't set default value if there is already an own property, which
        // happens when a `properties` property with default but no effects had
        // a property set (e.g. bound) by its host before upgrade
        if (!this.hasOwnProperty(p)) {
          let value = typeof info.value == 'function' ?
            info.value.call(this) :
            info.value;
          // Set via `_setProperty` if there is an accessor, to enable
          // initializing readOnly property defaults
          if (this._hasAccessor(p)) {
            this._setPendingProperty(p, value, true);
          } else {
            this[p] = value;
          }
        }
      }
    }

    /**
     * Gather style text for a style element in the template.
     *
     * @param {string} cssText Text containing styling to process
     * @param {string} baseURI Base URI to rebase CSS paths against
     * @return {string} The processed CSS text
     * @protected
     */
    static _processStyleText(cssText, baseURI) {
      return Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__["resolveCss"])(cssText, baseURI);
    }

    /**
    * Configures an element `proto` to function with a given `template`.
    * The element name `is` and extends `ext` must be specified for ShadyCSS
    * style scoping.
    *
    * @param {string} is Tag name (or type extension name) for this element
    * @return {void}
    * @protected
    */
    static _finalizeTemplate(is) {
      /** @const {HTMLTemplateElement} */
      const template = this.prototype._template;
      if (template && !template.__polymerFinalized) {
        template.__polymerFinalized = true;
        const importPath = this.importPath;
        const baseURI = importPath ? Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__["resolveUrl"])(importPath) : '';
        // e.g. support `include="module-name"`, and ShadyCSS
        processElementStyles(this, template, is, baseURI);
        this.prototype._bindTemplate(template);
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @suppress {missingProperties, invalidCasts} Super may or may not implement the callback
     * @return {void}
     */
    connectedCallback() {
      if (window.ShadyCSS && this._template) {
        window.ShadyCSS.styleElement(/** @type {!HTMLElement} */(this));
      }
      super.connectedCallback();
    }

    /**
     * Stamps the element template.
     *
     * @return {void}
     * @override
     */
    ready() {
      if (this._template) {
        this.root = this._stampTemplate(this._template);
        this.$ = this.root.$;
      }
      super.ready();
    }

    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @return {void}
     * @override
     */
    _readyClients() {
      if (this._template) {
        this.root = this._attachDom(/** @type {StampedTemplate} */(this.root));
      }
      // The super._readyClients here sets the clients initialized flag.
      // We must wait to do this until after client dom is created/attached
      // so that this flag can be checked to prevent notifications fired
      // during this process from being handled before clients are ready.
      super._readyClients();
    }


    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */
    _attachDom(dom) {
      if (this.attachShadow) {
        if (dom) {
          if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
          }
          this.shadowRoot.appendChild(dom);
          return this.shadowRoot;
        }
        return null;
      } else {
        throw new Error('ShadowDOM not available. ' +
          // TODO(sorvell): move to compile-time conditional when supported
        'PolymerElement can create dom as children instead of in ' +
        'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
      }
    }

    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * Note: This function does not support updating CSS mixins.
     * You can not dynamically change the value of an `@apply`.
     *
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @return {void}
     * @suppress {invalidCasts}
     */
    updateStyles(properties) {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */(this), properties);
      }
    }

    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * Note that this function performs no resolution for URLs that start
     * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
     * URL resolution, use `window.URL`.
     *
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */
    resolveUrl(url, base) {
      if (!base && this.importPath) {
        base = Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__["resolveUrl"])(this.importPath);
      }
      return Object(_utils_resolve_url_js__WEBPACK_IMPORTED_MODULE_4__["resolveUrl"])(url, base);
    }

    /**
     * Overrides `PropertyAccessors` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @override
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      templateInfo.dynamicFns = templateInfo.dynamicFns || this._properties;
      return super._parseTemplateContent(template, templateInfo, nodeInfo);
    }

  }

  return PolymerElement;
});

/**
 * Total number of Polymer element instances created.
 * @type {number}
 */
let instanceCount = 0;

/**
 * Array of Polymer element classes that have been finalized.
 * @type {Array<PolymerElement>}
 */
const registrations = [];

/**
 * @param {!PolymerElementConstructor} prototype Element prototype to log
 * @this {this}
 * @private
 */
function _regLog(prototype) {
  console.log('[' + prototype.is + ']: registered');
}

/**
 * Registers a class prototype for telemetry purposes.
 * @param {HTMLElement} prototype Element prototype to register
 * @this {this}
 * @protected
 */
function register(prototype) {
  registrations.push(prototype);
}

/**
 * Logs all elements registered with an `is` to the console.
 * @public
 * @this {this}
 */
function dumpRegistrations() {
  registrations.forEach(_regLog);
}

/**
 * When using the ShadyCSS scoping and custom property shim, causes all
 * shimmed `styles` (via `custom-style`) in the document (and its subtree)
 * to be updated based on current custom property values.
 *
 * The optional parameter overrides inline custom property styles with an
 * object of properties where the keys are CSS properties, and the values
 * are strings.
 *
 * Example: `updateStyles({'--color': 'blue'})`
 *
 * These properties are retained unless a value of `null` is set.
 *
 * @param {Object=} props Bag of custom property key/values to
 *   apply to the document.
 * @return {void}
 */
const updateStyles = function(props) {
  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument(props);
  }
};


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/properties-changed.js":
/*!*******************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/properties-changed.js ***!
  \*******************************************************************************/
/*! exports provided: PropertiesChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesChanged", function() { return PropertiesChanged; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/* harmony import */ var _utils_async_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/async.js */ "./public/node_modules/@polymer/polymer/lib/utils/async.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/** @const {!AsyncInterface} */
const microtask = _utils_async_js__WEBPACK_IMPORTED_MODULE_2__["microTask"];

/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin, call `MyClass.createProperties(props)`
 * once at class definition time to create property accessors for properties
 * named in props, implement `_propertiesChanged` to react as desired to
 * property changes, and implement `static get observedAttributes()` and
 * include lowercase versions of any property names that should be set from
 * attributes. Last, call `this._enableProperties()` in the element's
 * `connectedCallback` to enable the accessors.
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 */
const PropertiesChanged = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__["dedupingMixin"])(
    /**
     * @template T
     * @param {function(new:T)} superClass Class to apply mixin to.
     * @return {function(new:T)} superClass with mixin applied.
     */
    (superClass) => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   */
  class PropertiesChanged extends superClass {

    /**
     * Creates property accessors for the given property names.
     * @param {!Object} props Object whose keys are names of accessors.
     * @return {void}
     * @protected
     */
    static createProperties(props) {
      const proto = this.prototype;
      for (let prop in props) {
        // don't stomp an existing accessor
        if (!(prop in proto)) {
          proto._createPropertyAccessor(prop);
        }
      }
    }

    /**
     * Returns an attribute name that corresponds to the given property.
     * The attribute name is the lowercased property name. Override to
     * customize this mapping.
     * @param {string} property Property to convert
     * @return {string} Attribute name corresponding to the given property.
     *
     * @protected
     */
    static attributeNameForProperty(property) {
      return property.toLowerCase();
    }

    /**
     * Override point to provide a type to which to deserialize a value to
     * a given property.
     * @param {string} name Name of property
     *
     * @protected
     */
    static typeForProperty(name) { } //eslint-disable-line no-unused-vars

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @return {void}
     * @protected
     * @override
     */
    _createPropertyAccessor(property, readOnly) {
      this._addPropertyToAttributeMap(property);
      if (!this.hasOwnProperty('__dataHasAccessor')) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }
      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;
        this._definePropertyAccessor(property, readOnly);
      }
    }

    /**
     * Adds the given `property` to a map matching attribute names
     * to property names, using `attributeNameForProperty`. This map is
     * used when deserializing attribute values to properties.
     *
     * @param {string} property Name of the property
     * @override
     */
    _addPropertyToAttributeMap(property) {
      if (!this.hasOwnProperty('__dataAttributes')) {
        this.__dataAttributes = Object.assign({}, this.__dataAttributes);
      }
      if (!this.__dataAttributes[property]) {
        const attr = this.constructor.attributeNameForProperty(property);
        this.__dataAttributes[attr] = property;
      }
    }

    /**
     * Defines a property accessor for the given property.
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created
     * @return {void}
     * @override
     */
     _definePropertyAccessor(property, readOnly) {
      Object.defineProperty(this, property, {
        /* eslint-disable valid-jsdoc */
        /** @this {PropertiesChanged} */
        get() {
          return this._getProperty(property);
        },
        /** @this {PropertiesChanged} */
        set: readOnly ? function () {} : function (value) {
          this._setProperty(property, value);
        }
        /* eslint-enable */
      });
    }

    constructor() {
      super();
      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      this.__dataInstanceProps = null;
      this.__serializing = false;
      this._initializeProperties();
    }

    /**
     * Lifecycle callback called when properties are enabled via
     * `_enableProperties`.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its property data initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @return {void}
     * @public
     * @override
     */
    ready() {
      this.__dataReady = true;
      this._flushProperties();
    }

    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @return {void}
     * @protected
     * @override
     */
    _initializeProperties() {
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }

    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @return {void}
     * @protected
     * @override
     */
    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }

    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {void}
     * @protected
     * @override
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }

    /**
     * Returns the value for the given property.
     * @param {string} property Name of property
     * @return {*} Value for the given property
     * @protected
     * @override
     */
    _getProperty(property) {
      return this.__data[property];
    }

    /* eslint-disable no-unused-vars */
    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} ext Not used here; affordance for closure
     * @return {boolean} Returns true if the property changed
     * @protected
     * @override
     */
    _setPendingProperty(property, value, ext) {
      let old = this.__data[property];
      let changed = this._shouldPropertyChange(property, value, old);
      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }
        this.__data[property] = value;
        this.__dataPending[property] = value;
      }
      return changed;
    }
    /* eslint-enable */

    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @return {void}
     * @protected
     * @override
     */
    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;
            this._flushProperties();
          }
        });
      }
    }

    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     *
     * @return {void}
     * @protected
     * @override
     */
    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;
        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);
          this.__dataInstanceProps = null;
        }
        this.ready();
      }
    }

    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     * @return {void}
     * @protected
     * @override
     */
    _flushProperties() {
      const props = this.__data;
      const changedProps = this.__dataPending;
      const old = this.__dataOld;
      if (this._shouldPropertiesChange(props, changedProps, old)) {
        this.__dataPending = null;
        this.__dataOld = null;
        this._propertiesChanged(props, changedProps, old);
      }
    }

    /**
     * Called in `_flushProperties` to determine if `_propertiesChanged`
     * should be called. The default implementation returns true if
     * properties are pending. Override to customize when
     * `_propertiesChanged` is called.
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {boolean} true if changedProps is truthy
     * @override
     */
    _shouldPropertiesChange(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
      return Boolean(changedProps);
    }

    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {void}
     * @protected
     * @override
     */
    _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
    }

    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` if a strict equality
     * check fails. The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     * @override
     */
    _shouldPropertyChange(property, value, old) {
      return (
        // Strict equality check
        (old !== value &&
          // This ensures (old==NaN, value==NaN) always returns false
          (old === old || value === value))
      );
    }

    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     * @param {?string} namespace Attribute namespace.
     * @return {void}
     * @suppress {missingProperties} Super may or may not implement the callback
     * @override
     */
    attributeChangedCallback(name, old, value, namespace) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, old, value, namespace);
      }
    }

    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to, defaults to the value
     * returned from `typeForProperty`
     * @return {void}
     * @override
     */
    _attributeToProperty(attribute, value, type) {
      if (!this.__serializing) {
        const map = this.__dataAttributes;
        const property = map && map[attribute] || attribute;
        this[property] = this._deserializeValue(value, type ||
          this.constructor.typeForProperty(property));
      }
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * @suppress {invalidCasts} Closure can't figure out `this` is an element.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect to.
     * @param {*=} value Property value to refect.
     * @return {void}
     * @override
     */
    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = (arguments.length < 3) ? this[property] : value;
      this._valueToNodeAttribute(/** @type {!HTMLElement} */(this), value,
        attribute || this.constructor.attributeNameForProperty(property));
      this.__serializing = false;
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     * @return {void}
     * @override
     */
    _valueToNodeAttribute(node, value, attribute) {
      const str = this._serializeValue(value);
      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }

    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called when setting JS property values to
     * HTML attributes.  Users may override this method to provide
     * serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided
     * property  value.
     * @override
     */
    _serializeValue(value) {
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;
        default:
          return value != null ? value.toString() : undefined;
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called when reading HTML attribute values to
     * JS properties.  Users may override this method to provide
     * deserialization for custom `type`s. Types for `Boolean`, `String`,
     * and `Number` convert attributes to the expected types.
     *
     * @param {?string} value Value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     * @override
     */
    _deserializeValue(value, type) {
      switch (type) {
        case Boolean:
          return (value !== null);
        case Number:
          return Number(value);
        default:
          return value;
      }
    }

  }

  return PropertiesChanged;
});


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/properties-mixin.js":
/*!*****************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/properties-mixin.js ***!
  \*****************************************************************************/
/*! exports provided: PropertiesMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertiesMixin", function() { return PropertiesMixin; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/* harmony import */ var _properties_changed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./properties-changed.js */ "./public/node_modules/@polymer/polymer/lib/mixins/properties-changed.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/**
 * Creates a copy of `props` with each property normalized such that
 * upgraded it is an object with at least a type property { type: Type}.
 *
 * @param {Object} props Properties to normalize
 * @return {Object} Copy of input `props` with normalized properties that
 * are in the form {type: Type}
 * @private
 */
function normalizeProperties(props) {
  const output = {};
  for (let p in props) {
    const o = props[p];
    output[p] = (typeof o === 'function') ? {type: o} : o;
  }
  return output;
}

/**
 * Mixin that provides a minimal starting point to using the PropertiesChanged
 * mixin by providing a mechanism to declare properties in a static
 * getter (e.g. static get properties() { return { foo: String } }). Changes
 * are reported via the `_propertiesChanged` method.
 *
 * This mixin provides no specific support for rendering. Users are expected
 * to create a ShadowRoot and put content into it and update it in whatever
 * way makes sense. This can be done in reaction to properties changing by
 * implementing `_propertiesChanged`.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Mixin that provides a minimal starting point for using
 * the PropertiesChanged mixin by providing a declarative `properties` object.
 */
const PropertiesMixin = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__["dedupingMixin"])(superClass => {

 /**
  * @constructor
  * @implements {Polymer_PropertiesChanged}
  * @private
  */
 const base = Object(_properties_changed_js__WEBPACK_IMPORTED_MODULE_2__["PropertiesChanged"])(superClass);

 /**
  * Returns the super class constructor for the given class, if it is an
  * instance of the PropertiesMixin.
  *
  * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
  * @return {?PropertiesMixinConstructor} Super class constructor
  */
 function superPropertiesClass(constructor) {
   const superCtor = Object.getPrototypeOf(constructor);

   // Note, the `PropertiesMixin` class below only refers to the class
   // generated by this call to the mixin; the instanceof test only works
   // because the mixin is deduped and guaranteed only to apply once, hence
   // all constructors in a proto chain will see the same `PropertiesMixin`
   return (superCtor.prototype instanceof PropertiesMixin) ?
     /** @type {!PropertiesMixinConstructor} */ (superCtor) : null;
 }

 /**
  * Returns a memoized version of the `properties` object for the
  * given class. Properties not in object format are converted to at
  * least {type}.
  *
  * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
  * @return {Object} Memoized properties object
  */
 function ownProperties(constructor) {
   if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
     let props = null;

     if (constructor.hasOwnProperty(JSCompiler_renameProperty('properties', constructor))) {
       const properties = constructor.properties;

       if (properties) {
        props = normalizeProperties(properties);
       }
     }

     constructor.__ownProperties = props;
   }
   return constructor.__ownProperties;
 }

 /**
  * @polymer
  * @mixinClass
  * @extends {base}
  * @implements {Polymer_PropertiesMixin}
  * @unrestricted
  */
 class PropertiesMixin extends base {

   /**
    * Implements standard custom elements getter to observes the attributes
    * listed in `properties`.
    * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
    */
   static get observedAttributes() {
     const props = this._properties;
     return props ? Object.keys(props).map(p => this.attributeNameForProperty(p)) : [];
   }

   /**
    * Finalizes an element definition, including ensuring any super classes
    * are also finalized. This includes ensuring property
    * accessors exist on the element prototype. This method calls
    * `_finalizeClass` to finalize each constructor in the prototype chain.
    * @return {void}
    */
   static finalize() {
     if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
       const superCtor = superPropertiesClass(/** @type {!PropertiesMixinConstructor} */(this));
       if (superCtor) {
         superCtor.finalize();
       }
       this.__finalized = true;
       this._finalizeClass();
     }
   }

   /**
    * Finalize an element class. This includes ensuring property
    * accessors exist on the element prototype. This method is called by
    * `finalize` and finalizes the class constructor.
    *
    * @protected
    */
   static _finalizeClass() {
     const props = ownProperties(/** @type {!PropertiesMixinConstructor} */(this));
     if (props) {
       this.createProperties(props);
     }
   }

   /**
    * Returns a memoized version of all properties, including those inherited
    * from super classes. Properties not in object format are converted to
    * at least {type}.
    *
    * @return {Object} Object containing properties for this class
    * @protected
    */
   static get _properties() {
     if (!this.hasOwnProperty(
       JSCompiler_renameProperty('__properties', this))) {
       const superCtor = superPropertiesClass(/** @type {!PropertiesMixinConstructor} */(this));
       this.__properties = Object.assign({},
         superCtor && superCtor._properties,
         ownProperties(/** @type {PropertiesMixinConstructor} */(this)));
     }
     return this.__properties;
   }

   /**
    * Overrides `PropertiesChanged` method to return type specified in the
    * static `properties` object for the given property.
    * @param {string} name Name of property
    * @return {*} Type to which to deserialize attribute
    *
    * @protected
    */
   static typeForProperty(name) {
     const info = this._properties[name];
     return info && info.type;
   }

   /**
    * Overrides `PropertiesChanged` method and adds a call to
    * `finalize` which lazily configures the element's property accessors.
    * @override
    * @return {void}
    */
   _initializeProperties() {
     this.constructor.finalize();
     super._initializeProperties();
   }

   /**
    * Called when the element is added to a document.
    * Calls `_enableProperties` to turn on property system from
    * `PropertiesChanged`.
    * @suppress {missingProperties} Super may or may not implement the callback
    * @return {void}
    * @override
    */
   connectedCallback() {
     if (super.connectedCallback) {
       super.connectedCallback();
     }
     this._enableProperties();
   }

   /**
    * Called when the element is removed from a document
    * @suppress {missingProperties} Super may or may not implement the callback
    * @return {void}
    * @override
    */
   disconnectedCallback() {
     if (super.disconnectedCallback) {
       super.disconnectedCallback();
     }
   }

 }

 return PropertiesMixin;

});


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/property-accessors.js":
/*!*******************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/property-accessors.js ***!
  \*******************************************************************************/
/*! exports provided: PropertyAccessors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyAccessors", function() { return PropertyAccessors; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/* harmony import */ var _utils_case_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/case-map.js */ "./public/node_modules/@polymer/polymer/lib/utils/case-map.js");
/* harmony import */ var _properties_changed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./properties-changed.js */ "./public/node_modules/@polymer/polymer/lib/mixins/properties-changed.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/






// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;
while (proto) {
  let props = Object.getOwnPropertyNames(proto);
  for (let i=0; i<props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @return {void}
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin:
 *
 * -   Declare attributes to observe via the standard `static get observedAttributes()`. Use
 *     `dash-case` attribute names to represent `camelCase` property names.
 * -   Implement the `_propertiesChanged` callback on the class.
 * -   Call `MyClass.createPropertiesForAttributes()` **once** on the class to generate
 *     property accessors for each observed attribute. This must be called before the first
 *     instance is created, for example, by calling it before calling `customElements.define`.
 *     It can also be called lazily from the element's `constructor`, as long as it's guarded so
 *     that the call is only made once, when the first instance is created.
 * -   Call `this._enableProperties()` in the element's `connectedCallback` to enable
 *     the accessors.
 *
 * Any `observedAttributes` will automatically be
 * deserialized via `attributeChangedCallback` and set to the associated
 * property using `dash-case`-to-`camelCase` convention.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 */
const PropertyAccessors = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__["dedupingMixin"])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertiesChanged}
   * @unrestricted
   * @private
   */
   const base = Object(_properties_changed_js__WEBPACK_IMPORTED_MODULE_3__["PropertiesChanged"])(superClass);

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends {base}
   * @unrestricted
   */
  class PropertyAccessors extends base {

    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     * @return {void}
     */
    static createPropertiesForAttributes() {
      let a$ = this.observedAttributes;
      for (let i=0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor(Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_2__["dashToCamelCase"])(a$[i]));
      }
    }

    /**
     * Returns an attribute name that corresponds to the given property.
     * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
     * @param {string} property Property to convert
     * @return {string} Attribute name corresponding to the given property.
     *
     * @protected
     */
    static attributeNameForProperty(property) {
      return Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_2__["camelToDashCase"])(property);
    }

    /**
     * Overrides PropertiesChanged implementation to initialize values for
     * accessors created for values that already existed on the element
     * prototype.
     *
     * @return {void}
     * @protected
     */
    _initializeProperties() {
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);
        this.__dataProto = null;
      }
      super._initializeProperties();
    }

    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @return {void}
     * @protected
     */
    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }

    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     * @suppress {invalidCasts} Closure can't figure out `this` is infact an element
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     * @return {void}
     */
    _ensureAttribute(attribute, value) {
      const el = /** @type {!HTMLElement} */(this);
      if (!el.hasAttribute(attribute)) {
        this._valueToNodeAttribute(el, value, attribute);
      }
    }

    /**
     * Overrides PropertiesChanged implemention to serialize objects as JSON.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property value.
     */
    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(x) {
              return '';
            }
          }

        default:
          return super._serializeValue(value);
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     */
    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;
      switch (type) {
        case Object:
          try {
            outValue = JSON.parse(/** @type {string} */(value));
          } catch(x) {
            // allow non-JSON literals like Strings and Numbers
            outValue = value;
          }
          break;
        case Array:
          try {
            outValue = JSON.parse(/** @type {string} */(value));
          } catch(x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }
          break;
        case Date:
          outValue = isNaN(value) ? String(value) : Number(value);
          outValue = new Date(outValue);
          break;
        default:
          outValue = super._deserializeValue(value, type);
          break;
      }
      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Overrides PropertiesChanged implementation to save existing prototype
     * property value so that it can be reset.
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created
     *
     * When calling on a prototype, any overwritten values are saved in
     * `__dataProto`, and it is up to the subclasser to decide how/when
     * to set those properties back into the accessor.  When calling on an
     * instance, the overwritten value is set via `_setPendingProperty`,
     * and the user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     * @protected
     * @return {void}
     */
    _definePropertyAccessor(property, readOnly) {
      saveAccessorValue(this, property);
      super._definePropertyAccessor(property, readOnly);
    }

    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     */
    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }

    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     */
    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && (prop in this.__dataPending));
    }

  }

  return PropertyAccessors;

});


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/property-effects.js":
/*!*****************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/property-effects.js ***!
  \*****************************************************************************/
/*! exports provided: PropertyEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyEffects", function() { return PropertyEffects; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/* harmony import */ var _utils_path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/path.js */ "./public/node_modules/@polymer/polymer/lib/utils/path.js");
/* harmony import */ var _utils_case_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/case-map.js */ "./public/node_modules/@polymer/polymer/lib/utils/case-map.js");
/* harmony import */ var _property_accessors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./property-accessors.js */ "./public/node_modules/@polymer/polymer/lib/mixins/property-accessors.js");
/* harmony import */ var _template_stamp_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template-stamp.js */ "./public/node_modules/@polymer/polymer/lib/mixins/template-stamp.js");
/* harmony import */ var _utils_settings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/settings.js */ "./public/node_modules/@polymer/polymer/lib/utils/settings.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/* for notify, reflect */


/* for annotated effects */



// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
let dedupeId = 0;

/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
const TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};

/** @const {RegExp} */
const capitalAttributeRegex = /[A-Z]/;

/**
 * @typedef {{
 * name: (string | undefined),
 * structured: (boolean | undefined),
 * wildcard: (boolean | undefined)
 * }}
 */
let DataTrigger; //eslint-disable-line no-unused-vars

/**
 * @typedef {{
 * info: ?,
 * trigger: (!DataTrigger | undefined),
 * fn: (!Function | undefined)
 * }}
 */
let DataEffect; //eslint-disable-line no-unused-vars

let PropertyEffectsType; //eslint-disable-line no-unused-vars

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
  let effects = model[type];
  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);
    for (let p in effects) {
      let protoFx = effects[p];
      let instFx = effects[p] = Array(protoFx.length);
      for (let i=0; i<protoFx.length; i++) {
        instFx[i] = protoFx[i];
      }
    }
  }
  return effects;
}

// -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {Object} props Bag of current property changes
 * @param {Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    let ran = false;
    let id = dedupeId++;
    for (let prop in props) {
      if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
        ran = true;
      }
    }
    return ran;
  }
  return false;
}

/**
 * Runs a list of effects for a given property.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  let ran = false;
  let rootProperty = hasPaths ? Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["root"])(prop) : prop;
  let fxs = effects[rootProperty];
  if (fxs) {
    for (let i=0, l=fxs.length, fx; (i<l) && (fx=fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) &&
          (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }
        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }
  return ran;
}

/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    let triggerPath = trigger.name;
    return (triggerPath == path) ||
      (trigger.structured && Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isAncestor"])(triggerPath, path)) ||
      (trigger.wildcard && Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isDescendant"])(triggerPath, path));
  } else {
    return true;
  }
}

/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
  let fn = typeof info.method === "string" ? inst[info.method] : info.method;
  let changedProp = info.property;
  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.method + '` not defined');
  }
}

/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  let fxs = inst[TYPES.NOTIFY];
  let notified;
  let id = dedupeId++;
  // Try normal notify effects; if none, fall back to try path notification
  for (let prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  }
  // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.
  let host;
  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}

/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
  let rootProperty = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["root"])(path);
  if (rootProperty !== path) {
    let eventName = Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_3__["camelToDashCase"])(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }
  return false;
}

/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} eventName The name of the event to send ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property changed, the path
 *   that changed (optional).
 * @return {void}
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
  let detail = {
    value: value,
    queueProperty: true
  };
  if (path) {
    detail.path = path;
  }
  /** @type {!HTMLElement} */(inst).dispatchEvent(new CustomEvent(eventName, { detail }));
}

/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  let rootProperty = hasPaths ? Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["root"])(property) : property;
  let path = rootProperty != property ? property : null;
  let value = path ? Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(inst, path) : inst.__data[property];
  if (path && value === undefined) {
    value = props[property];  // specifically for .splices
  }
  dispatchNotifyEvent(inst, info.eventName, value, path);
}

/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!PropertyEffectsType} inst Host element instance handling the notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @return {void}
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
  let value;
  let detail = /** @type {Object} */(event.detail);
  let fromPath = detail && detail.path;
  if (fromPath) {
    toPath = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["translate"])(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.currentTarget[fromProp];
  }
  value = negate ? !value : value;
  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
      && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}

/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
  let value = inst.__data[property];
  if (_utils_settings_js__WEBPACK_IMPORTED_MODULE_6__["sanitizeDOMValue"]) {
    value = Object(_utils_settings_js__WEBPACK_IMPORTED_MODULE_6__["sanitizeDOMValue"])(value, info.attrName, 'attribute', /** @type {Node} */(inst));
  }
  inst._propertyToAttribute(property, info.attrName, value);
}

/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {!Object} changedProps Bag of changed properties
 * @param {!Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  let computeEffects = inst[TYPES.COMPUTE];
  if (computeEffects) {
    let inputProps = changedProps;
    while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
      Object.assign(oldProps, inst.__dataOld);
      Object.assign(changedProps, inst.__dataPending);
      inputProps = inst.__dataPending;
      inst.__dataPending = null;
    }
  }
}

/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
  let result = runMethodEffect(inst, property, props, oldProps, info);
  let computedProp = info.methodInfo;
  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
  }
}

/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!PropertyEffectsType} inst The instance whose props are changing
 * @param {string | !Array<(string|number)>} path Path that has changed
 * @param {*} value Value of changed path
 * @return {void}
 * @private
 */
function computeLinkedPaths(inst, path, value) {
  let links = inst.__dataLinkedPaths;
  if (links) {
    let link;
    for (let a in links) {
      let b = links[a];
      if (Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isDescendant"])(a, path)) {
        link = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["translate"])(a, b, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if (Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isDescendant"])(b, path)) {
        link = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["translate"])(b, a, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
}

// -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @return {void}
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
  nodeInfo.bindings.push(binding);
  // Add listener info to binding metadata
  if (shouldAddListener(binding)) {
    let {event, negate} = binding.parts[0];
    binding.listenerEvent = event || (Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_3__["camelToDashCase"])(target) + '-changed');
    binding.listenerNegate = negate;
  }
  // Add "propagate" property effects to templateInfo
  let index = templateInfo.nodeInfoList.length;
  for (let i=0; i<binding.parts.length; i++) {
    let part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}

/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 * @return {void}
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target +
        ' because "-" is not a valid attribute starting character');
    } else {
      let dependencies = part.dependencies;
      let info = { index, binding, part, evaluator: constructor };
      for (let j=0; j<dependencies.length; j++) {
        let trigger = dependencies[j];
        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }
        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info, trigger
        });
      }
    }
  }
}

/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @return {void}
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  let node = nodeList[info.index];
  let binding = info.binding;
  let part = info.part;
  // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
  if (hasPaths && part.source && (path.length > part.source.length) &&
      (binding.kind == 'property') && !binding.isCompound &&
      node.__isPropertyEffectsClient &&
      node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    let value = props[path];
    path = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["translate"])(part.source, binding.target, path);
    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
    // Propagate value to child
    applyBindingValue(inst, node, binding, part, value);
  }
}

/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!PropertyEffectsType} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @return {void}
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);
  if (_utils_settings_js__WEBPACK_IMPORTED_MODULE_6__["sanitizeDOMValue"]) {
    value = Object(_utils_settings_js__WEBPACK_IMPORTED_MODULE_6__["sanitizeDOMValue"])(value, binding.target, binding.kind, node);
  }
  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
  } else {
    // Property binding
    let prop = binding.target;
    if (node.__isPropertyEffectsClient &&
        node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else  {
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}

/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    let storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }
  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' ||
        (binding.target === 'value' &&
          (node.localName === 'input' || node.localName === 'textarea'))) {
      value = value == undefined ? '' : value;
    }
  }
  return value;
}

/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
  return Boolean(binding.target) &&
         binding.kind != 'attribute' &&
         binding.kind != 'text' &&
         !binding.isCompound &&
         binding.parts[0].mode === '{';
}

/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!PropertyEffectsType} inst Instance that bas been previously bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @return {void}
 * @private
 */
function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  let {nodeList, nodeInfoList} = templateInfo;
  if (nodeInfoList.length) {
    for (let i=0; i < nodeInfoList.length; i++) {
      let info = nodeInfoList[i];
      let node = nodeList[i];
      let bindings = info.bindings;
      if (bindings) {
        for (let i=0; i<bindings.length; i++) {
          let binding = bindings[i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      }
      node.__dataHost = inst;
    }
  }
}

/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    let storage = node.__dataCompoundStorage ||
      (node.__dataCompoundStorage = {});
    let parts = binding.parts;
    // Copy literals from parts into storage for this binding
    let literals = new Array(parts.length);
    for (let j=0; j<parts.length; j++) {
      literals[j] = parts[j].literal;
    }
    let target = binding.target;
    storage[target] = literals;
    // Configure properties with their literal parts
    if (binding.literal && binding.kind == 'property') {
      node[target] = binding.literal;
    }
  }
}

/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!PropertyEffectsType} inst Host element instance to handle notification event
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    let part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function(e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
}

// -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @return {void}
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || (dynamicFn &&
    (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
  let info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo,
    dynamicFn
  };
  for (let i=0, arg; (i<sig.args.length) && (arg=sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn, info: info, trigger: arg
      });
    }
  }
  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn, info: info
    });
  }
}

/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  let context = inst._methodHost || inst;
  let fn = context[info.methodName];
  if (fn) {
    let args = inst._marshalArgs(info.args, property, props);
    return fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

const emptyArray = [];

// Regular expressions used for binding
const IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' +  STRING + ')\\s*' + ')';
const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
const ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                              '(?:' + ARGUMENTS + '?' + ')' +
                            '\\)\\s*' + ')';
const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
const CLOSE_BRACKET = '(?:]]|}})';
const NEGATE = '(?:(!)\\s*)?'; // Group 2
const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
const bindingRegex = new RegExp(EXPRESSION, "g");

/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
  let s = '';
  for (let i=0; i<parts.length; i++) {
    let literal = parts[i].literal;
    s += literal || '';
  }
  return s;
}

/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
  // tries to match valid javascript property names
  let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (m) {
    let methodName = m[1];
    let sig = { methodName, static: true, args: emptyArray };
    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      let args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }
  return null;
}

/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
  sig.args = argList.map(function(rawArg) {
    let arg = parseArg(rawArg);
    if (!arg.literal) {
      sig.static = false;
    }
    return arg;
  }, this);
  return sig;
}

/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
  // clean up whitespace
  let arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1')
    ;
  // basic argument descriptor
  let a = {
    name: arg,
    value: '',
    literal: false
  };
  // detect literal value (must be String or Number)
  let fc = arg[0];
  if (fc === '-') {
    fc = arg[1];
  }
  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }
  switch(fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;
    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  }
  // if not literal, look for structured path
  if (!a.literal) {
    a.rootProperty = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["root"])(arg);
    // detect structured path (has dots)
    a.structured = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isPath"])(arg);
    if (a.structured) {
      a.wildcard = (arg.slice(-2) == '.*');
      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }
  return a;
}

// data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @return {void}
 * @private
 */
function notifySplices(inst, array, path, splices) {
  let splicesPath = path + '.splices';
  inst.notifyPath(splicesPath, { indexSplices: splices });
  inst.notifyPath(path + '.length', array.length);
  // Null here to allow potentially large splice records to be GC'ed.
  inst.__data[splicesPath] = {indexSplices: null};
}

/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @return {void}
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
  notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}

/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}

/**
 * Element class mixin that provides meta-programming for Polymer's template
 * binding and data observation (collectively, "property effects") system.
 *
 * This mixin uses provides the following key static methods for adding
 * property effects to an element class:
 * - `addPropertyEffect`
 * - `createPropertyObserver`
 * - `createMethodObserver`
 * - `createNotifyingProperty`
 * - `createReadOnlyProperty`
 * - `createReflectedProperty`
 * - `createComputedProperty`
 * - `bindTemplate`
 *
 * Each method creates one or more property accessors, along with metadata
 * used by this mixin's implementation of `_propertiesChanged` to perform
 * the property effects.
 *
 * Underscored versions of the above methods also exist on the element
 * prototype for adding property effects on instances at runtime.
 *
 * Note that this mixin overrides several `PropertyAccessors` methods, in
 * many cases to maintain guarantees provided by the Polymer 1.x features;
 * notably it changes property accessors to be synchronous by default
 * whereas the default when using `PropertyAccessors` standalone is to be
 * async by default.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin TemplateStamp
 * @appliesMixin PropertyAccessors
 * @summary Element class mixin that provides meta-programming for Polymer's
 * template binding and data observation system.
 */
const PropertyEffects = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__["dedupingMixin"])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   * @private
   */
  const propertyEffectsBase = Object(_template_stamp_js__WEBPACK_IMPORTED_MODULE_5__["TemplateStamp"])(Object(_property_accessors_js__WEBPACK_IMPORTED_MODULE_4__["PropertyAccessors"])(superClass));

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */
  class PropertyEffects extends propertyEffectsBase {

    constructor() {
      super();
      /** @type {boolean} */
      // Used to identify users of this mixin, ala instanceof
      this.__isPropertyEffectsClient = true;
      /** @type {number} */
      // NOTE: used to track re-entrant calls to `_flushProperties`
      // path changes dirty check against `__dataTemp` only during one "turn"
      // and are cleared when `__dataCounter` returns to 0.
      this.__dataCounter = 0;
      /** @type {boolean} */
      this.__dataClientsReady;
      /** @type {Array} */
      this.__dataPendingClients;
      /** @type {Object} */
      this.__dataToNotify;
      /** @type {Object} */
      this.__dataLinkedPaths;
      /** @type {boolean} */
      this.__dataHasPaths;
      /** @type {Object} */
      this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */
      this.__dataHost;
      /** @type {!Object} */
      this.__dataTemp;
      /** @type {boolean} */
      this.__dataClientsInitialized;
      /** @type {!Object} */
      this.__data;
      /** @type {!Object} */
      this.__dataPending;
      /** @type {!Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__computeEffects;
      /** @type {Object} */
      this.__reflectEffects;
      /** @type {Object} */
      this.__notifyEffects;
      /** @type {Object} */
      this.__propagateEffects;
      /** @type {Object} */
      this.__observeEffects;
      /** @type {Object} */
      this.__readOnly;
      /** @type {!TemplateInfo} */
      this.__templateInfo;
    }

    get PROPERTY_EFFECT_TYPES() {
      return TYPES;
    }

    /**
     * @return {void}
     */
    _initializeProperties() {
      super._initializeProperties();
      hostStack.registerHost(this);
      this.__dataClientsReady = false;
      this.__dataPendingClients = null;
      this.__dataToNotify = null;
      this.__dataLinkedPaths = null;
      this.__dataHasPaths = false;
      // May be set on instance prior to upgrade
      this.__dataCompoundStorage = this.__dataCompoundStorage || null;
      this.__dataHost = this.__dataHost || null;
      this.__dataTemp = {};
      this.__dataClientsInitialized = false;
    }

    /**
     * Overrides `PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     * @return {void}
     */
    _initializeProtoProperties(props) {
      this.__data = Object.create(props);
      this.__dataPending = Object.create(props);
      this.__dataOld = {};
    }

    /**
     * Overrides `PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     * @return {void}
     */
    _initializeInstanceProperties(props) {
      let readOnly = this[TYPES.READ_ONLY];
      for (let prop in props) {
        if (!readOnly || !readOnly[prop]) {
          this.__dataPending = this.__dataPending || {};
          this.__dataOld = this.__dataOld || {};
          this.__data[prop] = this.__dataPending[prop] = props[prop];
        }
      }
    }

    // Prototype setup ----------------------------------------

    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */
    _addPropertyEffect(property, type, effect) {
      this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
      // effects are accumulated into arrays per property based on type
      let effects = ensureOwnEffectMap(this, type)[property];
      if (!effects) {
        effects = this[type][property] = [];
      }
      effects.push(effect);
    }

    /**
     * Removes the given property effect.
     *
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     * @return {void}
     */
    _removePropertyEffect(property, type, effect) {
      let effects = ensureOwnEffectMap(this, type)[property];
      let idx = effects.indexOf(effect);
      if (idx >= 0) {
        effects.splice(idx, 1);
      }
    }

    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasPropertyEffect(property, type) {
      let effects = this[type];
      return Boolean(effects && effects[property]);
    }

    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReadOnlyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.READ_ONLY);
    }

    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasNotifyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.NOTIFY);
    }

    /**
     * Returns whether the current prototype/instance has a "reflect to attribute"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReflectEffect(property) {
      return this._hasPropertyEffect(property, TYPES.REFLECT);
    }

    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasComputedEffect(property) {
      return this._hasPropertyEffect(property, TYPES.COMPUTE);
    }

    // Runtime ----------------------------------------

    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */
    _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
      if (isPathNotification ||
          Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["root"])(Array.isArray(path) ? path[0] : path) !== path) {
        // Dirty check changes being set to a path against the actual object,
        // since this is the entry point for paths into the system; from here
        // the only dirty checks are against the `__dataTemp` cache to prevent
        // duplicate work in the same turn only. Note, if this was a notification
        // of a change already set to a path (isPathNotification: true),
        // we always let the change through and skip the `set` since it was
        // already dirty checked at the point of entry and the underlying
        // object has already been updated
        if (!isPathNotification) {
          let old = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path);
          path = /** @type {string} */ (Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["set"])(this, path, value));
          // Use property-accessor's simpler dirty check
          if (!path || !super._shouldPropertyChange(path, value, old)) {
            return false;
          }
        }
        this.__dataHasPaths = true;
        if (this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify)) {
          computeLinkedPaths(this, path, value);
          return true;
        }
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
          return this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify);
        } else {
          this[path] = value;
        }
      }
      return false;
    }

    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @param {!Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @return {void}
     * @protected
     */
    _setUnmanagedPropertyToNode(node, prop, value) {
      // It is a judgment call that resetting primitives is
      // "bad" and resettings objects is also "good"; alternatively we could
      // implement a whitelist of tag & property values that should never
      // be reset (e.g. <input>.value && <select>.value)
      if (value !== node[prop] || typeof value == 'object') {
        node[prop] = value;
      }
    }

    /**
     * Overrides the `PropertiesChanged` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChanged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     */
    _setPendingProperty(property, value, shouldNotify) {
      let propIsPath = this.__dataHasPaths && Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isPath"])(property);
      let prevProps = propIsPath ? this.__dataTemp : this.__data;
      if (this._shouldPropertyChange(property, value, prevProps[property])) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (!(property in this.__dataOld)) {
          this.__dataOld[property] = this.__data[property];
        }
        // Paths are stored in temporary cache (cleared at end of turn),
        // which is used for dirty-checking, all others stored in __data
        if (propIsPath) {
          this.__dataTemp[property] = value;
        } else {
          this.__data[property] = value;
        }
        // All changes go into pending property bag, passed to _propertiesChanged
        this.__dataPending[property] = value;
        // Track properties that should notify separately
        if (propIsPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
          this.__dataToNotify = this.__dataToNotify || {};
          this.__dataToNotify[property] = shouldNotify;
        }
        return true;
      }
      return false;
    }

    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {void}
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     * @return {void}
     */
    _invalidateProperties() {
      if (this.__dataReady) {
        this._flushProperties();
      }
    }

    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @param {Object} client PropertyEffects client to enqueue
     * @return {void}
     * @protected
     */
    _enqueueClient(client) {
      this.__dataPendingClients = this.__dataPendingClients || [];
      if (client !== this) {
        this.__dataPendingClients.push(client);
      }
    }

    /**
     * Overrides superclass implementation.
     *
     * @return {void}
     * @protected
     */
    _flushProperties() {
      this.__dataCounter++;
      super._flushProperties();
      this.__dataCounter--;
    }

    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @return {void}
     * @protected
     */
    _flushClients() {
      if (!this.__dataClientsReady) {
        this.__dataClientsReady = true;
        this._readyClients();
        // Override point where accessors are turned on; importantly,
        // this is after clients have fully readied, providing a guarantee
        // that any property effects occur only after all clients are ready.
        this.__dataReady = true;
      } else {
        this.__enableOrFlushClients();
      }
    }

    // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.
    __enableOrFlushClients() {
      let clients = this.__dataPendingClients;
      if (clients) {
        this.__dataPendingClients = null;
        for (let i=0; i < clients.length; i++) {
          let client = clients[i];
          if (!client.__dataEnabled) {
            client._enableProperties();
          } else if (client.__dataPending) {
            client._flushProperties();
          }
        }
      }
    }

    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @return {void}
     * @protected
     */
    _readyClients() {
      this.__enableOrFlushClients();
    }

    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @return {void}
     * @public
     */
    setProperties(props, setReadOnly) {
      for (let path in props) {
        if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
          //TODO(kschaaf): explicitly disallow paths in setProperty?
          // wildcard observers currently only pass the first changed path
          // in the `info` object, and you could do some odd things batching
          // paths, e.g. {'foo.bar': {...}, 'foo': null}
          this._setPendingPropertyOrPath(path, props[path], true);
        }
      }
      this._invalidateProperties();
    }

    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     * @return {void}
     */
    ready() {
      // It is important that `super.ready()` is not called here as it
      // immediately turns on accessors. Instead, we wait until `readyClients`
      // to enable accessors to provide a guarantee that clients are ready
      // before processing any accessors side effects.
      this._flushProperties();
      // If no data was pending, `_flushProperties` will not `flushClients`
      // so ensure this is done.
      if (!this.__dataClientsReady) {
        this._flushClients();
      }
      // Before ready, client notifications do not trigger _flushProperties.
      // Therefore a flush is necessary here if data has been set.
      if (this.__dataPending) {
        this._flushProperties();
      }
    }

    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {?Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {?Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @return {void}
     */
    _propertiesChanged(currentProps, changedProps, oldProps) {
      // ----------------------------
      // let c = Object.getOwnPropertyNames(changedProps || {});
      // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
      // if (window.debug) { debugger; }
      // ----------------------------
      let hasPaths = this.__dataHasPaths;
      this.__dataHasPaths = false;
      // Compute properties
      runComputedEffects(this, changedProps, oldProps, hasPaths);
      // Clear notify properties prior to possible reentry (propagate, observe),
      // but after computing effects have a chance to add to them
      let notifyProps = this.__dataToNotify;
      this.__dataToNotify = null;
      // Propagate properties to clients
      this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
      // Flush clients
      this._flushClients();
      // Reflect properties
      runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
      // Observe properties
      runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
      // Notify properties to host
      if (notifyProps) {
        runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
      }
      // Clear temporary cache at end of turn
      if (this.__dataCounter == 1) {
        this.__dataTemp = {};
      }
      // ----------------------------
      // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
      // ----------------------------
    }

    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {void}
     * @protected
     */
    _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
      if (this[TYPES.PROPAGATE]) {
        runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
      }
      let templateInfo = this.__templateInfo;
      while (templateInfo) {
        runEffects(this, templateInfo.propertyEffects, changedProps, oldProps,
          hasPaths, templateInfo.nodeList);
        templateInfo = templateInfo.nextTemplateInfo;
      }
    }

    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @return {void}
     * @public
     */
    linkPaths(to, from) {
      to = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["normalize"])(to);
      from = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["normalize"])(from);
      this.__dataLinkedPaths = this.__dataLinkedPaths || {};
      this.__dataLinkedPaths[to] = from;
    }

    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @return {void}
     * @public
     */
    unlinkPaths(path) {
      path = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["normalize"])(path);
      if (this.__dataLinkedPaths) {
        delete this.__dataLinkedPaths[path];
      }
    }

    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, object: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     * @return {void}
     * @public
    */
    notifySplices(path, splices) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      notifySplices(this, array, info.path, splices);
    }

    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */
    get(path, root) {
      return Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(root || this, path);
    }

    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @return {void}
     * @public
    */
    set(path, value, root) {
      if (root) {
        Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["set"])(root, path, value);
      } else {
        if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */(path)]) {
          if (this._setPendingPropertyOrPath(path, value, true)) {
            this._invalidateProperties();
          }
        }
      }
    }

    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */
    push(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array}*/(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      let len = array.length;
      let ret = array.push(...items);
      if (items.length) {
        notifySplice(this, array, info.path, len, items.length, []);
      }
      return ret;
    }

    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    pop(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.pop();
      if (hadLength) {
        notifySplice(this, array, info.path, array.length, 0, [ret]);
      }
      return ret;
    }

    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number=} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {Array} Array of removed items.
     * @public
     */
    splice(path, start, deleteCount, ...items) {
      let info = {path : ''};
      let array = /** @type {Array} */(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      // Normalize fancy native splice handling of crazy start values
      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else if (start) {
        start = Math.floor(start);
      }
      // array.splice does different things based on the number of arguments
      // you pass in. Therefore, array.splice(0) and array.splice(0, undefined)
      // do different things. In the former, the whole array is cleared. In the
      // latter, no items are removed.
      // This means that we need to detect whether 1. one of the arguments
      // is actually passed in and then 2. determine how many arguments
      // we should pass on to the native array.splice
      //
      let ret;
      // Omit any additional arguments if they were not passed in
      if (arguments.length === 2) {
        ret = array.splice(start);
      // Either start was undefined and the others were defined, but in this
      // case we can safely pass on all arguments
      //
      // Note: this includes the case where none of the arguments were passed in,
      // e.g. this.splice('array'). However, if both start and deleteCount
      // are undefined, array.splice will not modify the array (as expected)
      } else {
        ret = array.splice(start, deleteCount, ...items);
      }
      // At the end, check whether any items were passed in (e.g. insertions)
      // or if the return array contains items (e.g. deletions).
      // Only notify if items were added or deleted.
      if (items.length || ret.length) {
        notifySplice(this, array, info.path, start, items.length, ret);
      }
      return ret;
    }

    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    shift(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.shift();
      if (hadLength) {
        notifySplice(this, array, info.path, 0, 0, [ret]);
      }
      return ret;
    }

    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */
    unshift(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info));
      let ret = array.unshift(...items);
      if (items.length) {
        notifySplice(this, array, info.path, 0, items.length, []);
      }
      return ret;
    }

    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @return {void}
     * @public
    */
    notifyPath(path, value) {
      /** @type {string} */
      let propPath;
      if (arguments.length == 1) {
        // Get value if not supplied
        let info = {path: ''};
        value = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(this, path, info);
        propPath = info.path;
      } else if (Array.isArray(path)) {
        // Normalize path if needed
        propPath = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["normalize"])(path);
      } else {
        propPath = /** @type{string} */(path);
      }
      if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     */
    _createReadOnlyProperty(property, protectedSetter) {
      this._addPropertyEffect(property, TYPES.READ_ONLY);
      if (protectedSetter) {
        this['_set' + upper(property)] = /** @this {PropertyEffects} */function(value) {
          this._setProperty(property, value);
        };
      }
    }

    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createPropertyObserver(property, method, dynamicFn) {
      let info = { property, method, dynamicFn: Boolean(dynamicFn) };
      this._addPropertyEffect(property, TYPES.OBSERVE, {
        fn: runObserverEffect, info, trigger: {name: property}
      });
      if (dynamicFn) {
        this._addPropertyEffect(/** @type {string} */(method), TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: {name: method}
        });
      }
    }

    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createMethodObserver(expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed observer expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
    }

    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     */
    _createNotifyingProperty(property) {
      this._addPropertyEffect(property, TYPES.NOTIFY, {
        fn: runNotifyEffect,
        info: {
          eventName: Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_3__["camelToDashCase"])(property) + '-changed',
          property: property
        }
      });
    }

    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     */
    _createReflectedProperty(property) {
      let attr = this.constructor.attributeNameForProperty(property);
      if (attr[0] === '-') {
        console.warn('Property ' + property + ' cannot be reflected to attribute ' +
          attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.');
      } else {
        this._addPropertyEffect(property, TYPES.REFLECT, {
          fn: runReflectEffect,
          info: {
            attrName: attr
          }
        });
      }
    }

    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */
    _createComputedProperty(property, expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed computed expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
    }

    /**
     * Gather the argument values for a method specified in the provided array
     * of argument metadata.
     *
     * The `path` and `value` arguments are used to fill in wildcard descriptor
     * when the method is being called as a result of a path notification.
     *
     * @param {!Array<!MethodArg>} args Array of argument metadata
     * @param {string} path Property/path name that triggered the method effect
     * @param {Object} props Bag of current property changes
     * @return {Array<*>} Array of argument values
     * @private
     */
    _marshalArgs(args, path, props) {
      const data = this.__data;
      let values = [];
      for (let i=0, l=args.length; i<l; i++) {
        let arg = args[i];
        let name = arg.name;
        let v;
        if (arg.literal) {
          v = arg.value;
        } else {
          if (arg.structured) {
            v = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(data, name);
            // when data is not stored e.g. `splices`
            if (v === undefined) {
              v = props[name];
            }
          } else {
            v = data[name];
          }
        }
        if (arg.wildcard) {
          // Only send the actual path changed info if the change that
          // caused the observer to run matched the wildcard
          let baseChanged = (name.indexOf(path + '.') === 0);
          let matches = (path.indexOf(name) === 0 && !baseChanged);
          values[i] = {
            path: matches ? path : name,
            value: matches ? props[path] : v,
            base: v
          };
        } else {
          values[i] = v;
        }
      }
      return values;
    }

    // -- static class methods ------------

    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */
    static addPropertyEffect(property, type, effect) {
      this.prototype._addPropertyEffect(property, type, effect);
    }

    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string|function(*,*)} method Function or name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @return {void}
     * @protected
     */
    static createPropertyObserver(property, method, dynamicFn) {
      this.prototype._createPropertyObserver(property, method, dynamicFn);
    }

    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal JavaScript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     * @return {void}
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    static createMethodObserver(expression, dynamicFn) {
      this.prototype._createMethodObserver(expression, dynamicFn);
    }

    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     */
    static createNotifyingProperty(property) {
      this.prototype._createNotifyingProperty(property);
    }

    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @return {void}
     * @protected
     */
    static createReadOnlyProperty(property, protectedSetter) {
      this.prototype._createReadOnlyProperty(property, protectedSetter);
    }

    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @return {void}
     * @protected
     */
    static createReflectedProperty(property) {
      this.prototype._createReflectedProperty(property);
    }

    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal JavaScript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @return {void}
     * @protected
     */
    static createComputedProperty(property, expression, dynamicFn) {
      this.prototype._createComputedProperty(property, expression, dynamicFn);
    }

    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {!HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {!TemplateInfo} Template metadata object
     * @protected
     */
    static bindTemplate(template) {
      return this.prototype._bindTemplate(template);
    }

    // -- binding ----------------------------------------------

    /**
     * Equivalent to static `bindTemplate` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @param {!HTMLTemplateElement} template Template containing binding
     *   bindings
     * @param {boolean=} instanceBinding When false (default), performs
     *   "prototypical" binding of the template and overwrites any previously
     *   bound template for the class. When true (as passed from
     *   `_stampTemplate`), the template info is instanced and linked into
     *   the list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     *   this is an instance of the prototypical template info
     * @protected
     */
    _bindTemplate(template, instanceBinding) {
      let templateInfo = this.constructor._parseTemplate(template);
      let wasPreBound = this.__templateInfo == templateInfo;
      // Optimization: since this is called twice for proto-bound templates,
      // don't attempt to recreate accessors if this template was pre-bound
      if (!wasPreBound) {
        for (let prop in templateInfo.propertyEffects) {
          this._createPropertyAccessor(prop);
        }
      }
      if (instanceBinding) {
        // For instance-time binding, create instance of template metadata
        // and link into list of templates if necessary
        templateInfo = /** @type {!TemplateInfo} */(Object.create(templateInfo));
        templateInfo.wasPreBound = wasPreBound;
        if (!wasPreBound && this.__templateInfo) {
          let last = this.__templateInfoLast || this.__templateInfo;
          this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
          templateInfo.previousTemplateInfo = last;
          return templateInfo;
        }
      }
      return this.__templateInfo = templateInfo;
    }

    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @return {void}
     * @protected
     */
    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
      hostProps[prop] = true;
      let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
      let propEffects = effects[prop] = effects[prop] || [];
      propEffects.push(effect);
    }

    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */
    _stampTemplate(template) {
      // Ensures that created dom is `_enqueueClient`'d to this element so
      // that it can be flushed on next call to `_flushProperties`
      hostStack.beginHosting(this);
      let dom = super._stampTemplate(template);
      hostStack.endHosting(this);
      let templateInfo = /** @type {!TemplateInfo} */(this._bindTemplate(template, true));
      // Add template-instance-specific data to instanced templateInfo
      templateInfo.nodeList = dom.nodeList;
      // Capture child nodes to allow unstamping of non-prototypical templates
      if (!templateInfo.wasPreBound) {
        let nodes = templateInfo.childNodes = [];
        for (let n=dom.firstChild; n; n=n.nextSibling) {
          nodes.push(n);
        }
      }
      dom.templateInfo = templateInfo;
      // Setup compound storage, 2-way listeners, and dataHost for bindings
      setupBindings(this, templateInfo);
      // Flush properties into template nodes if already booted
      if (this.__dataReady) {
        runEffects(this, templateInfo.propertyEffects, this.__data, null,
          false, templateInfo.nodeList);
      }
      return dom;
    }

    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @return {void}
     * @protected
     */
    _removeBoundDom(dom) {
      // Unlink template info
      let templateInfo = dom.templateInfo;
      if (templateInfo.previousTemplateInfo) {
        templateInfo.previousTemplateInfo.nextTemplateInfo =
          templateInfo.nextTemplateInfo;
      }
      if (templateInfo.nextTemplateInfo) {
        templateInfo.nextTemplateInfo.previousTemplateInfo =
          templateInfo.previousTemplateInfo;
      }
      if (this.__templateInfoLast == templateInfo) {
        this.__templateInfoLast = templateInfo.previousTemplateInfo;
      }
      templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
      // Remove stamped nodes
      let nodes = templateInfo.childNodes;
      for (let i=0; i<nodes.length; i++) {
        let node = nodes[i];
        node.parentNode.removeChild(node);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
      if (node.nodeType === Node.TEXT_NODE) {
        let parts = this._parseBindings(node.textContent, templateInfo);
        if (parts) {
          // Initialize the textContent with any literal parts
          // NOTE: default to a space here so the textNode remains; some browsers
          // (IE) omit an empty textNode following cloneNode/importNode.
          node.textContent = literalFromParts(parts) || ' ';
          addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
          noted = true;
        }
      }
      return noted;
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      let parts = this._parseBindings(value, templateInfo);
      if (parts) {
        // Attribute or property
        let origName = name;
        let kind = 'property';
        // The only way we see a capital letter here is if the attr has
        // a capital letter in it per spec. In this case, to make sure
        // this binding works, we go ahead and make the binding to the attribute.
        if (capitalAttributeRegex.test(name)) {
          kind = 'attribute';
        } else if (name[name.length-1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        }
        // Initialize attribute bindings with any literal parts
        let literal = literalFromParts(parts);
        if (literal && kind == 'attribute') {
          node.setAttribute(name, literal);
        }
        // Clear attribute before removing, since IE won't allow removing
        // `value` attribute if it previously had a value (can't
        // unconditionally set '' before removing since attributes with `$`
        // can't be set using setAttribute)
        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        }
        // Remove annotation
        node.removeAttribute(origName);
        // Case hackery: attributes are lower-case, but bind targets
        // (properties) are case sensitive. Gambit is to map dash-case to
        // camel-case: `foo-bar` becomes `fooBar`.
        // Attribute bindings are excepted.
        if (kind === 'property') {
          name = Object(_utils_case_map_js__WEBPACK_IMPORTED_MODULE_3__["dashToCamelCase"])(name);
        }
        addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
        return true;
      } else {
        return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
      // Merge host props into outer template and add bindings
      let hostProps = nodeInfo.templateInfo.hostProps;
      let mode = '{';
      for (let source in hostProps) {
        let parts = [{ mode, source, dependencies: [source] }];
        addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
      }
      return noted;
    }

    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * The default implementation uses a regular expression for best
     * performance. However, the regular expression uses a white-list of
     * allowed characters in a data-binding, which causes problems for
     * data-bindings that do use characters not in this white-list.
     *
     * Instead of updating the white-list with all allowed characters,
     * there is a StrictBindingParser (see lib/mixins/strict-binding-parser)
     * that uses a state machine instead. This state machine is able to handle
     * all characters. However, it is slightly less performant, therefore we
     * extracted it into a separate optional mixin.
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     */
    static _parseBindings(text, templateInfo) {
      let parts = [];
      let lastIndex = 0;
      let m;
      // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
      // Regex matches:
      //        Iteration 1:  Iteration 2:
      // m[1]: '{{'          '[['
      // m[2]: ''            '!'
      // m[3]: 'prop'        'compute(foo,bar)'
      while ((m = bindingRegex.exec(text)) !== null) {
        // Add literal part
        if (m.index > lastIndex) {
          parts.push({literal: text.slice(lastIndex, m.index)});
        }
        // Add binding part
        let mode = m[1][0];
        let negate = Boolean(m[2]);
        let source = m[3].trim();
        let customEvent = false, notifyEvent = '', colon = -1;
        if (mode == '{' && (colon = source.indexOf('::')) > 0) {
          notifyEvent = source.substring(colon + 2);
          source = source.substring(0, colon);
          customEvent = true;
        }
        let signature = parseMethod(source);
        let dependencies = [];
        if (signature) {
          // Inline computed function
          let {args, methodName} = signature;
          for (let i=0; i<args.length; i++) {
            let arg = args[i];
            if (!arg.literal) {
              dependencies.push(arg);
            }
          }
          let dynamicFns = templateInfo.dynamicFns;
          if (dynamicFns && dynamicFns[methodName] || signature.static) {
            dependencies.push(methodName);
            signature.dynamicFn = true;
          }
        } else {
          // Property or path
          dependencies.push(source);
        }
        parts.push({
          source, mode, negate, customEvent, signature, dependencies,
          event: notifyEvent
        });
        lastIndex = bindingRegex.lastIndex;
      }
      // Add a final literal part
      if (lastIndex && lastIndex < text.length) {
        let literal = text.substring(lastIndex);
        if (literal) {
          parts.push({
            literal: literal
          });
        }
      }
      if (parts.length) {
        return parts;
      } else {
        return null;
      }
    }

    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {this} inst Element that should be used as scope for
     *   binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     */
    static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
      let value;
      if (part.signature) {
        value = runMethodEffect(inst, path, props, oldProps, part.signature);
      } else if (path != part.source) {
        value = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(inst, part.source);
      } else {
        if (hasPaths && Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["isPath"])(path)) {
          value = Object(_utils_path_js__WEBPACK_IMPORTED_MODULE_2__["get"])(inst, path);
        } else {
          value = inst.__data[path];
        }
      }
      if (part.negate) {
        value = !value;
      }
      return value;
    }

  }

  // make a typing for closure :P
  PropertyEffectsType = PropertyEffects;

  return PropertyEffects;
});

/**
 * Helper api for enqueuing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
class HostStack {
  constructor() {
    this.stack = [];
  }

  /**
   * @param {*} inst Instance to add to hostStack
   * @return {void}
   */
  registerHost(inst) {
    if (this.stack.length) {
      let host = this.stack[this.stack.length-1];
      host._enqueueClient(inst);
    }
  }

  /**
   * @param {*} inst Instance to begin hosting
   * @return {void}
   */
  beginHosting(inst) {
    this.stack.push(inst);
  }

  /**
   * @param {*} inst Instance to end hosting
   * @return {void}
   */
  endHosting(inst) {
    let stackLen = this.stack.length;
    if (stackLen && this.stack[stackLen-1] == inst) {
      this.stack.pop();
    }
  }
}
const hostStack = new HostStack();


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/mixins/template-stamp.js":
/*!***************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/mixins/template-stamp.js ***!
  \***************************************************************************/
/*! exports provided: TemplateStamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateStamp", function() { return TemplateStamp; });
/* harmony import */ var _utils_boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/mixin.js */ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
const templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
function wrapTemplateExtension(node) {
  let is = node.getAttribute('is');
  if (is && templateExtensions[is]) {
    let t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);
    while(t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }
  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
  // unwind the stack, returning the indexed node at each level
  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (let n=parent.firstChild, i=0; n; n=n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
}

// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
}

// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (let j=0, e$=nodeInfo.events, e; (j<e$.length) && (e=e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
}

// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
  if (nodeInfo.templateInfo) {
    node._templateInfo = nodeInfo.templateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;
  let handler = function(e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };
  return handler;
}

/**
 * Element mixin that provides basic template parsing and stamping, including
 * the following template-related features for stamped templates:
 *
 * - Declarative event listeners (`on-eventname="listener"`)
 * - Map of node id's to stamped node instances (`this.$.id`)
 * - Nested template content caching/removal and re-installation (performance
 *   optimization)
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin that provides basic template parsing and stamping
 */
const TemplateStamp = Object(_utils_mixin_js__WEBPACK_IMPORTED_MODULE_1__["dedupingMixin"])(
    /**
     * @template T
     * @param {function(new:T)} superClass Class to apply mixin to.
     * @return {function(new:T)} superClass with mixin applied.
     */
    (superClass) => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  class TemplateStamp extends superClass {

    /**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     */
    static _parseTemplate(template, outerTemplateInfo) {
      // since a template may be re-used, memo-ize metadata
      if (!template._templateInfo) {
        let templateInfo = template._templateInfo = {};
        templateInfo.nodeInfoList = [];
        templateInfo.stripWhiteSpace =
          (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
          template.hasAttribute('strip-whitespace');
        this._parseTemplateContent(template, templateInfo, {parent: null});
      }
      return template._templateInfo;
    }

    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
    }

    /**
     * Parses template node and adds template and node metadata based on
     * the current node, and its `childNodes` and `attributes`.
     *
     * This method may be overridden to add custom node or template specific
     * metadata based on this node.
     *
     * @param {Node} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted;
      let element = /** @type {Element} */(node);
      if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
        noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
      } else if (element.localName === 'slot') {
        // For ShadyDom optimization, indicating there is an insertion point
        templateInfo.hasInsertionPoint = true;
      }
      if (element.firstChild) {
        noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
      }
      if (element.hasAttributes && element.hasAttributes()) {
        noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
      }
      return noted;
    }

    /**
     * Parses template child nodes for the given root node.
     *
     * This method also wraps whitelisted legacy template extensions
     * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
     * wrappers, collapses text nodes, and strips whitespace from the template
     * if the `templateInfo.stripWhitespace` setting was provided.
     *
     * @param {Node} root Root node whose `childNodes` will be parsed
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {void}
     */
    static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
      if (root.localName === 'script' || root.localName === 'style') {
        return;
      }
      for (let node=root.firstChild, parentIndex=0, next; node; node=next) {
        // Wrap templates
        if (node.localName == 'template') {
          node = wrapTemplateExtension(node);
        }
        // collapse adjacent textNodes: fixes an IE issue that can cause
        // text nodes to be inexplicably split =(
        // note that root.normalize() should work but does not so we do this
        // manually.
        next = node.nextSibling;
        if (node.nodeType === Node.TEXT_NODE) {
          let /** Node */ n = next;
          while (n && (n.nodeType === Node.TEXT_NODE)) {
            node.textContent += n.textContent;
            next = n.nextSibling;
            root.removeChild(n);
            n = next;
          }
          // optionally strip whitespace
          if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
            root.removeChild(node);
            continue;
          }
        }
        let childInfo = { parentIndex, parentInfo: nodeInfo };
        if (this._parseTemplateNode(node, templateInfo, childInfo)) {
          childInfo.infoIndex = templateInfo.nodeInfoList.push(/** @type {!NodeInfo} */(childInfo)) - 1;
        }
        // Increment if not removed
        if (node.parentNode) {
          parentIndex++;
        }
      }
    }

    /**
     * Parses template content for the given nested `<template>`.
     *
     * Nested template info is stored as `templateInfo` in the current node's
     * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
     * It will then be the responsibility of the host to set it back to the
     * template and for users stamping nested templates to use the
     * `_contentForTemplate` method to retrieve the content for this template
     * (an optimization to avoid the cost of cloning nested template content).
     *
     * @param {HTMLTemplateElement} node Node to parse (a <template>)
     * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
     *   that includes the template `node`
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
      let templateInfo = this._parseTemplate(node, outerTemplateInfo);
      let content = templateInfo.content =
        node.content.ownerDocument.createDocumentFragment();
      content.appendChild(node.content);
      nodeInfo.templateInfo = templateInfo;
      return true;
    }

    /**
     * Parses template node attributes and adds node metadata to `nodeInfo`
     * for nodes of interest.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
      // Make copy of original attribute list, since the order may change
      // as attributes are added and removed
      let noted = false;
      let attrs = Array.from(node.attributes);
      for (let i=attrs.length-1, a; (a=attrs[i]); i--) {
        noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
      }
      return noted;
    }

    /**
     * Parses a single template node attribute and adds node metadata to
     * `nodeInfo` for attributes of interest.
     *
     * This implementation adds metadata for `on-event="handler"` attributes
     * and `id` attributes.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      // events (on-*)
      if (name.slice(0, 3) === 'on-') {
        node.removeAttribute(name);
        nodeInfo.events = nodeInfo.events || [];
        nodeInfo.events.push({
          name: name.slice(3),
          value
        });
        return true;
      }
      // static id
      else if (name === 'id') {
        nodeInfo.id = value;
        return true;
      }
      return false;
    }

    /**
     * Returns the `content` document fragment for a given template.
     *
     * For nested templates, Polymer performs an optimization to cache nested
     * template content to avoid the cost of cloning deeply nested templates.
     * This method retrieves the cached content for a given template.
     *
     * @param {HTMLTemplateElement} template Template to retrieve `content` for
     * @return {DocumentFragment} Content fragment
     */
    static _contentForTemplate(template) {
      let templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
      return (templateInfo && templateInfo.content) || template.content;
    }

    /**
     * Clones the provided template content and returns a document fragment
     * containing the cloned dom.
     *
     * The template is parsed (once and memoized) using this library's
     * template parsing features, and provides the following value-added
     * features:
     * * Adds declarative event listeners for `on-event="handler"` attributes
     * * Generates an "id map" for all nodes with id's under `$` on returned
     *   document fragment
     * * Passes template info including `content` back to templates as
     *   `_templateInfo` (a performance optimization to avoid deep template
     *   cloning)
     *
     * Note that the memoized template parsing process is destructive to the
     * template: attributes for bindings and declarative event listeners are
     * removed after being noted in notes, and any nested `<template>.content`
     * is removed and stored in notes as well.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     * @override
     */
    _stampTemplate(template) {
      // Polyfill support: bootstrap the template if it has not already been
      if (template && !template.content &&
          window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(template);
      }
      let templateInfo = this.constructor._parseTemplate(template);
      let nodeInfo = templateInfo.nodeInfoList;
      let content = templateInfo.content || template.content;
      let dom = /** @type {DocumentFragment} */ (document.importNode(content, true));
      // NOTE: ShadyDom optimization indicating there is an insertion point
      dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
      let nodes = dom.nodeList = new Array(nodeInfo.length);
      dom.$ = {};
      for (let i=0, l=nodeInfo.length, info; (i<l) && (info=nodeInfo[i]); i++) {
        let node = nodes[i] = findTemplateNode(dom, info);
        applyIdToMap(this, dom.$, node, info);
        applyTemplateContent(this, node, info);
        applyEventListener(this, node, info);
      }
      dom = /** @type {!StampedTemplate} */(dom); // eslint-disable-line no-self-assign
      return dom;
    }

    /**
     * Adds an event listener by method name for the event provided.
     *
     * This method generates a handler function that looks up the method
     * name at handling time.
     *
     * @param {!EventTarget} node Node to add listener on
     * @param {string} eventName Name of event
     * @param {string} methodName Name of method
     * @param {*=} context Context the method will be called on (defaults
     *   to `node`)
     * @return {Function} Generated handler function
     * @override
     */
    _addMethodEventListenerToNode(node, eventName, methodName, context) {
      context = context || node;
      let handler = createNodeEventHandler(context, eventName, methodName);
      this._addEventListenerToNode(node, eventName, handler);
      return handler;
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {!EventTarget} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to add
     * @return {void}
     * @override
     */
    _addEventListenerToNode(node, eventName, handler) {
      node.addEventListener(eventName, handler);
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {!EventTarget} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {function(!Event):void} handler Listener function to remove
     * @return {void}
     * @override
     */
    _removeEventListenerFromNode(node, eventName, handler) {
      node.removeEventListener(eventName, handler);
    }

  }

  return TemplateStamp;

});


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/async.js":
/*!*****************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/async.js ***!
  \*****************************************************************/
/*! exports provided: timeOut, animationFrame, idlePeriod, microTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeOut", function() { return timeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return animationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idlePeriod", function() { return idlePeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microTask", function() { return microTask; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * @fileoverview
 *
 * This module provides a number of strategies for enqueuing asynchronous
 * tasks. Each sub-module provides a standard `run(fn)` interface that returns a
 * handle, and a `cancel(handle)` interface for canceling async tasks before
 * they run.
 *
 * @summary Module that provides a number of strategies for enqueuing
 * asynchronous tasks.
 */



// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

function microtaskFlush() {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => { throw e; });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}

/**
 * Async interface wrapper around `setTimeout`.
 *
 * @namespace
 * @summary Async interface wrapper around `setTimeout`.
 */
const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof timeOut
   * @param {number=} delay Time to wait before calling callbacks in ms
   * @return {!AsyncInterface} An async timeout interface
   */
  after(delay) {
    return {
      run(fn) { return window.setTimeout(fn, delay); },
      cancel(handle) {
        window.clearTimeout(handle);
      }
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof timeOut
   * @param {!Function} fn Callback to run
   * @param {number=} delay Delay in milliseconds
   * @return {number} Handle used for canceling task
   */
  run(fn, delay) {
    return window.setTimeout(fn, delay);
  },
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.clearTimeout(handle);
  }
};


/**
 * Async interface wrapper around `requestAnimationFrame`.
 *
 * @namespace
 * @summary Async interface wrapper around `requestAnimationFrame`.
 */
const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof animationFrame
   * @param {function(number):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestAnimationFrame(fn);
  },
  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof animationFrame
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.cancelAnimationFrame(handle);
  }
};


/**
 * Async interface wrapper around `requestIdleCallback`.  Falls back to
 * `setTimeout` on browsers that do not support `requestIdleCallback`.
 *
 * @namespace
 * @summary Async interface wrapper around `requestIdleCallback`.
 */
const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof idlePeriod
   * @param {function(!IdleDeadline):void} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ?
      window.requestIdleCallback(fn) :
      window.setTimeout(fn, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    window.cancelIdleCallback ?
      window.cancelIdleCallback(handle) :
      window.clearTimeout(handle);
  }
};


/**
 * Async interface for enqueuing callbacks that run at microtask timing.
 *
 * Note that microtask timing is achieved via a single `MutationObserver`,
 * and thus callbacks enqueued with this API will all run in a single
 * batch, and not interleaved with other microtasks such as promises.
 * Promises are avoided as an implementation choice for the time being
 * due to Safari bugs that cause Promises to lack microtask guarantees.
 *
 * @namespace
 * @summary Async interface for enqueuing callbacks that run at microtask
 *   timing.
 */
const microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof microTask
   * @param {!Function=} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   * @return {void}
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }

};



/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/boot.js":
/*!****************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/boot.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* eslint-disable no-unused-vars */
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
 * We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
 *
 * @param {string} prop Property name
 * @param {?Object} obj Reference object
 * @return {string} Potentially renamed property name
 */
window.JSCompiler_renameProperty = function(prop, obj) {
  return prop;
};
/* eslint-enable */




/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/case-map.js":
/*!********************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/case-map.js ***!
  \********************************************************************/
/*! exports provided: dashToCamelCase, camelToDashCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dashToCamelCase", function() { return dashToCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelToDashCase", function() { return camelToDashCase; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;

/**
 * @fileoverview Module with utilities for converting between "dash-case" and
 * "camelCase" identifiers.
 */

/**
 * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
 * (e.g. `fooBarBaz`).
 *
 * @param {string} dash Dash-case identifier
 * @return {string} Camel-case representation of the identifier
 */
function dashToCamelCase(dash) {
  return caseMap[dash] || (
    caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
      (m) => m[1].toUpperCase()
    )
  );
}

/**
 * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
 * (e.g. `foo-bar-baz`).
 *
 * @param {string} camel Camel-case identifier
 * @return {string} Dash-case representation of the identifier
 */
function camelToDashCase(camel) {
  return caseMap[camel] || (
    caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
  );
}


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/html-tag.js":
/*!********************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/html-tag.js ***!
  \********************************************************************/
/*! exports provided: html, htmlLiteral */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlLiteral", function() { return htmlLiteral; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


/**
 * Class representing a static string value which can be used to filter
 * strings by asseting that they have been created via this class. The
 * `value` property returns the string passed to the constructor.
 */
class LiteralString {
  constructor(string) {
    /** @type {string} */
    this.value = string.toString();
  }
  /**
   * @return {string} LiteralString string value
   * @override
   */
  toString() {
    return this.value;
  }
}

/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */
function literalValue(value) {
  if (value instanceof LiteralString) {
    return /** @type {!LiteralString} */(value).value;
  } else {
    throw new Error(
        `non-literal value passed to Polymer's htmlLiteral function: ${value}`
    );
  }
}

/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */
function htmlValue(value) {
  if (value instanceof HTMLTemplateElement) {
    return /** @type {!HTMLTemplateElement } */(value).innerHTML;
  } else if (value instanceof LiteralString) {
    return literalValue(value);
  } else {
    throw new Error(
        `non-template value passed to Polymer's html function: ${value}`);
  }
}

/**
 * A template literal tag that creates an HTML <template> element from the
 * contents of the string.
 *
 * This allows you to write a Polymer Template in JavaScript.
 *
 * Templates can be composed by interpolating `HTMLTemplateElement`s in
 * expressions in the JavaScript template literal. The nested template's
 * `innerHTML` is included in the containing template.  The only other
 * values allowed in expressions are those returned from `htmlLiteral`
 * which ensures only literal values from JS source ever reach the HTML, to
 * guard against XSS risks.
 *
 * All other values are disallowed in expressions to help prevent XSS
 * attacks; however, `htmlLiteral` can be used to compose static
 * string values into templates. This is useful to compose strings into
 * places that do not accept html, like the css text of a `style`
 * element.
 *
 * Example:
 *
 *     static get template() {
 *       return html`
 *         <style>:host{ content:"..." }</style>
 *         <div class="shadowed">${this.partialTemplate}</div>
 *         ${super.template}
 *       `;
 *     }
 *     static get partialTemplate() { return html`<span>Partial!</span>`; }
 *
 * @param {!ITemplateArray} strings Constant parts of tagged template literal
 * @param {...*} values Variable parts of tagged template literal
 * @return {!HTMLTemplateElement} Constructed HTMLTemplateElement
 */
const html = function html(strings, ...values) {
  const template = /** @type {!HTMLTemplateElement} */(document.createElement('template'));
  template.innerHTML = values.reduce((acc, v, idx) =>
      acc + htmlValue(v) + strings[idx + 1], strings[0]);
  return template;
};

/**
 * An html literal tag that can be used with `html` to compose.
 * a literal string.
 *
 * Example:
 *
 *     static get template() {
 *       return html`
 *         <style>
 *           :host { display: block; }
 *           ${this.styleTemplate()}
 *         </style>
 *         <div class="shadowed">${staticValue}</div>
 *         ${super.template}
 *       `;
 *     }
 *     static get styleTemplate() {
 *        return htmlLiteral`.shadowed { background: gray; }`;
 *     }
 *
 * @param {!ITemplateArray} strings Constant parts of tagged template literal
 * @param {...*} values Variable parts of tagged template literal
 * @return {!LiteralString} Constructed literal string
 */
const htmlLiteral = function(strings, ...values) {
  return new LiteralString(values.reduce((acc, v, idx) =>
      acc + literalValue(v) + strings[idx + 1], strings[0]));
};


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/mixin.js":
/*!*****************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/mixin.js ***!
  \*****************************************************************/
/*! exports provided: dedupingMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dedupingMixin", function() { return dedupingMixin; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


// unique global id for deduping mixins.
let dedupeId = 0;

/**
 * @constructor
 * @extends {Function}
 * @private
 */
function MixinFunction(){}
/** @type {(WeakMap | undefined)} */
MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */
MixinFunction.prototype.__mixinSet;

/* eslint-disable valid-jsdoc */
/**
 * Wraps an ES6 class expression mixin such that the mixin is only applied
 * if it has not already been applied its base argument. Also memoizes mixin
 * applications.
 *
 * @template T
 * @param {T} mixin ES6 class expression mixin to wrap
 * @return {T}
 * @suppress {invalidCasts}
 */
const dedupingMixin = function(mixin) {
  let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */(mixin)(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};
/* eslint-enable valid-jsdoc */


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/path.js":
/*!****************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/path.js ***!
  \****************************************************************/
/*! exports provided: isPath, root, isAncestor, isDescendant, translate, matches, normalize, split, get, set, isDeep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPath", function() { return isPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "root", function() { return root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAncestor", function() { return isAncestor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDescendant", function() { return isDescendant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "split", function() { return split; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDeep", function() { return isDeep; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


/**
 * Module with utilities for manipulating structured data path strings.
 *
 * @summary Module with utilities for manipulating structured data path strings.
 */

/**
 * Returns true if the given string is a structured data path (has dots).
 *
 * Example:
 *
 * ```
 * isPath('foo.bar.baz') // true
 * isPath('foo')         // false
 * ```
 *
 * @param {string} path Path string
 * @return {boolean} True if the string contained one or more dots
 */
function isPath(path) {
  return path.indexOf('.') >= 0;
}

/**
 * Returns the root property name for the given path.
 *
 * Example:
 *
 * ```
 * root('foo.bar.baz') // 'foo'
 * root('foo')         // 'foo'
 * ```
 *
 * @param {string} path Path string
 * @return {string} Root property name
 */
function root(path) {
  let dotIndex = path.indexOf('.');
  if (dotIndex === -1) {
    return path;
  }
  return path.slice(0, dotIndex);
}

/**
 * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
 * Returns true if the given path is an ancestor of the base path.
 *
 * Example:
 *
 * ```
 * isAncestor('foo.bar', 'foo')         // true
 * isAncestor('foo.bar', 'foo.bar')     // false
 * isAncestor('foo.bar', 'foo.bar.baz') // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is an ancestor of `base`.
 */
function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}

/**
 * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
 *
 * Example:
 *
 * ```
 * isDescendant('foo.bar', 'foo.bar.baz') // true
 * isDescendant('foo.bar', 'foo.bar')     // false
 * isDescendant('foo.bar', 'foo')         // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is a descendant of `base`.
 */
function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}

/**
 * Replaces a previous base path with a new base path, preserving the
 * remainder of the path.
 *
 * User must ensure `path` has a prefix of `base`.
 *
 * Example:
 *
 * ```
 * translate('foo.bar', 'zot', 'foo.bar.baz') // 'zot.baz'
 * ```
 *
 * @param {string} base Current base string to remove
 * @param {string} newBase New base string to replace with
 * @param {string} path Path to translate
 * @return {string} Translated string
 */
function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}

/**
 * @param {string} base Path string to test against
 * @param {string} path Path string to test
 * @return {boolean} True if `path` is equal to `base`
 */
function matches(base, path) {
  return (base === path) ||
         isAncestor(base, path) ||
         isDescendant(base, path);
}

/**
 * Converts array-based paths to flattened path.  String-based paths
 * are returned as-is.
 *
 * Example:
 *
 * ```
 * normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
 * normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {string} Flattened path
 */
function normalize(path) {
  if (Array.isArray(path)) {
    let parts = [];
    for (let i=0; i<path.length; i++) {
      let args = path[i].toString().split('.');
      for (let j=0; j<args.length; j++) {
        parts.push(args[j]);
      }
    }
    return parts.join('.');
  } else {
    return path;
  }
}

/**
 * Splits a path into an array of property names. Accepts either arrays
 * of path parts or strings.
 *
 * Example:
 *
 * ```
 * split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
 * split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {!Array<string>} Array of path parts
 * @suppress {checkTypes}
 */
function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }
  return path.toString().split('.');
}

/**
 * Reads a value from a path.  If any sub-property in the path is `undefined`,
 * this method returns `undefined` (will never throw.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to read
 * @param {Object=} info If an object is provided to `info`, the normalized
 *  (flattened) path will be set to `info.path`.
 * @return {*} Value at path, or `undefined` if the path could not be
 *  fully dereferenced.
 */
function get(root, path, info) {
  let prop = root;
  let parts = split(path);
  // Loop over path parts[0..n-1] and dereference
  for (let i=0; i<parts.length; i++) {
    if (!prop) {
      return;
    }
    let part = parts[i];
    prop = prop[part];
  }
  if (info) {
    info.path = parts.join('.');
  }
  return prop;
}

/**
 * Sets a value to a path.  If any sub-property in the path is `undefined`,
 * this method will no-op.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to set
 * @param {*} value Value to set to path
 * @return {string | undefined} The normalized version of the input path
 */
function set(root, path, value) {
  let prop = root;
  let parts = split(path);
  let last = parts[parts.length-1];
  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (let i=0; i<parts.length-1; i++) {
      let part = parts[i];
      prop = prop[part];
      if (!prop) {
        return;
      }
    }
    // Set value to object at end of path
    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }
  return parts.join('.');
}

/**
 * Returns true if the given string is a structured data path (has dots).
 *
 * This function is deprecated.  Use `isPath` instead.
 *
 * Example:
 *
 * ```
 * isDeep('foo.bar.baz') // true
 * isDeep('foo')         // false
 * ```
 *
 * @deprecated
 * @param {string} path Path string
 * @return {boolean} True if the string contained one or more dots
 */
const isDeep = isPath;


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js":
/*!***********************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js ***!
  \***********************************************************************/
/*! exports provided: resolveUrl, resolveCss, pathFromUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveUrl", function() { return resolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveCss", function() { return resolveCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathFromUrl", function() { return pathFromUrl; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


let CSS_URL_RX = /(url\()([^)]*)(\))/g;
let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
let workingURL;
let resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * Note that this function performs no resolution for URLs that start
 * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
 * URL resolution, use `window.URL`.
 *
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
  if (url && ABS_URL.test(url)) {
    return url;
  }
  // Lazy feature detection.
  if (workingURL === undefined) {
    workingURL = false;
    try {
      const u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = (u.href === 'http://a/c%20d');
    } catch (e) {
      // silently fail
    }
  }
  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }
  if (workingURL) {
    return (new URL(url, baseURI)).href;
  }
  // Fallback to creating an anchor into a disconnected document.
  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }
  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;

}

/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function(m, pre, url, post) {
    return pre + '\'' +
      resolveUrl(url.replace(/["']/g, ''), baseURI) +
      '\'' + post;
  });
}

/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/settings.js":
/*!********************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/settings.js ***!
  \********************************************************************/
/*! exports provided: useShadow, useNativeCSSProperties, useNativeCustomElements, rootPath, setRootPath, sanitizeDOMValue, setSanitizeDOMValue, passiveTouchGestures, setPassiveTouchGestures, strictTemplatePolicy, setStrictTemplatePolicy, allowTemplateFromDomModule, setAllowTemplateFromDomModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useShadow", function() { return useShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNativeCSSProperties", function() { return useNativeCSSProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNativeCustomElements", function() { return useNativeCustomElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootPath", function() { return rootPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRootPath", function() { return setRootPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitizeDOMValue", function() { return sanitizeDOMValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSanitizeDOMValue", function() { return setSanitizeDOMValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passiveTouchGestures", function() { return passiveTouchGestures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPassiveTouchGestures", function() { return setPassiveTouchGestures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strictTemplatePolicy", function() { return strictTemplatePolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStrictTemplatePolicy", function() { return setStrictTemplatePolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allowTemplateFromDomModule", function() { return allowTemplateFromDomModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllowTemplateFromDomModule", function() { return setAllowTemplateFromDomModule; });
/* harmony import */ var _boot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot.js */ "./public/node_modules/@polymer/polymer/lib/utils/boot.js");
/* harmony import */ var _resolve_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve-url.js */ "./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



const useShadow = !(window.ShadyDOM);
const useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
const useNativeCustomElements = !(window.customElements.polyfillWrapFlushCallback);


/**
 * Globally settable property that is automatically assigned to
 * `ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `rootPath` to provide a stable application mount path when
 * using client side routing.
 */
let rootPath = undefined ||
  Object(_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__["pathFromUrl"])(document.baseURI || window.location.href);

/**
 * Sets the global rootPath property used by `ElementMixin` and
 * available via `rootPath`.
 *
 * @param {string} path The new root path
 * @return {void}
 */
const setRootPath = function(path) {
  rootPath = path;
};

/**
 * A global callback used to sanitize any value before inserting it into the DOM.
 * The callback signature is:
 *
 *  function sanitizeDOMValue(value, name, type, node) { ... }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 */
let sanitizeDOMValue = window.Polymer && window.Polymer.sanitizeDOMValue || undefined;

/**
 * Sets the global sanitizeDOMValue available via this module's exported
 * `sanitizeDOMValue` variable.
 *
 * @param {(function(*,string,string,Node):*)|undefined} newSanitizeDOMValue the global sanitizeDOMValue callback
 * @return {void}
 */
const setSanitizeDOMValue = function(newSanitizeDOMValue) {
  sanitizeDOMValue = newSanitizeDOMValue;
};

/**
 * Globally settable property to make Polymer Gestures use passive TouchEvent listeners when recognizing gestures.
 * When set to `true`, gestures made from touch will not be able to prevent scrolling, allowing for smoother
 * scrolling performance.
 * Defaults to `false` for backwards compatibility.
 */
let passiveTouchGestures = false;

/**
 * Sets `passiveTouchGestures` globally for all elements using Polymer Gestures.
 *
 * @param {boolean} usePassive enable or disable passive touch gestures globally
 * @return {void}
 */
const setPassiveTouchGestures = function(usePassive) {
  passiveTouchGestures = usePassive;
};

/**
 * Setting to ensure Polymer template evaluation only occurs based on tempates
 * defined in trusted script.  When true, `<dom-module>` re-registration is
 * disallowed, `<dom-bind>` is disabled, and `<dom-if>`/`<dom-repeat>`
 * templates will only evaluate in the context of a trusted element template.
 */
let strictTemplatePolicy = false;

/**
 * Sets `strictTemplatePolicy` globally for all elements
 *
 * @param {boolean} useStrictPolicy enable or disable strict template policy
 *   globally
 * @return {void}
 */
const setStrictTemplatePolicy = function(useStrictPolicy) {
  strictTemplatePolicy = useStrictPolicy;
};

/**
 * Setting to enable dom-module lookup from Polymer.Element.  By default,
 * templates must be defined in script using the `static get template()`
 * getter and the `html` tag function.  To enable legacy loading of templates
 * via dom-module, set this flag to true.
 */
let allowTemplateFromDomModule = false;

/**
 * Sets `lookupTemplateFromDomModule` globally for all elements
 *
 * @param {boolean} allowDomModule enable or disable template lookup 
 *   globally
 * @return {void}
 */
const setAllowTemplateFromDomModule = function(allowDomModule) {
  allowTemplateFromDomModule = allowDomModule;
};


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/lib/utils/style-gather.js":
/*!************************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/lib/utils/style-gather.js ***!
  \************************************************************************/
/*! exports provided: stylesFromModules, stylesFromModule, stylesFromTemplate, stylesFromModuleImports, cssFromModules, cssFromModule, cssFromTemplate, cssFromModuleImports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stylesFromModules", function() { return stylesFromModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stylesFromModule", function() { return stylesFromModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stylesFromTemplate", function() { return stylesFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stylesFromModuleImports", function() { return stylesFromModuleImports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssFromModules", function() { return cssFromModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssFromModule", function() { return cssFromModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssFromTemplate", function() { return cssFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssFromModuleImports", function() { return cssFromModuleImports; });
/* harmony import */ var _elements_dom_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elements/dom-module.js */ "./public/node_modules/@polymer/polymer/lib/elements/dom-module.js");
/* harmony import */ var _resolve_url_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve-url.js */ "./public/node_modules/@polymer/polymer/lib/utils/resolve-url.js");
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Module with utilities for collection CSS text from `<templates>`, external
 * stylesheets, and `dom-module`s.
 *
 * @summary Module with utilities for collection CSS text from various sources.
 */




const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
const INCLUDE_ATTR = 'include';
const SHADY_UNSCOPED_ATTR = 'shady-unscoped';

/**
 * @param {string} moduleId .
 * @return {?DomModule} .
 */
function importModule(moduleId) {
  return /** @type {?DomModule} */(_elements_dom_module_js__WEBPACK_IMPORTED_MODULE_0__["DomModule"].import(moduleId));
}

function styleForImport(importDoc) {
  // NOTE: polyfill affordance.
  // under the HTMLImports polyfill, there will be no 'body',
  // but the import pseudo-doc can be used directly.
  let container = importDoc.body ? importDoc.body : importDoc;
  const importCss = Object(_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__["resolveCss"])(container.textContent,
    importDoc.baseURI);
  const style = document.createElement('style');
  style.textContent = importCss;
  return style;
}

/** @typedef {{assetpath: string}} */
let templateWithAssetPath; // eslint-disable-line no-unused-vars


/**
 * Returns a list of <style> elements in a space-separated list of `dom-module`s.
 *
 * @function
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {!Array<!HTMLStyleElement>} Array of contained <style> elements
 */
function stylesFromModules(moduleIds) {
 const modules = moduleIds.trim().split(/\s+/);
 const styles = [];
 for (let i=0; i < modules.length; i++) {
   styles.push(...stylesFromModule(modules[i]));
 }
 return styles;
}

/**
 * Returns a list of <style> elements in a given `dom-module`.
 * Styles in a `dom-module` can come either from `<style>`s within the
 * first `<template>`, or else from one or more
 * `<link rel="import" type="css">` links outside the template.
 *
 * @param {string} moduleId dom-module id to gather styles from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */
function stylesFromModule(moduleId) {
  const m = importModule(moduleId);

  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
    return [];
  }

  if (m._styles === undefined) {
    const styles = [];
    // module imports: <link rel="import" type="css">
    styles.push(..._stylesFromModuleImports(m));
    // include css from the first template in the module
    const template = /** @type {?HTMLTemplateElement} */(
        m.querySelector('template'));
    if (template) {
      styles.push(...stylesFromTemplate(template,
        /** @type {templateWithAssetPath} */(m).assetpath));
    }

    m._styles = styles;
  }

  return m._styles;
}

/**
 * Returns the `<style>` elements within a given template.
 *
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string} baseURI baseURI for style content
 * @return {!Array<!HTMLStyleElement>} Array of styles
 */
function stylesFromTemplate(template, baseURI) {
  if (!template._styles) {
    const styles = [];
    // if element is a template, get content from its .content
    const e$ = template.content.querySelectorAll('style');
    for (let i=0; i < e$.length; i++) {
      let e = e$[i];
      // support style sharing by allowing styles to "include"
      // other dom-modules that contain styling
      let include = e.getAttribute(INCLUDE_ATTR);
      if (include) {
        styles.push(...stylesFromModules(include).filter(function(item, index, self) {
          return self.indexOf(item) === index;
        }));
      }
      if (baseURI) {
        e.textContent = Object(_resolve_url_js__WEBPACK_IMPORTED_MODULE_1__["resolveCss"])(e.textContent, baseURI);
      }
      styles.push(e);
    }
    template._styles = styles;
  }
  return template._styles;
}

/**
 * Returns a list of <style> elements  from stylesheets loaded via `<link rel="import" type="css">` links within the specified `dom-module`.
 *
 * @param {string} moduleId Id of `dom-module` to gather CSS from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */
function stylesFromModuleImports(moduleId) {
 let m = importModule(moduleId);
 return m ? _stylesFromModuleImports(m) : [];
}

/**
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {!Array<!HTMLStyleElement>} Array of contained styles
 */
function _stylesFromModuleImports(module) {
  const styles = [];
  const p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
  for (let i=0; i < p$.length; i++) {
    let p = p$[i];
    if (p.import) {
      const importDoc = p.import;
      const unscoped = p.hasAttribute(SHADY_UNSCOPED_ATTR);
      if (unscoped && !importDoc._unscopedStyle) {
        const style = styleForImport(importDoc);
        style.setAttribute(SHADY_UNSCOPED_ATTR, '');
        importDoc._unscopedStyle = style;
      } else if (!importDoc._style) {
        importDoc._style = styleForImport(importDoc);
      }
      styles.push(unscoped ? importDoc._unscopedStyle : importDoc._style);
    }
  }
  return styles;
}

/**
 *
 * Returns CSS text of styles in a space-separated list of `dom-module`s.
 * Note: This method is deprecated, use `stylesFromModules` instead.
 *
 * @deprecated
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {string} Concatenated CSS content from specified `dom-module`s
 */
function cssFromModules(moduleIds) {
 let modules = moduleIds.trim().split(/\s+/);
 let cssText = '';
 for (let i=0; i < modules.length; i++) {
   cssText += cssFromModule(modules[i]);
 }
 return cssText;
}

/**
 * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
 * can come either from `<style>`s within the first `<template>`, or else
 * from one or more `<link rel="import" type="css">` links outside the
 * template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromModule` instead.
 *
 * @deprecated
 * @param {string} moduleId dom-module id to gather styles from
 * @return {string} Concatenated CSS content from specified `dom-module`
 */
function cssFromModule(moduleId) {
  let m = importModule(moduleId);
  if (m && m._cssText === undefined) {
    // module imports: <link rel="import" type="css">
    let cssText = _cssFromModuleImports(m);
    // include css from the first template in the module
    let t = /** @type {?HTMLTemplateElement} */(m.querySelector('template'));
    if (t) {
      cssText += cssFromTemplate(t,
        /** @type {templateWithAssetPath} */(m).assetpath);
    }
    m._cssText = cssText || null;
  }
  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }
  return m && m._cssText || '';
}

/**
 * Returns CSS text of `<styles>` within a given template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromTemplate` instead.
 *
 * @deprecated
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Concatenated CSS content from specified template
 */
function cssFromTemplate(template, baseURI) {
  let cssText = '';
  const e$ = stylesFromTemplate(template, baseURI);
  // if element is a template, get content from its .content
  for (let i=0; i < e$.length; i++) {
    let e = e$[i];
    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }
    cssText += e.textContent;
  }
  return cssText;
}

/**
 * Returns CSS text from stylesheets loaded via `<link rel="import" type="css">`
 * links within the specified `dom-module`.
 *
 * Note: This method is deprecated, use `stylesFromModuleImports` instead.
 *
 * @deprecated
 *
 * @param {string} moduleId Id of `dom-module` to gather CSS from
 * @return {string} Concatenated CSS content from links in specified `dom-module`
 */
function cssFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _cssFromModuleImports(m) : '';
}

/**
 * @deprecated
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {string} Concatenated CSS content from links in the dom-module
 */
function _cssFromModuleImports(module) {
  let cssText = '';
  let styles = _stylesFromModuleImports(module);
  for (let i=0; i < styles.length; i++) {
    cssText += styles[i].textContent;
  }
  return cssText;
}


/***/ }),

/***/ "./public/node_modules/@polymer/polymer/polymer-element.js":
/*!*****************************************************************!*\
  !*** ./public/node_modules/@polymer/polymer/polymer-element.js ***!
  \*****************************************************************/
/*! exports provided: html, version, PolymerElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolymerElement", function() { return PolymerElement; });
/* harmony import */ var _lib_mixins_element_mixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/mixins/element-mixin.js */ "./public/node_modules/@polymer/polymer/lib/mixins/element-mixin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "version", function() { return _lib_mixins_element_mixin_js__WEBPACK_IMPORTED_MODULE_0__["version"]; });

/* harmony import */ var _lib_utils_html_tag_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils/html-tag.js */ "./public/node_modules/@polymer/polymer/lib/utils/html-tag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _lib_utils_html_tag_js__WEBPACK_IMPORTED_MODULE_1__["html"]; });

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/






/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
const PolymerElement = Object(_lib_mixins_element_mixin_js__WEBPACK_IMPORTED_MODULE_0__["ElementMixin"])(HTMLElement);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3ByaWNlLXRoZS12aW50YWdlLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2VsZW1lbnRzL3ByaWNlLXRoZS12aW50YWdlLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvZWxlbWVudHMvZG9tLW1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL0Bwb2x5bWVyL3BvbHltZXIvbGliL21peGlucy9lbGVtZW50LW1peGluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvbWl4aW5zL3Byb3BlcnRpZXMtY2hhbmdlZC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL0Bwb2x5bWVyL3BvbHltZXIvbGliL21peGlucy9wcm9wZXJ0aWVzLW1peGluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvbWl4aW5zL3Byb3BlcnR5LWFjY2Vzc29ycy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL0Bwb2x5bWVyL3BvbHltZXIvbGliL21peGlucy9wcm9wZXJ0eS1lZmZlY3RzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvbWl4aW5zL3RlbXBsYXRlLXN0YW1wLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvYXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL25vZGVfbW9kdWxlcy9AcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9ib290LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvY2FzZS1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL25vZGVfbW9kdWxlcy9AcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9odG1sLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL0Bwb2x5bWVyL3BvbHltZXIvbGliL3V0aWxzL21peGluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvbm9kZV9tb2R1bGVzL0Bwb2x5bWVyL3BvbHltZXIvbGliL3V0aWxzL3Jlc29sdmUtdXJsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9ub2RlX21vZHVsZXMvQHBvbHltZXIvcG9seW1lci9saWIvdXRpbHMvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL25vZGVfbW9kdWxlcy9AcG9seW1lci9wb2x5bWVyL2xpYi91dGlscy9zdHlsZS1nYXRoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL25vZGVfbW9kdWxlcy9AcG9seW1lci9wb2x5bWVyL3BvbHltZXItZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Es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QUFlO0FBQzNEO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoUkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0M7QUFDakI7O0FBRVA7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvZWxlbWVudHMvcHJpY2UtdGhlLXZpbnRhZ2UuanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXFxuPHN0eWxlPlxcbiAgOmhvc3Qge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB9XFxuXFxuICBwYXBlci10b29sYmFyIHtcXG4gICAgLS1wYXBlci10b29sYmFyLWJhY2tncm91bmQ6IHZhcigtLXByaW1hcnktY29sb3IpO1xcbiAgfVxcblxcbiAgcGFwZXItaGVhZGVyLXBhbmVsIHtcXG4gICAgLS1wYXBlci1oZWFkZXItcGFuZWwtc2hhZG93OiB7XFxuICAgICAgei1pbmRleDogNTAwO1xcbiAgICB9XFxuICB9XFxuXFxuICBpcm9uLXBhZ2VzIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICB9XFxuXFxuICAjdG9vbGJhciB7XFxuICAgIHotaW5kZXg6IDU1MDtcXG4gIH1cXG48L3N0eWxlPlxcblxcbjxwYXBlci1oZWFkZXItcGFuZWwgc3R5bGU9XFxcImhlaWdodDogMTAwJVxcXCI+XFxuICA8cGFwZXItdG9vbGJhciBpZD1cXFwidG9vbGJhclxcXCIgc2xvdD1cXFwiaGVhZGVyXFxcIj5cXG4gICAgPGFwcC1oZWFkZXIgY2xhc3M9XFxcImZsZXhcXFwiIHNsb3Q9XFxcInRvcFxcXCI+PC9hcHAtaGVhZGVyPlxcbiAgPC9wYXBlci10b29sYmFyPlxcblxcblxcbiAgPGlyb24tcGFnZXMgXFxuICAgIHNlbGVjdGVkPVxcXCJbW3NlbGVjdGVkU2VjdGlvbl1dXFxcIiBcXG4gICAgYXR0ci1mb3Itc2VsZWN0ZWQ9XFxcInNlY3Rpb25cXFwiIFxcbiAgICBzZWxlY3RlZC1hdHRyaWJ1dGU9XFxcImFjdGl2ZVxcXCI+XFxuXFxuICAgIDxhcHAtYWRtaW4taW50ZXJmYWNlIHNlY3Rpb249XFxcImFkbWluXFxcIj48L2FwcC1hZG1pbi1pbnRlcmZhY2U+XFxuICAgIDxhcHAtY2F0YWxvZ3MtbGlzdCBzZWN0aW9uPVxcXCJsaXN0XFxcIj48L2FwcC1jYXRhbG9ncy1saXN0PlxcbiAgICA8YXBwLXBhZ2UtbWFya3VwIHNlY3Rpb249XFxcInBhZ2VcXFwiPjwvYXBwLXBhZ2UtbWFya3VwPlxcbiAgICA8YXBwLXVzZXItZGFzaGJvYXJkIHNlY3Rpb249XFxcInVzZXJcXFwiPjwvYXBwLXVzZXItZGFzaGJvYXJkPlxcbiAgPC9pcm9uLXBhZ2VzPlxcblxcbjwvcGFwZXItaGVhZGVyLXBhbmVsPlxcblwiOyIsImltcG9ydCB7UG9seW1lckVsZW1lbnQsIGh0bWx9IGZyb20gXCJAcG9seW1lci9wb2x5bWVyXCJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tIFwiLi9wcmljZS10aGUtdmludGFnZS5odG1sXCJcblxuZXhwb3J0IGNsYXNzIFByaWNlVGhlVmludGFnZSBleHRlbmRzIE1peGluKFBvbHltZXJFbGVtZW50KVxuICAud2l0aChFdmVudEJ1c01peGluLCBBcHBTdGF0ZU1peGluLCBBdXRoTWl4aW4sIFVzZXJBY3Rpdml0eU1peGluLCBDYXRhbG9nc01peGluKSB7XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250cm9scyB0aGUgaXJvbiBsaXN0IHNlbGVjdGVkIHBhZ2VcbiAgICAgICAgICoqL1xuICAgICAgICBzZWxlY3RlZFNlY3Rpb24gOiB7XG4gICAgICAgICAgdHlwZSA6IFN0cmluZyxcbiAgICAgICAgICB2YWx1ZSA6ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGh0bWwoW3RlbXBsYXRlXSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iaW5kID0ge1xuICAgICAgJ3VpLXNldC1sb2NhdGlvbicgOiAnX3NldFdpbmRvd1VybCdcbiAgICB9O1xuICB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHN1cGVyLnJlYWR5KCk7XG4gIH1cblxuICBfb25BdXRoVXBkYXRlKGUpIHtcbiAgICB0aGlzLmF1dGhTdGF0ZSA9IGU7XG5cbiAgICBpZiggdGhpcy5yb3V0ZSAmJiBlLnN0YXRlID09PSAnbG9nZ2VkSW4nICYmIHRoaXMucm91dGUuY2F0YWxvZ0lkICYmIHRoaXMucm91dGUucGFnZUlkICkge1xuICAgICAgdGhpcy5fc2V0VXNlckFjdGl2aXR5KHRoaXMucm91dGUuY2F0YWxvZ0lkLCB0aGlzLnJvdXRlLnBhZ2VJZCk7XG4gICAgfVxuICB9XG5cbiAgX3NldFdpbmRvd1VybChoYXNoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xuICB9IFxuXG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ByaWNlLXRoZS12aW50YWdlJywgUHJpY2VUaGVWaW50YWdlKTsiLCIvKipcbkBsaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuaW1wb3J0ICcuLi91dGlscy9ib290LmpzJztcblxuaW1wb3J0IHsgcmVzb2x2ZVVybCwgcGF0aEZyb21VcmwgfSBmcm9tICcuLi91dGlscy9yZXNvbHZlLXVybC5qcyc7XG5pbXBvcnQgeyBzdHJpY3RUZW1wbGF0ZVBvbGljeSB9IGZyb20gJy4uL3V0aWxzL3NldHRpbmdzLmpzJztcblxubGV0IG1vZHVsZXMgPSB7fTtcbmxldCBsY01vZHVsZXMgPSB7fTtcbi8qKlxuICogU2V0cyBhIGRvbS1tb2R1bGUgaW50byB0aGUgZ2xvYmFsIHJlZ2lzdHJ5IGJ5IGlkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBkb20tbW9kdWxlIGlkXG4gKiBAcGFyYW0ge0RvbU1vZHVsZX0gbW9kdWxlIGRvbS1tb2R1bGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHNldE1vZHVsZShpZCwgbW9kdWxlKSB7XG4gIC8vIHN0b3JlIGlkIHNlcGFyYXRlIGZyb20gbG93ZXJjYXNlZCBpZCBzbyB0aGF0XG4gIC8vIGluIGFsbCBjYXNlcyBtaXhlZENhc2UgaWQgd2lsbCBzdG9yZWQgZGlzdGluY3RseVxuICAvLyBhbmQgbG93ZXJjYXNlIHZlcnNpb24gaXMgYSBmYWxsYmFja1xuICBtb2R1bGVzW2lkXSA9IGxjTW9kdWxlc1tpZC50b0xvd2VyQ2FzZSgpXSA9IG1vZHVsZTtcbn1cbi8qKlxuICogUmV0cmlldmVzIGEgZG9tLW1vZHVsZSBmcm9tIHRoZSBnbG9iYWwgcmVnaXN0cnkgYnkgaWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIGRvbS1tb2R1bGUgaWRcbiAqIEByZXR1cm4ge0RvbU1vZHVsZSF9IGRvbS1tb2R1bGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gZmluZE1vZHVsZShpZCkge1xuICByZXR1cm4gbW9kdWxlc1tpZF0gfHwgbGNNb2R1bGVzW2lkLnRvTG93ZXJDYXNlKCldO1xufVxuXG5mdW5jdGlvbiBzdHlsZU91dHNpZGVUZW1wbGF0ZUNoZWNrKGluc3QpIHtcbiAgaWYgKGluc3QucXVlcnlTZWxlY3Rvcignc3R5bGUnKSkge1xuICAgIGNvbnNvbGUud2FybignZG9tLW1vZHVsZSAlcyBoYXMgc3R5bGUgb3V0c2lkZSB0ZW1wbGF0ZScsIGluc3QuaWQpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGBkb20tbW9kdWxlYCBlbGVtZW50IHJlZ2lzdGVycyB0aGUgZG9tIGl0IGNvbnRhaW5zIHRvIHRoZSBuYW1lIGdpdmVuXG4gKiBieSB0aGUgbW9kdWxlJ3MgaWQgYXR0cmlidXRlLiBJdCBwcm92aWRlcyBhIHVuaWZpZWQgZGF0YWJhc2Ugb2YgZG9tXG4gKiBhY2Nlc3NpYmxlIHZpYSBpdHMgc3RhdGljIGBpbXBvcnRgIEFQSS5cbiAqXG4gKiBBIGtleSB1c2UgY2FzZSBvZiBgZG9tLW1vZHVsZWAgaXMgZm9yIHByb3ZpZGluZyBjdXN0b20gZWxlbWVudCBgPHRlbXBsYXRlPmBzXG4gKiB2aWEgSFRNTCBpbXBvcnRzIHRoYXQgYXJlIHBhcnNlZCBieSB0aGUgbmF0aXZlIEhUTUwgcGFyc2VyLCB0aGF0IGNhbiBiZVxuICogcmVsb2NhdGVkIGR1cmluZyBhIGJ1bmRsaW5nIHBhc3MgYW5kIHN0aWxsIGxvb2tlZCB1cCBieSBgaWRgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDxkb20tbW9kdWxlIGlkPVwiZm9vXCI+XG4gKiAgICAgICA8aW1nIHNyYz1cInN0dWZmLnBuZ1wiPlxuICogICAgIDwvZG9tLW1vZHVsZT5cbiAqXG4gKiBUaGVuIGluIGNvZGUgaW4gc29tZSBvdGhlciBsb2NhdGlvbiB0aGF0IGNhbm5vdCBhY2Nlc3MgdGhlIGRvbS1tb2R1bGUgYWJvdmVcbiAqXG4gKiAgICAgbGV0IGltZyA9IGN1c3RvbUVsZW1lbnRzLmdldCgnZG9tLW1vZHVsZScpLmltcG9ydCgnZm9vJywgJ2ltZycpO1xuICpcbiAqIEBjdXN0b21FbGVtZW50XG4gKiBAZXh0ZW5kcyBIVE1MRWxlbWVudFxuICogQHN1bW1hcnkgQ3VzdG9tIGVsZW1lbnQgdGhhdCBwcm92aWRlcyBhIHJlZ2lzdHJ5IG9mIHJlbG9jYXRhYmxlIERPTSBjb250ZW50XG4gKiAgIGJ5IGBpZGAgdGhhdCBpcyBhZ25vc3RpYyB0byBidW5kbGluZy5cbiAqIEB1bnJlc3RyaWN0ZWRcbiAqL1xuZXhwb3J0IGNsYXNzIERvbU1vZHVsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHsgcmV0dXJuIFsnaWQnXTsgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IHRoZSBjc3MgYHNlbGVjdG9yYCBpbiB0aGUgbW9kdWxlXG4gICAqIHJlZ2lzdGVyZWQgYnkgYGlkYC4gRm9yIGV4YW1wbGUsIHRoaXMuaW1wb3J0KCdmb28nLCAnaW1nJyk7XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGRvbS1tb2R1bGUgaW4gd2hpY2ggdG8gc2VhcmNoLlxuICAgKiBAcGFyYW0ge3N0cmluZz19IHNlbGVjdG9yIFRoZSBjc3Mgc2VsZWN0b3IgYnkgd2hpY2ggdG8gZmluZCB0aGUgZWxlbWVudC5cbiAgICogQHJldHVybiB7RWxlbWVudH0gUmV0dXJucyB0aGUgZWxlbWVudCB3aGljaCBtYXRjaGVzIGBzZWxlY3RvcmAgaW4gdGhlXG4gICAqIG1vZHVsZSByZWdpc3RlcmVkIGF0IHRoZSBzcGVjaWZpZWQgYGlkYC5cbiAgICpcbiAgICogQGV4cG9ydFxuICAgKiBAbm9jb2xsYXBzZSBSZWZlcnJlZCB0byBpbmRpcmVjdGx5IGluIHN0eWxlLWdhdGhlci5qc1xuICAgKi9cbiAgc3RhdGljIGltcG9ydChpZCwgc2VsZWN0b3IpIHtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGxldCBtID0gZmluZE1vZHVsZShpZCk7XG4gICAgICBpZiAobSAmJiBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gbS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIGF0dHJpYnV0ZS5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBvbGQgT2xkIHZhbHVlIG9mIGF0dHJpYnV0ZS5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSB2YWx1ZSBDdXJyZW50IHZhbHVlIG9mIGF0dHJpYnV0ZS5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBuYW1lc3BhY2UgQXR0cmlidXRlIG5hbWVzcGFjZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkLCB2YWx1ZSwgbmFtZXNwYWNlKSB7XG4gICAgaWYgKG9sZCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICB9XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtYXJncyAqL1xuXG4gIC8qKlxuICAgKiBUaGUgYWJzb2x1dGUgVVJMIG9mIHRoZSBvcmlnaW5hbCBsb2NhdGlvbiBvZiB0aGlzIGBkb20tbW9kdWxlYC5cbiAgICpcbiAgICogVGhpcyB2YWx1ZSB3aWxsIGRpZmZlciBmcm9tIHRoaXMgZWxlbWVudCdzIGBvd25lckRvY3VtZW50YCBpbiB0aGVcbiAgICogZm9sbG93aW5nIHdheXM6XG4gICAqIC0gVGFrZXMgaW50byBhY2NvdW50IGFueSBgYXNzZXRwYXRoYCBhdHRyaWJ1dGUgYWRkZWQgZHVyaW5nIGJ1bmRsaW5nXG4gICAqICAgdG8gaW5kaWNhdGUgdGhlIG9yaWdpbmFsIGxvY2F0aW9uIHJlbGF0aXZlIHRvIHRoZSBidW5kbGVkIGxvY2F0aW9uXG4gICAqIC0gVXNlcyB0aGUgSFRNTEltcG9ydHMgcG9seWZpbGwncyBgaW1wb3J0Rm9yRWxlbWVudGAgQVBJIHRvIGVuc3VyZVxuICAgKiAgIHRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvIHRoZSBpbXBvcnQgZG9jdW1lbnQncyBsb2NhdGlvbiBzaW5jZVxuICAgKiAgIGBvd25lckRvY3VtZW50YCBpcyBub3QgY3VycmVudGx5IHBvbHlmaWxsZWRcbiAgICovXG4gIGdldCBhc3NldHBhdGgoKSB7XG4gICAgLy8gRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYXNzZXRwYXRoLlxuICAgIGlmICghdGhpcy5fX2Fzc2V0cGF0aCkge1xuICAgICAgLy8gbm90ZTogYXNzZXRwYXRoIHNldCB2aWEgYW4gYXR0cmlidXRlIG11c3QgYmUgcmVsYXRpdmUgdG8gdGhpc1xuICAgICAgLy8gZWxlbWVudCdzIGxvY2F0aW9uOyBhY2NvbW9kYXRlIHBvbHlmaWxsZWQgSFRNTEltcG9ydHNcbiAgICAgIGNvbnN0IG93bmVyID0gd2luZG93LkhUTUxJbXBvcnRzICYmIEhUTUxJbXBvcnRzLmltcG9ydEZvckVsZW1lbnQgP1xuICAgICAgICBIVE1MSW1wb3J0cy5pbXBvcnRGb3JFbGVtZW50KHRoaXMpIHx8IGRvY3VtZW50IDogdGhpcy5vd25lckRvY3VtZW50O1xuICAgICAgY29uc3QgdXJsID0gcmVzb2x2ZVVybChcbiAgICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUoJ2Fzc2V0cGF0aCcpIHx8ICcnLCBvd25lci5iYXNlVVJJKTtcbiAgICAgIHRoaXMuX19hc3NldHBhdGggPSBwYXRoRnJvbVVybCh1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fX2Fzc2V0cGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIGRvbS1tb2R1bGUgYXQgYSBnaXZlbiBpZC4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkXG4gICAqIHdoZW4gYSBkb20tbW9kdWxlIGlzIGltcGVyYXRpdmVseSBjcmVhdGVkLiBGb3JcbiAgICogZXhhbXBsZSwgYGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RvbS1tb2R1bGUnKS5yZWdpc3RlcignZm9vJylgLlxuICAgKiBAcGFyYW0ge3N0cmluZz19IGlkIFRoZSBpZCBhdCB3aGljaCB0byByZWdpc3RlciB0aGUgZG9tLW1vZHVsZS5cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIHJlZ2lzdGVyKGlkKSB7XG4gICAgaWQgPSBpZCB8fCB0aGlzLmlkO1xuICAgIGlmIChpZCkge1xuICAgICAgLy8gVW5kZXIgc3RyaWN0VGVtcGxhdGVQb2xpY3ksIHJlamVjdCBhbmQgbnVsbCBvdXQgYW55IHJlLXJlZ2lzdGVyZWRcbiAgICAgIC8vIGRvbS1tb2R1bGUgc2luY2UgaXQgaXMgYW1iaWd1b3VzIHdoZXRoZXIgZmlyc3QtaW4gb3IgbGFzdC1pbiBpcyB0cnVzdGVkXG4gICAgICBpZiAoc3RyaWN0VGVtcGxhdGVQb2xpY3kgJiYgZmluZE1vZHVsZShpZCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZXRNb2R1bGUoaWQsIG51bGwpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHN0cmljdFRlbXBsYXRlUG9saWN5OiBkb20tbW9kdWxlICR7aWR9IHJlLXJlZ2lzdGVyZWRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHNldE1vZHVsZShpZCwgdGhpcyk7XG4gICAgICBzdHlsZU91dHNpZGVUZW1wbGF0ZUNoZWNrKHRoaXMpO1xuICAgIH1cbiAgfVxufVxuXG5Eb21Nb2R1bGUucHJvdG90eXBlWydtb2R1bGVzJ10gPSBtb2R1bGVzO1xuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2RvbS1tb2R1bGUnLCBEb21Nb2R1bGUpO1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi4vdXRpbHMvYm9vdC5qcyc7XG5cbmltcG9ydCB7IHJvb3RQYXRoLCBzdHJpY3RUZW1wbGF0ZVBvbGljeSwgYWxsb3dUZW1wbGF0ZUZyb21Eb21Nb2R1bGUgfSBmcm9tICcuLi91dGlscy9zZXR0aW5ncy5qcyc7XG5pbXBvcnQgeyBkZWR1cGluZ01peGluIH0gZnJvbSAnLi4vdXRpbHMvbWl4aW4uanMnO1xuaW1wb3J0IHsgc3R5bGVzRnJvbVRlbXBsYXRlLCBzdHlsZXNGcm9tTW9kdWxlSW1wb3J0cyB9IGZyb20gJy4uL3V0aWxzL3N0eWxlLWdhdGhlci5qcyc7XG5pbXBvcnQgeyBwYXRoRnJvbVVybCwgcmVzb2x2ZUNzcywgcmVzb2x2ZVVybCB9IGZyb20gJy4uL3V0aWxzL3Jlc29sdmUtdXJsLmpzJztcbmltcG9ydCB7IERvbU1vZHVsZSB9IGZyb20gJy4uL2VsZW1lbnRzL2RvbS1tb2R1bGUuanMnO1xuaW1wb3J0IHsgUHJvcGVydHlFZmZlY3RzIH0gZnJvbSAnLi9wcm9wZXJ0eS1lZmZlY3RzLmpzJztcbmltcG9ydCB7IFByb3BlcnRpZXNNaXhpbiB9IGZyb20gJy4vcHJvcGVydGllcy1taXhpbi5qcyc7XG5cbi8qKlxuICogQ3VycmVudCBQb2x5bWVyIHZlcnNpb24gaW4gU2VtdmVyIG5vdGF0aW9uLlxuICogQHR5cGUge3N0cmluZ30gU2VtdmVyIG5vdGF0aW9uIG9mIHRoZSBjdXJyZW50IHZlcnNpb24gb2YgUG9seW1lci5cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMy4wLjUnO1xuXG4vKipcbiAqIEVsZW1lbnQgY2xhc3MgbWl4aW4gdGhhdCBwcm92aWRlcyB0aGUgY29yZSBBUEkgZm9yIFBvbHltZXIncyBtZXRhLXByb2dyYW1taW5nXG4gKiBmZWF0dXJlcyBpbmNsdWRpbmcgdGVtcGxhdGUgc3RhbXBpbmcsIGRhdGEtYmluZGluZywgYXR0cmlidXRlIGRlc2VyaWFsaXphdGlvbixcbiAqIGFuZCBwcm9wZXJ0eSBjaGFuZ2Ugb2JzZXJ2YXRpb24uXG4gKlxuICogU3ViY2xhc3NlcnMgbWF5IHByb3ZpZGUgdGhlIGZvbGxvd2luZyBzdGF0aWMgZ2V0dGVycyB0byByZXR1cm4gbWV0YWRhdGFcbiAqIHVzZWQgdG8gY29uZmlndXJlIFBvbHltZXIncyBmZWF0dXJlcyBmb3IgdGhlIGNsYXNzOlxuICpcbiAqIC0gYHN0YXRpYyBnZXQgaXMoKWA6IFdoZW4gdGhlIHRlbXBsYXRlIGlzIHByb3ZpZGVkIHZpYSBhIGBkb20tbW9kdWxlYCxcbiAqICAgdXNlcnMgc2hvdWxkIHJldHVybiB0aGUgYGRvbS1tb2R1bGVgIGlkIGZyb20gYSBzdGF0aWMgYGlzYCBnZXR0ZXIuICBJZlxuICogICBubyB0ZW1wbGF0ZSBpcyBuZWVkZWQgb3IgdGhlIHRlbXBsYXRlIGlzIHByb3ZpZGVkIGRpcmVjdGx5IHZpYSB0aGVcbiAqICAgYHRlbXBsYXRlYCBnZXR0ZXIsIHRoZXJlIGlzIG5vIG5lZWQgdG8gZGVmaW5lIGBpc2AgZm9yIHRoZSBlbGVtZW50LlxuICpcbiAqIC0gYHN0YXRpYyBnZXQgdGVtcGxhdGUoKWA6IFVzZXJzIG1heSBwcm92aWRlIHRoZSB0ZW1wbGF0ZSBkaXJlY3RseSAoYXNcbiAqICAgb3Bwb3NlZCB0byB2aWEgYGRvbS1tb2R1bGVgKSBieSBpbXBsZW1lbnRpbmcgYSBzdGF0aWMgYHRlbXBsYXRlYCBnZXR0ZXIuXG4gKiAgIFRoZSBnZXR0ZXIgbXVzdCByZXR1cm4gYW4gYEhUTUxUZW1wbGF0ZUVsZW1lbnRgLlxuICpcbiAqIC0gYHN0YXRpYyBnZXQgcHJvcGVydGllcygpYDogU2hvdWxkIHJldHVybiBhbiBvYmplY3QgZGVzY3JpYmluZ1xuICogICBwcm9wZXJ0eS1yZWxhdGVkIG1ldGFkYXRhIHVzZWQgYnkgUG9seW1lciBmZWF0dXJlcyAoa2V5OiBwcm9wZXJ0eSBuYW1lXG4gKiAgIHZhbHVlOiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0eSBtZXRhZGF0YSkuIFZhbGlkIGtleXMgaW4gcGVyLXByb3BlcnR5XG4gKiAgIG1ldGFkYXRhIGluY2x1ZGU6XG4gKiAgIC0gYHR5cGVgIChTdHJpbmd8TnVtYmVyfE9iamVjdHxBcnJheXwuLi4pOiBVc2VkIGJ5XG4gKiAgICAgYGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja2AgdG8gZGV0ZXJtaW5lIGhvdyBzdHJpbmctYmFzZWQgYXR0cmlidXRlc1xuICogICAgIGFyZSBkZXNlcmlhbGl6ZWQgdG8gSmF2YVNjcmlwdCBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiAgIC0gYG5vdGlmeWAgKGJvb2xlYW4pOiBDYXVzZXMgYSBjaGFuZ2UgaW4gdGhlIHByb3BlcnR5IHRvIGZpcmUgYVxuICogICAgIG5vbi1idWJibGluZyBldmVudCBjYWxsZWQgYDxwcm9wZXJ0eT4tY2hhbmdlZGAuIEVsZW1lbnRzIHRoYXQgaGF2ZVxuICogICAgIGVuYWJsZWQgdHdvLXdheSBiaW5kaW5nIHRvIHRoZSBwcm9wZXJ0eSB1c2UgdGhpcyBldmVudCB0byBvYnNlcnZlIGNoYW5nZXMuXG4gKiAgIC0gYHJlYWRPbmx5YCAoYm9vbGVhbik6IENyZWF0ZXMgYSBnZXR0ZXIgZm9yIHRoZSBwcm9wZXJ0eSwgYnV0IG5vIHNldHRlci5cbiAqICAgICBUbyBzZXQgYSByZWFkLW9ubHkgcHJvcGVydHksIHVzZSB0aGUgcHJpdmF0ZSBzZXR0ZXIgbWV0aG9kXG4gKiAgICAgYF9zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpYC5cbiAqICAgLSBgb2JzZXJ2ZXJgIChzdHJpbmcpOiBPYnNlcnZlciBtZXRob2QgbmFtZSB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW5cbiAqICAgICB0aGUgcHJvcGVydHkgY2hhbmdlcy4gVGhlIGFyZ3VtZW50cyBvZiB0aGUgbWV0aG9kIGFyZVxuICogICAgIGAodmFsdWUsIHByZXZpb3VzVmFsdWUpYC5cbiAqICAgLSBgY29tcHV0ZWRgIChzdHJpbmcpOiBTdHJpbmcgZGVzY3JpYmluZyBtZXRob2QgYW5kIGRlcGVuZGVudCBwcm9wZXJ0aWVzXG4gKiAgICAgZm9yIGNvbXB1dGluZyB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSAoZS5nLiBgJ2NvbXB1dGVGb28oYmFyLCB6b3QpJ2ApLlxuICogICAgIENvbXB1dGVkIHByb3BlcnRpZXMgYXJlIHJlYWQtb25seSBieSBkZWZhdWx0IGFuZCBjYW4gb25seSBiZSBjaGFuZ2VkXG4gKiAgICAgdmlhIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGNvbXB1dGluZyBtZXRob2QuXG4gKlxuICogLSBgc3RhdGljIGdldCBvYnNlcnZlcnMoKWA6IEFycmF5IG9mIHN0cmluZ3MgZGVzY3JpYmluZyBtdWx0aS1wcm9wZXJ0eVxuICogICBvYnNlcnZlciBtZXRob2RzIGFuZCB0aGVpciBkZXBlbmRlbnQgcHJvcGVydGllcyAoZS5nLlxuICogICBgJ29ic2VydmVBQkMoYSwgYiwgYyknYCkuXG4gKlxuICogVGhlIGJhc2UgY2xhc3MgcHJvdmlkZXMgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbnMgZm9yIHRoZSBmb2xsb3dpbmcgc3RhbmRhcmRcbiAqIGN1c3RvbSBlbGVtZW50IGxpZmVjeWNsZSBjYWxsYmFja3M7IHVzZXJzIG1heSBvdmVycmlkZSB0aGVzZSwgYnV0IHNob3VsZFxuICogY2FsbCB0aGUgc3VwZXIgbWV0aG9kIHRvIGVuc3VyZVxuICogLSBgY29uc3RydWN0b3JgOiBSdW4gd2hlbiB0aGUgZWxlbWVudCBpcyBjcmVhdGVkIG9yIHVwZ3JhZGVkXG4gKiAtIGBjb25uZWN0ZWRDYWxsYmFja2A6IFJ1biBlYWNoIHRpbWUgdGhlIGVsZW1lbnQgaXMgY29ubmVjdGVkIHRvIHRoZVxuICogICBkb2N1bWVudFxuICogLSBgZGlzY29ubmVjdGVkQ2FsbGJhY2tgOiBSdW4gZWFjaCB0aW1lIHRoZSBlbGVtZW50IGlzIGRpc2Nvbm5lY3RlZCBmcm9tXG4gKiAgIHRoZSBkb2N1bWVudFxuICogLSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYDogUnVuIGVhY2ggdGltZSBhbiBhdHRyaWJ1dGUgaW5cbiAqICAgYG9ic2VydmVkQXR0cmlidXRlc2AgaXMgc2V0IG9yIHJlbW92ZWQgKG5vdGU6IHRoaXMgZWxlbWVudCdzIGRlZmF1bHRcbiAqICAgYG9ic2VydmVkQXR0cmlidXRlc2AgaW1wbGVtZW50YXRpb24gd2lsbCBhdXRvbWF0aWNhbGx5IHJldHVybiBhbiBhcnJheVxuICogICBvZiBkYXNoLWNhc2VkIGF0dHJpYnV0ZXMgYmFzZWQgb24gYHByb3BlcnRpZXNgKVxuICpcbiAqIEBtaXhpbkZ1bmN0aW9uXG4gKiBAcG9seW1lclxuICogQGFwcGxpZXNNaXhpbiBQcm9wZXJ0eUVmZmVjdHNcbiAqIEBhcHBsaWVzTWl4aW4gUHJvcGVydGllc01peGluXG4gKiBAcHJvcGVydHkgcm9vdFBhdGgge3N0cmluZ30gU2V0IHRvIHRoZSB2YWx1ZSBvZiBgcm9vdFBhdGhgLFxuICogICB3aGljaCBkZWZhdWx0cyB0byB0aGUgbWFpbiBkb2N1bWVudCBwYXRoXG4gKiBAcHJvcGVydHkgaW1wb3J0UGF0aCB7c3RyaW5nfSBTZXQgdG8gdGhlIHZhbHVlIG9mIHRoZSBjbGFzcydzIHN0YXRpY1xuICogICBgaW1wb3J0UGF0aGAgcHJvcGVydHksIHdoaWNoIGRlZmF1bHRzIHRvIHRoZSBwYXRoIG9mIHRoaXMgZWxlbWVudCdzXG4gKiAgIGBkb20tbW9kdWxlYCAod2hlbiBgaXNgIGlzIHVzZWQpLCBidXQgY2FuIGJlIG92ZXJyaWRkZW4gZm9yIG90aGVyXG4gKiAgIGltcG9ydCBzdHJhdGVnaWVzLlxuICogQHN1bW1hcnkgRWxlbWVudCBjbGFzcyBtaXhpbiB0aGF0IHByb3ZpZGVzIHRoZSBjb3JlIEFQSSBmb3IgUG9seW1lcidzXG4gKiBtZXRhLXByb2dyYW1taW5nIGZlYXR1cmVzLlxuICovXG5leHBvcnQgY29uc3QgRWxlbWVudE1peGluID0gZGVkdXBpbmdNaXhpbihiYXNlID0+IHtcblxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBleHRlbmRzIHtiYXNlfVxuICAgKiBAaW1wbGVtZW50cyB7UG9seW1lcl9Qcm9wZXJ0eUVmZmVjdHN9XG4gICAqIEBpbXBsZW1lbnRzIHtQb2x5bWVyX1Byb3BlcnRpZXNNaXhpbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnN0IHBvbHltZXJFbGVtZW50QmFzZSA9IFByb3BlcnRpZXNNaXhpbihQcm9wZXJ0eUVmZmVjdHMoYmFzZSkpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIHdpdGggZGVmYXVsdCB2YWx1ZXMuXG4gICAqIFRoaXMgbGlzdCBpcyBjcmVhdGVkIGFzIGFuIG9wdGltaXphdGlvbiBzaW5jZSBpdCBpcyBhIHN1YnNldCBvZlxuICAgKiB0aGUgbGlzdCByZXR1cm5lZCBmcm9tIGBfcHJvcGVydGllc2AuXG4gICAqIFRoaXMgbGlzdCBpcyB1c2VkIGluIGBfaW5pdGlhbGl6ZVByb3BlcnRpZXNgIHRvIHNldCBwcm9wZXJ0eSBkZWZhdWx0cy5cbiAgICpcbiAgICogQHBhcmFtIHtQb2x5bWVyRWxlbWVudENvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvciBFbGVtZW50IGNsYXNzXG4gICAqIEByZXR1cm4ge1BvbHltZXJFbGVtZW50UHJvcGVydGllc30gRmxhdHRlbmVkIHByb3BlcnRpZXMgZm9yIHRoaXMgY2xhc3NcbiAgICogICB0aGF0IGhhdmUgZGVmYXVsdCB2YWx1ZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHByb3BlcnR5RGVmYXVsdHMoY29uc3RydWN0b3IpIHtcbiAgICBpZiAoIWNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KFxuICAgICAgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnX19wcm9wZXJ0eURlZmF1bHRzJywgY29uc3RydWN0b3IpKSkge1xuICAgICAgY29uc3RydWN0b3IuX19wcm9wZXJ0eURlZmF1bHRzID0gbnVsbDtcbiAgICAgIGxldCBwcm9wcyA9IGNvbnN0cnVjdG9yLl9wcm9wZXJ0aWVzO1xuICAgICAgZm9yIChsZXQgcCBpbiBwcm9wcykge1xuICAgICAgICBsZXQgaW5mbyA9IHByb3BzW3BdO1xuICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBpbmZvKSB7XG4gICAgICAgICAgY29uc3RydWN0b3IuX19wcm9wZXJ0eURlZmF1bHRzID0gY29uc3RydWN0b3IuX19wcm9wZXJ0eURlZmF1bHRzIHx8IHt9O1xuICAgICAgICAgIGNvbnN0cnVjdG9yLl9fcHJvcGVydHlEZWZhdWx0c1twXSA9IGluZm87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLl9fcHJvcGVydHlEZWZhdWx0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZiB0aGUgYG9ic2VydmVyc2AgYXJyYXkuXG4gICAqIEBwYXJhbSB7UG9seW1lckVsZW1lbnRDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3IgRWxlbWVudCBjbGFzc1xuICAgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgY29udGFpbmluZyBvd24gb2JzZXJ2ZXJzIGZvciB0aGUgZ2l2ZW4gY2xhc3NcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgZnVuY3Rpb24gb3duT2JzZXJ2ZXJzKGNvbnN0cnVjdG9yKSB7XG4gICAgaWYgKCFjb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eShcbiAgICAgIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ19fb3duT2JzZXJ2ZXJzJywgY29uc3RydWN0b3IpKSkge1xuICAgICAgICBjb25zdHJ1Y3Rvci5fX293bk9ic2VydmVycyA9XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ29ic2VydmVycycsIGNvbnN0cnVjdG9yKSkgP1xuICAgICAgICAvKiogQHR5cGUge1BvbHltZXJFbGVtZW50Q29uc3RydWN0b3J9ICovIChjb25zdHJ1Y3Rvcikub2JzZXJ2ZXJzIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLl9fb3duT2JzZXJ2ZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgZWZmZWN0cyBmb3IgYSBwcm9wZXJ0eS5cbiAgICpcbiAgICogTm90ZSwgb25jZSBhIHByb3BlcnR5IGhhcyBiZWVuIHNldCB0b1xuICAgKiBgcmVhZE9ubHlgLCBgY29tcHV0ZWRgLCBgcmVmbGVjdFRvQXR0cmlidXRlYCwgb3IgYG5vdGlmeWBcbiAgICogdGhlc2UgdmFsdWVzIG1heSBub3QgYmUgY2hhbmdlZC4gRm9yIGV4YW1wbGUsIGEgc3ViY2xhc3MgY2Fubm90XG4gICAqIGFsdGVyIHRoZXNlIHNldHRpbmdzLiBIb3dldmVyLCBhZGRpdGlvbmFsIGBvYnNlcnZlcnNgIG1heSBiZSBhZGRlZFxuICAgKiBieSBzdWJjbGFzc2VzLlxuICAgKlxuICAgKiBUaGUgaW5mbyBvYmplY3Qgc2hvdWxkIGNvbnRhaW4gcHJvcGVydHkgbWV0YWRhdGEgYXMgZm9sbG93czpcbiAgICpcbiAgICogKiBgdHlwZWA6IHtmdW5jdGlvbn0gdHlwZSB0byB3aGljaCBhbiBhdHRyaWJ1dGUgbWF0Y2hpbmcgdGhlIHByb3BlcnR5XG4gICAqIGlzIGRlc2VyaWFsaXplZC4gTm90ZSB0aGUgcHJvcGVydHkgaXMgY2FtZWwtY2FzZWQgZnJvbSBhIGRhc2gtY2FzZWRcbiAgICogYXR0cmlidXRlLiBGb3IgZXhhbXBsZSwgJ2Zvby1iYXInIGF0dHJpYnV0ZSBpcyBkZXNlcmlhbGl6ZWQgdG8gYVxuICAgKiBwcm9wZXJ0eSBuYW1lZCAnZm9vQmFyJy5cbiAgICpcbiAgICogKiBgcmVhZE9ubHlgOiB7Ym9vbGVhbn0gY3JlYXRlcyBhIHJlYWRPbmx5IHByb3BlcnR5IGFuZFxuICAgKiBtYWtlcyBhIHByaXZhdGUgc2V0dGVyIGZvciB0aGUgcHJpdmF0ZSBvZiB0aGUgZm9ybSAnX3NldEZvbycgZm9yIGFcbiAgICogcHJvcGVydHkgJ2ZvbycsXG4gICAqXG4gICAqICogYGNvbXB1dGVkYDoge3N0cmluZ30gY3JlYXRlcyBhIGNvbXB1dGVkIHByb3BlcnR5LiBBIGNvbXB1dGVkIHByb3BlcnR5XG4gICAqIGlzIGFsc28gYXV0b21hdGljYWxseSBzZXQgdG8gYHJlYWRPbmx5OiB0cnVlYC4gVGhlIHZhbHVlIGlzIGNhbGN1bGF0ZWRcbiAgICogYnkgcnVubmluZyBhIG1ldGhvZCBhbmQgYXJndW1lbnRzIHBhcnNlZCBmcm9tIHRoZSBnaXZlbiBzdHJpbmcuIEZvclxuICAgKiBleGFtcGxlICdjb21wdXRlKGZvbyknIHdpbGwgY29tcHV0ZSBhIGdpdmVuIHByb3BlcnR5IHdoZW4gdGhlXG4gICAqICdmb28nIHByb3BlcnR5IGNoYW5nZXMgYnkgZXhlY3V0aW5nIHRoZSAnY29tcHV0ZScgbWV0aG9kLiBUaGlzIG1ldGhvZFxuICAgKiBtdXN0IHJldHVybiB0aGUgY29tcHV0ZWQgdmFsdWUuXG4gICAqXG4gICAqICogYHJlZmxlY3RUb0F0dHJpYnV0ZWA6IHtib29sZWFufSBJZiB0cnVlLCB0aGUgcHJvcGVydHkgdmFsdWUgaXMgcmVmbGVjdGVkXG4gICAqIHRvIGFuIGF0dHJpYnV0ZSBvZiB0aGUgc2FtZSBuYW1lLiBOb3RlLCB0aGUgYXR0cmlidXRlIGlzIGRhc2gtY2FzZWRcbiAgICogc28gYSBwcm9wZXJ0eSBuYW1lZCAnZm9vQmFyJyBpcyByZWZsZWN0ZWQgYXMgJ2Zvby1iYXInLlxuICAgKlxuICAgKiAqIGBub3RpZnlgOiB7Ym9vbGVhbn0gc2VuZHMgYSBub24tYnViYmxpbmcgbm90aWZpY2F0aW9uIGV2ZW50IHdoZW5cbiAgICogdGhlIHByb3BlcnR5IGNoYW5nZXMuIEZvciBleGFtcGxlLCBhIHByb3BlcnR5IG5hbWVkICdmb28nIHNlbmRzIGFuXG4gICAqIGV2ZW50IG5hbWVkICdmb28tY2hhbmdlZCcgd2l0aCBgZXZlbnQuZGV0YWlsYCBzZXQgdG8gdGhlIHZhbHVlIG9mXG4gICAqIHRoZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogKiBvYnNlcnZlcjoge3N0cmluZ30gbmFtZSBvZiBhIG1ldGhvZCB0aGF0IHJ1bnMgd2hlbiB0aGUgcHJvcGVydHlcbiAgICogY2hhbmdlcy4gVGhlIGFyZ3VtZW50cyBvZiB0aGUgbWV0aG9kIGFyZSAodmFsdWUsIHByZXZpb3VzVmFsdWUpLlxuICAgKlxuICAgKiBOb3RlOiBVc2VycyBtYXkgd2FudCBjb250cm9sIG92ZXIgbW9kaWZ5aW5nIHByb3BlcnR5XG4gICAqIGVmZmVjdHMgdmlhIHN1YmNsYXNzaW5nLiBGb3IgZXhhbXBsZSwgYSB1c2VyIG1pZ2h0IHdhbnQgdG8gbWFrZSBhXG4gICAqIHJlZmxlY3RUb0F0dHJpYnV0ZSBwcm9wZXJ0eSBub3QgZG8gc28gaW4gYSBzdWJjbGFzcy4gV2UndmUgY2hvc2VuIHRvXG4gICAqIGRpc2FibGUgdGhpcyBiZWNhdXNlIGl0IGxlYWRzIHRvIGFkZGl0aW9uYWwgY29tcGxpY2F0aW9uLlxuICAgKiBGb3IgZXhhbXBsZSwgYSByZWFkT25seSBlZmZlY3QgZ2VuZXJhdGVzIGEgc3BlY2lhbCBzZXR0ZXIuIElmIGEgc3ViY2xhc3NcbiAgICogZGlzYWJsZXMgdGhlIGVmZmVjdCwgdGhlIHNldHRlciB3b3VsZCBmYWlsIHVuZXhwZWN0ZWRseS5cbiAgICogQmFzZWQgb24gZmVlZGJhY2ssIHdlIG1heSB3YW50IHRvIHRyeSB0byBtYWtlIGVmZmVjdHMgbW9yZSBtYWxsZWFibGVcbiAgICogYW5kL29yIHByb3ZpZGUgYW4gYWR2YW5jZWQgYXBpIGZvciBtYW5pcHVsYXRpbmcgdGhlbS5cbiAgICogQWxzbyBjb25zaWRlciBhZGRpbmcgd2FybmluZ3Mgd2hlbiBhbiBlZmZlY3QgY2Fubm90IGJlIGNoYW5nZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7IVBvbHltZXJFbGVtZW50fSBwcm90byBFbGVtZW50IGNsYXNzIHByb3RvdHlwZSB0byBhZGQgYWNjZXNzb3JzXG4gICAqICAgYW5kIGVmZmVjdHMgdG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIEluZm8gb2JqZWN0IGZyb20gd2hpY2ggdG8gY3JlYXRlIHByb3BlcnR5IGVmZmVjdHMuXG4gICAqIFN1cHBvcnRlZCBrZXlzOlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWxsUHJvcHMgRmxhdHRlbmVkIG1hcCBvZiBhbGwgcHJvcGVydGllcyBkZWZpbmVkIGluIHRoaXNcbiAgICogICBlbGVtZW50IChpbmNsdWRpbmcgaW5oZXJpdGVkIHByb3BlcnRpZXMpXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eUZyb21Db25maWcocHJvdG8sIG5hbWUsIGluZm8sIGFsbFByb3BzKSB7XG4gICAgLy8gY29tcHV0ZWQgZm9yY2VzIHJlYWRPbmx5Li4uXG4gICAgaWYgKGluZm8uY29tcHV0ZWQpIHtcbiAgICAgIGluZm8ucmVhZE9ubHkgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBOb3RlLCBzaW5jZSBhbGwgY29tcHV0ZWQgcHJvcGVydGllcyBhcmUgcmVhZE9ubHksIHRoaXMgcHJldmVudHNcbiAgICAvLyBhZGRpbmcgYWRkaXRpb25hbCBjb21wdXRlZCBwcm9wZXJ0eSBlZmZlY3RzICh3aGljaCBsZWFkcyB0byBhIGNvbmZ1c2luZ1xuICAgIC8vIHNldHVwIHdoZXJlIG11bHRpcGxlIHRyaWdnZXJzIGZvciBzZXR0aW5nIGEgcHJvcGVydHkpXG4gICAgLy8gV2hpbGUgd2UgZG8gaGF2ZSBgaGFzQ29tcHV0ZWRFZmZlY3RgIHRoaXMgaXMgc2V0IG9uIHRoZSBwcm9wZXJ0eSdzXG4gICAgLy8gZGVwZW5kZW5jaWVzIHJhdGhlciB0aGFuIGl0c2VsZi5cbiAgICBpZiAoaW5mby5jb21wdXRlZCAmJiAhcHJvdG8uX2hhc1JlYWRPbmx5RWZmZWN0KG5hbWUpKSB7XG4gICAgICBwcm90by5fY3JlYXRlQ29tcHV0ZWRQcm9wZXJ0eShuYW1lLCBpbmZvLmNvbXB1dGVkLCBhbGxQcm9wcyk7XG4gICAgfVxuICAgIGlmIChpbmZvLnJlYWRPbmx5ICYmICFwcm90by5faGFzUmVhZE9ubHlFZmZlY3QobmFtZSkpIHtcbiAgICAgIHByb3RvLl9jcmVhdGVSZWFkT25seVByb3BlcnR5KG5hbWUsICFpbmZvLmNvbXB1dGVkKTtcbiAgICB9XG4gICAgaWYgKGluZm8ucmVmbGVjdFRvQXR0cmlidXRlICYmICFwcm90by5faGFzUmVmbGVjdEVmZmVjdChuYW1lKSkge1xuICAgICAgcHJvdG8uX2NyZWF0ZVJlZmxlY3RlZFByb3BlcnR5KG5hbWUpO1xuICAgIH1cbiAgICBpZiAoaW5mby5ub3RpZnkgJiYgIXByb3RvLl9oYXNOb3RpZnlFZmZlY3QobmFtZSkpIHtcbiAgICAgIHByb3RvLl9jcmVhdGVOb3RpZnlpbmdQcm9wZXJ0eShuYW1lKTtcbiAgICB9XG4gICAgLy8gYWx3YXlzIGFkZCBvYnNlcnZlclxuICAgIGlmIChpbmZvLm9ic2VydmVyKSB7XG4gICAgICBwcm90by5fY3JlYXRlUHJvcGVydHlPYnNlcnZlcihuYW1lLCBpbmZvLm9ic2VydmVyLCBhbGxQcm9wc1tpbmZvLm9ic2VydmVyXSk7XG4gICAgfVxuICAgIC8vIGFsd2F5cyBjcmVhdGUgdGhlIG1hcHBpbmcgZnJvbSBhdHRyaWJ1dGUgYmFjayB0byBwcm9wZXJ0eSBmb3IgZGVzZXJpYWxpemF0aW9uLlxuICAgIHByb3RvLl9hZGRQcm9wZXJ0eVRvQXR0cmlidXRlTWFwKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgYWxsIHN0eWxlIGVsZW1lbnRzIGluIHRoZSBlbGVtZW50IHRlbXBsYXRlLiBTdHlsZXMgd2l0aCB0aGVcbiAgICogYGluY2x1ZGVgIGF0dHJpYnV0ZSBhcmUgcHJvY2Vzc2VkIHN1Y2ggdGhhdCBhbnkgc3R5bGVzIGluXG4gICAqIHRoZSBhc3NvY2lhdGVkIFwic3R5bGUgbW9kdWxlc1wiIGFyZSBpbmNsdWRlZCBpbiB0aGUgZWxlbWVudCB0ZW1wbGF0ZS5cbiAgICogQHBhcmFtIHtQb2x5bWVyRWxlbWVudENvbnN0cnVjdG9yfSBrbGFzcyBFbGVtZW50IGNsYXNzXG4gICAqIEBwYXJhbSB7IUhUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlIFRlbXBsYXRlIHRvIHByb2Nlc3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlzIE5hbWUgb2YgZWxlbWVudFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSSSBCYXNlIFVSSSBmb3IgZWxlbWVudFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gcHJvY2Vzc0VsZW1lbnRTdHlsZXMoa2xhc3MsIHRlbXBsYXRlLCBpcywgYmFzZVVSSSkge1xuICAgIGNvbnN0IHRlbXBsYXRlU3R5bGVzID0gdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xuICAgIGNvbnN0IHN0eWxlc1dpdGhJbXBvcnRzID0gc3R5bGVzRnJvbVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAvLyBpbnNlcnQgc3R5bGVzIGZyb20gPGxpbmsgcmVsPVwiaW1wb3J0XCIgdHlwZT1cImNzc1wiPiBhdCB0aGUgdG9wIG9mIHRoZSB0ZW1wbGF0ZVxuICAgIGNvbnN0IGxpbmtlZFN0eWxlcyA9IHN0eWxlc0Zyb21Nb2R1bGVJbXBvcnRzKGlzKTtcbiAgICBjb25zdCBmaXJzdFRlbXBsYXRlQ2hpbGQgPSB0ZW1wbGF0ZS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGxpbmtlZFN0eWxlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgcyA9IGxpbmtlZFN0eWxlc1tpZHhdO1xuICAgICAgcy50ZXh0Q29udGVudCA9IGtsYXNzLl9wcm9jZXNzU3R5bGVUZXh0KHMudGV4dENvbnRlbnQsIGJhc2VVUkkpO1xuICAgICAgdGVtcGxhdGUuY29udGVudC5pbnNlcnRCZWZvcmUocywgZmlyc3RUZW1wbGF0ZUNoaWxkKTtcbiAgICB9XG4gICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgbGFzdCBcImNvbmNyZXRlXCIgc3R5bGUgaW4gdGhlIHRlbXBsYXRlIHdlIGhhdmUgZW5jb3VudGVyZWRcbiAgICBsZXQgdGVtcGxhdGVTdHlsZUluZGV4ID0gMDtcbiAgICAvLyBlbnN1cmUgYWxsIGdhdGhlcmVkIHN0eWxlcyBhcmUgYWN0dWFsbHkgaW4gdGhpcyB0ZW1wbGF0ZS5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlc1dpdGhJbXBvcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcyA9IHN0eWxlc1dpdGhJbXBvcnRzW2ldO1xuICAgICAgbGV0IHRlbXBsYXRlU3R5bGUgPSB0ZW1wbGF0ZVN0eWxlc1t0ZW1wbGF0ZVN0eWxlSW5kZXhdO1xuICAgICAgLy8gaWYgdGhlIHN0eWxlIGlzIG5vdCBpbiB0aGlzIHRlbXBsYXRlLCBpdCdzIGJlZW4gXCJpbmNsdWRlZFwiIGFuZFxuICAgICAgLy8gd2UgcHV0IGEgY2xvbmUgb2YgaXQgaW4gdGhlIHRlbXBsYXRlIGJlZm9yZSB0aGUgc3R5bGUgdGhhdCBpbmNsdWRlZCBpdFxuICAgICAgaWYgKHRlbXBsYXRlU3R5bGUgIT09IHMpIHtcbiAgICAgICAgcyA9IHMuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB0ZW1wbGF0ZVN0eWxlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHMsIHRlbXBsYXRlU3R5bGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcGxhdGVTdHlsZUluZGV4Kys7XG4gICAgICB9XG4gICAgICBzLnRleHRDb250ZW50ID0ga2xhc3MuX3Byb2Nlc3NTdHlsZVRleHQocy50ZXh0Q29udGVudCwgYmFzZVVSSSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU2hhZHlDU1MpIHtcbiAgICAgIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGUodGVtcGxhdGUsIGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9vayB1cCB0ZW1wbGF0ZSBmcm9tIGRvbS1tb2R1bGUgZm9yIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHshc3RyaW5nfSBpcyBFbGVtZW50IG5hbWUgdG8gbG9vayB1cFxuICAgKiBAcmV0dXJuIHshSFRNTFRlbXBsYXRlRWxlbWVudH0gVGVtcGxhdGUgZm91bmQgaW4gZG9tIG1vZHVsZSwgb3JcbiAgICogICB1bmRlZmluZWQgaWYgbm90IGZvdW5kXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlRnJvbURvbU1vZHVsZShpcykge1xuICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG4gICAgLy8gVW5kZXIgc3RyaWN0VGVtcGxhdGVQb2xpY3kgaW4gMy54KywgZG9tLW1vZHVsZSBsb29rdXAgaXMgb25seSBhbGxvd2VkXG4gICAgLy8gd2hlbiBvcHRlZC1pbiB2aWEgYWxsb3dUZW1wbGF0ZUZyb21Eb21Nb2R1bGVcbiAgICBpZiAoaXMgJiYgKCFzdHJpY3RUZW1wbGF0ZVBvbGljeSB8fCBhbGxvd1RlbXBsYXRlRnJvbURvbU1vZHVsZSkpIHtcbiAgICAgIHRlbXBsYXRlID0gRG9tTW9kdWxlLmltcG9ydChpcywgJ3RlbXBsYXRlJyk7XG4gICAgICAvLyBVbmRlciBzdHJpY3RUZW1wbGF0ZVBvbGljeSwgcmVxdWlyZSBhbnkgZWxlbWVudCB3aXRoIGFuIGBpc2BcbiAgICAgIC8vIHNwZWNpZmllZCB0byBoYXZlIGEgZG9tLW1vZHVsZVxuICAgICAgaWYgKHN0cmljdFRlbXBsYXRlUG9saWN5ICYmICF0ZW1wbGF0ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHN0cmljdFRlbXBsYXRlUG9saWN5OiBleHBlY3RpbmcgZG9tLW1vZHVsZSBvciBudWxsIHRlbXBsYXRlIGZvciAke2lzfWApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICAvKipcbiAgICogQHBvbHltZXJcbiAgICogQG1peGluQ2xhc3NcbiAgICogQHVucmVzdHJpY3RlZFxuICAgKiBAaW1wbGVtZW50cyB7UG9seW1lcl9FbGVtZW50TWl4aW59XG4gICAqL1xuICBjbGFzcyBQb2x5bWVyRWxlbWVudCBleHRlbmRzIHBvbHltZXJFbGVtZW50QmFzZSB7XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IFBvbHltZXIgdmVyc2lvbiBpbiBTZW12ZXIgbm90YXRpb24uXG4gICAgICogQHR5cGUge3N0cmluZ30gU2VtdmVyIG5vdGF0aW9uIG9mIHRoZSBjdXJyZW50IHZlcnNpb24gb2YgUG9seW1lci5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IHBvbHltZXJFbGVtZW50VmVyc2lvbigpIHtcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIG9mIFByb3BlcnRpZXNNaXhpbiBfZmluYWxpemVDbGFzcyB0byBjcmVhdGUgb2JzZXJ2ZXJzIGFuZFxuICAgICAqIGZpbmQgdGhlIHRlbXBsYXRlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9IEludGVyZmFjZXMgaW4gY2xvc3VyZSBkbyBub3QgaW5oZXJpdCBzdGF0aWNzLCBidXQgY2xhc3NlcyBkb1xuICAgICAqL1xuICAgc3RhdGljIF9maW5hbGl6ZUNsYXNzKCkge1xuICAgICAgc3VwZXIuX2ZpbmFsaXplQ2xhc3MoKTtcbiAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KFxuICAgICAgICBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdpcycsIHRoaXMpKSAmJiAgdGhpcy5pcykge1xuICAgICAgICByZWdpc3Rlcih0aGlzLnByb3RvdHlwZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBvYnNlcnZlcnMgPSBvd25PYnNlcnZlcnModGhpcyk7XG4gICAgICBpZiAob2JzZXJ2ZXJzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlT2JzZXJ2ZXJzKG9ic2VydmVycywgdGhpcy5fcHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgICAvLyBub3RlOiBjcmVhdGUgXCJ3b3JraW5nXCIgdGVtcGxhdGUgdGhhdCBpcyBmaW5hbGl6ZWQgYXQgaW5zdGFuY2UgdGltZVxuICAgICAgbGV0IHRlbXBsYXRlID0gLyoqIEB0eXBlIHtQb2x5bWVyRWxlbWVudENvbnN0cnVjdG9yfSAqLyAodGhpcykudGVtcGxhdGU7XG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCd0ZW1wbGF0ZSBnZXR0ZXIgbXVzdCByZXR1cm4gSFRNTFRlbXBsYXRlRWxlbWVudCcpO1xuICAgICAgICAgIHRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3RvdHlwZS5fdGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBvZiBQcm9wZXJ0aWVzQ2hhbmdlZCBjcmVhdGVQcm9wZXJ0aWVzIHRvIGNyZWF0ZSBhY2Nlc3NvcnNcbiAgICAgKiBhbmQgcHJvcGVydHkgZWZmZWN0cyBmb3IgYWxsIG9mIHRoZSBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgICBzdGF0aWMgY3JlYXRlUHJvcGVydGllcyhwcm9wcykge1xuICAgICAgZm9yIChsZXQgcCBpbiBwcm9wcykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eUZyb21Db25maWcodGhpcy5wcm90b3R5cGUsIHAsIHByb3BzW3BdLCBwcm9wcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBvYnNlcnZlcnMgZm9yIHRoZSBnaXZlbiBgb2JzZXJ2ZXJzYCBhcnJheS5cbiAgICAgKiBMZXZlcmFnZXMgYFByb3BlcnR5RWZmZWN0c2AgdG8gY3JlYXRlIG9ic2VydmVycy5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXJzIEFycmF5IG9mIG9ic2VydmVyIGRlc2NyaXB0b3JzIGZvclxuICAgICAqICAgdGhpcyBjbGFzc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkeW5hbWljRm5zIE9iamVjdCBjb250YWluaW5nIGtleXMgZm9yIGFueSBwcm9wZXJ0aWVzXG4gICAgICogICB0aGF0IGFyZSBmdW5jdGlvbnMgYW5kIHNob3VsZCB0cmlnZ2VyIHRoZSBlZmZlY3Qgd2hlbiB0aGUgZnVuY3Rpb25cbiAgICAgKiAgIHJlZmVyZW5jZSBpcyBjaGFuZ2VkXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZU9ic2VydmVycyhvYnNlcnZlcnMsIGR5bmFtaWNGbnMpIHtcbiAgICAgIGNvbnN0IHByb3RvID0gdGhpcy5wcm90b3R5cGU7XG4gICAgICBmb3IgKGxldCBpPTA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvdG8uX2NyZWF0ZU1ldGhvZE9ic2VydmVyKG9ic2VydmVyc1tpXSwgZHluYW1pY0Zucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdGVtcGxhdGUgdGhhdCB3aWxsIGJlIHN0YW1wZWQgaW50byB0aGlzIGVsZW1lbnQncyBzaGFkb3cgcm9vdC5cbiAgICAgKlxuICAgICAqIElmIGEgYHN0YXRpYyBnZXQgaXMoKWAgZ2V0dGVyIGlzIGRlZmluZWQsIHRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uXG4gICAgICogd2lsbCByZXR1cm4gdGhlIGZpcnN0IGA8dGVtcGxhdGU+YCBpbiBhIGBkb20tbW9kdWxlYCB3aG9zZSBgaWRgXG4gICAgICogbWF0Y2hlcyB0aGlzIGVsZW1lbnQncyBgaXNgLlxuICAgICAqXG4gICAgICogVXNlcnMgbWF5IG92ZXJyaWRlIHRoaXMgZ2V0dGVyIHRvIHJldHVybiBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAgKiAoaW4gd2hpY2ggY2FzZSB0aGUgYGlzYCBnZXR0ZXIgaXMgdW5uZWNlc3NhcnkpLiBUaGUgdGVtcGxhdGUgcmV0dXJuZWRcbiAgICAgKiBtdXN0IGJlIGFuIGBIVE1MVGVtcGxhdGVFbGVtZW50YC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB3aGVuIHN1YmNsYXNzaW5nLCBpZiB0aGUgc3VwZXIgY2xhc3Mgb3ZlcnJvZGUgdGhlIGRlZmF1bHRcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHN1YmNsYXNzIHdvdWxkIGxpa2UgdG8gcHJvdmlkZSBhbiBhbHRlcm5hdGVcbiAgICAgKiB0ZW1wbGF0ZSB2aWEgYSBgZG9tLW1vZHVsZWAsIGl0IHNob3VsZCBvdmVycmlkZSB0aGlzIGdldHRlciBhbmRcbiAgICAgKiByZXR1cm4gYERvbU1vZHVsZS5pbXBvcnQodGhpcy5pcywgJ3RlbXBsYXRlJylgLlxuICAgICAqXG4gICAgICogSWYgYSBzdWJjbGFzcyB3b3VsZCBsaWtlIHRvIG1vZGlmeSB0aGUgc3VwZXIgY2xhc3MgdGVtcGxhdGUsIGl0IHNob3VsZFxuICAgICAqIGNsb25lIGl0IHJhdGhlciB0aGFuIG1vZGlmeSBpdCBpbiBwbGFjZS4gIElmIHRoZSBnZXR0ZXIgZG9lcyBleHBlbnNpdmVcbiAgICAgKiB3b3JrIHN1Y2ggYXMgY2xvbmluZy9tb2RpZnlpbmcgYSB0ZW1wbGF0ZSwgaXQgc2hvdWxkIG1lbW9pemUgdGhlXG4gICAgICogdGVtcGxhdGUgZm9yIG1heGltdW0gcGVyZm9ybWFuY2U6XG4gICAgICpcbiAgICAgKiAgIGxldCBtZW1vaXplZFRlbXBsYXRlO1xuICAgICAqICAgY2xhc3MgTXlTdWJDbGFzcyBleHRlbmRzIE15U3VwZXJDbGFzcyB7XG4gICAgICogICAgIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7XG4gICAgICogICAgICAgaWYgKCFtZW1vaXplZFRlbXBsYXRlKSB7XG4gICAgICogICAgICAgICBtZW1vaXplZFRlbXBsYXRlID0gc3VwZXIudGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAqICAgICAgICAgbGV0IHN1YkNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgKiAgICAgICAgIHN1YkNvbnRlbnQudGV4dENvbnRlbnQgPSAnVGhpcyBjYW1lIGZyb20gTXlTdWJDbGFzcyc7XG4gICAgICogICAgICAgICBtZW1vaXplZFRlbXBsYXRlLmNvbnRlbnQuYXBwZW5kQ2hpbGQoc3ViQ29udGVudCk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgICAgIHJldHVybiBtZW1vaXplZFRlbXBsYXRlO1xuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHshSFRNTFRlbXBsYXRlRWxlbWVudHxzdHJpbmd9IFRlbXBsYXRlIHRvIGJlIHN0YW1wZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IHRlbXBsYXRlKCkge1xuICAgICAgLy8gRXhwbGFuYXRpb24gb2YgdGVtcGxhdGUtcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICAgICAgLy8gLSBjb25zdHJ1Y3Rvci50ZW1wbGF0ZSAodGhpcyBnZXR0ZXIpOiB0aGUgdGVtcGxhdGUgZm9yIHRoZSBjbGFzcy5cbiAgICAgIC8vICAgICBUaGlzIGNhbiBjb21lIGZyb20gdGhlIHByb3RvdHlwZSAoZm9yIGxlZ2FjeSBlbGVtZW50cyksIGZyb20gYVxuICAgICAgLy8gICAgIGRvbS1tb2R1bGUsIG9yIGZyb20gdGhlIHN1cGVyIGNsYXNzJ3MgdGVtcGxhdGUgKG9yIGNhbiBiZSBvdmVycmlkZGVuXG4gICAgICAvLyAgICAgYWx0b2dldGhlciBieSB0aGUgdXNlcilcbiAgICAgIC8vIC0gY29uc3RydWN0b3IuX3RlbXBsYXRlOiBtZW1vaXplZCB2ZXJzaW9uIG9mIGNvbnN0cnVjdG9yLnRlbXBsYXRlXG4gICAgICAvLyAtIHByb3RvdHlwZS5fdGVtcGxhdGU6IHdvcmtpbmcgdGVtcGxhdGUgZm9yIHRoZSBlbGVtZW50LCB3aGljaCB3aWxsIGJlXG4gICAgICAvLyAgICAgcGFyc2VkIGFuZCBtb2RpZmllZCBpbiBwbGFjZS4gSXQgaXMgYSBjbG9uZWQgdmVyc2lvbiBvZlxuICAgICAgLy8gICAgIGNvbnN0cnVjdG9yLnRlbXBsYXRlLCBzYXZlZCBpbiBfZmluYWxpemVDbGFzcygpLiBOb3RlIHRoYXQgYmVmb3JlXG4gICAgICAvLyAgICAgdGhpcyBnZXR0ZXIgaXMgY2FsbGVkLCBmb3IgbGVnYWN5IGVsZW1lbnRzIHRoaXMgY291bGQgYmUgZnJvbSBhXG4gICAgICAvLyAgICAgX3RlbXBsYXRlIGZpZWxkIG9uIHRoZSBpbmZvIG9iamVjdCBwYXNzZWQgdG8gUG9seW1lcigpLCBhIGJlaGF2aW9yLFxuICAgICAgLy8gICAgIG9yIHNldCBpbiByZWdpc3RlcmVkKCk7IG9uY2UgdGhlIHN0YXRpYyBnZXR0ZXIgcnVucywgYSBjbG9uZSBvZiBpdFxuICAgICAgLy8gICAgIHdpbGwgb3ZlcndyaXRlIGl0IG9uIHRoZSBwcm90b3R5cGUgYXMgdGhlIHdvcmtpbmcgdGVtcGxhdGUuXG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnX3RlbXBsYXRlJywgdGhpcykpKSB7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID1cbiAgICAgICAgICAvLyBJZiB1c2VyIGhhcyBwdXQgdGVtcGxhdGUgb24gcHJvdG90eXBlIChlLmcuIGluIGxlZ2FjeSB2aWEgcmVnaXN0ZXJlZFxuICAgICAgICAgIC8vIGNhbGxiYWNrIG9yIGluZm8gb2JqZWN0KSwgcHJlZmVyIHRoYXQgZmlyc3RcbiAgICAgICAgICB0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdfdGVtcGxhdGUnLCB0aGlzLnByb3RvdHlwZSkpID9cbiAgICAgICAgICB0aGlzLnByb3RvdHlwZS5fdGVtcGxhdGUgOlxuICAgICAgICAgIC8vIExvb2sgaW4gZG9tLW1vZHVsZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbGVtZW50J3MgaXNcbiAgICAgICAgICAoZ2V0VGVtcGxhdGVGcm9tRG9tTW9kdWxlKC8qKiBAdHlwZSB7UG9seW1lckVsZW1lbnRDb25zdHJ1Y3Rvcn0qLyAodGhpcykuaXMpIHx8XG4gICAgICAgICAgLy8gTmV4dCBsb29rIGZvciBzdXBlcmNsYXNzIHRlbXBsYXRlIChjYWxsIHRoZSBzdXBlciBpbXBsIHRoaXNcbiAgICAgICAgICAvLyB3YXkgc28gdGhhdCBgdGhpc2AgcG9pbnRzIHRvIHRoZSBzdXBlcmNsYXNzKVxuICAgICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZigvKiogQHR5cGUge1BvbHltZXJFbGVtZW50Q29uc3RydWN0b3J9Ki8gKHRoaXMpLnByb3RvdHlwZSkuY29uc3RydWN0b3IudGVtcGxhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFIVE1MVGVtcGxhdGVFbGVtZW50fHN0cmluZ30gdmFsdWUgVGVtcGxhdGUgdG8gc2V0LlxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQgdGVtcGxhdGUodmFsdWUpIHtcbiAgICAgIHRoaXMuX3RlbXBsYXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGF0aCBtYXRjaGluZyB0aGUgdXJsIGZyb20gd2hpY2ggdGhlIGVsZW1lbnQgd2FzIGltcG9ydGVkLlxuICAgICAqXG4gICAgICogVGhpcyBwYXRoIGlzIHVzZWQgdG8gcmVzb2x2ZSB1cmwncyBpbiB0ZW1wbGF0ZSBzdHlsZSBjc3NUZXh0LlxuICAgICAqIFRoZSBgaW1wb3J0UGF0aGAgcHJvcGVydHkgaXMgYWxzbyBzZXQgb24gZWxlbWVudCBpbnN0YW5jZXMgYW5kIGNhbiBiZVxuICAgICAqIHVzZWQgdG8gY3JlYXRlIGJpbmRpbmdzIHJlbGF0aXZlIHRvIHRoZSBpbXBvcnQgcGF0aC5cbiAgICAgKlxuICAgICAqIEZvciBlbGVtZW50cyBkZWZpbmVkIGluIEVTIG1vZHVsZXMsIHVzZXJzIHNob3VsZCBpbXBsZW1lbnRcbiAgICAgKiBgc3RhdGljIGdldCBpbXBvcnRNZXRhKCkgeyByZXR1cm4gaW1wb3J0Lm1ldGE7IH1gLCBhbmQgdGhlIGRlZmF1bHRcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiBvZiBgaW1wb3J0UGF0aGAgd2lsbCAgcmV0dXJuIGBpbXBvcnQubWV0YS51cmxgJ3MgcGF0aC5cbiAgICAgKiBGb3IgZWxlbWVudHMgZGVmaW5lZCBpbiBIVE1MIGltcG9ydHMsIHRoaXMgZ2V0dGVyIHdpbGwgcmV0dXJuIHRoZSBwYXRoXG4gICAgICogdG8gdGhlIGRvY3VtZW50IGNvbnRhaW5pbmcgYSBgZG9tLW1vZHVsZWAgZWxlbWVudCBtYXRjaGluZyB0aGlzXG4gICAgICogZWxlbWVudCdzIHN0YXRpYyBgaXNgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogTm90ZSwgdGhpcyBwYXRoIHNob3VsZCBjb250YWluIGEgdHJhaWxpbmcgYC9gLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaW1wb3J0IHBhdGggZm9yIHRoaXMgZWxlbWVudCBjbGFzc1xuICAgICAqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9XG4gICAgICovXG4gICAgc3RhdGljIGdldCBpbXBvcnRQYXRoKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ19pbXBvcnRQYXRoJywgdGhpcykpKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSB0aGlzLmltcG9ydE1ldGE7XG4gICAgICAgIGlmIChtZXRhKSB7XG4gICAgICAgICAgdGhpcy5faW1wb3J0UGF0aCA9IHBhdGhGcm9tVXJsKG1ldGEudXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBEb21Nb2R1bGUuaW1wb3J0KC8qKiBAdHlwZSB7UG9seW1lckVsZW1lbnRDb25zdHJ1Y3Rvcn0gKi8gKHRoaXMpLmlzKTtcbiAgICAgICAgICB0aGlzLl9pbXBvcnRQYXRoID0gKG1vZHVsZSAmJiBtb2R1bGUuYXNzZXRwYXRoKSB8fFxuICAgICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKC8qKiBAdHlwZSB7UG9seW1lckVsZW1lbnRDb25zdHJ1Y3Rvcn0qLyAodGhpcykucHJvdG90eXBlKS5jb25zdHJ1Y3Rvci5pbXBvcnRQYXRoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faW1wb3J0UGF0aDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICAvKiogQHR5cGUge0hUTUxUZW1wbGF0ZUVsZW1lbnR9ICovXG4gICAgICB0aGlzLl90ZW1wbGF0ZTtcbiAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgdGhpcy5faW1wb3J0UGF0aDtcbiAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgdGhpcy5yb290UGF0aDtcbiAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgdGhpcy5pbXBvcnRQYXRoO1xuICAgICAgLyoqIEB0eXBlIHtTdGFtcGVkVGVtcGxhdGUgfCBIVE1MRWxlbWVudCB8IFNoYWRvd1Jvb3R9ICovXG4gICAgICB0aGlzLnJvb3Q7XG4gICAgICAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhRWxlbWVudD59ICovXG4gICAgICB0aGlzLiQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IGBQcm9wZXJ0eUFjY2Vzc29yc2AgdG8gZW5zdXJlIGNsYXNzXG4gICAgICogbWV0YXByb2dyYW1taW5nIHJlbGF0ZWQgdG8gcHJvcGVydHkgYWNjZXNzb3JzIGFuZCBlZmZlY3RzIGhhc1xuICAgICAqIGNvbXBsZXRlZCAoY2FsbHMgYGZpbmFsaXplYCkuXG4gICAgICpcbiAgICAgKiBJdCBhbHNvIGluaXRpYWxpemVzIGFueSBwcm9wZXJ0eSBkZWZhdWx0cyBwcm92aWRlZCB2aWEgYHZhbHVlYCBpblxuICAgICAqIGBwcm9wZXJ0aWVzYCBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHN1cHByZXNzIHtpbnZhbGlkQ2FzdHN9XG4gICAgICovXG4gICAgX2luaXRpYWxpemVQcm9wZXJ0aWVzKCkge1xuICAgICAgaW5zdGFuY2VDb3VudCsrO1xuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5maW5hbGl6ZSgpO1xuICAgICAgLy8gbm90ZTogZmluYWxpemUgdGVtcGxhdGUgd2hlbiB3ZSBoYXZlIGFjY2VzcyB0byBgbG9jYWxOYW1lYCB0b1xuICAgICAgLy8gYXZvaWQgZGVwZW5kZW5jZSBvbiBgaXNgIGZvciBwb2x5ZmlsbGluZyBzdHlsaW5nLlxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fZmluYWxpemVUZW1wbGF0ZSgvKiogQHR5cGUgeyFIVE1MRWxlbWVudH0gKi8odGhpcykubG9jYWxOYW1lKTtcbiAgICAgIHN1cGVyLl9pbml0aWFsaXplUHJvcGVydGllcygpO1xuICAgICAgLy8gc2V0IHBhdGggZGVmYXVsdHNcbiAgICAgIHRoaXMucm9vdFBhdGggPSByb290UGF0aDtcbiAgICAgIHRoaXMuaW1wb3J0UGF0aCA9IHRoaXMuY29uc3RydWN0b3IuaW1wb3J0UGF0aDtcbiAgICAgIC8vIGFwcGx5IHByb3BlcnR5IGRlZmF1bHRzLi4uXG4gICAgICBsZXQgcCQgPSBwcm9wZXJ0eURlZmF1bHRzKHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgaWYgKCFwJCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBwIGluIHAkKSB7XG4gICAgICAgIGxldCBpbmZvID0gcCRbcF07XG4gICAgICAgIC8vIERvbid0IHNldCBkZWZhdWx0IHZhbHVlIGlmIHRoZXJlIGlzIGFscmVhZHkgYW4gb3duIHByb3BlcnR5LCB3aGljaFxuICAgICAgICAvLyBoYXBwZW5zIHdoZW4gYSBgcHJvcGVydGllc2AgcHJvcGVydHkgd2l0aCBkZWZhdWx0IGJ1dCBubyBlZmZlY3RzIGhhZFxuICAgICAgICAvLyBhIHByb3BlcnR5IHNldCAoZS5nLiBib3VuZCkgYnkgaXRzIGhvc3QgYmVmb3JlIHVwZ3JhZGVcbiAgICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gdHlwZW9mIGluZm8udmFsdWUgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICBpbmZvLnZhbHVlLmNhbGwodGhpcykgOlxuICAgICAgICAgICAgaW5mby52YWx1ZTtcbiAgICAgICAgICAvLyBTZXQgdmlhIGBfc2V0UHJvcGVydHlgIGlmIHRoZXJlIGlzIGFuIGFjY2Vzc29yLCB0byBlbmFibGVcbiAgICAgICAgICAvLyBpbml0aWFsaXppbmcgcmVhZE9ubHkgcHJvcGVydHkgZGVmYXVsdHNcbiAgICAgICAgICBpZiAodGhpcy5faGFzQWNjZXNzb3IocCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFBlbmRpbmdQcm9wZXJ0eShwLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNbcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYXRoZXIgc3R5bGUgdGV4dCBmb3IgYSBzdHlsZSBlbGVtZW50IGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjc3NUZXh0IFRleHQgY29udGFpbmluZyBzdHlsaW5nIHRvIHByb2Nlc3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSSSBCYXNlIFVSSSB0byByZWJhc2UgQ1NTIHBhdGhzIGFnYWluc3RcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwcm9jZXNzZWQgQ1NTIHRleHRcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIF9wcm9jZXNzU3R5bGVUZXh0KGNzc1RleHQsIGJhc2VVUkkpIHtcbiAgICAgIHJldHVybiByZXNvbHZlQ3NzKGNzc1RleHQsIGJhc2VVUkkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQ29uZmlndXJlcyBhbiBlbGVtZW50IGBwcm90b2AgdG8gZnVuY3Rpb24gd2l0aCBhIGdpdmVuIGB0ZW1wbGF0ZWAuXG4gICAgKiBUaGUgZWxlbWVudCBuYW1lIGBpc2AgYW5kIGV4dGVuZHMgYGV4dGAgbXVzdCBiZSBzcGVjaWZpZWQgZm9yIFNoYWR5Q1NTXG4gICAgKiBzdHlsZSBzY29waW5nLlxuICAgICpcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcyBUYWcgbmFtZSAob3IgdHlwZSBleHRlbnNpb24gbmFtZSkgZm9yIHRoaXMgZWxlbWVudFxuICAgICogQHJldHVybiB7dm9pZH1cbiAgICAqIEBwcm90ZWN0ZWRcbiAgICAqL1xuICAgIHN0YXRpYyBfZmluYWxpemVUZW1wbGF0ZShpcykge1xuICAgICAgLyoqIEBjb25zdCB7SFRNTFRlbXBsYXRlRWxlbWVudH0gKi9cbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5wcm90b3R5cGUuX3RlbXBsYXRlO1xuICAgICAgaWYgKHRlbXBsYXRlICYmICF0ZW1wbGF0ZS5fX3BvbHltZXJGaW5hbGl6ZWQpIHtcbiAgICAgICAgdGVtcGxhdGUuX19wb2x5bWVyRmluYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgaW1wb3J0UGF0aCA9IHRoaXMuaW1wb3J0UGF0aDtcbiAgICAgICAgY29uc3QgYmFzZVVSSSA9IGltcG9ydFBhdGggPyByZXNvbHZlVXJsKGltcG9ydFBhdGgpIDogJyc7XG4gICAgICAgIC8vIGUuZy4gc3VwcG9ydCBgaW5jbHVkZT1cIm1vZHVsZS1uYW1lXCJgLCBhbmQgU2hhZHlDU1NcbiAgICAgICAgcHJvY2Vzc0VsZW1lbnRTdHlsZXModGhpcywgdGVtcGxhdGUsIGlzLCBiYXNlVVJJKTtcbiAgICAgICAgdGhpcy5wcm90b3R5cGUuX2JpbmRUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgYSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBzdGFuZGFyZCBDdXN0b20gRWxlbWVudHNcbiAgICAgKiBgY29ubmVjdGVkQ2FsbGJhY2tgLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZW5hYmxlcyB0aGUgcHJvcGVydHkgZWZmZWN0cyBzeXN0ZW0gYW5kXG4gICAgICogZmx1c2hlcyBhbnkgcGVuZGluZyBwcm9wZXJ0aWVzLCBhbmQgdXBkYXRlcyBzaGltbWVkIENTUyBwcm9wZXJ0aWVzXG4gICAgICogd2hlbiB1c2luZyB0aGUgU2hhZHlDU1Mgc2NvcGluZy9jdXN0b20gcHJvcGVydGllcyBwb2x5ZmlsbC5cbiAgICAgKlxuICAgICAqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXMsIGludmFsaWRDYXN0c30gU3VwZXIgbWF5IG9yIG1heSBub3QgaW1wbGVtZW50IHRoZSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICBpZiAod2luZG93LlNoYWR5Q1NTICYmIHRoaXMuX3RlbXBsYXRlKSB7XG4gICAgICAgIHdpbmRvdy5TaGFkeUNTUy5zdHlsZUVsZW1lbnQoLyoqIEB0eXBlIHshSFRNTEVsZW1lbnR9ICovKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhbXBzIHRoZSBlbGVtZW50IHRlbXBsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICByZWFkeSgpIHtcbiAgICAgIGlmICh0aGlzLl90ZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLl9zdGFtcFRlbXBsYXRlKHRoaXMuX3RlbXBsYXRlKTtcbiAgICAgICAgdGhpcy4kID0gdGhpcy5yb290LiQ7XG4gICAgICB9XG4gICAgICBzdXBlci5yZWFkeSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudHMgYFByb3BlcnR5RWZmZWN0c2AncyBgX3JlYWR5Q2xpZW50c2AgY2FsbC4gQXR0YWNoZXNcbiAgICAgKiBlbGVtZW50IGRvbSBieSBjYWxsaW5nIGBfYXR0YWNoRG9tYCB3aXRoIHRoZSBkb20gc3RhbXBlZCBmcm9tIHRoZVxuICAgICAqIGVsZW1lbnQncyB0ZW1wbGF0ZSB2aWEgYF9zdGFtcFRlbXBsYXRlYC4gTm90ZSB0aGF0IHRoaXMgYWxsb3dzXG4gICAgICogY2xpZW50IGRvbSB0byBiZSBhdHRhY2hlZCB0byB0aGUgZWxlbWVudCBwcmlvciB0byBhbnkgb2JzZXJ2ZXJzXG4gICAgICogcnVubmluZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX3JlYWR5Q2xpZW50cygpIHtcbiAgICAgIGlmICh0aGlzLl90ZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnJvb3QgPSB0aGlzLl9hdHRhY2hEb20oLyoqIEB0eXBlIHtTdGFtcGVkVGVtcGxhdGV9ICovKHRoaXMucm9vdCkpO1xuICAgICAgfVxuICAgICAgLy8gVGhlIHN1cGVyLl9yZWFkeUNsaWVudHMgaGVyZSBzZXRzIHRoZSBjbGllbnRzIGluaXRpYWxpemVkIGZsYWcuXG4gICAgICAvLyBXZSBtdXN0IHdhaXQgdG8gZG8gdGhpcyB1bnRpbCBhZnRlciBjbGllbnQgZG9tIGlzIGNyZWF0ZWQvYXR0YWNoZWRcbiAgICAgIC8vIHNvIHRoYXQgdGhpcyBmbGFnIGNhbiBiZSBjaGVja2VkIHRvIHByZXZlbnQgbm90aWZpY2F0aW9ucyBmaXJlZFxuICAgICAgLy8gZHVyaW5nIHRoaXMgcHJvY2VzcyBmcm9tIGJlaW5nIGhhbmRsZWQgYmVmb3JlIGNsaWVudHMgYXJlIHJlYWR5LlxuICAgICAgc3VwZXIuX3JlYWR5Q2xpZW50cygpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW4gZWxlbWVudCdzIHN0YW1wZWQgZG9tIHRvIGl0c2VsZi4gQnkgZGVmYXVsdCxcbiAgICAgKiB0aGlzIG1ldGhvZCBjcmVhdGVzIGEgYHNoYWRvd1Jvb3RgIGFuZCBhZGRzIHRoZSBkb20gdG8gaXQuXG4gICAgICogSG93ZXZlciwgdGhpcyBtZXRob2QgbWF5IGJlIG92ZXJyaWRkZW4gdG8gYWxsb3cgYW4gZWxlbWVudFxuICAgICAqIHRvIHB1dCBpdHMgZG9tIGluIGFub3RoZXIgbG9jYXRpb24uXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn1cbiAgICAgKiBAc3VwcHJlc3Mge21pc3NpbmdSZXR1cm59XG4gICAgICogQHBhcmFtIHtTdGFtcGVkVGVtcGxhdGV9IGRvbSB0byBhdHRhY2ggdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQHJldHVybiB7U2hhZG93Um9vdH0gbm9kZSB0byB3aGljaCB0aGUgZG9tIGhhcyBiZWVuIGF0dGFjaGVkLlxuICAgICAqL1xuICAgIF9hdHRhY2hEb20oZG9tKSB7XG4gICAgICBpZiAodGhpcy5hdHRhY2hTaGFkb3cpIHtcbiAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgIGlmICghdGhpcy5zaGFkb3dSb290KSB7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNoYWRvd1Jvb3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWRvd0RPTSBub3QgYXZhaWxhYmxlLiAnICtcbiAgICAgICAgICAvLyBUT0RPKHNvcnZlbGwpOiBtb3ZlIHRvIGNvbXBpbGUtdGltZSBjb25kaXRpb25hbCB3aGVuIHN1cHBvcnRlZFxuICAgICAgICAnUG9seW1lckVsZW1lbnQgY2FuIGNyZWF0ZSBkb20gYXMgY2hpbGRyZW4gaW5zdGVhZCBvZiBpbiAnICtcbiAgICAgICAgJ1NoYWRvd0RPTSBieSBzZXR0aW5nIGB0aGlzLnJvb3QgPSB0aGlzO1xcYCBiZWZvcmUgXFxgcmVhZHlcXGAuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB1c2luZyB0aGUgU2hhZHlDU1Mgc2NvcGluZyBhbmQgY3VzdG9tIHByb3BlcnR5IHNoaW0sIGNhdXNlcyBhbGxcbiAgICAgKiBzaGltbWVkIHN0eWxlcyBpbiB0aGlzIGVsZW1lbnQgKGFuZCBpdHMgc3VidHJlZSkgdG8gYmUgdXBkYXRlZFxuICAgICAqIGJhc2VkIG9uIGN1cnJlbnQgY3VzdG9tIHByb3BlcnR5IHZhbHVlcy5cbiAgICAgKlxuICAgICAqIFRoZSBvcHRpb25hbCBwYXJhbWV0ZXIgb3ZlcnJpZGVzIGlubGluZSBjdXN0b20gcHJvcGVydHkgc3R5bGVzIHdpdGggYW5cbiAgICAgKiBvYmplY3Qgb2YgcHJvcGVydGllcyB3aGVyZSB0aGUga2V5cyBhcmUgQ1NTIHByb3BlcnRpZXMsIGFuZCB0aGUgdmFsdWVzXG4gICAgICogYXJlIHN0cmluZ3MuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOiBgdGhpcy51cGRhdGVTdHlsZXMoeyctLWNvbG9yJzogJ2JsdWUnfSlgXG4gICAgICpcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSByZXRhaW5lZCB1bmxlc3MgYSB2YWx1ZSBvZiBgbnVsbGAgaXMgc2V0LlxuICAgICAqXG4gICAgICogTm90ZTogVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBzdXBwb3J0IHVwZGF0aW5nIENTUyBtaXhpbnMuXG4gICAgICogWW91IGNhbiBub3QgZHluYW1pY2FsbHkgY2hhbmdlIHRoZSB2YWx1ZSBvZiBhbiBgQGFwcGx5YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gcHJvcGVydGllcyBCYWcgb2YgY3VzdG9tIHByb3BlcnR5IGtleS92YWx1ZXMgdG9cbiAgICAgKiAgIGFwcGx5IHRvIHRoaXMgZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBzdXBwcmVzcyB7aW52YWxpZENhc3RzfVxuICAgICAqL1xuICAgIHVwZGF0ZVN0eWxlcyhwcm9wZXJ0aWVzKSB7XG4gICAgICBpZiAod2luZG93LlNoYWR5Q1NTKSB7XG4gICAgICAgIHdpbmRvdy5TaGFkeUNTUy5zdHlsZVN1YnRyZWUoLyoqIEB0eXBlIHshSFRNTEVsZW1lbnR9ICovKHRoaXMpLCBwcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXdyaXRlcyBhIGdpdmVuIFVSTCByZWxhdGl2ZSB0byBhIGJhc2UgVVJMLiBUaGUgYmFzZSBVUkwgZGVmYXVsdHMgdG9cbiAgICAgKiB0aGUgb3JpZ2luYWwgbG9jYXRpb24gb2YgdGhlIGRvY3VtZW50IGNvbnRhaW5pbmcgdGhlIGBkb20tbW9kdWxlYCBmb3JcbiAgICAgKiB0aGlzIGVsZW1lbnQuIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHRoZSBzYW1lIFVSTCBiZWZvcmUgYW5kIGFmdGVyXG4gICAgICogYnVuZGxpbmcuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBwZXJmb3JtcyBubyByZXNvbHV0aW9uIGZvciBVUkxzIHRoYXQgc3RhcnRcbiAgICAgKiB3aXRoIGAvYCAoYWJzb2x1dGUgVVJMcykgb3IgYCNgIChoYXNoIGlkZW50aWZpZXJzKS4gIEZvciBnZW5lcmFsIHB1cnBvc2VcbiAgICAgKiBVUkwgcmVzb2x1dGlvbiwgdXNlIGB3aW5kb3cuVVJMYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHRvIHJlc29sdmUuXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBiYXNlIE9wdGlvbmFsIGJhc2UgVVJMIHRvIHJlc29sdmUgYWdhaW5zdCwgZGVmYXVsdHNcbiAgICAgKiB0byB0aGUgZWxlbWVudCdzIGBpbXBvcnRQYXRoYFxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gUmV3cml0dGVuIFVSTCByZWxhdGl2ZSB0byBiYXNlXG4gICAgICovXG4gICAgcmVzb2x2ZVVybCh1cmwsIGJhc2UpIHtcbiAgICAgIGlmICghYmFzZSAmJiB0aGlzLmltcG9ydFBhdGgpIHtcbiAgICAgICAgYmFzZSA9IHJlc29sdmVVcmwodGhpcy5pbXBvcnRQYXRoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlVXJsKHVybCwgYmFzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIGBQcm9wZXJ0eUFjY2Vzc29yc2AgdG8gYWRkIG1hcCBvZiBkeW5hbWljIGZ1bmN0aW9ucyBvblxuICAgICAqIHRlbXBsYXRlIGluZm8sIGZvciBjb25zdW1wdGlvbiBieSBgUHJvcGVydHlFZmZlY3RzYCB0ZW1wbGF0ZSBiaW5kaW5nXG4gICAgICogY29kZS4gVGhpcyBtYXAgZGV0ZXJtaW5lcyB3aGljaCBtZXRob2QgdGVtcGxhdGVzIHNob3VsZCBoYXZlIGFjY2Vzc29yc1xuICAgICAqIGNyZWF0ZWQgZm9yIHRoZW0uXG4gICAgICpcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKiBAc3VwcHJlc3Mge21pc3NpbmdQcm9wZXJ0aWVzfSBJbnRlcmZhY2VzIGluIGNsb3N1cmUgZG8gbm90IGluaGVyaXQgc3RhdGljcywgYnV0IGNsYXNzZXMgZG9cbiAgICAgKi9cbiAgICBzdGF0aWMgX3BhcnNlVGVtcGxhdGVDb250ZW50KHRlbXBsYXRlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKSB7XG4gICAgICB0ZW1wbGF0ZUluZm8uZHluYW1pY0ZucyA9IHRlbXBsYXRlSW5mby5keW5hbWljRm5zIHx8IHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgICByZXR1cm4gc3VwZXIuX3BhcnNlVGVtcGxhdGVDb250ZW50KHRlbXBsYXRlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBQb2x5bWVyRWxlbWVudDtcbn0pO1xuXG4vKipcbiAqIFRvdGFsIG51bWJlciBvZiBQb2x5bWVyIGVsZW1lbnQgaW5zdGFuY2VzIGNyZWF0ZWQuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5leHBvcnQgbGV0IGluc3RhbmNlQ291bnQgPSAwO1xuXG4vKipcbiAqIEFycmF5IG9mIFBvbHltZXIgZWxlbWVudCBjbGFzc2VzIHRoYXQgaGF2ZSBiZWVuIGZpbmFsaXplZC5cbiAqIEB0eXBlIHtBcnJheTxQb2x5bWVyRWxlbWVudD59XG4gKi9cbmV4cG9ydCBjb25zdCByZWdpc3RyYXRpb25zID0gW107XG5cbi8qKlxuICogQHBhcmFtIHshUG9seW1lckVsZW1lbnRDb25zdHJ1Y3Rvcn0gcHJvdG90eXBlIEVsZW1lbnQgcHJvdG90eXBlIHRvIGxvZ1xuICogQHRoaXMge3RoaXN9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBfcmVnTG9nKHByb3RvdHlwZSkge1xuICBjb25zb2xlLmxvZygnWycgKyBwcm90b3R5cGUuaXMgKyAnXTogcmVnaXN0ZXJlZCcpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNsYXNzIHByb3RvdHlwZSBmb3IgdGVsZW1ldHJ5IHB1cnBvc2VzLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcHJvdG90eXBlIEVsZW1lbnQgcHJvdG90eXBlIHRvIHJlZ2lzdGVyXG4gKiBAdGhpcyB7dGhpc31cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHByb3RvdHlwZSkge1xuICByZWdpc3RyYXRpb25zLnB1c2gocHJvdG90eXBlKTtcbn1cblxuLyoqXG4gKiBMb2dzIGFsbCBlbGVtZW50cyByZWdpc3RlcmVkIHdpdGggYW4gYGlzYCB0byB0aGUgY29uc29sZS5cbiAqIEBwdWJsaWNcbiAqIEB0aGlzIHt0aGlzfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHVtcFJlZ2lzdHJhdGlvbnMoKSB7XG4gIHJlZ2lzdHJhdGlvbnMuZm9yRWFjaChfcmVnTG9nKTtcbn1cblxuLyoqXG4gKiBXaGVuIHVzaW5nIHRoZSBTaGFkeUNTUyBzY29waW5nIGFuZCBjdXN0b20gcHJvcGVydHkgc2hpbSwgY2F1c2VzIGFsbFxuICogc2hpbW1lZCBgc3R5bGVzYCAodmlhIGBjdXN0b20tc3R5bGVgKSBpbiB0aGUgZG9jdW1lbnQgKGFuZCBpdHMgc3VidHJlZSlcbiAqIHRvIGJlIHVwZGF0ZWQgYmFzZWQgb24gY3VycmVudCBjdXN0b20gcHJvcGVydHkgdmFsdWVzLlxuICpcbiAqIFRoZSBvcHRpb25hbCBwYXJhbWV0ZXIgb3ZlcnJpZGVzIGlubGluZSBjdXN0b20gcHJvcGVydHkgc3R5bGVzIHdpdGggYW5cbiAqIG9iamVjdCBvZiBwcm9wZXJ0aWVzIHdoZXJlIHRoZSBrZXlzIGFyZSBDU1MgcHJvcGVydGllcywgYW5kIHRoZSB2YWx1ZXNcbiAqIGFyZSBzdHJpbmdzLlxuICpcbiAqIEV4YW1wbGU6IGB1cGRhdGVTdHlsZXMoeyctLWNvbG9yJzogJ2JsdWUnfSlgXG4gKlxuICogVGhlc2UgcHJvcGVydGllcyBhcmUgcmV0YWluZWQgdW5sZXNzIGEgdmFsdWUgb2YgYG51bGxgIGlzIHNldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdD19IHByb3BzIEJhZyBvZiBjdXN0b20gcHJvcGVydHkga2V5L3ZhbHVlcyB0b1xuICogICBhcHBseSB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3QgdXBkYXRlU3R5bGVzID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgaWYgKHdpbmRvdy5TaGFkeUNTUykge1xuICAgIHdpbmRvdy5TaGFkeUNTUy5zdHlsZURvY3VtZW50KHByb3BzKTtcbiAgfVxufTtcbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5pbXBvcnQgJy4uL3V0aWxzL2Jvb3QuanMnO1xuXG5pbXBvcnQgeyBkZWR1cGluZ01peGluIH0gZnJvbSAnLi4vdXRpbHMvbWl4aW4uanMnO1xuaW1wb3J0IHsgbWljcm9UYXNrIH0gZnJvbSAnLi4vdXRpbHMvYXN5bmMuanMnO1xuXG4vKiogQGNvbnN0IHshQXN5bmNJbnRlcmZhY2V9ICovXG5jb25zdCBtaWNyb3Rhc2sgPSBtaWNyb1Rhc2s7XG5cbi8qKlxuICogRWxlbWVudCBjbGFzcyBtaXhpbiB0aGF0IHByb3ZpZGVzIGJhc2ljIG1ldGEtcHJvZ3JhbW1pbmcgZm9yIGNyZWF0aW5nIG9uZVxuICogb3IgbW9yZSBwcm9wZXJ0eSBhY2Nlc3NvcnMgKGdldHRlci9zZXR0ZXIgcGFpcikgdGhhdCBlbnF1ZXVlIGFuIGFzeW5jXG4gKiAoYmF0Y2hlZCkgYF9wcm9wZXJ0aWVzQ2hhbmdlZGAgY2FsbGJhY2suXG4gKlxuICogRm9yIGJhc2ljIHVzYWdlIG9mIHRoaXMgbWl4aW4sIGNhbGwgYE15Q2xhc3MuY3JlYXRlUHJvcGVydGllcyhwcm9wcylgXG4gKiBvbmNlIGF0IGNsYXNzIGRlZmluaXRpb24gdGltZSB0byBjcmVhdGUgcHJvcGVydHkgYWNjZXNzb3JzIGZvciBwcm9wZXJ0aWVzXG4gKiBuYW1lZCBpbiBwcm9wcywgaW1wbGVtZW50IGBfcHJvcGVydGllc0NoYW5nZWRgIHRvIHJlYWN0IGFzIGRlc2lyZWQgdG9cbiAqIHByb3BlcnR5IGNoYW5nZXMsIGFuZCBpbXBsZW1lbnQgYHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKClgIGFuZFxuICogaW5jbHVkZSBsb3dlcmNhc2UgdmVyc2lvbnMgb2YgYW55IHByb3BlcnR5IG5hbWVzIHRoYXQgc2hvdWxkIGJlIHNldCBmcm9tXG4gKiBhdHRyaWJ1dGVzLiBMYXN0LCBjYWxsIGB0aGlzLl9lbmFibGVQcm9wZXJ0aWVzKClgIGluIHRoZSBlbGVtZW50J3NcbiAqIGBjb25uZWN0ZWRDYWxsYmFja2AgdG8gZW5hYmxlIHRoZSBhY2Nlc3NvcnMuXG4gKlxuICogQG1peGluRnVuY3Rpb25cbiAqIEBwb2x5bWVyXG4gKiBAc3VtbWFyeSBFbGVtZW50IGNsYXNzIG1peGluIGZvciByZWFjdGluZyB0byBwcm9wZXJ0eSBjaGFuZ2VzIGZyb21cbiAqICAgZ2VuZXJhdGVkIHByb3BlcnR5IGFjY2Vzc29ycy5cbiAqL1xuZXhwb3J0IGNvbnN0IFByb3BlcnRpZXNDaGFuZ2VkID0gZGVkdXBpbmdNaXhpbihcbiAgICAvKipcbiAgICAgKiBAdGVtcGxhdGUgVFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24obmV3OlQpfSBzdXBlckNsYXNzIENsYXNzIHRvIGFwcGx5IG1peGluIHRvLlxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9uKG5ldzpUKX0gc3VwZXJDbGFzcyB3aXRoIG1peGluIGFwcGxpZWQuXG4gICAgICovXG4gICAgKHN1cGVyQ2xhc3MpID0+IHtcblxuICAvKipcbiAgICogQHBvbHltZXJcbiAgICogQG1peGluQ2xhc3NcbiAgICogQGltcGxlbWVudHMge1BvbHltZXJfUHJvcGVydGllc0NoYW5nZWR9XG4gICAqIEB1bnJlc3RyaWN0ZWRcbiAgICovXG4gIGNsYXNzIFByb3BlcnRpZXNDaGFuZ2VkIGV4dGVuZHMgc3VwZXJDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHByb3BlcnR5IGFjY2Vzc29ycyBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IG5hbWVzLlxuICAgICAqIEBwYXJhbSB7IU9iamVjdH0gcHJvcHMgT2JqZWN0IHdob3NlIGtleXMgYXJlIG5hbWVzIG9mIGFjY2Vzc29ycy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUHJvcGVydGllcyhwcm9wcykge1xuICAgICAgY29uc3QgcHJvdG8gPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgLy8gZG9uJ3Qgc3RvbXAgYW4gZXhpc3RpbmcgYWNjZXNzb3JcbiAgICAgICAgaWYgKCEocHJvcCBpbiBwcm90bykpIHtcbiAgICAgICAgICBwcm90by5fY3JlYXRlUHJvcGVydHlBY2Nlc3Nvcihwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXR0cmlidXRlIG5hbWUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICogVGhlIGF0dHJpYnV0ZSBuYW1lIGlzIHRoZSBsb3dlcmNhc2VkIHByb3BlcnR5IG5hbWUuIE92ZXJyaWRlIHRvXG4gICAgICogY3VzdG9taXplIHRoaXMgbWFwcGluZy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgdG8gY29udmVydFxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gQXR0cmlidXRlIG5hbWUgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIGF0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHByb3BlcnR5LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgcG9pbnQgdG8gcHJvdmlkZSBhIHR5cGUgdG8gd2hpY2ggdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0b1xuICAgICAqIGEgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiBwcm9wZXJ0eVxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyB0eXBlRm9yUHJvcGVydHkobmFtZSkgeyB9IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNldHRlci9nZXR0ZXIgcGFpciBmb3IgdGhlIG5hbWVkIHByb3BlcnR5IHdpdGggaXRzIG93blxuICAgICAqIGxvY2FsIHN0b3JhZ2UuICBUaGUgZ2V0dGVyIHJldHVybnMgdGhlIHZhbHVlIGluIHRoZSBsb2NhbCBzdG9yYWdlLFxuICAgICAqIGFuZCB0aGUgc2V0dGVyIGNhbGxzIGBfc2V0UHJvcGVydHlgLCB3aGljaCB1cGRhdGVzIHRoZSBsb2NhbCBzdG9yYWdlXG4gICAgICogZm9yIHRoZSBwcm9wZXJ0eSBhbmQgZW5xdWV1ZXMgYSBgX3Byb3BlcnRpZXNDaGFuZ2VkYCBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1heSBiZSBjYWxsZWQgb24gYSBwcm90b3R5cGUgb3IgYW4gaW5zdGFuY2UuICBDYWxsaW5nXG4gICAgICogdGhpcyBtZXRob2QgbWF5IG92ZXJ3cml0ZSBhIHByb3BlcnR5IHZhbHVlIHRoYXQgYWxyZWFkeSBleGlzdHMgb25cbiAgICAgKiB0aGUgcHJvdG90eXBlL2luc3RhbmNlIGJ5IGNyZWF0aW5nIHRoZSBhY2Nlc3Nvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBOYW1lIG9mIHRoZSBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlYWRPbmx5IFdoZW4gdHJ1ZSwgbm8gc2V0dGVyIGlzIGNyZWF0ZWQ7IHRoZVxuICAgICAqICAgcHJvdGVjdGVkIGBfc2V0UHJvcGVydHlgIGZ1bmN0aW9uIG11c3QgYmUgdXNlZCB0byBzZXQgdGhlIHByb3BlcnR5XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX2NyZWF0ZVByb3BlcnR5QWNjZXNzb3IocHJvcGVydHksIHJlYWRPbmx5KSB7XG4gICAgICB0aGlzLl9hZGRQcm9wZXJ0eVRvQXR0cmlidXRlTWFwKHByb3BlcnR5KTtcbiAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgnX19kYXRhSGFzQWNjZXNzb3InKSkge1xuICAgICAgICB0aGlzLl9fZGF0YUhhc0FjY2Vzc29yID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fX2RhdGFIYXNBY2Nlc3Nvcik7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX19kYXRhSGFzQWNjZXNzb3JbcHJvcGVydHldKSB7XG4gICAgICAgIHRoaXMuX19kYXRhSGFzQWNjZXNzb3JbcHJvcGVydHldID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZGVmaW5lUHJvcGVydHlBY2Nlc3Nvcihwcm9wZXJ0eSwgcmVhZE9ubHkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIGdpdmVuIGBwcm9wZXJ0eWAgdG8gYSBtYXAgbWF0Y2hpbmcgYXR0cmlidXRlIG5hbWVzXG4gICAgICogdG8gcHJvcGVydHkgbmFtZXMsIHVzaW5nIGBhdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHlgLiBUaGlzIG1hcCBpc1xuICAgICAqIHVzZWQgd2hlbiBkZXNlcmlhbGl6aW5nIGF0dHJpYnV0ZSB2YWx1ZXMgdG8gcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBOYW1lIG9mIHRoZSBwcm9wZXJ0eVxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9hZGRQcm9wZXJ0eVRvQXR0cmlidXRlTWFwKHByb3BlcnR5KSB7XG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoJ19fZGF0YUF0dHJpYnV0ZXMnKSkge1xuICAgICAgICB0aGlzLl9fZGF0YUF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9fZGF0YUF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9fZGF0YUF0dHJpYnV0ZXNbcHJvcGVydHldKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLmNvbnN0cnVjdG9yLmF0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwcm9wZXJ0eSk7XG4gICAgICAgIHRoaXMuX19kYXRhQXR0cmlidXRlc1thdHRyXSA9IHByb3BlcnR5O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBwcm9wZXJ0eSBhY2Nlc3NvciBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBOYW1lIG9mIHRoZSBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlYWRPbmx5IFdoZW4gdHJ1ZSwgbm8gc2V0dGVyIGlzIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgICBfZGVmaW5lUHJvcGVydHlBY2Nlc3Nvcihwcm9wZXJ0eSwgcmVhZE9ubHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eSwge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSB2YWxpZC1qc2RvYyAqL1xuICAgICAgICAvKiogQHRoaXMge1Byb3BlcnRpZXNDaGFuZ2VkfSAqL1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5KHByb3BlcnR5KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqIEB0aGlzIHtQcm9wZXJ0aWVzQ2hhbmdlZH0gKi9cbiAgICAgICAgc2V0OiByZWFkT25seSA/IGZ1bmN0aW9uICgpIHt9IDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLl9fZGF0YUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX19kYXRhUmVhZHkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX19kYXRhSW52YWxpZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fX2RhdGEgPSB7fTtcbiAgICAgIHRoaXMuX19kYXRhUGVuZGluZyA9IG51bGw7XG4gICAgICB0aGlzLl9fZGF0YU9sZCA9IG51bGw7XG4gICAgICB0aGlzLl9fZGF0YUluc3RhbmNlUHJvcHMgPSBudWxsO1xuICAgICAgdGhpcy5fX3NlcmlhbGl6aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9pbml0aWFsaXplUHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpZmVjeWNsZSBjYWxsYmFjayBjYWxsZWQgd2hlbiBwcm9wZXJ0aWVzIGFyZSBlbmFibGVkIHZpYVxuICAgICAqIGBfZW5hYmxlUHJvcGVydGllc2AuXG4gICAgICpcbiAgICAgKiBVc2VycyBtYXkgb3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiB0byBpbXBsZW1lbnQgYmVoYXZpb3IgdGhhdCBpc1xuICAgICAqIGRlcGVuZGVudCBvbiB0aGUgZWxlbWVudCBoYXZpbmcgaXRzIHByb3BlcnR5IGRhdGEgaW5pdGlhbGl6ZWQsIGUuZy5cbiAgICAgKiBmcm9tIGRlZmF1bHRzIChpbml0aWFsaXplZCBmcm9tIGBjb25zdHJ1Y3RvcmAsIGBfaW5pdGlhbGl6ZVByb3BlcnRpZXNgKSxcbiAgICAgKiBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCwgb3IgdmFsdWVzIHByb3BhZ2F0ZWQgZnJvbSBob3N0IGUuZy4gdmlhXG4gICAgICogYmluZGluZ3MuICBgc3VwZXIucmVhZHkoKWAgbXVzdCBiZSBjYWxsZWQgdG8gZW5zdXJlIHRoZSBkYXRhIHN5c3RlbVxuICAgICAqIGJlY29tZXMgZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIHJlYWR5KCkge1xuICAgICAgdGhpcy5fX2RhdGFSZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLl9mbHVzaFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgbG9jYWwgc3RvcmFnZSBmb3IgcHJvcGVydHkgYWNjZXNzb3JzLlxuICAgICAqXG4gICAgICogUHJvdmlkZWQgYXMgYW4gb3ZlcnJpZGUgcG9pbnQgZm9yIHBlcmZvcm1pbmcgYW55IHNldHVwIHdvcmsgcHJpb3JcbiAgICAgKiB0byBpbml0aWFsaXppbmcgdGhlIHByb3BlcnR5IGFjY2Vzc29yIHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplUHJvcGVydGllcygpIHtcbiAgICAgIC8vIENhcHR1cmUgaW5zdGFuY2UgcHJvcGVydGllczsgdGhlc2Ugd2lsbCBiZSBzZXQgaW50byBhY2Nlc3NvcnNcbiAgICAgIC8vIGR1cmluZyBmaXJzdCBmbHVzaC4gRG9uJ3Qgc2V0IHRoZW0gaGVyZSwgc2luY2Ugd2Ugd2FudFxuICAgICAgLy8gdGhlc2UgdG8gb3ZlcndyaXRlIGRlZmF1bHRzL2NvbnN0cnVjdG9yIGFzc2lnbm1lbnRzXG4gICAgICBmb3IgKGxldCBwIGluIHRoaXMuX19kYXRhSGFzQWNjZXNzb3IpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICB0aGlzLl9fZGF0YUluc3RhbmNlUHJvcHMgPSB0aGlzLl9fZGF0YUluc3RhbmNlUHJvcHMgfHwge307XG4gICAgICAgICAgdGhpcy5fX2RhdGFJbnN0YW5jZVByb3BzW3BdID0gdGhpc1twXTtcbiAgICAgICAgICBkZWxldGUgdGhpc1twXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhdCByZWFkeSB0aW1lIHdpdGggYmFnIG9mIGluc3RhbmNlIHByb3BlcnRpZXMgdGhhdCBvdmVyd3JvdGVcbiAgICAgKiBhY2Nlc3NvcnMgd2hlbiB0aGUgZWxlbWVudCB1cGdyYWRlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNldHMgdGhlc2UgcHJvcGVydGllcyBiYWNrIGludG8gdGhlXG4gICAgICogc2V0dGVyIGF0IHJlYWR5IHRpbWUuICBUaGlzIG1ldGhvZCBpcyBwcm92aWRlZCBhcyBhbiBvdmVycmlkZVxuICAgICAqIHBvaW50IGZvciBjdXN0b21pemluZyBvciBwcm92aWRpbmcgbW9yZSBlZmZpY2llbnQgaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgQmFnIG9mIHByb3BlcnR5IHZhbHVlcyB0aGF0IHdlcmUgb3ZlcndyaXR0ZW5cbiAgICAgKiAgIHdoZW4gY3JlYXRpbmcgcHJvcGVydHkgYWNjZXNzb3JzLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplSW5zdGFuY2VQcm9wZXJ0aWVzKHByb3BzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBsb2NhbCBzdG9yYWdlIGZvciBhIHByb3BlcnR5ICh2aWEgYF9zZXRQZW5kaW5nUHJvcGVydHlgKVxuICAgICAqIGFuZCBlbnF1ZXVlcyBhIGBfcHJvZXBydGllc0NoYW5nZWRgIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IE5hbWUgb2YgdGhlIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBzZXRcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBfc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5fc2V0UGVuZGluZ1Byb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBOYW1lIG9mIHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Kn0gVmFsdWUgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBfZ2V0UHJvcGVydHkocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YVtwcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBsb2NhbCBzdG9yYWdlIGZvciBhIHByb3BlcnR5LCByZWNvcmRzIHRoZSBwcmV2aW91cyB2YWx1ZSxcbiAgICAgKiBhbmQgYWRkcyBpdCB0byB0aGUgc2V0IG9mIFwicGVuZGluZyBjaGFuZ2VzXCIgdGhhdCB3aWxsIGJlIHBhc3NlZCB0byB0aGVcbiAgICAgKiBgX3Byb3BlcnRpZXNDaGFuZ2VkYCBjYWxsYmFjay4gIFRoaXMgbWV0aG9kIGRvZXMgbm90IGVucXVldWUgdGhlXG4gICAgICogYF9wcm9wZXJ0aWVzQ2hhbmdlZGAgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHNldFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGV4dCBOb3QgdXNlZCBoZXJlOyBhZmZvcmRhbmNlIGZvciBjbG9zdXJlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBjaGFuZ2VkXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9zZXRQZW5kaW5nUHJvcGVydHkocHJvcGVydHksIHZhbHVlLCBleHQpIHtcbiAgICAgIGxldCBvbGQgPSB0aGlzLl9fZGF0YVtwcm9wZXJ0eV07XG4gICAgICBsZXQgY2hhbmdlZCA9IHRoaXMuX3Nob3VsZFByb3BlcnR5Q2hhbmdlKHByb3BlcnR5LCB2YWx1ZSwgb2xkKTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIGlmICghdGhpcy5fX2RhdGFQZW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5fX2RhdGFQZW5kaW5nID0ge307XG4gICAgICAgICAgdGhpcy5fX2RhdGFPbGQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFbnN1cmUgb2xkIGlzIGNhcHR1cmVkIGZyb20gdGhlIGxhc3QgdHVyblxuICAgICAgICBpZiAodGhpcy5fX2RhdGFPbGQgJiYgIShwcm9wZXJ0eSBpbiB0aGlzLl9fZGF0YU9sZCkpIHtcbiAgICAgICAgICB0aGlzLl9fZGF0YU9sZFtwcm9wZXJ0eV0gPSBvbGQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2RhdGFbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX19kYXRhUGVuZGluZ1twcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgICAvKipcbiAgICAgKiBNYXJrcyB0aGUgcHJvcGVydGllcyBhcyBpbnZhbGlkLCBhbmQgZW5xdWV1ZXMgYW4gYXN5bmNcbiAgICAgKiBgX3Byb3BlcnRpZXNDaGFuZ2VkYCBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9pbnZhbGlkYXRlUHJvcGVydGllcygpIHtcbiAgICAgIGlmICghdGhpcy5fX2RhdGFJbnZhbGlkICYmIHRoaXMuX19kYXRhUmVhZHkpIHtcbiAgICAgICAgdGhpcy5fX2RhdGFJbnZhbGlkID0gdHJ1ZTtcbiAgICAgICAgbWljcm90YXNrLnJ1bigoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX19kYXRhSW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5fX2RhdGFJbnZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9mbHVzaFByb3BlcnRpZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdG8gZW5hYmxlIHByb3BlcnR5IGFjY2Vzc29yIHByb2Nlc3NpbmcuIEJlZm9yZSB0aGlzIG1ldGhvZCBpc1xuICAgICAqIGNhbGxlZCBhY2Nlc3NvciB2YWx1ZXMgd2lsbCBiZSBzZXQgYnV0IHNpZGUgZWZmZWN0cyBhcmVcbiAgICAgKiBxdWV1ZWQuIFdoZW4gY2FsbGVkLCBhbnkgcGVuZGluZyBzaWRlIGVmZmVjdHMgb2NjdXIgaW1tZWRpYXRlbHkuXG4gICAgICogRm9yIGVsZW1lbnRzLCBnZW5lcmFsbHkgYGNvbm5lY3RlZENhbGxiYWNrYCBpcyBhIG5vcm1hbCBzcG90IHRvIGRvIHNvLlxuICAgICAqIEl0IGlzIHNhZmUgdG8gY2FsbCB0aGlzIG1ldGhvZCBtdWx0aXBsZSB0aW1lcyBhcyBpdCBvbmx5IHR1cm5zIG9uXG4gICAgICogcHJvcGVydHkgYWNjZXNzb3JzIG9uY2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBfZW5hYmxlUHJvcGVydGllcygpIHtcbiAgICAgIGlmICghdGhpcy5fX2RhdGFFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuX19kYXRhRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9fZGF0YUluc3RhbmNlUHJvcHMpIHtcbiAgICAgICAgICB0aGlzLl9pbml0aWFsaXplSW5zdGFuY2VQcm9wZXJ0aWVzKHRoaXMuX19kYXRhSW5zdGFuY2VQcm9wcyk7XG4gICAgICAgICAgdGhpcy5fX2RhdGFJbnN0YW5jZVByb3BzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGBfcHJvcGVydGllc0NoYW5nZWRgIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgc2V0IG9mXG4gICAgICogcGVuZGluZyBjaGFuZ2VzIChhbmQgb2xkIHZhbHVlcyByZWNvcmRlZCB3aGVuIHBlbmRpbmcgY2hhbmdlcyB3ZXJlXG4gICAgICogc2V0KSwgYW5kIHJlc2V0cyB0aGUgcGVuZGluZyBzZXQgb2YgY2hhbmdlcy4gR2VuZXJhbGx5LCB0aGlzIG1ldGhvZFxuICAgICAqIHNob3VsZCBub3QgYmUgY2FsbGVkIGluIHVzZXIgY29kZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9mbHVzaFByb3BlcnRpZXMoKSB7XG4gICAgICBjb25zdCBwcm9wcyA9IHRoaXMuX19kYXRhO1xuICAgICAgY29uc3QgY2hhbmdlZFByb3BzID0gdGhpcy5fX2RhdGFQZW5kaW5nO1xuICAgICAgY29uc3Qgb2xkID0gdGhpcy5fX2RhdGFPbGQ7XG4gICAgICBpZiAodGhpcy5fc2hvdWxkUHJvcGVydGllc0NoYW5nZShwcm9wcywgY2hhbmdlZFByb3BzLCBvbGQpKSB7XG4gICAgICAgIHRoaXMuX19kYXRhUGVuZGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX19kYXRhT2xkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcHJvcGVydGllc0NoYW5nZWQocHJvcHMsIGNoYW5nZWRQcm9wcywgb2xkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgaW4gYF9mbHVzaFByb3BlcnRpZXNgIHRvIGRldGVybWluZSBpZiBgX3Byb3BlcnRpZXNDaGFuZ2VkYFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQuIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHJldHVybnMgdHJ1ZSBpZlxuICAgICAqIHByb3BlcnRpZXMgYXJlIHBlbmRpbmcuIE92ZXJyaWRlIHRvIGN1c3RvbWl6ZSB3aGVuXG4gICAgICogYF9wcm9wZXJ0aWVzQ2hhbmdlZGAgaXMgY2FsbGVkLlxuICAgICAqIEBwYXJhbSB7IU9iamVjdH0gY3VycmVudFByb3BzIEJhZyBvZiBhbGwgY3VycmVudCBhY2Nlc3NvciB2YWx1ZXNcbiAgICAgKiBAcGFyYW0gez9PYmplY3R9IGNoYW5nZWRQcm9wcyBCYWcgb2YgcHJvcGVydGllcyBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0XG4gICAgICogICBjYWxsIHRvIGBfcHJvcGVydGllc0NoYW5nZWRgXG4gICAgICogQHBhcmFtIHs/T2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICogICBpbiBgY2hhbmdlZFByb3BzYFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgY2hhbmdlZFByb3BzIGlzIHRydXRoeVxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9zaG91bGRQcm9wZXJ0aWVzQ2hhbmdlKGN1cnJlbnRQcm9wcywgY2hhbmdlZFByb3BzLCBvbGRQcm9wcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICByZXR1cm4gQm9vbGVhbihjaGFuZ2VkUHJvcHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIGFueSBwcm9wZXJ0aWVzIHdpdGggYWNjZXNzb3JzIGNyZWF0ZWQgdmlhXG4gICAgICogYF9jcmVhdGVQcm9wZXJ0eUFjY2Vzc29yYCBoYXZlIGJlZW4gc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHshT2JqZWN0fSBjdXJyZW50UHJvcHMgQmFnIG9mIGFsbCBjdXJyZW50IGFjY2Vzc29yIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7P09iamVjdH0gY2hhbmdlZFByb3BzIEJhZyBvZiBwcm9wZXJ0aWVzIGNoYW5nZWQgc2luY2UgdGhlIGxhc3RcbiAgICAgKiAgIGNhbGwgdG8gYF9wcm9wZXJ0aWVzQ2hhbmdlZGBcbiAgICAgKiBAcGFyYW0gez9PYmplY3R9IG9sZFByb3BzIEJhZyBvZiBwcmV2aW91cyB2YWx1ZXMgZm9yIGVhY2ggcHJvcGVydHlcbiAgICAgKiAgIGluIGBjaGFuZ2VkUHJvcHNgXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX3Byb3BlcnRpZXNDaGFuZ2VkKGN1cnJlbnRQcm9wcywgY2hhbmdlZFByb3BzLCBvbGRQcm9wcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCB0byBkZXRlcm1pbmUgd2hldGhlciBhIHByb3BlcnR5IHZhbHVlIHNob3VsZCBiZVxuICAgICAqIGNvbnNpZGVyZWQgYXMgYSBjaGFuZ2UgYW5kIGNhdXNlIHRoZSBgX3Byb3BlcnRpZXNDaGFuZ2VkYCBjYWxsYmFja1xuICAgICAqIHRvIGJlIGVucXVldWVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gcmV0dXJucyBgdHJ1ZWAgaWYgYSBzdHJpY3QgZXF1YWxpdHlcbiAgICAgKiBjaGVjayBmYWlscy4gVGhlIG1ldGhvZCBhbHdheXMgcmV0dXJucyBmYWxzZSBmb3IgYE5hTmAuXG4gICAgICpcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBlLmcuIHByb3ZpZGUgc3RyaWN0ZXIgY2hlY2tpbmcgZm9yXG4gICAgICogT2JqZWN0cy9BcnJheXMgd2hlbiB1c2luZyBpbW11dGFibGUgcGF0dGVybnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgTmV3IHByb3BlcnR5IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBvbGQgUHJldmlvdXMgcHJvcGVydHkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCBhIGNoYW5nZVxuICAgICAqICAgYW5kIGVucXVldWUgYSBgX3Byb2VwcnRpZXNDaGFuZ2VkYCBjYWxsYmFja1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBfc2hvdWxkUHJvcGVydHlDaGFuZ2UocHJvcGVydHksIHZhbHVlLCBvbGQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIC8vIFN0cmljdCBlcXVhbGl0eSBjaGVja1xuICAgICAgICAob2xkICE9PSB2YWx1ZSAmJlxuICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyAob2xkPT1OYU4sIHZhbHVlPT1OYU4pIGFsd2F5cyByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgKG9sZCA9PT0gb2xkIHx8IHZhbHVlID09PSB2YWx1ZSkpXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudHMgbmF0aXZlIEN1c3RvbSBFbGVtZW50cyBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCB0b1xuICAgICAqIHNldCBhbiBhdHRyaWJ1dGUgdmFsdWUgdG8gYSBwcm9wZXJ0eSB2aWEgYF9hdHRyaWJ1dGVUb1Byb3BlcnR5YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgYXR0cmlidXRlIHRoYXQgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gb2xkIE9sZCBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgKiBAcGFyYW0gez9zdHJpbmd9IHZhbHVlIE5ldyBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgKiBAcGFyYW0gez9zdHJpbmd9IG5hbWVzcGFjZSBBdHRyaWJ1dGUgbmFtZXNwYWNlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gU3VwZXIgbWF5IG9yIG1heSBub3QgaW1wbGVtZW50IHRoZSBjYWxsYmFja1xuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGQsIHZhbHVlLCBuYW1lc3BhY2UpIHtcbiAgICAgIGlmIChvbGQgIT09IHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHN1cGVyLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaykge1xuICAgICAgICBzdXBlci5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNlcmlhbGl6ZXMgYW4gYXR0cmlidXRlIHRvIGl0cyBhc3NvY2lhdGVkIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgY2FsbHMgdGhlIGBfZGVzZXJpYWxpemVWYWx1ZWAgbWV0aG9kIHRvIGNvbnZlcnQgdGhlIHN0cmluZyB0b1xuICAgICAqIGEgdHlwZWQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlIE5hbWUgb2YgYXR0cmlidXRlIHRvIGRlc2VyaWFsaXplLlxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAgICAgKiBAcGFyYW0geyo9fSB0eXBlIHR5cGUgdG8gZGVzZXJpYWxpemUgdG8sIGRlZmF1bHRzIHRvIHRoZSB2YWx1ZVxuICAgICAqIHJldHVybmVkIGZyb20gYHR5cGVGb3JQcm9wZXJ0eWBcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9hdHRyaWJ1dGVUb1Byb3BlcnR5KGF0dHJpYnV0ZSwgdmFsdWUsIHR5cGUpIHtcbiAgICAgIGlmICghdGhpcy5fX3NlcmlhbGl6aW5nKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuX19kYXRhQXR0cmlidXRlcztcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBtYXAgJiYgbWFwW2F0dHJpYnV0ZV0gfHwgYXR0cmlidXRlO1xuICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHRoaXMuX2Rlc2VyaWFsaXplVmFsdWUodmFsdWUsIHR5cGUgfHxcbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnR5cGVGb3JQcm9wZXJ0eShwcm9wZXJ0eSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlcmlhbGl6ZXMgYSBwcm9wZXJ0eSB0byBpdHMgYXNzb2NpYXRlZCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAc3VwcHJlc3Mge2ludmFsaWRDYXN0c30gQ2xvc3VyZSBjYW4ndCBmaWd1cmUgb3V0IGB0aGlzYCBpcyBhbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWUgdG8gcmVmbGVjdC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IGF0dHJpYnV0ZSBBdHRyaWJ1dGUgbmFtZSB0byByZWZsZWN0IHRvLlxuICAgICAqIEBwYXJhbSB7Kj19IHZhbHVlIFByb3BlcnR5IHZhbHVlIHRvIHJlZmVjdC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9wcm9wZXJ0eVRvQXR0cmlidXRlKHByb3BlcnR5LCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICB0aGlzLl9fc2VyaWFsaXppbmcgPSB0cnVlO1xuICAgICAgdmFsdWUgPSAoYXJndW1lbnRzLmxlbmd0aCA8IDMpID8gdGhpc1twcm9wZXJ0eV0gOiB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlVG9Ob2RlQXR0cmlidXRlKC8qKiBAdHlwZSB7IUhUTUxFbGVtZW50fSAqLyh0aGlzKSwgdmFsdWUsXG4gICAgICAgIGF0dHJpYnV0ZSB8fCB0aGlzLmNvbnN0cnVjdG9yLmF0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwcm9wZXJ0eSkpO1xuICAgICAgdGhpcy5fX3NlcmlhbGl6aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhIHR5cGVkIHZhbHVlIHRvIGFuIEhUTUwgYXR0cmlidXRlIG9uIGEgbm9kZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGNhbGxzIHRoZSBgX3NlcmlhbGl6ZVZhbHVlYCBtZXRob2QgdG8gY29udmVydCB0aGUgdHlwZWRcbiAgICAgKiB2YWx1ZSB0byBhIHN0cmluZy4gIElmIHRoZSBgX3NlcmlhbGl6ZVZhbHVlYCBtZXRob2QgcmV0dXJucyBgdW5kZWZpbmVkYCxcbiAgICAgKiB0aGUgYXR0cmlidXRlIHdpbGwgYmUgcmVtb3ZlZCAodGhpcyBpcyB0aGUgZGVmYXVsdCBmb3IgYm9vbGVhblxuICAgICAqIHR5cGUgYGZhbHNlYCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGUgRWxlbWVudCB0byBzZXQgYXR0cmlidXRlIHRvLlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gc2VyaWFsaXplLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGUgQXR0cmlidXRlIG5hbWUgdG8gc2VyaWFsaXplIHRvLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX3ZhbHVlVG9Ob2RlQXR0cmlidXRlKG5vZGUsIHZhbHVlLCBhdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IHN0ciA9IHRoaXMuX3NlcmlhbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgIGlmIChzdHIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCBzdHIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgdHlwZWQgSmF2YVNjcmlwdCB2YWx1ZSB0byBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIHNldHRpbmcgSlMgcHJvcGVydHkgdmFsdWVzIHRvXG4gICAgICogSFRNTCBhdHRyaWJ1dGVzLiAgVXNlcnMgbWF5IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHByb3ZpZGVcbiAgICAgKiBzZXJpYWxpemF0aW9uIGZvciBjdXN0b20gdHlwZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFByb3BlcnR5IHZhbHVlIHRvIHNlcmlhbGl6ZS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfCB1bmRlZmluZWR9IFN0cmluZyBzZXJpYWxpemVkIGZyb20gdGhlIHByb3ZpZGVkXG4gICAgICogcHJvcGVydHkgIHZhbHVlLlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIF9zZXJpYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgcmV0dXJuIHZhbHVlID8gJycgOiB1bmRlZmluZWQ7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHZhbHVlICE9IG51bGwgPyB2YWx1ZS50b1N0cmluZygpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgdHlwZWQgSmF2YVNjcmlwdCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIHJlYWRpbmcgSFRNTCBhdHRyaWJ1dGUgdmFsdWVzIHRvXG4gICAgICogSlMgcHJvcGVydGllcy4gIFVzZXJzIG1heSBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwcm92aWRlXG4gICAgICogZGVzZXJpYWxpemF0aW9uIGZvciBjdXN0b20gYHR5cGVgcy4gVHlwZXMgZm9yIGBCb29sZWFuYCwgYFN0cmluZ2AsXG4gICAgICogYW5kIGBOdW1iZXJgIGNvbnZlcnQgYXR0cmlidXRlcyB0byB0aGUgZXhwZWN0ZWQgdHlwZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez9zdHJpbmd9IHZhbHVlIFZhbHVlIHRvIGRlc2VyaWFsaXplLlxuICAgICAqIEBwYXJhbSB7Kj19IHR5cGUgVHlwZSB0byBkZXNlcmlhbGl6ZSB0aGUgc3RyaW5nIHRvLlxuICAgICAqIEByZXR1cm4geyp9IFR5cGVkIHZhbHVlIGRlc2VyaWFsaXplZCBmcm9tIHRoZSBwcm92aWRlZCBzdHJpbmcuXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX2Rlc2VyaWFsaXplVmFsdWUodmFsdWUsIHR5cGUpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgcmV0dXJuICh2YWx1ZSAhPT0gbnVsbCk7XG4gICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBQcm9wZXJ0aWVzQ2hhbmdlZDtcbn0pO1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi4vdXRpbHMvYm9vdC5qcyc7XG5cbmltcG9ydCB7IGRlZHVwaW5nTWl4aW4gfSBmcm9tICcuLi91dGlscy9taXhpbi5qcyc7XG5pbXBvcnQgeyBQcm9wZXJ0aWVzQ2hhbmdlZCB9IGZyb20gJy4vcHJvcGVydGllcy1jaGFuZ2VkLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY29weSBvZiBgcHJvcHNgIHdpdGggZWFjaCBwcm9wZXJ0eSBub3JtYWxpemVkIHN1Y2ggdGhhdFxuICogdXBncmFkZWQgaXQgaXMgYW4gb2JqZWN0IHdpdGggYXQgbGVhc3QgYSB0eXBlIHByb3BlcnR5IHsgdHlwZTogVHlwZX0uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIFByb3BlcnRpZXMgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJuIHtPYmplY3R9IENvcHkgb2YgaW5wdXQgYHByb3BzYCB3aXRoIG5vcm1hbGl6ZWQgcHJvcGVydGllcyB0aGF0XG4gKiBhcmUgaW4gdGhlIGZvcm0ge3R5cGU6IFR5cGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0aWVzKHByb3BzKSB7XG4gIGNvbnN0IG91dHB1dCA9IHt9O1xuICBmb3IgKGxldCBwIGluIHByb3BzKSB7XG4gICAgY29uc3QgbyA9IHByb3BzW3BdO1xuICAgIG91dHB1dFtwXSA9ICh0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJykgPyB7dHlwZTogb30gOiBvO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qKlxuICogTWl4aW4gdGhhdCBwcm92aWRlcyBhIG1pbmltYWwgc3RhcnRpbmcgcG9pbnQgdG8gdXNpbmcgdGhlIFByb3BlcnRpZXNDaGFuZ2VkXG4gKiBtaXhpbiBieSBwcm92aWRpbmcgYSBtZWNoYW5pc20gdG8gZGVjbGFyZSBwcm9wZXJ0aWVzIGluIGEgc3RhdGljXG4gKiBnZXR0ZXIgKGUuZy4gc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkgeyByZXR1cm4geyBmb286IFN0cmluZyB9IH0pLiBDaGFuZ2VzXG4gKiBhcmUgcmVwb3J0ZWQgdmlhIHRoZSBgX3Byb3BlcnRpZXNDaGFuZ2VkYCBtZXRob2QuXG4gKlxuICogVGhpcyBtaXhpbiBwcm92aWRlcyBubyBzcGVjaWZpYyBzdXBwb3J0IGZvciByZW5kZXJpbmcuIFVzZXJzIGFyZSBleHBlY3RlZFxuICogdG8gY3JlYXRlIGEgU2hhZG93Um9vdCBhbmQgcHV0IGNvbnRlbnQgaW50byBpdCBhbmQgdXBkYXRlIGl0IGluIHdoYXRldmVyXG4gKiB3YXkgbWFrZXMgc2Vuc2UuIFRoaXMgY2FuIGJlIGRvbmUgaW4gcmVhY3Rpb24gdG8gcHJvcGVydGllcyBjaGFuZ2luZyBieVxuICogaW1wbGVtZW50aW5nIGBfcHJvcGVydGllc0NoYW5nZWRgLlxuICpcbiAqIEBtaXhpbkZ1bmN0aW9uXG4gKiBAcG9seW1lclxuICogQGFwcGxpZXNNaXhpbiBQcm9wZXJ0aWVzQ2hhbmdlZFxuICogQHN1bW1hcnkgTWl4aW4gdGhhdCBwcm92aWRlcyBhIG1pbmltYWwgc3RhcnRpbmcgcG9pbnQgZm9yIHVzaW5nXG4gKiB0aGUgUHJvcGVydGllc0NoYW5nZWQgbWl4aW4gYnkgcHJvdmlkaW5nIGEgZGVjbGFyYXRpdmUgYHByb3BlcnRpZXNgIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IFByb3BlcnRpZXNNaXhpbiA9IGRlZHVwaW5nTWl4aW4oc3VwZXJDbGFzcyA9PiB7XG5cbiAvKipcbiAgKiBAY29uc3RydWN0b3JcbiAgKiBAaW1wbGVtZW50cyB7UG9seW1lcl9Qcm9wZXJ0aWVzQ2hhbmdlZH1cbiAgKiBAcHJpdmF0ZVxuICAqL1xuIGNvbnN0IGJhc2UgPSBQcm9wZXJ0aWVzQ2hhbmdlZChzdXBlckNsYXNzKTtcblxuIC8qKlxuICAqIFJldHVybnMgdGhlIHN1cGVyIGNsYXNzIGNvbnN0cnVjdG9yIGZvciB0aGUgZ2l2ZW4gY2xhc3MsIGlmIGl0IGlzIGFuXG4gICogaW5zdGFuY2Ugb2YgdGhlIFByb3BlcnRpZXNNaXhpbi5cbiAgKlxuICAqIEBwYXJhbSB7IVByb3BlcnRpZXNNaXhpbkNvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvciBQcm9wZXJ0aWVzTWl4aW4gY29uc3RydWN0b3JcbiAgKiBAcmV0dXJuIHs/UHJvcGVydGllc01peGluQ29uc3RydWN0b3J9IFN1cGVyIGNsYXNzIGNvbnN0cnVjdG9yXG4gICovXG4gZnVuY3Rpb24gc3VwZXJQcm9wZXJ0aWVzQ2xhc3MoY29uc3RydWN0b3IpIHtcbiAgIGNvbnN0IHN1cGVyQ3RvciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb25zdHJ1Y3Rvcik7XG5cbiAgIC8vIE5vdGUsIHRoZSBgUHJvcGVydGllc01peGluYCBjbGFzcyBiZWxvdyBvbmx5IHJlZmVycyB0byB0aGUgY2xhc3NcbiAgIC8vIGdlbmVyYXRlZCBieSB0aGlzIGNhbGwgdG8gdGhlIG1peGluOyB0aGUgaW5zdGFuY2VvZiB0ZXN0IG9ubHkgd29ya3NcbiAgIC8vIGJlY2F1c2UgdGhlIG1peGluIGlzIGRlZHVwZWQgYW5kIGd1YXJhbnRlZWQgb25seSB0byBhcHBseSBvbmNlLCBoZW5jZVxuICAgLy8gYWxsIGNvbnN0cnVjdG9ycyBpbiBhIHByb3RvIGNoYWluIHdpbGwgc2VlIHRoZSBzYW1lIGBQcm9wZXJ0aWVzTWl4aW5gXG4gICByZXR1cm4gKHN1cGVyQ3Rvci5wcm90b3R5cGUgaW5zdGFuY2VvZiBQcm9wZXJ0aWVzTWl4aW4pID9cbiAgICAgLyoqIEB0eXBlIHshUHJvcGVydGllc01peGluQ29uc3RydWN0b3J9ICovIChzdXBlckN0b3IpIDogbnVsbDtcbiB9XG5cbiAvKipcbiAgKiBSZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZiB0aGUgYHByb3BlcnRpZXNgIG9iamVjdCBmb3IgdGhlXG4gICogZ2l2ZW4gY2xhc3MuIFByb3BlcnRpZXMgbm90IGluIG9iamVjdCBmb3JtYXQgYXJlIGNvbnZlcnRlZCB0byBhdFxuICAqIGxlYXN0IHt0eXBlfS5cbiAgKlxuICAqIEBwYXJhbSB7UHJvcGVydGllc01peGluQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yIFByb3BlcnRpZXNNaXhpbiBjb25zdHJ1Y3RvclxuICAqIEByZXR1cm4ge09iamVjdH0gTWVtb2l6ZWQgcHJvcGVydGllcyBvYmplY3RcbiAgKi9cbiBmdW5jdGlvbiBvd25Qcm9wZXJ0aWVzKGNvbnN0cnVjdG9yKSB7XG4gICBpZiAoIWNvbnN0cnVjdG9yLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ19fb3duUHJvcGVydGllcycsIGNvbnN0cnVjdG9yKSkpIHtcbiAgICAgbGV0IHByb3BzID0gbnVsbDtcblxuICAgICBpZiAoY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgncHJvcGVydGllcycsIGNvbnN0cnVjdG9yKSkpIHtcbiAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gY29uc3RydWN0b3IucHJvcGVydGllcztcblxuICAgICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BzID0gbm9ybWFsaXplUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICAgICB9XG4gICAgIH1cblxuICAgICBjb25zdHJ1Y3Rvci5fX293blByb3BlcnRpZXMgPSBwcm9wcztcbiAgIH1cbiAgIHJldHVybiBjb25zdHJ1Y3Rvci5fX293blByb3BlcnRpZXM7XG4gfVxuXG4gLyoqXG4gICogQHBvbHltZXJcbiAgKiBAbWl4aW5DbGFzc1xuICAqIEBleHRlbmRzIHtiYXNlfVxuICAqIEBpbXBsZW1lbnRzIHtQb2x5bWVyX1Byb3BlcnRpZXNNaXhpbn1cbiAgKiBAdW5yZXN0cmljdGVkXG4gICovXG4gY2xhc3MgUHJvcGVydGllc01peGluIGV4dGVuZHMgYmFzZSB7XG5cbiAgIC8qKlxuICAgICogSW1wbGVtZW50cyBzdGFuZGFyZCBjdXN0b20gZWxlbWVudHMgZ2V0dGVyIHRvIG9ic2VydmVzIHRoZSBhdHRyaWJ1dGVzXG4gICAgKiBsaXN0ZWQgaW4gYHByb3BlcnRpZXNgLlxuICAgICogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gSW50ZXJmYWNlcyBpbiBjbG9zdXJlIGRvIG5vdCBpbmhlcml0IHN0YXRpY3MsIGJ1dCBjbGFzc2VzIGRvXG4gICAgKi9cbiAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICBjb25zdCBwcm9wcyA9IHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgIHJldHVybiBwcm9wcyA/IE9iamVjdC5rZXlzKHByb3BzKS5tYXAocCA9PiB0aGlzLmF0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwKSkgOiBbXTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBGaW5hbGl6ZXMgYW4gZWxlbWVudCBkZWZpbml0aW9uLCBpbmNsdWRpbmcgZW5zdXJpbmcgYW55IHN1cGVyIGNsYXNzZXNcbiAgICAqIGFyZSBhbHNvIGZpbmFsaXplZC4gVGhpcyBpbmNsdWRlcyBlbnN1cmluZyBwcm9wZXJ0eVxuICAgICogYWNjZXNzb3JzIGV4aXN0IG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZS4gVGhpcyBtZXRob2QgY2FsbHNcbiAgICAqIGBfZmluYWxpemVDbGFzc2AgdG8gZmluYWxpemUgZWFjaCBjb25zdHJ1Y3RvciBpbiB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgICogQHJldHVybiB7dm9pZH1cbiAgICAqL1xuICAgc3RhdGljIGZpbmFsaXplKCkge1xuICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnX19maW5hbGl6ZWQnLCB0aGlzKSkpIHtcbiAgICAgICBjb25zdCBzdXBlckN0b3IgPSBzdXBlclByb3BlcnRpZXNDbGFzcygvKiogQHR5cGUgeyFQcm9wZXJ0aWVzTWl4aW5Db25zdHJ1Y3Rvcn0gKi8odGhpcykpO1xuICAgICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgICAgIHN1cGVyQ3Rvci5maW5hbGl6ZSgpO1xuICAgICAgIH1cbiAgICAgICB0aGlzLl9fZmluYWxpemVkID0gdHJ1ZTtcbiAgICAgICB0aGlzLl9maW5hbGl6ZUNsYXNzKCk7XG4gICAgIH1cbiAgIH1cblxuICAgLyoqXG4gICAgKiBGaW5hbGl6ZSBhbiBlbGVtZW50IGNsYXNzLiBUaGlzIGluY2x1ZGVzIGVuc3VyaW5nIHByb3BlcnR5XG4gICAgKiBhY2Nlc3NvcnMgZXhpc3Qgb24gdGhlIGVsZW1lbnQgcHJvdG90eXBlLiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnlcbiAgICAqIGBmaW5hbGl6ZWAgYW5kIGZpbmFsaXplcyB0aGUgY2xhc3MgY29uc3RydWN0b3IuXG4gICAgKlxuICAgICogQHByb3RlY3RlZFxuICAgICovXG4gICBzdGF0aWMgX2ZpbmFsaXplQ2xhc3MoKSB7XG4gICAgIGNvbnN0IHByb3BzID0gb3duUHJvcGVydGllcygvKiogQHR5cGUgeyFQcm9wZXJ0aWVzTWl4aW5Db25zdHJ1Y3Rvcn0gKi8odGhpcykpO1xuICAgICBpZiAocHJvcHMpIHtcbiAgICAgICB0aGlzLmNyZWF0ZVByb3BlcnRpZXMocHJvcHMpO1xuICAgICB9XG4gICB9XG5cbiAgIC8qKlxuICAgICogUmV0dXJucyBhIG1lbW9pemVkIHZlcnNpb24gb2YgYWxsIHByb3BlcnRpZXMsIGluY2x1ZGluZyB0aG9zZSBpbmhlcml0ZWRcbiAgICAqIGZyb20gc3VwZXIgY2xhc3Nlcy4gUHJvcGVydGllcyBub3QgaW4gb2JqZWN0IGZvcm1hdCBhcmUgY29udmVydGVkIHRvXG4gICAgKiBhdCBsZWFzdCB7dHlwZX0uXG4gICAgKlxuICAgICogQHJldHVybiB7T2JqZWN0fSBPYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciB0aGlzIGNsYXNzXG4gICAgKiBAcHJvdGVjdGVkXG4gICAgKi9cbiAgIHN0YXRpYyBnZXQgX3Byb3BlcnRpZXMoKSB7XG4gICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShcbiAgICAgICBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdfX3Byb3BlcnRpZXMnLCB0aGlzKSkpIHtcbiAgICAgICBjb25zdCBzdXBlckN0b3IgPSBzdXBlclByb3BlcnRpZXNDbGFzcygvKiogQHR5cGUgeyFQcm9wZXJ0aWVzTWl4aW5Db25zdHJ1Y3Rvcn0gKi8odGhpcykpO1xuICAgICAgIHRoaXMuX19wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgIHN1cGVyQ3RvciAmJiBzdXBlckN0b3IuX3Byb3BlcnRpZXMsXG4gICAgICAgICBvd25Qcm9wZXJ0aWVzKC8qKiBAdHlwZSB7UHJvcGVydGllc01peGluQ29uc3RydWN0b3J9ICovKHRoaXMpKSk7XG4gICAgIH1cbiAgICAgcmV0dXJuIHRoaXMuX19wcm9wZXJ0aWVzO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE92ZXJyaWRlcyBgUHJvcGVydGllc0NoYW5nZWRgIG1ldGhvZCB0byByZXR1cm4gdHlwZSBzcGVjaWZpZWQgaW4gdGhlXG4gICAgKiBzdGF0aWMgYHByb3BlcnRpZXNgIG9iamVjdCBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiBwcm9wZXJ0eVxuICAgICogQHJldHVybiB7Kn0gVHlwZSB0byB3aGljaCB0byBkZXNlcmlhbGl6ZSBhdHRyaWJ1dGVcbiAgICAqXG4gICAgKiBAcHJvdGVjdGVkXG4gICAgKi9cbiAgIHN0YXRpYyB0eXBlRm9yUHJvcGVydHkobmFtZSkge1xuICAgICBjb25zdCBpbmZvID0gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICAgcmV0dXJuIGluZm8gJiYgaW5mby50eXBlO1xuICAgfVxuXG4gICAvKipcbiAgICAqIE92ZXJyaWRlcyBgUHJvcGVydGllc0NoYW5nZWRgIG1ldGhvZCBhbmQgYWRkcyBhIGNhbGwgdG9cbiAgICAqIGBmaW5hbGl6ZWAgd2hpY2ggbGF6aWx5IGNvbmZpZ3VyZXMgdGhlIGVsZW1lbnQncyBwcm9wZXJ0eSBhY2Nlc3NvcnMuXG4gICAgKiBAb3ZlcnJpZGVcbiAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgKi9cbiAgIF9pbml0aWFsaXplUHJvcGVydGllcygpIHtcbiAgICAgdGhpcy5jb25zdHJ1Y3Rvci5maW5hbGl6ZSgpO1xuICAgICBzdXBlci5faW5pdGlhbGl6ZVByb3BlcnRpZXMoKTtcbiAgIH1cblxuICAgLyoqXG4gICAgKiBDYWxsZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byBhIGRvY3VtZW50LlxuICAgICogQ2FsbHMgYF9lbmFibGVQcm9wZXJ0aWVzYCB0byB0dXJuIG9uIHByb3BlcnR5IHN5c3RlbSBmcm9tXG4gICAgKiBgUHJvcGVydGllc0NoYW5nZWRgLlxuICAgICogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gU3VwZXIgbWF5IG9yIG1heSBub3QgaW1wbGVtZW50IHRoZSBjYWxsYmFja1xuICAgICogQHJldHVybiB7dm9pZH1cbiAgICAqIEBvdmVycmlkZVxuICAgICovXG4gICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgaWYgKHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKSB7XG4gICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgfVxuICAgICB0aGlzLl9lbmFibGVQcm9wZXJ0aWVzKCk7XG4gICB9XG5cbiAgIC8qKlxuICAgICogQ2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaXMgcmVtb3ZlZCBmcm9tIGEgZG9jdW1lbnRcbiAgICAqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9IFN1cGVyIG1heSBvciBtYXkgbm90IGltcGxlbWVudCB0aGUgY2FsbGJhY2tcbiAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgKiBAb3ZlcnJpZGVcbiAgICAqL1xuICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgIGlmIChzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaykge1xuICAgICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgIH1cbiAgIH1cblxuIH1cblxuIHJldHVybiBQcm9wZXJ0aWVzTWl4aW47XG5cbn0pO1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi4vdXRpbHMvYm9vdC5qcyc7XG5cbmltcG9ydCB7IGRlZHVwaW5nTWl4aW4gfSBmcm9tICcuLi91dGlscy9taXhpbi5qcyc7XG5pbXBvcnQgeyBjYW1lbFRvRGFzaENhc2UsIGRhc2hUb0NhbWVsQ2FzZSB9IGZyb20gJy4uL3V0aWxzL2Nhc2UtbWFwLmpzJztcbmltcG9ydCB7IFByb3BlcnRpZXNDaGFuZ2VkIH0gZnJvbSAnLi9wcm9wZXJ0aWVzLWNoYW5nZWQuanMnO1xuXG4vLyBTYXZlIG1hcCBvZiBuYXRpdmUgcHJvcGVydGllczsgdGhpcyBmb3JtcyBhIGJsYWNrbGlzdCBvciBwcm9wZXJ0aWVzXG4vLyB0aGF0IHdvbid0IGhhdmUgdGhlaXIgdmFsdWVzIFwic2F2ZWRcIiBieSBgc2F2ZUFjY2Vzc29yVmFsdWVgLCBzaW5jZVxuLy8gcmVhZGluZyBmcm9tIGFuIEhUTUxFbGVtZW50IGFjY2Vzc29yIGZyb20gdGhlIGNvbnRleHQgb2YgYSBwcm90b3R5cGUgdGhyb3dzXG5jb25zdCBuYXRpdmVQcm9wZXJ0aWVzID0ge307XG5sZXQgcHJvdG8gPSBIVE1MRWxlbWVudC5wcm90b3R5cGU7XG53aGlsZSAocHJvdG8pIHtcbiAgbGV0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pO1xuICBmb3IgKGxldCBpPTA7IGk8cHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICBuYXRpdmVQcm9wZXJ0aWVzW3Byb3BzW2ldXSA9IHRydWU7XG4gIH1cbiAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gc2F2ZSB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSB0aGF0IHdpbGwgYmUgb3ZlcnJpZGRlbiB3aXRoXG4gKiBhbiBhY2Nlc3Nvci4gSWYgdGhlIGBtb2RlbGAgaXMgYSBwcm90b3R5cGUsIHRoZSB2YWx1ZXMgd2lsbCBiZSBzYXZlZFxuICogaW4gYF9fZGF0YVByb3RvYCwgYW5kIGl0J3MgdXAgdG8gdGhlIHVzZXIgKG9yIGRvd25zdHJlYW0gbWl4aW4pIHRvXG4gKiBkZWNpZGUgaG93L3doZW4gdG8gc2V0IHRoZXNlIHZhbHVlcyBiYWNrIGludG8gdGhlIGFjY2Vzc29ycy5cbiAqIElmIGBtb2RlbGAgaXMgYWxyZWFkeSBhbiBpbnN0YW5jZSAoaXQgaGFzIGEgYF9fZGF0YWAgcHJvcGVydHkpLCB0aGVuXG4gKiB0aGUgdmFsdWUgd2lsbCBiZSBzZXQgYXMgYSBwZW5kaW5nIHByb3BlcnR5LCBtZWFuaW5nIHRoZSB1c2VyIHNob3VsZFxuICogY2FsbCBgX2ludmFsaWRhdGVQcm9wZXJ0aWVzYCBvciBgX2ZsdXNoUHJvcGVydGllc2AgdG8gdGFrZSBlZmZlY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbW9kZWwgUHJvdG90eXBlIG9yIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiBwcm9wZXJ0eVxuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmVBY2Nlc3NvclZhbHVlKG1vZGVsLCBwcm9wZXJ0eSkge1xuICAvLyBEb24ndCByZWFkL3N0b3JlIHZhbHVlIGZvciBhbnkgbmF0aXZlIHByb3BlcnRpZXMgc2luY2UgdGhleSBjb3VsZCB0aHJvd1xuICBpZiAoIW5hdGl2ZVByb3BlcnRpZXNbcHJvcGVydHldKSB7XG4gICAgbGV0IHZhbHVlID0gbW9kZWxbcHJvcGVydHldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAobW9kZWwuX19kYXRhKSB7XG4gICAgICAgIC8vIEFkZGluZyBhY2Nlc3NvciB0byBpbnN0YW5jZTsgdXBkYXRlIHRoZSBwcm9wZXJ0eVxuICAgICAgICAvLyBJdCBpcyB0aGUgdXNlcidzIHJlc3BvbnNpYmlsaXR5IHRvIGNhbGwgX2ZsdXNoUHJvcGVydGllc1xuICAgICAgICBtb2RlbC5fc2V0UGVuZGluZ1Byb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGRpbmcgYWNjZXNzb3IgdG8gcHJvdG87IHNhdmUgcHJvdG8ncyB2YWx1ZSBmb3IgaW5zdGFuY2UtdGltZSB1c2VcbiAgICAgICAgaWYgKCFtb2RlbC5fX2RhdGFQcm90bykge1xuICAgICAgICAgIG1vZGVsLl9fZGF0YVByb3RvID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ19fZGF0YVByb3RvJywgbW9kZWwpKSkge1xuICAgICAgICAgIG1vZGVsLl9fZGF0YVByb3RvID0gT2JqZWN0LmNyZWF0ZShtb2RlbC5fX2RhdGFQcm90byk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kZWwuX19kYXRhUHJvdG9bcHJvcGVydHldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRWxlbWVudCBjbGFzcyBtaXhpbiB0aGF0IHByb3ZpZGVzIGJhc2ljIG1ldGEtcHJvZ3JhbW1pbmcgZm9yIGNyZWF0aW5nIG9uZVxuICogb3IgbW9yZSBwcm9wZXJ0eSBhY2Nlc3NvcnMgKGdldHRlci9zZXR0ZXIgcGFpcikgdGhhdCBlbnF1ZXVlIGFuIGFzeW5jXG4gKiAoYmF0Y2hlZCkgYF9wcm9wZXJ0aWVzQ2hhbmdlZGAgY2FsbGJhY2suXG4gKlxuICogRm9yIGJhc2ljIHVzYWdlIG9mIHRoaXMgbWl4aW46XG4gKlxuICogLSAgIERlY2xhcmUgYXR0cmlidXRlcyB0byBvYnNlcnZlIHZpYSB0aGUgc3RhbmRhcmQgYHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKClgLiBVc2VcbiAqICAgICBgZGFzaC1jYXNlYCBhdHRyaWJ1dGUgbmFtZXMgdG8gcmVwcmVzZW50IGBjYW1lbENhc2VgIHByb3BlcnR5IG5hbWVzLlxuICogLSAgIEltcGxlbWVudCB0aGUgYF9wcm9wZXJ0aWVzQ2hhbmdlZGAgY2FsbGJhY2sgb24gdGhlIGNsYXNzLlxuICogLSAgIENhbGwgYE15Q2xhc3MuY3JlYXRlUHJvcGVydGllc0ZvckF0dHJpYnV0ZXMoKWAgKipvbmNlKiogb24gdGhlIGNsYXNzIHRvIGdlbmVyYXRlXG4gKiAgICAgcHJvcGVydHkgYWNjZXNzb3JzIGZvciBlYWNoIG9ic2VydmVkIGF0dHJpYnV0ZS4gVGhpcyBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgdGhlIGZpcnN0XG4gKiAgICAgaW5zdGFuY2UgaXMgY3JlYXRlZCwgZm9yIGV4YW1wbGUsIGJ5IGNhbGxpbmcgaXQgYmVmb3JlIGNhbGxpbmcgYGN1c3RvbUVsZW1lbnRzLmRlZmluZWAuXG4gKiAgICAgSXQgY2FuIGFsc28gYmUgY2FsbGVkIGxhemlseSBmcm9tIHRoZSBlbGVtZW50J3MgYGNvbnN0cnVjdG9yYCwgYXMgbG9uZyBhcyBpdCdzIGd1YXJkZWQgc29cbiAqICAgICB0aGF0IHRoZSBjYWxsIGlzIG9ubHkgbWFkZSBvbmNlLCB3aGVuIHRoZSBmaXJzdCBpbnN0YW5jZSBpcyBjcmVhdGVkLlxuICogLSAgIENhbGwgYHRoaXMuX2VuYWJsZVByb3BlcnRpZXMoKWAgaW4gdGhlIGVsZW1lbnQncyBgY29ubmVjdGVkQ2FsbGJhY2tgIHRvIGVuYWJsZVxuICogICAgIHRoZSBhY2Nlc3NvcnMuXG4gKlxuICogQW55IGBvYnNlcnZlZEF0dHJpYnV0ZXNgIHdpbGwgYXV0b21hdGljYWxseSBiZVxuICogZGVzZXJpYWxpemVkIHZpYSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCBhbmQgc2V0IHRvIHRoZSBhc3NvY2lhdGVkXG4gKiBwcm9wZXJ0eSB1c2luZyBgZGFzaC1jYXNlYC10by1gY2FtZWxDYXNlYCBjb252ZW50aW9uLlxuICpcbiAqIEBtaXhpbkZ1bmN0aW9uXG4gKiBAcG9seW1lclxuICogQGFwcGxpZXNNaXhpbiBQcm9wZXJ0aWVzQ2hhbmdlZFxuICogQHN1bW1hcnkgRWxlbWVudCBjbGFzcyBtaXhpbiBmb3IgcmVhY3RpbmcgdG8gcHJvcGVydHkgY2hhbmdlcyBmcm9tXG4gKiAgIGdlbmVyYXRlZCBwcm9wZXJ0eSBhY2Nlc3NvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBQcm9wZXJ0eUFjY2Vzc29ycyA9IGRlZHVwaW5nTWl4aW4oc3VwZXJDbGFzcyA9PiB7XG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7c3VwZXJDbGFzc31cbiAgICogQGltcGxlbWVudHMge1BvbHltZXJfUHJvcGVydGllc0NoYW5nZWR9XG4gICAqIEB1bnJlc3RyaWN0ZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gICBjb25zdCBiYXNlID0gUHJvcGVydGllc0NoYW5nZWQoc3VwZXJDbGFzcyk7XG5cbiAgLyoqXG4gICAqIEBwb2x5bWVyXG4gICAqIEBtaXhpbkNsYXNzXG4gICAqIEBpbXBsZW1lbnRzIHtQb2x5bWVyX1Byb3BlcnR5QWNjZXNzb3JzfVxuICAgKiBAZXh0ZW5kcyB7YmFzZX1cbiAgICogQHVucmVzdHJpY3RlZFxuICAgKi9cbiAgY2xhc3MgUHJvcGVydHlBY2Nlc3NvcnMgZXh0ZW5kcyBiYXNlIHtcblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBwcm9wZXJ0eSBhY2Nlc3NvcnMgZm9yIGFsbCBhdHRyaWJ1dGVzIGluIHRoZSBzdGFuZGFyZFxuICAgICAqIHN0YXRpYyBgb2JzZXJ2ZWRBdHRyaWJ1dGVzYCBhcnJheS5cbiAgICAgKlxuICAgICAqIEF0dHJpYnV0ZSBuYW1lcyBhcmUgbWFwcGVkIHRvIHByb3BlcnR5IG5hbWVzIHVzaW5nIHRoZSBgZGFzaC1jYXNlYCB0b1xuICAgICAqIGBjYW1lbENhc2VgIGNvbnZlbnRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVByb3BlcnRpZXNGb3JBdHRyaWJ1dGVzKCkge1xuICAgICAgbGV0IGEkID0gdGhpcy5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpPTA7IGkgPCBhJC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnByb3RvdHlwZS5fY3JlYXRlUHJvcGVydHlBY2Nlc3NvcihkYXNoVG9DYW1lbENhc2UoYSRbaV0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGF0dHJpYnV0ZSBuYW1lIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqIEJ5IGRlZmF1bHQsIGNvbnZlcnRzIGNhbWVsIHRvIGRhc2ggY2FzZSwgZS5nLiBgZm9vQmFyYCB0byBgZm9vLWJhcmAuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRvIGNvbnZlcnRcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IEF0dHJpYnV0ZSBuYW1lIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBhdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBjYW1lbFRvRGFzaENhc2UocHJvcGVydHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBQcm9wZXJ0aWVzQ2hhbmdlZCBpbXBsZW1lbnRhdGlvbiB0byBpbml0aWFsaXplIHZhbHVlcyBmb3JcbiAgICAgKiBhY2Nlc3NvcnMgY3JlYXRlZCBmb3IgdmFsdWVzIHRoYXQgYWxyZWFkeSBleGlzdGVkIG9uIHRoZSBlbGVtZW50XG4gICAgICogcHJvdG90eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2luaXRpYWxpemVQcm9wZXJ0aWVzKCkge1xuICAgICAgaWYgKHRoaXMuX19kYXRhUHJvdG8pIHtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZVByb3RvUHJvcGVydGllcyh0aGlzLl9fZGF0YVByb3RvKTtcbiAgICAgICAgdGhpcy5fX2RhdGFQcm90byA9IG51bGw7XG4gICAgICB9XG4gICAgICBzdXBlci5faW5pdGlhbGl6ZVByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYXQgaW5zdGFuY2UgdGltZSB3aXRoIGJhZyBvZiBwcm9wZXJ0aWVzIHRoYXQgd2VyZSBvdmVyd3JpdHRlblxuICAgICAqIGJ5IGFjY2Vzc29ycyBvbiB0aGUgcHJvdG90eXBlIHdoZW4gYWNjZXNzb3JzIHdlcmUgY3JlYXRlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNldHMgdGhlc2UgcHJvcGVydGllcyBiYWNrIGludG8gdGhlXG4gICAgICogc2V0dGVyIGF0IGluc3RhbmNlIHRpbWUuICBUaGlzIG1ldGhvZCBpcyBwcm92aWRlZCBhcyBhbiBvdmVycmlkZVxuICAgICAqIHBvaW50IGZvciBjdXN0b21pemluZyBvciBwcm92aWRpbmcgbW9yZSBlZmZpY2llbnQgaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgQmFnIG9mIHByb3BlcnR5IHZhbHVlcyB0aGF0IHdlcmUgb3ZlcndyaXR0ZW5cbiAgICAgKiAgIHdoZW4gY3JlYXRpbmcgcHJvcGVydHkgYWNjZXNzb3JzLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9pbml0aWFsaXplUHJvdG9Qcm9wZXJ0aWVzKHByb3BzKSB7XG4gICAgICBmb3IgKGxldCBwIGluIHByb3BzKSB7XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnR5KHAsIHByb3BzW3BdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZSBlbGVtZW50IGhhcyB0aGUgZ2l2ZW4gYXR0cmlidXRlLiBJZiBpdCBkb2VzIG5vdCxcbiAgICAgKiBhc3NpZ25zIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgYXR0cmlidXRlLlxuICAgICAqXG4gICAgICogQHN1cHByZXNzIHtpbnZhbGlkQ2FzdHN9IENsb3N1cmUgY2FuJ3QgZmlndXJlIG91dCBgdGhpc2AgaXMgaW5mYWN0IGFuIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGUgTmFtZSBvZiBhdHRyaWJ1dGUgdG8gZW5zdXJlIGlzIHNldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIF9lbnN1cmVBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgY29uc3QgZWwgPSAvKiogQHR5cGUgeyFIVE1MRWxlbWVudH0gKi8odGhpcyk7XG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlVG9Ob2RlQXR0cmlidXRlKGVsLCB2YWx1ZSwgYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZXMgUHJvcGVydGllc0NoYW5nZWQgaW1wbGVtZW50aW9uIHRvIHNlcmlhbGl6ZSBvYmplY3RzIGFzIEpTT04uXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFByb3BlcnR5IHZhbHVlIHRvIHNlcmlhbGl6ZS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmcgfCB1bmRlZmluZWR9IFN0cmluZyBzZXJpYWxpemVkIGZyb20gdGhlIHByb3ZpZGVkIHByb3BlcnR5IHZhbHVlLlxuICAgICAqL1xuICAgIF9zZXJpYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tZmFsbHRocm91Z2ggKi9cbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goeCkge1xuICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLl9zZXJpYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSB0eXBlZCBKYXZhU2NyaXB0IHZhbHVlLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IFBvbHltZXIgd2hlbiByZWFkaW5nIEhUTUwgYXR0cmlidXRlIHZhbHVlcyB0b1xuICAgICAqIEpTIHByb3BlcnRpZXMuICBVc2VycyBtYXkgb3ZlcnJpZGUgdGhpcyBtZXRob2Qgb24gUG9seW1lciBlbGVtZW50XG4gICAgICogcHJvdG90eXBlcyB0byBwcm92aWRlIGRlc2VyaWFsaXphdGlvbiBmb3IgY3VzdG9tIGB0eXBlYHMuICBOb3RlLFxuICAgICAqIHRoZSBgdHlwZWAgYXJndW1lbnQgaXMgdGhlIHZhbHVlIG9mIHRoZSBgdHlwZWAgZmllbGQgcHJvdmlkZWQgaW4gdGhlXG4gICAgICogYHByb3BlcnRpZXNgIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBhIGdpdmVuIHByb3BlcnR5LCBhbmQgaXNcbiAgICAgKiBieSBjb252ZW50aW9uIHRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIHR5cGUgdG8gZGVzZXJpYWxpemUuXG4gICAgICpcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlIHRvIGRlc2VyaWFsaXplLlxuICAgICAqIEBwYXJhbSB7Kj19IHR5cGUgVHlwZSB0byBkZXNlcmlhbGl6ZSB0aGUgc3RyaW5nIHRvLlxuICAgICAqIEByZXR1cm4geyp9IFR5cGVkIHZhbHVlIGRlc2VyaWFsaXplZCBmcm9tIHRoZSBwcm92aWRlZCBzdHJpbmcuXG4gICAgICovXG4gICAgX2Rlc2VyaWFsaXplVmFsdWUodmFsdWUsIHR5cGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGUgeyp9XG4gICAgICAgKi9cbiAgICAgIGxldCBvdXRWYWx1ZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIE9iamVjdDpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3V0VmFsdWUgPSBKU09OLnBhcnNlKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyh2YWx1ZSkpO1xuICAgICAgICAgIH0gY2F0Y2goeCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgbm9uLUpTT04gbGl0ZXJhbHMgbGlrZSBTdHJpbmdzIGFuZCBOdW1iZXJzXG4gICAgICAgICAgICBvdXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3V0VmFsdWUgPSBKU09OLnBhcnNlKC8qKiBAdHlwZSB7c3RyaW5nfSAqLyh2YWx1ZSkpO1xuICAgICAgICAgIH0gY2F0Y2goeCkge1xuICAgICAgICAgICAgb3V0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBQb2x5bWVyOjpBdHRyaWJ1dGVzOiBjb3VsZG4ndCBkZWNvZGUgQXJyYXkgYXMgSlNPTjogJHt2YWx1ZX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRGF0ZTpcbiAgICAgICAgICBvdXRWYWx1ZSA9IGlzTmFOKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgIG91dFZhbHVlID0gbmV3IERhdGUob3V0VmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG91dFZhbHVlID0gc3VwZXIuX2Rlc2VyaWFsaXplVmFsdWUodmFsdWUsIHR5cGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dFZhbHVlO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWZhbGx0aHJvdWdoICovXG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZXMgUHJvcGVydGllc0NoYW5nZWQgaW1wbGVtZW50YXRpb24gdG8gc2F2ZSBleGlzdGluZyBwcm90b3R5cGVcbiAgICAgKiBwcm9wZXJ0eSB2YWx1ZSBzbyB0aGF0IGl0IGNhbiBiZSByZXNldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiB0aGUgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSByZWFkT25seSBXaGVuIHRydWUsIG5vIHNldHRlciBpcyBjcmVhdGVkXG4gICAgICpcbiAgICAgKiBXaGVuIGNhbGxpbmcgb24gYSBwcm90b3R5cGUsIGFueSBvdmVyd3JpdHRlbiB2YWx1ZXMgYXJlIHNhdmVkIGluXG4gICAgICogYF9fZGF0YVByb3RvYCwgYW5kIGl0IGlzIHVwIHRvIHRoZSBzdWJjbGFzc2VyIHRvIGRlY2lkZSBob3cvd2hlblxuICAgICAqIHRvIHNldCB0aG9zZSBwcm9wZXJ0aWVzIGJhY2sgaW50byB0aGUgYWNjZXNzb3IuICBXaGVuIGNhbGxpbmcgb24gYW5cbiAgICAgKiBpbnN0YW5jZSwgdGhlIG92ZXJ3cml0dGVuIHZhbHVlIGlzIHNldCB2aWEgYF9zZXRQZW5kaW5nUHJvcGVydHlgLFxuICAgICAqIGFuZCB0aGUgdXNlciBzaG91bGQgY2FsbCBgX2ludmFsaWRhdGVQcm9wZXJ0aWVzYCBvciBgX2ZsdXNoUHJvcGVydGllc2BcbiAgICAgKiBmb3IgdGhlIHZhbHVlcyB0byB0YWtlIGVmZmVjdC5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBfZGVmaW5lUHJvcGVydHlBY2Nlc3Nvcihwcm9wZXJ0eSwgcmVhZE9ubHkpIHtcbiAgICAgIHNhdmVBY2Nlc3NvclZhbHVlKHRoaXMsIHByb3BlcnR5KTtcbiAgICAgIHN1cGVyLl9kZWZpbmVQcm9wZXJ0eUFjY2Vzc29yKHByb3BlcnR5LCByZWFkT25seSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlicmFyeSBjcmVhdGVkIGFuIGFjY2Vzc29yIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYW4gYWNjZXNzb3Igd2FzIGNyZWF0ZWRcbiAgICAgKi9cbiAgICBfaGFzQWNjZXNzb3IocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZGF0YUhhc0FjY2Vzc29yICYmIHRoaXMuX19kYXRhSGFzQWNjZXNzb3JbcHJvcGVydHldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IGhhcyBhIHBlbmRpbmcgY2hhbmdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgcHJvcGVydHkgaGFzIGEgcGVuZGluZyBjaGFuZ2VcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2lzUHJvcGVydHlQZW5kaW5nKHByb3ApIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuX19kYXRhUGVuZGluZyAmJiAocHJvcCBpbiB0aGlzLl9fZGF0YVBlbmRpbmcpKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBQcm9wZXJ0eUFjY2Vzc29ycztcblxufSk7XG4iLCIvKipcbkBsaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuXG5pbXBvcnQgJy4uL3V0aWxzL2Jvb3QuanMnO1xuXG5pbXBvcnQgeyBkZWR1cGluZ01peGluIH0gZnJvbSAnLi4vdXRpbHMvbWl4aW4uanMnO1xuaW1wb3J0IHsgcm9vdCwgaXNBbmNlc3RvciwgaXNEZXNjZW5kYW50LCBnZXQsIHRyYW5zbGF0ZSwgaXNQYXRoLCBzZXQsIG5vcm1hbGl6ZSB9IGZyb20gJy4uL3V0aWxzL3BhdGguanMnO1xuLyogZm9yIG5vdGlmeSwgcmVmbGVjdCAqL1xuaW1wb3J0IHsgY2FtZWxUb0Rhc2hDYXNlLCBkYXNoVG9DYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9jYXNlLW1hcC5qcyc7XG5pbXBvcnQgeyBQcm9wZXJ0eUFjY2Vzc29ycyB9IGZyb20gJy4vcHJvcGVydHktYWNjZXNzb3JzLmpzJztcbi8qIGZvciBhbm5vdGF0ZWQgZWZmZWN0cyAqL1xuaW1wb3J0IHsgVGVtcGxhdGVTdGFtcCB9IGZyb20gJy4vdGVtcGxhdGUtc3RhbXAuanMnO1xuaW1wb3J0IHsgc2FuaXRpemVET01WYWx1ZSB9IGZyb20gJy4uL3V0aWxzL3NldHRpbmdzLmpzJztcblxuLy8gTW9ub3RvbmljYWxseSBpbmNyZWFzaW5nIHVuaXF1ZSBJRCB1c2VkIGZvciBkZS1kdXBpbmcgZWZmZWN0cyB0cmlnZ2VyZWRcbi8vIGZyb20gbXVsdGlwbGUgcHJvcGVydGllcyBpbiB0aGUgc2FtZSB0dXJuXG5sZXQgZGVkdXBlSWQgPSAwO1xuXG4vKipcbiAqIFByb3BlcnR5IGVmZmVjdCB0eXBlczsgZWZmZWN0cyBhcmUgc3RvcmVkIG9uIHRoZSBwcm90b3R5cGUgdXNpbmcgdGhlc2Uga2V5c1xuICogQGVudW0ge3N0cmluZ31cbiAqL1xuY29uc3QgVFlQRVMgPSB7XG4gIENPTVBVVEU6ICdfX2NvbXB1dGVFZmZlY3RzJyxcbiAgUkVGTEVDVDogJ19fcmVmbGVjdEVmZmVjdHMnLFxuICBOT1RJRlk6ICdfX25vdGlmeUVmZmVjdHMnLFxuICBQUk9QQUdBVEU6ICdfX3Byb3BhZ2F0ZUVmZmVjdHMnLFxuICBPQlNFUlZFOiAnX19vYnNlcnZlRWZmZWN0cycsXG4gIFJFQURfT05MWTogJ19fcmVhZE9ubHknXG59O1xuXG4vKiogQGNvbnN0IHtSZWdFeHB9ICovXG5jb25zdCBjYXBpdGFsQXR0cmlidXRlUmVnZXggPSAvW0EtWl0vO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiBuYW1lOiAoc3RyaW5nIHwgdW5kZWZpbmVkKSxcbiAqIHN0cnVjdHVyZWQ6IChib29sZWFuIHwgdW5kZWZpbmVkKSxcbiAqIHdpbGRjYXJkOiAoYm9vbGVhbiB8IHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBEYXRhVHJpZ2dlcjsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqIGluZm86ID8sXG4gKiB0cmlnZ2VyOiAoIURhdGFUcmlnZ2VyIHwgdW5kZWZpbmVkKSxcbiAqIGZuOiAoIUZ1bmN0aW9uIHwgdW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IERhdGFFZmZlY3Q7IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5sZXQgUHJvcGVydHlFZmZlY3RzVHlwZTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbi8qKlxuICogRW5zdXJlcyB0aGF0IHRoZSBtb2RlbCBoYXMgYW4gb3duLXByb3BlcnR5IG1hcCBvZiBlZmZlY3RzIGZvciB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFRoZSBtb2RlbCBtYXkgYmUgYSBwcm90b3R5cGUgb3IgYW4gaW5zdGFuY2UuXG4gKlxuICogUHJvcGVydHkgZWZmZWN0cyBhcmUgc3RvcmVkIGFzIGFycmF5cyBvZiBlZmZlY3RzIGJ5IHByb3BlcnR5IGluIGEgbWFwLFxuICogYnkgbmFtZWQgdHlwZSBvbiB0aGUgbW9kZWwuIGUuZy5cbiAqXG4gKiAgIF9fY29tcHV0ZUVmZmVjdHM6IHtcbiAqICAgICBmb286IFsgLi4uIF0sXG4gKiAgICAgYmFyOiBbIC4uLiBdXG4gKiAgIH1cbiAqXG4gKiBJZiB0aGUgbW9kZWwgZG9lcyBub3QgeWV0IGhhdmUgYW4gZWZmZWN0IG1hcCBmb3IgdGhlIHR5cGUsIG9uZSBpcyBjcmVhdGVkXG4gKiBhbmQgcmV0dXJuZWQuICBJZiBpdCBkb2VzLCBidXQgaXQgaXMgbm90IGFuIG93biBwcm9wZXJ0eSAoaS5lLiB0aGVcbiAqIHByb3RvdHlwZSBoYWQgZWZmZWN0cyksIHRoZSB0aGUgbWFwIGlzIGRlZXBseSBjbG9uZWQgYW5kIHRoZSBjb3B5IGlzXG4gKiBzZXQgb24gdGhlIG1vZGVsIGFuZCByZXR1cm5lZCwgcmVhZHkgZm9yIG5ldyBlZmZlY3RzIHRvIGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBtb2RlbCBQcm90b3R5cGUgb3IgaW5zdGFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFByb3BlcnR5IGVmZmVjdCB0eXBlXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvd24tcHJvcGVydHkgbWFwIG9mIGVmZmVjdHMgZm9yIHRoZSBnaXZlbiB0eXBlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbnN1cmVPd25FZmZlY3RNYXAobW9kZWwsIHR5cGUpIHtcbiAgbGV0IGVmZmVjdHMgPSBtb2RlbFt0eXBlXTtcbiAgaWYgKCFlZmZlY3RzKSB7XG4gICAgZWZmZWN0cyA9IG1vZGVsW3R5cGVdID0ge307XG4gIH0gZWxzZSBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgZWZmZWN0cyA9IG1vZGVsW3R5cGVdID0gT2JqZWN0LmNyZWF0ZShtb2RlbFt0eXBlXSk7XG4gICAgZm9yIChsZXQgcCBpbiBlZmZlY3RzKSB7XG4gICAgICBsZXQgcHJvdG9GeCA9IGVmZmVjdHNbcF07XG4gICAgICBsZXQgaW5zdEZ4ID0gZWZmZWN0c1twXSA9IEFycmF5KHByb3RvRngubGVuZ3RoKTtcbiAgICAgIGZvciAobGV0IGk9MDsgaTxwcm90b0Z4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluc3RGeFtpXSA9IHByb3RvRnhbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBlZmZlY3RzO1xufVxuXG4vLyAtLSBlZmZlY3RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBSdW5zIGFsbCBlZmZlY3RzIG9mIGEgZ2l2ZW4gdHlwZSBmb3IgdGhlIGdpdmVuIHNldCBvZiBwcm9wZXJ0eSBjaGFuZ2VzXG4gKiBvbiBhbiBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBpbnN0YW5jZSB3aXRoIGVmZmVjdHMgdG8gcnVuXG4gKiBAcGFyYW0ge09iamVjdH0gZWZmZWN0cyBPYmplY3QgbWFwIG9mIHByb3BlcnR5LXRvLUFycmF5IG9mIGVmZmVjdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2YgY3VycmVudCBwcm9wZXJ0eSBjaGFuZ2VzXG4gKiBAcGFyYW0ge09iamVjdD19IG9sZFByb3BzIEJhZyBvZiBwcmV2aW91cyB2YWx1ZXMgZm9yIGNoYW5nZWQgcHJvcGVydGllc1xuICogQHBhcmFtIHtib29sZWFuPX0gaGFzUGF0aHMgVHJ1ZSB3aXRoIGBwcm9wc2AgY29udGFpbnMgb25lIG9yIG1vcmUgcGF0aHNcbiAqIEBwYXJhbSB7Kj19IGV4dHJhQXJncyBBZGRpdGlvbmFsIG1ldGFkYXRhIHRvIHBhc3MgdG8gZWZmZWN0IGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGFuIGVmZmVjdCByYW4gZm9yIHRoaXMgcHJvcGVydHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJ1bkVmZmVjdHMoaW5zdCwgZWZmZWN0cywgcHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocywgZXh0cmFBcmdzKSB7XG4gIGlmIChlZmZlY3RzKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIGxldCBpZCA9IGRlZHVwZUlkKys7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgaWYgKHJ1bkVmZmVjdHNGb3JQcm9wZXJ0eShpbnN0LCBlZmZlY3RzLCBpZCwgcHJvcCwgcHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocywgZXh0cmFBcmdzKSkge1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmFuO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSdW5zIGEgbGlzdCBvZiBlZmZlY3RzIGZvciBhIGdpdmVuIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7IVByb3BlcnR5RWZmZWN0c1R5cGV9IGluc3QgVGhlIGluc3RhbmNlIHdpdGggZWZmZWN0cyB0byBydW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBlZmZlY3RzIE9iamVjdCBtYXAgb2YgcHJvcGVydHktdG8tQXJyYXkgb2YgZWZmZWN0c1xuICogQHBhcmFtIHtudW1iZXJ9IGRlZHVwZUlkIENvdW50ZXIgdXNlZCBmb3IgZGUtZHVwaW5nIGVmZmVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIE5hbWUgb2YgY2hhbmdlZCBwcm9wZXJ0eVxuICogQHBhcmFtIHsqfSBwcm9wcyBDaGFuZ2VkIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7Kn0gb2xkUHJvcHMgT2xkIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGhhc1BhdGhzIFRydWUgd2l0aCBgcHJvcHNgIGNvbnRhaW5zIG9uZSBvciBtb3JlIHBhdGhzXG4gKiBAcGFyYW0geyo9fSBleHRyYUFyZ3MgQWRkaXRpb25hbCBtZXRhZGF0YSB0byBwYXNzIHRvIGVmZmVjdCBmdW5jdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhbiBlZmZlY3QgcmFuIGZvciB0aGlzIHByb3BlcnR5XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBydW5FZmZlY3RzRm9yUHJvcGVydHkoaW5zdCwgZWZmZWN0cywgZGVkdXBlSWQsIHByb3AsIHByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMsIGV4dHJhQXJncykge1xuICBsZXQgcmFuID0gZmFsc2U7XG4gIGxldCByb290UHJvcGVydHkgPSBoYXNQYXRocyA/IHJvb3QocHJvcCkgOiBwcm9wO1xuICBsZXQgZnhzID0gZWZmZWN0c1tyb290UHJvcGVydHldO1xuICBpZiAoZnhzKSB7XG4gICAgZm9yIChsZXQgaT0wLCBsPWZ4cy5sZW5ndGgsIGZ4OyAoaTxsKSAmJiAoZng9ZnhzW2ldKTsgaSsrKSB7XG4gICAgICBpZiAoKCFmeC5pbmZvIHx8IGZ4LmluZm8ubGFzdFJ1biAhPT0gZGVkdXBlSWQpICYmXG4gICAgICAgICAgKCFoYXNQYXRocyB8fCBwYXRoTWF0Y2hlc1RyaWdnZXIocHJvcCwgZngudHJpZ2dlcikpKSB7XG4gICAgICAgIGlmIChmeC5pbmZvKSB7XG4gICAgICAgICAgZnguaW5mby5sYXN0UnVuID0gZGVkdXBlSWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnguZm4oaW5zdCwgcHJvcCwgcHJvcHMsIG9sZFByb3BzLCBmeC5pbmZvLCBoYXNQYXRocywgZXh0cmFBcmdzKTtcbiAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhbjtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBwcm9wZXJ0eS9wYXRoIHRoYXQgaGFzIGNoYW5nZWQgbWF0Y2hlcyB0aGUgdHJpZ2dlclxuICogY3JpdGVyaWEgZm9yIGFuIGVmZmVjdC4gIEEgdHJpZ2dlciBpcyBhIGRlc2NyaXB0b3Igd2l0aCB0aGUgZm9sbG93aW5nXG4gKiBzdHJ1Y3R1cmUsIHdoaWNoIG1hdGNoZXMgdGhlIGRlc2NyaXB0b3JzIHJldHVybmVkIGZyb20gYHBhcnNlQXJnYC5cbiAqIGUuZy4gZm9yIGBmb28uYmFyLipgOlxuICogYGBgXG4gKiB0cmlnZ2VyOiB7XG4gKiAgIG5hbWU6ICdhLmInLFxuICogICBzdHJ1Y3R1cmVkOiB0cnVlLFxuICogICB3aWxkY2FyZDogdHJ1ZVxuICogfVxuICogYGBgXG4gKiBJZiBubyB0cmlnZ2VyIGlzIGdpdmVuLCB0aGUgcGF0aCBpcyBkZWVtZWQgdG8gbWF0Y2guXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCBvciBwcm9wZXJ0eSB0aGF0IGNoYW5nZWRcbiAqIEBwYXJhbSB7RGF0YVRyaWdnZXJ9IHRyaWdnZXIgRGVzY3JpcHRvclxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgcGF0aCBtYXRjaGVkIHRoZSB0cmlnZ2VyXG4gKi9cbmZ1bmN0aW9uIHBhdGhNYXRjaGVzVHJpZ2dlcihwYXRoLCB0cmlnZ2VyKSB7XG4gIGlmICh0cmlnZ2VyKSB7XG4gICAgbGV0IHRyaWdnZXJQYXRoID0gdHJpZ2dlci5uYW1lO1xuICAgIHJldHVybiAodHJpZ2dlclBhdGggPT0gcGF0aCkgfHxcbiAgICAgICh0cmlnZ2VyLnN0cnVjdHVyZWQgJiYgaXNBbmNlc3Rvcih0cmlnZ2VyUGF0aCwgcGF0aCkpIHx8XG4gICAgICAodHJpZ2dlci53aWxkY2FyZCAmJiBpc0Rlc2NlbmRhbnQodHJpZ2dlclBhdGgsIHBhdGgpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudHMgdGhlIFwib2JzZXJ2ZXJcIiBlZmZlY3QuXG4gKlxuICogQ2FsbHMgdGhlIG1ldGhvZCB3aXRoIGBpbmZvLm1ldGhvZE5hbWVgIG9uIHRoZSBpbnN0YW5jZSwgcGFzc2luZyB0aGVcbiAqIG5ldyBhbmQgb2xkIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBpbnN0YW5jZSB0aGUgZWZmZWN0IHdpbGwgYmUgcnVuIG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIEJhZyBvZiBjdXJyZW50IHByb3BlcnR5IGNoYW5nZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBjaGFuZ2VkIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7P30gaW5mbyBFZmZlY3QgbWV0YWRhdGFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBydW5PYnNlcnZlckVmZmVjdChpbnN0LCBwcm9wZXJ0eSwgcHJvcHMsIG9sZFByb3BzLCBpbmZvKSB7XG4gIGxldCBmbiA9IHR5cGVvZiBpbmZvLm1ldGhvZCA9PT0gXCJzdHJpbmdcIiA/IGluc3RbaW5mby5tZXRob2RdIDogaW5mby5tZXRob2Q7XG4gIGxldCBjaGFuZ2VkUHJvcCA9IGluZm8ucHJvcGVydHk7XG4gIGlmIChmbikge1xuICAgIGZuLmNhbGwoaW5zdCwgaW5zdC5fX2RhdGFbY2hhbmdlZFByb3BdLCBvbGRQcm9wc1tjaGFuZ2VkUHJvcF0pO1xuICB9IGVsc2UgaWYgKCFpbmZvLmR5bmFtaWNGbikge1xuICAgIGNvbnNvbGUud2Fybignb2JzZXJ2ZXIgbWV0aG9kIGAnICsgaW5mby5tZXRob2QgKyAnYCBub3QgZGVmaW5lZCcpO1xuICB9XG59XG5cbi8qKlxuICogUnVucyBcIm5vdGlmeVwiIGVmZmVjdHMgZm9yIGEgc2V0IG9mIGNoYW5nZWQgcHJvcGVydGllcy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBkaWZmZXJzIGZyb20gdGhlIGdlbmVyaWMgYHJ1bkVmZmVjdHNgIG1ldGhvZCBpbiB0aGF0IGl0XG4gKiB3aWxsIGRpc3BhdGNoIHBhdGggbm90aWZpY2F0aW9uIGV2ZW50cyBpbiB0aGUgY2FzZSB0aGF0IHRoZSBwcm9wZXJ0eVxuICogY2hhbmdlZCB3YXMgYSBwYXRoIGFuZCB0aGUgcm9vdCBwcm9wZXJ0eSBmb3IgdGhhdCBwYXRoIGRpZG4ndCBoYXZlIGFcbiAqIFwibm90aWZ5XCIgZWZmZWN0LiAgVGhpcyBpcyB0byBtYWludGFpbiAxLjAgYmVoYXZpb3IgdGhhdCBkaWQgbm90IHJlcXVpcmVcbiAqIGBub3RpZnk6IHRydWVgIHRvIGVuc3VyZSBvYmplY3Qgc3ViLXByb3BlcnR5IG5vdGlmaWNhdGlvbnMgd2VyZVxuICogc2VudC5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBpbnN0YW5jZSB3aXRoIGVmZmVjdHMgdG8gcnVuXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5UHJvcHMgQmFnIG9mIHByb3BlcnRpZXMgdG8gbm90aWZ5XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgQmFnIG9mIGN1cnJlbnQgcHJvcGVydHkgY2hhbmdlc1xuICogQHBhcmFtIHtPYmplY3R9IG9sZFByb3BzIEJhZyBvZiBwcmV2aW91cyB2YWx1ZXMgZm9yIGNoYW5nZWQgcHJvcGVydGllc1xuICogQHBhcmFtIHtib29sZWFufSBoYXNQYXRocyBUcnVlIHdpdGggYHByb3BzYCBjb250YWlucyBvbmUgb3IgbW9yZSBwYXRoc1xuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJ1bk5vdGlmeUVmZmVjdHMoaW5zdCwgbm90aWZ5UHJvcHMsIHByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpIHtcbiAgLy8gTm90aWZ5XG4gIGxldCBmeHMgPSBpbnN0W1RZUEVTLk5PVElGWV07XG4gIGxldCBub3RpZmllZDtcbiAgbGV0IGlkID0gZGVkdXBlSWQrKztcbiAgLy8gVHJ5IG5vcm1hbCBub3RpZnkgZWZmZWN0czsgaWYgbm9uZSwgZmFsbCBiYWNrIHRvIHRyeSBwYXRoIG5vdGlmaWNhdGlvblxuICBmb3IgKGxldCBwcm9wIGluIG5vdGlmeVByb3BzKSB7XG4gICAgaWYgKG5vdGlmeVByb3BzW3Byb3BdKSB7XG4gICAgICBpZiAoZnhzICYmIHJ1bkVmZmVjdHNGb3JQcm9wZXJ0eShpbnN0LCBmeHMsIGlkLCBwcm9wLCBwcm9wcywgb2xkUHJvcHMsIGhhc1BhdGhzKSkge1xuICAgICAgICBub3RpZmllZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGhhc1BhdGhzICYmIG5vdGlmeVBhdGgoaW5zdCwgcHJvcCwgcHJvcHMpKSB7XG4gICAgICAgIG5vdGlmaWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gRmx1c2ggaG9zdCBpZiB3ZSBhY3R1YWxseSBub3RpZmllZCBhbmQgaG9zdCB3YXMgYmF0Y2hpbmdcbiAgLy8gQW5kIHRoZSBob3N0IGhhcyBhbHJlYWR5IGluaXRpYWxpemVkIGNsaWVudHM7IHRoaXMgcHJldmVudHNcbiAgLy8gYW4gaXNzdWUgd2l0aCBhIGhvc3Qgb2JzZXJ2aW5nIGRhdGEgY2hhbmdlcyBiZWZvcmUgY2xpZW50cyBhcmUgcmVhZHkuXG4gIGxldCBob3N0O1xuICBpZiAobm90aWZpZWQgJiYgKGhvc3QgPSBpbnN0Ll9fZGF0YUhvc3QpICYmIGhvc3QuX2ludmFsaWRhdGVQcm9wZXJ0aWVzKSB7XG4gICAgaG9zdC5faW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoZXMge3Byb3BlcnR5fS1jaGFuZ2VkIGV2ZW50cyB3aXRoIHBhdGggaW5mb3JtYXRpb24gaW4gdGhlIGRldGFpbFxuICogb2JqZWN0IHRvIGluZGljYXRlIGEgc3ViLXBhdGggb2YgdGhlIHByb3BlcnR5IHdhcyBjaGFuZ2VkLlxuICpcbiAqIEBwYXJhbSB7IVByb3BlcnR5RWZmZWN0c1R5cGV9IGluc3QgVGhlIGVsZW1lbnQgZnJvbSB3aGljaCB0byBmaXJlIHRoZSBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdGhhdCB3YXMgY2hhbmdlZFxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIEJhZyBvZiBjdXJyZW50IHByb3BlcnR5IGNoYW5nZXNcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcGF0aCB3YXMgbm90aWZpZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG5vdGlmeVBhdGgoaW5zdCwgcGF0aCwgcHJvcHMpIHtcbiAgbGV0IHJvb3RQcm9wZXJ0eSA9IHJvb3QocGF0aCk7XG4gIGlmIChyb290UHJvcGVydHkgIT09IHBhdGgpIHtcbiAgICBsZXQgZXZlbnROYW1lID0gY2FtZWxUb0Rhc2hDYXNlKHJvb3RQcm9wZXJ0eSkgKyAnLWNoYW5nZWQnO1xuICAgIGRpc3BhdGNoTm90aWZ5RXZlbnQoaW5zdCwgZXZlbnROYW1lLCBwcm9wc1twYXRoXSwgcGF0aCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIERpc3BhdGNoZXMge3Byb3BlcnR5fS1jaGFuZ2VkIGV2ZW50cyB0byBpbmRpY2F0ZSBhIHByb3BlcnR5IChvciBwYXRoKVxuICogY2hhbmdlZC5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBlbGVtZW50IGZyb20gd2hpY2ggdG8gZmlyZSB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHNlbmQgKCd7cHJvcGVydHl9LWNoYW5nZWQnKVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgb2YgdGhlIGNoYW5nZWQgcHJvcGVydHlcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZH0gcGF0aCBJZiBhIHN1Yi1wYXRoIG9mIHRoaXMgcHJvcGVydHkgY2hhbmdlZCwgdGhlIHBhdGhcbiAqICAgdGhhdCBjaGFuZ2VkIChvcHRpb25hbCkuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICogQHByaXZhdGVcbiAqIEBzdXBwcmVzcyB7aW52YWxpZENhc3RzfVxuICovXG5mdW5jdGlvbiBkaXNwYXRjaE5vdGlmeUV2ZW50KGluc3QsIGV2ZW50TmFtZSwgdmFsdWUsIHBhdGgpIHtcbiAgbGV0IGRldGFpbCA9IHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgcXVldWVQcm9wZXJ0eTogdHJ1ZVxuICB9O1xuICBpZiAocGF0aCkge1xuICAgIGRldGFpbC5wYXRoID0gcGF0aDtcbiAgfVxuICAvKiogQHR5cGUgeyFIVE1MRWxlbWVudH0gKi8oaW5zdCkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGRldGFpbCB9KSk7XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgXCJub3RpZnlcIiBlZmZlY3QuXG4gKlxuICogRGlzcGF0Y2hlcyBhIG5vbi1idWJibGluZyBldmVudCBuYW1lZCBgaW5mby5ldmVudE5hbWVgIG9uIHRoZSBpbnN0YW5jZVxuICogd2l0aCBhIGRldGFpbCBvYmplY3QgY29udGFpbmluZyB0aGUgbmV3IGB2YWx1ZWAuXG4gKlxuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBUaGUgaW5zdGFuY2UgdGhlIGVmZmVjdCB3aWxsIGJlIHJ1biBvblxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IE5hbWUgb2YgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2YgY3VycmVudCBwcm9wZXJ0eSBjaGFuZ2VzXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkUHJvcHMgQmFnIG9mIHByZXZpb3VzIHZhbHVlcyBmb3IgY2hhbmdlZCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gez99IGluZm8gRWZmZWN0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhhc1BhdGhzIFRydWUgd2l0aCBgcHJvcHNgIGNvbnRhaW5zIG9uZSBvciBtb3JlIHBhdGhzXG4gKiBAcmV0dXJuIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcnVuTm90aWZ5RWZmZWN0KGluc3QsIHByb3BlcnR5LCBwcm9wcywgb2xkUHJvcHMsIGluZm8sIGhhc1BhdGhzKSB7XG4gIGxldCByb290UHJvcGVydHkgPSBoYXNQYXRocyA/IHJvb3QocHJvcGVydHkpIDogcHJvcGVydHk7XG4gIGxldCBwYXRoID0gcm9vdFByb3BlcnR5ICE9IHByb3BlcnR5ID8gcHJvcGVydHkgOiBudWxsO1xuICBsZXQgdmFsdWUgPSBwYXRoID8gZ2V0KGluc3QsIHBhdGgpIDogaW5zdC5fX2RhdGFbcHJvcGVydHldO1xuICBpZiAocGF0aCAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsdWUgPSBwcm9wc1twcm9wZXJ0eV07ICAvLyBzcGVjaWZpY2FsbHkgZm9yIC5zcGxpY2VzXG4gIH1cbiAgZGlzcGF0Y2hOb3RpZnlFdmVudChpbnN0LCBpbmZvLmV2ZW50TmFtZSwgdmFsdWUsIHBhdGgpO1xufVxuXG4vKipcbiAqIEhhbmRsZXIgZnVuY3Rpb24gZm9yIDItd2F5IG5vdGlmaWNhdGlvbiBldmVudHMuIFJlY2VpdmVzIGNvbnRleHRcbiAqIGluZm9ybWF0aW9uIGNhcHR1cmVkIGluIHRoZSBgYWRkTm90aWZ5TGlzdGVuZXJgIGNsb3N1cmUgZnJvbSB0aGVcbiAqIGBfX25vdGlmeUxpc3RlbmVyc2AgbWV0YWRhdGEuXG4gKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIG5vdGlmaWVkIHByb3BlcnR5IHRvIHRoZSBob3N0IHByb3BlcnR5IG9yIHBhdGguICBJZlxuICogdGhlIGV2ZW50IGNvbnRhaW5lZCBwYXRoIGluZm9ybWF0aW9uLCB0cmFuc2xhdGUgdGhhdCBwYXRoIHRvIHRoZSBob3N0XG4gKiBzY29wZSdzIG5hbWUgZm9yIHRoYXQgcGF0aCBmaXJzdC5cbiAqXG4gKiBAcGFyYW0ge0N1c3RvbUV2ZW50fSBldmVudCBOb3RpZmljYXRpb24gZXZlbnQgKGUuZy4gJzxwcm9wZXJ0eT4tY2hhbmdlZCcpXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IEhvc3QgZWxlbWVudCBpbnN0YW5jZSBoYW5kbGluZyB0aGUgbm90aWZpY2F0aW9uIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZnJvbVByb3AgQ2hpbGQgZWxlbWVudCBwcm9wZXJ0eSB0aGF0IHdhcyBib3VuZFxuICogQHBhcmFtIHtzdHJpbmd9IHRvUGF0aCBIb3N0IHByb3BlcnR5L3BhdGggdGhhdCB3YXMgYm91bmRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbmVnYXRlIFdoZXRoZXIgdGhlIGJpbmRpbmcgd2FzIG5lZ2F0ZWRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBoYW5kbGVOb3RpZmljYXRpb24oZXZlbnQsIGluc3QsIGZyb21Qcm9wLCB0b1BhdGgsIG5lZ2F0ZSkge1xuICBsZXQgdmFsdWU7XG4gIGxldCBkZXRhaWwgPSAvKiogQHR5cGUge09iamVjdH0gKi8oZXZlbnQuZGV0YWlsKTtcbiAgbGV0IGZyb21QYXRoID0gZGV0YWlsICYmIGRldGFpbC5wYXRoO1xuICBpZiAoZnJvbVBhdGgpIHtcbiAgICB0b1BhdGggPSB0cmFuc2xhdGUoZnJvbVByb3AsIHRvUGF0aCwgZnJvbVBhdGgpO1xuICAgIHZhbHVlID0gZGV0YWlsICYmIGRldGFpbC52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXRbZnJvbVByb3BdO1xuICB9XG4gIHZhbHVlID0gbmVnYXRlID8gIXZhbHVlIDogdmFsdWU7XG4gIGlmICghaW5zdFtUWVBFUy5SRUFEX09OTFldIHx8ICFpbnN0W1RZUEVTLlJFQURfT05MWV1bdG9QYXRoXSkge1xuICAgIGlmIChpbnN0Ll9zZXRQZW5kaW5nUHJvcGVydHlPclBhdGgodG9QYXRoLCB2YWx1ZSwgdHJ1ZSwgQm9vbGVhbihmcm9tUGF0aCkpXG4gICAgICAmJiAoIWRldGFpbCB8fCAhZGV0YWlsLnF1ZXVlUHJvcGVydHkpKSB7XG4gICAgICBpbnN0Ll9pbnZhbGlkYXRlUHJvcGVydGllcygpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEltcGxlbWVudHMgdGhlIFwicmVmbGVjdFwiIGVmZmVjdC5cbiAqXG4gKiBTZXRzIHRoZSBhdHRyaWJ1dGUgbmFtZWQgYGluZm8uYXR0ck5hbWVgIHRvIHRoZSBnaXZlbiBwcm9wZXJ0eSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBpbnN0YW5jZSB0aGUgZWZmZWN0IHdpbGwgYmUgcnVuIG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiBwcm9wZXJ0eVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIEJhZyBvZiBjdXJyZW50IHByb3BlcnR5IGNoYW5nZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBjaGFuZ2VkIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7P30gaW5mbyBFZmZlY3QgbWV0YWRhdGFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBydW5SZWZsZWN0RWZmZWN0KGluc3QsIHByb3BlcnR5LCBwcm9wcywgb2xkUHJvcHMsIGluZm8pIHtcbiAgbGV0IHZhbHVlID0gaW5zdC5fX2RhdGFbcHJvcGVydHldO1xuICBpZiAoc2FuaXRpemVET01WYWx1ZSkge1xuICAgIHZhbHVlID0gc2FuaXRpemVET01WYWx1ZSh2YWx1ZSwgaW5mby5hdHRyTmFtZSwgJ2F0dHJpYnV0ZScsIC8qKiBAdHlwZSB7Tm9kZX0gKi8oaW5zdCkpO1xuICB9XG4gIGluc3QuX3Byb3BlcnR5VG9BdHRyaWJ1dGUocHJvcGVydHksIGluZm8uYXR0ck5hbWUsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBSdW5zIFwiY29tcHV0ZWRcIiBlZmZlY3RzIGZvciBhIHNldCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMuXG4gKlxuICogVGhpcyBtZXRob2QgZGlmZmVycyBmcm9tIHRoZSBnZW5lcmljIGBydW5FZmZlY3RzYCBtZXRob2QgaW4gdGhhdCBpdFxuICogY29udGludWVzIHRvIHJ1biBjb21wdXRlZCBlZmZlY3RzIGJhc2VkIG9uIHRoZSBvdXRwdXQgb2YgZWFjaCBwYXNzIHVudGlsXG4gKiB0aGVyZSBhcmUgbm8gbW9yZSBuZXdseSBjb21wdXRlZCBwcm9wZXJ0aWVzLiAgVGhpcyBlbnN1cmVzIHRoYXQgYWxsXG4gKiBwcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBjb21wdXRlZCBieSB0aGUgaW5pdGlhbCBzZXQgb2YgY2hhbmdlcyBhcmVcbiAqIGNvbXB1dGVkIGJlZm9yZSBvdGhlciBlZmZlY3RzIChiaW5kaW5nIHByb3BhZ2F0aW9uLCBvYnNlcnZlcnMsIGFuZCBub3RpZnkpXG4gKiBydW4uXG4gKlxuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBUaGUgaW5zdGFuY2UgdGhlIGVmZmVjdCB3aWxsIGJlIHJ1biBvblxuICogQHBhcmFtIHshT2JqZWN0fSBjaGFuZ2VkUHJvcHMgQmFnIG9mIGNoYW5nZWQgcHJvcGVydGllc1xuICogQHBhcmFtIHshT2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBjaGFuZ2VkIHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaGFzUGF0aHMgVHJ1ZSB3aXRoIGBwcm9wc2AgY29udGFpbnMgb25lIG9yIG1vcmUgcGF0aHNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBydW5Db21wdXRlZEVmZmVjdHMoaW5zdCwgY2hhbmdlZFByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpIHtcbiAgbGV0IGNvbXB1dGVFZmZlY3RzID0gaW5zdFtUWVBFUy5DT01QVVRFXTtcbiAgaWYgKGNvbXB1dGVFZmZlY3RzKSB7XG4gICAgbGV0IGlucHV0UHJvcHMgPSBjaGFuZ2VkUHJvcHM7XG4gICAgd2hpbGUgKHJ1bkVmZmVjdHMoaW5zdCwgY29tcHV0ZUVmZmVjdHMsIGlucHV0UHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocykpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ob2xkUHJvcHMsIGluc3QuX19kYXRhT2xkKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oY2hhbmdlZFByb3BzLCBpbnN0Ll9fZGF0YVBlbmRpbmcpO1xuICAgICAgaW5wdXRQcm9wcyA9IGluc3QuX19kYXRhUGVuZGluZztcbiAgICAgIGluc3QuX19kYXRhUGVuZGluZyA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgXCJjb21wdXRlZCBwcm9wZXJ0eVwiIGVmZmVjdCBieSBydW5uaW5nIHRoZSBtZXRob2Qgd2l0aCB0aGVcbiAqIHZhbHVlcyBvZiB0aGUgYXJndW1lbnRzIHNwZWNpZmllZCBpbiB0aGUgYGluZm9gIG9iamVjdCBhbmQgc2V0dGluZyB0aGVcbiAqIHJldHVybiB2YWx1ZSB0byB0aGUgY29tcHV0ZWQgcHJvcGVydHkgc3BlY2lmaWVkLlxuICpcbiAqIEBwYXJhbSB7IVByb3BlcnR5RWZmZWN0c1R5cGV9IGluc3QgVGhlIGluc3RhbmNlIHRoZSBlZmZlY3Qgd2lsbCBiZSBydW4gb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBOYW1lIG9mIHByb3BlcnR5XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgQmFnIG9mIGN1cnJlbnQgcHJvcGVydHkgY2hhbmdlc1xuICogQHBhcmFtIHtPYmplY3R9IG9sZFByb3BzIEJhZyBvZiBwcmV2aW91cyB2YWx1ZXMgZm9yIGNoYW5nZWQgcHJvcGVydGllc1xuICogQHBhcmFtIHs/fSBpbmZvIEVmZmVjdCBtZXRhZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJ1bkNvbXB1dGVkRWZmZWN0KGluc3QsIHByb3BlcnR5LCBwcm9wcywgb2xkUHJvcHMsIGluZm8pIHtcbiAgbGV0IHJlc3VsdCA9IHJ1bk1ldGhvZEVmZmVjdChpbnN0LCBwcm9wZXJ0eSwgcHJvcHMsIG9sZFByb3BzLCBpbmZvKTtcbiAgbGV0IGNvbXB1dGVkUHJvcCA9IGluZm8ubWV0aG9kSW5mbztcbiAgaWYgKGluc3QuX19kYXRhSGFzQWNjZXNzb3IgJiYgaW5zdC5fX2RhdGFIYXNBY2Nlc3Nvcltjb21wdXRlZFByb3BdKSB7XG4gICAgaW5zdC5fc2V0UGVuZGluZ1Byb3BlcnR5KGNvbXB1dGVkUHJvcCwgcmVzdWx0LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBpbnN0W2NvbXB1dGVkUHJvcF0gPSByZXN1bHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBDb21wdXRlcyBwYXRoIGNoYW5nZXMgYmFzZWQgb24gcGF0aCBsaW5rcyBzZXQgdXAgdXNpbmcgdGhlIGBsaW5rUGF0aHNgXG4gKiBBUEkuXG4gKlxuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBUaGUgaW5zdGFuY2Ugd2hvc2UgcHJvcHMgYXJlIGNoYW5naW5nXG4gKiBAcGFyYW0ge3N0cmluZyB8ICFBcnJheTwoc3RyaW5nfG51bWJlcik+fSBwYXRoIFBhdGggdGhhdCBoYXMgY2hhbmdlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSBvZiBjaGFuZ2VkIHBhdGhcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb21wdXRlTGlua2VkUGF0aHMoaW5zdCwgcGF0aCwgdmFsdWUpIHtcbiAgbGV0IGxpbmtzID0gaW5zdC5fX2RhdGFMaW5rZWRQYXRocztcbiAgaWYgKGxpbmtzKSB7XG4gICAgbGV0IGxpbms7XG4gICAgZm9yIChsZXQgYSBpbiBsaW5rcykge1xuICAgICAgbGV0IGIgPSBsaW5rc1thXTtcbiAgICAgIGlmIChpc0Rlc2NlbmRhbnQoYSwgcGF0aCkpIHtcbiAgICAgICAgbGluayA9IHRyYW5zbGF0ZShhLCBiLCBwYXRoKTtcbiAgICAgICAgaW5zdC5fc2V0UGVuZGluZ1Byb3BlcnR5T3JQYXRoKGxpbmssIHZhbHVlLCB0cnVlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNEZXNjZW5kYW50KGIsIHBhdGgpKSB7XG4gICAgICAgIGxpbmsgPSB0cmFuc2xhdGUoYiwgYSwgcGF0aCk7XG4gICAgICAgIGluc3QuX3NldFBlbmRpbmdQcm9wZXJ0eU9yUGF0aChsaW5rLCB2YWx1ZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIC0tIGJpbmRpbmdzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBBZGRzIGJpbmRpbmcgbWV0YWRhdGEgdG8gdGhlIGN1cnJlbnQgYG5vZGVJbmZvYCwgYW5kIGJpbmRpbmcgZWZmZWN0c1xuICogZm9yIGFsbCBwYXJ0IGRlcGVuZGVuY2llcyB0byBgdGVtcGxhdGVJbmZvYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDbGFzcyB0aGF0IGBfcGFyc2VUZW1wbGF0ZWAgaXMgY3VycmVudGx5XG4gKiAgIHJ1bm5pbmcgb25cbiAqIEBwYXJhbSB7VGVtcGxhdGVJbmZvfSB0ZW1wbGF0ZUluZm8gVGVtcGxhdGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGVcbiAqIEBwYXJhbSB7Tm9kZUluZm99IG5vZGVJbmZvIE5vZGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGUgbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGtpbmQgQmluZGluZyBraW5kLCBlaXRoZXIgJ3Byb3BlcnR5JywgJ2F0dHJpYnV0ZScsIG9yICd0ZXh0J1xuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCBUYXJnZXQgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHshQXJyYXk8IUJpbmRpbmdQYXJ0Pn0gcGFydHMgQXJyYXkgb2YgYmluZGluZyBwYXJ0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge3N0cmluZz19IGxpdGVyYWwgTGl0ZXJhbCB0ZXh0IHN1cnJvdW5kaW5nIGJpbmRpbmcgcGFydHMgKHNwZWNpZmllZFxuICogICBvbmx5IGZvciAncHJvcGVydHknIGJpbmRpbmdzLCBzaW5jZSB0aGVzZSBtdXN0IGJlIGluaXRpYWxpemVkIGFzIHBhcnRcbiAqICAgb2YgYm9vdC11cClcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRCaW5kaW5nKGNvbnN0cnVjdG9yLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvLCBraW5kLCB0YXJnZXQsIHBhcnRzLCBsaXRlcmFsKSB7XG4gIC8vIENyZWF0ZSBiaW5kaW5nIG1ldGFkYXRhIGFuZCBhZGQgdG8gbm9kZUluZm9cbiAgbm9kZUluZm8uYmluZGluZ3MgPSBub2RlSW5mby5iaW5kaW5ncyB8fCBbXTtcbiAgbGV0IC8qKiBCaW5kaW5nICovIGJpbmRpbmcgPSB7IGtpbmQsIHRhcmdldCwgcGFydHMsIGxpdGVyYWwsIGlzQ29tcG91bmQ6IChwYXJ0cy5sZW5ndGggIT09IDEpIH07XG4gIG5vZGVJbmZvLmJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gIC8vIEFkZCBsaXN0ZW5lciBpbmZvIHRvIGJpbmRpbmcgbWV0YWRhdGFcbiAgaWYgKHNob3VsZEFkZExpc3RlbmVyKGJpbmRpbmcpKSB7XG4gICAgbGV0IHtldmVudCwgbmVnYXRlfSA9IGJpbmRpbmcucGFydHNbMF07XG4gICAgYmluZGluZy5saXN0ZW5lckV2ZW50ID0gZXZlbnQgfHwgKGNhbWVsVG9EYXNoQ2FzZSh0YXJnZXQpICsgJy1jaGFuZ2VkJyk7XG4gICAgYmluZGluZy5saXN0ZW5lck5lZ2F0ZSA9IG5lZ2F0ZTtcbiAgfVxuICAvLyBBZGQgXCJwcm9wYWdhdGVcIiBwcm9wZXJ0eSBlZmZlY3RzIHRvIHRlbXBsYXRlSW5mb1xuICBsZXQgaW5kZXggPSB0ZW1wbGF0ZUluZm8ubm9kZUluZm9MaXN0Lmxlbmd0aDtcbiAgZm9yIChsZXQgaT0wOyBpPGJpbmRpbmcucGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcGFydCA9IGJpbmRpbmcucGFydHNbaV07XG4gICAgcGFydC5jb21wb3VuZEluZGV4ID0gaTtcbiAgICBhZGRFZmZlY3RGb3JCaW5kaW5nUGFydChjb25zdHJ1Y3RvciwgdGVtcGxhdGVJbmZvLCBiaW5kaW5nLCBwYXJ0LCBpbmRleCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGRzIHByb3BlcnR5IGVmZmVjdHMgdG8gdGhlIGdpdmVuIGB0ZW1wbGF0ZUluZm9gIGZvciB0aGUgZ2l2ZW4gYmluZGluZ1xuICogcGFydC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25zdHJ1Y3RvciBDbGFzcyB0aGF0IGBfcGFyc2VUZW1wbGF0ZWAgaXMgY3VycmVudGx5XG4gKiAgIHJ1bm5pbmcgb25cbiAqIEBwYXJhbSB7VGVtcGxhdGVJbmZvfSB0ZW1wbGF0ZUluZm8gVGVtcGxhdGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGVcbiAqIEBwYXJhbSB7IUJpbmRpbmd9IGJpbmRpbmcgQmluZGluZyBtZXRhZGF0YVxuICogQHBhcmFtIHshQmluZGluZ1BhcnR9IHBhcnQgQmluZGluZyBwYXJ0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggaW50byBgbm9kZUluZm9MaXN0YCBmb3IgdGhpcyBub2RlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBhZGRFZmZlY3RGb3JCaW5kaW5nUGFydChjb25zdHJ1Y3RvciwgdGVtcGxhdGVJbmZvLCBiaW5kaW5nLCBwYXJ0LCBpbmRleCkge1xuICBpZiAoIXBhcnQubGl0ZXJhbCkge1xuICAgIGlmIChiaW5kaW5nLmtpbmQgPT09ICdhdHRyaWJ1dGUnICYmIGJpbmRpbmcudGFyZ2V0WzBdID09PSAnLScpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2Fubm90IHNldCBhdHRyaWJ1dGUgJyArIGJpbmRpbmcudGFyZ2V0ICtcbiAgICAgICAgJyBiZWNhdXNlIFwiLVwiIGlzIG5vdCBhIHZhbGlkIGF0dHJpYnV0ZSBzdGFydGluZyBjaGFyYWN0ZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRlcGVuZGVuY2llcyA9IHBhcnQuZGVwZW5kZW5jaWVzO1xuICAgICAgbGV0IGluZm8gPSB7IGluZGV4LCBiaW5kaW5nLCBwYXJ0LCBldmFsdWF0b3I6IGNvbnN0cnVjdG9yIH07XG4gICAgICBmb3IgKGxldCBqPTA7IGo8ZGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGxldCB0cmlnZ2VyID0gZGVwZW5kZW5jaWVzW2pdO1xuICAgICAgICBpZiAodHlwZW9mIHRyaWdnZXIgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0cmlnZ2VyID0gcGFyc2VBcmcodHJpZ2dlcik7XG4gICAgICAgICAgdHJpZ2dlci53aWxkY2FyZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RydWN0b3IuX2FkZFRlbXBsYXRlUHJvcGVydHlFZmZlY3QodGVtcGxhdGVJbmZvLCB0cmlnZ2VyLnJvb3RQcm9wZXJ0eSwge1xuICAgICAgICAgIGZuOiBydW5CaW5kaW5nRWZmZWN0LFxuICAgICAgICAgIGluZm8sIHRyaWdnZXJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyB0aGUgXCJiaW5kaW5nXCIgKHByb3BlcnR5L3BhdGggYmluZGluZykgZWZmZWN0LlxuICpcbiAqIE5vdGUgdGhhdCBiaW5kaW5nIHN5bnRheCBpcyBvdmVycmlkYWJsZSB2aWEgYF9wYXJzZUJpbmRpbmdzYCBhbmRcbiAqIGBfZXZhbHVhdGVCaW5kaW5nYC4gIFRoaXMgbWV0aG9kIHdpbGwgY2FsbCBgX2V2YWx1YXRlQmluZGluZ2AgZm9yIGFueVxuICogbm9uLWxpdGVyYWwgcGFydHMgcmV0dXJuZWQgZnJvbSBgX3BhcnNlQmluZGluZ3NgLiAgSG93ZXZlcixcbiAqIHRoZXJlIGlzIG5vIHN1cHBvcnQgZm9yIF9wYXRoXyBiaW5kaW5ncyB2aWEgY3VzdG9tIGJpbmRpbmcgcGFydHMsXG4gKiBhcyB0aGlzIGlzIHNwZWNpZmljIHRvIFBvbHltZXIncyBwYXRoIGJpbmRpbmcgc3ludGF4LlxuICpcbiAqIEBwYXJhbSB7IVByb3BlcnR5RWZmZWN0c1R5cGV9IGluc3QgVGhlIGluc3RhbmNlIHRoZSBlZmZlY3Qgd2lsbCBiZSBydW4gb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIE5hbWUgb2YgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2YgY3VycmVudCBwcm9wZXJ0eSBjaGFuZ2VzXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkUHJvcHMgQmFnIG9mIHByZXZpb3VzIHZhbHVlcyBmb3IgY2hhbmdlZCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gez99IGluZm8gRWZmZWN0IG1ldGFkYXRhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGhhc1BhdGhzIFRydWUgd2l0aCBgcHJvcHNgIGNvbnRhaW5zIG9uZSBvciBtb3JlIHBhdGhzXG4gKiBAcGFyYW0ge0FycmF5fSBub2RlTGlzdCBMaXN0IG9mIG5vZGVzIGFzc29jaWF0ZWQgd2l0aCBgbm9kZUluZm9MaXN0YCB0ZW1wbGF0ZVxuICogICBtZXRhZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJ1bkJpbmRpbmdFZmZlY3QoaW5zdCwgcGF0aCwgcHJvcHMsIG9sZFByb3BzLCBpbmZvLCBoYXNQYXRocywgbm9kZUxpc3QpIHtcbiAgbGV0IG5vZGUgPSBub2RlTGlzdFtpbmZvLmluZGV4XTtcbiAgbGV0IGJpbmRpbmcgPSBpbmZvLmJpbmRpbmc7XG4gIGxldCBwYXJ0ID0gaW5mby5wYXJ0O1xuICAvLyBTdWJwYXRoIG5vdGlmaWNhdGlvbjogdHJhbnNmb3JtIHBhdGggYW5kIHNldCB0byBjbGllbnRcbiAgLy8gZS5nLjogZm9vPVwie3tvYmouc3VifX1cIiwgcGF0aDogJ29iai5zdWIucHJvcCcsIHNldCAnZm9vLnByb3AnPW9iai5zdWIucHJvcFxuICBpZiAoaGFzUGF0aHMgJiYgcGFydC5zb3VyY2UgJiYgKHBhdGgubGVuZ3RoID4gcGFydC5zb3VyY2UubGVuZ3RoKSAmJlxuICAgICAgKGJpbmRpbmcua2luZCA9PSAncHJvcGVydHknKSAmJiAhYmluZGluZy5pc0NvbXBvdW5kICYmXG4gICAgICBub2RlLl9faXNQcm9wZXJ0eUVmZmVjdHNDbGllbnQgJiZcbiAgICAgIG5vZGUuX19kYXRhSGFzQWNjZXNzb3IgJiYgbm9kZS5fX2RhdGFIYXNBY2Nlc3NvcltiaW5kaW5nLnRhcmdldF0pIHtcbiAgICBsZXQgdmFsdWUgPSBwcm9wc1twYXRoXTtcbiAgICBwYXRoID0gdHJhbnNsYXRlKHBhcnQuc291cmNlLCBiaW5kaW5nLnRhcmdldCwgcGF0aCk7XG4gICAgaWYgKG5vZGUuX3NldFBlbmRpbmdQcm9wZXJ0eU9yUGF0aChwYXRoLCB2YWx1ZSwgZmFsc2UsIHRydWUpKSB7XG4gICAgICBpbnN0Ll9lbnF1ZXVlQ2xpZW50KG5vZGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgdmFsdWUgPSBpbmZvLmV2YWx1YXRvci5fZXZhbHVhdGVCaW5kaW5nKGluc3QsIHBhcnQsIHBhdGgsIHByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpO1xuICAgIC8vIFByb3BhZ2F0ZSB2YWx1ZSB0byBjaGlsZFxuICAgIGFwcGx5QmluZGluZ1ZhbHVlKGluc3QsIG5vZGUsIGJpbmRpbmcsIHBhcnQsIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIGZvciBhbiBcImJpbmRpbmdcIiAoYmluZGluZykgZWZmZWN0IHRvIGEgbm9kZSxcbiAqIGVpdGhlciBhcyBhIHByb3BlcnR5IG9yIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IFRoZSBpbnN0YW5jZSBvd25pbmcgdGhlIGJpbmRpbmcgZWZmZWN0XG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgVGFyZ2V0IG5vZGUgZm9yIGJpbmRpbmdcbiAqIEBwYXJhbSB7IUJpbmRpbmd9IGJpbmRpbmcgQmluZGluZyBtZXRhZGF0YVxuICogQHBhcmFtIHshQmluZGluZ1BhcnR9IHBhcnQgQmluZGluZyBwYXJ0IG1ldGFkYXRhXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIHNldFxuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFwcGx5QmluZGluZ1ZhbHVlKGluc3QsIG5vZGUsIGJpbmRpbmcsIHBhcnQsIHZhbHVlKSB7XG4gIHZhbHVlID0gY29tcHV0ZUJpbmRpbmdWYWx1ZShub2RlLCB2YWx1ZSwgYmluZGluZywgcGFydCk7XG4gIGlmIChzYW5pdGl6ZURPTVZhbHVlKSB7XG4gICAgdmFsdWUgPSBzYW5pdGl6ZURPTVZhbHVlKHZhbHVlLCBiaW5kaW5nLnRhcmdldCwgYmluZGluZy5raW5kLCBub2RlKTtcbiAgfVxuICBpZiAoYmluZGluZy5raW5kID09ICdhdHRyaWJ1dGUnKSB7XG4gICAgLy8gQXR0cmlidXRlIGJpbmRpbmdcbiAgICBpbnN0Ll92YWx1ZVRvTm9kZUF0dHJpYnV0ZSgvKiogQHR5cGUge0VsZW1lbnR9ICovKG5vZGUpLCB2YWx1ZSwgYmluZGluZy50YXJnZXQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFByb3BlcnR5IGJpbmRpbmdcbiAgICBsZXQgcHJvcCA9IGJpbmRpbmcudGFyZ2V0O1xuICAgIGlmIChub2RlLl9faXNQcm9wZXJ0eUVmZmVjdHNDbGllbnQgJiZcbiAgICAgICAgbm9kZS5fX2RhdGFIYXNBY2Nlc3NvciAmJiBub2RlLl9fZGF0YUhhc0FjY2Vzc29yW3Byb3BdKSB7XG4gICAgICBpZiAoIW5vZGVbVFlQRVMuUkVBRF9PTkxZXSB8fCAhbm9kZVtUWVBFUy5SRUFEX09OTFldW3Byb3BdKSB7XG4gICAgICAgIGlmIChub2RlLl9zZXRQZW5kaW5nUHJvcGVydHkocHJvcCwgdmFsdWUpKSB7XG4gICAgICAgICAgaW5zdC5fZW5xdWV1ZUNsaWVudChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSAge1xuICAgICAgaW5zdC5fc2V0VW5tYW5hZ2VkUHJvcGVydHlUb05vZGUobm9kZSwgcHJvcCwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gXCJiaW5kaW5nXCIgZWZmZWN0IHZhbHVlIGJhc2VkIG9uIGNvbXBvdW5kICYgbmVnYXRpb25cbiAqIGVmZmVjdCBtZXRhZGF0YSwgYXMgd2VsbCBhcyBoYW5kbGluZyBmb3Igc3BlY2lhbC1jYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgTm9kZSB0aGUgdmFsdWUgd2lsbCBiZSBzZXQgdG9cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gc2V0XG4gKiBAcGFyYW0geyFCaW5kaW5nfSBiaW5kaW5nIEJpbmRpbmcgbWV0YWRhdGFcbiAqIEBwYXJhbSB7IUJpbmRpbmdQYXJ0fSBwYXJ0IEJpbmRpbmcgcGFydCBtZXRhZGF0YVxuICogQHJldHVybiB7Kn0gVHJhbnNmb3JtZWQgdmFsdWUgdG8gc2V0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjb21wdXRlQmluZGluZ1ZhbHVlKG5vZGUsIHZhbHVlLCBiaW5kaW5nLCBwYXJ0KSB7XG4gIGlmIChiaW5kaW5nLmlzQ29tcG91bmQpIHtcbiAgICBsZXQgc3RvcmFnZSA9IG5vZGUuX19kYXRhQ29tcG91bmRTdG9yYWdlW2JpbmRpbmcudGFyZ2V0XTtcbiAgICBzdG9yYWdlW3BhcnQuY29tcG91bmRJbmRleF0gPSB2YWx1ZTtcbiAgICB2YWx1ZSA9IHN0b3JhZ2Uuam9pbignJyk7XG4gIH1cbiAgaWYgKGJpbmRpbmcua2luZCAhPT0gJ2F0dHJpYnV0ZScpIHtcbiAgICAvLyBTb21lIGJyb3dzZXJzIHNlcmlhbGl6ZSBgdW5kZWZpbmVkYCB0byBgXCJ1bmRlZmluZWRcImBcbiAgICBpZiAoYmluZGluZy50YXJnZXQgPT09ICd0ZXh0Q29udGVudCcgfHxcbiAgICAgICAgKGJpbmRpbmcudGFyZ2V0ID09PSAndmFsdWUnICYmXG4gICAgICAgICAgKG5vZGUubG9jYWxOYW1lID09PSAnaW5wdXQnIHx8IG5vZGUubG9jYWxOYW1lID09PSAndGV4dGFyZWEnKSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgPT0gdW5kZWZpbmVkID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIGJpbmRpbmcncyBtZXRhZGF0YSBtZWV0cyBhbGwgdGhlIHJlcXVpcmVtZW50cyB0byBhbGxvd1xuICogMi13YXkgYmluZGluZywgYW5kIHRoZXJlZm9yZSBhIGA8cHJvcGVydHk+LWNoYW5nZWRgIGV2ZW50IGxpc3RlbmVyIHNob3VsZCBiZVxuICogYWRkZWQ6XG4gKiAtIHVzZWQgY3VybHkgYnJhY2VzXG4gKiAtIGlzIGEgcHJvcGVydHkgKG5vdCBhdHRyaWJ1dGUpIGJpbmRpbmdcbiAqIC0gaXMgbm90IGEgdGV4dENvbnRlbnQgYmluZGluZ1xuICogLSBpcyBub3QgY29tcG91bmRcbiAqXG4gKiBAcGFyYW0geyFCaW5kaW5nfSBiaW5kaW5nIEJpbmRpbmcgbWV0YWRhdGFcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgMi13YXkgbGlzdGVuZXIgc2hvdWxkIGJlIGFkZGVkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzaG91bGRBZGRMaXN0ZW5lcihiaW5kaW5nKSB7XG4gIHJldHVybiBCb29sZWFuKGJpbmRpbmcudGFyZ2V0KSAmJlxuICAgICAgICAgYmluZGluZy5raW5kICE9ICdhdHRyaWJ1dGUnICYmXG4gICAgICAgICBiaW5kaW5nLmtpbmQgIT0gJ3RleHQnICYmXG4gICAgICAgICAhYmluZGluZy5pc0NvbXBvdW5kICYmXG4gICAgICAgICBiaW5kaW5nLnBhcnRzWzBdLm1vZGUgPT09ICd7Jztcbn1cblxuLyoqXG4gKiBTZXR1cCBjb21wb3VuZCBiaW5kaW5nIHN0b3JhZ2Ugc3RydWN0dXJlcywgbm90aWZ5IGxpc3RlbmVycywgYW5kIGRhdGFIb3N0XG4gKiByZWZlcmVuY2VzIG9udG8gdGhlIGJvdW5kIG5vZGVMaXN0LlxuICpcbiAqIEBwYXJhbSB7IVByb3BlcnR5RWZmZWN0c1R5cGV9IGluc3QgSW5zdGFuY2UgdGhhdCBiYXMgYmVlbiBwcmV2aW91c2x5IGJvdW5kXG4gKiBAcGFyYW0ge1RlbXBsYXRlSW5mb30gdGVtcGxhdGVJbmZvIFRlbXBsYXRlIG1ldGFkYXRhXG4gKiBAcmV0dXJuIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0dXBCaW5kaW5ncyhpbnN0LCB0ZW1wbGF0ZUluZm8pIHtcbiAgLy8gU2V0dXAgY29tcG91bmQgc3RvcmFnZSwgZGF0YUhvc3QsIGFuZCBub3RpZnkgbGlzdGVuZXJzXG4gIGxldCB7bm9kZUxpc3QsIG5vZGVJbmZvTGlzdH0gPSB0ZW1wbGF0ZUluZm87XG4gIGlmIChub2RlSW5mb0xpc3QubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbm9kZUluZm9MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaW5mbyA9IG5vZGVJbmZvTGlzdFtpXTtcbiAgICAgIGxldCBub2RlID0gbm9kZUxpc3RbaV07XG4gICAgICBsZXQgYmluZGluZ3MgPSBpbmZvLmJpbmRpbmdzO1xuICAgICAgaWYgKGJpbmRpbmdzKSB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBiaW5kaW5nID0gYmluZGluZ3NbaV07XG4gICAgICAgICAgc2V0dXBDb21wb3VuZFN0b3JhZ2Uobm9kZSwgYmluZGluZyk7XG4gICAgICAgICAgYWRkTm90aWZ5TGlzdGVuZXIobm9kZSwgaW5zdCwgYmluZGluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUuX19kYXRhSG9zdCA9IGluc3Q7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYF9fZGF0YUNvbXBvdW5kU3RvcmFnZWAgbG9jYWwgc3RvcmFnZSBvbiBhIGJvdW5kIG5vZGUgd2l0aFxuICogaW5pdGlhbCBsaXRlcmFsIGRhdGEgZm9yIGNvbXBvdW5kIGJpbmRpbmdzLCBhbmQgc2V0cyB0aGUgam9pbmVkXG4gKiBsaXRlcmFsIHBhcnRzIHRvIHRoZSBib3VuZCBwcm9wZXJ0eS5cbiAqXG4gKiBXaGVuIGNoYW5nZXMgdG8gY29tcG91bmQgcGFydHMgb2NjdXIsIHRoZXkgYXJlIGZpcnN0IHNldCBpbnRvIHRoZSBjb21wb3VuZFxuICogc3RvcmFnZSBhcnJheSBmb3IgdGhhdCBwcm9wZXJ0eSwgYW5kIHRoZW4gdGhlIGFycmF5IGlzIGpvaW5lZCB0byByZXN1bHQgaW5cbiAqIHRoZSBmaW5hbCB2YWx1ZSBzZXQgdG8gdGhlIHByb3BlcnR5L2F0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgQm91bmQgbm9kZSB0byBpbml0aWFsaXplXG4gKiBAcGFyYW0ge0JpbmRpbmd9IGJpbmRpbmcgQmluZGluZyBtZXRhZGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldHVwQ29tcG91bmRTdG9yYWdlKG5vZGUsIGJpbmRpbmcpIHtcbiAgaWYgKGJpbmRpbmcuaXNDb21wb3VuZCkge1xuICAgIC8vIENyZWF0ZSBjb21wb3VuZCBzdG9yYWdlIG1hcFxuICAgIGxldCBzdG9yYWdlID0gbm9kZS5fX2RhdGFDb21wb3VuZFN0b3JhZ2UgfHxcbiAgICAgIChub2RlLl9fZGF0YUNvbXBvdW5kU3RvcmFnZSA9IHt9KTtcbiAgICBsZXQgcGFydHMgPSBiaW5kaW5nLnBhcnRzO1xuICAgIC8vIENvcHkgbGl0ZXJhbHMgZnJvbSBwYXJ0cyBpbnRvIHN0b3JhZ2UgZm9yIHRoaXMgYmluZGluZ1xuICAgIGxldCBsaXRlcmFscyA9IG5ldyBBcnJheShwYXJ0cy5sZW5ndGgpO1xuICAgIGZvciAobGV0IGo9MDsgajxwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgbGl0ZXJhbHNbal0gPSBwYXJ0c1tqXS5saXRlcmFsO1xuICAgIH1cbiAgICBsZXQgdGFyZ2V0ID0gYmluZGluZy50YXJnZXQ7XG4gICAgc3RvcmFnZVt0YXJnZXRdID0gbGl0ZXJhbHM7XG4gICAgLy8gQ29uZmlndXJlIHByb3BlcnRpZXMgd2l0aCB0aGVpciBsaXRlcmFsIHBhcnRzXG4gICAgaWYgKGJpbmRpbmcubGl0ZXJhbCAmJiBiaW5kaW5nLmtpbmQgPT0gJ3Byb3BlcnR5Jykge1xuICAgICAgbm9kZVt0YXJnZXRdID0gYmluZGluZy5saXRlcmFsO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFkZHMgYSAyLXdheSBiaW5kaW5nIG5vdGlmaWNhdGlvbiBldmVudCBsaXN0ZW5lciB0byB0aGUgbm9kZSBzcGVjaWZpZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbm9kZSBDaGlsZCBlbGVtZW50IHRvIGFkZCBsaXN0ZW5lciB0b1xuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBIb3N0IGVsZW1lbnQgaW5zdGFuY2UgdG8gaGFuZGxlIG5vdGlmaWNhdGlvbiBldmVudFxuICogQHBhcmFtIHtCaW5kaW5nfSBiaW5kaW5nIEJpbmRpbmcgbWV0YWRhdGFcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGROb3RpZnlMaXN0ZW5lcihub2RlLCBpbnN0LCBiaW5kaW5nKSB7XG4gIGlmIChiaW5kaW5nLmxpc3RlbmVyRXZlbnQpIHtcbiAgICBsZXQgcGFydCA9IGJpbmRpbmcucGFydHNbMF07XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGJpbmRpbmcubGlzdGVuZXJFdmVudCwgZnVuY3Rpb24oZSkge1xuICAgICAgaGFuZGxlTm90aWZpY2F0aW9uKGUsIGluc3QsIGJpbmRpbmcudGFyZ2V0LCBwYXJ0LnNvdXJjZSwgcGFydC5uZWdhdGUpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIC0tIGZvciBtZXRob2QtYmFzZWQgZWZmZWN0cyAoY29tcGxleE9ic2VydmVyICYgY29tcHV0ZWQpIC0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogQWRkcyBwcm9wZXJ0eSBlZmZlY3RzIGZvciBlYWNoIGFyZ3VtZW50IGluIHRoZSBtZXRob2Qgc2lnbmF0dXJlIChhbmRcbiAqIG9wdGlvbmFsbHksIGZvciB0aGUgbWV0aG9kIG5hbWUgaWYgYGR5bmFtaWNgIGlzIHRydWUpIHRoYXQgY2FsbHMgdGhlXG4gKiBwcm92aWRlZCBlZmZlY3QgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtFbGVtZW50IHwgT2JqZWN0fSBtb2RlbCBQcm90b3R5cGUgb3IgaW5zdGFuY2VcbiAqIEBwYXJhbSB7IU1ldGhvZFNpZ25hdHVyZX0gc2lnIE1ldGhvZCBzaWduYXR1cmUgbWV0YWRhdGFcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUgb2YgcHJvcGVydHkgZWZmZWN0IHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWZmZWN0Rm4gRnVuY3Rpb24gdG8gcnVuIHdoZW4gYXJndW1lbnRzIGNoYW5nZVxuICogQHBhcmFtIHsqPX0gbWV0aG9kSW5mbyBFZmZlY3Qtc3BlY2lmaWMgaW5mb3JtYXRpb24gdG8gYmUgaW5jbHVkZWQgaW5cbiAqICAgbWV0aG9kIGVmZmVjdCBtZXRhZGF0YVxuICogQHBhcmFtIHtib29sZWFufE9iamVjdD19IGR5bmFtaWNGbiBCb29sZWFuIG9yIG9iamVjdCBtYXAgaW5kaWNhdGluZyB3aGV0aGVyXG4gKiAgIG1ldGhvZCBuYW1lcyBzaG91bGQgYmUgaW5jbHVkZWQgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSBlZmZlY3QuIE5vdGUsXG4gKiAgIGRlZmF1bHRzIHRvIHRydWUgaWYgdGhlIHNpZ25hdHVyZSBpcyBzdGF0aWMgKHNpZy5zdGF0aWMgaXMgdHJ1ZSkuXG4gKiBAcmV0dXJuIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWV0aG9kRWZmZWN0KG1vZGVsLCBzaWcsIHR5cGUsIGVmZmVjdEZuLCBtZXRob2RJbmZvLCBkeW5hbWljRm4pIHtcbiAgZHluYW1pY0ZuID0gc2lnLnN0YXRpYyB8fCAoZHluYW1pY0ZuICYmXG4gICAgKHR5cGVvZiBkeW5hbWljRm4gIT09ICdvYmplY3QnIHx8IGR5bmFtaWNGbltzaWcubWV0aG9kTmFtZV0pKTtcbiAgbGV0IGluZm8gPSB7XG4gICAgbWV0aG9kTmFtZTogc2lnLm1ldGhvZE5hbWUsXG4gICAgYXJnczogc2lnLmFyZ3MsXG4gICAgbWV0aG9kSW5mbyxcbiAgICBkeW5hbWljRm5cbiAgfTtcbiAgZm9yIChsZXQgaT0wLCBhcmc7IChpPHNpZy5hcmdzLmxlbmd0aCkgJiYgKGFyZz1zaWcuYXJnc1tpXSk7IGkrKykge1xuICAgIGlmICghYXJnLmxpdGVyYWwpIHtcbiAgICAgIG1vZGVsLl9hZGRQcm9wZXJ0eUVmZmVjdChhcmcucm9vdFByb3BlcnR5LCB0eXBlLCB7XG4gICAgICAgIGZuOiBlZmZlY3RGbiwgaW5mbzogaW5mbywgdHJpZ2dlcjogYXJnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKGR5bmFtaWNGbikge1xuICAgIG1vZGVsLl9hZGRQcm9wZXJ0eUVmZmVjdChzaWcubWV0aG9kTmFtZSwgdHlwZSwge1xuICAgICAgZm46IGVmZmVjdEZuLCBpbmZvOiBpbmZvXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIG1ldGhvZCB3aXRoIGFyZ3VtZW50cyBtYXJzaGFsZWQgZnJvbSBwcm9wZXJ0aWVzIG9uIHRoZSBpbnN0YW5jZVxuICogYmFzZWQgb24gdGhlIG1ldGhvZCBzaWduYXR1cmUgY29udGFpbmVkIGluIHRoZSBlZmZlY3QgbWV0YWRhdGEuXG4gKlxuICogTXVsdGktcHJvcGVydHkgb2JzZXJ2ZXJzLCBjb21wdXRlZCBwcm9wZXJ0aWVzLCBhbmQgaW5saW5lIGNvbXB1dGluZ1xuICogZnVuY3Rpb25zIGNhbGwgdGhpcyBmdW5jdGlvbiB0byBpbnZva2UgdGhlIG1ldGhvZCwgdGhlbiB1c2UgdGhlIHJldHVyblxuICogdmFsdWUgYWNjb3JkaW5nbHkuXG4gKlxuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBUaGUgaW5zdGFuY2UgdGhlIGVmZmVjdCB3aWxsIGJlIHJ1biBvblxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IE5hbWUgb2YgcHJvcGVydHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2YgY3VycmVudCBwcm9wZXJ0eSBjaGFuZ2VzXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkUHJvcHMgQmFnIG9mIHByZXZpb3VzIHZhbHVlcyBmb3IgY2hhbmdlZCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gez99IGluZm8gRWZmZWN0IG1ldGFkYXRhXG4gKiBAcmV0dXJuIHsqfSBSZXR1cm5zIHRoZSByZXR1cm4gdmFsdWUgZnJvbSB0aGUgbWV0aG9kIGludm9jYXRpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJ1bk1ldGhvZEVmZmVjdChpbnN0LCBwcm9wZXJ0eSwgcHJvcHMsIG9sZFByb3BzLCBpbmZvKSB7XG4gIC8vIEluc3RhbmNlcyBjYW4gb3B0aW9uYWxseSBoYXZlIGEgX21ldGhvZEhvc3Qgd2hpY2ggYWxsb3dzIHJlZGlyZWN0aW5nIHdoZXJlXG4gIC8vIHRvIGZpbmQgbWV0aG9kcy4gQ3VycmVudGx5IHVzZWQgYnkgYHRlbXBsYXRpemVgLlxuICBsZXQgY29udGV4dCA9IGluc3QuX21ldGhvZEhvc3QgfHwgaW5zdDtcbiAgbGV0IGZuID0gY29udGV4dFtpbmZvLm1ldGhvZE5hbWVdO1xuICBpZiAoZm4pIHtcbiAgICBsZXQgYXJncyA9IGluc3QuX21hcnNoYWxBcmdzKGluZm8uYXJncywgcHJvcGVydHksIHByb3BzKTtcbiAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSBpZiAoIWluZm8uZHluYW1pY0ZuKSB7XG4gICAgY29uc29sZS53YXJuKCdtZXRob2QgYCcgKyBpbmZvLm1ldGhvZE5hbWUgKyAnYCBub3QgZGVmaW5lZCcpO1xuICB9XG59XG5cbmNvbnN0IGVtcHR5QXJyYXkgPSBbXTtcblxuLy8gUmVndWxhciBleHByZXNzaW9ucyB1c2VkIGZvciBiaW5kaW5nXG5jb25zdCBJREVOVCAgPSAnKD86JyArICdbYS16QS1aXyRdW1xcXFx3LjokXFxcXC0qXSonICsgJyknO1xuY29uc3QgTlVNQkVSID0gJyg/OicgKyAnWy0rXT9bMC05XSpcXFxcLj9bMC05XSsoPzpbZUVdWy0rXT9bMC05XSspPycgKyAnKSc7XG5jb25zdCBTUVVPVEVfU1RSSU5HID0gJyg/OicgKyAnXFwnKD86W15cXCdcXFxcXFxcXF18XFxcXFxcXFwuKSpcXCcnICsgJyknO1xuY29uc3QgRFFVT1RFX1NUUklORyA9ICcoPzonICsgJ1wiKD86W15cIlxcXFxcXFxcXXxcXFxcXFxcXC4pKlwiJyArICcpJztcbmNvbnN0IFNUUklORyA9ICcoPzonICsgU1FVT1RFX1NUUklORyArICd8JyArIERRVU9URV9TVFJJTkcgKyAnKSc7XG5jb25zdCBBUkdVTUVOVCA9ICcoPzooJyArIElERU5UICsgJ3wnICsgTlVNQkVSICsgJ3wnICsgIFNUUklORyArICcpXFxcXHMqJyArICcpJztcbmNvbnN0IEFSR1VNRU5UUyA9ICcoPzonICsgQVJHVU1FTlQgKyAnKD86LFxcXFxzKicgKyBBUkdVTUVOVCArICcpKicgKyAnKSc7XG5jb25zdCBBUkdVTUVOVF9MSVNUID0gJyg/OicgKyAnXFxcXChcXFxccyonICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICsgQVJHVU1FTlRTICsgJz8nICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXFxcXClcXFxccyonICsgJyknO1xuY29uc3QgQklORElORyA9ICcoJyArIElERU5UICsgJ1xcXFxzKicgKyBBUkdVTUVOVF9MSVNUICsgJz8nICsgJyknOyAvLyBHcm91cCAzXG5jb25zdCBPUEVOX0JSQUNLRVQgPSAnKFxcXFxbXFxcXFt8e3spJyArICdcXFxccyonO1xuY29uc3QgQ0xPU0VfQlJBQ0tFVCA9ICcoPzpdXXx9fSknO1xuY29uc3QgTkVHQVRFID0gJyg/OighKVxcXFxzKik/JzsgLy8gR3JvdXAgMlxuY29uc3QgRVhQUkVTU0lPTiA9IE9QRU5fQlJBQ0tFVCArIE5FR0FURSArIEJJTkRJTkcgKyBDTE9TRV9CUkFDS0VUO1xuY29uc3QgYmluZGluZ1JlZ2V4ID0gbmV3IFJlZ0V4cChFWFBSRVNTSU9OLCBcImdcIik7XG5cbi8qKlxuICogQ3JlYXRlIGEgc3RyaW5nIGZyb20gYmluZGluZyBwYXJ0cyBvZiBhbGwgdGhlIGxpdGVyYWwgcGFydHNcbiAqXG4gKiBAcGFyYW0geyFBcnJheTxCaW5kaW5nUGFydD59IHBhcnRzIEFsbCBwYXJ0cyB0byBzdHJpbmdpZnlcbiAqIEByZXR1cm4ge3N0cmluZ30gU3RyaW5nIG1hZGUgZnJvbSB0aGUgbGl0ZXJhbCBwYXJ0c1xuICovXG5mdW5jdGlvbiBsaXRlcmFsRnJvbVBhcnRzKHBhcnRzKSB7XG4gIGxldCBzID0gJyc7XG4gIGZvciAobGV0IGk9MDsgaTxwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBsaXRlcmFsID0gcGFydHNbaV0ubGl0ZXJhbDtcbiAgICBzICs9IGxpdGVyYWwgfHwgJyc7XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogUGFyc2VzIGFuIGV4cHJlc3Npb24gc3RyaW5nIGZvciBhIG1ldGhvZCBzaWduYXR1cmUsIGFuZCByZXR1cm5zIGEgbWV0YWRhdGFcbiAqIGRlc2NyaWJpbmcgdGhlIG1ldGhvZCBpbiB0ZXJtcyBvZiBgbWV0aG9kTmFtZWAsIGBzdGF0aWNgICh3aGV0aGVyIGFsbCB0aGVcbiAqIGFyZ3VtZW50cyBhcmUgbGl0ZXJhbHMpLCBhbmQgYW4gYXJyYXkgb2YgYGFyZ3NgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV4cHJlc3Npb24gVGhlIGV4cHJlc3Npb24gdG8gcGFyc2VcbiAqIEByZXR1cm4gez9NZXRob2RTaWduYXR1cmV9IFRoZSBtZXRob2QgbWV0YWRhdGEgb2JqZWN0IGlmIGEgbWV0aG9kIGV4cHJlc3Npb24gd2FzXG4gKiAgIGZvdW5kLCBvdGhlcndpc2UgYHVuZGVmaW5lZGBcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTWV0aG9kKGV4cHJlc3Npb24pIHtcbiAgLy8gdHJpZXMgdG8gbWF0Y2ggdmFsaWQgamF2YXNjcmlwdCBwcm9wZXJ0eSBuYW1lc1xuICBsZXQgbSA9IGV4cHJlc3Npb24ubWF0Y2goLyhbXlxcc10rPylcXCgoW1xcc1xcU10qKVxcKS8pO1xuICBpZiAobSkge1xuICAgIGxldCBtZXRob2ROYW1lID0gbVsxXTtcbiAgICBsZXQgc2lnID0geyBtZXRob2ROYW1lLCBzdGF0aWM6IHRydWUsIGFyZ3M6IGVtcHR5QXJyYXkgfTtcbiAgICBpZiAobVsyXS50cmltKCkpIHtcbiAgICAgIC8vIHJlcGxhY2UgZXNjYXBlZCBjb21tYXMgd2l0aCBjb21tYSBlbnRpdHksIHNwbGl0IG9uIHVuLWVzY2FwZWQgY29tbWFzXG4gICAgICBsZXQgYXJncyA9IG1bMl0ucmVwbGFjZSgvXFxcXCwvZywgJyZjb21tYTsnKS5zcGxpdCgnLCcpO1xuICAgICAgcmV0dXJuIHBhcnNlQXJncyhhcmdzLCBzaWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2lnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYW4gYXJyYXkgb2YgYXJndW1lbnRzIGFuZCBzZXRzIHRoZSBgYXJnc2AgcHJvcGVydHkgb2YgdGhlIHN1cHBsaWVkXG4gKiBzaWduYXR1cmUgbWV0YWRhdGEgb2JqZWN0LiBTZXRzIHRoZSBgc3RhdGljYCBwcm9wZXJ0eSB0byBmYWxzZSBpZiBhbnlcbiAqIGFyZ3VtZW50IGlzIGEgbm9uLWxpdGVyYWwuXG4gKlxuICogQHBhcmFtIHshQXJyYXk8c3RyaW5nPn0gYXJnTGlzdCBBcnJheSBvZiBhcmd1bWVudCBuYW1lc1xuICogQHBhcmFtIHshTWV0aG9kU2lnbmF0dXJlfSBzaWcgTWV0aG9kIHNpZ25hdHVyZSBtZXRhZGF0YSBvYmplY3RcbiAqIEByZXR1cm4geyFNZXRob2RTaWduYXR1cmV9IFRoZSB1cGRhdGVkIHNpZ25hdHVyZSBtZXRhZGF0YSBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXJncyhhcmdMaXN0LCBzaWcpIHtcbiAgc2lnLmFyZ3MgPSBhcmdMaXN0Lm1hcChmdW5jdGlvbihyYXdBcmcpIHtcbiAgICBsZXQgYXJnID0gcGFyc2VBcmcocmF3QXJnKTtcbiAgICBpZiAoIWFyZy5saXRlcmFsKSB7XG4gICAgICBzaWcuc3RhdGljID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhcmc7XG4gIH0sIHRoaXMpO1xuICByZXR1cm4gc2lnO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhbiBpbmRpdmlkdWFsIGFyZ3VtZW50LCBhbmQgcmV0dXJucyBhbiBhcmd1bWVudCBtZXRhZGF0YSBvYmplY3RcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBmaWVsZHM6XG4gKlxuICogICB7XG4gKiAgICAgdmFsdWU6ICdwcm9wJywgICAgICAgIC8vIHByb3BlcnR5L3BhdGggb3IgbGl0ZXJhbCB2YWx1ZVxuICogICAgIGxpdGVyYWw6IGZhbHNlLCAgICAgICAvLyB3aGV0aGVyIGFyZ3VtZW50IGlzIGEgbGl0ZXJhbFxuICogICAgIHN0cnVjdHVyZWQ6IGZhbHNlLCAgICAvLyB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBpcyBhIHBhdGhcbiAqICAgICByb290UHJvcGVydHk6ICdwcm9wJywgLy8gdGhlIHJvb3QgcHJvcGVydHkgb2YgdGhlIHBhdGhcbiAqICAgICB3aWxkY2FyZDogZmFsc2UgICAgICAgLy8gd2hldGhlciB0aGUgYXJndW1lbnQgd2FzIGEgd2lsZGNhcmQgJy4qJyBwYXRoXG4gKiAgIH1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmF3QXJnIFRoZSBzdHJpbmcgdmFsdWUgb2YgdGhlIGFyZ3VtZW50XG4gKiBAcmV0dXJuIHshTWV0aG9kQXJnfSBBcmd1bWVudCBtZXRhZGF0YSBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXJnKHJhd0FyZykge1xuICAvLyBjbGVhbiB1cCB3aGl0ZXNwYWNlXG4gIGxldCBhcmcgPSByYXdBcmcudHJpbSgpXG4gICAgLy8gcmVwbGFjZSBjb21tYSBlbnRpdHkgd2l0aCBjb21tYVxuICAgIC5yZXBsYWNlKC8mY29tbWE7L2csICcsJylcbiAgICAvLyByZXBhaXIgZXh0cmEgZXNjYXBlIHNlcXVlbmNlczsgbm90ZSBvbmx5IGNvbW1hcyBzdHJpY3RseSBuZWVkXG4gICAgLy8gZXNjYXBpbmcsIGJ1dCB3ZSBhbGxvdyBhbnkgb3RoZXIgY2hhciB0byBiZSBlc2NhcGVkIHNpbmNlIGl0c1xuICAgIC8vIGxpa2VseSB1c2VycyB3aWxsIGRvIHRoaXNcbiAgICAucmVwbGFjZSgvXFxcXCguKS9nLCAnXFwkMScpXG4gICAgO1xuICAvLyBiYXNpYyBhcmd1bWVudCBkZXNjcmlwdG9yXG4gIGxldCBhID0ge1xuICAgIG5hbWU6IGFyZyxcbiAgICB2YWx1ZTogJycsXG4gICAgbGl0ZXJhbDogZmFsc2VcbiAgfTtcbiAgLy8gZGV0ZWN0IGxpdGVyYWwgdmFsdWUgKG11c3QgYmUgU3RyaW5nIG9yIE51bWJlcilcbiAgbGV0IGZjID0gYXJnWzBdO1xuICBpZiAoZmMgPT09ICctJykge1xuICAgIGZjID0gYXJnWzFdO1xuICB9XG4gIGlmIChmYyA+PSAnMCcgJiYgZmMgPD0gJzknKSB7XG4gICAgZmMgPSAnIyc7XG4gIH1cbiAgc3dpdGNoKGZjKSB7XG4gICAgY2FzZSBcIidcIjpcbiAgICBjYXNlICdcIic6XG4gICAgICBhLnZhbHVlID0gYXJnLnNsaWNlKDEsIC0xKTtcbiAgICAgIGEubGl0ZXJhbCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICcjJzpcbiAgICAgIGEudmFsdWUgPSBOdW1iZXIoYXJnKTtcbiAgICAgIGEubGl0ZXJhbCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBpZiBub3QgbGl0ZXJhbCwgbG9vayBmb3Igc3RydWN0dXJlZCBwYXRoXG4gIGlmICghYS5saXRlcmFsKSB7XG4gICAgYS5yb290UHJvcGVydHkgPSByb290KGFyZyk7XG4gICAgLy8gZGV0ZWN0IHN0cnVjdHVyZWQgcGF0aCAoaGFzIGRvdHMpXG4gICAgYS5zdHJ1Y3R1cmVkID0gaXNQYXRoKGFyZyk7XG4gICAgaWYgKGEuc3RydWN0dXJlZCkge1xuICAgICAgYS53aWxkY2FyZCA9IChhcmcuc2xpY2UoLTIpID09ICcuKicpO1xuICAgICAgaWYgKGEud2lsZGNhcmQpIHtcbiAgICAgICAgYS5uYW1lID0gYXJnLnNsaWNlKDAsIC0yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIGRhdGEgYXBpXG5cbi8qKlxuICogU2VuZHMgYXJyYXkgc3BsaWNlIG5vdGlmaWNhdGlvbnMgKGAuc3BsaWNlc2AgYW5kIGAubGVuZ3RoYClcbiAqXG4gKiBOb3RlOiB0aGlzIGltcGxlbWVudGF0aW9uIG9ubHkgYWNjZXB0cyBub3JtYWxpemVkIHBhdGhzXG4gKlxuICogQHBhcmFtIHshUHJvcGVydHlFZmZlY3RzVHlwZX0gaW5zdCBJbnN0YW5jZSB0byBzZW5kIG5vdGlmaWNhdGlvbnMgdG9cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0aGUgbXV0YXRpb25zIG9jY3VycmVkIG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXJyYXkgdGhhdCB3YXMgbXV0YXRlZFxuICogQHBhcmFtIHtBcnJheX0gc3BsaWNlcyBBcnJheSBvZiBzcGxpY2UgcmVjb3Jkc1xuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG5vdGlmeVNwbGljZXMoaW5zdCwgYXJyYXksIHBhdGgsIHNwbGljZXMpIHtcbiAgbGV0IHNwbGljZXNQYXRoID0gcGF0aCArICcuc3BsaWNlcyc7XG4gIGluc3Qubm90aWZ5UGF0aChzcGxpY2VzUGF0aCwgeyBpbmRleFNwbGljZXM6IHNwbGljZXMgfSk7XG4gIGluc3Qubm90aWZ5UGF0aChwYXRoICsgJy5sZW5ndGgnLCBhcnJheS5sZW5ndGgpO1xuICAvLyBOdWxsIGhlcmUgdG8gYWxsb3cgcG90ZW50aWFsbHkgbGFyZ2Ugc3BsaWNlIHJlY29yZHMgdG8gYmUgR0MnZWQuXG4gIGluc3QuX19kYXRhW3NwbGljZXNQYXRoXSA9IHtpbmRleFNwbGljZXM6IG51bGx9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzcGxpY2UgcmVjb3JkIGFuZCBzZW5kcyBhbiBhcnJheSBzcGxpY2Ugbm90aWZpY2F0aW9uIGZvclxuICogdGhlIGRlc2NyaWJlZCBtdXRhdGlvblxuICpcbiAqIE5vdGU6IHRoaXMgaW1wbGVtZW50YXRpb24gb25seSBhY2NlcHRzIG5vcm1hbGl6ZWQgcGF0aHNcbiAqXG4gKiBAcGFyYW0geyFQcm9wZXJ0eUVmZmVjdHNUeXBlfSBpbnN0IEluc3RhbmNlIHRvIHNlbmQgbm90aWZpY2F0aW9ucyB0b1xuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRoZSBtdXRhdGlvbnMgb2NjdXJyZWQgb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhcnJheSB0aGF0IHdhcyBtdXRhdGVkXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggYXQgd2hpY2ggdGhlIGFycmF5IG11dGF0aW9uIG9jY3VycmVkXG4gKiBAcGFyYW0ge251bWJlcn0gYWRkZWRDb3VudCBOdW1iZXIgb2YgYWRkZWQgaXRlbXNcbiAqIEBwYXJhbSB7QXJyYXl9IHJlbW92ZWQgQXJyYXkgb2YgcmVtb3ZlZCBpdGVtc1xuICogQHJldHVybiB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG5vdGlmeVNwbGljZShpbnN0LCBhcnJheSwgcGF0aCwgaW5kZXgsIGFkZGVkQ291bnQsIHJlbW92ZWQpIHtcbiAgbm90aWZ5U3BsaWNlcyhpbnN0LCBhcnJheSwgcGF0aCwgW3tcbiAgICBpbmRleDogaW5kZXgsXG4gICAgYWRkZWRDb3VudDogYWRkZWRDb3VudCxcbiAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgIG9iamVjdDogYXJyYXksXG4gICAgdHlwZTogJ3NwbGljZSdcbiAgfV0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gdXBwZXItY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFN0cmluZyB0byB1cHBlcmNhc2VcbiAqIEByZXR1cm4ge3N0cmluZ30gVXBwZXJjYXNlZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHVwcGVyKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVbMF0udG9VcHBlckNhc2UoKSArIG5hbWUuc3Vic3RyaW5nKDEpO1xufVxuXG4vKipcbiAqIEVsZW1lbnQgY2xhc3MgbWl4aW4gdGhhdCBwcm92aWRlcyBtZXRhLXByb2dyYW1taW5nIGZvciBQb2x5bWVyJ3MgdGVtcGxhdGVcbiAqIGJpbmRpbmcgYW5kIGRhdGEgb2JzZXJ2YXRpb24gKGNvbGxlY3RpdmVseSwgXCJwcm9wZXJ0eSBlZmZlY3RzXCIpIHN5c3RlbS5cbiAqXG4gKiBUaGlzIG1peGluIHVzZXMgcHJvdmlkZXMgdGhlIGZvbGxvd2luZyBrZXkgc3RhdGljIG1ldGhvZHMgZm9yIGFkZGluZ1xuICogcHJvcGVydHkgZWZmZWN0cyB0byBhbiBlbGVtZW50IGNsYXNzOlxuICogLSBgYWRkUHJvcGVydHlFZmZlY3RgXG4gKiAtIGBjcmVhdGVQcm9wZXJ0eU9ic2VydmVyYFxuICogLSBgY3JlYXRlTWV0aG9kT2JzZXJ2ZXJgXG4gKiAtIGBjcmVhdGVOb3RpZnlpbmdQcm9wZXJ0eWBcbiAqIC0gYGNyZWF0ZVJlYWRPbmx5UHJvcGVydHlgXG4gKiAtIGBjcmVhdGVSZWZsZWN0ZWRQcm9wZXJ0eWBcbiAqIC0gYGNyZWF0ZUNvbXB1dGVkUHJvcGVydHlgXG4gKiAtIGBiaW5kVGVtcGxhdGVgXG4gKlxuICogRWFjaCBtZXRob2QgY3JlYXRlcyBvbmUgb3IgbW9yZSBwcm9wZXJ0eSBhY2Nlc3NvcnMsIGFsb25nIHdpdGggbWV0YWRhdGFcbiAqIHVzZWQgYnkgdGhpcyBtaXhpbidzIGltcGxlbWVudGF0aW9uIG9mIGBfcHJvcGVydGllc0NoYW5nZWRgIHRvIHBlcmZvcm1cbiAqIHRoZSBwcm9wZXJ0eSBlZmZlY3RzLlxuICpcbiAqIFVuZGVyc2NvcmVkIHZlcnNpb25zIG9mIHRoZSBhYm92ZSBtZXRob2RzIGFsc28gZXhpc3Qgb24gdGhlIGVsZW1lbnRcbiAqIHByb3RvdHlwZSBmb3IgYWRkaW5nIHByb3BlcnR5IGVmZmVjdHMgb24gaW5zdGFuY2VzIGF0IHJ1bnRpbWUuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgbWl4aW4gb3ZlcnJpZGVzIHNldmVyYWwgYFByb3BlcnR5QWNjZXNzb3JzYCBtZXRob2RzLCBpblxuICogbWFueSBjYXNlcyB0byBtYWludGFpbiBndWFyYW50ZWVzIHByb3ZpZGVkIGJ5IHRoZSBQb2x5bWVyIDEueCBmZWF0dXJlcztcbiAqIG5vdGFibHkgaXQgY2hhbmdlcyBwcm9wZXJ0eSBhY2Nlc3NvcnMgdG8gYmUgc3luY2hyb25vdXMgYnkgZGVmYXVsdFxuICogd2hlcmVhcyB0aGUgZGVmYXVsdCB3aGVuIHVzaW5nIGBQcm9wZXJ0eUFjY2Vzc29yc2Agc3RhbmRhbG9uZSBpcyB0byBiZVxuICogYXN5bmMgYnkgZGVmYXVsdC5cbiAqXG4gKiBAbWl4aW5GdW5jdGlvblxuICogQHBvbHltZXJcbiAqIEBhcHBsaWVzTWl4aW4gVGVtcGxhdGVTdGFtcFxuICogQGFwcGxpZXNNaXhpbiBQcm9wZXJ0eUFjY2Vzc29yc1xuICogQHN1bW1hcnkgRWxlbWVudCBjbGFzcyBtaXhpbiB0aGF0IHByb3ZpZGVzIG1ldGEtcHJvZ3JhbW1pbmcgZm9yIFBvbHltZXInc1xuICogdGVtcGxhdGUgYmluZGluZyBhbmQgZGF0YSBvYnNlcnZhdGlvbiBzeXN0ZW0uXG4gKi9cbmV4cG9ydCBjb25zdCBQcm9wZXJ0eUVmZmVjdHMgPSBkZWR1cGluZ01peGluKHN1cGVyQ2xhc3MgPT4ge1xuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge3N1cGVyQ2xhc3N9XG4gICAqIEBpbXBsZW1lbnRzIHtQb2x5bWVyX1Byb3BlcnR5QWNjZXNzb3JzfVxuICAgKiBAaW1wbGVtZW50cyB7UG9seW1lcl9UZW1wbGF0ZVN0YW1wfVxuICAgKiBAdW5yZXN0cmljdGVkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb25zdCBwcm9wZXJ0eUVmZmVjdHNCYXNlID0gVGVtcGxhdGVTdGFtcChQcm9wZXJ0eUFjY2Vzc29ycyhzdXBlckNsYXNzKSk7XG5cbiAgLyoqXG4gICAqIEBwb2x5bWVyXG4gICAqIEBtaXhpbkNsYXNzXG4gICAqIEBpbXBsZW1lbnRzIHtQb2x5bWVyX1Byb3BlcnR5RWZmZWN0c31cbiAgICogQGV4dGVuZHMge3Byb3BlcnR5RWZmZWN0c0Jhc2V9XG4gICAqIEB1bnJlc3RyaWN0ZWRcbiAgICovXG4gIGNsYXNzIFByb3BlcnR5RWZmZWN0cyBleHRlbmRzIHByb3BlcnR5RWZmZWN0c0Jhc2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgLy8gVXNlZCB0byBpZGVudGlmeSB1c2VycyBvZiB0aGlzIG1peGluLCBhbGEgaW5zdGFuY2VvZlxuICAgICAgdGhpcy5fX2lzUHJvcGVydHlFZmZlY3RzQ2xpZW50ID0gdHJ1ZTtcbiAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgLy8gTk9URTogdXNlZCB0byB0cmFjayByZS1lbnRyYW50IGNhbGxzIHRvIGBfZmx1c2hQcm9wZXJ0aWVzYFxuICAgICAgLy8gcGF0aCBjaGFuZ2VzIGRpcnR5IGNoZWNrIGFnYWluc3QgYF9fZGF0YVRlbXBgIG9ubHkgZHVyaW5nIG9uZSBcInR1cm5cIlxuICAgICAgLy8gYW5kIGFyZSBjbGVhcmVkIHdoZW4gYF9fZGF0YUNvdW50ZXJgIHJldHVybnMgdG8gMC5cbiAgICAgIHRoaXMuX19kYXRhQ291bnRlciA9IDA7XG4gICAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICB0aGlzLl9fZGF0YUNsaWVudHNSZWFkeTtcbiAgICAgIC8qKiBAdHlwZSB7QXJyYXl9ICovXG4gICAgICB0aGlzLl9fZGF0YVBlbmRpbmdDbGllbnRzO1xuICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgICB0aGlzLl9fZGF0YVRvTm90aWZ5O1xuICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgICB0aGlzLl9fZGF0YUxpbmtlZFBhdGhzO1xuICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgdGhpcy5fX2RhdGFIYXNQYXRocztcbiAgICAgIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICAgICAgdGhpcy5fX2RhdGFDb21wb3VuZFN0b3JhZ2U7XG4gICAgICAvKiogQHR5cGUge1BvbHltZXJfUHJvcGVydHlFZmZlY3RzfSAqL1xuICAgICAgdGhpcy5fX2RhdGFIb3N0O1xuICAgICAgLyoqIEB0eXBlIHshT2JqZWN0fSAqL1xuICAgICAgdGhpcy5fX2RhdGFUZW1wO1xuICAgICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgdGhpcy5fX2RhdGFDbGllbnRzSW5pdGlhbGl6ZWQ7XG4gICAgICAvKiogQHR5cGUgeyFPYmplY3R9ICovXG4gICAgICB0aGlzLl9fZGF0YTtcbiAgICAgIC8qKiBAdHlwZSB7IU9iamVjdH0gKi9cbiAgICAgIHRoaXMuX19kYXRhUGVuZGluZztcbiAgICAgIC8qKiBAdHlwZSB7IU9iamVjdH0gKi9cbiAgICAgIHRoaXMuX19kYXRhT2xkO1xuICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgICB0aGlzLl9fY29tcHV0ZUVmZmVjdHM7XG4gICAgICAvKiogQHR5cGUge09iamVjdH0gKi9cbiAgICAgIHRoaXMuX19yZWZsZWN0RWZmZWN0cztcbiAgICAgIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICAgICAgdGhpcy5fX25vdGlmeUVmZmVjdHM7XG4gICAgICAvKiogQHR5cGUge09iamVjdH0gKi9cbiAgICAgIHRoaXMuX19wcm9wYWdhdGVFZmZlY3RzO1xuICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgICB0aGlzLl9fb2JzZXJ2ZUVmZmVjdHM7XG4gICAgICAvKiogQHR5cGUge09iamVjdH0gKi9cbiAgICAgIHRoaXMuX19yZWFkT25seTtcbiAgICAgIC8qKiBAdHlwZSB7IVRlbXBsYXRlSW5mb30gKi9cbiAgICAgIHRoaXMuX190ZW1wbGF0ZUluZm87XG4gICAgfVxuXG4gICAgZ2V0IFBST1BFUlRZX0VGRkVDVF9UWVBFUygpIHtcbiAgICAgIHJldHVybiBUWVBFUztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIF9pbml0aWFsaXplUHJvcGVydGllcygpIHtcbiAgICAgIHN1cGVyLl9pbml0aWFsaXplUHJvcGVydGllcygpO1xuICAgICAgaG9zdFN0YWNrLnJlZ2lzdGVySG9zdCh0aGlzKTtcbiAgICAgIHRoaXMuX19kYXRhQ2xpZW50c1JlYWR5ID0gZmFsc2U7XG4gICAgICB0aGlzLl9fZGF0YVBlbmRpbmdDbGllbnRzID0gbnVsbDtcbiAgICAgIHRoaXMuX19kYXRhVG9Ob3RpZnkgPSBudWxsO1xuICAgICAgdGhpcy5fX2RhdGFMaW5rZWRQYXRocyA9IG51bGw7XG4gICAgICB0aGlzLl9fZGF0YUhhc1BhdGhzID0gZmFsc2U7XG4gICAgICAvLyBNYXkgYmUgc2V0IG9uIGluc3RhbmNlIHByaW9yIHRvIHVwZ3JhZGVcbiAgICAgIHRoaXMuX19kYXRhQ29tcG91bmRTdG9yYWdlID0gdGhpcy5fX2RhdGFDb21wb3VuZFN0b3JhZ2UgfHwgbnVsbDtcbiAgICAgIHRoaXMuX19kYXRhSG9zdCA9IHRoaXMuX19kYXRhSG9zdCB8fCBudWxsO1xuICAgICAgdGhpcy5fX2RhdGFUZW1wID0ge307XG4gICAgICB0aGlzLl9fZGF0YUNsaWVudHNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBgUHJvcGVydHlBY2Nlc3NvcnNgIGltcGxlbWVudGF0aW9uIHRvIHByb3ZpZGUgYVxuICAgICAqIG1vcmUgZWZmaWNpZW50IGltcGxlbWVudGF0aW9uIG9mIGluaXRpYWxpemluZyBwcm9wZXJ0aWVzIGZyb21cbiAgICAgKiB0aGUgcHJvdG90eXBlIG9uIHRoZSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBQcm9wZXJ0aWVzIHRvIGluaXRpYWxpemUgb24gdGhlIHByb3RvdHlwZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgX2luaXRpYWxpemVQcm90b1Byb3BlcnRpZXMocHJvcHMpIHtcbiAgICAgIHRoaXMuX19kYXRhID0gT2JqZWN0LmNyZWF0ZShwcm9wcyk7XG4gICAgICB0aGlzLl9fZGF0YVBlbmRpbmcgPSBPYmplY3QuY3JlYXRlKHByb3BzKTtcbiAgICAgIHRoaXMuX19kYXRhT2xkID0ge307XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIGBQcm9wZXJ0eUFjY2Vzc29yc2AgaW1wbGVtZW50YXRpb24gdG8gYXZvaWQgc2V0dGluZ1xuICAgICAqIGBfc2V0UHJvcGVydHlgJ3MgYHNob3VsZE5vdGlmeTogdHJ1ZWAuXG4gICAgICpcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgUHJvcGVydGllcyB0byBpbml0aWFsaXplIG9uIHRoZSBpbnN0YW5jZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgX2luaXRpYWxpemVJbnN0YW5jZVByb3BlcnRpZXMocHJvcHMpIHtcbiAgICAgIGxldCByZWFkT25seSA9IHRoaXNbVFlQRVMuUkVBRF9PTkxZXTtcbiAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgaWYgKCFyZWFkT25seSB8fCAhcmVhZE9ubHlbcHJvcF0pIHtcbiAgICAgICAgICB0aGlzLl9fZGF0YVBlbmRpbmcgPSB0aGlzLl9fZGF0YVBlbmRpbmcgfHwge307XG4gICAgICAgICAgdGhpcy5fX2RhdGFPbGQgPSB0aGlzLl9fZGF0YU9sZCB8fCB7fTtcbiAgICAgICAgICB0aGlzLl9fZGF0YVtwcm9wXSA9IHRoaXMuX19kYXRhUGVuZGluZ1twcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJvdG90eXBlIHNldHVwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVxdWl2YWxlbnQgdG8gc3RhdGljIGBhZGRQcm9wZXJ0eUVmZmVjdGAgQVBJIGJ1dCBjYW4gYmUgY2FsbGVkIG9uXG4gICAgICogYW4gaW5zdGFuY2UgdG8gYWRkIGVmZmVjdHMgYXQgcnVudGltZS4gIFNlZSB0aGF0IG1ldGhvZCBmb3JcbiAgICAgKiBmdWxsIEFQSSBkb2NzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIGVmZmVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEVmZmVjdCB0eXBlLCBmcm9tIHRoaXMuUFJPUEVSVFlfRUZGRUNUX1RZUEVTXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBlZmZlY3QgRWZmZWN0IG1ldGFkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9hZGRQcm9wZXJ0eUVmZmVjdChwcm9wZXJ0eSwgdHlwZSwgZWZmZWN0KSB7XG4gICAgICB0aGlzLl9jcmVhdGVQcm9wZXJ0eUFjY2Vzc29yKHByb3BlcnR5LCB0eXBlID09IFRZUEVTLlJFQURfT05MWSk7XG4gICAgICAvLyBlZmZlY3RzIGFyZSBhY2N1bXVsYXRlZCBpbnRvIGFycmF5cyBwZXIgcHJvcGVydHkgYmFzZWQgb24gdHlwZVxuICAgICAgbGV0IGVmZmVjdHMgPSBlbnN1cmVPd25FZmZlY3RNYXAodGhpcywgdHlwZSlbcHJvcGVydHldO1xuICAgICAgaWYgKCFlZmZlY3RzKSB7XG4gICAgICAgIGVmZmVjdHMgPSB0aGlzW3R5cGVdW3Byb3BlcnR5XSA9IFtdO1xuICAgICAgfVxuICAgICAgZWZmZWN0cy5wdXNoKGVmZmVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gcHJvcGVydHkgZWZmZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRoZSBlZmZlY3Qgd2FzIGFzc29jaWF0ZWQgd2l0aFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEVmZmVjdCB0eXBlLCBmcm9tIHRoaXMuUFJPUEVSVFlfRUZGRUNUX1RZUEVTXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBlZmZlY3QgRWZmZWN0IG1ldGFkYXRhIG9iamVjdCB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIF9yZW1vdmVQcm9wZXJ0eUVmZmVjdChwcm9wZXJ0eSwgdHlwZSwgZWZmZWN0KSB7XG4gICAgICBsZXQgZWZmZWN0cyA9IGVuc3VyZU93bkVmZmVjdE1hcCh0aGlzLCB0eXBlKVtwcm9wZXJ0eV07XG4gICAgICBsZXQgaWR4ID0gZWZmZWN0cy5pbmRleE9mKGVmZmVjdCk7XG4gICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgZWZmZWN0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgcHJvdG90eXBlL2luc3RhbmNlIGhhcyBhIHByb3BlcnR5IGVmZmVjdFxuICAgICAqIG9mIGEgY2VydGFpbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IHR5cGUgRWZmZWN0IHR5cGUsIGZyb20gdGhpcy5QUk9QRVJUWV9FRkZFQ1RfVFlQRVNcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwcm90b3R5cGUvaW5zdGFuY2UgaGFzIGFuIGVmZmVjdCBvZiB0aGlzIHR5cGVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2hhc1Byb3BlcnR5RWZmZWN0KHByb3BlcnR5LCB0eXBlKSB7XG4gICAgICBsZXQgZWZmZWN0cyA9IHRoaXNbdHlwZV07XG4gICAgICByZXR1cm4gQm9vbGVhbihlZmZlY3RzICYmIGVmZmVjdHNbcHJvcGVydHldKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgcHJvdG90eXBlL2luc3RhbmNlIGhhcyBhIFwicmVhZCBvbmx5XCJcbiAgICAgKiBhY2Nlc3NvciBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwcm90b3R5cGUvaW5zdGFuY2UgaGFzIGFuIGVmZmVjdCBvZiB0aGlzIHR5cGVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2hhc1JlYWRPbmx5RWZmZWN0KHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5faGFzUHJvcGVydHlFZmZlY3QocHJvcGVydHksIFRZUEVTLlJFQURfT05MWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBjdXJyZW50IHByb3RvdHlwZS9pbnN0YW5jZSBoYXMgYSBcIm5vdGlmeVwiXG4gICAgICogcHJvcGVydHkgZWZmZWN0IGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHByb3RvdHlwZS9pbnN0YW5jZSBoYXMgYW4gZWZmZWN0IG9mIHRoaXMgdHlwZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfaGFzTm90aWZ5RWZmZWN0KHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5faGFzUHJvcGVydHlFZmZlY3QocHJvcGVydHksIFRZUEVTLk5PVElGWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBjdXJyZW50IHByb3RvdHlwZS9pbnN0YW5jZSBoYXMgYSBcInJlZmxlY3QgdG8gYXR0cmlidXRlXCJcbiAgICAgKiBwcm9wZXJ0eSBlZmZlY3QgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcHJvdG90eXBlL2luc3RhbmNlIGhhcyBhbiBlZmZlY3Qgb2YgdGhpcyB0eXBlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9oYXNSZWZsZWN0RWZmZWN0KHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5faGFzUHJvcGVydHlFZmZlY3QocHJvcGVydHksIFRZUEVTLlJFRkxFQ1QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgY3VycmVudCBwcm90b3R5cGUvaW5zdGFuY2UgaGFzIGEgXCJjb21wdXRlZFwiXG4gICAgICogcHJvcGVydHkgZWZmZWN0IGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHByb3RvdHlwZS9pbnN0YW5jZSBoYXMgYW4gZWZmZWN0IG9mIHRoaXMgdHlwZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfaGFzQ29tcHV0ZWRFZmZlY3QocHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9oYXNQcm9wZXJ0eUVmZmVjdChwcm9wZXJ0eSwgVFlQRVMuQ09NUFVURSk7XG4gICAgfVxuXG4gICAgLy8gUnVudGltZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgcGVuZGluZyBwcm9wZXJ0eSBvciBwYXRoLiAgSWYgdGhlIHJvb3QgcHJvcGVydHkgb2YgdGhlIHBhdGggaW5cbiAgICAgKiBxdWVzdGlvbiBoYWQgbm8gYWNjZXNzb3IsIHRoZSBwYXRoIGlzIHNldCwgb3RoZXJ3aXNlIGl0IGlzIGVucXVldWVkXG4gICAgICogdmlhIGBfc2V0UGVuZGluZ1Byb3BlcnR5YC5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXNvbGF0ZXMgcmVsYXRpdmVseSBleHBlbnNpdmUgZnVuY3Rpb25hbGl0eSBuZWNlc3NhcnlcbiAgICAgKiBmb3IgdGhlIHB1YmxpYyBBUEkgKGBzZXRgLCBgc2V0UHJvcGVydGllc2AsIGBub3RpZnlQYXRoYCwgYW5kIHByb3BlcnR5XG4gICAgICogY2hhbmdlIGxpc3RlbmVycyB2aWEge3suLi59fSBiaW5kaW5ncyksIHN1Y2ggdGhhdCBpdCBpcyBvbmx5IGRvbmVcbiAgICAgKiB3aGVuIHBhdGhzIGVudGVyIHRoZSBzeXN0ZW0sIGFuZCBub3QgYXQgZXZlcnkgcHJvcGFnYXRpb24gc3RlcC4gIEl0XG4gICAgICogYWxzbyBzZXRzIGEgYF9fZGF0YUhhc1BhdGhzYCBmbGFnIG9uIHRoZSBpbnN0YW5jZSB3aGljaCBpcyB1c2VkIHRvXG4gICAgICogZmFzdC1wYXRoIHNsb3dlciBwYXRoLW1hdGNoaW5nIGNvZGUgaW4gdGhlIHByb3BlcnR5IGVmZmVjdHMgaG9zdCBwYXRocy5cbiAgICAgKlxuICAgICAqIGBwYXRoYCBjYW4gYmUgYSBwYXRoIHN0cmluZyBvciBhcnJheSBvZiBwYXRoIHBhcnRzIGFzIGFjY2VwdGVkIGJ5IHRoZVxuICAgICAqIHB1YmxpYyBBUEkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8ICFBcnJheTxudW1iZXJ8c3RyaW5nPn0gcGF0aCBQYXRoIHRvIHNldFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gc2V0XG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkTm90aWZ5IFNldCB0byB0cnVlIGlmIHRoaXMgY2hhbmdlIHNob3VsZFxuICAgICAqICBjYXVzZSBhIHByb3BlcnR5IG5vdGlmaWNhdGlvbiBldmVudCBkaXNwYXRjaFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGlzUGF0aE5vdGlmaWNhdGlvbiBJZiB0aGUgcGF0aCBiZWluZyBzZXQgaXMgYSBwYXRoXG4gICAgICogICBub3RpZmljYXRpb24gb2YgYW4gYWxyZWFkeSBjaGFuZ2VkIHZhbHVlLCBhcyBvcHBvc2VkIHRvIGEgcmVxdWVzdFxuICAgICAqICAgdG8gc2V0IGFuZCBub3RpZnkgdGhlIGNoYW5nZS4gIEluIHRoZSBsYXR0ZXIgYGZhbHNlYCBjYXNlLCBhIGRpcnR5XG4gICAgICogICBjaGVjayBpcyBwZXJmb3JtZWQgYW5kIHRoZW4gdGhlIHZhbHVlIGlzIHNldCB0byB0aGUgcGF0aCBiZWZvcmVcbiAgICAgKiAgIGVucXVldWluZyB0aGUgcGVuZGluZyBwcm9wZXJ0eSBjaGFuZ2UuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eS9wYXRoIHdhcyBlbnF1ZXVlZCBpblxuICAgICAqICAgdGhlIHBlbmRpbmcgY2hhbmdlcyBiYWcuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9zZXRQZW5kaW5nUHJvcGVydHlPclBhdGgocGF0aCwgdmFsdWUsIHNob3VsZE5vdGlmeSwgaXNQYXRoTm90aWZpY2F0aW9uKSB7XG4gICAgICBpZiAoaXNQYXRoTm90aWZpY2F0aW9uIHx8XG4gICAgICAgICAgcm9vdChBcnJheS5pc0FycmF5KHBhdGgpID8gcGF0aFswXSA6IHBhdGgpICE9PSBwYXRoKSB7XG4gICAgICAgIC8vIERpcnR5IGNoZWNrIGNoYW5nZXMgYmVpbmcgc2V0IHRvIGEgcGF0aCBhZ2FpbnN0IHRoZSBhY3R1YWwgb2JqZWN0LFxuICAgICAgICAvLyBzaW5jZSB0aGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgcGF0aHMgaW50byB0aGUgc3lzdGVtOyBmcm9tIGhlcmVcbiAgICAgICAgLy8gdGhlIG9ubHkgZGlydHkgY2hlY2tzIGFyZSBhZ2FpbnN0IHRoZSBgX19kYXRhVGVtcGAgY2FjaGUgdG8gcHJldmVudFxuICAgICAgICAvLyBkdXBsaWNhdGUgd29yayBpbiB0aGUgc2FtZSB0dXJuIG9ubHkuIE5vdGUsIGlmIHRoaXMgd2FzIGEgbm90aWZpY2F0aW9uXG4gICAgICAgIC8vIG9mIGEgY2hhbmdlIGFscmVhZHkgc2V0IHRvIGEgcGF0aCAoaXNQYXRoTm90aWZpY2F0aW9uOiB0cnVlKSxcbiAgICAgICAgLy8gd2UgYWx3YXlzIGxldCB0aGUgY2hhbmdlIHRocm91Z2ggYW5kIHNraXAgdGhlIGBzZXRgIHNpbmNlIGl0IHdhc1xuICAgICAgICAvLyBhbHJlYWR5IGRpcnR5IGNoZWNrZWQgYXQgdGhlIHBvaW50IG9mIGVudHJ5IGFuZCB0aGUgdW5kZXJseWluZ1xuICAgICAgICAvLyBvYmplY3QgaGFzIGFscmVhZHkgYmVlbiB1cGRhdGVkXG4gICAgICAgIGlmICghaXNQYXRoTm90aWZpY2F0aW9uKSB7XG4gICAgICAgICAgbGV0IG9sZCA9IGdldCh0aGlzLCBwYXRoKTtcbiAgICAgICAgICBwYXRoID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChzZXQodGhpcywgcGF0aCwgdmFsdWUpKTtcbiAgICAgICAgICAvLyBVc2UgcHJvcGVydHktYWNjZXNzb3IncyBzaW1wbGVyIGRpcnR5IGNoZWNrXG4gICAgICAgICAgaWYgKCFwYXRoIHx8ICFzdXBlci5fc2hvdWxkUHJvcGVydHlDaGFuZ2UocGF0aCwgdmFsdWUsIG9sZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fX2RhdGFIYXNQYXRocyA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9zZXRQZW5kaW5nUHJvcGVydHkoLyoqQHR5cGV7c3RyaW5nfSovKHBhdGgpLCB2YWx1ZSwgc2hvdWxkTm90aWZ5KSkge1xuICAgICAgICAgIGNvbXB1dGVMaW5rZWRQYXRocyh0aGlzLCBwYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9fZGF0YUhhc0FjY2Vzc29yICYmIHRoaXMuX19kYXRhSGFzQWNjZXNzb3JbcGF0aF0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0UGVuZGluZ1Byb3BlcnR5KC8qKkB0eXBle3N0cmluZ30qLyhwYXRoKSwgdmFsdWUsIHNob3VsZE5vdGlmeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc1twYXRoXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIHZhbHVlIHRvIGEgbm9uLVBvbHltZXIgZWxlbWVudC9ub2RlJ3MgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBUaGUgaW1wbGVtZW50YXRpb24gbWFrZXMgYSBiZXN0LWVmZm9ydCBhdCBiaW5kaW5nIGludGVyb3A6XG4gICAgICogU29tZSBuYXRpdmUgZWxlbWVudCBwcm9wZXJ0aWVzIGhhdmUgc2lkZS1lZmZlY3RzIHdoZW5cbiAgICAgKiByZS1zZXR0aW5nIHRoZSBzYW1lIHZhbHVlIChlLmcuIHNldHRpbmcgYDxpbnB1dD4udmFsdWVgIHJlc2V0cyB0aGVcbiAgICAgKiBjdXJzb3IgcG9zaXRpb24pLCBzbyB3ZSBkbyBhIGRpcnR5LWNoZWNrIGJlZm9yZSBzZXR0aW5nIHRoZSB2YWx1ZS5cbiAgICAgKiBIb3dldmVyLCBmb3IgYmV0dGVyIGludGVyb3Agd2l0aCBub24tUG9seW1lciBjdXN0b20gZWxlbWVudHMgdGhhdFxuICAgICAqIGFjY2VwdCBvYmplY3RzLCB3ZSBleHBsaWNpdGx5IHJlLXNldCBvYmplY3QgY2hhbmdlcyBjb21pbmcgZnJvbSB0aGVcbiAgICAgKiBQb2x5bWVyIHdvcmxkICh3aGljaCBtYXkgaW5jbHVkZSBkZWVwIG9iamVjdCBjaGFuZ2VzIHdpdGhvdXQgdGhlXG4gICAgICogdG9wIHJlZmVyZW5jZSBjaGFuZ2luZyksIGVycmluZyBvbiB0aGUgc2lkZSBvZiBwcm92aWRpbmcgbW9yZVxuICAgICAqIGluZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogVXNlcnMgbWF5IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHByb3ZpZGUgYWx0ZXJuYXRlIGFwcHJvYWNoZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFOb2RlfSBub2RlIFRoZSBub2RlIHRvIHNldCBhIHByb3BlcnR5IG9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgVGhlIHByb3BlcnR5IHRvIHNldFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9zZXRVbm1hbmFnZWRQcm9wZXJ0eVRvTm9kZShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgLy8gSXQgaXMgYSBqdWRnbWVudCBjYWxsIHRoYXQgcmVzZXR0aW5nIHByaW1pdGl2ZXMgaXNcbiAgICAgIC8vIFwiYmFkXCIgYW5kIHJlc2V0dGluZ3Mgb2JqZWN0cyBpcyBhbHNvIFwiZ29vZFwiOyBhbHRlcm5hdGl2ZWx5IHdlIGNvdWxkXG4gICAgICAvLyBpbXBsZW1lbnQgYSB3aGl0ZWxpc3Qgb2YgdGFnICYgcHJvcGVydHkgdmFsdWVzIHRoYXQgc2hvdWxkIG5ldmVyXG4gICAgICAvLyBiZSByZXNldCAoZS5nLiA8aW5wdXQ+LnZhbHVlICYmIDxzZWxlY3Q+LnZhbHVlKVxuICAgICAgaWYgKHZhbHVlICE9PSBub2RlW3Byb3BdIHx8IHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBub2RlW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIHRoZSBgUHJvcGVydGllc0NoYW5nZWRgIGltcGxlbWVudGF0aW9uIHRvIGludHJvZHVjZSBzcGVjaWFsXG4gICAgICogZGlydHkgY2hlY2sgbG9naWMgZGVwZW5kaW5nIG9uIHRoZSBwcm9wZXJ0eSAmIHZhbHVlIGJlaW5nIHNldDpcbiAgICAgKlxuICAgICAqIDEuIEFueSB2YWx1ZSBzZXQgdG8gYSBwYXRoIChlLmcuICdvYmoucHJvcCc6IDQyIG9yICdvYmoucHJvcCc6IHsuLi59KVxuICAgICAqICAgIFN0b3JlZCBpbiBgX19kYXRhVGVtcGAsIGRpcnR5IGNoZWNrZWQgYWdhaW5zdCBgX19kYXRhVGVtcGBcbiAgICAgKiAyLiBPYmplY3Qgc2V0IHRvIHNpbXBsZSBwcm9wZXJ0eSAoZS5nLiAncHJvcCc6IHsuLi59KVxuICAgICAqICAgIFN0b3JlZCBpbiBgX19kYXRhVGVtcGAgYW5kIGBfX2RhdGFgLCBkaXJ0eSBjaGVja2VkIGFnYWluc3RcbiAgICAgKiAgICBgX19kYXRhVGVtcGAgYnkgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBgX3Nob3VsZFByb3BlcnR5Q2hhbmdlYFxuICAgICAqIDMuIFByaW1pdGl2ZSB2YWx1ZSBzZXQgdG8gc2ltcGxlIHByb3BlcnR5IChlLmcuICdwcm9wJzogNDIpXG4gICAgICogICAgU3RvcmVkIGluIGBfX2RhdGFgLCBkaXJ0eSBjaGVja2VkIGFnYWluc3QgYF9fZGF0YWBcbiAgICAgKlxuICAgICAqIFRoZSBkaXJ0eS1jaGVjayBpcyBpbXBvcnRhbnQgdG8gcHJldmVudCBjeWNsZXMgZHVlIHRvIHR3by13YXlcbiAgICAgKiBub3RpZmljYXRpb24sIGJ1dCBwYXRocyBhbmQgb2JqZWN0cyBhcmUgb25seSBkaXJ0eSBjaGVja2VkIGFnYWluc3QgYW55XG4gICAgICogcHJldmlvdXMgdmFsdWUgc2V0IGR1cmluZyB0aGlzIHR1cm4gdmlhIGEgXCJ0ZW1wb3JhcnkgY2FjaGVcIiB0aGF0IGlzXG4gICAgICogY2xlYXJlZCB3aGVuIHRoZSBsYXN0IGBfcHJvcGVydGllc0NoYW5nZWRgIGV4aXRzLiBUaGlzIGlzIHNvOlxuICAgICAqIGEuIGFueSBjYWNoZWQgYXJyYXkgcGF0aHMgKGUuZy4gJ2FycmF5LjMucHJvcCcpIG1heSBiZSBpbnZhbGlkYXRlZFxuICAgICAqICAgIGR1ZSB0byBhcnJheSBtdXRhdGlvbnMgbGlrZSBzaGlmdC91bnNoaWZ0L3NwbGljZTsgdGhpcyBpcyBmaW5lXG4gICAgICogICAgc2luY2UgcGF0aCBjaGFuZ2VzIGFyZSBkaXJ0eS1jaGVja2VkIGF0IHVzZXIgZW50cnkgcG9pbnRzIGxpa2UgYHNldGBcbiAgICAgKiBiLiBkaXJ0eS1jaGVja2luZyBmb3Igb2JqZWN0cyBvbmx5IGxhc3RzIG9uZSB0dXJuIHRvIGFsbG93IHRoZSB1c2VyXG4gICAgICogICAgdG8gbXV0YXRlIHRoZSBvYmplY3QgaW4tcGxhY2UgYW5kIHJlLXNldCBpdCB3aXRoIHRoZSBzYW1lIGlkZW50aXR5XG4gICAgICogICAgYW5kIGhhdmUgYWxsIHN1Yi1wcm9wZXJ0aWVzIHJlLXByb3BhZ2F0ZWQgaW4gYSBzdWJzZXF1ZW50IHR1cm4uXG4gICAgICpcbiAgICAgKiBUaGUgdGVtcCBjYWNoZSBpcyBub3QgbmVjZXNzYXJpbHkgc3VmZmljaWVudCB0byBwcmV2ZW50IGludmFsaWQgYXJyYXlcbiAgICAgKiBwYXRocywgc2luY2UgYSBzcGxpY2UgY2FuIGhhcHBlbiBkdXJpbmcgdGhlIHNhbWUgdHVybiAod2l0aCBwYXRob2xvZ2ljYWxcbiAgICAgKiB1c2VyIGNvZGUpOyB3ZSBjb3VsZCBpbnRyb2R1Y2UgYSBcImZpeHVwXCIgZm9yIHRlbXBvcmFyaWx5IGNhY2hlZCBhcnJheVxuICAgICAqIHBhdGhzIGlmIG5lZWRlZDogaHR0cHM6Ly9naXRodWIuY29tL1BvbHltZXIvcG9seW1lci9pc3N1ZXMvNDIyN1xuICAgICAqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IE5hbWUgb2YgdGhlIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBzZXRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGROb3RpZnkgVHJ1ZSBpZiBwcm9wZXJ0eSBzaG91bGQgZmlyZSBub3RpZmljYXRpb25cbiAgICAgKiAgIGV2ZW50IChhcHBsaWVzIG9ubHkgZm9yIGBub3RpZnk6IHRydWVgIHByb3BlcnRpZXMpXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSBjaGFuZ2VkXG4gICAgICovXG4gICAgX3NldFBlbmRpbmdQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUsIHNob3VsZE5vdGlmeSkge1xuICAgICAgbGV0IHByb3BJc1BhdGggPSB0aGlzLl9fZGF0YUhhc1BhdGhzICYmIGlzUGF0aChwcm9wZXJ0eSk7XG4gICAgICBsZXQgcHJldlByb3BzID0gcHJvcElzUGF0aCA/IHRoaXMuX19kYXRhVGVtcCA6IHRoaXMuX19kYXRhO1xuICAgICAgaWYgKHRoaXMuX3Nob3VsZFByb3BlcnR5Q2hhbmdlKHByb3BlcnR5LCB2YWx1ZSwgcHJldlByb3BzW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9fZGF0YVBlbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLl9fZGF0YVBlbmRpbmcgPSB7fTtcbiAgICAgICAgICB0aGlzLl9fZGF0YU9sZCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSBvbGQgaXMgY2FwdHVyZWQgZnJvbSB0aGUgbGFzdCB0dXJuXG4gICAgICAgIGlmICghKHByb3BlcnR5IGluIHRoaXMuX19kYXRhT2xkKSkge1xuICAgICAgICAgIHRoaXMuX19kYXRhT2xkW3Byb3BlcnR5XSA9IHRoaXMuX19kYXRhW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXRocyBhcmUgc3RvcmVkIGluIHRlbXBvcmFyeSBjYWNoZSAoY2xlYXJlZCBhdCBlbmQgb2YgdHVybiksXG4gICAgICAgIC8vIHdoaWNoIGlzIHVzZWQgZm9yIGRpcnR5LWNoZWNraW5nLCBhbGwgb3RoZXJzIHN0b3JlZCBpbiBfX2RhdGFcbiAgICAgICAgaWYgKHByb3BJc1BhdGgpIHtcbiAgICAgICAgICB0aGlzLl9fZGF0YVRlbXBbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fX2RhdGFbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWxsIGNoYW5nZXMgZ28gaW50byBwZW5kaW5nIHByb3BlcnR5IGJhZywgcGFzc2VkIHRvIF9wcm9wZXJ0aWVzQ2hhbmdlZFxuICAgICAgICB0aGlzLl9fZGF0YVBlbmRpbmdbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIC8vIFRyYWNrIHByb3BlcnRpZXMgdGhhdCBzaG91bGQgbm90aWZ5IHNlcGFyYXRlbHlcbiAgICAgICAgaWYgKHByb3BJc1BhdGggfHwgKHRoaXNbVFlQRVMuTk9USUZZXSAmJiB0aGlzW1RZUEVTLk5PVElGWV1bcHJvcGVydHldKSkge1xuICAgICAgICAgIHRoaXMuX19kYXRhVG9Ob3RpZnkgPSB0aGlzLl9fZGF0YVRvTm90aWZ5IHx8IHt9O1xuICAgICAgICAgIHRoaXMuX19kYXRhVG9Ob3RpZnlbcHJvcGVydHldID0gc2hvdWxkTm90aWZ5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBiYXNlIGltcGxlbWVudGF0aW9uIHRvIGVuc3VyZSBhbGwgYWNjZXNzb3JzIHNldCBgc2hvdWxkTm90aWZ5YFxuICAgICAqIHRvIHRydWUsIGZvciBwZXItcHJvcGVydHkgbm90aWZpY2F0aW9uIHRyYWNraW5nLlxuICAgICAqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IE5hbWUgb2YgdGhlIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBzZXRcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIF9zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLl9zZXRQZW5kaW5nUHJvcGVydHkocHJvcGVydHksIHZhbHVlLCB0cnVlKSkge1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlUHJvcGVydGllcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBgUHJvcGVydHlBY2Nlc3NvcmAncyBkZWZhdWx0IGFzeW5jIHF1ZXVpbmcgb2ZcbiAgICAgKiBgX3Byb3BlcnRpZXNDaGFuZ2VkYDogaWYgYF9fZGF0YVJlYWR5YCBpcyBmYWxzZSAoaGFzIG5vdCB5ZXQgYmVlblxuICAgICAqIG1hbnVhbGx5IGZsdXNoZWQpLCB0aGUgZnVuY3Rpb24gbm8tb3BzOyBvdGhlcndpc2UgZmx1c2hlc1xuICAgICAqIGBfcHJvcGVydGllc0NoYW5nZWRgIHN5bmNocm9ub3VzbHkuXG4gICAgICpcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIF9pbnZhbGlkYXRlUHJvcGVydGllcygpIHtcbiAgICAgIGlmICh0aGlzLl9fZGF0YVJlYWR5KSB7XG4gICAgICAgIHRoaXMuX2ZsdXNoUHJvcGVydGllcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVucXVldWVzIHRoZSBnaXZlbiBjbGllbnQgb24gYSBsaXN0IG9mIHBlbmRpbmcgY2xpZW50cywgd2hvc2VcbiAgICAgKiBwZW5kaW5nIHByb3BlcnR5IGNoYW5nZXMgY2FuIGxhdGVyIGJlIGZsdXNoZWQgdmlhIGEgY2FsbCB0b1xuICAgICAqIGBfZmx1c2hDbGllbnRzYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjbGllbnQgUHJvcGVydHlFZmZlY3RzIGNsaWVudCB0byBlbnF1ZXVlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2VucXVldWVDbGllbnQoY2xpZW50KSB7XG4gICAgICB0aGlzLl9fZGF0YVBlbmRpbmdDbGllbnRzID0gdGhpcy5fX2RhdGFQZW5kaW5nQ2xpZW50cyB8fCBbXTtcbiAgICAgIGlmIChjbGllbnQgIT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy5fX2RhdGFQZW5kaW5nQ2xpZW50cy5wdXNoKGNsaWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGVzIHN1cGVyY2xhc3MgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfZmx1c2hQcm9wZXJ0aWVzKCkge1xuICAgICAgdGhpcy5fX2RhdGFDb3VudGVyKys7XG4gICAgICBzdXBlci5fZmx1c2hQcm9wZXJ0aWVzKCk7XG4gICAgICB0aGlzLl9fZGF0YUNvdW50ZXItLTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbHVzaGVzIGFueSBjbGllbnRzIHByZXZpb3VzbHkgZW5xdWV1ZWQgdmlhIGBfZW5xdWV1ZUNsaWVudGAsIGNhdXNpbmdcbiAgICAgKiB0aGVpciBgX2ZsdXNoUHJvcGVydGllc2AgbWV0aG9kIHRvIHJ1bi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9mbHVzaENsaWVudHMoKSB7XG4gICAgICBpZiAoIXRoaXMuX19kYXRhQ2xpZW50c1JlYWR5KSB7XG4gICAgICAgIHRoaXMuX19kYXRhQ2xpZW50c1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVhZHlDbGllbnRzKCk7XG4gICAgICAgIC8vIE92ZXJyaWRlIHBvaW50IHdoZXJlIGFjY2Vzc29ycyBhcmUgdHVybmVkIG9uOyBpbXBvcnRhbnRseSxcbiAgICAgICAgLy8gdGhpcyBpcyBhZnRlciBjbGllbnRzIGhhdmUgZnVsbHkgcmVhZGllZCwgcHJvdmlkaW5nIGEgZ3VhcmFudGVlXG4gICAgICAgIC8vIHRoYXQgYW55IHByb3BlcnR5IGVmZmVjdHMgb2NjdXIgb25seSBhZnRlciBhbGwgY2xpZW50cyBhcmUgcmVhZHkuXG4gICAgICAgIHRoaXMuX19kYXRhUmVhZHkgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fX2VuYWJsZU9yRmx1c2hDbGllbnRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTk9URTogV2UgZW5zdXJlIGNsaWVudHMgZWl0aGVyIGVuYWJsZSBvciBmbHVzaCBhcyBhcHByb3ByaWF0ZS4gVGhpc1xuICAgIC8vIGhhbmRsZXMgdHdvIGNvcm5lciBjYXNlczpcbiAgICAvLyAoMSkgY2xpZW50cyBmbHVzaCBwcm9wZXJseSB3aGVuIGNvbm5lY3RlZC9lbmFibGVkIGJlZm9yZSB0aGUgaG9zdFxuICAgIC8vIGVuYWJsZXM7IGUuZy5cbiAgICAvLyAgIChhKSBUZW1wbGF0aXplIHN0YW1wcyB3aXRoIG5vIHByb3BlcnRpZXMgYW5kIGRvZXMgbm90IGZsdXNoIGFuZFxuICAgIC8vICAgKGIpIHRoZSBpbnN0YW5jZSBpcyBpbnNlcnRlZCBpbnRvIGRvbSBhbmRcbiAgICAvLyAgIChjKSB0aGVuIHRoZSBpbnN0YW5jZSBmbHVzaGVzLlxuICAgIC8vICgyKSBjbGllbnRzIGVuYWJsZSBwcm9wZXJseSB3aGVuIG5vdCBjb25uZWN0ZWQvZW5hYmxlZCB3aGVuIHRoZSBob3N0XG4gICAgLy8gZmx1c2hlczsgZS5nLlxuICAgIC8vICAgKGEpIGEgdGVtcGxhdGUgaXMgcnVudGltZSBzdGFtcGVkIGFuZCBub3QgeWV0IGNvbm5lY3RlZC9lbmFibGVkXG4gICAgLy8gICAoYikgYSBob3N0IHNldHMgYSBwcm9wZXJ0eSwgY2F1c2luZyBzdGFtcGVkIGRvbSB0byBmbHVzaFxuICAgIC8vICAgKGMpIHRoZSBzdGFtcGVkIGRvbSBlbmFibGVzLlxuICAgIF9fZW5hYmxlT3JGbHVzaENsaWVudHMoKSB7XG4gICAgICBsZXQgY2xpZW50cyA9IHRoaXMuX19kYXRhUGVuZGluZ0NsaWVudHM7XG4gICAgICBpZiAoY2xpZW50cykge1xuICAgICAgICB0aGlzLl9fZGF0YVBlbmRpbmdDbGllbnRzID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgY2xpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBjbGllbnQgPSBjbGllbnRzW2ldO1xuICAgICAgICAgIGlmICghY2xpZW50Ll9fZGF0YUVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNsaWVudC5fZW5hYmxlUHJvcGVydGllcygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2xpZW50Ll9fZGF0YVBlbmRpbmcpIHtcbiAgICAgICAgICAgIGNsaWVudC5fZmx1c2hQcm9wZXJ0aWVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbnkgaW5pdGlhbCBzZXR1cCBvbiBjbGllbnQgZG9tLiBDYWxsZWQgYmVmb3JlIHRoZSBmaXJzdFxuICAgICAqIGBfZmx1c2hQcm9wZXJ0aWVzYCBjYWxsIG9uIGNsaWVudCBkb20gYW5kIGJlZm9yZSBhbnkgZWxlbWVudFxuICAgICAqIG9ic2VydmVycyBhcmUgY2FsbGVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX3JlYWR5Q2xpZW50cygpIHtcbiAgICAgIHRoaXMuX19lbmFibGVPckZsdXNoQ2xpZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBiYWcgb2YgcHJvcGVydHkgY2hhbmdlcyB0byB0aGlzIGluc3RhbmNlLCBhbmRcbiAgICAgKiBzeW5jaHJvbm91c2x5IHByb2Nlc3NlcyBhbGwgZWZmZWN0cyBvZiB0aGUgcHJvcGVydGllcyBhcyBhIGJhdGNoLlxuICAgICAqXG4gICAgICogUHJvcGVydHkgbmFtZXMgbXVzdCBiZSBzaW1wbGUgcHJvcGVydGllcywgbm90IHBhdGhzLiAgQmF0Y2hlZFxuICAgICAqIHBhdGggcHJvcGFnYXRpb24gaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2Ygb25lIG9yIG1vcmUga2V5LXZhbHVlIHBhaXJzIHdob3NlIGtleSBpc1xuICAgICAqICAgYSBwcm9wZXJ0eSBhbmQgdmFsdWUgaXMgdGhlIG5ldyB2YWx1ZSB0byBzZXQgZm9yIHRoYXQgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gc2V0UmVhZE9ubHkgV2hlbiB0cnVlLCBhbnkgcHJpdmF0ZSB2YWx1ZXMgc2V0IGluXG4gICAgICogICBgcHJvcHNgIHdpbGwgYmUgc2V0LiBCeSBkZWZhdWx0LCBgc2V0UHJvcGVydGllc2Agd2lsbCBub3Qgc2V0XG4gICAgICogICBgcmVhZE9ubHk6IHRydWVgIHJvb3QgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzKHByb3BzLCBzZXRSZWFkT25seSkge1xuICAgICAgZm9yIChsZXQgcGF0aCBpbiBwcm9wcykge1xuICAgICAgICBpZiAoc2V0UmVhZE9ubHkgfHwgIXRoaXNbVFlQRVMuUkVBRF9PTkxZXSB8fCAhdGhpc1tUWVBFUy5SRUFEX09OTFldW3BhdGhdKSB7XG4gICAgICAgICAgLy9UT0RPKGtzY2hhYWYpOiBleHBsaWNpdGx5IGRpc2FsbG93IHBhdGhzIGluIHNldFByb3BlcnR5P1xuICAgICAgICAgIC8vIHdpbGRjYXJkIG9ic2VydmVycyBjdXJyZW50bHkgb25seSBwYXNzIHRoZSBmaXJzdCBjaGFuZ2VkIHBhdGhcbiAgICAgICAgICAvLyBpbiB0aGUgYGluZm9gIG9iamVjdCwgYW5kIHlvdSBjb3VsZCBkbyBzb21lIG9kZCB0aGluZ3MgYmF0Y2hpbmdcbiAgICAgICAgICAvLyBwYXRocywgZS5nLiB7J2Zvby5iYXInOiB7Li4ufSwgJ2Zvbyc6IG51bGx9XG4gICAgICAgICAgdGhpcy5fc2V0UGVuZGluZ1Byb3BlcnR5T3JQYXRoKHBhdGgsIHByb3BzW3BhdGhdLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5faW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZXMgYFByb3BlcnR5QWNjZXNzb3JzYCBzbyB0aGF0IHByb3BlcnR5IGFjY2Vzc29yXG4gICAgICogc2lkZSBlZmZlY3RzIGFyZSBub3QgZW5hYmxlZCB1bnRpbCBhZnRlciBjbGllbnQgZG9tIGlzIGZ1bGx5IHJlYWR5LlxuICAgICAqIEFsc28gY2FsbHMgYF9mbHVzaENsaWVudHNgIGNhbGxiYWNrIHRvIGVuc3VyZSBjbGllbnQgZG9tIGlzIGVuYWJsZWRcbiAgICAgKiB0aGF0IHdhcyBub3QgZW5hYmxlZCBhcyBhIHJlc3VsdCBvZiBmbHVzaGluZyBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICByZWFkeSgpIHtcbiAgICAgIC8vIEl0IGlzIGltcG9ydGFudCB0aGF0IGBzdXBlci5yZWFkeSgpYCBpcyBub3QgY2FsbGVkIGhlcmUgYXMgaXRcbiAgICAgIC8vIGltbWVkaWF0ZWx5IHR1cm5zIG9uIGFjY2Vzc29ycy4gSW5zdGVhZCwgd2Ugd2FpdCB1bnRpbCBgcmVhZHlDbGllbnRzYFxuICAgICAgLy8gdG8gZW5hYmxlIGFjY2Vzc29ycyB0byBwcm92aWRlIGEgZ3VhcmFudGVlIHRoYXQgY2xpZW50cyBhcmUgcmVhZHlcbiAgICAgIC8vIGJlZm9yZSBwcm9jZXNzaW5nIGFueSBhY2Nlc3NvcnMgc2lkZSBlZmZlY3RzLlxuICAgICAgdGhpcy5fZmx1c2hQcm9wZXJ0aWVzKCk7XG4gICAgICAvLyBJZiBubyBkYXRhIHdhcyBwZW5kaW5nLCBgX2ZsdXNoUHJvcGVydGllc2Agd2lsbCBub3QgYGZsdXNoQ2xpZW50c2BcbiAgICAgIC8vIHNvIGVuc3VyZSB0aGlzIGlzIGRvbmUuXG4gICAgICBpZiAoIXRoaXMuX19kYXRhQ2xpZW50c1JlYWR5KSB7XG4gICAgICAgIHRoaXMuX2ZsdXNoQ2xpZW50cygpO1xuICAgICAgfVxuICAgICAgLy8gQmVmb3JlIHJlYWR5LCBjbGllbnQgbm90aWZpY2F0aW9ucyBkbyBub3QgdHJpZ2dlciBfZmx1c2hQcm9wZXJ0aWVzLlxuICAgICAgLy8gVGhlcmVmb3JlIGEgZmx1c2ggaXMgbmVjZXNzYXJ5IGhlcmUgaWYgZGF0YSBoYXMgYmVlbiBzZXQuXG4gICAgICBpZiAodGhpcy5fX2RhdGFQZW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZsdXNoUHJvcGVydGllcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudHMgYFByb3BlcnR5QWNjZXNzb3JzYCdzIHByb3BlcnRpZXMgY2hhbmdlZCBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIFJ1bnMgZWFjaCBjbGFzcyBvZiBlZmZlY3RzIGZvciB0aGUgYmF0Y2ggb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIGluXG4gICAgICogYSBzcGVjaWZpYyBvcmRlciAoY29tcHV0ZSwgcHJvcGFnYXRlLCByZWZsZWN0LCBvYnNlcnZlLCBub3RpZnkpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHshT2JqZWN0fSBjdXJyZW50UHJvcHMgQmFnIG9mIGFsbCBjdXJyZW50IGFjY2Vzc29yIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7P09iamVjdH0gY2hhbmdlZFByb3BzIEJhZyBvZiBwcm9wZXJ0aWVzIGNoYW5nZWQgc2luY2UgdGhlIGxhc3RcbiAgICAgKiAgIGNhbGwgdG8gYF9wcm9wZXJ0aWVzQ2hhbmdlZGBcbiAgICAgKiBAcGFyYW0gez9PYmplY3R9IG9sZFByb3BzIEJhZyBvZiBwcmV2aW91cyB2YWx1ZXMgZm9yIGVhY2ggcHJvcGVydHlcbiAgICAgKiAgIGluIGBjaGFuZ2VkUHJvcHNgXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICBfcHJvcGVydGllc0NoYW5nZWQoY3VycmVudFByb3BzLCBjaGFuZ2VkUHJvcHMsIG9sZFByb3BzKSB7XG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBsZXQgYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNoYW5nZWRQcm9wcyB8fCB7fSk7XG4gICAgICAvLyB3aW5kb3cuZGVidWcgJiYgY29uc29sZS5ncm91cCh0aGlzLmxvY2FsTmFtZSArICcjJyArIHRoaXMuaWQgKyAnOiAnICsgYyk7XG4gICAgICAvLyBpZiAod2luZG93LmRlYnVnKSB7IGRlYnVnZ2VyOyB9XG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBsZXQgaGFzUGF0aHMgPSB0aGlzLl9fZGF0YUhhc1BhdGhzO1xuICAgICAgdGhpcy5fX2RhdGFIYXNQYXRocyA9IGZhbHNlO1xuICAgICAgLy8gQ29tcHV0ZSBwcm9wZXJ0aWVzXG4gICAgICBydW5Db21wdXRlZEVmZmVjdHModGhpcywgY2hhbmdlZFByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpO1xuICAgICAgLy8gQ2xlYXIgbm90aWZ5IHByb3BlcnRpZXMgcHJpb3IgdG8gcG9zc2libGUgcmVlbnRyeSAocHJvcGFnYXRlLCBvYnNlcnZlKSxcbiAgICAgIC8vIGJ1dCBhZnRlciBjb21wdXRpbmcgZWZmZWN0cyBoYXZlIGEgY2hhbmNlIHRvIGFkZCB0byB0aGVtXG4gICAgICBsZXQgbm90aWZ5UHJvcHMgPSB0aGlzLl9fZGF0YVRvTm90aWZ5O1xuICAgICAgdGhpcy5fX2RhdGFUb05vdGlmeSA9IG51bGw7XG4gICAgICAvLyBQcm9wYWdhdGUgcHJvcGVydGllcyB0byBjbGllbnRzXG4gICAgICB0aGlzLl9wcm9wYWdhdGVQcm9wZXJ0eUNoYW5nZXMoY2hhbmdlZFByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpO1xuICAgICAgLy8gRmx1c2ggY2xpZW50c1xuICAgICAgdGhpcy5fZmx1c2hDbGllbnRzKCk7XG4gICAgICAvLyBSZWZsZWN0IHByb3BlcnRpZXNcbiAgICAgIHJ1bkVmZmVjdHModGhpcywgdGhpc1tUWVBFUy5SRUZMRUNUXSwgY2hhbmdlZFByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpO1xuICAgICAgLy8gT2JzZXJ2ZSBwcm9wZXJ0aWVzXG4gICAgICBydW5FZmZlY3RzKHRoaXMsIHRoaXNbVFlQRVMuT0JTRVJWRV0sIGNoYW5nZWRQcm9wcywgb2xkUHJvcHMsIGhhc1BhdGhzKTtcbiAgICAgIC8vIE5vdGlmeSBwcm9wZXJ0aWVzIHRvIGhvc3RcbiAgICAgIGlmIChub3RpZnlQcm9wcykge1xuICAgICAgICBydW5Ob3RpZnlFZmZlY3RzKHRoaXMsIG5vdGlmeVByb3BzLCBjaGFuZ2VkUHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocyk7XG4gICAgICB9XG4gICAgICAvLyBDbGVhciB0ZW1wb3JhcnkgY2FjaGUgYXQgZW5kIG9mIHR1cm5cbiAgICAgIGlmICh0aGlzLl9fZGF0YUNvdW50ZXIgPT0gMSkge1xuICAgICAgICB0aGlzLl9fZGF0YVRlbXAgPSB7fTtcbiAgICAgIH1cbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIC8vIHdpbmRvdy5kZWJ1ZyAmJiBjb25zb2xlLmdyb3VwRW5kKHRoaXMubG9jYWxOYW1lICsgJyMnICsgdGhpcy5pZCArICc6ICcgKyBjKTtcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdG8gcHJvcGFnYXRlIGFueSBwcm9wZXJ0eSBjaGFuZ2VzIHRvIHN0YW1wZWQgdGVtcGxhdGUgbm9kZXNcbiAgICAgKiBtYW5hZ2VkIGJ5IHRoaXMgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuZ2VkUHJvcHMgQmFnIG9mIGNoYW5nZWQgcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBjaGFuZ2VkIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhhc1BhdGhzIFRydWUgd2l0aCBgcHJvcHNgIGNvbnRhaW5zIG9uZSBvciBtb3JlIHBhdGhzXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX3Byb3BhZ2F0ZVByb3BlcnR5Q2hhbmdlcyhjaGFuZ2VkUHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocykge1xuICAgICAgaWYgKHRoaXNbVFlQRVMuUFJPUEFHQVRFXSkge1xuICAgICAgICBydW5FZmZlY3RzKHRoaXMsIHRoaXNbVFlQRVMuUFJPUEFHQVRFXSwgY2hhbmdlZFByb3BzLCBvbGRQcm9wcywgaGFzUGF0aHMpO1xuICAgICAgfVxuICAgICAgbGV0IHRlbXBsYXRlSW5mbyA9IHRoaXMuX190ZW1wbGF0ZUluZm87XG4gICAgICB3aGlsZSAodGVtcGxhdGVJbmZvKSB7XG4gICAgICAgIHJ1bkVmZmVjdHModGhpcywgdGVtcGxhdGVJbmZvLnByb3BlcnR5RWZmZWN0cywgY2hhbmdlZFByb3BzLCBvbGRQcm9wcyxcbiAgICAgICAgICBoYXNQYXRocywgdGVtcGxhdGVJbmZvLm5vZGVMaXN0KTtcbiAgICAgICAgdGVtcGxhdGVJbmZvID0gdGVtcGxhdGVJbmZvLm5leHRUZW1wbGF0ZUluZm87XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXNlcyBvbmUgZGF0YSBwYXRoIGFzIGFub3RoZXIsIHN1Y2ggdGhhdCBwYXRoIG5vdGlmaWNhdGlvbnMgZnJvbSBvbmVcbiAgICAgKiBhcmUgcm91dGVkIHRvIHRoZSBvdGhlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSB0byBUYXJnZXQgcGF0aCB0byBsaW5rLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSBmcm9tIFNvdXJjZSBwYXRoIHRvIGxpbmsuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlua1BhdGhzKHRvLCBmcm9tKSB7XG4gICAgICB0byA9IG5vcm1hbGl6ZSh0byk7XG4gICAgICBmcm9tID0gbm9ybWFsaXplKGZyb20pO1xuICAgICAgdGhpcy5fX2RhdGFMaW5rZWRQYXRocyA9IHRoaXMuX19kYXRhTGlua2VkUGF0aHMgfHwge307XG4gICAgICB0aGlzLl9fZGF0YUxpbmtlZFBhdGhzW3RvXSA9IGZyb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGRhdGEgcGF0aCBhbGlhcyBwcmV2aW91c2x5IGVzdGFibGlzaGVkIHdpdGggYF9saW5rUGF0aHNgLlxuICAgICAqXG4gICAgICogTm90ZSwgdGhlIHBhdGggdG8gdW5saW5rIHNob3VsZCBiZSB0aGUgdGFyZ2V0IChgdG9gKSB1c2VkIHdoZW5cbiAgICAgKiBsaW5raW5nIHRoZSBwYXRocy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSBwYXRoIFRhcmdldCBwYXRoIHRvIHVubGluay5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmxpbmtQYXRocyhwYXRoKSB7XG4gICAgICBwYXRoID0gbm9ybWFsaXplKHBhdGgpO1xuICAgICAgaWYgKHRoaXMuX19kYXRhTGlua2VkUGF0aHMpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX19kYXRhTGlua2VkUGF0aHNbcGF0aF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoYXQgYW4gYXJyYXkgaGFzIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogICAgIHRoaXMuaXRlbXMgPSBbIHtuYW1lOiAnSmltJ30sIHtuYW1lOiAnVG9kZCd9LCB7bmFtZTogJ0JpbGwnfSBdO1xuICAgICAqICAgICAuLi5cbiAgICAgKiAgICAgdGhpcy5pdGVtcy5zcGxpY2UoMSwgMSwge25hbWU6ICdTYW0nfSk7XG4gICAgICogICAgIHRoaXMuaXRlbXMucHVzaCh7bmFtZTogJ0JvYid9KTtcbiAgICAgKiAgICAgdGhpcy5ub3RpZnlTcGxpY2VzKCdpdGVtcycsIFtcbiAgICAgKiAgICAgICB7IGluZGV4OiAxLCByZW1vdmVkOiBbe25hbWU6ICdUb2RkJ31dLCBhZGRlZENvdW50OiAxLCBvYmplY3Q6IHRoaXMuaXRlbXMsIHR5cGU6ICdzcGxpY2UnIH0sXG4gICAgICogICAgICAgeyBpbmRleDogMywgcmVtb3ZlZDogW10sIGFkZGVkQ291bnQ6IDEsIG9iamVjdDogdGhpcy5pdGVtcywgdHlwZTogJ3NwbGljZSd9XG4gICAgICogICAgIF0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCB0aGF0IHNob3VsZCBiZSBub3RpZmllZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzcGxpY2VzIEFycmF5IG9mIHNwbGljZSByZWNvcmRzIGluZGljYXRpbmcgb3JkZXJlZFxuICAgICAqICAgY2hhbmdlcyB0aGF0IG9jY3VycmVkIHRvIHRoZSBhcnJheS4gRWFjaCByZWNvcmQgc2hvdWxkIGhhdmUgdGhlXG4gICAgICogICBmb2xsb3dpbmcgZmllbGRzOlxuICAgICAqICAgICogaW5kZXg6IGluZGV4IGF0IHdoaWNoIHRoZSBjaGFuZ2Ugb2NjdXJyZWRcbiAgICAgKiAgICAqIHJlbW92ZWQ6IGFycmF5IG9mIGl0ZW1zIHRoYXQgd2VyZSByZW1vdmVkIGZyb20gdGhpcyBpbmRleFxuICAgICAqICAgICogYWRkZWRDb3VudDogbnVtYmVyIG9mIG5ldyBpdGVtcyBhZGRlZCBhdCB0aGlzIGluZGV4XG4gICAgICogICAgKiBvYmplY3Q6IGEgcmVmZXJlbmNlIHRvIHRoZSBhcnJheSBpbiBxdWVzdGlvblxuICAgICAqICAgICogdHlwZTogdGhlIHN0cmluZyBsaXRlcmFsICdzcGxpY2UnXG4gICAgICpcbiAgICAgKiAgIE5vdGUgdGhhdCBzcGxpY2UgcmVjb3JkcyBfbXVzdF8gYmUgbm9ybWFsaXplZCBzdWNoIHRoYXQgdGhleSBhcmVcbiAgICAgKiAgIHJlcG9ydGVkIGluIGluZGV4IG9yZGVyIChyYXcgcmVzdWx0cyBmcm9tIGBPYmplY3Qub2JzZXJ2ZWAgYXJlIG5vdFxuICAgICAqICAgb3JkZXJlZCBhbmQgbXVzdCBiZSBub3JtYWxpemVkL21lcmdlZCBiZWZvcmUgbm90aWZ5aW5nKS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAqL1xuICAgIG5vdGlmeVNwbGljZXMocGF0aCwgc3BsaWNlcykge1xuICAgICAgbGV0IGluZm8gPSB7cGF0aDogJyd9O1xuICAgICAgbGV0IGFycmF5ID0gLyoqIEB0eXBlIHtBcnJheX0gKi8oZ2V0KHRoaXMsIHBhdGgsIGluZm8pKTtcbiAgICAgIG5vdGlmeVNwbGljZXModGhpcywgYXJyYXksIGluZm8ucGF0aCwgc3BsaWNlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVuaWVuY2UgbWV0aG9kIGZvciByZWFkaW5nIGEgdmFsdWUgZnJvbSBhIHBhdGguXG4gICAgICpcbiAgICAgKiBOb3RlLCBpZiBhbnkgcGFydCBpbiB0aGUgcGF0aCBpcyB1bmRlZmluZWQsIHRoaXMgbWV0aG9kIHJldHVybnNcbiAgICAgKiBgdW5kZWZpbmVkYCAodGhpcyBtZXRob2QgZG9lcyBub3QgdGhyb3cgd2hlbiBkZXJlZmVyZW5jaW5nIHVuZGVmaW5lZFxuICAgICAqIHBhdGhzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7KHN0cmluZ3whQXJyYXk8KHN0cmluZ3xudW1iZXIpPil9IHBhdGggUGF0aCB0byB0aGUgdmFsdWVcbiAgICAgKiAgIHRvIHJlYWQuICBUaGUgcGF0aCBtYXkgYmUgc3BlY2lmaWVkIGFzIGEgc3RyaW5nIChlLmcuIGBmb28uYmFyLmJhemApXG4gICAgICogICBvciBhbiBhcnJheSBvZiBwYXRoIHBhcnRzIChlLmcuIGBbJ2Zvby5iYXInLCAnYmF6J11gKS4gIE5vdGUgdGhhdFxuICAgICAqICAgYnJhY2tldGVkIGV4cHJlc3Npb25zIGFyZSBub3Qgc3VwcG9ydGVkOyBzdHJpbmctYmFzZWQgcGF0aCBwYXJ0c1xuICAgICAqICAgKm11c3QqIGJlIHNlcGFyYXRlZCBieSBkb3RzLiAgTm90ZSB0aGF0IHdoZW4gZGVyZWZlcmVuY2luZyBhcnJheVxuICAgICAqICAgaW5kaWNlcywgdGhlIGluZGV4IG1heSBiZSB1c2VkIGFzIGEgZG90dGVkIHBhcnQgZGlyZWN0bHlcbiAgICAgKiAgIChlLmcuIGB1c2Vycy4xMi5uYW1lYCBvciBgWyd1c2VycycsIDEyLCAnbmFtZSddYCkuXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSByb290IFJvb3Qgb2JqZWN0IGZyb20gd2hpY2ggdGhlIHBhdGggaXMgZXZhbHVhdGVkLlxuICAgICAqIEByZXR1cm4geyp9IFZhbHVlIGF0IHRoZSBwYXRoLCBvciBgdW5kZWZpbmVkYCBpZiBhbnkgcGFydCBvZiB0aGUgcGF0aFxuICAgICAqICAgaXMgdW5kZWZpbmVkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBnZXQocGF0aCwgcm9vdCkge1xuICAgICAgcmV0dXJuIGdldChyb290IHx8IHRoaXMsIHBhdGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbmNlIG1ldGhvZCBmb3Igc2V0dGluZyBhIHZhbHVlIHRvIGEgcGF0aCBhbmQgbm90aWZ5aW5nIGFueVxuICAgICAqIGVsZW1lbnRzIGJvdW5kIHRvIHRoZSBzYW1lIHBhdGguXG4gICAgICpcbiAgICAgKiBOb3RlLCBpZiBhbnkgcGFydCBpbiB0aGUgcGF0aCBleGNlcHQgZm9yIHRoZSBsYXN0IGlzIHVuZGVmaW5lZCxcbiAgICAgKiB0aGlzIG1ldGhvZCBkb2VzIG5vdGhpbmcgKHRoaXMgbWV0aG9kIGRvZXMgbm90IHRocm93IHdoZW5cbiAgICAgKiBkZXJlZmVyZW5jaW5nIHVuZGVmaW5lZCBwYXRocykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyhzdHJpbmd8IUFycmF5PChzdHJpbmd8bnVtYmVyKT4pfSBwYXRoIFBhdGggdG8gdGhlIHZhbHVlXG4gICAgICogICB0byB3cml0ZS4gIFRoZSBwYXRoIG1heSBiZSBzcGVjaWZpZWQgYXMgYSBzdHJpbmcgKGUuZy4gYCdmb28uYmFyLmJheidgKVxuICAgICAqICAgb3IgYW4gYXJyYXkgb2YgcGF0aCBwYXJ0cyAoZS5nLiBgWydmb28uYmFyJywgJ2JheiddYCkuICBOb3RlIHRoYXRcbiAgICAgKiAgIGJyYWNrZXRlZCBleHByZXNzaW9ucyBhcmUgbm90IHN1cHBvcnRlZDsgc3RyaW5nLWJhc2VkIHBhdGggcGFydHNcbiAgICAgKiAgICptdXN0KiBiZSBzZXBhcmF0ZWQgYnkgZG90cy4gIE5vdGUgdGhhdCB3aGVuIGRlcmVmZXJlbmNpbmcgYXJyYXlcbiAgICAgKiAgIGluZGljZXMsIHRoZSBpbmRleCBtYXkgYmUgdXNlZCBhcyBhIGRvdHRlZCBwYXJ0IGRpcmVjdGx5XG4gICAgICogICAoZS5nLiBgJ3VzZXJzLjEyLm5hbWUnYCBvciBgWyd1c2VycycsIDEyLCAnbmFtZSddYCkuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBzZXQgYXQgdGhlIHNwZWNpZmllZCBwYXRoLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gcm9vdCBSb290IG9iamVjdCBmcm9tIHdoaWNoIHRoZSBwYXRoIGlzIGV2YWx1YXRlZC5cbiAgICAgKiAgIFdoZW4gc3BlY2lmaWVkLCBubyBub3RpZmljYXRpb24gd2lsbCBvY2N1ci5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAqL1xuICAgIHNldChwYXRoLCB2YWx1ZSwgcm9vdCkge1xuICAgICAgaWYgKHJvb3QpIHtcbiAgICAgICAgc2V0KHJvb3QsIHBhdGgsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpc1tUWVBFUy5SRUFEX09OTFldIHx8ICF0aGlzW1RZUEVTLlJFQURfT05MWV1bLyoqIEB0eXBlIHtzdHJpbmd9ICovKHBhdGgpXSkge1xuICAgICAgICAgIGlmICh0aGlzLl9zZXRQZW5kaW5nUHJvcGVydHlPclBhdGgocGF0aCwgdmFsdWUsIHRydWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnZhbGlkYXRlUHJvcGVydGllcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgaXRlbXMgb250byB0aGUgZW5kIG9mIHRoZSBhcnJheSBhdCB0aGUgcGF0aCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBUaGUgYXJndW1lbnRzIGFmdGVyIGBwYXRoYCBhbmQgcmV0dXJuIHZhbHVlIG1hdGNoIHRoYXQgb2ZcbiAgICAgKiBgQXJyYXkucHJvdG90eXBlLnB1c2hgLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2Qgbm90aWZpZXMgb3RoZXIgcGF0aHMgdG8gdGhlIHNhbWUgYXJyYXkgdGhhdCBhXG4gICAgICogc3BsaWNlIG9jY3VycmVkIHRvIHRoZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSBwYXRoIFBhdGggdG8gYXJyYXkuXG4gICAgICogQHBhcmFtIHsuLi4qfSBpdGVtcyBJdGVtcyB0byBwdXNoIG9udG8gYXJyYXlcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IE5ldyBsZW5ndGggb2YgdGhlIGFycmF5LlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdXNoKHBhdGgsIC4uLml0ZW1zKSB7XG4gICAgICBsZXQgaW5mbyA9IHtwYXRoOiAnJ307XG4gICAgICBsZXQgYXJyYXkgPSAvKiogQHR5cGUge0FycmF5fSovKGdldCh0aGlzLCBwYXRoLCBpbmZvKSk7XG4gICAgICBsZXQgbGVuID0gYXJyYXkubGVuZ3RoO1xuICAgICAgbGV0IHJldCA9IGFycmF5LnB1c2goLi4uaXRlbXMpO1xuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBub3RpZnlTcGxpY2UodGhpcywgYXJyYXksIGluZm8ucGF0aCwgbGVuLCBpdGVtcy5sZW5ndGgsIFtdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGVuZCBvZiBhcnJheSBhdCB0aGUgcGF0aCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBUaGUgYXJndW1lbnRzIGFmdGVyIGBwYXRoYCBhbmQgcmV0dXJuIHZhbHVlIG1hdGNoIHRoYXQgb2ZcbiAgICAgKiBgQXJyYXkucHJvdG90eXBlLnBvcGAuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBub3RpZmllcyBvdGhlciBwYXRocyB0byB0aGUgc2FtZSBhcnJheSB0aGF0IGFcbiAgICAgKiBzcGxpY2Ugb2NjdXJyZWQgdG8gdGhlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCAhQXJyYXk8c3RyaW5nfG51bWJlcj59IHBhdGggUGF0aCB0byBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHsqfSBJdGVtIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHBvcChwYXRoKSB7XG4gICAgICBsZXQgaW5mbyA9IHtwYXRoOiAnJ307XG4gICAgICBsZXQgYXJyYXkgPSAvKiogQHR5cGUge0FycmF5fSAqLyhnZXQodGhpcywgcGF0aCwgaW5mbykpO1xuICAgICAgbGV0IGhhZExlbmd0aCA9IEJvb2xlYW4oYXJyYXkubGVuZ3RoKTtcbiAgICAgIGxldCByZXQgPSBhcnJheS5wb3AoKTtcbiAgICAgIGlmIChoYWRMZW5ndGgpIHtcbiAgICAgICAgbm90aWZ5U3BsaWNlKHRoaXMsIGFycmF5LCBpbmZvLnBhdGgsIGFycmF5Lmxlbmd0aCwgMCwgW3JldF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydGluZyBmcm9tIHRoZSBzdGFydCBpbmRleCBzcGVjaWZpZWQsIHJlbW92ZXMgMCBvciBtb3JlIGl0ZW1zXG4gICAgICogZnJvbSB0aGUgYXJyYXkgYW5kIGluc2VydHMgMCBvciBtb3JlIG5ldyBpdGVtcyBpbiB0aGVpciBwbGFjZS5cbiAgICAgKlxuICAgICAqIFRoZSBhcmd1bWVudHMgYWZ0ZXIgYHBhdGhgIGFuZCByZXR1cm4gdmFsdWUgbWF0Y2ggdGhhdCBvZlxuICAgICAqIGBBcnJheS5wcm90b3R5cGUuc3BsaWNlYC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG5vdGlmaWVzIG90aGVyIHBhdGhzIHRvIHRoZSBzYW1lIGFycmF5IHRoYXQgYVxuICAgICAqIHNwbGljZSBvY2N1cnJlZCB0byB0aGUgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8ICFBcnJheTxzdHJpbmd8bnVtYmVyPn0gcGF0aCBQYXRoIHRvIGFycmF5LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBJbmRleCBmcm9tIHdoaWNoIHRvIHN0YXJ0IHJlbW92aW5nL2luc2VydGluZy5cbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGRlbGV0ZUNvdW50IE51bWJlciBvZiBpdGVtcyB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHsuLi4qfSBpdGVtcyBJdGVtcyB0byBpbnNlcnQgaW50byBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgb2YgcmVtb3ZlZCBpdGVtcy5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc3BsaWNlKHBhdGgsIHN0YXJ0LCBkZWxldGVDb3VudCwgLi4uaXRlbXMpIHtcbiAgICAgIGxldCBpbmZvID0ge3BhdGggOiAnJ307XG4gICAgICBsZXQgYXJyYXkgPSAvKiogQHR5cGUge0FycmF5fSAqLyhnZXQodGhpcywgcGF0aCwgaW5mbykpO1xuICAgICAgLy8gTm9ybWFsaXplIGZhbmN5IG5hdGl2ZSBzcGxpY2UgaGFuZGxpbmcgb2YgY3Jhenkgc3RhcnQgdmFsdWVzXG4gICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgIHN0YXJ0ID0gYXJyYXkubGVuZ3RoIC0gTWF0aC5mbG9vcigtc3RhcnQpO1xuICAgICAgfSBlbHNlIGlmIChzdGFydCkge1xuICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQpO1xuICAgICAgfVxuICAgICAgLy8gYXJyYXkuc3BsaWNlIGRvZXMgZGlmZmVyZW50IHRoaW5ncyBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICAgICAgLy8geW91IHBhc3MgaW4uIFRoZXJlZm9yZSwgYXJyYXkuc3BsaWNlKDApIGFuZCBhcnJheS5zcGxpY2UoMCwgdW5kZWZpbmVkKVxuICAgICAgLy8gZG8gZGlmZmVyZW50IHRoaW5ncy4gSW4gdGhlIGZvcm1lciwgdGhlIHdob2xlIGFycmF5IGlzIGNsZWFyZWQuIEluIHRoZVxuICAgICAgLy8gbGF0dGVyLCBubyBpdGVtcyBhcmUgcmVtb3ZlZC5cbiAgICAgIC8vIFRoaXMgbWVhbnMgdGhhdCB3ZSBuZWVkIHRvIGRldGVjdCB3aGV0aGVyIDEuIG9uZSBvZiB0aGUgYXJndW1lbnRzXG4gICAgICAvLyBpcyBhY3R1YWxseSBwYXNzZWQgaW4gYW5kIHRoZW4gMi4gZGV0ZXJtaW5lIGhvdyBtYW55IGFyZ3VtZW50c1xuICAgICAgLy8gd2Ugc2hvdWxkIHBhc3Mgb24gdG8gdGhlIG5hdGl2ZSBhcnJheS5zcGxpY2VcbiAgICAgIC8vXG4gICAgICBsZXQgcmV0O1xuICAgICAgLy8gT21pdCBhbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgaWYgdGhleSB3ZXJlIG5vdCBwYXNzZWQgaW5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHJldCA9IGFycmF5LnNwbGljZShzdGFydCk7XG4gICAgICAvLyBFaXRoZXIgc3RhcnQgd2FzIHVuZGVmaW5lZCBhbmQgdGhlIG90aGVycyB3ZXJlIGRlZmluZWQsIGJ1dCBpbiB0aGlzXG4gICAgICAvLyBjYXNlIHdlIGNhbiBzYWZlbHkgcGFzcyBvbiBhbGwgYXJndW1lbnRzXG4gICAgICAvL1xuICAgICAgLy8gTm90ZTogdGhpcyBpbmNsdWRlcyB0aGUgY2FzZSB3aGVyZSBub25lIG9mIHRoZSBhcmd1bWVudHMgd2VyZSBwYXNzZWQgaW4sXG4gICAgICAvLyBlLmcuIHRoaXMuc3BsaWNlKCdhcnJheScpLiBIb3dldmVyLCBpZiBib3RoIHN0YXJ0IGFuZCBkZWxldGVDb3VudFxuICAgICAgLy8gYXJlIHVuZGVmaW5lZCwgYXJyYXkuc3BsaWNlIHdpbGwgbm90IG1vZGlmeSB0aGUgYXJyYXkgKGFzIGV4cGVjdGVkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gYXJyYXkuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCwgLi4uaXRlbXMpO1xuICAgICAgfVxuICAgICAgLy8gQXQgdGhlIGVuZCwgY2hlY2sgd2hldGhlciBhbnkgaXRlbXMgd2VyZSBwYXNzZWQgaW4gKGUuZy4gaW5zZXJ0aW9ucylcbiAgICAgIC8vIG9yIGlmIHRoZSByZXR1cm4gYXJyYXkgY29udGFpbnMgaXRlbXMgKGUuZy4gZGVsZXRpb25zKS5cbiAgICAgIC8vIE9ubHkgbm90aWZ5IGlmIGl0ZW1zIHdlcmUgYWRkZWQgb3IgZGVsZXRlZC5cbiAgICAgIGlmIChpdGVtcy5sZW5ndGggfHwgcmV0Lmxlbmd0aCkge1xuICAgICAgICBub3RpZnlTcGxpY2UodGhpcywgYXJyYXksIGluZm8ucGF0aCwgc3RhcnQsIGl0ZW1zLmxlbmd0aCwgcmV0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIGJlZ2lubmluZyBvZiBhcnJheSBhdCB0aGUgcGF0aCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBUaGUgYXJndW1lbnRzIGFmdGVyIGBwYXRoYCBhbmQgcmV0dXJuIHZhbHVlIG1hdGNoIHRoYXQgb2ZcbiAgICAgKiBgQXJyYXkucHJvdG90eXBlLnBvcGAuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBub3RpZmllcyBvdGhlciBwYXRocyB0byB0aGUgc2FtZSBhcnJheSB0aGF0IGFcbiAgICAgKiBzcGxpY2Ugb2NjdXJyZWQgdG8gdGhlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCAhQXJyYXk8c3RyaW5nfG51bWJlcj59IHBhdGggUGF0aCB0byBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHsqfSBJdGVtIHRoYXQgd2FzIHJlbW92ZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNoaWZ0KHBhdGgpIHtcbiAgICAgIGxldCBpbmZvID0ge3BhdGg6ICcnfTtcbiAgICAgIGxldCBhcnJheSA9IC8qKiBAdHlwZSB7QXJyYXl9ICovKGdldCh0aGlzLCBwYXRoLCBpbmZvKSk7XG4gICAgICBsZXQgaGFkTGVuZ3RoID0gQm9vbGVhbihhcnJheS5sZW5ndGgpO1xuICAgICAgbGV0IHJldCA9IGFycmF5LnNoaWZ0KCk7XG4gICAgICBpZiAoaGFkTGVuZ3RoKSB7XG4gICAgICAgIG5vdGlmeVNwbGljZSh0aGlzLCBhcnJheSwgaW5mby5wYXRoLCAwLCAwLCBbcmV0XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgaXRlbXMgb250byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheSBhdCB0aGUgcGF0aCBzcGVjaWZpZWQuXG4gICAgICpcbiAgICAgKiBUaGUgYXJndW1lbnRzIGFmdGVyIGBwYXRoYCBhbmQgcmV0dXJuIHZhbHVlIG1hdGNoIHRoYXQgb2ZcbiAgICAgKiBgQXJyYXkucHJvdG90eXBlLnB1c2hgLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2Qgbm90aWZpZXMgb3RoZXIgcGF0aHMgdG8gdGhlIHNhbWUgYXJyYXkgdGhhdCBhXG4gICAgICogc3BsaWNlIG9jY3VycmVkIHRvIHRoZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSBwYXRoIFBhdGggdG8gYXJyYXkuXG4gICAgICogQHBhcmFtIHsuLi4qfSBpdGVtcyBJdGVtcyB0byBpbnNlcnQgaW5mbyBhcnJheVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gTmV3IGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVuc2hpZnQocGF0aCwgLi4uaXRlbXMpIHtcbiAgICAgIGxldCBpbmZvID0ge3BhdGg6ICcnfTtcbiAgICAgIGxldCBhcnJheSA9IC8qKiBAdHlwZSB7QXJyYXl9ICovKGdldCh0aGlzLCBwYXRoLCBpbmZvKSk7XG4gICAgICBsZXQgcmV0ID0gYXJyYXkudW5zaGlmdCguLi5pdGVtcyk7XG4gICAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIG5vdGlmeVNwbGljZSh0aGlzLCBhcnJheSwgaW5mby5wYXRoLCAwLCBpdGVtcy5sZW5ndGgsIFtdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoYXQgYSBwYXRoIGhhcyBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqICAgICB0aGlzLml0ZW0udXNlci5uYW1lID0gJ0JvYic7XG4gICAgICogICAgIHRoaXMubm90aWZ5UGF0aCgnaXRlbS51c2VyLm5hbWUnKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFBhdGggdGhhdCBzaG91bGQgYmUgbm90aWZpZWQuXG4gICAgICogQHBhcmFtIHsqPX0gdmFsdWUgVmFsdWUgYXQgdGhlIHBhdGggKG9wdGlvbmFsKS5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwdWJsaWNcbiAgICAqL1xuICAgIG5vdGlmeVBhdGgocGF0aCwgdmFsdWUpIHtcbiAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgbGV0IHByb3BQYXRoO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xuICAgICAgICAvLyBHZXQgdmFsdWUgaWYgbm90IHN1cHBsaWVkXG4gICAgICAgIGxldCBpbmZvID0ge3BhdGg6ICcnfTtcbiAgICAgICAgdmFsdWUgPSBnZXQodGhpcywgcGF0aCwgaW5mbyk7XG4gICAgICAgIHByb3BQYXRoID0gaW5mby5wYXRoO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgICAgIC8vIE5vcm1hbGl6ZSBwYXRoIGlmIG5lZWRlZFxuICAgICAgICBwcm9wUGF0aCA9IG5vcm1hbGl6ZShwYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BQYXRoID0gLyoqIEB0eXBle3N0cmluZ30gKi8ocGF0aCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fc2V0UGVuZGluZ1Byb3BlcnR5T3JQYXRoKHByb3BQYXRoLCB2YWx1ZSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZVByb3BlcnRpZXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcXVpdmFsZW50IHRvIHN0YXRpYyBgY3JlYXRlUmVhZE9ubHlQcm9wZXJ0eWAgQVBJIGJ1dCBjYW4gYmUgY2FsbGVkIG9uXG4gICAgICogYW4gaW5zdGFuY2UgdG8gYWRkIGVmZmVjdHMgYXQgcnVudGltZS4gIFNlZSB0aGF0IG1ldGhvZCBmb3JcbiAgICAgKiBmdWxsIEFQSSBkb2NzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBwcm90ZWN0ZWRTZXR0ZXIgQ3JlYXRlcyBhIGN1c3RvbSBwcm90ZWN0ZWQgc2V0dGVyXG4gICAgICogICB3aGVuIGB0cnVlYC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfY3JlYXRlUmVhZE9ubHlQcm9wZXJ0eShwcm9wZXJ0eSwgcHJvdGVjdGVkU2V0dGVyKSB7XG4gICAgICB0aGlzLl9hZGRQcm9wZXJ0eUVmZmVjdChwcm9wZXJ0eSwgVFlQRVMuUkVBRF9PTkxZKTtcbiAgICAgIGlmIChwcm90ZWN0ZWRTZXR0ZXIpIHtcbiAgICAgICAgdGhpc1snX3NldCcgKyB1cHBlcihwcm9wZXJ0eSldID0gLyoqIEB0aGlzIHtQcm9wZXJ0eUVmZmVjdHN9ICovZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVxdWl2YWxlbnQgdG8gc3RhdGljIGBjcmVhdGVQcm9wZXJ0eU9ic2VydmVyYCBBUEkgYnV0IGNhbiBiZSBjYWxsZWQgb25cbiAgICAgKiBhbiBpbnN0YW5jZSB0byBhZGQgZWZmZWN0cyBhdCBydW50aW1lLiAgU2VlIHRoYXQgbWV0aG9kIGZvclxuICAgICAqIGZ1bGwgQVBJIGRvY3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfGZ1bmN0aW9uKCosKil9IG1ldGhvZCBGdW5jdGlvbiBvciBuYW1lIG9mIG9ic2VydmVyIG1ldGhvZCB0byBjYWxsXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gZHluYW1pY0ZuIFdoZXRoZXIgdGhlIG1ldGhvZCBuYW1lIHNob3VsZCBiZSBpbmNsdWRlZCBhc1xuICAgICAqICAgYSBkZXBlbmRlbmN5IHRvIHRoZSBlZmZlY3QuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX2NyZWF0ZVByb3BlcnR5T2JzZXJ2ZXIocHJvcGVydHksIG1ldGhvZCwgZHluYW1pY0ZuKSB7XG4gICAgICBsZXQgaW5mbyA9IHsgcHJvcGVydHksIG1ldGhvZCwgZHluYW1pY0ZuOiBCb29sZWFuKGR5bmFtaWNGbikgfTtcbiAgICAgIHRoaXMuX2FkZFByb3BlcnR5RWZmZWN0KHByb3BlcnR5LCBUWVBFUy5PQlNFUlZFLCB7XG4gICAgICAgIGZuOiBydW5PYnNlcnZlckVmZmVjdCwgaW5mbywgdHJpZ2dlcjoge25hbWU6IHByb3BlcnR5fVxuICAgICAgfSk7XG4gICAgICBpZiAoZHluYW1pY0ZuKSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BlcnR5RWZmZWN0KC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhtZXRob2QpLCBUWVBFUy5PQlNFUlZFLCB7XG4gICAgICAgICAgZm46IHJ1bk9ic2VydmVyRWZmZWN0LCBpbmZvLCB0cmlnZ2VyOiB7bmFtZTogbWV0aG9kfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcXVpdmFsZW50IHRvIHN0YXRpYyBgY3JlYXRlTWV0aG9kT2JzZXJ2ZXJgIEFQSSBidXQgY2FuIGJlIGNhbGxlZCBvblxuICAgICAqIGFuIGluc3RhbmNlIHRvIGFkZCBlZmZlY3RzIGF0IHJ1bnRpbWUuICBTZWUgdGhhdCBtZXRob2QgZm9yXG4gICAgICogZnVsbCBBUEkgZG9jcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIE1ldGhvZCBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIHtib29sZWFufE9iamVjdD19IGR5bmFtaWNGbiBCb29sZWFuIG9yIG9iamVjdCBtYXAgaW5kaWNhdGluZ1xuICAgICAqICAgd2hldGhlciBtZXRob2QgbmFtZXMgc2hvdWxkIGJlIGluY2x1ZGVkIGFzIGEgZGVwZW5kZW5jeSB0byB0aGUgZWZmZWN0LlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9jcmVhdGVNZXRob2RPYnNlcnZlcihleHByZXNzaW9uLCBkeW5hbWljRm4pIHtcbiAgICAgIGxldCBzaWcgPSBwYXJzZU1ldGhvZChleHByZXNzaW9uKTtcbiAgICAgIGlmICghc2lnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hbGZvcm1lZCBvYnNlcnZlciBleHByZXNzaW9uICdcIiArIGV4cHJlc3Npb24gKyBcIidcIik7XG4gICAgICB9XG4gICAgICBjcmVhdGVNZXRob2RFZmZlY3QodGhpcywgc2lnLCBUWVBFUy5PQlNFUlZFLCBydW5NZXRob2RFZmZlY3QsIG51bGwsIGR5bmFtaWNGbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXF1aXZhbGVudCB0byBzdGF0aWMgYGNyZWF0ZU5vdGlmeWluZ1Byb3BlcnR5YCBBUEkgYnV0IGNhbiBiZSBjYWxsZWQgb25cbiAgICAgKiBhbiBpbnN0YW5jZSB0byBhZGQgZWZmZWN0cyBhdCBydW50aW1lLiAgU2VlIHRoYXQgbWV0aG9kIGZvclxuICAgICAqIGZ1bGwgQVBJIGRvY3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9jcmVhdGVOb3RpZnlpbmdQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgICAgdGhpcy5fYWRkUHJvcGVydHlFZmZlY3QocHJvcGVydHksIFRZUEVTLk5PVElGWSwge1xuICAgICAgICBmbjogcnVuTm90aWZ5RWZmZWN0LFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgZXZlbnROYW1lOiBjYW1lbFRvRGFzaENhc2UocHJvcGVydHkpICsgJy1jaGFuZ2VkJyxcbiAgICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXF1aXZhbGVudCB0byBzdGF0aWMgYGNyZWF0ZVJlZmxlY3RlZFByb3BlcnR5YCBBUEkgYnV0IGNhbiBiZSBjYWxsZWQgb25cbiAgICAgKiBhbiBpbnN0YW5jZSB0byBhZGQgZWZmZWN0cyBhdCBydW50aW1lLiAgU2VlIHRoYXQgbWV0aG9kIGZvclxuICAgICAqIGZ1bGwgQVBJIGRvY3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgUHJvcGVydHkgbmFtZVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9jcmVhdGVSZWZsZWN0ZWRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgICAgbGV0IGF0dHIgPSB0aGlzLmNvbnN0cnVjdG9yLmF0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShwcm9wZXJ0eSk7XG4gICAgICBpZiAoYXR0clswXSA9PT0gJy0nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUHJvcGVydHkgJyArIHByb3BlcnR5ICsgJyBjYW5ub3QgYmUgcmVmbGVjdGVkIHRvIGF0dHJpYnV0ZSAnICtcbiAgICAgICAgICBhdHRyICsgJyBiZWNhdXNlIFwiLVwiIGlzIG5vdCBhIHZhbGlkIHN0YXJ0aW5nIGF0dHJpYnV0ZSBuYW1lLiBVc2UgYSBsb3dlcmNhc2UgZmlyc3QgbGV0dGVyIGZvciB0aGUgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FkZFByb3BlcnR5RWZmZWN0KHByb3BlcnR5LCBUWVBFUy5SRUZMRUNULCB7XG4gICAgICAgICAgZm46IHJ1blJlZmxlY3RFZmZlY3QsXG4gICAgICAgICAgaW5mbzoge1xuICAgICAgICAgICAgYXR0ck5hbWU6IGF0dHJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVxdWl2YWxlbnQgdG8gc3RhdGljIGBjcmVhdGVDb21wdXRlZFByb3BlcnR5YCBBUEkgYnV0IGNhbiBiZSBjYWxsZWQgb25cbiAgICAgKiBhbiBpbnN0YW5jZSB0byBhZGQgZWZmZWN0cyBhdCBydW50aW1lLiAgU2VlIHRoYXQgbWV0aG9kIGZvclxuICAgICAqIGZ1bGwgQVBJIGRvY3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiBjb21wdXRlZCBwcm9wZXJ0eSB0byBzZXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvbiBNZXRob2QgZXhwcmVzc2lvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxPYmplY3Q9fSBkeW5hbWljRm4gQm9vbGVhbiBvciBvYmplY3QgbWFwIGluZGljYXRpbmdcbiAgICAgKiAgIHdoZXRoZXIgbWV0aG9kIG5hbWVzIHNob3VsZCBiZSBpbmNsdWRlZCBhcyBhIGRlcGVuZGVuY3kgdG8gdGhlIGVmZmVjdC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfY3JlYXRlQ29tcHV0ZWRQcm9wZXJ0eShwcm9wZXJ0eSwgZXhwcmVzc2lvbiwgZHluYW1pY0ZuKSB7XG4gICAgICBsZXQgc2lnID0gcGFyc2VNZXRob2QoZXhwcmVzc2lvbik7XG4gICAgICBpZiAoIXNpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgY29tcHV0ZWQgZXhwcmVzc2lvbiAnXCIgKyBleHByZXNzaW9uICsgXCInXCIpO1xuICAgICAgfVxuICAgICAgY3JlYXRlTWV0aG9kRWZmZWN0KHRoaXMsIHNpZywgVFlQRVMuQ09NUFVURSwgcnVuQ29tcHV0ZWRFZmZlY3QsIHByb3BlcnR5LCBkeW5hbWljRm4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdhdGhlciB0aGUgYXJndW1lbnQgdmFsdWVzIGZvciBhIG1ldGhvZCBzcGVjaWZpZWQgaW4gdGhlIHByb3ZpZGVkIGFycmF5XG4gICAgICogb2YgYXJndW1lbnQgbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiBUaGUgYHBhdGhgIGFuZCBgdmFsdWVgIGFyZ3VtZW50cyBhcmUgdXNlZCB0byBmaWxsIGluIHdpbGRjYXJkIGRlc2NyaXB0b3JcbiAgICAgKiB3aGVuIHRoZSBtZXRob2QgaXMgYmVpbmcgY2FsbGVkIGFzIGEgcmVzdWx0IG9mIGEgcGF0aCBub3RpZmljYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFBcnJheTwhTWV0aG9kQXJnPn0gYXJncyBBcnJheSBvZiBhcmd1bWVudCBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFByb3BlcnR5L3BhdGggbmFtZSB0aGF0IHRyaWdnZXJlZCB0aGUgbWV0aG9kIGVmZmVjdFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBCYWcgb2YgY3VycmVudCBwcm9wZXJ0eSBjaGFuZ2VzXG4gICAgICogQHJldHVybiB7QXJyYXk8Kj59IEFycmF5IG9mIGFyZ3VtZW50IHZhbHVlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21hcnNoYWxBcmdzKGFyZ3MsIHBhdGgsIHByb3BzKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5fX2RhdGE7XG4gICAgICBsZXQgdmFsdWVzID0gW107XG4gICAgICBmb3IgKGxldCBpPTAsIGw9YXJncy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgIGxldCBhcmcgPSBhcmdzW2ldO1xuICAgICAgICBsZXQgbmFtZSA9IGFyZy5uYW1lO1xuICAgICAgICBsZXQgdjtcbiAgICAgICAgaWYgKGFyZy5saXRlcmFsKSB7XG4gICAgICAgICAgdiA9IGFyZy52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJnLnN0cnVjdHVyZWQpIHtcbiAgICAgICAgICAgIHYgPSBnZXQoZGF0YSwgbmFtZSk7XG4gICAgICAgICAgICAvLyB3aGVuIGRhdGEgaXMgbm90IHN0b3JlZCBlLmcuIGBzcGxpY2VzYFxuICAgICAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB2ID0gcHJvcHNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHYgPSBkYXRhW25hbWVdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJnLndpbGRjYXJkKSB7XG4gICAgICAgICAgLy8gT25seSBzZW5kIHRoZSBhY3R1YWwgcGF0aCBjaGFuZ2VkIGluZm8gaWYgdGhlIGNoYW5nZSB0aGF0XG4gICAgICAgICAgLy8gY2F1c2VkIHRoZSBvYnNlcnZlciB0byBydW4gbWF0Y2hlZCB0aGUgd2lsZGNhcmRcbiAgICAgICAgICBsZXQgYmFzZUNoYW5nZWQgPSAobmFtZS5pbmRleE9mKHBhdGggKyAnLicpID09PSAwKTtcbiAgICAgICAgICBsZXQgbWF0Y2hlcyA9IChwYXRoLmluZGV4T2YobmFtZSkgPT09IDAgJiYgIWJhc2VDaGFuZ2VkKTtcbiAgICAgICAgICB2YWx1ZXNbaV0gPSB7XG4gICAgICAgICAgICBwYXRoOiBtYXRjaGVzID8gcGF0aCA6IG5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbWF0Y2hlcyA/IHByb3BzW3BhdGhdIDogdixcbiAgICAgICAgICAgIGJhc2U6IHZcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlc1tpXSA9IHY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgLy8gLS0gc3RhdGljIGNsYXNzIG1ldGhvZHMgLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIGFuIGFjY2Vzc29yIGV4aXN0cyBmb3IgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eSwgYW5kIGFkZHNcbiAgICAgKiB0byBhIGxpc3Qgb2YgXCJwcm9wZXJ0eSBlZmZlY3RzXCIgdGhhdCB3aWxsIHJ1biB3aGVuIHRoZSBhY2Nlc3NvciBmb3JcbiAgICAgKiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IGlzIHNldC4gIEVmZmVjdHMgYXJlIGdyb3VwZWQgYnkgXCJ0eXBlXCIsIHdoaWNoXG4gICAgICogcm91Z2hseSBjb3JyZXNwb25kcyB0byBhIHBoYXNlIGluIGVmZmVjdCBwcm9jZXNzaW5nLiAgVGhlIGVmZmVjdFxuICAgICAqIG1ldGFkYXRhIHNob3VsZCBiZSBpbiB0aGUgZm9sbG93aW5nIGZvcm06XG4gICAgICpcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGZuOiBlZmZlY3RGdW5jdGlvbiwgLy8gUmVmZXJlbmNlIHRvIGZ1bmN0aW9uIHRvIGNhbGwgdG8gcGVyZm9ybSBlZmZlY3RcbiAgICAgKiAgICAgICBpbmZvOiB7IC4uLiB9ICAgICAgIC8vIEVmZmVjdCBtZXRhZGF0YSBwYXNzZWQgdG8gZnVuY3Rpb25cbiAgICAgKiAgICAgICB0cmlnZ2VyOiB7ICAgICAgICAgIC8vIE9wdGlvbmFsIHRyaWdnZXJpbmcgbWV0YWRhdGE7IGlmIG5vdCBwcm92aWRlZFxuICAgICAqICAgICAgICAgbmFtZTogc3RyaW5nICAgICAgLy8gdGhlIHByb3BlcnR5IGlzIHRyZWF0ZWQgYXMgYSB3aWxkY2FyZFxuICAgICAqICAgICAgICAgc3RydWN0dXJlZDogYm9vbGVhblxuICAgICAqICAgICAgICAgd2lsZGNhcmQ6IGJvb2xlYW5cbiAgICAgKiAgICAgICB9XG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqIEVmZmVjdHMgYXJlIGNhbGxlZCBmcm9tIGBfcHJvcGVydGllc0NoYW5nZWRgIGluIHRoZSBmb2xsb3dpbmcgb3JkZXIgYnlcbiAgICAgKiB0eXBlOlxuICAgICAqXG4gICAgICogMS4gQ09NUFVURVxuICAgICAqIDIuIFBST1BBR0FURVxuICAgICAqIDMuIFJFRkxFQ1RcbiAgICAgKiA0LiBPQlNFUlZFXG4gICAgICogNS4gTk9USUZZXG4gICAgICpcbiAgICAgKiBFZmZlY3QgZnVuY3Rpb25zIGFyZSBjYWxsZWQgd2l0aCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTpcbiAgICAgKlxuICAgICAqICAgICBlZmZlY3RGdW5jdGlvbihpbnN0LCBwYXRoLCBwcm9wcywgb2xkUHJvcHMsIGluZm8sIGhhc1BhdGhzKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IHRoYXQgc2hvdWxkIHRyaWdnZXIgdGhlIGVmZmVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEVmZmVjdCB0eXBlLCBmcm9tIHRoaXMuUFJPUEVSVFlfRUZGRUNUX1RZUEVTXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBlZmZlY3QgRWZmZWN0IG1ldGFkYXRhIG9iamVjdFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRQcm9wZXJ0eUVmZmVjdChwcm9wZXJ0eSwgdHlwZSwgZWZmZWN0KSB7XG4gICAgICB0aGlzLnByb3RvdHlwZS5fYWRkUHJvcGVydHlFZmZlY3QocHJvcGVydHksIHR5cGUsIGVmZmVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpbmdsZS1wcm9wZXJ0eSBvYnNlcnZlciBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xmdW5jdGlvbigqLCopfSBtZXRob2QgRnVuY3Rpb24gb3IgbmFtZSBvZiBvYnNlcnZlciBtZXRob2QgdG8gY2FsbFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGR5bmFtaWNGbiBXaGV0aGVyIHRoZSBtZXRob2QgbmFtZSBzaG91bGQgYmUgaW5jbHVkZWQgYXNcbiAgICAgKiAgIGEgZGVwZW5kZW5jeSB0byB0aGUgZWZmZWN0LlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVQcm9wZXJ0eU9ic2VydmVyKHByb3BlcnR5LCBtZXRob2QsIGR5bmFtaWNGbikge1xuICAgICAgdGhpcy5wcm90b3R5cGUuX2NyZWF0ZVByb3BlcnR5T2JzZXJ2ZXIocHJvcGVydHksIG1ldGhvZCwgZHluYW1pY0ZuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbXVsdGktcHJvcGVydHkgXCJtZXRob2Qgb2JzZXJ2ZXJcIiBiYXNlZCBvbiB0aGUgcHJvdmlkZWRcbiAgICAgKiBleHByZXNzaW9uLCB3aGljaCBzaG91bGQgYmUgYSBzdHJpbmcgaW4gdGhlIGZvcm0gb2YgYSBub3JtYWwgSmF2YVNjcmlwdFxuICAgICAqIGZ1bmN0aW9uIHNpZ25hdHVyZTogYCdtZXRob2ROYW1lKGFyZzEsIFsuLi4sIGFyZ25dKSdgLiAgRWFjaCBhcmd1bWVudFxuICAgICAqIHNob3VsZCBjb3JyZXNwb25kIHRvIGEgcHJvcGVydHkgb3IgcGF0aCBpbiB0aGUgY29udGV4dCBvZiB0aGlzXG4gICAgICogcHJvdG90eXBlIChvciBpbnN0YW5jZSksIG9yIG1heSBiZSBhIGxpdGVyYWwgc3RyaW5nIG9yIG51bWJlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHByZXNzaW9uIE1ldGhvZCBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIHtib29sZWFufE9iamVjdD19IGR5bmFtaWNGbiBCb29sZWFuIG9yIG9iamVjdCBtYXAgaW5kaWNhdGluZ1xuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogICB3aGV0aGVyIG1ldGhvZCBuYW1lcyBzaG91bGQgYmUgaW5jbHVkZWQgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSBlZmZlY3QuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVNZXRob2RPYnNlcnZlcihleHByZXNzaW9uLCBkeW5hbWljRm4pIHtcbiAgICAgIHRoaXMucHJvdG90eXBlLl9jcmVhdGVNZXRob2RPYnNlcnZlcihleHByZXNzaW9uLCBkeW5hbWljRm4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhdXNlcyB0aGUgc2V0dGVyIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgdG8gZGlzcGF0Y2ggYDxwcm9wZXJ0eT4tY2hhbmdlZGBcbiAgICAgKiBldmVudHMgdG8gbm90aWZ5IG9mIGNoYW5nZXMgdG8gdGhlIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlTm90aWZ5aW5nUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICAgIHRoaXMucHJvdG90eXBlLl9jcmVhdGVOb3RpZnlpbmdQcm9wZXJ0eShwcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHJlYWQtb25seSBhY2Nlc3NvciBmb3IgdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogVG8gc2V0IHRoZSBwcm9wZXJ0eSwgdXNlIHRoZSBwcm90ZWN0ZWQgYF9zZXRQcm9wZXJ0eWAgQVBJLlxuICAgICAqIFRvIGNyZWF0ZSBhIGN1c3RvbSBwcm90ZWN0ZWQgc2V0dGVyIChlLmcuIGBfc2V0TXlQcm9wKClgIGZvclxuICAgICAqIHByb3BlcnR5IGBteVByb3BgKSwgcGFzcyBgdHJ1ZWAgZm9yIGBwcm90ZWN0ZWRTZXR0ZXJgLlxuICAgICAqXG4gICAgICogTm90ZSwgaWYgdGhlIHByb3BlcnR5IHdpbGwgaGF2ZSBvdGhlciBwcm9wZXJ0eSBlZmZlY3RzLCB0aGlzIG1ldGhvZFxuICAgICAqIHNob3VsZCBiZSBjYWxsZWQgZmlyc3QsIGJlZm9yZSBhZGRpbmcgb3RoZXIgZWZmZWN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBQcm9wZXJ0eSBuYW1lXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gcHJvdGVjdGVkU2V0dGVyIENyZWF0ZXMgYSBjdXN0b20gcHJvdGVjdGVkIHNldHRlclxuICAgICAqICAgd2hlbiBgdHJ1ZWAuXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVJlYWRPbmx5UHJvcGVydHkocHJvcGVydHksIHByb3RlY3RlZFNldHRlcikge1xuICAgICAgdGhpcy5wcm90b3R5cGUuX2NyZWF0ZVJlYWRPbmx5UHJvcGVydHkocHJvcGVydHksIHByb3RlY3RlZFNldHRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2F1c2VzIHRoZSBzZXR0ZXIgZm9yIHRoZSBnaXZlbiBwcm9wZXJ0eSB0byByZWZsZWN0IHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICAgICAqIHRvIGEgKGRhc2gtY2FzZWQpIGF0dHJpYnV0ZSBvZiB0aGUgc2FtZSBuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFByb3BlcnR5IG5hbWVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmVmbGVjdGVkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICAgIHRoaXMucHJvdG90eXBlLl9jcmVhdGVSZWZsZWN0ZWRQcm9wZXJ0eShwcm9wZXJ0eSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbXB1dGVkIHByb3BlcnR5IHdob3NlIHZhbHVlIGlzIHNldCB0byB0aGUgcmVzdWx0IG9mIHRoZVxuICAgICAqIG1ldGhvZCBkZXNjcmliZWQgYnkgdGhlIGdpdmVuIGBleHByZXNzaW9uYCBlYWNoIHRpbWUgb25lIG9yIG1vcmVcbiAgICAgKiBhcmd1bWVudHMgdG8gdGhlIG1ldGhvZCBjaGFuZ2VzLiAgVGhlIGV4cHJlc3Npb24gc2hvdWxkIGJlIGEgc3RyaW5nXG4gICAgICogaW4gdGhlIGZvcm0gb2YgYSBub3JtYWwgSmF2YVNjcmlwdCBmdW5jdGlvbiBzaWduYXR1cmU6XG4gICAgICogYCdtZXRob2ROYW1lKGFyZzEsIFsuLi4sIGFyZ25dKSdgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgTmFtZSBvZiBjb21wdXRlZCBwcm9wZXJ0eSB0byBzZXRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXhwcmVzc2lvbiBNZXRob2QgZXhwcmVzc2lvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnxPYmplY3Q9fSBkeW5hbWljRm4gQm9vbGVhbiBvciBvYmplY3QgbWFwIGluZGljYXRpbmcgd2hldGhlclxuICAgICAqICAgbWV0aG9kIG5hbWVzIHNob3VsZCBiZSBpbmNsdWRlZCBhcyBhIGRlcGVuZGVuY3kgdG8gdGhlIGVmZmVjdC5cbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlQ29tcHV0ZWRQcm9wZXJ0eShwcm9wZXJ0eSwgZXhwcmVzc2lvbiwgZHluYW1pY0ZuKSB7XG4gICAgICB0aGlzLnByb3RvdHlwZS5fY3JlYXRlQ29tcHV0ZWRQcm9wZXJ0eShwcm9wZXJ0eSwgZXhwcmVzc2lvbiwgZHluYW1pY0ZuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIHByb3ZpZGVkIHRlbXBsYXRlIHRvIGVuc3VyZSBiaW5kaW5nIGVmZmVjdHMgYXJlIGNyZWF0ZWRcbiAgICAgKiBmb3IgdGhlbSwgYW5kIHRoZW4gZW5zdXJlcyBwcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIGNyZWF0ZWQgZm9yIGFueVxuICAgICAqIGRlcGVuZGVudCBwcm9wZXJ0aWVzIGluIHRoZSB0ZW1wbGF0ZS4gIEJpbmRpbmcgZWZmZWN0cyBmb3IgYm91bmRcbiAgICAgKiB0ZW1wbGF0ZXMgYXJlIHN0b3JlZCBpbiBhIGxpbmtlZCBsaXN0IG9uIHRoZSBpbnN0YW5jZSBzbyB0aGF0XG4gICAgICogdGVtcGxhdGVzIGNhbiBiZSBlZmZpY2llbnRseSBzdGFtcGVkIGFuZCB1bnN0YW1wZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFIVE1MVGVtcGxhdGVFbGVtZW50fSB0ZW1wbGF0ZSBUZW1wbGF0ZSBjb250YWluaW5nIGJpbmRpbmdcbiAgICAgKiAgIGJpbmRpbmdzXG4gICAgICogQHJldHVybiB7IVRlbXBsYXRlSW5mb30gVGVtcGxhdGUgbWV0YWRhdGEgb2JqZWN0XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBiaW5kVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3RvdHlwZS5fYmluZFRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICAvLyAtLSBiaW5kaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEVxdWl2YWxlbnQgdG8gc3RhdGljIGBiaW5kVGVtcGxhdGVgIEFQSSBidXQgY2FuIGJlIGNhbGxlZCBvblxuICAgICAqIGFuIGluc3RhbmNlIHRvIGFkZCBlZmZlY3RzIGF0IHJ1bnRpbWUuICBTZWUgdGhhdCBtZXRob2QgZm9yXG4gICAgICogZnVsbCBBUEkgZG9jcy5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1heSBiZSBjYWxsZWQgb24gdGhlIHByb3RvdHlwZSAoZm9yIHByb3RvdHlwaWNhbCB0ZW1wbGF0ZVxuICAgICAqIGJpbmRpbmcsIHRvIGF2b2lkIGNyZWF0aW5nIGFjY2Vzc29ycyBldmVyeSBpbnN0YW5jZSkgb25jZSBwZXIgcHJvdG90eXBlLFxuICAgICAqIGFuZCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBydW50aW1lQmluZGluZzogdHJ1ZWAgYnkgYF9zdGFtcFRlbXBsYXRlYCB0b1xuICAgICAqIGNyZWF0ZSBhbmQgbGluayBhbiBpbnN0YW5jZSBvZiB0aGUgdGVtcGxhdGUgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIGFcbiAgICAgKiBwYXJ0aWN1bGFyIHN0YW1waW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHshSFRNTFRlbXBsYXRlRWxlbWVudH0gdGVtcGxhdGUgVGVtcGxhdGUgY29udGFpbmluZyBiaW5kaW5nXG4gICAgICogICBiaW5kaW5nc1xuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGluc3RhbmNlQmluZGluZyBXaGVuIGZhbHNlIChkZWZhdWx0KSwgcGVyZm9ybXNcbiAgICAgKiAgIFwicHJvdG90eXBpY2FsXCIgYmluZGluZyBvZiB0aGUgdGVtcGxhdGUgYW5kIG92ZXJ3cml0ZXMgYW55IHByZXZpb3VzbHlcbiAgICAgKiAgIGJvdW5kIHRlbXBsYXRlIGZvciB0aGUgY2xhc3MuIFdoZW4gdHJ1ZSAoYXMgcGFzc2VkIGZyb21cbiAgICAgKiAgIGBfc3RhbXBUZW1wbGF0ZWApLCB0aGUgdGVtcGxhdGUgaW5mbyBpcyBpbnN0YW5jZWQgYW5kIGxpbmtlZCBpbnRvXG4gICAgICogICB0aGUgbGlzdCBvZiBib3VuZCB0ZW1wbGF0ZXMuXG4gICAgICogQHJldHVybiB7IVRlbXBsYXRlSW5mb30gVGVtcGxhdGUgbWV0YWRhdGEgb2JqZWN0OyBmb3IgYHJ1bnRpbWVCaW5kaW5nYCxcbiAgICAgKiAgIHRoaXMgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHByb3RvdHlwaWNhbCB0ZW1wbGF0ZSBpbmZvXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF9iaW5kVGVtcGxhdGUodGVtcGxhdGUsIGluc3RhbmNlQmluZGluZykge1xuICAgICAgbGV0IHRlbXBsYXRlSW5mbyA9IHRoaXMuY29uc3RydWN0b3IuX3BhcnNlVGVtcGxhdGUodGVtcGxhdGUpO1xuICAgICAgbGV0IHdhc1ByZUJvdW5kID0gdGhpcy5fX3RlbXBsYXRlSW5mbyA9PSB0ZW1wbGF0ZUluZm87XG4gICAgICAvLyBPcHRpbWl6YXRpb246IHNpbmNlIHRoaXMgaXMgY2FsbGVkIHR3aWNlIGZvciBwcm90by1ib3VuZCB0ZW1wbGF0ZXMsXG4gICAgICAvLyBkb24ndCBhdHRlbXB0IHRvIHJlY3JlYXRlIGFjY2Vzc29ycyBpZiB0aGlzIHRlbXBsYXRlIHdhcyBwcmUtYm91bmRcbiAgICAgIGlmICghd2FzUHJlQm91bmQpIHtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0ZW1wbGF0ZUluZm8ucHJvcGVydHlFZmZlY3RzKSB7XG4gICAgICAgICAgdGhpcy5fY3JlYXRlUHJvcGVydHlBY2Nlc3Nvcihwcm9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGluc3RhbmNlQmluZGluZykge1xuICAgICAgICAvLyBGb3IgaW5zdGFuY2UtdGltZSBiaW5kaW5nLCBjcmVhdGUgaW5zdGFuY2Ugb2YgdGVtcGxhdGUgbWV0YWRhdGFcbiAgICAgICAgLy8gYW5kIGxpbmsgaW50byBsaXN0IG9mIHRlbXBsYXRlcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgdGVtcGxhdGVJbmZvID0gLyoqIEB0eXBlIHshVGVtcGxhdGVJbmZvfSAqLyhPYmplY3QuY3JlYXRlKHRlbXBsYXRlSW5mbykpO1xuICAgICAgICB0ZW1wbGF0ZUluZm8ud2FzUHJlQm91bmQgPSB3YXNQcmVCb3VuZDtcbiAgICAgICAgaWYgKCF3YXNQcmVCb3VuZCAmJiB0aGlzLl9fdGVtcGxhdGVJbmZvKSB7XG4gICAgICAgICAgbGV0IGxhc3QgPSB0aGlzLl9fdGVtcGxhdGVJbmZvTGFzdCB8fCB0aGlzLl9fdGVtcGxhdGVJbmZvO1xuICAgICAgICAgIHRoaXMuX190ZW1wbGF0ZUluZm9MYXN0ID0gbGFzdC5uZXh0VGVtcGxhdGVJbmZvID0gdGVtcGxhdGVJbmZvO1xuICAgICAgICAgIHRlbXBsYXRlSW5mby5wcmV2aW91c1RlbXBsYXRlSW5mbyA9IGxhc3Q7XG4gICAgICAgICAgcmV0dXJuIHRlbXBsYXRlSW5mbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX190ZW1wbGF0ZUluZm8gPSB0ZW1wbGF0ZUluZm87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHByb3BlcnR5IGVmZmVjdCB0byB0aGUgZ2l2ZW4gdGVtcGxhdGUgbWV0YWRhdGEsIHdoaWNoIGlzIHJ1blxuICAgICAqIGF0IHRoZSBcInByb3BhZ2F0ZVwiIHN0YWdlIG9mIGBfcHJvcGVydGllc0NoYW5nZWRgIHdoZW4gdGhlIHRlbXBsYXRlXG4gICAgICogaGFzIGJlZW4gYm91bmQgdG8gdGhlIGVsZW1lbnQgdmlhIGBfYmluZFRlbXBsYXRlYC5cbiAgICAgKlxuICAgICAqIFRoZSBgZWZmZWN0YCBvYmplY3Qgc2hvdWxkIG1hdGNoIHRoZSBmb3JtYXQgaW4gYF9hZGRQcm9wZXJ0eUVmZmVjdGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGVtcGxhdGVJbmZvIFRlbXBsYXRlIG1ldGFkYXRhIHRvIGFkZCBlZmZlY3QgdG9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBQcm9wZXJ0eSB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSBlZmZlY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdD19IGVmZmVjdCBFZmZlY3QgbWV0YWRhdGEgb2JqZWN0XG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIF9hZGRUZW1wbGF0ZVByb3BlcnR5RWZmZWN0KHRlbXBsYXRlSW5mbywgcHJvcCwgZWZmZWN0KSB7XG4gICAgICBsZXQgaG9zdFByb3BzID0gdGVtcGxhdGVJbmZvLmhvc3RQcm9wcyA9IHRlbXBsYXRlSW5mby5ob3N0UHJvcHMgfHwge307XG4gICAgICBob3N0UHJvcHNbcHJvcF0gPSB0cnVlO1xuICAgICAgbGV0IGVmZmVjdHMgPSB0ZW1wbGF0ZUluZm8ucHJvcGVydHlFZmZlY3RzID0gdGVtcGxhdGVJbmZvLnByb3BlcnR5RWZmZWN0cyB8fCB7fTtcbiAgICAgIGxldCBwcm9wRWZmZWN0cyA9IGVmZmVjdHNbcHJvcF0gPSBlZmZlY3RzW3Byb3BdIHx8IFtdO1xuICAgICAgcHJvcEVmZmVjdHMucHVzaChlZmZlY3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YW1wcyB0aGUgcHJvdmlkZWQgdGVtcGxhdGUgYW5kIHBlcmZvcm1zIGluc3RhbmNlLXRpbWUgc2V0dXAgZm9yXG4gICAgICogUG9seW1lciB0ZW1wbGF0ZSBmZWF0dXJlcywgaW5jbHVkaW5nIGRhdGEgYmluZGluZ3MsIGRlY2xhcmF0aXZlIGV2ZW50XG4gICAgICogbGlzdGVuZXJzLCBhbmQgdGhlIGB0aGlzLiRgIG1hcCBvZiBgaWRgJ3MgdG8gbm9kZXMuICBBIGRvY3VtZW50IGZyYWdtZW50XG4gICAgICogaXMgcmV0dXJuZWQgY29udGFpbmluZyB0aGUgc3RhbXBlZCBET00sIHJlYWR5IGZvciBpbnNlcnRpb24gaW50byB0aGVcbiAgICAgKiBET00uXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBtYXkgYmUgY2FsbGVkIG1vcmUgdGhhbiBvbmNlOyBob3dldmVyIG5vdGUgdGhhdCBkdWUgdG9cbiAgICAgKiBgc2hhZHljc3NgIHBvbHlmaWxsIGxpbWl0YXRpb25zLCBvbmx5IHN0eWxlcyBmcm9tIHRlbXBsYXRlcyBwcmVwYXJlZFxuICAgICAqIHVzaW5nIGBTaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVgIHdpbGwgYmUgY29ycmVjdGx5IHBvbHlmaWxsZWQgKHNjb3BlZFxuICAgICAqIHRvIHRoZSBzaGFkb3cgcm9vdCBhbmQgc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMpLCBhbmQgbm90ZSB0aGF0XG4gICAgICogYFNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZWAgbWF5IG9ubHkgYmUgY2FsbGVkIG9uY2UgcGVyIGVsZW1lbnQuIEFzIHN1Y2gsXG4gICAgICogYW55IHN0eWxlcyByZXF1aXJlZCBieSBpbiBydW50aW1lLXN0YW1wZWQgdGVtcGxhdGVzIG11c3QgYmUgaW5jbHVkZWRcbiAgICAgKiBpbiB0aGUgbWFpbiBlbGVtZW50IHRlbXBsYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHshSFRNTFRlbXBsYXRlRWxlbWVudH0gdGVtcGxhdGUgVGVtcGxhdGUgdG8gc3RhbXBcbiAgICAgKiBAcmV0dXJuIHshU3RhbXBlZFRlbXBsYXRlfSBDbG9uZWQgdGVtcGxhdGUgY29udGVudFxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfc3RhbXBUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgLy8gRW5zdXJlcyB0aGF0IGNyZWF0ZWQgZG9tIGlzIGBfZW5xdWV1ZUNsaWVudGAnZCB0byB0aGlzIGVsZW1lbnQgc29cbiAgICAgIC8vIHRoYXQgaXQgY2FuIGJlIGZsdXNoZWQgb24gbmV4dCBjYWxsIHRvIGBfZmx1c2hQcm9wZXJ0aWVzYFxuICAgICAgaG9zdFN0YWNrLmJlZ2luSG9zdGluZyh0aGlzKTtcbiAgICAgIGxldCBkb20gPSBzdXBlci5fc3RhbXBUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgICBob3N0U3RhY2suZW5kSG9zdGluZyh0aGlzKTtcbiAgICAgIGxldCB0ZW1wbGF0ZUluZm8gPSAvKiogQHR5cGUgeyFUZW1wbGF0ZUluZm99ICovKHRoaXMuX2JpbmRUZW1wbGF0ZSh0ZW1wbGF0ZSwgdHJ1ZSkpO1xuICAgICAgLy8gQWRkIHRlbXBsYXRlLWluc3RhbmNlLXNwZWNpZmljIGRhdGEgdG8gaW5zdGFuY2VkIHRlbXBsYXRlSW5mb1xuICAgICAgdGVtcGxhdGVJbmZvLm5vZGVMaXN0ID0gZG9tLm5vZGVMaXN0O1xuICAgICAgLy8gQ2FwdHVyZSBjaGlsZCBub2RlcyB0byBhbGxvdyB1bnN0YW1waW5nIG9mIG5vbi1wcm90b3R5cGljYWwgdGVtcGxhdGVzXG4gICAgICBpZiAoIXRlbXBsYXRlSW5mby53YXNQcmVCb3VuZCkge1xuICAgICAgICBsZXQgbm9kZXMgPSB0ZW1wbGF0ZUluZm8uY2hpbGROb2RlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBuPWRvbS5maXJzdENoaWxkOyBuOyBuPW4ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICBub2Rlcy5wdXNoKG4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkb20udGVtcGxhdGVJbmZvID0gdGVtcGxhdGVJbmZvO1xuICAgICAgLy8gU2V0dXAgY29tcG91bmQgc3RvcmFnZSwgMi13YXkgbGlzdGVuZXJzLCBhbmQgZGF0YUhvc3QgZm9yIGJpbmRpbmdzXG4gICAgICBzZXR1cEJpbmRpbmdzKHRoaXMsIHRlbXBsYXRlSW5mbyk7XG4gICAgICAvLyBGbHVzaCBwcm9wZXJ0aWVzIGludG8gdGVtcGxhdGUgbm9kZXMgaWYgYWxyZWFkeSBib290ZWRcbiAgICAgIGlmICh0aGlzLl9fZGF0YVJlYWR5KSB7XG4gICAgICAgIHJ1bkVmZmVjdHModGhpcywgdGVtcGxhdGVJbmZvLnByb3BlcnR5RWZmZWN0cywgdGhpcy5fX2RhdGEsIG51bGwsXG4gICAgICAgICAgZmFsc2UsIHRlbXBsYXRlSW5mby5ub2RlTGlzdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW5kIHVuYmluZHMgdGhlIG5vZGVzIHByZXZpb3VzbHkgY29udGFpbmVkIGluIHRoZSBwcm92aWRlZFxuICAgICAqIERvY3VtZW50RnJhZ21lbnQgcmV0dXJuZWQgZnJvbSBgX3N0YW1wVGVtcGxhdGVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHshU3RhbXBlZFRlbXBsYXRlfSBkb20gRG9jdW1lbnRGcmFnbWVudCBwcmV2aW91c2x5IHJldHVybmVkXG4gICAgICogICBmcm9tIGBfc3RhbXBUZW1wbGF0ZWAgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlcyB0byBiZSByZW1vdmVkXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX3JlbW92ZUJvdW5kRG9tKGRvbSkge1xuICAgICAgLy8gVW5saW5rIHRlbXBsYXRlIGluZm9cbiAgICAgIGxldCB0ZW1wbGF0ZUluZm8gPSBkb20udGVtcGxhdGVJbmZvO1xuICAgICAgaWYgKHRlbXBsYXRlSW5mby5wcmV2aW91c1RlbXBsYXRlSW5mbykge1xuICAgICAgICB0ZW1wbGF0ZUluZm8ucHJldmlvdXNUZW1wbGF0ZUluZm8ubmV4dFRlbXBsYXRlSW5mbyA9XG4gICAgICAgICAgdGVtcGxhdGVJbmZvLm5leHRUZW1wbGF0ZUluZm87XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVJbmZvLm5leHRUZW1wbGF0ZUluZm8pIHtcbiAgICAgICAgdGVtcGxhdGVJbmZvLm5leHRUZW1wbGF0ZUluZm8ucHJldmlvdXNUZW1wbGF0ZUluZm8gPVxuICAgICAgICAgIHRlbXBsYXRlSW5mby5wcmV2aW91c1RlbXBsYXRlSW5mbztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9fdGVtcGxhdGVJbmZvTGFzdCA9PSB0ZW1wbGF0ZUluZm8pIHtcbiAgICAgICAgdGhpcy5fX3RlbXBsYXRlSW5mb0xhc3QgPSB0ZW1wbGF0ZUluZm8ucHJldmlvdXNUZW1wbGF0ZUluZm87XG4gICAgICB9XG4gICAgICB0ZW1wbGF0ZUluZm8ucHJldmlvdXNUZW1wbGF0ZUluZm8gPSB0ZW1wbGF0ZUluZm8ubmV4dFRlbXBsYXRlSW5mbyA9IG51bGw7XG4gICAgICAvLyBSZW1vdmUgc3RhbXBlZCBub2Rlc1xuICAgICAgbGV0IG5vZGVzID0gdGVtcGxhdGVJbmZvLmNoaWxkTm9kZXM7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8bm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBkZWZhdWx0IGBUZW1wbGF0ZVN0YW1wYCBpbXBsZW1lbnRhdGlvbiB0byBhZGQgc3VwcG9ydCBmb3JcbiAgICAgKiBwYXJzaW5nIGJpbmRpbmdzIGZyb20gYFRleHROb2RlYCdzJyBgdGV4dENvbnRlbnRgLiAgQSBgYmluZGluZ3NgXG4gICAgICogYXJyYXkgaXMgYWRkZWQgdG8gYG5vZGVJbmZvYCBhbmQgcG9wdWxhdGVkIHdpdGggYmluZGluZyBtZXRhZGF0YVxuICAgICAqIHdpdGggaW5mb3JtYXRpb24gY2FwdHVyaW5nIHRoZSBiaW5kaW5nIHRhcmdldCwgYW5kIGEgYHBhcnRzYCBhcnJheVxuICAgICAqIHdpdGggb25lIG9yIG1vcmUgbWV0YWRhdGEgb2JqZWN0cyBjYXB0dXJpbmcgdGhlIHNvdXJjZShzKSBvZiB0aGVcbiAgICAgKiBiaW5kaW5nLlxuICAgICAqXG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIE5vZGUgdG8gcGFyc2VcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlSW5mb30gdGVtcGxhdGVJbmZvIFRlbXBsYXRlIG1ldGFkYXRhIGZvciBjdXJyZW50IHRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtOb2RlSW5mb30gbm9kZUluZm8gTm9kZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZSBub2RlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2aXNpdGVkIG5vZGUgYWRkZWQgbm9kZS1zcGVjaWZpY1xuICAgICAqICAgbWV0YWRhdGEgdG8gYG5vZGVJbmZvYFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKiBAc3VwcHJlc3Mge21pc3NpbmdQcm9wZXJ0aWVzfSBJbnRlcmZhY2VzIGluIGNsb3N1cmUgZG8gbm90IGluaGVyaXQgc3RhdGljcywgYnV0IGNsYXNzZXMgZG9cbiAgICAgKi9cbiAgICBzdGF0aWMgX3BhcnNlVGVtcGxhdGVOb2RlKG5vZGUsIHRlbXBsYXRlSW5mbywgbm9kZUluZm8pIHtcbiAgICAgIGxldCBub3RlZCA9IHN1cGVyLl9wYXJzZVRlbXBsYXRlTm9kZShub2RlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKTtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICBsZXQgcGFydHMgPSB0aGlzLl9wYXJzZUJpbmRpbmdzKG5vZGUudGV4dENvbnRlbnQsIHRlbXBsYXRlSW5mbyk7XG4gICAgICAgIGlmIChwYXJ0cykge1xuICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHRleHRDb250ZW50IHdpdGggYW55IGxpdGVyYWwgcGFydHNcbiAgICAgICAgICAvLyBOT1RFOiBkZWZhdWx0IHRvIGEgc3BhY2UgaGVyZSBzbyB0aGUgdGV4dE5vZGUgcmVtYWluczsgc29tZSBicm93c2Vyc1xuICAgICAgICAgIC8vIChJRSkgb21pdCBhbiBlbXB0eSB0ZXh0Tm9kZSBmb2xsb3dpbmcgY2xvbmVOb2RlL2ltcG9ydE5vZGUuXG4gICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGxpdGVyYWxGcm9tUGFydHMocGFydHMpIHx8ICcgJztcbiAgICAgICAgICBhZGRCaW5kaW5nKHRoaXMsIHRlbXBsYXRlSW5mbywgbm9kZUluZm8sICd0ZXh0JywgJ3RleHRDb250ZW50JywgcGFydHMpO1xuICAgICAgICAgIG5vdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBkZWZhdWx0IGBUZW1wbGF0ZVN0YW1wYCBpbXBsZW1lbnRhdGlvbiB0byBhZGQgc3VwcG9ydCBmb3JcbiAgICAgKiBwYXJzaW5nIGJpbmRpbmdzIGZyb20gYXR0cmlidXRlcy4gIEEgYGJpbmRpbmdzYFxuICAgICAqIGFycmF5IGlzIGFkZGVkIHRvIGBub2RlSW5mb2AgYW5kIHBvcHVsYXRlZCB3aXRoIGJpbmRpbmcgbWV0YWRhdGFcbiAgICAgKiB3aXRoIGluZm9ybWF0aW9uIGNhcHR1cmluZyB0aGUgYmluZGluZyB0YXJnZXQsIGFuZCBhIGBwYXJ0c2AgYXJyYXlcbiAgICAgKiB3aXRoIG9uZSBvciBtb3JlIG1ldGFkYXRhIG9iamVjdHMgY2FwdHVyaW5nIHRoZSBzb3VyY2Uocykgb2YgdGhlXG4gICAgICogYmluZGluZy5cbiAgICAgKlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZSBOb2RlIHRvIHBhcnNlXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZUluZm99IHRlbXBsYXRlSW5mbyBUZW1wbGF0ZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7Tm9kZUluZm99IG5vZGVJbmZvIE5vZGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGUgbm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIEF0dHJpYnV0ZSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmlzaXRlZCBub2RlIGFkZGVkIG5vZGUtc3BlY2lmaWNcbiAgICAgKiAgIG1ldGFkYXRhIHRvIGBub2RlSW5mb2BcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gSW50ZXJmYWNlcyBpbiBjbG9zdXJlIGRvIG5vdCBpbmhlcml0IHN0YXRpY3MsIGJ1dCBjbGFzc2VzIGRvXG4gICAgICovXG4gICAgc3RhdGljIF9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZShub2RlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgbGV0IHBhcnRzID0gdGhpcy5fcGFyc2VCaW5kaW5ncyh2YWx1ZSwgdGVtcGxhdGVJbmZvKTtcbiAgICAgIGlmIChwYXJ0cykge1xuICAgICAgICAvLyBBdHRyaWJ1dGUgb3IgcHJvcGVydHlcbiAgICAgICAgbGV0IG9yaWdOYW1lID0gbmFtZTtcbiAgICAgICAgbGV0IGtpbmQgPSAncHJvcGVydHknO1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgd2Ugc2VlIGEgY2FwaXRhbCBsZXR0ZXIgaGVyZSBpcyBpZiB0aGUgYXR0ciBoYXNcbiAgICAgICAgLy8gYSBjYXBpdGFsIGxldHRlciBpbiBpdCBwZXIgc3BlYy4gSW4gdGhpcyBjYXNlLCB0byBtYWtlIHN1cmVcbiAgICAgICAgLy8gdGhpcyBiaW5kaW5nIHdvcmtzLCB3ZSBnbyBhaGVhZCBhbmQgbWFrZSB0aGUgYmluZGluZyB0byB0aGUgYXR0cmlidXRlLlxuICAgICAgICBpZiAoY2FwaXRhbEF0dHJpYnV0ZVJlZ2V4LnRlc3QobmFtZSkpIHtcbiAgICAgICAgICBraW5kID0gJ2F0dHJpYnV0ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZVtuYW1lLmxlbmd0aC0xXSA9PSAnJCcpIHtcbiAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAga2luZCA9ICdhdHRyaWJ1dGUnO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXRpYWxpemUgYXR0cmlidXRlIGJpbmRpbmdzIHdpdGggYW55IGxpdGVyYWwgcGFydHNcbiAgICAgICAgbGV0IGxpdGVyYWwgPSBsaXRlcmFsRnJvbVBhcnRzKHBhcnRzKTtcbiAgICAgICAgaWYgKGxpdGVyYWwgJiYga2luZCA9PSAnYXR0cmlidXRlJykge1xuICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIGxpdGVyYWwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIGF0dHJpYnV0ZSBiZWZvcmUgcmVtb3ZpbmcsIHNpbmNlIElFIHdvbid0IGFsbG93IHJlbW92aW5nXG4gICAgICAgIC8vIGB2YWx1ZWAgYXR0cmlidXRlIGlmIGl0IHByZXZpb3VzbHkgaGFkIGEgdmFsdWUgKGNhbid0XG4gICAgICAgIC8vIHVuY29uZGl0aW9uYWxseSBzZXQgJycgYmVmb3JlIHJlbW92aW5nIHNpbmNlIGF0dHJpYnV0ZXMgd2l0aCBgJGBcbiAgICAgICAgLy8gY2FuJ3QgYmUgc2V0IHVzaW5nIHNldEF0dHJpYnV0ZSlcbiAgICAgICAgaWYgKG5vZGUubG9jYWxOYW1lID09PSAnaW5wdXQnICYmIG9yaWdOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUob3JpZ05hbWUsICcnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgYW5ub3RhdGlvblxuICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShvcmlnTmFtZSk7XG4gICAgICAgIC8vIENhc2UgaGFja2VyeTogYXR0cmlidXRlcyBhcmUgbG93ZXItY2FzZSwgYnV0IGJpbmQgdGFyZ2V0c1xuICAgICAgICAvLyAocHJvcGVydGllcykgYXJlIGNhc2Ugc2Vuc2l0aXZlLiBHYW1iaXQgaXMgdG8gbWFwIGRhc2gtY2FzZSB0b1xuICAgICAgICAvLyBjYW1lbC1jYXNlOiBgZm9vLWJhcmAgYmVjb21lcyBgZm9vQmFyYC5cbiAgICAgICAgLy8gQXR0cmlidXRlIGJpbmRpbmdzIGFyZSBleGNlcHRlZC5cbiAgICAgICAgaWYgKGtpbmQgPT09ICdwcm9wZXJ0eScpIHtcbiAgICAgICAgICBuYW1lID0gZGFzaFRvQ2FtZWxDYXNlKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEJpbmRpbmcodGhpcywgdGVtcGxhdGVJbmZvLCBub2RlSW5mbywga2luZCwgbmFtZSwgcGFydHMsIGxpdGVyYWwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzdXBlci5fcGFyc2VUZW1wbGF0ZU5vZGVBdHRyaWJ1dGUobm9kZSwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbywgbmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyBkZWZhdWx0IGBUZW1wbGF0ZVN0YW1wYCBpbXBsZW1lbnRhdGlvbiB0byBhZGQgc3VwcG9ydCBmb3JcbiAgICAgKiBiaW5kaW5nIHRoZSBwcm9wZXJ0aWVzIHRoYXQgYSBuZXN0ZWQgdGVtcGxhdGUgZGVwZW5kcyBvbiB0byB0aGUgdGVtcGxhdGVcbiAgICAgKiBhcyBgX2hvc3RfPHByb3BlcnR5PmAuXG4gICAgICpcbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgTm9kZSB0byBwYXJzZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVJbmZvfSB0ZW1wbGF0ZUluZm8gVGVtcGxhdGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0ge05vZGVJbmZvfSBub2RlSW5mbyBOb2RlIG1ldGFkYXRhIGZvciBjdXJyZW50IHRlbXBsYXRlIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZpc2l0ZWQgbm9kZSBhZGRlZCBub2RlLXNwZWNpZmljXG4gICAgICogICBtZXRhZGF0YSB0byBgbm9kZUluZm9gXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9IEludGVyZmFjZXMgaW4gY2xvc3VyZSBkbyBub3QgaW5oZXJpdCBzdGF0aWNzLCBidXQgY2xhc3NlcyBkb1xuICAgICAqL1xuICAgIHN0YXRpYyBfcGFyc2VUZW1wbGF0ZU5lc3RlZFRlbXBsYXRlKG5vZGUsIHRlbXBsYXRlSW5mbywgbm9kZUluZm8pIHtcbiAgICAgIGxldCBub3RlZCA9IHN1cGVyLl9wYXJzZVRlbXBsYXRlTmVzdGVkVGVtcGxhdGUobm9kZSwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbyk7XG4gICAgICAvLyBNZXJnZSBob3N0IHByb3BzIGludG8gb3V0ZXIgdGVtcGxhdGUgYW5kIGFkZCBiaW5kaW5nc1xuICAgICAgbGV0IGhvc3RQcm9wcyA9IG5vZGVJbmZvLnRlbXBsYXRlSW5mby5ob3N0UHJvcHM7XG4gICAgICBsZXQgbW9kZSA9ICd7JztcbiAgICAgIGZvciAobGV0IHNvdXJjZSBpbiBob3N0UHJvcHMpIHtcbiAgICAgICAgbGV0IHBhcnRzID0gW3sgbW9kZSwgc291cmNlLCBkZXBlbmRlbmNpZXM6IFtzb3VyY2VdIH1dO1xuICAgICAgICBhZGRCaW5kaW5nKHRoaXMsIHRlbXBsYXRlSW5mbywgbm9kZUluZm8sICdwcm9wZXJ0eScsICdfaG9zdF8nICsgc291cmNlLCBwYXJ0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm90ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHRvIHBhcnNlIHRleHQgaW4gYSB0ZW1wbGF0ZSAoZWl0aGVyIGF0dHJpYnV0ZSB2YWx1ZXMgb3JcbiAgICAgKiB0ZXh0Q29udGVudCkgaW50byBiaW5kaW5nIG1ldGFkYXRhLlxuICAgICAqXG4gICAgICogQW55IG92ZXJyaWRlcyBvZiB0aGlzIG1ldGhvZCBzaG91bGQgcmV0dXJuIGFuIGFycmF5IG9mIGJpbmRpbmcgcGFydFxuICAgICAqIG1ldGFkYXRhICByZXByZXNlbnRpbmcgb25lIG9yIG1vcmUgYmluZGluZ3MgZm91bmQgaW4gdGhlIHByb3ZpZGVkIHRleHRcbiAgICAgKiBhbmQgYW55IFwibGl0ZXJhbFwiIHRleHQgaW4gYmV0d2Vlbi4gIEFueSBub24tbGl0ZXJhbCBwYXJ0cyB3aWxsIGJlIHBhc3NlZFxuICAgICAqIHRvIGBfZXZhbHVhdGVCaW5kaW5nYCB3aGVuIGFueSBkZXBlbmRlbmNpZXMgY2hhbmdlLiAgVGhlIG9ubHkgcmVxdWlyZWRcbiAgICAgKiBmaWVsZHMgb2YgZWFjaCBcInBhcnRcIiBpbiB0aGUgcmV0dXJuZWQgYXJyYXkgYXJlIGFzIGZvbGxvd3M6XG4gICAgICpcbiAgICAgKiAtIGBkZXBlbmRlbmNpZXNgIC0gQXJyYXkgY29udGFpbmluZyB0cmlnZ2VyIG1ldGFkYXRhIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICogICB0aGF0IHNob3VsZCB0cmlnZ2VyIHRoZSBiaW5kaW5nIHRvIHVwZGF0ZVxuICAgICAqIC0gYGxpdGVyYWxgIC0gU3RyaW5nIGNvbnRhaW5pbmcgdGV4dCBpZiB0aGUgcGFydCByZXByZXNlbnRzIGEgbGl0ZXJhbDtcbiAgICAgKiAgIGluIHRoaXMgY2FzZSBubyBgZGVwZW5kZW5jaWVzYCBhcmUgbmVlZGVkXG4gICAgICpcbiAgICAgKiBBZGRpdGlvbmFsIG1ldGFkYXRhIGZvciB1c2UgYnkgYF9ldmFsdWF0ZUJpbmRpbmdgIG1heSBiZSBwcm92aWRlZCBpblxuICAgICAqIGVhY2ggcGFydCBvYmplY3QgYXMgbmVlZGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaGFuZGxlcyB0aGUgZm9sbG93aW5nIHR5cGVzIG9mIGJpbmRpbmdzXG4gICAgICogKG9uZSBvciBtb3JlIG1heSBiZSBpbnRlcm1peGVkIHdpdGggbGl0ZXJhbCBzdHJpbmdzKTpcbiAgICAgKiAtIFByb3BlcnR5IGJpbmRpbmc6IGBbW3Byb3BdXWBcbiAgICAgKiAtIFBhdGggYmluZGluZzogYFtbb2JqZWN0LnByb3BdXWBcbiAgICAgKiAtIE5lZ2F0ZWQgcHJvcGVydHkgb3IgcGF0aCBiaW5kaW5nczogYFtbIXByb3BdXWAgb3IgYFtbIW9iamVjdC5wcm9wXV1gXG4gICAgICogLSBUd28td2F5IHByb3BlcnR5IG9yIHBhdGggYmluZGluZ3MgKHN1cHBvcnRzIG5lZ2F0aW9uKTpcbiAgICAgKiAgIGB7e3Byb3B9fWAsIGB7e29iamVjdC5wcm9wfX1gLCBge3shcHJvcH19YCBvciBge3shb2JqZWN0LnByb3B9fWBcbiAgICAgKiAtIElubGluZSBjb21wdXRlZCBtZXRob2QgKHN1cHBvcnRzIG5lZ2F0aW9uKTpcbiAgICAgKiAgIGBbW2NvbXB1dGUoYSwgJ2xpdGVyYWwnLCBiKV1dYCwgYFtbIWNvbXB1dGUoYSwgJ2xpdGVyYWwnLCBiKV1dYFxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgYmVzdFxuICAgICAqIHBlcmZvcm1hbmNlLiBIb3dldmVyLCB0aGUgcmVndWxhciBleHByZXNzaW9uIHVzZXMgYSB3aGl0ZS1saXN0IG9mXG4gICAgICogYWxsb3dlZCBjaGFyYWN0ZXJzIGluIGEgZGF0YS1iaW5kaW5nLCB3aGljaCBjYXVzZXMgcHJvYmxlbXMgZm9yXG4gICAgICogZGF0YS1iaW5kaW5ncyB0aGF0IGRvIHVzZSBjaGFyYWN0ZXJzIG5vdCBpbiB0aGlzIHdoaXRlLWxpc3QuXG4gICAgICpcbiAgICAgKiBJbnN0ZWFkIG9mIHVwZGF0aW5nIHRoZSB3aGl0ZS1saXN0IHdpdGggYWxsIGFsbG93ZWQgY2hhcmFjdGVycyxcbiAgICAgKiB0aGVyZSBpcyBhIFN0cmljdEJpbmRpbmdQYXJzZXIgKHNlZSBsaWIvbWl4aW5zL3N0cmljdC1iaW5kaW5nLXBhcnNlcilcbiAgICAgKiB0aGF0IHVzZXMgYSBzdGF0ZSBtYWNoaW5lIGluc3RlYWQuIFRoaXMgc3RhdGUgbWFjaGluZSBpcyBhYmxlIHRvIGhhbmRsZVxuICAgICAqIGFsbCBjaGFyYWN0ZXJzLiBIb3dldmVyLCBpdCBpcyBzbGlnaHRseSBsZXNzIHBlcmZvcm1hbnQsIHRoZXJlZm9yZSB3ZVxuICAgICAqIGV4dHJhY3RlZCBpdCBpbnRvIGEgc2VwYXJhdGUgb3B0aW9uYWwgbWl4aW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHRvIHBhcnNlIGZyb20gYXR0cmlidXRlIG9yIHRleHRDb250ZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRlbXBsYXRlSW5mbyBDdXJyZW50IHRlbXBsYXRlIG1ldGFkYXRhXG4gICAgICogQHJldHVybiB7QXJyYXk8IUJpbmRpbmdQYXJ0Pn0gQXJyYXkgb2YgYmluZGluZyBwYXJ0IG1ldGFkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXRpYyBfcGFyc2VCaW5kaW5ncyh0ZXh0LCB0ZW1wbGF0ZUluZm8pIHtcbiAgICAgIGxldCBwYXJ0cyA9IFtdO1xuICAgICAgbGV0IGxhc3RJbmRleCA9IDA7XG4gICAgICBsZXQgbTtcbiAgICAgIC8vIEV4YW1wbGU6IFwibGl0ZXJhbDF7e3Byb3B9fWxpdGVyYWwyW1shY29tcHV0ZShmb28sYmFyKV1dZmluYWxcIlxuICAgICAgLy8gUmVnZXggbWF0Y2hlczpcbiAgICAgIC8vICAgICAgICBJdGVyYXRpb24gMTogIEl0ZXJhdGlvbiAyOlxuICAgICAgLy8gbVsxXTogJ3t7JyAgICAgICAgICAnW1snXG4gICAgICAvLyBtWzJdOiAnJyAgICAgICAgICAgICchJ1xuICAgICAgLy8gbVszXTogJ3Byb3AnICAgICAgICAnY29tcHV0ZShmb28sYmFyKSdcbiAgICAgIHdoaWxlICgobSA9IGJpbmRpbmdSZWdleC5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBBZGQgbGl0ZXJhbCBwYXJ0XG4gICAgICAgIGlmIChtLmluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICAgICAgcGFydHMucHVzaCh7bGl0ZXJhbDogdGV4dC5zbGljZShsYXN0SW5kZXgsIG0uaW5kZXgpfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGJpbmRpbmcgcGFydFxuICAgICAgICBsZXQgbW9kZSA9IG1bMV1bMF07XG4gICAgICAgIGxldCBuZWdhdGUgPSBCb29sZWFuKG1bMl0pO1xuICAgICAgICBsZXQgc291cmNlID0gbVszXS50cmltKCk7XG4gICAgICAgIGxldCBjdXN0b21FdmVudCA9IGZhbHNlLCBub3RpZnlFdmVudCA9ICcnLCBjb2xvbiA9IC0xO1xuICAgICAgICBpZiAobW9kZSA9PSAneycgJiYgKGNvbG9uID0gc291cmNlLmluZGV4T2YoJzo6JykpID4gMCkge1xuICAgICAgICAgIG5vdGlmeUV2ZW50ID0gc291cmNlLnN1YnN0cmluZyhjb2xvbiArIDIpO1xuICAgICAgICAgIHNvdXJjZSA9IHNvdXJjZS5zdWJzdHJpbmcoMCwgY29sb24pO1xuICAgICAgICAgIGN1c3RvbUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2lnbmF0dXJlID0gcGFyc2VNZXRob2Qoc291cmNlKTtcbiAgICAgICAgbGV0IGRlcGVuZGVuY2llcyA9IFtdO1xuICAgICAgICBpZiAoc2lnbmF0dXJlKSB7XG4gICAgICAgICAgLy8gSW5saW5lIGNvbXB1dGVkIGZ1bmN0aW9uXG4gICAgICAgICAgbGV0IHthcmdzLCBtZXRob2ROYW1lfSA9IHNpZ25hdHVyZTtcbiAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8YXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGFyZyA9IGFyZ3NbaV07XG4gICAgICAgICAgICBpZiAoIWFyZy5saXRlcmFsKSB7XG4gICAgICAgICAgICAgIGRlcGVuZGVuY2llcy5wdXNoKGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBkeW5hbWljRm5zID0gdGVtcGxhdGVJbmZvLmR5bmFtaWNGbnM7XG4gICAgICAgICAgaWYgKGR5bmFtaWNGbnMgJiYgZHluYW1pY0Zuc1ttZXRob2ROYW1lXSB8fCBzaWduYXR1cmUuc3RhdGljKSB7XG4gICAgICAgICAgICBkZXBlbmRlbmNpZXMucHVzaChtZXRob2ROYW1lKTtcbiAgICAgICAgICAgIHNpZ25hdHVyZS5keW5hbWljRm4gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQcm9wZXJ0eSBvciBwYXRoXG4gICAgICAgICAgZGVwZW5kZW5jaWVzLnB1c2goc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2UsIG1vZGUsIG5lZ2F0ZSwgY3VzdG9tRXZlbnQsIHNpZ25hdHVyZSwgZGVwZW5kZW5jaWVzLFxuICAgICAgICAgIGV2ZW50OiBub3RpZnlFdmVudFxuICAgICAgICB9KTtcbiAgICAgICAgbGFzdEluZGV4ID0gYmluZGluZ1JlZ2V4Lmxhc3RJbmRleDtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCBhIGZpbmFsIGxpdGVyYWwgcGFydFxuICAgICAgaWYgKGxhc3RJbmRleCAmJiBsYXN0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICBsZXQgbGl0ZXJhbCA9IHRleHQuc3Vic3RyaW5nKGxhc3RJbmRleCk7XG4gICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICBsaXRlcmFsOiBsaXRlcmFsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHRvIGV2YWx1YXRlIGEgcHJldmlvdXNseSBwYXJzZWQgYmluZGluZyBwYXJ0IGJhc2VkIG9uIGEgc2V0IG9mXG4gICAgICogb25lIG9yIG1vcmUgY2hhbmdlZCBkZXBlbmRlbmNpZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3RoaXN9IGluc3QgRWxlbWVudCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIHNjb3BlIGZvclxuICAgICAqICAgYmluZGluZyBkZXBlbmRlbmNpZXNcbiAgICAgKiBAcGFyYW0ge0JpbmRpbmdQYXJ0fSBwYXJ0IEJpbmRpbmcgcGFydCBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFByb3BlcnR5L3BhdGggdGhhdCB0cmlnZ2VyZWQgdGhpcyBlZmZlY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgQmFnIG9mIGN1cnJlbnQgcHJvcGVydHkgY2hhbmdlc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbGRQcm9wcyBCYWcgb2YgcHJldmlvdXMgdmFsdWVzIGZvciBjaGFuZ2VkIHByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGhhc1BhdGhzIFRydWUgd2l0aCBgcHJvcHNgIGNvbnRhaW5zIG9uZSBvciBtb3JlIHBhdGhzXG4gICAgICogQHJldHVybiB7Kn0gVmFsdWUgdGhlIGJpbmRpbmcgcGFydCBldmFsdWF0ZWQgdG9cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhdGljIF9ldmFsdWF0ZUJpbmRpbmcoaW5zdCwgcGFydCwgcGF0aCwgcHJvcHMsIG9sZFByb3BzLCBoYXNQYXRocykge1xuICAgICAgbGV0IHZhbHVlO1xuICAgICAgaWYgKHBhcnQuc2lnbmF0dXJlKSB7XG4gICAgICAgIHZhbHVlID0gcnVuTWV0aG9kRWZmZWN0KGluc3QsIHBhdGgsIHByb3BzLCBvbGRQcm9wcywgcGFydC5zaWduYXR1cmUpO1xuICAgICAgfSBlbHNlIGlmIChwYXRoICE9IHBhcnQuc291cmNlKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0KGluc3QsIHBhcnQuc291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChoYXNQYXRocyAmJiBpc1BhdGgocGF0aCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IGdldChpbnN0LCBwYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGluc3QuX19kYXRhW3BhdGhdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFydC5uZWdhdGUpIHtcbiAgICAgICAgdmFsdWUgPSAhdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gIH1cblxuICAvLyBtYWtlIGEgdHlwaW5nIGZvciBjbG9zdXJlIDpQXG4gIFByb3BlcnR5RWZmZWN0c1R5cGUgPSBQcm9wZXJ0eUVmZmVjdHM7XG5cbiAgcmV0dXJuIFByb3BlcnR5RWZmZWN0cztcbn0pO1xuXG4vKipcbiAqIEhlbHBlciBhcGkgZm9yIGVucXVldWluZyBjbGllbnQgZG9tIGNyZWF0ZWQgYnkgYSBob3N0IGVsZW1lbnQuXG4gKlxuICogQnkgZGVmYXVsdCBlbGVtZW50cyBhcmUgZmx1c2hlZCB2aWEgYF9mbHVzaFByb3BlcnRpZXNgIHdoZW5cbiAqIGBjb25uZWN0ZWRDYWxsYmFja2AgaXMgY2FsbGVkLiBFbGVtZW50cyBhdHRhY2ggdGhlaXIgY2xpZW50IGRvbSB0b1xuICogdGhlbXNlbHZlcyBhdCBgcmVhZHlgIHRpbWUgd2hpY2ggcmVzdWx0cyBmcm9tIHRoaXMgZmlyc3QgZmx1c2guXG4gKiBUaGlzIHByb3ZpZGVzIGFuIG9yZGVyaW5nIGd1YXJhbnRlZSB0aGF0IHRoZSBjbGllbnQgZG9tIGFuIGVsZW1lbnRcbiAqIGNyZWF0ZXMgaXMgZmx1c2hlZCBiZWZvcmUgdGhlIGVsZW1lbnQgaXRzZWxmIChpLmUuIGNsaWVudCBgcmVhZHlgXG4gKiBmaXJlcyBiZWZvcmUgaG9zdCBgcmVhZHlgKS5cbiAqXG4gKiBIb3dldmVyLCBpZiBgX2ZsdXNoUHJvcGVydGllc2AgaXMgY2FsbGVkICpiZWZvcmUqIGFuIGVsZW1lbnQgaXMgY29ubmVjdGVkLFxuICogYXMgZm9yIGV4YW1wbGUgYFRlbXBsYXRpemVgIGRvZXMsIHRoaXMgb3JkZXJpbmcgZ3VhcmFudGVlIGNhbm5vdCBiZVxuICogc2F0aXNmaWVkIGJlY2F1c2Ugbm8gZWxlbWVudHMgYXJlIGNvbm5lY3RlZC4gKE5vdGU6IEJvdW5kIGVsZW1lbnRzIHRoYXRcbiAqIHJlY2VpdmUgZGF0YSBkbyBiZWNvbWUgZW5xdWV1ZWQgY2xpZW50cyBhbmQgYXJlIHByb3Blcmx5IG9yZGVyZWQgYnV0XG4gKiB1bmJvdW5kIGVsZW1lbnRzIGFyZSBub3QuKVxuICpcbiAqIFRvIG1haW50YWluIHRoZSBkZXNpcmVkIFwiY2xpZW50IGJlZm9yZSBob3N0XCIgb3JkZXJpbmcgZ3VhcmFudGVlIGZvciB0aGlzXG4gKiBjYXNlIHdlIHJlbHkgb24gdGhlIFwiaG9zdCBzdGFjay4gQ2xpZW50IG5vZGVzIHJlZ2lzdGVycyB0aGVtc2VsdmVzIHdpdGhcbiAqIHRoZSBjcmVhdGluZyBob3N0IGVsZW1lbnQgd2hlbiBjcmVhdGVkLiBUaGlzIGVuc3VyZXMgdGhhdCBhbGwgY2xpZW50IGRvbVxuICogaXMgcmVhZGllZCBpbiB0aGUgcHJvcGVyIG9yZGVyLCBtYWludGFpbmluZyB0aGUgZGVzaXJlZCBndWFyYW50ZWUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuY2xhc3MgSG9zdFN0YWNrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gaW5zdCBJbnN0YW5jZSB0byBhZGQgdG8gaG9zdFN0YWNrXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICByZWdpc3Rlckhvc3QoaW5zdCkge1xuICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCkge1xuICAgICAgbGV0IGhvc3QgPSB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdO1xuICAgICAgaG9zdC5fZW5xdWV1ZUNsaWVudChpbnN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBpbnN0IEluc3RhbmNlIHRvIGJlZ2luIGhvc3RpbmdcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGJlZ2luSG9zdGluZyhpbnN0KSB7XG4gICAgdGhpcy5zdGFjay5wdXNoKGluc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gaW5zdCBJbnN0YW5jZSB0byBlbmQgaG9zdGluZ1xuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgZW5kSG9zdGluZyhpbnN0KSB7XG4gICAgbGV0IHN0YWNrTGVuID0gdGhpcy5zdGFjay5sZW5ndGg7XG4gICAgaWYgKHN0YWNrTGVuICYmIHRoaXMuc3RhY2tbc3RhY2tMZW4tMV0gPT0gaW5zdCkge1xuICAgICAgdGhpcy5zdGFjay5wb3AoKTtcbiAgICB9XG4gIH1cbn1cbmNvbnN0IGhvc3RTdGFjayA9IG5ldyBIb3N0U3RhY2soKTtcbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5pbXBvcnQgJy4uL3V0aWxzL2Jvb3QuanMnO1xuXG5pbXBvcnQgeyBkZWR1cGluZ01peGluIH0gZnJvbSAnLi4vdXRpbHMvbWl4aW4uanMnO1xuXG4vLyAxLnggYmFja3dhcmRzLWNvbXBhdGlibGUgYXV0by13cmFwcGVyIGZvciB0ZW1wbGF0ZSB0eXBlIGV4dGVuc2lvbnNcbi8vIFRoaXMgaXMgYSBjbGVhciBsYXllcmluZyB2aW9sYXRpb24gYW5kIGdpdmVzIGZhdm9yZWQtbmF0aW9uIHN0YXR1cyB0b1xuLy8gZG9tLWlmIGFuZCBkb20tcmVwZWF0IHRlbXBsYXRlcy4gIFRoaXMgaXMgYSBjb25jZWl0IHdlJ3JlIGNob29zaW5nIHRvIGtlZXBcbi8vIGEuKSB0byBlYXNlIDEueCBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBkdWUgdG8gbG9zcyBvZiBgaXNgLCBhbmRcbi8vIGIuKSB0byBtYWludGFpbiBpZi9yZXBlYXQgY2FwYWJpbGl0eSBpbiBwYXJzZXItY29uc3RyYWluZWQgZWxlbWVudHNcbi8vICAgICAoZS5nLiB0YWJsZSwgc2VsZWN0KSBpbiBsaWV1IG9mIG5hdGl2ZSBDRSB0eXBlIGV4dGVuc2lvbnMgd2l0aG91dFxuLy8gICAgIG1hc3NpdmUgbmV3IGludmVudGlvbiBpbiB0aGlzIHNwYWNlIChlLmcuIGRpcmVjdGl2ZSBzeXN0ZW0pXG5jb25zdCB0ZW1wbGF0ZUV4dGVuc2lvbnMgPSB7XG4gICdkb20taWYnOiB0cnVlLFxuICAnZG9tLXJlcGVhdCc6IHRydWVcbn07XG5mdW5jdGlvbiB3cmFwVGVtcGxhdGVFeHRlbnNpb24obm9kZSkge1xuICBsZXQgaXMgPSBub2RlLmdldEF0dHJpYnV0ZSgnaXMnKTtcbiAgaWYgKGlzICYmIHRlbXBsYXRlRXh0ZW5zaW9uc1tpc10pIHtcbiAgICBsZXQgdCA9IG5vZGU7XG4gICAgdC5yZW1vdmVBdHRyaWJ1dGUoJ2lzJyk7XG4gICAgbm9kZSA9IHQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KGlzKTtcbiAgICB0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUsIHQpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQodCk7XG4gICAgd2hpbGUodC5hdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUodC5hdHRyaWJ1dGVzWzBdLm5hbWUsIHQuYXR0cmlidXRlc1swXS52YWx1ZSk7XG4gICAgICB0LnJlbW92ZUF0dHJpYnV0ZSh0LmF0dHJpYnV0ZXNbMF0ubmFtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBmaW5kVGVtcGxhdGVOb2RlKHJvb3QsIG5vZGVJbmZvKSB7XG4gIC8vIHJlY3Vyc2l2ZWx5IGFzY2VuZCB0cmVlIHVudGlsIHdlIGhpdCByb290XG4gIGxldCBwYXJlbnQgPSBub2RlSW5mby5wYXJlbnRJbmZvICYmIGZpbmRUZW1wbGF0ZU5vZGUocm9vdCwgbm9kZUluZm8ucGFyZW50SW5mbyk7XG4gIC8vIHVud2luZCB0aGUgc3RhY2ssIHJldHVybmluZyB0aGUgaW5kZXhlZCBub2RlIGF0IGVhY2ggbGV2ZWxcbiAgaWYgKHBhcmVudCkge1xuICAgIC8vIG5vdGU6IG1hcmdpbmFsbHkgZmFzdGVyIHRoYW4gaW5kZXhpbmcgdmlhIGNoaWxkTm9kZXNcbiAgICAvLyAoaHR0cDovL2pzcGVyZi5jb20vY2hpbGRub2Rlcy1sb29rdXApXG4gICAgZm9yIChsZXQgbj1wYXJlbnQuZmlyc3RDaGlsZCwgaT0wOyBuOyBuPW4ubmV4dFNpYmxpbmcpIHtcbiAgICAgIGlmIChub2RlSW5mby5wYXJlbnRJbmRleCA9PT0gaSsrKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcm9vdDtcbiAgfVxufVxuXG4vLyBjb25zdHJ1Y3QgYCRgIG1hcCAoZnJvbSBpZCBhbm5vdGF0aW9ucylcbmZ1bmN0aW9uIGFwcGx5SWRUb01hcChpbnN0LCBtYXAsIG5vZGUsIG5vZGVJbmZvKSB7XG4gIGlmIChub2RlSW5mby5pZCkge1xuICAgIG1hcFtub2RlSW5mby5pZF0gPSBub2RlO1xuICB9XG59XG5cbi8vIGluc3RhbGwgZXZlbnQgbGlzdGVuZXJzIChmcm9tIGV2ZW50IGFubm90YXRpb25zKVxuZnVuY3Rpb24gYXBwbHlFdmVudExpc3RlbmVyKGluc3QsIG5vZGUsIG5vZGVJbmZvKSB7XG4gIGlmIChub2RlSW5mby5ldmVudHMgJiYgbm9kZUluZm8uZXZlbnRzLmxlbmd0aCkge1xuICAgIGZvciAobGV0IGo9MCwgZSQ9bm9kZUluZm8uZXZlbnRzLCBlOyAoajxlJC5sZW5ndGgpICYmIChlPWUkW2pdKTsgaisrKSB7XG4gICAgICBpbnN0Ll9hZGRNZXRob2RFdmVudExpc3RlbmVyVG9Ob2RlKG5vZGUsIGUubmFtZSwgZS52YWx1ZSwgaW5zdCk7XG4gICAgfVxuICB9XG59XG5cbi8vIHB1c2ggY29uZmlndXJhdGlvbiByZWZlcmVuY2VzIGF0IGNvbmZpZ3VyZSB0aW1lXG5mdW5jdGlvbiBhcHBseVRlbXBsYXRlQ29udGVudChpbnN0LCBub2RlLCBub2RlSW5mbykge1xuICBpZiAobm9kZUluZm8udGVtcGxhdGVJbmZvKSB7XG4gICAgbm9kZS5fdGVtcGxhdGVJbmZvID0gbm9kZUluZm8udGVtcGxhdGVJbmZvO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVFdmVudEhhbmRsZXIoY29udGV4dCwgZXZlbnROYW1lLCBtZXRob2ROYW1lKSB7XG4gIC8vIEluc3RhbmNlcyBjYW4gb3B0aW9uYWxseSBoYXZlIGEgX21ldGhvZEhvc3Qgd2hpY2ggYWxsb3dzIHJlZGlyZWN0aW5nIHdoZXJlXG4gIC8vIHRvIGZpbmQgbWV0aG9kcy4gQ3VycmVudGx5IHVzZWQgYnkgYHRlbXBsYXRpemVgLlxuICBjb250ZXh0ID0gY29udGV4dC5fbWV0aG9kSG9zdCB8fCBjb250ZXh0O1xuICBsZXQgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoY29udGV4dFttZXRob2ROYW1lXSkge1xuICAgICAgY29udGV4dFttZXRob2ROYW1lXShlLCBlLmRldGFpbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignbGlzdGVuZXIgbWV0aG9kIGAnICsgbWV0aG9kTmFtZSArICdgIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gaGFuZGxlcjtcbn1cblxuLyoqXG4gKiBFbGVtZW50IG1peGluIHRoYXQgcHJvdmlkZXMgYmFzaWMgdGVtcGxhdGUgcGFyc2luZyBhbmQgc3RhbXBpbmcsIGluY2x1ZGluZ1xuICogdGhlIGZvbGxvd2luZyB0ZW1wbGF0ZS1yZWxhdGVkIGZlYXR1cmVzIGZvciBzdGFtcGVkIHRlbXBsYXRlczpcbiAqXG4gKiAtIERlY2xhcmF0aXZlIGV2ZW50IGxpc3RlbmVycyAoYG9uLWV2ZW50bmFtZT1cImxpc3RlbmVyXCJgKVxuICogLSBNYXAgb2Ygbm9kZSBpZCdzIHRvIHN0YW1wZWQgbm9kZSBpbnN0YW5jZXMgKGB0aGlzLiQuaWRgKVxuICogLSBOZXN0ZWQgdGVtcGxhdGUgY29udGVudCBjYWNoaW5nL3JlbW92YWwgYW5kIHJlLWluc3RhbGxhdGlvbiAocGVyZm9ybWFuY2VcbiAqICAgb3B0aW1pemF0aW9uKVxuICpcbiAqIEBtaXhpbkZ1bmN0aW9uXG4gKiBAcG9seW1lclxuICogQHN1bW1hcnkgRWxlbWVudCBjbGFzcyBtaXhpbiB0aGF0IHByb3ZpZGVzIGJhc2ljIHRlbXBsYXRlIHBhcnNpbmcgYW5kIHN0YW1waW5nXG4gKi9cbmV4cG9ydCBjb25zdCBUZW1wbGF0ZVN0YW1wID0gZGVkdXBpbmdNaXhpbihcbiAgICAvKipcbiAgICAgKiBAdGVtcGxhdGUgVFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24obmV3OlQpfSBzdXBlckNsYXNzIENsYXNzIHRvIGFwcGx5IG1peGluIHRvLlxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9uKG5ldzpUKX0gc3VwZXJDbGFzcyB3aXRoIG1peGluIGFwcGxpZWQuXG4gICAgICovXG4gICAgKHN1cGVyQ2xhc3MpID0+IHtcblxuICAvKipcbiAgICogQHBvbHltZXJcbiAgICogQG1peGluQ2xhc3NcbiAgICogQGltcGxlbWVudHMge1BvbHltZXJfVGVtcGxhdGVTdGFtcH1cbiAgICovXG4gIGNsYXNzIFRlbXBsYXRlU3RhbXAgZXh0ZW5kcyBzdXBlckNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIFNjYW5zIGEgdGVtcGxhdGUgdG8gcHJvZHVjZSB0ZW1wbGF0ZSBtZXRhZGF0YS5cbiAgICAgKlxuICAgICAqIFRlbXBsYXRlLXNwZWNpZmljIG1ldGFkYXRhIGFyZSBzdG9yZWQgaW4gdGhlIG9iamVjdCByZXR1cm5lZCwgYW5kIG5vZGUtXG4gICAgICogc3BlY2lmaWMgbWV0YWRhdGEgYXJlIHN0b3JlZCBpbiBvYmplY3RzIGluIGl0cyBmbGF0dGVuZWQgYG5vZGVJbmZvTGlzdGBcbiAgICAgKiBhcnJheS4gIE9ubHkgbm9kZXMgaW4gdGhlIHRlbXBsYXRlIHRoYXQgd2VyZSBwYXJzZWQgYXMgbm9kZXMgb2ZcbiAgICAgKiBpbnRlcmVzdCBjb250YWluIGFuIG9iamVjdCBpbiBgbm9kZUluZm9MaXN0YC4gIEVhY2ggYG5vZGVJbmZvYCBvYmplY3RcbiAgICAgKiBjb250YWlucyBhbiBgaW5kZXhgIChgY2hpbGROb2Rlc2AgaW5kZXggaW4gcGFyZW50KSBhbmQgb3B0aW9uYWxseVxuICAgICAqIGBwYXJlbnRgLCB3aGljaCBwb2ludHMgdG8gbm9kZSBpbmZvIG9mIGl0cyBwYXJlbnQgKGluY2x1ZGluZyBpdHMgaW5kZXgpLlxuICAgICAqXG4gICAgICogVGhlIHRlbXBsYXRlIG1ldGFkYXRhIG9iamVjdCByZXR1cm5lZCBmcm9tIHRoaXMgbWV0aG9kIGhhcyB0aGUgZm9sbG93aW5nXG4gICAgICogc3RydWN0dXJlIChtYW55IGZpZWxkcyBvcHRpb25hbCk6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAge1xuICAgICAqICAgICAvLyBGbGF0dGVuZWQgbGlzdCBvZiBub2RlIG1ldGFkYXRhIChmb3Igbm9kZXMgdGhhdCBnZW5lcmF0ZWQgbWV0YWRhdGEpXG4gICAgICogICAgIG5vZGVJbmZvTGlzdDogW1xuICAgICAqICAgICAgIHtcbiAgICAgKiAgICAgICAgIC8vIGBpZGAgYXR0cmlidXRlIGZvciBhbnkgbm9kZXMgd2l0aCBpZCdzIGZvciBnZW5lcmF0aW5nIGAkYCBtYXBcbiAgICAgKiAgICAgICAgIGlkOiB7c3RyaW5nfSxcbiAgICAgKiAgICAgICAgIC8vIGBvbi1ldmVudD1cImhhbmRsZXJcImAgbWV0YWRhdGFcbiAgICAgKiAgICAgICAgIGV2ZW50czogW1xuICAgICAqICAgICAgICAgICB7XG4gICAgICogICAgICAgICAgICAgbmFtZToge3N0cmluZ30sICAgLy8gZXZlbnQgbmFtZVxuICAgICAqICAgICAgICAgICAgIHZhbHVlOiB7c3RyaW5nfSwgIC8vIGhhbmRsZXIgbWV0aG9kIG5hbWVcbiAgICAgKiAgICAgICAgICAgfSwgLi4uXG4gICAgICogICAgICAgICBdLFxuICAgICAqICAgICAgICAgLy8gTm90ZXMgd2hlbiB0aGUgdGVtcGxhdGUgY29udGFpbmVkIGEgYDxzbG90PmAgZm9yIHNoYWR5IERPTVxuICAgICAqICAgICAgICAgLy8gb3B0aW1pemF0aW9uIHB1cnBvc2VzXG4gICAgICogICAgICAgICBoYXNJbnNlcnRpb25Qb2ludDoge2Jvb2xlYW59LFxuICAgICAqICAgICAgICAgLy8gRm9yIG5lc3RlZCBgPHRlbXBsYXRlPmBgIG5vZGVzLCBuZXN0ZWQgdGVtcGxhdGUgbWV0YWRhdGFcbiAgICAgKiAgICAgICAgIHRlbXBsYXRlSW5mbzoge29iamVjdH0sIC8vIG5lc3RlZCB0ZW1wbGF0ZSBtZXRhZGF0YVxuICAgICAqICAgICAgICAgLy8gTWV0YWRhdGEgdG8gYWxsb3cgZWZmaWNpZW50IHJldHJpZXZhbCBvZiBpbnN0YW5jZWQgbm9kZVxuICAgICAqICAgICAgICAgLy8gY29ycmVzcG9uZGluZyB0byB0aGlzIG1ldGFkYXRhXG4gICAgICogICAgICAgICBwYXJlbnRJbmZvOiB7bnVtYmVyfSwgICAvLyByZWZlcmVuY2UgdG8gcGFyZW50IG5vZGVJbmZvPlxuICAgICAqICAgICAgICAgcGFyZW50SW5kZXg6IHtudW1iZXJ9LCAgLy8gaW5kZXggaW4gcGFyZW50J3MgYGNoaWxkTm9kZXNgIGNvbGxlY3Rpb25cbiAgICAgKiAgICAgICAgIGluZm9JbmRleDoge251bWJlcn0sICAgIC8vIGluZGV4IG9mIHRoaXMgYG5vZGVJbmZvYCBpbiBgdGVtcGxhdGVJbmZvLm5vZGVJbmZvTGlzdGBcbiAgICAgKiAgICAgICB9LFxuICAgICAqICAgICAgIC4uLlxuICAgICAqICAgICBdLFxuICAgICAqICAgICAvLyBXaGVuIHRydWUsIHRoZSB0ZW1wbGF0ZSBoYWQgdGhlIGBzdHJpcC13aGl0ZXNwYWNlYCBhdHRyaWJ1dGVcbiAgICAgKiAgICAgLy8gb3Igd2FzIG5lc3RlZCBpbiBhIHRlbXBsYXRlIHdpdGggdGhhdCBzZXR0aW5nXG4gICAgICogICAgIHN0cmlwV2hpdGVzcGFjZToge2Jvb2xlYW59LFxuICAgICAqICAgICAvLyBGb3IgbmVzdGVkIHRlbXBsYXRlcywgbmVzdGVkIHRlbXBsYXRlIGNvbnRlbnQgaXMgbW92ZWQgaW50b1xuICAgICAqICAgICAvLyBhIGRvY3VtZW50IGZyYWdtZW50IHN0b3JlZCBoZXJlOyB0aGlzIGlzIGFuIG9wdGltaXphdGlvbiB0b1xuICAgICAqICAgICAvLyBhdm9pZCB0aGUgY29zdCBvZiBuZXN0ZWQgdGVtcGxhdGUgY2xvbmluZ1xuICAgICAqICAgICBjb250ZW50OiB7RG9jdW1lbnRGcmFnbWVudH1cbiAgICAgKiAgIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGtpY2tzIG9mZiBhIHJlY3Vyc2l2ZSB0cmVld2FsayBhcyBmb2xsb3dzOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogICAgX3BhcnNlVGVtcGxhdGUgPC0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICAgKiAgICAgIF9wYXJzZVRlbXBsYXRlQ29udGVudCAgICAgICAgICAgICAgfFxuICAgICAqICAgICAgICBfcGFyc2VUZW1wbGF0ZU5vZGUgIDwtLS0tLS0tLS0tLS18LS0rXG4gICAgICogICAgICAgICAgX3BhcnNlVGVtcGxhdGVOZXN0ZWRUZW1wbGF0ZSAtLSsgIHxcbiAgICAgKiAgICAgICAgICBfcGFyc2VUZW1wbGF0ZUNoaWxkTm9kZXMgLS0tLS0tLS0tK1xuICAgICAqICAgICAgICAgIF9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZXNcbiAgICAgKiAgICAgICAgICAgIF9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBvdmVycmlkZGVuIHRvIGFkZCBjdXN0b20gbWV0YWRhdGEgYWJvdXQgdGVtcGxhdGVzXG4gICAgICogdG8gZWl0aGVyIGB0ZW1wbGF0ZUluZm9gIG9yIGBub2RlSW5mb2AuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhpcyBtZXRob2QgbWF5IGJlIGRlc3RydWN0aXZlIHRvIHRoZSB0ZW1wbGF0ZSwgaW4gdGhhdFxuICAgICAqIGUuZy4gZXZlbnQgYW5ub3RhdGlvbnMgbWF5IGJlIHJlbW92ZWQgYWZ0ZXIgYmVpbmcgbm90ZWQgaW4gdGhlXG4gICAgICogdGVtcGxhdGUgbWV0YWRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFIVE1MVGVtcGxhdGVFbGVtZW50fSB0ZW1wbGF0ZSBUZW1wbGF0ZSB0byBwYXJzZVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVJbmZvPX0gb3V0ZXJUZW1wbGF0ZUluZm8gVGVtcGxhdGUgbWV0YWRhdGEgZnJvbSB0aGUgb3V0ZXJcbiAgICAgKiAgIHRlbXBsYXRlLCBmb3IgcGFyc2luZyBuZXN0ZWQgdGVtcGxhdGVzXG4gICAgICogQHJldHVybiB7IVRlbXBsYXRlSW5mb30gUGFyc2VkIHRlbXBsYXRlIG1ldGFkYXRhXG4gICAgICovXG4gICAgc3RhdGljIF9wYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCBvdXRlclRlbXBsYXRlSW5mbykge1xuICAgICAgLy8gc2luY2UgYSB0ZW1wbGF0ZSBtYXkgYmUgcmUtdXNlZCwgbWVtby1pemUgbWV0YWRhdGFcbiAgICAgIGlmICghdGVtcGxhdGUuX3RlbXBsYXRlSW5mbykge1xuICAgICAgICBsZXQgdGVtcGxhdGVJbmZvID0gdGVtcGxhdGUuX3RlbXBsYXRlSW5mbyA9IHt9O1xuICAgICAgICB0ZW1wbGF0ZUluZm8ubm9kZUluZm9MaXN0ID0gW107XG4gICAgICAgIHRlbXBsYXRlSW5mby5zdHJpcFdoaXRlU3BhY2UgPVxuICAgICAgICAgIChvdXRlclRlbXBsYXRlSW5mbyAmJiBvdXRlclRlbXBsYXRlSW5mby5zdHJpcFdoaXRlU3BhY2UpIHx8XG4gICAgICAgICAgdGVtcGxhdGUuaGFzQXR0cmlidXRlKCdzdHJpcC13aGl0ZXNwYWNlJyk7XG4gICAgICAgIHRoaXMuX3BhcnNlVGVtcGxhdGVDb250ZW50KHRlbXBsYXRlLCB0ZW1wbGF0ZUluZm8sIHtwYXJlbnQ6IG51bGx9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5fdGVtcGxhdGVJbmZvO1xuICAgIH1cblxuICAgIHN0YXRpYyBfcGFyc2VUZW1wbGF0ZUNvbnRlbnQodGVtcGxhdGUsIHRlbXBsYXRlSW5mbywgbm9kZUluZm8pIHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJzZVRlbXBsYXRlTm9kZSh0ZW1wbGF0ZS5jb250ZW50LCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGVtcGxhdGUgbm9kZSBhbmQgYWRkcyB0ZW1wbGF0ZSBhbmQgbm9kZSBtZXRhZGF0YSBiYXNlZCBvblxuICAgICAqIHRoZSBjdXJyZW50IG5vZGUsIGFuZCBpdHMgYGNoaWxkTm9kZXNgIGFuZCBgYXR0cmlidXRlc2AuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBtYXkgYmUgb3ZlcnJpZGRlbiB0byBhZGQgY3VzdG9tIG5vZGUgb3IgdGVtcGxhdGUgc3BlY2lmaWNcbiAgICAgKiBtZXRhZGF0YSBiYXNlZCBvbiB0aGlzIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgTm9kZSB0byBwYXJzZVxuICAgICAqIEBwYXJhbSB7IVRlbXBsYXRlSW5mb30gdGVtcGxhdGVJbmZvIFRlbXBsYXRlIG1ldGFkYXRhIGZvciBjdXJyZW50IHRlbXBsYXRlXG4gICAgICogQHBhcmFtIHshTm9kZUluZm99IG5vZGVJbmZvIE5vZGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGUuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2aXNpdGVkIG5vZGUgYWRkZWQgbm9kZS1zcGVjaWZpY1xuICAgICAqICAgbWV0YWRhdGEgdG8gYG5vZGVJbmZvYFxuICAgICAqL1xuICAgIHN0YXRpYyBfcGFyc2VUZW1wbGF0ZU5vZGUobm9kZSwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbykge1xuICAgICAgbGV0IG5vdGVkO1xuICAgICAgbGV0IGVsZW1lbnQgPSAvKiogQHR5cGUge0VsZW1lbnR9ICovKG5vZGUpO1xuICAgICAgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09ICd0ZW1wbGF0ZScgJiYgIWVsZW1lbnQuaGFzQXR0cmlidXRlKCdwcmVzZXJ2ZS1jb250ZW50JykpIHtcbiAgICAgICAgbm90ZWQgPSB0aGlzLl9wYXJzZVRlbXBsYXRlTmVzdGVkVGVtcGxhdGUoZWxlbWVudCwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbykgfHwgbm90ZWQ7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnQubG9jYWxOYW1lID09PSAnc2xvdCcpIHtcbiAgICAgICAgLy8gRm9yIFNoYWR5RG9tIG9wdGltaXphdGlvbiwgaW5kaWNhdGluZyB0aGVyZSBpcyBhbiBpbnNlcnRpb24gcG9pbnRcbiAgICAgICAgdGVtcGxhdGVJbmZvLmhhc0luc2VydGlvblBvaW50ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgbm90ZWQgPSB0aGlzLl9wYXJzZVRlbXBsYXRlQ2hpbGROb2RlcyhlbGVtZW50LCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKSB8fCBub3RlZDtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZXMgJiYgZWxlbWVudC5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgbm90ZWQgPSB0aGlzLl9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZXMoZWxlbWVudCwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbykgfHwgbm90ZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm90ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRlbXBsYXRlIGNoaWxkIG5vZGVzIGZvciB0aGUgZ2l2ZW4gcm9vdCBub2RlLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgYWxzbyB3cmFwcyB3aGl0ZWxpc3RlZCBsZWdhY3kgdGVtcGxhdGUgZXh0ZW5zaW9uc1xuICAgICAqIChgaXM9XCJkb20taWZcImAgYW5kIGBpcz1cImRvbS1yZXBlYXRcImApIHdpdGggdGhlaXIgZXF1aXZhbGVudCBlbGVtZW50XG4gICAgICogd3JhcHBlcnMsIGNvbGxhcHNlcyB0ZXh0IG5vZGVzLCBhbmQgc3RyaXBzIHdoaXRlc3BhY2UgZnJvbSB0aGUgdGVtcGxhdGVcbiAgICAgKiBpZiB0aGUgYHRlbXBsYXRlSW5mby5zdHJpcFdoaXRlc3BhY2VgIHNldHRpbmcgd2FzIHByb3ZpZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfSByb290IFJvb3Qgbm9kZSB3aG9zZSBgY2hpbGROb2Rlc2Agd2lsbCBiZSBwYXJzZWRcbiAgICAgKiBAcGFyYW0geyFUZW1wbGF0ZUluZm99IHRlbXBsYXRlSW5mbyBUZW1wbGF0ZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7IU5vZGVJbmZvfSBub2RlSW5mbyBOb2RlIG1ldGFkYXRhIGZvciBjdXJyZW50IHRlbXBsYXRlLlxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG4gICAgc3RhdGljIF9wYXJzZVRlbXBsYXRlQ2hpbGROb2Rlcyhyb290LCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvKSB7XG4gICAgICBpZiAocm9vdC5sb2NhbE5hbWUgPT09ICdzY3JpcHQnIHx8IHJvb3QubG9jYWxOYW1lID09PSAnc3R5bGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IG5vZGU9cm9vdC5maXJzdENoaWxkLCBwYXJlbnRJbmRleD0wLCBuZXh0OyBub2RlOyBub2RlPW5leHQpIHtcbiAgICAgICAgLy8gV3JhcCB0ZW1wbGF0ZXNcbiAgICAgICAgaWYgKG5vZGUubG9jYWxOYW1lID09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgICBub2RlID0gd3JhcFRlbXBsYXRlRXh0ZW5zaW9uKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbGxhcHNlIGFkamFjZW50IHRleHROb2RlczogZml4ZXMgYW4gSUUgaXNzdWUgdGhhdCBjYW4gY2F1c2VcbiAgICAgICAgLy8gdGV4dCBub2RlcyB0byBiZSBpbmV4cGxpY2FibHkgc3BsaXQgPShcbiAgICAgICAgLy8gbm90ZSB0aGF0IHJvb3Qubm9ybWFsaXplKCkgc2hvdWxkIHdvcmsgYnV0IGRvZXMgbm90IHNvIHdlIGRvIHRoaXNcbiAgICAgICAgLy8gbWFudWFsbHkuXG4gICAgICAgIG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICBsZXQgLyoqIE5vZGUgKi8gbiA9IG5leHQ7XG4gICAgICAgICAgd2hpbGUgKG4gJiYgKG4ubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSkge1xuICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCArPSBuLnRleHRDb250ZW50O1xuICAgICAgICAgICAgbmV4dCA9IG4ubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICByb290LnJlbW92ZUNoaWxkKG4pO1xuICAgICAgICAgICAgbiA9IG5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIG9wdGlvbmFsbHkgc3RyaXAgd2hpdGVzcGFjZVxuICAgICAgICAgIGlmICh0ZW1wbGF0ZUluZm8uc3RyaXBXaGl0ZVNwYWNlICYmICFub2RlLnRleHRDb250ZW50LnRyaW0oKSkge1xuICAgICAgICAgICAgcm9vdC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hpbGRJbmZvID0geyBwYXJlbnRJbmRleCwgcGFyZW50SW5mbzogbm9kZUluZm8gfTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcnNlVGVtcGxhdGVOb2RlKG5vZGUsIHRlbXBsYXRlSW5mbywgY2hpbGRJbmZvKSkge1xuICAgICAgICAgIGNoaWxkSW5mby5pbmZvSW5kZXggPSB0ZW1wbGF0ZUluZm8ubm9kZUluZm9MaXN0LnB1c2goLyoqIEB0eXBlIHshTm9kZUluZm99ICovKGNoaWxkSW5mbykpIC0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbmNyZW1lbnQgaWYgbm90IHJlbW92ZWRcbiAgICAgICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHBhcmVudEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGVtcGxhdGUgY29udGVudCBmb3IgdGhlIGdpdmVuIG5lc3RlZCBgPHRlbXBsYXRlPmAuXG4gICAgICpcbiAgICAgKiBOZXN0ZWQgdGVtcGxhdGUgaW5mbyBpcyBzdG9yZWQgYXMgYHRlbXBsYXRlSW5mb2AgaW4gdGhlIGN1cnJlbnQgbm9kZSdzXG4gICAgICogYG5vZGVJbmZvYC4gYHRlbXBsYXRlLmNvbnRlbnRgIGlzIHJlbW92ZWQgYW5kIHN0b3JlZCBpbiBgdGVtcGxhdGVJbmZvYC5cbiAgICAgKiBJdCB3aWxsIHRoZW4gYmUgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBob3N0IHRvIHNldCBpdCBiYWNrIHRvIHRoZVxuICAgICAqIHRlbXBsYXRlIGFuZCBmb3IgdXNlcnMgc3RhbXBpbmcgbmVzdGVkIHRlbXBsYXRlcyB0byB1c2UgdGhlXG4gICAgICogYF9jb250ZW50Rm9yVGVtcGxhdGVgIG1ldGhvZCB0byByZXRyaWV2ZSB0aGUgY29udGVudCBmb3IgdGhpcyB0ZW1wbGF0ZVxuICAgICAqIChhbiBvcHRpbWl6YXRpb24gdG8gYXZvaWQgdGhlIGNvc3Qgb2YgY2xvbmluZyBuZXN0ZWQgdGVtcGxhdGUgY29udGVudCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IG5vZGUgTm9kZSB0byBwYXJzZSAoYSA8dGVtcGxhdGU+KVxuICAgICAqIEBwYXJhbSB7VGVtcGxhdGVJbmZvfSBvdXRlclRlbXBsYXRlSW5mbyBUZW1wbGF0ZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZVxuICAgICAqICAgdGhhdCBpbmNsdWRlcyB0aGUgdGVtcGxhdGUgYG5vZGVgXG4gICAgICogQHBhcmFtIHshTm9kZUluZm99IG5vZGVJbmZvIE5vZGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGUuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSB2aXNpdGVkIG5vZGUgYWRkZWQgbm9kZS1zcGVjaWZpY1xuICAgICAqICAgbWV0YWRhdGEgdG8gYG5vZGVJbmZvYFxuICAgICAqL1xuICAgIHN0YXRpYyBfcGFyc2VUZW1wbGF0ZU5lc3RlZFRlbXBsYXRlKG5vZGUsIG91dGVyVGVtcGxhdGVJbmZvLCBub2RlSW5mbykge1xuICAgICAgbGV0IHRlbXBsYXRlSW5mbyA9IHRoaXMuX3BhcnNlVGVtcGxhdGUobm9kZSwgb3V0ZXJUZW1wbGF0ZUluZm8pO1xuICAgICAgbGV0IGNvbnRlbnQgPSB0ZW1wbGF0ZUluZm8uY29udGVudCA9XG4gICAgICAgIG5vZGUuY29udGVudC5vd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobm9kZS5jb250ZW50KTtcbiAgICAgIG5vZGVJbmZvLnRlbXBsYXRlSW5mbyA9IHRlbXBsYXRlSW5mbztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0ZW1wbGF0ZSBub2RlIGF0dHJpYnV0ZXMgYW5kIGFkZHMgbm9kZSBtZXRhZGF0YSB0byBgbm9kZUluZm9gXG4gICAgICogZm9yIG5vZGVzIG9mIGludGVyZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlIE5vZGUgdG8gcGFyc2VcbiAgICAgKiBAcGFyYW0ge1RlbXBsYXRlSW5mb30gdGVtcGxhdGVJbmZvIFRlbXBsYXRlIG1ldGFkYXRhIGZvciBjdXJyZW50IHRlbXBsYXRlXG4gICAgICogQHBhcmFtIHtOb2RlSW5mb30gbm9kZUluZm8gTm9kZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZpc2l0ZWQgbm9kZSBhZGRlZCBub2RlLXNwZWNpZmljXG4gICAgICogICBtZXRhZGF0YSB0byBgbm9kZUluZm9gXG4gICAgICovXG4gICAgc3RhdGljIF9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZXMobm9kZSwgdGVtcGxhdGVJbmZvLCBub2RlSW5mbykge1xuICAgICAgLy8gTWFrZSBjb3B5IG9mIG9yaWdpbmFsIGF0dHJpYnV0ZSBsaXN0LCBzaW5jZSB0aGUgb3JkZXIgbWF5IGNoYW5nZVxuICAgICAgLy8gYXMgYXR0cmlidXRlcyBhcmUgYWRkZWQgYW5kIHJlbW92ZWRcbiAgICAgIGxldCBub3RlZCA9IGZhbHNlO1xuICAgICAgbGV0IGF0dHJzID0gQXJyYXkuZnJvbShub2RlLmF0dHJpYnV0ZXMpO1xuICAgICAgZm9yIChsZXQgaT1hdHRycy5sZW5ndGgtMSwgYTsgKGE9YXR0cnNbaV0pOyBpLS0pIHtcbiAgICAgICAgbm90ZWQgPSB0aGlzLl9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZShub2RlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvLCBhLm5hbWUsIGEudmFsdWUpIHx8IG5vdGVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyBhIHNpbmdsZSB0ZW1wbGF0ZSBub2RlIGF0dHJpYnV0ZSBhbmQgYWRkcyBub2RlIG1ldGFkYXRhIHRvXG4gICAgICogYG5vZGVJbmZvYCBmb3IgYXR0cmlidXRlcyBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIFRoaXMgaW1wbGVtZW50YXRpb24gYWRkcyBtZXRhZGF0YSBmb3IgYG9uLWV2ZW50PVwiaGFuZGxlclwiYCBhdHRyaWJ1dGVzXG4gICAgICogYW5kIGBpZGAgYXR0cmlidXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gbm9kZSBOb2RlIHRvIHBhcnNlXG4gICAgICogQHBhcmFtIHshVGVtcGxhdGVJbmZvfSB0ZW1wbGF0ZUluZm8gVGVtcGxhdGUgbWV0YWRhdGEgZm9yIGN1cnJlbnQgdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0geyFOb2RlSW5mb30gbm9kZUluZm8gTm9kZSBtZXRhZGF0YSBmb3IgY3VycmVudCB0ZW1wbGF0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHZpc2l0ZWQgbm9kZSBhZGRlZCBub2RlLXNwZWNpZmljXG4gICAgICogICBtZXRhZGF0YSB0byBgbm9kZUluZm9gXG4gICAgICovXG4gICAgc3RhdGljIF9wYXJzZVRlbXBsYXRlTm9kZUF0dHJpYnV0ZShub2RlLCB0ZW1wbGF0ZUluZm8sIG5vZGVJbmZvLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgLy8gZXZlbnRzIChvbi0qKVxuICAgICAgaWYgKG5hbWUuc2xpY2UoMCwgMykgPT09ICdvbi0nKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICBub2RlSW5mby5ldmVudHMgPSBub2RlSW5mby5ldmVudHMgfHwgW107XG4gICAgICAgIG5vZGVJbmZvLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBuYW1lLnNsaWNlKDMpLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIHN0YXRpYyBpZFxuICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2lkJykge1xuICAgICAgICBub2RlSW5mby5pZCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBgY29udGVudGAgZG9jdW1lbnQgZnJhZ21lbnQgZm9yIGEgZ2l2ZW4gdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBGb3IgbmVzdGVkIHRlbXBsYXRlcywgUG9seW1lciBwZXJmb3JtcyBhbiBvcHRpbWl6YXRpb24gdG8gY2FjaGUgbmVzdGVkXG4gICAgICogdGVtcGxhdGUgY29udGVudCB0byBhdm9pZCB0aGUgY29zdCBvZiBjbG9uaW5nIGRlZXBseSBuZXN0ZWQgdGVtcGxhdGVzLlxuICAgICAqIFRoaXMgbWV0aG9kIHJldHJpZXZlcyB0aGUgY2FjaGVkIGNvbnRlbnQgZm9yIGEgZ2l2ZW4gdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlIFRlbXBsYXRlIHRvIHJldHJpZXZlIGBjb250ZW50YCBmb3JcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fSBDb250ZW50IGZyYWdtZW50XG4gICAgICovXG4gICAgc3RhdGljIF9jb250ZW50Rm9yVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgIGxldCB0ZW1wbGF0ZUluZm8gPSAvKiogQHR5cGUge0hUTUxUZW1wbGF0ZUVsZW1lbnRXaXRoSW5mb30gKi8gKHRlbXBsYXRlKS5fdGVtcGxhdGVJbmZvO1xuICAgICAgcmV0dXJuICh0ZW1wbGF0ZUluZm8gJiYgdGVtcGxhdGVJbmZvLmNvbnRlbnQpIHx8IHRlbXBsYXRlLmNvbnRlbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvbmVzIHRoZSBwcm92aWRlZCB0ZW1wbGF0ZSBjb250ZW50IGFuZCByZXR1cm5zIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgKiBjb250YWluaW5nIHRoZSBjbG9uZWQgZG9tLlxuICAgICAqXG4gICAgICogVGhlIHRlbXBsYXRlIGlzIHBhcnNlZCAob25jZSBhbmQgbWVtb2l6ZWQpIHVzaW5nIHRoaXMgbGlicmFyeSdzXG4gICAgICogdGVtcGxhdGUgcGFyc2luZyBmZWF0dXJlcywgYW5kIHByb3ZpZGVzIHRoZSBmb2xsb3dpbmcgdmFsdWUtYWRkZWRcbiAgICAgKiBmZWF0dXJlczpcbiAgICAgKiAqIEFkZHMgZGVjbGFyYXRpdmUgZXZlbnQgbGlzdGVuZXJzIGZvciBgb24tZXZlbnQ9XCJoYW5kbGVyXCJgIGF0dHJpYnV0ZXNcbiAgICAgKiAqIEdlbmVyYXRlcyBhbiBcImlkIG1hcFwiIGZvciBhbGwgbm9kZXMgd2l0aCBpZCdzIHVuZGVyIGAkYCBvbiByZXR1cm5lZFxuICAgICAqICAgZG9jdW1lbnQgZnJhZ21lbnRcbiAgICAgKiAqIFBhc3NlcyB0ZW1wbGF0ZSBpbmZvIGluY2x1ZGluZyBgY29udGVudGAgYmFjayB0byB0ZW1wbGF0ZXMgYXNcbiAgICAgKiAgIGBfdGVtcGxhdGVJbmZvYCAoYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24gdG8gYXZvaWQgZGVlcCB0ZW1wbGF0ZVxuICAgICAqICAgY2xvbmluZylcbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGUgbWVtb2l6ZWQgdGVtcGxhdGUgcGFyc2luZyBwcm9jZXNzIGlzIGRlc3RydWN0aXZlIHRvIHRoZVxuICAgICAqIHRlbXBsYXRlOiBhdHRyaWJ1dGVzIGZvciBiaW5kaW5ncyBhbmQgZGVjbGFyYXRpdmUgZXZlbnQgbGlzdGVuZXJzIGFyZVxuICAgICAqIHJlbW92ZWQgYWZ0ZXIgYmVpbmcgbm90ZWQgaW4gbm90ZXMsIGFuZCBhbnkgbmVzdGVkIGA8dGVtcGxhdGU+LmNvbnRlbnRgXG4gICAgICogaXMgcmVtb3ZlZCBhbmQgc3RvcmVkIGluIG5vdGVzIGFzIHdlbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFIVE1MVGVtcGxhdGVFbGVtZW50fSB0ZW1wbGF0ZSBUZW1wbGF0ZSB0byBzdGFtcFxuICAgICAqIEByZXR1cm4geyFTdGFtcGVkVGVtcGxhdGV9IENsb25lZCB0ZW1wbGF0ZSBjb250ZW50XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX3N0YW1wVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgIC8vIFBvbHlmaWxsIHN1cHBvcnQ6IGJvb3RzdHJhcCB0aGUgdGVtcGxhdGUgaWYgaXQgaGFzIG5vdCBhbHJlYWR5IGJlZW5cbiAgICAgIGlmICh0ZW1wbGF0ZSAmJiAhdGVtcGxhdGUuY29udGVudCAmJlxuICAgICAgICAgIHdpbmRvdy5IVE1MVGVtcGxhdGVFbGVtZW50ICYmIEhUTUxUZW1wbGF0ZUVsZW1lbnQuZGVjb3JhdGUpIHtcbiAgICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudC5kZWNvcmF0ZSh0ZW1wbGF0ZSk7XG4gICAgICB9XG4gICAgICBsZXQgdGVtcGxhdGVJbmZvID0gdGhpcy5jb25zdHJ1Y3Rvci5fcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgICBsZXQgbm9kZUluZm8gPSB0ZW1wbGF0ZUluZm8ubm9kZUluZm9MaXN0O1xuICAgICAgbGV0IGNvbnRlbnQgPSB0ZW1wbGF0ZUluZm8uY29udGVudCB8fCB0ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgbGV0IGRvbSA9IC8qKiBAdHlwZSB7RG9jdW1lbnRGcmFnbWVudH0gKi8gKGRvY3VtZW50LmltcG9ydE5vZGUoY29udGVudCwgdHJ1ZSkpO1xuICAgICAgLy8gTk9URTogU2hhZHlEb20gb3B0aW1pemF0aW9uIGluZGljYXRpbmcgdGhlcmUgaXMgYW4gaW5zZXJ0aW9uIHBvaW50XG4gICAgICBkb20uX19ub0luc2VydGlvblBvaW50ID0gIXRlbXBsYXRlSW5mby5oYXNJbnNlcnRpb25Qb2ludDtcbiAgICAgIGxldCBub2RlcyA9IGRvbS5ub2RlTGlzdCA9IG5ldyBBcnJheShub2RlSW5mby5sZW5ndGgpO1xuICAgICAgZG9tLiQgPSB7fTtcbiAgICAgIGZvciAobGV0IGk9MCwgbD1ub2RlSW5mby5sZW5ndGgsIGluZm87IChpPGwpICYmIChpbmZvPW5vZGVJbmZvW2ldKTsgaSsrKSB7XG4gICAgICAgIGxldCBub2RlID0gbm9kZXNbaV0gPSBmaW5kVGVtcGxhdGVOb2RlKGRvbSwgaW5mbyk7XG4gICAgICAgIGFwcGx5SWRUb01hcCh0aGlzLCBkb20uJCwgbm9kZSwgaW5mbyk7XG4gICAgICAgIGFwcGx5VGVtcGxhdGVDb250ZW50KHRoaXMsIG5vZGUsIGluZm8pO1xuICAgICAgICBhcHBseUV2ZW50TGlzdGVuZXIodGhpcywgbm9kZSwgaW5mbyk7XG4gICAgICB9XG4gICAgICBkb20gPSAvKiogQHR5cGUgeyFTdGFtcGVkVGVtcGxhdGV9ICovKGRvbSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1hc3NpZ25cbiAgICAgIHJldHVybiBkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBieSBtZXRob2QgbmFtZSBmb3IgdGhlIGV2ZW50IHByb3ZpZGVkLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgZ2VuZXJhdGVzIGEgaGFuZGxlciBmdW5jdGlvbiB0aGF0IGxvb2tzIHVwIHRoZSBtZXRob2RcbiAgICAgKiBuYW1lIGF0IGhhbmRsaW5nIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFFdmVudFRhcmdldH0gbm9kZSBOb2RlIHRvIGFkZCBsaXN0ZW5lciBvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIE5hbWUgb2YgbWV0aG9kXG4gICAgICogQHBhcmFtIHsqPX0gY29udGV4dCBDb250ZXh0IHRoZSBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgb24gKGRlZmF1bHRzXG4gICAgICogICB0byBgbm9kZWApXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEdlbmVyYXRlZCBoYW5kbGVyIGZ1bmN0aW9uXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX2FkZE1ldGhvZEV2ZW50TGlzdGVuZXJUb05vZGUobm9kZSwgZXZlbnROYW1lLCBtZXRob2ROYW1lLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBub2RlO1xuICAgICAgbGV0IGhhbmRsZXIgPSBjcmVhdGVOb2RlRXZlbnRIYW5kbGVyKGNvbnRleHQsIGV2ZW50TmFtZSwgbWV0aG9kTmFtZSk7XG4gICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVyVG9Ob2RlKG5vZGUsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICByZXR1cm4gaGFuZGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBwb2ludCBmb3IgYWRkaW5nIGN1c3RvbSBvciBzaW11bGF0ZWQgZXZlbnQgaGFuZGxpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFFdmVudFRhcmdldH0gbm9kZSBOb2RlIHRvIGFkZCBldmVudCBsaXN0ZW5lciB0b1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgTmFtZSBvZiBldmVudFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oIUV2ZW50KTp2b2lkfSBoYW5kbGVyIExpc3RlbmVyIGZ1bmN0aW9uIHRvIGFkZFxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJUb05vZGUobm9kZSwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBwb2ludCBmb3IgYWRkaW5nIGN1c3RvbSBvciBzaW11bGF0ZWQgZXZlbnQgaGFuZGxpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyFFdmVudFRhcmdldH0gbm9kZSBOb2RlIHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lciBmcm9tXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBOYW1lIG9mIGV2ZW50XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbighRXZlbnQpOnZvaWR9IGhhbmRsZXIgTGlzdGVuZXIgZnVuY3Rpb24gdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKiBAb3ZlcnJpZGVcbiAgICAgKi9cbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lckZyb21Ob2RlKG5vZGUsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gVGVtcGxhdGVTdGFtcDtcblxufSk7XG4iLCIvKipcbkBsaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhIG51bWJlciBvZiBzdHJhdGVnaWVzIGZvciBlbnF1ZXVpbmcgYXN5bmNocm9ub3VzXG4gKiB0YXNrcy4gRWFjaCBzdWItbW9kdWxlIHByb3ZpZGVzIGEgc3RhbmRhcmQgYHJ1bihmbilgIGludGVyZmFjZSB0aGF0IHJldHVybnMgYVxuICogaGFuZGxlLCBhbmQgYSBgY2FuY2VsKGhhbmRsZSlgIGludGVyZmFjZSBmb3IgY2FuY2VsaW5nIGFzeW5jIHRhc2tzIGJlZm9yZVxuICogdGhleSBydW4uXG4gKlxuICogQHN1bW1hcnkgTW9kdWxlIHRoYXQgcHJvdmlkZXMgYSBudW1iZXIgb2Ygc3RyYXRlZ2llcyBmb3IgZW5xdWV1aW5nXG4gKiBhc3luY2hyb25vdXMgdGFza3MuXG4gKi9cblxuaW1wb3J0ICcuL2Jvb3QuanMnO1xuXG4vLyBNaWNyb3Rhc2sgaW1wbGVtZW50ZWQgdXNpbmcgTXV0YXRpb24gT2JzZXJ2ZXJcbmxldCBtaWNyb3Rhc2tDdXJySGFuZGxlID0gMDtcbmxldCBtaWNyb3Rhc2tMYXN0SGFuZGxlID0gMDtcbmxldCBtaWNyb3Rhc2tDYWxsYmFja3MgPSBbXTtcbmxldCBtaWNyb3Rhc2tOb2RlQ29udGVudCA9IDA7XG5sZXQgbWljcm90YXNrTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbm5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcihtaWNyb3Rhc2tGbHVzaCkub2JzZXJ2ZShtaWNyb3Rhc2tOb2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuXG5mdW5jdGlvbiBtaWNyb3Rhc2tGbHVzaCgpIHtcbiAgY29uc3QgbGVuID0gbWljcm90YXNrQ2FsbGJhY2tzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCBjYiA9IG1pY3JvdGFza0NhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBlOyB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbWljcm90YXNrQ2FsbGJhY2tzLnNwbGljZSgwLCBsZW4pO1xuICBtaWNyb3Rhc2tMYXN0SGFuZGxlICs9IGxlbjtcbn1cblxuLyoqXG4gKiBBc3luYyBpbnRlcmZhY2Ugd3JhcHBlciBhcm91bmQgYHNldFRpbWVvdXRgLlxuICpcbiAqIEBuYW1lc3BhY2VcbiAqIEBzdW1tYXJ5IEFzeW5jIGludGVyZmFjZSB3cmFwcGVyIGFyb3VuZCBgc2V0VGltZW91dGAuXG4gKi9cbmNvbnN0IHRpbWVPdXQgPSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3ViLW1vZHVsZSB3aXRoIHRoZSBhc3luYyBpbnRlcmZhY2UgcHJvdmlkaW5nIHRoZSBwcm92aWRlZFxuICAgKiBkZWxheS5cbiAgICpcbiAgICogQG1lbWJlcm9mIHRpbWVPdXRcbiAgICogQHBhcmFtIHtudW1iZXI9fSBkZWxheSBUaW1lIHRvIHdhaXQgYmVmb3JlIGNhbGxpbmcgY2FsbGJhY2tzIGluIG1zXG4gICAqIEByZXR1cm4geyFBc3luY0ludGVyZmFjZX0gQW4gYXN5bmMgdGltZW91dCBpbnRlcmZhY2VcbiAgICovXG4gIGFmdGVyKGRlbGF5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJ1bihmbikgeyByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoZm4sIGRlbGF5KTsgfSxcbiAgICAgIGNhbmNlbChoYW5kbGUpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChoYW5kbGUpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIGZ1bmN0aW9uIGNhbGxlZCBpbiB0aGUgbmV4dCB0YXNrLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgdGltZU91dFxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgdG8gcnVuXG4gICAqIEBwYXJhbSB7bnVtYmVyPX0gZGVsYXkgRGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEByZXR1cm4ge251bWJlcn0gSGFuZGxlIHVzZWQgZm9yIGNhbmNlbGluZyB0YXNrXG4gICAqL1xuICBydW4oZm4sIGRlbGF5KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCBkZWxheSk7XG4gIH0sXG4gIC8qKlxuICAgKiBDYW5jZWxzIGEgcHJldmlvdXNseSBlbnF1ZXVlZCBgdGltZU91dGAgY2FsbGJhY2suXG4gICAqXG4gICAqIEBtZW1iZXJvZiB0aW1lT3V0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoYW5kbGUgSGFuZGxlIHJldHVybmVkIGZyb20gYHJ1bmAgb2YgY2FsbGJhY2sgdG8gY2FuY2VsXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBjYW5jZWwoaGFuZGxlKSB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dChoYW5kbGUpO1xuICB9XG59O1xuZXhwb3J0IHt0aW1lT3V0fTtcblxuLyoqXG4gKiBBc3luYyBpbnRlcmZhY2Ugd3JhcHBlciBhcm91bmQgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAuXG4gKlxuICogQG5hbWVzcGFjZVxuICogQHN1bW1hcnkgQXN5bmMgaW50ZXJmYWNlIHdyYXBwZXIgYXJvdW5kIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLlxuICovXG5jb25zdCBhbmltYXRpb25GcmFtZSA9IHtcbiAgLyoqXG4gICAqIEVucXVldWVzIGEgZnVuY3Rpb24gY2FsbGVkIGF0IGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIHRpbWluZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIGFuaW1hdGlvbkZyYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24obnVtYmVyKTp2b2lkfSBmbiBDYWxsYmFjayB0byBydW5cbiAgICogQHJldHVybiB7bnVtYmVyfSBIYW5kbGUgdXNlZCBmb3IgY2FuY2VsaW5nIHRhc2tcbiAgICovXG4gIHJ1bihmbikge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZuKTtcbiAgfSxcbiAgLyoqXG4gICAqIENhbmNlbHMgYSBwcmV2aW91c2x5IGVucXVldWVkIGBhbmltYXRpb25GcmFtZWAgY2FsbGJhY2suXG4gICAqXG4gICAqIEBtZW1iZXJvZiBhbmltYXRpb25GcmFtZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaGFuZGxlIEhhbmRsZSByZXR1cm5lZCBmcm9tIGBydW5gIG9mIGNhbGxiYWNrIHRvIGNhbmNlbFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgY2FuY2VsKGhhbmRsZSkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUpO1xuICB9XG59O1xuZXhwb3J0IHthbmltYXRpb25GcmFtZX07XG5cbi8qKlxuICogQXN5bmMgaW50ZXJmYWNlIHdyYXBwZXIgYXJvdW5kIGByZXF1ZXN0SWRsZUNhbGxiYWNrYC4gIEZhbGxzIGJhY2sgdG9cbiAqIGBzZXRUaW1lb3V0YCBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IGByZXF1ZXN0SWRsZUNhbGxiYWNrYC5cbiAqXG4gKiBAbmFtZXNwYWNlXG4gKiBAc3VtbWFyeSBBc3luYyBpbnRlcmZhY2Ugd3JhcHBlciBhcm91bmQgYHJlcXVlc3RJZGxlQ2FsbGJhY2tgLlxuICovXG5jb25zdCBpZGxlUGVyaW9kID0ge1xuICAvKipcbiAgICogRW5xdWV1ZXMgYSBmdW5jdGlvbiBjYWxsZWQgYXQgYHJlcXVlc3RJZGxlQ2FsbGJhY2tgIHRpbWluZy5cbiAgICpcbiAgICogQG1lbWJlcm9mIGlkbGVQZXJpb2RcbiAgICogQHBhcmFtIHtmdW5jdGlvbighSWRsZURlYWRsaW5lKTp2b2lkfSBmbiBDYWxsYmFjayB0byBydW5cbiAgICogQHJldHVybiB7bnVtYmVyfSBIYW5kbGUgdXNlZCBmb3IgY2FuY2VsaW5nIHRhc2tcbiAgICovXG4gIHJ1bihmbikge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayA/XG4gICAgICB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayhmbikgOlxuICAgICAgd2luZG93LnNldFRpbWVvdXQoZm4sIDE2KTtcbiAgfSxcbiAgLyoqXG4gICAqIENhbmNlbHMgYSBwcmV2aW91c2x5IGVucXVldWVkIGBpZGxlUGVyaW9kYCBjYWxsYmFjay5cbiAgICpcbiAgICogQG1lbWJlcm9mIGlkbGVQZXJpb2RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhhbmRsZSBIYW5kbGUgcmV0dXJuZWQgZnJvbSBgcnVuYCBvZiBjYWxsYmFjayB0byBjYW5jZWxcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNhbmNlbChoYW5kbGUpIHtcbiAgICB3aW5kb3cuY2FuY2VsSWRsZUNhbGxiYWNrID9cbiAgICAgIHdpbmRvdy5jYW5jZWxJZGxlQ2FsbGJhY2soaGFuZGxlKSA6XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gIH1cbn07XG5leHBvcnQge2lkbGVQZXJpb2R9O1xuXG4vKipcbiAqIEFzeW5jIGludGVyZmFjZSBmb3IgZW5xdWV1aW5nIGNhbGxiYWNrcyB0aGF0IHJ1biBhdCBtaWNyb3Rhc2sgdGltaW5nLlxuICpcbiAqIE5vdGUgdGhhdCBtaWNyb3Rhc2sgdGltaW5nIGlzIGFjaGlldmVkIHZpYSBhIHNpbmdsZSBgTXV0YXRpb25PYnNlcnZlcmAsXG4gKiBhbmQgdGh1cyBjYWxsYmFja3MgZW5xdWV1ZWQgd2l0aCB0aGlzIEFQSSB3aWxsIGFsbCBydW4gaW4gYSBzaW5nbGVcbiAqIGJhdGNoLCBhbmQgbm90IGludGVybGVhdmVkIHdpdGggb3RoZXIgbWljcm90YXNrcyBzdWNoIGFzIHByb21pc2VzLlxuICogUHJvbWlzZXMgYXJlIGF2b2lkZWQgYXMgYW4gaW1wbGVtZW50YXRpb24gY2hvaWNlIGZvciB0aGUgdGltZSBiZWluZ1xuICogZHVlIHRvIFNhZmFyaSBidWdzIHRoYXQgY2F1c2UgUHJvbWlzZXMgdG8gbGFjayBtaWNyb3Rhc2sgZ3VhcmFudGVlcy5cbiAqXG4gKiBAbmFtZXNwYWNlXG4gKiBAc3VtbWFyeSBBc3luYyBpbnRlcmZhY2UgZm9yIGVucXVldWluZyBjYWxsYmFja3MgdGhhdCBydW4gYXQgbWljcm90YXNrXG4gKiAgIHRpbWluZy5cbiAqL1xuY29uc3QgbWljcm9UYXNrID0ge1xuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIGZ1bmN0aW9uIGNhbGxlZCBhdCBtaWNyb3Rhc2sgdGltaW5nLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbWljcm9UYXNrXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9uPX0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gcnVuXG4gICAqIEByZXR1cm4ge251bWJlcn0gSGFuZGxlIHVzZWQgZm9yIGNhbmNlbGluZyB0YXNrXG4gICAqL1xuICBydW4oY2FsbGJhY2spIHtcbiAgICBtaWNyb3Rhc2tOb2RlLnRleHRDb250ZW50ID0gbWljcm90YXNrTm9kZUNvbnRlbnQrKztcbiAgICBtaWNyb3Rhc2tDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIG1pY3JvdGFza0N1cnJIYW5kbGUrKztcbiAgfSxcblxuICAvKipcbiAgICogQ2FuY2VscyBhIHByZXZpb3VzbHkgZW5xdWV1ZWQgYG1pY3JvVGFza2AgY2FsbGJhY2suXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtaWNyb1Rhc2tcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhhbmRsZSBIYW5kbGUgcmV0dXJuZWQgZnJvbSBgcnVuYCBvZiBjYWxsYmFjayB0byBjYW5jZWxcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGNhbmNlbChoYW5kbGUpIHtcbiAgICBjb25zdCBpZHggPSBoYW5kbGUgLSBtaWNyb3Rhc2tMYXN0SGFuZGxlO1xuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgaWYgKCFtaWNyb3Rhc2tDYWxsYmFja3NbaWR4XSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXN5bmMgaGFuZGxlOiAnICsgaGFuZGxlKTtcbiAgICAgIH1cbiAgICAgIG1pY3JvdGFza0NhbGxiYWNrc1tpZHhdID0gbnVsbDtcbiAgICB9XG4gIH1cblxufTtcbmV4cG9ydCB7bWljcm9UYXNrfTtcbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKipcbiAqIFdoZW4gdXNpbmcgQ2xvc3VyZSBDb21waWxlciwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShwcm9wZXJ0eSwgb2JqZWN0KSBpcyByZXBsYWNlZCBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV1cbiAqIFdlIGNhbm5vdCBhbGlhcyB0aGlzIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIHVzZSBhIHNtYWxsIHNoaW0gdGhhdCBoYXMgdGhlIHNhbWUgYmVoYXZpb3Igd2hlbiBub3QgY29tcGlsaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIFByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7P09iamVjdH0gb2JqIFJlZmVyZW5jZSBvYmplY3RcbiAqIEByZXR1cm4ge3N0cmluZ30gUG90ZW50aWFsbHkgcmVuYW1lZCBwcm9wZXJ0eSBuYW1lXG4gKi9cbndpbmRvdy5KU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID0gZnVuY3Rpb24ocHJvcCwgb2JqKSB7XG4gIHJldHVybiBwcm9wO1xufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxuZXhwb3J0IHt9O1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi9ib290LmpzJztcblxuY29uc3QgY2FzZU1hcCA9IHt9O1xuY29uc3QgREFTSF9UT19DQU1FTCA9IC8tW2Etel0vZztcbmNvbnN0IENBTUVMX1RPX0RBU0ggPSAvKFtBLVpdKS9nO1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgTW9kdWxlIHdpdGggdXRpbGl0aWVzIGZvciBjb252ZXJ0aW5nIGJldHdlZW4gXCJkYXNoLWNhc2VcIiBhbmRcbiAqIFwiY2FtZWxDYXNlXCIgaWRlbnRpZmllcnMuXG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyBcImRhc2gtY2FzZVwiIGlkZW50aWZpZXIgKGUuZy4gYGZvby1iYXItYmF6YCkgdG8gXCJjYW1lbENhc2VcIlxuICogKGUuZy4gYGZvb0JhckJhemApLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXNoIERhc2gtY2FzZSBpZGVudGlmaWVyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IENhbWVsLWNhc2UgcmVwcmVzZW50YXRpb24gb2YgdGhlIGlkZW50aWZpZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRhc2hUb0NhbWVsQ2FzZShkYXNoKSB7XG4gIHJldHVybiBjYXNlTWFwW2Rhc2hdIHx8IChcbiAgICBjYXNlTWFwW2Rhc2hdID0gZGFzaC5pbmRleE9mKCctJykgPCAwID8gZGFzaCA6IGRhc2gucmVwbGFjZShEQVNIX1RPX0NBTUVMLFxuICAgICAgKG0pID0+IG1bMV0udG9VcHBlckNhc2UoKVxuICAgIClcbiAgKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBcImNhbWVsQ2FzZVwiIGlkZW50aWZpZXIgKGUuZy4gYGZvb0JhckJhemApIHRvIFwiZGFzaC1jYXNlXCJcbiAqIChlLmcuIGBmb28tYmFyLWJhemApLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYW1lbCBDYW1lbC1jYXNlIGlkZW50aWZpZXJcbiAqIEByZXR1cm4ge3N0cmluZ30gRGFzaC1jYXNlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbFRvRGFzaENhc2UoY2FtZWwpIHtcbiAgcmV0dXJuIGNhc2VNYXBbY2FtZWxdIHx8IChcbiAgICBjYXNlTWFwW2NhbWVsXSA9IGNhbWVsLnJlcGxhY2UoQ0FNRUxfVE9fREFTSCwgJy0kMScpLnRvTG93ZXJDYXNlKClcbiAgKTtcbn1cbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5pbXBvcnQgJy4vYm9vdC5qcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgc3RhdGljIHN0cmluZyB2YWx1ZSB3aGljaCBjYW4gYmUgdXNlZCB0byBmaWx0ZXJcbiAqIHN0cmluZ3MgYnkgYXNzZXRpbmcgdGhhdCB0aGV5IGhhdmUgYmVlbiBjcmVhdGVkIHZpYSB0aGlzIGNsYXNzLiBUaGVcbiAqIGB2YWx1ZWAgcHJvcGVydHkgcmV0dXJucyB0aGUgc3RyaW5nIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmNsYXNzIExpdGVyYWxTdHJpbmcge1xuICBjb25zdHJ1Y3RvcihzdHJpbmcpIHtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLnZhbHVlID0gc3RyaW5nLnRvU3RyaW5nKCk7XG4gIH1cbiAgLyoqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gTGl0ZXJhbFN0cmluZyBzdHJpbmcgdmFsdWVcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgT2JqZWN0IHRvIHN0cmluZ2lmeSBpbnRvIEhUTUxcbiAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCBzdHJpbmdpZmllZCBmb3JtIG9mIGBvYmpgXG4gKi9cbmZ1bmN0aW9uIGxpdGVyYWxWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBMaXRlcmFsU3RyaW5nKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IUxpdGVyYWxTdHJpbmd9ICovKHZhbHVlKS52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBub24tbGl0ZXJhbCB2YWx1ZSBwYXNzZWQgdG8gUG9seW1lcidzIGh0bWxMaXRlcmFsIGZ1bmN0aW9uOiAke3ZhbHVlfWBcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBPYmplY3QgdG8gc3RyaW5naWZ5IGludG8gSFRNTFxuICogQHJldHVybiB7c3RyaW5nfSBIVE1MIHN0cmluZ2lmaWVkIGZvcm0gb2YgYG9iamBcbiAqL1xuZnVuY3Rpb24gaHRtbFZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshSFRNTFRlbXBsYXRlRWxlbWVudCB9ICovKHZhbHVlKS5pbm5lckhUTUw7XG4gIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBMaXRlcmFsU3RyaW5nKSB7XG4gICAgcmV0dXJuIGxpdGVyYWxWYWx1ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbm9uLXRlbXBsYXRlIHZhbHVlIHBhc3NlZCB0byBQb2x5bWVyJ3MgaHRtbCBmdW5jdGlvbjogJHt2YWx1ZX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgdGhhdCBjcmVhdGVzIGFuIEhUTUwgPHRlbXBsYXRlPiBlbGVtZW50IGZyb20gdGhlXG4gKiBjb250ZW50cyBvZiB0aGUgc3RyaW5nLlxuICpcbiAqIFRoaXMgYWxsb3dzIHlvdSB0byB3cml0ZSBhIFBvbHltZXIgVGVtcGxhdGUgaW4gSmF2YVNjcmlwdC5cbiAqXG4gKiBUZW1wbGF0ZXMgY2FuIGJlIGNvbXBvc2VkIGJ5IGludGVycG9sYXRpbmcgYEhUTUxUZW1wbGF0ZUVsZW1lbnRgcyBpblxuICogZXhwcmVzc2lvbnMgaW4gdGhlIEphdmFTY3JpcHQgdGVtcGxhdGUgbGl0ZXJhbC4gVGhlIG5lc3RlZCB0ZW1wbGF0ZSdzXG4gKiBgaW5uZXJIVE1MYCBpcyBpbmNsdWRlZCBpbiB0aGUgY29udGFpbmluZyB0ZW1wbGF0ZS4gIFRoZSBvbmx5IG90aGVyXG4gKiB2YWx1ZXMgYWxsb3dlZCBpbiBleHByZXNzaW9ucyBhcmUgdGhvc2UgcmV0dXJuZWQgZnJvbSBgaHRtbExpdGVyYWxgXG4gKiB3aGljaCBlbnN1cmVzIG9ubHkgbGl0ZXJhbCB2YWx1ZXMgZnJvbSBKUyBzb3VyY2UgZXZlciByZWFjaCB0aGUgSFRNTCwgdG9cbiAqIGd1YXJkIGFnYWluc3QgWFNTIHJpc2tzLlxuICpcbiAqIEFsbCBvdGhlciB2YWx1ZXMgYXJlIGRpc2FsbG93ZWQgaW4gZXhwcmVzc2lvbnMgdG8gaGVscCBwcmV2ZW50IFhTU1xuICogYXR0YWNrczsgaG93ZXZlciwgYGh0bWxMaXRlcmFsYCBjYW4gYmUgdXNlZCB0byBjb21wb3NlIHN0YXRpY1xuICogc3RyaW5nIHZhbHVlcyBpbnRvIHRlbXBsYXRlcy4gVGhpcyBpcyB1c2VmdWwgdG8gY29tcG9zZSBzdHJpbmdzIGludG9cbiAqIHBsYWNlcyB0aGF0IGRvIG5vdCBhY2NlcHQgaHRtbCwgbGlrZSB0aGUgY3NzIHRleHQgb2YgYSBgc3R5bGVgXG4gKiBlbGVtZW50LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIHN0YXRpYyBnZXQgdGVtcGxhdGUoKSB7XG4gKiAgICAgICByZXR1cm4gaHRtbGBcbiAqICAgICAgICAgPHN0eWxlPjpob3N0eyBjb250ZW50OlwiLi4uXCIgfTwvc3R5bGU+XG4gKiAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGFkb3dlZFwiPiR7dGhpcy5wYXJ0aWFsVGVtcGxhdGV9PC9kaXY+XG4gKiAgICAgICAgICR7c3VwZXIudGVtcGxhdGV9XG4gKiAgICAgICBgO1xuICogICAgIH1cbiAqICAgICBzdGF0aWMgZ2V0IHBhcnRpYWxUZW1wbGF0ZSgpIHsgcmV0dXJuIGh0bWxgPHNwYW4+UGFydGlhbCE8L3NwYW4+YDsgfVxuICpcbiAqIEBwYXJhbSB7IUlUZW1wbGF0ZUFycmF5fSBzdHJpbmdzIENvbnN0YW50IHBhcnRzIG9mIHRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFsXG4gKiBAcGFyYW0gey4uLip9IHZhbHVlcyBWYXJpYWJsZSBwYXJ0cyBvZiB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbFxuICogQHJldHVybiB7IUhUTUxUZW1wbGF0ZUVsZW1lbnR9IENvbnN0cnVjdGVkIEhUTUxUZW1wbGF0ZUVsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IGh0bWwgPSBmdW5jdGlvbiBodG1sKHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICBjb25zdCB0ZW1wbGF0ZSA9IC8qKiBAdHlwZSB7IUhUTUxUZW1wbGF0ZUVsZW1lbnR9ICovKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykpO1xuICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB2YWx1ZXMucmVkdWNlKChhY2MsIHYsIGlkeCkgPT5cbiAgICAgIGFjYyArIGh0bWxWYWx1ZSh2KSArIHN0cmluZ3NbaWR4ICsgMV0sIHN0cmluZ3NbMF0pO1xuICByZXR1cm4gdGVtcGxhdGU7XG59O1xuXG4vKipcbiAqIEFuIGh0bWwgbGl0ZXJhbCB0YWcgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGBodG1sYCB0byBjb21wb3NlLlxuICogYSBsaXRlcmFsIHN0cmluZy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICBzdGF0aWMgZ2V0IHRlbXBsYXRlKCkge1xuICogICAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICAgIDxzdHlsZT5cbiAqICAgICAgICAgICA6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gKiAgICAgICAgICAgJHt0aGlzLnN0eWxlVGVtcGxhdGUoKX1cbiAqICAgICAgICAgPC9zdHlsZT5cbiAqICAgICAgICAgPGRpdiBjbGFzcz1cInNoYWRvd2VkXCI+JHtzdGF0aWNWYWx1ZX08L2Rpdj5cbiAqICAgICAgICAgJHtzdXBlci50ZW1wbGF0ZX1cbiAqICAgICAgIGA7XG4gKiAgICAgfVxuICogICAgIHN0YXRpYyBnZXQgc3R5bGVUZW1wbGF0ZSgpIHtcbiAqICAgICAgICByZXR1cm4gaHRtbExpdGVyYWxgLnNoYWRvd2VkIHsgYmFja2dyb3VuZDogZ3JheTsgfWA7XG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7IUlUZW1wbGF0ZUFycmF5fSBzdHJpbmdzIENvbnN0YW50IHBhcnRzIG9mIHRhZ2dlZCB0ZW1wbGF0ZSBsaXRlcmFsXG4gKiBAcGFyYW0gey4uLip9IHZhbHVlcyBWYXJpYWJsZSBwYXJ0cyBvZiB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbFxuICogQHJldHVybiB7IUxpdGVyYWxTdHJpbmd9IENvbnN0cnVjdGVkIGxpdGVyYWwgc3RyaW5nXG4gKi9cbmV4cG9ydCBjb25zdCBodG1sTGl0ZXJhbCA9IGZ1bmN0aW9uKHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICByZXR1cm4gbmV3IExpdGVyYWxTdHJpbmcodmFsdWVzLnJlZHVjZSgoYWNjLCB2LCBpZHgpID0+XG4gICAgICBhY2MgKyBsaXRlcmFsVmFsdWUodikgKyBzdHJpbmdzW2lkeCArIDFdLCBzdHJpbmdzWzBdKSk7XG59O1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi9ib290LmpzJztcblxuLy8gdW5pcXVlIGdsb2JhbCBpZCBmb3IgZGVkdXBpbmcgbWl4aW5zLlxubGV0IGRlZHVwZUlkID0gMDtcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBleHRlbmRzIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIE1peGluRnVuY3Rpb24oKXt9XG4vKiogQHR5cGUgeyhXZWFrTWFwIHwgdW5kZWZpbmVkKX0gKi9cbk1peGluRnVuY3Rpb24ucHJvdG90eXBlLl9fbWl4aW5BcHBsaWNhdGlvbnM7XG4vKiogQHR5cGUgeyhPYmplY3QgfCB1bmRlZmluZWQpfSAqL1xuTWl4aW5GdW5jdGlvbi5wcm90b3R5cGUuX19taXhpblNldDtcblxuLyogZXNsaW50LWRpc2FibGUgdmFsaWQtanNkb2MgKi9cbi8qKlxuICogV3JhcHMgYW4gRVM2IGNsYXNzIGV4cHJlc3Npb24gbWl4aW4gc3VjaCB0aGF0IHRoZSBtaXhpbiBpcyBvbmx5IGFwcGxpZWRcbiAqIGlmIGl0IGhhcyBub3QgYWxyZWFkeSBiZWVuIGFwcGxpZWQgaXRzIGJhc2UgYXJndW1lbnQuIEFsc28gbWVtb2l6ZXMgbWl4aW5cbiAqIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtUfSBtaXhpbiBFUzYgY2xhc3MgZXhwcmVzc2lvbiBtaXhpbiB0byB3cmFwXG4gKiBAcmV0dXJuIHtUfVxuICogQHN1cHByZXNzIHtpbnZhbGlkQ2FzdHN9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWR1cGluZ01peGluID0gZnVuY3Rpb24obWl4aW4pIHtcbiAgbGV0IG1peGluQXBwbGljYXRpb25zID0gLyoqIEB0eXBlIHshTWl4aW5GdW5jdGlvbn0gKi8obWl4aW4pLl9fbWl4aW5BcHBsaWNhdGlvbnM7XG4gIGlmICghbWl4aW5BcHBsaWNhdGlvbnMpIHtcbiAgICBtaXhpbkFwcGxpY2F0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgLyoqIEB0eXBlIHshTWl4aW5GdW5jdGlvbn0gKi8obWl4aW4pLl9fbWl4aW5BcHBsaWNhdGlvbnMgPSBtaXhpbkFwcGxpY2F0aW9ucztcbiAgfVxuICAvLyBtYWludGFpbiBhIHVuaXF1ZSBpZCBmb3IgZWFjaCBtaXhpblxuICBsZXQgbWl4aW5EZWR1cGVJZCA9IGRlZHVwZUlkKys7XG4gIGZ1bmN0aW9uIGRlZHVwaW5nTWl4aW4oYmFzZSkge1xuICAgIGxldCBiYXNlU2V0ID0gLyoqIEB0eXBlIHshTWl4aW5GdW5jdGlvbn0gKi8oYmFzZSkuX19taXhpblNldDtcbiAgICBpZiAoYmFzZVNldCAmJiBiYXNlU2V0W21peGluRGVkdXBlSWRdKSB7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG4gICAgbGV0IG1hcCA9IG1peGluQXBwbGljYXRpb25zO1xuICAgIGxldCBleHRlbmRlZCA9IG1hcC5nZXQoYmFzZSk7XG4gICAgaWYgKCFleHRlbmRlZCkge1xuICAgICAgZXh0ZW5kZWQgPSAvKiogQHR5cGUgeyFGdW5jdGlvbn0gKi8obWl4aW4pKGJhc2UpO1xuICAgICAgbWFwLnNldChiYXNlLCBleHRlbmRlZCk7XG4gICAgfVxuICAgIC8vIGNvcHkgaW5oZXJpdGVkIG1peGluIHNldCBmcm9tIHRoZSBleHRlbmRlZCBjbGFzcywgb3IgdGhlIGJhc2UgY2xhc3NcbiAgICAvLyBOT1RFOiB3ZSBhdm9pZCB1c2Ugb2YgU2V0IGhlcmUgYmVjYXVzZSBzb21lIGJyb3dzZXIgKElFMTEpXG4gICAgLy8gY2Fubm90IGV4dGVuZCBhIGJhc2UgU2V0IHZpYSB0aGUgY29uc3RydWN0b3IuXG4gICAgbGV0IG1peGluU2V0ID0gT2JqZWN0LmNyZWF0ZSgvKiogQHR5cGUgeyFNaXhpbkZ1bmN0aW9ufSAqLyhleHRlbmRlZCkuX19taXhpblNldCB8fCBiYXNlU2V0IHx8IG51bGwpO1xuICAgIG1peGluU2V0W21peGluRGVkdXBlSWRdID0gdHJ1ZTtcbiAgICAvKiogQHR5cGUgeyFNaXhpbkZ1bmN0aW9ufSAqLyhleHRlbmRlZCkuX19taXhpblNldCA9IG1peGluU2V0O1xuICAgIHJldHVybiBleHRlbmRlZDtcbiAgfVxuXG4gIHJldHVybiBkZWR1cGluZ01peGluO1xufTtcbi8qIGVzbGludC1lbmFibGUgdmFsaWQtanNkb2MgKi9cbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5pbXBvcnQgJy4vYm9vdC5qcyc7XG5cbi8qKlxuICogTW9kdWxlIHdpdGggdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RydWN0dXJlZCBkYXRhIHBhdGggc3RyaW5ncy5cbiAqXG4gKiBAc3VtbWFyeSBNb2R1bGUgd2l0aCB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJ1Y3R1cmVkIGRhdGEgcGF0aCBzdHJpbmdzLlxuICovXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSBzdHJ1Y3R1cmVkIGRhdGEgcGF0aCAoaGFzIGRvdHMpLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpc1BhdGgoJ2Zvby5iYXIuYmF6JykgLy8gdHJ1ZVxuICogaXNQYXRoKCdmb28nKSAgICAgICAgIC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBQYXRoIHN0cmluZ1xuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3RyaW5nIGNvbnRhaW5lZCBvbmUgb3IgbW9yZSBkb3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGgocGF0aCkge1xuICByZXR1cm4gcGF0aC5pbmRleE9mKCcuJykgPj0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByb290IHByb3BlcnR5IG5hbWUgZm9yIHRoZSBnaXZlbiBwYXRoLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiByb290KCdmb28uYmFyLmJheicpIC8vICdmb28nXG4gKiByb290KCdmb28nKSAgICAgICAgIC8vICdmb28nXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBQYXRoIHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfSBSb290IHByb3BlcnR5IG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvb3QocGF0aCkge1xuICBsZXQgZG90SW5kZXggPSBwYXRoLmluZGV4T2YoJy4nKTtcbiAgaWYgKGRvdEluZGV4ID09PSAtMSkge1xuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKDAsIGRvdEluZGV4KTtcbn1cblxuLyoqXG4gKiBHaXZlbiBgYmFzZWAgaXMgYGZvby5iYXJgLCBgZm9vYCBpcyBhbiBhbmNlc3RvciwgYGZvby5iYXJgIGlzIG5vdFxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBwYXRoIGlzIGFuIGFuY2VzdG9yIG9mIHRoZSBiYXNlIHBhdGguXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGlzQW5jZXN0b3IoJ2Zvby5iYXInLCAnZm9vJykgICAgICAgICAvLyB0cnVlXG4gKiBpc0FuY2VzdG9yKCdmb28uYmFyJywgJ2Zvby5iYXInKSAgICAgLy8gZmFsc2VcbiAqIGlzQW5jZXN0b3IoJ2Zvby5iYXInLCAnZm9vLmJhci5iYXonKSAvLyBmYWxzZVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2UgUGF0aCBzdHJpbmcgdG8gdGVzdCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCBzdHJpbmcgdG8gdGVzdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYHBhdGhgIGlzIGFuIGFuY2VzdG9yIG9mIGBiYXNlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQW5jZXN0b3IoYmFzZSwgcGF0aCkge1xuICAvLyAgICAgYmFzZS5zdGFydHNXaXRoKHBhdGggKyAnLicpO1xuICByZXR1cm4gYmFzZS5pbmRleE9mKHBhdGggKyAnLicpID09PSAwO1xufVxuXG4vKipcbiAqIEdpdmVuIGBiYXNlYCBpcyBgZm9vLmJhcmAsIGBmb28uYmFyLmJhemAgaXMgYW4gZGVzY2VuZGFudFxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpc0Rlc2NlbmRhbnQoJ2Zvby5iYXInLCAnZm9vLmJhci5iYXonKSAvLyB0cnVlXG4gKiBpc0Rlc2NlbmRhbnQoJ2Zvby5iYXInLCAnZm9vLmJhcicpICAgICAvLyBmYWxzZVxuICogaXNEZXNjZW5kYW50KCdmb28uYmFyJywgJ2ZvbycpICAgICAgICAgLy8gZmFsc2VcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlIFBhdGggc3RyaW5nIHRvIHRlc3QgYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFBhdGggc3RyaW5nIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBwYXRoYCBpcyBhIGRlc2NlbmRhbnQgb2YgYGJhc2VgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZXNjZW5kYW50KGJhc2UsIHBhdGgpIHtcbiAgLy8gICAgIHBhdGguc3RhcnRzV2l0aChiYXNlICsgJy4nKTtcbiAgcmV0dXJuIHBhdGguaW5kZXhPZihiYXNlICsgJy4nKSA9PT0gMDtcbn1cblxuLyoqXG4gKiBSZXBsYWNlcyBhIHByZXZpb3VzIGJhc2UgcGF0aCB3aXRoIGEgbmV3IGJhc2UgcGF0aCwgcHJlc2VydmluZyB0aGVcbiAqIHJlbWFpbmRlciBvZiB0aGUgcGF0aC5cbiAqXG4gKiBVc2VyIG11c3QgZW5zdXJlIGBwYXRoYCBoYXMgYSBwcmVmaXggb2YgYGJhc2VgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiB0cmFuc2xhdGUoJ2Zvby5iYXInLCAnem90JywgJ2Zvby5iYXIuYmF6JykgLy8gJ3pvdC5iYXonXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZSBDdXJyZW50IGJhc2Ugc3RyaW5nIHRvIHJlbW92ZVxuICogQHBhcmFtIHtzdHJpbmd9IG5ld0Jhc2UgTmV3IGJhc2Ugc3RyaW5nIHRvIHJlcGxhY2Ugd2l0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCB0byB0cmFuc2xhdGVcbiAqIEByZXR1cm4ge3N0cmluZ30gVHJhbnNsYXRlZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShiYXNlLCBuZXdCYXNlLCBwYXRoKSB7XG4gIHJldHVybiBuZXdCYXNlICsgcGF0aC5zbGljZShiYXNlLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2UgUGF0aCBzdHJpbmcgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBQYXRoIHN0cmluZyB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBwYXRoYCBpcyBlcXVhbCB0byBgYmFzZWBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXMoYmFzZSwgcGF0aCkge1xuICByZXR1cm4gKGJhc2UgPT09IHBhdGgpIHx8XG4gICAgICAgICBpc0FuY2VzdG9yKGJhc2UsIHBhdGgpIHx8XG4gICAgICAgICBpc0Rlc2NlbmRhbnQoYmFzZSwgcGF0aCk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYXJyYXktYmFzZWQgcGF0aHMgdG8gZmxhdHRlbmVkIHBhdGguICBTdHJpbmctYmFzZWQgcGF0aHNcbiAqIGFyZSByZXR1cm5lZCBhcy1pcy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogbm9ybWFsaXplKFsnZm9vLmJhcicsIDAsICdiYXonXSkgIC8vICdmb28uYmFyLjAuYmF6J1xuICogbm9ybWFsaXplKCdmb28uYmFyLjAuYmF6JykgICAgICAgIC8vICdmb28uYmFyLjAuYmF6J1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCAhQXJyYXk8c3RyaW5nfG51bWJlcj59IHBhdGggSW5wdXQgcGF0aFxuICogQHJldHVybiB7c3RyaW5nfSBGbGF0dGVuZWQgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHBhdGgpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICBsZXQgcGFydHMgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7IGk8cGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGFyZ3MgPSBwYXRoW2ldLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgIGZvciAobGV0IGo9MDsgajxhcmdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYXJnc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbn1cblxuLyoqXG4gKiBTcGxpdHMgYSBwYXRoIGludG8gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuIEFjY2VwdHMgZWl0aGVyIGFycmF5c1xuICogb2YgcGF0aCBwYXJ0cyBvciBzdHJpbmdzLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBzcGxpdChbJ2Zvby5iYXInLCAwLCAnYmF6J10pICAvLyBbJ2ZvbycsICdiYXInLCAnMCcsICdiYXonXVxuICogc3BsaXQoJ2Zvby5iYXIuMC5iYXonKSAgICAgICAgLy8gWydmb28nLCAnYmFyJywgJzAnLCAnYmF6J11cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgIUFycmF5PHN0cmluZ3xudW1iZXI+fSBwYXRoIElucHV0IHBhdGhcbiAqIEByZXR1cm4geyFBcnJheTxzdHJpbmc+fSBBcnJheSBvZiBwYXRoIHBhcnRzXG4gKiBAc3VwcHJlc3Mge2NoZWNrVHlwZXN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdChwYXRoKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZShwYXRoKS5zcGxpdCgnLicpO1xuICB9XG4gIHJldHVybiBwYXRoLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbn1cblxuLyoqXG4gKiBSZWFkcyBhIHZhbHVlIGZyb20gYSBwYXRoLiAgSWYgYW55IHN1Yi1wcm9wZXJ0eSBpbiB0aGUgcGF0aCBpcyBgdW5kZWZpbmVkYCxcbiAqIHRoaXMgbWV0aG9kIHJldHVybnMgYHVuZGVmaW5lZGAgKHdpbGwgbmV2ZXIgdGhyb3cuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgT2JqZWN0IGZyb20gd2hpY2ggdG8gZGVyZWZlcmVuY2UgcGF0aCBmcm9tXG4gKiBAcGFyYW0ge3N0cmluZyB8ICFBcnJheTxzdHJpbmd8bnVtYmVyPn0gcGF0aCBQYXRoIHRvIHJlYWRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gaW5mbyBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgdG8gYGluZm9gLCB0aGUgbm9ybWFsaXplZFxuICogIChmbGF0dGVuZWQpIHBhdGggd2lsbCBiZSBzZXQgdG8gYGluZm8ucGF0aGAuXG4gKiBAcmV0dXJuIHsqfSBWYWx1ZSBhdCBwYXRoLCBvciBgdW5kZWZpbmVkYCBpZiB0aGUgcGF0aCBjb3VsZCBub3QgYmVcbiAqICBmdWxseSBkZXJlZmVyZW5jZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXQocm9vdCwgcGF0aCwgaW5mbykge1xuICBsZXQgcHJvcCA9IHJvb3Q7XG4gIGxldCBwYXJ0cyA9IHNwbGl0KHBhdGgpO1xuICAvLyBMb29wIG92ZXIgcGF0aCBwYXJ0c1swLi5uLTFdIGFuZCBkZXJlZmVyZW5jZVxuICBmb3IgKGxldCBpPTA7IGk8cGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXByb3ApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHBhcnQgPSBwYXJ0c1tpXTtcbiAgICBwcm9wID0gcHJvcFtwYXJ0XTtcbiAgfVxuICBpZiAoaW5mbykge1xuICAgIGluZm8ucGF0aCA9IHBhcnRzLmpvaW4oJy4nKTtcbiAgfVxuICByZXR1cm4gcHJvcDtcbn1cblxuLyoqXG4gKiBTZXRzIGEgdmFsdWUgdG8gYSBwYXRoLiAgSWYgYW55IHN1Yi1wcm9wZXJ0eSBpbiB0aGUgcGF0aCBpcyBgdW5kZWZpbmVkYCxcbiAqIHRoaXMgbWV0aG9kIHdpbGwgbm8tb3AuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJvb3QgT2JqZWN0IGZyb20gd2hpY2ggdG8gZGVyZWZlcmVuY2UgcGF0aCBmcm9tXG4gKiBAcGFyYW0ge3N0cmluZyB8ICFBcnJheTxzdHJpbmd8bnVtYmVyPn0gcGF0aCBQYXRoIHRvIHNldFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBzZXQgdG8gcGF0aFxuICogQHJldHVybiB7c3RyaW5nIHwgdW5kZWZpbmVkfSBUaGUgbm9ybWFsaXplZCB2ZXJzaW9uIG9mIHRoZSBpbnB1dCBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXQocm9vdCwgcGF0aCwgdmFsdWUpIHtcbiAgbGV0IHByb3AgPSByb290O1xuICBsZXQgcGFydHMgPSBzcGxpdChwYXRoKTtcbiAgbGV0IGxhc3QgPSBwYXJ0c1twYXJ0cy5sZW5ndGgtMV07XG4gIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgLy8gTG9vcCBvdmVyIHBhdGggcGFydHNbMC4ubi0yXSBhbmQgZGVyZWZlcmVuY2VcbiAgICBmb3IgKGxldCBpPTA7IGk8cGFydHMubGVuZ3RoLTE7IGkrKykge1xuICAgICAgbGV0IHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgIHByb3AgPSBwcm9wW3BhcnRdO1xuICAgICAgaWYgKCFwcm9wKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gU2V0IHZhbHVlIHRvIG9iamVjdCBhdCBlbmQgb2YgcGF0aFxuICAgIHByb3BbbGFzdF0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTaW1wbGUgcHJvcGVydHkgc2V0XG4gICAgcHJvcFtwYXRoXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBzdHJpbmcgaXMgYSBzdHJ1Y3R1cmVkIGRhdGEgcGF0aCAoaGFzIGRvdHMpLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgZGVwcmVjYXRlZC4gIFVzZSBgaXNQYXRoYCBpbnN0ZWFkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpc0RlZXAoJ2Zvby5iYXIuYmF6JykgLy8gdHJ1ZVxuICogaXNEZWVwKCdmb28nKSAgICAgICAgIC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUGF0aCBzdHJpbmdcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIHN0cmluZyBjb250YWluZWQgb25lIG9yIG1vcmUgZG90c1xuICovXG5leHBvcnQgY29uc3QgaXNEZWVwID0gaXNQYXRoO1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbmltcG9ydCAnLi9ib290LmpzJztcblxubGV0IENTU19VUkxfUlggPSAvKHVybFxcKCkoW14pXSopKFxcKSkvZztcbmxldCBBQlNfVVJMID0gLyheXFwvKXwoXiMpfCheW1xcdy1cXGRdKjopLztcbmxldCB3b3JraW5nVVJMO1xubGV0IHJlc29sdmVEb2M7XG4vKipcbiAqIFJlc29sdmVzIHRoZSBnaXZlbiBVUkwgYWdhaW5zdCB0aGUgcHJvdmlkZWQgYGJhc2VVcmknLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIHBlcmZvcm1zIG5vIHJlc29sdXRpb24gZm9yIFVSTHMgdGhhdCBzdGFydFxuICogd2l0aCBgL2AgKGFic29sdXRlIFVSTHMpIG9yIGAjYCAoaGFzaCBpZGVudGlmaWVycykuICBGb3IgZ2VuZXJhbCBwdXJwb3NlXG4gKiBVUkwgcmVzb2x1dGlvbiwgdXNlIGB3aW5kb3cuVVJMYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIElucHV0IFVSTCB0byByZXNvbHZlXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBiYXNlVVJJIEJhc2UgVVJJIHRvIHJlc29sdmUgdGhlIFVSTCBhZ2FpbnN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9IHJlc29sdmVkIFVSTFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVybCh1cmwsIGJhc2VVUkkpIHtcbiAgaWYgKHVybCAmJiBBQlNfVVJMLnRlc3QodXJsKSkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgLy8gTGF6eSBmZWF0dXJlIGRldGVjdGlvbi5cbiAgaWYgKHdvcmtpbmdVUkwgPT09IHVuZGVmaW5lZCkge1xuICAgIHdvcmtpbmdVUkwgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdSA9IG5ldyBVUkwoJ2InLCAnaHR0cDovL2EnKTtcbiAgICAgIHUucGF0aG5hbWUgPSAnYyUyMGQnO1xuICAgICAgd29ya2luZ1VSTCA9ICh1LmhyZWYgPT09ICdodHRwOi8vYS9jJTIwZCcpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNpbGVudGx5IGZhaWxcbiAgICB9XG4gIH1cbiAgaWYgKCFiYXNlVVJJKSB7XG4gICAgYmFzZVVSSSA9IGRvY3VtZW50LmJhc2VVUkkgfHwgd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIH1cbiAgaWYgKHdvcmtpbmdVUkwpIHtcbiAgICByZXR1cm4gKG5ldyBVUkwodXJsLCBiYXNlVVJJKSkuaHJlZjtcbiAgfVxuICAvLyBGYWxsYmFjayB0byBjcmVhdGluZyBhbiBhbmNob3IgaW50byBhIGRpc2Nvbm5lY3RlZCBkb2N1bWVudC5cbiAgaWYgKCFyZXNvbHZlRG9jKSB7XG4gICAgcmVzb2x2ZURvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgndGVtcCcpO1xuICAgIHJlc29sdmVEb2MuYmFzZSA9IHJlc29sdmVEb2MuY3JlYXRlRWxlbWVudCgnYmFzZScpO1xuICAgIHJlc29sdmVEb2MuaGVhZC5hcHBlbmRDaGlsZChyZXNvbHZlRG9jLmJhc2UpO1xuICAgIHJlc29sdmVEb2MuYW5jaG9yID0gcmVzb2x2ZURvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgcmVzb2x2ZURvYy5ib2R5LmFwcGVuZENoaWxkKHJlc29sdmVEb2MuYW5jaG9yKTtcbiAgfVxuICByZXNvbHZlRG9jLmJhc2UuaHJlZiA9IGJhc2VVUkk7XG4gIHJlc29sdmVEb2MuYW5jaG9yLmhyZWYgPSB1cmw7XG4gIHJldHVybiByZXNvbHZlRG9jLmFuY2hvci5ocmVmIHx8IHVybDtcblxufVxuXG4vKipcbiAqIFJlc29sdmVzIGFueSByZWxhdGl2ZSBVUkwncyBpbiB0aGUgZ2l2ZW4gQ1NTIHRleHQgYWdhaW5zdCB0aGUgcHJvdmlkZWRcbiAqIGBvd25lckRvY3VtZW50YCdzIGBiYXNlVVJJYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzVGV4dCBDU1MgdGV4dCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSSSBCYXNlIFVSSSB0byByZXNvbHZlIHRoZSBVUkwgYWdhaW5zdFxuICogQHJldHVybiB7c3RyaW5nfSBQcm9jZXNzZWQgQ1NTIHRleHQgd2l0aCByZXNvbHZlZCBVUkwnc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUNzcyhjc3NUZXh0LCBiYXNlVVJJKSB7XG4gIHJldHVybiBjc3NUZXh0LnJlcGxhY2UoQ1NTX1VSTF9SWCwgZnVuY3Rpb24obSwgcHJlLCB1cmwsIHBvc3QpIHtcbiAgICByZXR1cm4gcHJlICsgJ1xcJycgK1xuICAgICAgcmVzb2x2ZVVybCh1cmwucmVwbGFjZSgvW1wiJ10vZywgJycpLCBiYXNlVVJJKSArXG4gICAgICAnXFwnJyArIHBvc3Q7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBwYXRoIGZyb20gYSBnaXZlbiBgdXJsYC4gVGhlIHBhdGggaW5jbHVkZXMgdGhlIHRyYWlsaW5nXG4gKiBgL2AgZnJvbSB0aGUgdXJsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgSW5wdXQgVVJMIHRvIHRyYW5zZm9ybVxuICogQHJldHVybiB7c3RyaW5nfSByZXNvbHZlZCBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXRoRnJvbVVybCh1cmwpIHtcbiAgcmV0dXJuIHVybC5zdWJzdHJpbmcoMCwgdXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbn1cbiIsIi8qKlxuQGxpY2Vuc2VcbkNvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5UaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG5Db2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG5pbXBvcnQgJy4vYm9vdC5qcyc7XG5cbmltcG9ydCB7IHBhdGhGcm9tVXJsIH0gZnJvbSAnLi9yZXNvbHZlLXVybC5qcyc7XG5leHBvcnQgY29uc3QgdXNlU2hhZG93ID0gISh3aW5kb3cuU2hhZHlET00pO1xuZXhwb3J0IGNvbnN0IHVzZU5hdGl2ZUNTU1Byb3BlcnRpZXMgPSBCb29sZWFuKCF3aW5kb3cuU2hhZHlDU1MgfHwgd2luZG93LlNoYWR5Q1NTLm5hdGl2ZUNzcyk7XG5leHBvcnQgY29uc3QgdXNlTmF0aXZlQ3VzdG9tRWxlbWVudHMgPSAhKHdpbmRvdy5jdXN0b21FbGVtZW50cy5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrKTtcblxuXG4vKipcbiAqIEdsb2JhbGx5IHNldHRhYmxlIHByb3BlcnR5IHRoYXQgaXMgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0b1xuICogYEVsZW1lbnRNaXhpbmAgaW5zdGFuY2VzLCB1c2VmdWwgZm9yIGJpbmRpbmcgaW4gdGVtcGxhdGVzIHRvXG4gKiBtYWtlIFVSTCdzIHJlbGF0aXZlIHRvIGFuIGFwcGxpY2F0aW9uJ3Mgcm9vdC4gIERlZmF1bHRzIHRvIHRoZSBtYWluXG4gKiBkb2N1bWVudCBVUkwsIGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbiBieSB1c2Vycy4gIEl0IG1heSBiZSB1c2VmdWwgdG8gc2V0XG4gKiBgcm9vdFBhdGhgIHRvIHByb3ZpZGUgYSBzdGFibGUgYXBwbGljYXRpb24gbW91bnQgcGF0aCB3aGVuXG4gKiB1c2luZyBjbGllbnQgc2lkZSByb3V0aW5nLlxuICovXG5leHBvcnQgbGV0IHJvb3RQYXRoID0gdW5kZWZpbmVkIHx8XG4gIHBhdGhGcm9tVXJsKGRvY3VtZW50LmJhc2VVUkkgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4vKipcbiAqIFNldHMgdGhlIGdsb2JhbCByb290UGF0aCBwcm9wZXJ0eSB1c2VkIGJ5IGBFbGVtZW50TWl4aW5gIGFuZFxuICogYXZhaWxhYmxlIHZpYSBgcm9vdFBhdGhgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBuZXcgcm9vdCBwYXRoXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3Qgc2V0Um9vdFBhdGggPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJvb3RQYXRoID0gcGF0aDtcbn07XG5cbi8qKlxuICogQSBnbG9iYWwgY2FsbGJhY2sgdXNlZCB0byBzYW5pdGl6ZSBhbnkgdmFsdWUgYmVmb3JlIGluc2VydGluZyBpdCBpbnRvIHRoZSBET00uXG4gKiBUaGUgY2FsbGJhY2sgc2lnbmF0dXJlIGlzOlxuICpcbiAqICBmdW5jdGlvbiBzYW5pdGl6ZURPTVZhbHVlKHZhbHVlLCBuYW1lLCB0eXBlLCBub2RlKSB7IC4uLiB9XG4gKlxuICogV2hlcmU6XG4gKlxuICogYHZhbHVlYCBpcyB0aGUgdmFsdWUgdG8gc2FuaXRpemUuXG4gKiBgbmFtZWAgaXMgdGhlIG5hbWUgb2YgYW4gYXR0cmlidXRlIG9yIHByb3BlcnR5IChmb3IgZXhhbXBsZSwgaHJlZikuXG4gKiBgdHlwZWAgaW5kaWNhdGVzIHdoZXJlIHRoZSB2YWx1ZSBpcyBiZWluZyBpbnNlcnRlZDogb25lIG9mIHByb3BlcnR5LCBhdHRyaWJ1dGUsIG9yIHRleHQuXG4gKiBgbm9kZWAgaXMgdGhlIG5vZGUgd2hlcmUgdGhlIHZhbHVlIGlzIGJlaW5nIGluc2VydGVkLlxuICpcbiAqIEB0eXBlIHsoZnVuY3Rpb24oKixzdHJpbmcsc3RyaW5nLE5vZGUpOiopfHVuZGVmaW5lZH1cbiAqL1xuZXhwb3J0IGxldCBzYW5pdGl6ZURPTVZhbHVlID0gd2luZG93LlBvbHltZXIgJiYgd2luZG93LlBvbHltZXIuc2FuaXRpemVET01WYWx1ZSB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogU2V0cyB0aGUgZ2xvYmFsIHNhbml0aXplRE9NVmFsdWUgYXZhaWxhYmxlIHZpYSB0aGlzIG1vZHVsZSdzIGV4cG9ydGVkXG4gKiBgc2FuaXRpemVET01WYWx1ZWAgdmFyaWFibGUuXG4gKlxuICogQHBhcmFtIHsoZnVuY3Rpb24oKixzdHJpbmcsc3RyaW5nLE5vZGUpOiopfHVuZGVmaW5lZH0gbmV3U2FuaXRpemVET01WYWx1ZSB0aGUgZ2xvYmFsIHNhbml0aXplRE9NVmFsdWUgY2FsbGJhY2tcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRTYW5pdGl6ZURPTVZhbHVlID0gZnVuY3Rpb24obmV3U2FuaXRpemVET01WYWx1ZSkge1xuICBzYW5pdGl6ZURPTVZhbHVlID0gbmV3U2FuaXRpemVET01WYWx1ZTtcbn07XG5cbi8qKlxuICogR2xvYmFsbHkgc2V0dGFibGUgcHJvcGVydHkgdG8gbWFrZSBQb2x5bWVyIEdlc3R1cmVzIHVzZSBwYXNzaXZlIFRvdWNoRXZlbnQgbGlzdGVuZXJzIHdoZW4gcmVjb2duaXppbmcgZ2VzdHVyZXMuXG4gKiBXaGVuIHNldCB0byBgdHJ1ZWAsIGdlc3R1cmVzIG1hZGUgZnJvbSB0b3VjaCB3aWxsIG5vdCBiZSBhYmxlIHRvIHByZXZlbnQgc2Nyb2xsaW5nLCBhbGxvd2luZyBmb3Igc21vb3RoZXJcbiAqIHNjcm9sbGluZyBwZXJmb3JtYW5jZS5cbiAqIERlZmF1bHRzIHRvIGBmYWxzZWAgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICovXG5leHBvcnQgbGV0IHBhc3NpdmVUb3VjaEdlc3R1cmVzID0gZmFsc2U7XG5cbi8qKlxuICogU2V0cyBgcGFzc2l2ZVRvdWNoR2VzdHVyZXNgIGdsb2JhbGx5IGZvciBhbGwgZWxlbWVudHMgdXNpbmcgUG9seW1lciBHZXN0dXJlcy5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVBhc3NpdmUgZW5hYmxlIG9yIGRpc2FibGUgcGFzc2l2ZSB0b3VjaCBnZXN0dXJlcyBnbG9iYWxseVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGNvbnN0IHNldFBhc3NpdmVUb3VjaEdlc3R1cmVzID0gZnVuY3Rpb24odXNlUGFzc2l2ZSkge1xuICBwYXNzaXZlVG91Y2hHZXN0dXJlcyA9IHVzZVBhc3NpdmU7XG59O1xuXG4vKipcbiAqIFNldHRpbmcgdG8gZW5zdXJlIFBvbHltZXIgdGVtcGxhdGUgZXZhbHVhdGlvbiBvbmx5IG9jY3VycyBiYXNlZCBvbiB0ZW1wYXRlc1xuICogZGVmaW5lZCBpbiB0cnVzdGVkIHNjcmlwdC4gIFdoZW4gdHJ1ZSwgYDxkb20tbW9kdWxlPmAgcmUtcmVnaXN0cmF0aW9uIGlzXG4gKiBkaXNhbGxvd2VkLCBgPGRvbS1iaW5kPmAgaXMgZGlzYWJsZWQsIGFuZCBgPGRvbS1pZj5gL2A8ZG9tLXJlcGVhdD5gXG4gKiB0ZW1wbGF0ZXMgd2lsbCBvbmx5IGV2YWx1YXRlIGluIHRoZSBjb250ZXh0IG9mIGEgdHJ1c3RlZCBlbGVtZW50IHRlbXBsYXRlLlxuICovXG5leHBvcnQgbGV0IHN0cmljdFRlbXBsYXRlUG9saWN5ID0gZmFsc2U7XG5cbi8qKlxuICogU2V0cyBgc3RyaWN0VGVtcGxhdGVQb2xpY3lgIGdsb2JhbGx5IGZvciBhbGwgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZVN0cmljdFBvbGljeSBlbmFibGUgb3IgZGlzYWJsZSBzdHJpY3QgdGVtcGxhdGUgcG9saWN5XG4gKiAgIGdsb2JhbGx5XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3Qgc2V0U3RyaWN0VGVtcGxhdGVQb2xpY3kgPSBmdW5jdGlvbih1c2VTdHJpY3RQb2xpY3kpIHtcbiAgc3RyaWN0VGVtcGxhdGVQb2xpY3kgPSB1c2VTdHJpY3RQb2xpY3k7XG59O1xuXG4vKipcbiAqIFNldHRpbmcgdG8gZW5hYmxlIGRvbS1tb2R1bGUgbG9va3VwIGZyb20gUG9seW1lci5FbGVtZW50LiAgQnkgZGVmYXVsdCxcbiAqIHRlbXBsYXRlcyBtdXN0IGJlIGRlZmluZWQgaW4gc2NyaXB0IHVzaW5nIHRoZSBgc3RhdGljIGdldCB0ZW1wbGF0ZSgpYFxuICogZ2V0dGVyIGFuZCB0aGUgYGh0bWxgIHRhZyBmdW5jdGlvbi4gIFRvIGVuYWJsZSBsZWdhY3kgbG9hZGluZyBvZiB0ZW1wbGF0ZXNcbiAqIHZpYSBkb20tbW9kdWxlLCBzZXQgdGhpcyBmbGFnIHRvIHRydWUuXG4gKi9cbmV4cG9ydCBsZXQgYWxsb3dUZW1wbGF0ZUZyb21Eb21Nb2R1bGUgPSBmYWxzZTtcblxuLyoqXG4gKiBTZXRzIGBsb29rdXBUZW1wbGF0ZUZyb21Eb21Nb2R1bGVgIGdsb2JhbGx5IGZvciBhbGwgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93RG9tTW9kdWxlIGVuYWJsZSBvciBkaXNhYmxlIHRlbXBsYXRlIGxvb2t1cCBcbiAqICAgZ2xvYmFsbHlcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBbGxvd1RlbXBsYXRlRnJvbURvbU1vZHVsZSA9IGZ1bmN0aW9uKGFsbG93RG9tTW9kdWxlKSB7XG4gIGFsbG93VGVtcGxhdGVGcm9tRG9tTW9kdWxlID0gYWxsb3dEb21Nb2R1bGU7XG59O1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG5UaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbkNvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG5zdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cblxuLyoqXG4gKiBNb2R1bGUgd2l0aCB1dGlsaXRpZXMgZm9yIGNvbGxlY3Rpb24gQ1NTIHRleHQgZnJvbSBgPHRlbXBsYXRlcz5gLCBleHRlcm5hbFxuICogc3R5bGVzaGVldHMsIGFuZCBgZG9tLW1vZHVsZWBzLlxuICpcbiAqIEBzdW1tYXJ5IE1vZHVsZSB3aXRoIHV0aWxpdGllcyBmb3IgY29sbGVjdGlvbiBDU1MgdGV4dCBmcm9tIHZhcmlvdXMgc291cmNlcy5cbiAqL1xuXG5pbXBvcnQgeyBEb21Nb2R1bGUgfSBmcm9tICcuLi9lbGVtZW50cy9kb20tbW9kdWxlLmpzJztcbmltcG9ydCB7IHJlc29sdmVDc3MgfSBmcm9tICcuL3Jlc29sdmUtdXJsLmpzJztcblxuY29uc3QgTU9EVUxFX1NUWUxFX0xJTktfU0VMRUNUT1IgPSAnbGlua1tyZWw9aW1wb3J0XVt0eXBlfj1jc3NdJztcbmNvbnN0IElOQ0xVREVfQVRUUiA9ICdpbmNsdWRlJztcbmNvbnN0IFNIQURZX1VOU0NPUEVEX0FUVFIgPSAnc2hhZHktdW5zY29wZWQnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVJZCAuXG4gKiBAcmV0dXJuIHs/RG9tTW9kdWxlfSAuXG4gKi9cbmZ1bmN0aW9uIGltcG9ydE1vZHVsZShtb2R1bGVJZCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHs/RG9tTW9kdWxlfSAqLyhEb21Nb2R1bGUuaW1wb3J0KG1vZHVsZUlkKSk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlRm9ySW1wb3J0KGltcG9ydERvYykge1xuICAvLyBOT1RFOiBwb2x5ZmlsbCBhZmZvcmRhbmNlLlxuICAvLyB1bmRlciB0aGUgSFRNTEltcG9ydHMgcG9seWZpbGwsIHRoZXJlIHdpbGwgYmUgbm8gJ2JvZHknLFxuICAvLyBidXQgdGhlIGltcG9ydCBwc2V1ZG8tZG9jIGNhbiBiZSB1c2VkIGRpcmVjdGx5LlxuICBsZXQgY29udGFpbmVyID0gaW1wb3J0RG9jLmJvZHkgPyBpbXBvcnREb2MuYm9keSA6IGltcG9ydERvYztcbiAgY29uc3QgaW1wb3J0Q3NzID0gcmVzb2x2ZUNzcyhjb250YWluZXIudGV4dENvbnRlbnQsXG4gICAgaW1wb3J0RG9jLmJhc2VVUkkpO1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnRleHRDb250ZW50ID0gaW1wb3J0Q3NzO1xuICByZXR1cm4gc3R5bGU7XG59XG5cbi8qKiBAdHlwZWRlZiB7e2Fzc2V0cGF0aDogc3RyaW5nfX0gKi9cbmxldCB0ZW1wbGF0ZVdpdGhBc3NldFBhdGg7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIDxzdHlsZT4gZWxlbWVudHMgaW4gYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBgZG9tLW1vZHVsZWBzLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUlkcyBMaXN0IG9mIGRvbS1tb2R1bGUgaWQncyB3aXRoaW4gd2hpY2ggdG9cbiAqIHNlYXJjaCBmb3IgY3NzLlxuICogQHJldHVybiB7IUFycmF5PCFIVE1MU3R5bGVFbGVtZW50Pn0gQXJyYXkgb2YgY29udGFpbmVkIDxzdHlsZT4gZWxlbWVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlc0Zyb21Nb2R1bGVzKG1vZHVsZUlkcykge1xuIGNvbnN0IG1vZHVsZXMgPSBtb2R1bGVJZHMudHJpbSgpLnNwbGl0KC9cXHMrLyk7XG4gY29uc3Qgc3R5bGVzID0gW107XG4gZm9yIChsZXQgaT0wOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgc3R5bGVzLnB1c2goLi4uc3R5bGVzRnJvbU1vZHVsZShtb2R1bGVzW2ldKSk7XG4gfVxuIHJldHVybiBzdHlsZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgPHN0eWxlPiBlbGVtZW50cyBpbiBhIGdpdmVuIGBkb20tbW9kdWxlYC5cbiAqIFN0eWxlcyBpbiBhIGBkb20tbW9kdWxlYCBjYW4gY29tZSBlaXRoZXIgZnJvbSBgPHN0eWxlPmBzIHdpdGhpbiB0aGVcbiAqIGZpcnN0IGA8dGVtcGxhdGU+YCwgb3IgZWxzZSBmcm9tIG9uZSBvciBtb3JlXG4gKiBgPGxpbmsgcmVsPVwiaW1wb3J0XCIgdHlwZT1cImNzc1wiPmAgbGlua3Mgb3V0c2lkZSB0aGUgdGVtcGxhdGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUlkIGRvbS1tb2R1bGUgaWQgdG8gZ2F0aGVyIHN0eWxlcyBmcm9tXG4gKiBAcmV0dXJuIHshQXJyYXk8IUhUTUxTdHlsZUVsZW1lbnQ+fSBBcnJheSBvZiBjb250YWluZWQgc3R5bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVzRnJvbU1vZHVsZShtb2R1bGVJZCkge1xuICBjb25zdCBtID0gaW1wb3J0TW9kdWxlKG1vZHVsZUlkKTtcblxuICBpZiAoIW0pIHtcbiAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kIHN0eWxlIGRhdGEgaW4gbW9kdWxlIG5hbWVkJywgbW9kdWxlSWQpO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChtLl9zdHlsZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IFtdO1xuICAgIC8vIG1vZHVsZSBpbXBvcnRzOiA8bGluayByZWw9XCJpbXBvcnRcIiB0eXBlPVwiY3NzXCI+XG4gICAgc3R5bGVzLnB1c2goLi4uX3N0eWxlc0Zyb21Nb2R1bGVJbXBvcnRzKG0pKTtcbiAgICAvLyBpbmNsdWRlIGNzcyBmcm9tIHRoZSBmaXJzdCB0ZW1wbGF0ZSBpbiB0aGUgbW9kdWxlXG4gICAgY29uc3QgdGVtcGxhdGUgPSAvKiogQHR5cGUgez9IVE1MVGVtcGxhdGVFbGVtZW50fSAqLyhcbiAgICAgICAgbS5xdWVyeVNlbGVjdG9yKCd0ZW1wbGF0ZScpKTtcbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIHN0eWxlcy5wdXNoKC4uLnN0eWxlc0Zyb21UZW1wbGF0ZSh0ZW1wbGF0ZSxcbiAgICAgICAgLyoqIEB0eXBlIHt0ZW1wbGF0ZVdpdGhBc3NldFBhdGh9ICovKG0pLmFzc2V0cGF0aCkpO1xuICAgIH1cblxuICAgIG0uX3N0eWxlcyA9IHN0eWxlcztcbiAgfVxuXG4gIHJldHVybiBtLl9zdHlsZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYDxzdHlsZT5gIGVsZW1lbnRzIHdpdGhpbiBhIGdpdmVuIHRlbXBsYXRlLlxuICpcbiAqIEBwYXJhbSB7IUhUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlIFRlbXBsYXRlIHRvIGdhdGhlciBzdHlsZXMgZnJvbVxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkkgYmFzZVVSSSBmb3Igc3R5bGUgY29udGVudFxuICogQHJldHVybiB7IUFycmF5PCFIVE1MU3R5bGVFbGVtZW50Pn0gQXJyYXkgb2Ygc3R5bGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZXNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIGJhc2VVUkkpIHtcbiAgaWYgKCF0ZW1wbGF0ZS5fc3R5bGVzKSB7XG4gICAgY29uc3Qgc3R5bGVzID0gW107XG4gICAgLy8gaWYgZWxlbWVudCBpcyBhIHRlbXBsYXRlLCBnZXQgY29udGVudCBmcm9tIGl0cyAuY29udGVudFxuICAgIGNvbnN0IGUkID0gdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IGUkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZSA9IGUkW2ldO1xuICAgICAgLy8gc3VwcG9ydCBzdHlsZSBzaGFyaW5nIGJ5IGFsbG93aW5nIHN0eWxlcyB0byBcImluY2x1ZGVcIlxuICAgICAgLy8gb3RoZXIgZG9tLW1vZHVsZXMgdGhhdCBjb250YWluIHN0eWxpbmdcbiAgICAgIGxldCBpbmNsdWRlID0gZS5nZXRBdHRyaWJ1dGUoSU5DTFVERV9BVFRSKTtcbiAgICAgIGlmIChpbmNsdWRlKSB7XG4gICAgICAgIHN0eWxlcy5wdXNoKC4uLnN0eWxlc0Zyb21Nb2R1bGVzKGluY2x1ZGUpLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmRleCwgc2VsZikge1xuICAgICAgICAgIHJldHVybiBzZWxmLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBpZiAoYmFzZVVSSSkge1xuICAgICAgICBlLnRleHRDb250ZW50ID0gcmVzb2x2ZUNzcyhlLnRleHRDb250ZW50LCBiYXNlVVJJKTtcbiAgICAgIH1cbiAgICAgIHN0eWxlcy5wdXNoKGUpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZS5fc3R5bGVzID0gc3R5bGVzO1xuICB9XG4gIHJldHVybiB0ZW1wbGF0ZS5fc3R5bGVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIDxzdHlsZT4gZWxlbWVudHMgIGZyb20gc3R5bGVzaGVldHMgbG9hZGVkIHZpYSBgPGxpbmsgcmVsPVwiaW1wb3J0XCIgdHlwZT1cImNzc1wiPmAgbGlua3Mgd2l0aGluIHRoZSBzcGVjaWZpZWQgYGRvbS1tb2R1bGVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtb2R1bGVJZCBJZCBvZiBgZG9tLW1vZHVsZWAgdG8gZ2F0aGVyIENTUyBmcm9tXG4gKiBAcmV0dXJuIHshQXJyYXk8IUhUTUxTdHlsZUVsZW1lbnQ+fSBBcnJheSBvZiBjb250YWluZWQgc3R5bGVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVzRnJvbU1vZHVsZUltcG9ydHMobW9kdWxlSWQpIHtcbiBsZXQgbSA9IGltcG9ydE1vZHVsZShtb2R1bGVJZCk7XG4gcmV0dXJuIG0gPyBfc3R5bGVzRnJvbU1vZHVsZUltcG9ydHMobSkgOiBbXTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbW9kdWxlIGRvbS1tb2R1bGUgZWxlbWVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYDxsaW5rIHJlbD1cImltcG9ydFwiIHR5cGU9XCJjc3NcIj5gIHN0eWxlc1xuICogQHJldHVybiB7IUFycmF5PCFIVE1MU3R5bGVFbGVtZW50Pn0gQXJyYXkgb2YgY29udGFpbmVkIHN0eWxlc1xuICovXG5mdW5jdGlvbiBfc3R5bGVzRnJvbU1vZHVsZUltcG9ydHMobW9kdWxlKSB7XG4gIGNvbnN0IHN0eWxlcyA9IFtdO1xuICBjb25zdCBwJCA9IG1vZHVsZS5xdWVyeVNlbGVjdG9yQWxsKE1PRFVMRV9TVFlMRV9MSU5LX1NFTEVDVE9SKTtcbiAgZm9yIChsZXQgaT0wOyBpIDwgcCQubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcCA9IHAkW2ldO1xuICAgIGlmIChwLmltcG9ydCkge1xuICAgICAgY29uc3QgaW1wb3J0RG9jID0gcC5pbXBvcnQ7XG4gICAgICBjb25zdCB1bnNjb3BlZCA9IHAuaGFzQXR0cmlidXRlKFNIQURZX1VOU0NPUEVEX0FUVFIpO1xuICAgICAgaWYgKHVuc2NvcGVkICYmICFpbXBvcnREb2MuX3Vuc2NvcGVkU3R5bGUpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZUZvckltcG9ydChpbXBvcnREb2MpO1xuICAgICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoU0hBRFlfVU5TQ09QRURfQVRUUiwgJycpO1xuICAgICAgICBpbXBvcnREb2MuX3Vuc2NvcGVkU3R5bGUgPSBzdHlsZTtcbiAgICAgIH0gZWxzZSBpZiAoIWltcG9ydERvYy5fc3R5bGUpIHtcbiAgICAgICAgaW1wb3J0RG9jLl9zdHlsZSA9IHN0eWxlRm9ySW1wb3J0KGltcG9ydERvYyk7XG4gICAgICB9XG4gICAgICBzdHlsZXMucHVzaCh1bnNjb3BlZCA/IGltcG9ydERvYy5fdW5zY29wZWRTdHlsZSA6IGltcG9ydERvYy5fc3R5bGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzO1xufVxuXG4vKipcbiAqXG4gKiBSZXR1cm5zIENTUyB0ZXh0IG9mIHN0eWxlcyBpbiBhIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIGBkb20tbW9kdWxlYHMuXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyBkZXByZWNhdGVkLCB1c2UgYHN0eWxlc0Zyb21Nb2R1bGVzYCBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlSWRzIExpc3Qgb2YgZG9tLW1vZHVsZSBpZCdzIHdpdGhpbiB3aGljaCB0b1xuICogc2VhcmNoIGZvciBjc3MuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IENvbmNhdGVuYXRlZCBDU1MgY29udGVudCBmcm9tIHNwZWNpZmllZCBgZG9tLW1vZHVsZWBzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjc3NGcm9tTW9kdWxlcyhtb2R1bGVJZHMpIHtcbiBsZXQgbW9kdWxlcyA9IG1vZHVsZUlkcy50cmltKCkuc3BsaXQoL1xccysvKTtcbiBsZXQgY3NzVGV4dCA9ICcnO1xuIGZvciAobGV0IGk9MDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgIGNzc1RleHQgKz0gY3NzRnJvbU1vZHVsZShtb2R1bGVzW2ldKTtcbiB9XG4gcmV0dXJuIGNzc1RleHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyBDU1MgdGV4dCBvZiBzdHlsZXMgaW4gYSBnaXZlbiBgZG9tLW1vZHVsZWAuICBDU1MgaW4gYSBgZG9tLW1vZHVsZWBcbiAqIGNhbiBjb21lIGVpdGhlciBmcm9tIGA8c3R5bGU+YHMgd2l0aGluIHRoZSBmaXJzdCBgPHRlbXBsYXRlPmAsIG9yIGVsc2VcbiAqIGZyb20gb25lIG9yIG1vcmUgYDxsaW5rIHJlbD1cImltcG9ydFwiIHR5cGU9XCJjc3NcIj5gIGxpbmtzIG91dHNpZGUgdGhlXG4gKiB0ZW1wbGF0ZS5cbiAqXG4gKiBBbnkgYDxzdHlsZXM+YCBwcm9jZXNzZWQgYXJlIHJlbW92ZWQgZnJvbSB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbi5cbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIHVzZSBgc3R5bGVGcm9tTW9kdWxlYCBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gbW9kdWxlSWQgZG9tLW1vZHVsZSBpZCB0byBnYXRoZXIgc3R5bGVzIGZyb21cbiAqIEByZXR1cm4ge3N0cmluZ30gQ29uY2F0ZW5hdGVkIENTUyBjb250ZW50IGZyb20gc3BlY2lmaWVkIGBkb20tbW9kdWxlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3NzRnJvbU1vZHVsZShtb2R1bGVJZCkge1xuICBsZXQgbSA9IGltcG9ydE1vZHVsZShtb2R1bGVJZCk7XG4gIGlmIChtICYmIG0uX2Nzc1RleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIG1vZHVsZSBpbXBvcnRzOiA8bGluayByZWw9XCJpbXBvcnRcIiB0eXBlPVwiY3NzXCI+XG4gICAgbGV0IGNzc1RleHQgPSBfY3NzRnJvbU1vZHVsZUltcG9ydHMobSk7XG4gICAgLy8gaW5jbHVkZSBjc3MgZnJvbSB0aGUgZmlyc3QgdGVtcGxhdGUgaW4gdGhlIG1vZHVsZVxuICAgIGxldCB0ID0gLyoqIEB0eXBlIHs/SFRNTFRlbXBsYXRlRWxlbWVudH0gKi8obS5xdWVyeVNlbGVjdG9yKCd0ZW1wbGF0ZScpKTtcbiAgICBpZiAodCkge1xuICAgICAgY3NzVGV4dCArPSBjc3NGcm9tVGVtcGxhdGUodCxcbiAgICAgICAgLyoqIEB0eXBlIHt0ZW1wbGF0ZVdpdGhBc3NldFBhdGh9ICovKG0pLmFzc2V0cGF0aCk7XG4gICAgfVxuICAgIG0uX2Nzc1RleHQgPSBjc3NUZXh0IHx8IG51bGw7XG4gIH1cbiAgaWYgKCFtKSB7XG4gICAgY29uc29sZS53YXJuKCdDb3VsZCBub3QgZmluZCBzdHlsZSBkYXRhIGluIG1vZHVsZSBuYW1lZCcsIG1vZHVsZUlkKTtcbiAgfVxuICByZXR1cm4gbSAmJiBtLl9jc3NUZXh0IHx8ICcnO1xufVxuXG4vKipcbiAqIFJldHVybnMgQ1NTIHRleHQgb2YgYDxzdHlsZXM+YCB3aXRoaW4gYSBnaXZlbiB0ZW1wbGF0ZS5cbiAqXG4gKiBBbnkgYDxzdHlsZXM+YCBwcm9jZXNzZWQgYXJlIHJlbW92ZWQgZnJvbSB0aGVpciBvcmlnaW5hbCBsb2NhdGlvbi5cbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIHVzZSBgc3R5bGVGcm9tVGVtcGxhdGVgIGluc3RlYWQuXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7IUhUTUxUZW1wbGF0ZUVsZW1lbnR9IHRlbXBsYXRlIFRlbXBsYXRlIHRvIGdhdGhlciBzdHlsZXMgZnJvbVxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkkgQmFzZSBVUkkgdG8gcmVzb2x2ZSB0aGUgVVJMIGFnYWluc3RcbiAqIEByZXR1cm4ge3N0cmluZ30gQ29uY2F0ZW5hdGVkIENTUyBjb250ZW50IGZyb20gc3BlY2lmaWVkIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjc3NGcm9tVGVtcGxhdGUodGVtcGxhdGUsIGJhc2VVUkkpIHtcbiAgbGV0IGNzc1RleHQgPSAnJztcbiAgY29uc3QgZSQgPSBzdHlsZXNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIGJhc2VVUkkpO1xuICAvLyBpZiBlbGVtZW50IGlzIGEgdGVtcGxhdGUsIGdldCBjb250ZW50IGZyb20gaXRzIC5jb250ZW50XG4gIGZvciAobGV0IGk9MDsgaSA8IGUkLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGUgPSBlJFtpXTtcbiAgICBpZiAoZS5wYXJlbnROb2RlKSB7XG4gICAgICBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSk7XG4gICAgfVxuICAgIGNzc1RleHQgKz0gZS50ZXh0Q29udGVudDtcbiAgfVxuICByZXR1cm4gY3NzVGV4dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIENTUyB0ZXh0IGZyb20gc3R5bGVzaGVldHMgbG9hZGVkIHZpYSBgPGxpbmsgcmVsPVwiaW1wb3J0XCIgdHlwZT1cImNzc1wiPmBcbiAqIGxpbmtzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGBkb20tbW9kdWxlYC5cbiAqXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyBkZXByZWNhdGVkLCB1c2UgYHN0eWxlc0Zyb21Nb2R1bGVJbXBvcnRzYCBpbnN0ZWFkLlxuICpcbiAqIEBkZXByZWNhdGVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1vZHVsZUlkIElkIG9mIGBkb20tbW9kdWxlYCB0byBnYXRoZXIgQ1NTIGZyb21cbiAqIEByZXR1cm4ge3N0cmluZ30gQ29uY2F0ZW5hdGVkIENTUyBjb250ZW50IGZyb20gbGlua3MgaW4gc3BlY2lmaWVkIGBkb20tbW9kdWxlYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3NzRnJvbU1vZHVsZUltcG9ydHMobW9kdWxlSWQpIHtcbiAgbGV0IG0gPSBpbXBvcnRNb2R1bGUobW9kdWxlSWQpO1xuICByZXR1cm4gbSA/IF9jc3NGcm9tTW9kdWxlSW1wb3J0cyhtKSA6ICcnO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbW9kdWxlIGRvbS1tb2R1bGUgZWxlbWVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYDxsaW5rIHJlbD1cImltcG9ydFwiIHR5cGU9XCJjc3NcIj5gIHN0eWxlc1xuICogQHJldHVybiB7c3RyaW5nfSBDb25jYXRlbmF0ZWQgQ1NTIGNvbnRlbnQgZnJvbSBsaW5rcyBpbiB0aGUgZG9tLW1vZHVsZVxuICovXG5mdW5jdGlvbiBfY3NzRnJvbU1vZHVsZUltcG9ydHMobW9kdWxlKSB7XG4gIGxldCBjc3NUZXh0ID0gJyc7XG4gIGxldCBzdHlsZXMgPSBfc3R5bGVzRnJvbU1vZHVsZUltcG9ydHMobW9kdWxlKTtcbiAgZm9yIChsZXQgaT0wOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY3NzVGV4dCArPSBzdHlsZXNbaV0udGV4dENvbnRlbnQ7XG4gIH1cbiAgcmV0dXJuIGNzc1RleHQ7XG59XG4iLCIvKipcbkBsaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcblRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbnN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4qL1xuXG5pbXBvcnQgeyBFbGVtZW50TWl4aW4sIHZlcnNpb24gfSBmcm9tICcuL2xpYi9taXhpbnMvZWxlbWVudC1taXhpbi5qcyc7XG5leHBvcnQgeyBodG1sIH0gZnJvbSAnLi9saWIvdXRpbHMvaHRtbC10YWcuanMnO1xuXG5leHBvcnQgeyB2ZXJzaW9uIH07XG5cbi8qKlxuICogQmFzZSBjbGFzcyB0aGF0IHByb3ZpZGVzIHRoZSBjb3JlIEFQSSBmb3IgUG9seW1lcidzIG1ldGEtcHJvZ3JhbW1pbmdcbiAqIGZlYXR1cmVzIGluY2x1ZGluZyB0ZW1wbGF0ZSBzdGFtcGluZywgZGF0YS1iaW5kaW5nLCBhdHRyaWJ1dGUgZGVzZXJpYWxpemF0aW9uLFxuICogYW5kIHByb3BlcnR5IGNoYW5nZSBvYnNlcnZhdGlvbi5cbiAqXG4gKiBAY3VzdG9tRWxlbWVudFxuICogQHBvbHltZXJcbiAqIEBjb25zdHJ1Y3RvclxuICogQGltcGxlbWVudHMge1BvbHltZXJfRWxlbWVudE1peGlufVxuICogQGV4dGVuZHMgSFRNTEVsZW1lbnRcbiAqIEBhcHBsaWVzTWl4aW4gRWxlbWVudE1peGluXG4gKiBAc3VtbWFyeSBDdXN0b20gZWxlbWVudCBiYXNlIGNsYXNzIHRoYXQgcHJvdmlkZXMgdGhlIGNvcmUgQVBJIGZvciBQb2x5bWVyJ3NcbiAqICAga2V5IG1ldGEtcHJvZ3JhbW1pbmcgZmVhdHVyZXMgaW5jbHVkaW5nIHRlbXBsYXRlIHN0YW1waW5nLCBkYXRhLWJpbmRpbmcsXG4gKiAgIGF0dHJpYnV0ZSBkZXNlcmlhbGl6YXRpb24sIGFuZCBwcm9wZXJ0eSBjaGFuZ2Ugb2JzZXJ2YXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFBvbHltZXJFbGVtZW50ID0gRWxlbWVudE1peGluKEhUTUxFbGVtZW50KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=