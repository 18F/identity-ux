(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('app/components/index');

require('app/utils/index');

require('app/pw-toggle');

require('app/form-validation');

require('app/form-field-format');

require('app/idv-finance-helper');

require('app/radio-btn');

require('app/phone-internationalization');

require('app/print-personal-key');

require('app/i18n-dropdown');

},{"app/components/index":4,"app/form-field-format":6,"app/form-validation":7,"app/i18n-dropdown":8,"app/idv-finance-helper":9,"app/phone-internationalization":16,"app/print-personal-key":17,"app/pw-toggle":18,"app/radio-btn":19,"app/utils/index":23}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Accordion = function (_Events) {
  _inherits(Accordion, _Events);

  function Accordion(el) {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

    _this.el = el;
    _this.controls = [].slice.call(el.querySelectorAll('[aria-controls]'));
    _this.content = el.querySelector('.accordion-content');
    _this.header = el.querySelector('.accordion-header-controls');
    _this.collapsedIcon = el.querySelector('.plus-icon');
    _this.shownIcon = el.querySelector('.minus-icon');

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    return _this;
  }

  _createClass(Accordion, [{
    key: 'setup',
    value: function setup() {
      this.bindEvents();
      this.onInitialize();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.controls.forEach(function (control) {
        control.addEventListener('click', _this2.handleClick);
        control.addEventListener('keyup', _this2.handleKeyUp);
      });

      if (!('animation' in this.content.style)) return;

      this.content.addEventListener('animationend', function (event) {
        var animationName = event.animationName;


        if (animationName === 'accordionOut') {
          _this2.content.classList.remove('shown');
        }
      });
    }
  }, {
    key: 'onInitialize',
    value: function onInitialize() {
      this.setExpanded(false);
      this.collapsedIcon.classList.remove('display-none');
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var expandedState = this.header.getAttribute('aria-expanded');

      if (expandedState === 'false') {
        this.open();
      } else if (expandedState === 'true') {
        this.close();
      }
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(event) {
      var keyCode = event.keyCode || event.which;

      if (keyCode === 13 || keyCode === 32) {
        this.handleClick();
      }
    }
  }, {
    key: 'setExpanded',
    value: function setExpanded(bool) {
      this.header.setAttribute('aria-expanded', bool);
    }
  }, {
    key: 'open',
    value: function open() {
      this.setExpanded(true);
      this.collapsedIcon.classList.add('display-none');
      this.shownIcon.classList.remove('display-none');
      this.content.classList.add('shown');
      this.content.classList.remove('animate-out');
      this.content.classList.add('animate-in');
      this.content.setAttribute('aria-hidden', 'false');
      this.emit('accordion.show');
    }
  }, {
    key: 'close',
    value: function close() {
      this.setExpanded(false);
      this.collapsedIcon.classList.remove('display-none');
      this.shownIcon.classList.add('display-none');
      this.content.classList.remove('animate-in');
      this.content.classList.add('animate-out');
      this.content.setAttribute('aria-hidden', 'true');
      this.emit('accordion.hide');
      this.header.focus();
    }
  }]);

  return Accordion;
}(_events2.default);

exports.default = Accordion;

},{"../utils/events":22,"classlist.js":31}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _focusTrap = require('focus-trap');

var _focusTrap2 = _interopRequireDefault(_focusTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

function FocusTrapProxy() {
  var focusables = [];
  var activated = [];

  return function makeTrap(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var ownTrap = new _focusTrap2.default(el, options);

    focusables.push(ownTrap);

    return {
      activate: function activate() {
        focusables.forEach(function (trap) {
          return trap.deactivate();
        });

        activated.push(ownTrap);

        ownTrap.activate();

        return ownTrap;
      },
      deactivate: function deactivate() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var deactivatedTrap = ownTrap.deactivate(opts);

        // `deactivate` will return a valid trap object if it is available to be
        // deactivated. If not, it returns a falsey value. If nothing was deactivated,
        // bail out.
        if (!deactivatedTrap) {
          return false;
        }

        activated = activated.filter(function (activatedTrap) {
          return activatedTrap !== ownTrap;
        });

        if (activated.length) {
          activated[activated.length - 1].activate();
        }

        return deactivatedTrap;
      },
      pause: function pause() {
        ownTrap.pause();
      }
    };
  };
} /* eslint-disable */


var focusTrapProxy = FocusTrapProxy.call(FocusTrapProxy);

exports.default = focusTrapProxy;

},{"focus-trap":92}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _focusTrapProxy = require('./focus-trap-proxy');

var _focusTrapProxy2 = _interopRequireDefault(_focusTrapProxy);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _accordion = require('./accordion');

var _accordion2 = _interopRequireDefault(_accordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.LoginGov = window.LoginGov || {};
var LoginGov = window.LoginGov;
var trapModal = (0, _modal2.default)(_focusTrapProxy2.default);

LoginGov.Modal = trapModal;

document.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll('.accordion');

  LoginGov.accordions = [].slice.call(elements).map(function (element) {
    var accordion = new _accordion2.default(element);
    accordion.setup();

    return accordion;
  });
});

exports.Modal = trapModal;

},{"./accordion":2,"./focus-trap-proxy":3,"./modal":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('classlist.js');

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATES = {
  HIDE: 'hide',
  SHOW: 'show'
};

function modal(focusTrap) {
  return function (_Events) {
    _inherits(_class, _Events);

    function _class(options) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.el = document.querySelector(options.el);
      _this.shown = false;
      _this.trap = focusTrap(_this.el, { escapeDeactivates: false });
      return _this;
    }

    _createClass(_class, [{
      key: 'toggle',
      value: function toggle() {
        if (this.shown) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show(target) {
        this.setElementVisibility(target, true);
        this.emit(STATES.SHOW);
      }
    }, {
      key: 'hide',
      value: function hide(target) {
        this.setElementVisibility(target, false);
        this.emit(STATES.HIDE);
      }
    }, {
      key: 'setElementVisibility',
      value: function setElementVisibility() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var showing = arguments[1];

        var el = target || this.el;

        this.shown = showing;
        el.classList[showing ? 'remove' : 'add']('display-none');
        document.body.classList[showing ? 'add' : 'remove']('modal-open');
        this.trap[showing ? 'activate' : 'deactivate']();
      }
    }]);

    return _class;
  }(_events2.default);
}

exports.default = modal;

},{"../utils/events":22,"classlist.js":31}],6:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fieldKit = require('field-kit');

var _dateFormatter = require('./modules/date-formatter');

var _dateFormatter2 = _interopRequireDefault(_dateFormatter);

var _internationalPhoneFormatter = require('./modules/international-phone-formatter');

var _internationalPhoneFormatter2 = _interopRequireDefault(_internationalPhoneFormatter);

var _numericFormatter = require('./modules/numeric-formatter');

var _numericFormatter2 = _interopRequireDefault(_numericFormatter);

var _personalKeyFormatter = require('./modules/personal-key-formatter');

var _personalKeyFormatter2 = _interopRequireDefault(_personalKeyFormatter);

var _usPhoneFormatter = require('./modules/us-phone-formatter');

var _usPhoneFormatter2 = _interopRequireDefault(_usPhoneFormatter);

var _zipCodeFormatter = require('./modules/zip-code-formatter');

var _zipCodeFormatter2 = _interopRequireDefault(_zipCodeFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatForm() {
  var formats = [['.auto_loan', new _numericFormatter2.default()], ['.ccn', new _numericFormatter2.default()], ['.dob', new _dateFormatter2.default()], ['.home_equity_line', new _numericFormatter2.default()], ['.mfa', new _numericFormatter2.default()], ['.mortgage', new _numericFormatter2.default()], ['.phone', new _internationalPhoneFormatter2.default()], ['.us-phone', new _usPhoneFormatter2.default()], ['.personal-key', new _personalKeyFormatter2.default()], ['.ssn', new _fieldKit.SocialSecurityNumberFormatter()], ['.zipcode', new _zipCodeFormatter2.default()]];

  formats.forEach(function (f) {
    var _f = _slicedToArray(f, 2),
        el = _f[0],
        formatter = _f[1];

    var input = document.querySelector(el);
    if (input) {
      /* eslint-disable no-new, no-shadow */
      var field = new _fieldKit.TextField(input, formatter);

      // add date format placeholders only to .dob fields
      if (el === '.dob') {
        field.setFocusedPlaceholder('');
        field.setUnfocusedPlaceholder('mm/dd/yyyy');
      }

      // removes focus set by field-kit bug https://github.com/square/field-kit/issues/62
      if (el !== '.mfa') document.activeElement.blur();
    }
  });
}

document.addEventListener('DOMContentLoaded', formatForm);

},{"./modules/date-formatter":10,"./modules/international-phone-formatter":11,"./modules/numeric-formatter":12,"./modules/personal-key-formatter":13,"./modules/us-phone-formatter":14,"./modules/zip-code-formatter":15,"field-kit":91}],7:[function(require,module,exports){
'use strict';

require('classlist.js');

var I18n = window.LoginGov.I18n;

document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form');

  function addListenerMulti(el, events, fn) {
    events.split(' ').forEach(function (e) {
      return el.addEventListener(e, fn, false);
    });
  }

  if (forms.length !== 0) {
    [].forEach.call(forms, function (form) {
      var inputs = form.querySelectorAll('.field');

      if (inputs.length !== 0) {
        [].forEach.call(inputs, function (input) {
          var types = ['dob', 'personal-key', 'ssn', 'zipcode'];

          addListenerMulti(input, 'input invalid', function (e) {
            e.target.setCustomValidity('');

            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity(I18n.t('simple_form.required.text'));
            } else if (e.target.validity.patternMismatch) {
              types.forEach(function (type) {
                if (e.target.classList.contains(type)) {
                  e.target.setCustomValidity(I18n.t('idv.errors.pattern_mismatch.' + I18n.key(type)));
                }
              });
            }
          });
        });
      }
    });
  }
});

},{"classlist.js":31}],8:[function(require,module,exports){
'use strict';

require('classlist.js');

document.addEventListener('DOMContentLoaded', function () {
  var mobileLink = document.querySelector('.i18n-mobile-toggle > a');
  var mobileDropdown = document.querySelector('.i18n-mobile-dropdown');
  var desktopLink = document.querySelector('.i18n-desktop-toggle > a');
  var desktopDropdown = document.querySelector('.i18n-desktop-dropdown');

  function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(function (e) {
      return el.addEventListener(e, fn, false);
    });
  }

  function toggleAriaExpanded(element) {
    if (element.getAttribute('aria-expanded') === 'true') {
      element.setAttribute('aria-expanded', 'false');
    } else {
      element.setAttribute('aria-expanded', 'true');
    }
  }

  function languagePicker(trigger, dropdown) {
    addListenerMulti(trigger, 'click keypress', function (event) {
      var eventType = event.type;

      event.preventDefault();
      if (eventType === 'click' || eventType === 'keypress' && event.which === 13) {
        this.parentNode.classList.toggle('focused');
        dropdown.classList.toggle('display-none');
        toggleAriaExpanded(this);
      }
    });
  }

  if (desktopLink) languagePicker(desktopLink, desktopDropdown);
  if (mobileLink) languagePicker(mobileLink, mobileDropdown);
});

},{"classlist.js":31}],9:[function(require,module,exports){
'use strict';

require('classlist.js');

document.addEventListener('DOMContentLoaded', function () {
  function hideAll(elems) {
    Array.prototype.forEach.call(elems, function (el) {
      el.classList.add('hide');
    });
  }

  function removeError() {
    var errorMessage = document.querySelector('.error-message');

    if (errorMessage) {
      errorMessage.parentNode.classList.remove('has-error');
      errorMessage.parentNode.removeChild(errorMessage);
    }
  }

  function showInput(name) {
    var inputWrappers = document.querySelectorAll('.js-finance-wrapper');
    hideAll(inputWrappers);

    var inputWrapperToShow = document.querySelector('[data-type="' + name + '"]');
    if (inputWrapperToShow) {
      inputWrapperToShow.classList.remove('hide');
    }
  }

  var financeSelect = document.querySelector('.js-finance-choice-select');
  var submitButton = document.querySelector('.js-finance-submit');

  if (financeSelect) {
    var inputWrappers = document.querySelectorAll('.js-finance-wrapper');
    hideAll(inputWrappers);

    showInput(financeSelect.value || 'blank');
    submitButton.disabled = !financeSelect.value;

    financeSelect.addEventListener('change', function () {
      removeError();
      showInput(financeSelect.value || 'blank');
      submitButton.disabled = !financeSelect.value;
    });
  }
});

},{"classlist.js":31}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fieldKit = require('field-kit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @extends DelimitedTextFormatter
 */
var DateFormatter = function (_DelimitedTextFormatt) {
  _inherits(DateFormatter, _DelimitedTextFormatt);

  function DateFormatter() {
    _classCallCheck(this, DateFormatter);

    var _this = _possibleConstructorReturn(this, (DateFormatter.__proto__ || Object.getPrototypeOf(DateFormatter)).call(this, '/'));

    _this.maximumLength = 10;
    return _this;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  /* eslint-disable class-methods-use-this */


  _createClass(DateFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 2 || index === 5;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */

  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (!error) {
        error = function error() {};
      } // eslint-disable-line no-param-reassign

      var isBackspace = change.proposed.text.length < change.current.text.length;
      var newText = change.proposed.text;

      if (change.inserted.text === this.delimiter && change.current.text === '1') {
        newText = '01' + this.delimiter;
      } else if (change.inserted.text === this.delimiter && /^(\d{2})(.)(\d)(.)$/.test(newText)) {
        var lastChar = newText.substr(newText.length - 2);
        newText = newText.slice(0, -2) + '0' + lastChar;
      } else if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
        error('date-formatter.only-digits-allowed');
        return false;
      } else {
        if (isBackspace) {
          if (change.deleted.text === this.delimiter) {
            newText = newText.slice(0, -1);
          }
          if (newText === '0') {
            newText = '';
          }
          if (/^(\d{2})(.)(0)$/.test(newText)) {
            newText = newText.slice(0, -2);
          }
        }

        // prepend month starting with 2-9 with a 0
        if (/^[2-9]$/.test(newText)) {
          newText = '0' + newText;
        }

        // prepend day starting with 4-9 with a 0
        if (/^(\d{2})(.)([4-9])$/.test(newText)) {
          newText = newText.slice(0, -1) + '0' + change.inserted.text;
        }

        // don't allow month over 12
        if (/^1[3-9]$/.test(newText)) {
          error('date-formatter.invalid-month');
          return false;
        }

        // don't allow day over 31
        if (/^(\d{2})(.)(3[2-9])$/.test(newText)) {
          error('date-formatter.invalid-day');
          return false;
        }

        // don't allow 00 as day
        if (newText === '00') {
          error('date-formatter.invalid-month');
          return false;
        }

        // don't allow 00 as month
        if (/^(\d{2})(.)(00)$/.test(newText)) {
          error('date-formatter.invalid-month');
          return false;
        }

        // add delimiter after valid month
        if (/^(0[1-9]|1[0-2])$/.test(newText)) {
          newText += this.delimiter;
        }

        // add delimiter after valid month and day
        if (/^(\d{2})(.)(\d{2})$/.test(newText)) {
          newText += this.delimiter;
        }

        // don't allow year to start with 0 or 3+
        if (/^(\d{2})(.)(\d{2})(.)((0|[3-9]))$/.test(newText)) {
          error('date-formatter.invalid-year');
          return false;
        }

        var match = newText.match(/^(\d{2})(.)(\d{2})(.)(\d{4}).*$/);
        if (match && match[2] === this.delimiter && match[4] === this.delimiter) {
          newText = match[1] + this.delimiter + match[3] + this.delimiter + match[5];
        }
      }

      /* eslint-disable no-param-reassign */
      change.proposed.text = newText;
      change.proposed.selectedRange = { start: newText.length, length: 0 };
      /* eslint-enable no-param-reassign */

      return true;
    }
  }]);

  return DateFormatter;
}(_fieldKit.DelimitedTextFormatter);

exports.default = DateFormatter;

},{"field-kit":91}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fieldKit = require('field-kit');

var _libphonenumberJs = require('libphonenumber-js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fixCountryCodeSpacing = function fixCountryCodeSpacing(text, countryCode) {
  // If the text is `+123456`, make it `+123 456`
  if (text[countryCode.length + 1] !== ' ') {
    return text.replace('+' + countryCode, '+' + countryCode + ' ');
  }
  return text;
};

var getFormattedTextData = function getFormattedTextData(text) {
  if (text === '1') {
    text = '+1';
  }

  var asYouType = new _libphonenumberJs.asYouType('US');
  var formattedText = asYouType.input(text);
  var countryCode = asYouType.country_phone_code;

  if (asYouType.country_phone_code) {
    formattedText = fixCountryCodeSpacing(formattedText, countryCode);
  }

  return {
    text: formattedText,
    template: asYouType.template,
    countryCode: countryCode
  };
};

var cursorPosition = function cursorPosition(formattedTextData) {
  // If the text is `(23 )` the cursor goes after the 3
  var match = formattedTextData.text.match(/\d[^\d]*$/);
  if (match) {
    return match.index + 1;
  }
  return formattedTextData.text.length + 1;
};

var InternationalPhoneFormatter = function (_Formatter) {
  _inherits(InternationalPhoneFormatter, _Formatter);

  function InternationalPhoneFormatter() {
    _classCallCheck(this, InternationalPhoneFormatter);

    return _possibleConstructorReturn(this, (InternationalPhoneFormatter.__proto__ || Object.getPrototypeOf(InternationalPhoneFormatter)).apply(this, arguments));
  }

  _createClass(InternationalPhoneFormatter, [{
    key: 'format',
    value: function format(text) {
      var formattedTextData = getFormattedTextData(text);
      return _get(InternationalPhoneFormatter.prototype.__proto__ || Object.getPrototypeOf(InternationalPhoneFormatter.prototype), 'format', this).call(this, formattedTextData.text);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'parse',
    value: function parse(text) {
      return text.replace(/[^\d+]/g, '');
    }
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      var formattedTextData = getFormattedTextData(change.proposed.text);
      var previousFormattedTextData = getFormattedTextData(change.current.text);

      if (previousFormattedTextData.template && !formattedTextData.template && change.inserted.text.length === 1) {
        return false;
      }

      change.proposed.text = formattedTextData.text;
      change.proposed.selectedRange.start = cursorPosition(formattedTextData);
      return _get(InternationalPhoneFormatter.prototype.__proto__ || Object.getPrototypeOf(InternationalPhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);
    }
  }]);

  return InternationalPhoneFormatter;
}(_fieldKit.Formatter);

exports.default = InternationalPhoneFormatter;

},{"field-kit":91,"libphonenumber-js":101}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fieldKit = require('field-kit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIGITS_PATTERN = /^\d*$/;

var NumericFormatter = function (_Formatter) {
  _inherits(NumericFormatter, _Formatter);

  function NumericFormatter() {
    _classCallCheck(this, NumericFormatter);

    return _possibleConstructorReturn(this, (NumericFormatter.__proto__ || Object.getPrototypeOf(NumericFormatter)).apply(this, arguments));
  }

  _createClass(NumericFormatter, [{
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(NumericFormatter.prototype.__proto__ || Object.getPrototypeOf(NumericFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      }
      return false;
    }
  }]);

  return NumericFormatter;
}(_fieldKit.Formatter);

exports.default = NumericFormatter;

},{"field-kit":91}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fieldKit = require('field-kit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^[a-zA-Z0-9]*$/;

/**
 * @extends DelimitedTextFormatter
 */

var PersonalKeyFormatter = function (_DelimitedTextFormatt) {
  _inherits(PersonalKeyFormatter, _DelimitedTextFormatt);

  function PersonalKeyFormatter() {
    _classCallCheck(this, PersonalKeyFormatter);

    var _this = _possibleConstructorReturn(this, (PersonalKeyFormatter.__proto__ || Object.getPrototypeOf(PersonalKeyFormatter)).call(this, '-', true));

    _this.maximumLength = 16 + 3;
    return _this;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  /* eslint-disable class-methods-use-this */


  _createClass(PersonalKeyFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 4 || index === 9 || index === 14;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */

  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(PersonalKeyFormatter.prototype.__proto__ || Object.getPrototypeOf(PersonalKeyFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      }

      return false;
    }
  }]);

  return PersonalKeyFormatter;
}(_fieldKit.DelimitedTextFormatter);

exports.default = PersonalKeyFormatter;

},{"field-kit":91}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fieldKit = require('field-kit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var USPhoneFormatter = function (_PhoneFormatter) {
  _inherits(USPhoneFormatter, _PhoneFormatter);

  function USPhoneFormatter() {
    _classCallCheck(this, USPhoneFormatter);

    return _possibleConstructorReturn(this, (USPhoneFormatter.__proto__ || Object.getPrototypeOf(USPhoneFormatter)).apply(this, arguments));
  }

  _createClass(USPhoneFormatter, [{
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      var match = change.proposed.text.match(/^\+(\d?)/);
      if (match && match[1] === '') {
        change.proposed.text = '+1';
        change.proposed.selectedRange.start = 4;
      } else if (match && match[1] !== '1') {
        return false;
      }
      return _get(USPhoneFormatter.prototype.__proto__ || Object.getPrototypeOf(USPhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);
    }
  }]);

  return USPhoneFormatter;
}(_fieldKit.PhoneFormatter);

exports.default = USPhoneFormatter;

},{"field-kit":91}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _fieldKit = require('field-kit');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var ZipCodeFormatter = function (_DelimitedTextFormatt) {
  _inherits(ZipCodeFormatter, _DelimitedTextFormatt);

  function ZipCodeFormatter() {
    _classCallCheck(this, ZipCodeFormatter);

    var _this = _possibleConstructorReturn(this, (ZipCodeFormatter.__proto__ || Object.getPrototypeOf(ZipCodeFormatter)).call(this, '-', true));

    _this.maximumLength = 9 + 1;
    return _this;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */
  /* eslint-disable class-methods-use-this */


  _createClass(ZipCodeFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 5;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */

  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(ZipCodeFormatter.prototype.__proto__ || Object.getPrototypeOf(ZipCodeFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      }

      return false;
    }
  }]);

  return ZipCodeFormatter;
}(_fieldKit.DelimitedTextFormatter);

exports.default = ZipCodeFormatter;

},{"field-kit":91}],16:[function(require,module,exports){
'use strict';

var _fieldKit = require('field-kit');

var INTERNATIONAL_CODE_REGEX = /^\+(\d+) |^1 /;

var I18n = window.LoginGov.I18n;
var phoneFormatter = new _fieldKit.PhoneFormatter();

var getPhoneUnsupportedAreaCodeCountry = function getPhoneUnsupportedAreaCodeCountry(areaCode) {
  var form = document.querySelector('[data-international-phone-form]');
  var phoneUnsupportedAreaCodes = JSON.parse(form.dataset.unsupportedAreaCodes);
  return phoneUnsupportedAreaCodes[areaCode];
};

var areaCodeFromUSPhone = function areaCodeFromUSPhone(phone) {
  var digits = phoneFormatter.digitsWithoutCountryCode(phone);
  if (digits.length >= 10) {
    return digits.slice(0, 3);
  }
  return null;
};

var selectedInternationCodeOption = function selectedInternationCodeOption() {
  var dropdown = document.querySelector('[data-international-phone-form] .international-code');
  return dropdown.item(dropdown.selectedIndex);
};

var unsupportedUSPhoneOTPDeliveryWarningMessage = function unsupportedUSPhoneOTPDeliveryWarningMessage(phone) {
  var areaCode = areaCodeFromUSPhone(phone);
  var country = getPhoneUnsupportedAreaCodeCountry(areaCode);
  if (country) {
    var messageTemplate = I18n.t('devise.two_factor_authentication.otp_delivery_preference.phone_unsupported');
    return messageTemplate.replace('%{location}', country);
  }
  return null;
};

var unsupportedInternationalPhoneOTPDeliveryWarningMessage = function unsupportedInternationalPhoneOTPDeliveryWarningMessage() {
  var selectedOption = selectedInternationCodeOption();
  if (selectedOption.dataset.smsOnly === 'true') {
    var messageTemplate = I18n.t('devise.two_factor_authentication.otp_delivery_preference.phone_unsupported');
    return messageTemplate.replace('%{location}', selectedOption.dataset.countryName);
  }
  return null;
};

var unsupportedPhoneOTPDeliveryWarningMessage = function unsupportedPhoneOTPDeliveryWarningMessage(phone) {
  var internationCodeOption = selectedInternationCodeOption();
  if (internationCodeOption.dataset.countryCode === '1') {
    return unsupportedUSPhoneOTPDeliveryWarningMessage(phone);
  }
  return unsupportedInternationalPhoneOTPDeliveryWarningMessage();
};

var updateOTPDeliveryMethods = function updateOTPDeliveryMethods() {
  var phoneRadio = document.querySelector('[data-international-phone-form] .otp_delivery_preference_voice');
  var smsRadio = document.querySelector('[data-international-phone-form] .otp_delivery_preference_sms');

  if (!phoneRadio || !smsRadio) {
    return;
  }

  var phoneInput = document.querySelector('[data-international-phone-form] .phone');
  var phoneLabel = phoneRadio.parentNode.parentNode;
  var deliveryMethodHint = document.querySelector('#otp_delivery_preference_instruction');
  var optPhoneLabelInfo = document.querySelector('#otp_phone_label_info');

  var phone = phoneInput.value;

  var warningMessage = unsupportedPhoneOTPDeliveryWarningMessage(phone);
  if (warningMessage) {
    phoneRadio.disabled = true;
    phoneLabel.classList.add('btn-disabled');
    smsRadio.click();
    deliveryMethodHint.innerText = warningMessage;
    optPhoneLabelInfo.innerText = I18n.t('devise.two_factor_authentication.otp_phone_label_info_modile_only');
  } else {
    phoneRadio.disabled = false;
    phoneLabel.classList.remove('btn-disabled');
    deliveryMethodHint.innerText = I18n.t('devise.two_factor_authentication.otp_delivery_preference.instruction');
    optPhoneLabelInfo.innerText = I18n.t('devise.two_factor_authentication.otp_phone_label_info');
  }
};

var internationalCodeFromPhone = function internationalCodeFromPhone(phone) {
  var match = phone.match(INTERNATIONAL_CODE_REGEX);
  if (match) {
    return match[1] || match[2];
  }
  return '1';
};

var updateInternationalCodeSelection = function updateInternationalCodeSelection() {
  var phoneInput = document.querySelector('[data-international-phone-form] .phone');
  var phone = phoneInput.value;
  var internationalCode = internationalCodeFromPhone(phone);
  var option = document.querySelector('[data-country-code=\'' + internationalCode + '\']');
  if (option) {
    var dropdown = document.querySelector('[data-international-phone-form] .international-code');
    dropdown.value = option.value;
  }
};

var updateInternationalCodeInPhone = function updateInternationalCodeInPhone(phone, newCode) {
  if (phone.match(/^\+[^d+]$/)) {
    phone = phone.replace(/^\+[^d+]$/, '');
  }
  if (phone.match(INTERNATIONAL_CODE_REGEX)) {
    return phone.replace(INTERNATIONAL_CODE_REGEX, '+' + newCode + ' ');
  }
  return '+' + newCode + ' ' + phone;
};

var updateInternationalCodeInput = function updateInternationalCodeInput() {
  var phoneInput = document.querySelector('[data-international-phone-form] .phone');
  var phone = phoneInput.value;
  var inputInternationalCode = internationalCodeFromPhone(phone);
  var selectedInternationalCode = selectedInternationCodeOption().dataset.countryCode;

  if (inputInternationalCode !== selectedInternationalCode) {
    phoneInput.value = updateInternationalCodeInPhone(phone, selectedInternationalCode);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  var phoneInput = document.querySelector('[data-international-phone-form] .phone');
  var codeInput = document.querySelector('[data-international-phone-form] .international-code');
  if (phoneInput) {
    phoneInput.addEventListener('keyup', updateOTPDeliveryMethods);
    phoneInput.addEventListener('keyup', updateInternationalCodeSelection);
  }
  if (codeInput) {
    codeInput.addEventListener('change', updateOTPDeliveryMethods);
    codeInput.addEventListener('change', updateInternationalCodeInput);
    updateOTPDeliveryMethods();
  }
});

},{"field-kit":91}],17:[function(require,module,exports){
'use strict';

var openSystemPrintDialog = function openSystemPrintDialog(event) {
  event.preventDefault();
  window.print();
};

var enablePersonalKeyPrintButton = function enablePersonalKeyPrintButton() {
  var buttonNodes = document.querySelectorAll('[data-print]');
  var buttons = [].slice.call(buttonNodes);

  buttons.forEach(function (button) {
    button.addEventListener('click', openSystemPrintDialog);
  });
};

document.addEventListener('DOMContentLoaded', enablePersonalKeyPrintButton);

},{}],18:[function(require,module,exports){
'use strict';

var I18n = window.LoginGov.I18n;

function togglePw() {
  var inputs = document.querySelectorAll('input[type="password"]');

  if (inputs) {
    [].slice.call(inputs).forEach(function (input, i) {
      input.parentNode.classList.add('relative');

      var el = '\n        <div class="top-n24 right-0 absolute">\n          <label class="btn-border" for="pw-toggle-' + i + '">\n            <div class="checkbox">\n              <input id="pw-toggle-' + i + '" type="checkbox">\n              <span class="indicator"></span>\n              ' + I18n.t('forms.passwords.show') + '\n            </div>\n          </label>\n        </div>';
      input.insertAdjacentHTML('afterend', el);

      var toggle = document.getElementById('pw-toggle-' + i);
      toggle.addEventListener('change', function () {
        input.type = toggle.checked ? 'text' : 'password';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', togglePw);

},{}],19:[function(require,module,exports){
'use strict';

require('classlist.js');

function clearHighlight(name) {
  var radioGroup = document.querySelectorAll('input[name=\'' + name + '\']');

  Array.prototype.forEach.call(radioGroup, function (radio) {
    radio.parentNode.parentNode.classList.remove('bg-light-blue');
  });
}

function highlightRadioBtn() {
  var radios = document.querySelectorAll('.btn-border input[type=radio]');

  if (radios) {
    Array.prototype.forEach.call(radios, function (radio) {
      var label = radio.parentNode.parentNode;
      var name = radio.getAttribute('name');

      if (radio.checked) label.classList.add('bg-light-blue');

      radio.addEventListener('change', function () {
        clearHighlight(name);
        if (radio.checked) label.classList.add('bg-light-blue');
      });

      radio.addEventListener('focus', function () {
        label.classList.add('is-focused');
      });

      radio.addEventListener('blur', function () {
        label.classList.remove('is-focused');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', highlightRadioBtn);

},{"classlist.js":31}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  window.onbeforeunload = null;
  window.onunload = null;
  window.location.href = '/timeout';
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _msFormatter = require('./ms-formatter');

var _msFormatter2 = _interopRequireDefault(_msFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (el) {
  var timeLeft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

  var remaining = timeLeft;

  if (!el || !('innerHTML' in el)) return;

  (function tick() {
    /* eslint-disable no-param-reassign */
    el.innerHTML = (0, _msFormatter2.default)(remaining);

    if (remaining <= 0) {
      return;
    }

    remaining -= interval;
    setTimeout(tick, interval);
  })();
};

},{"./ms-formatter":24}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noOp = function noOp() {};

var Events = function () {
  function Events() {
    _classCallCheck(this, Events);

    this.handlers = {};
  }

  _createClass(Events, [{
    key: 'on',
    value: function on(eventName) {
      var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOp;
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!eventName) return;

      var handlersForEvent = this.handlers[eventName] || [];

      if (!handlersForEvent.filter(function (obj) {
        return obj.handler === handler;
      }).length) {
        handlersForEvent.push({ handler: handler, context: context });
      }

      this.handlers[eventName] = handlersForEvent;
    }
  }, {
    key: 'off',
    value: function off(eventName, handler) {
      var _this = this;

      if (!eventName) {
        Object.keys(this.handlers).forEach(function (name) {
          _this.handlers[name].length = 0;
        });
      } else if (!handler || typeof handler !== 'function') {
        this.handlers[eventName].length = 0;
      } else {
        var handlers = this.handlers[eventName] || [];
        this.handlers[eventName] = handlers.filter(function (obj) {
          return obj.handler !== handler;
        });
      }
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      var handlers = this.handlers[eventName] || [];

      handlers.forEach(function (_ref) {
        var handler = _ref.handler,
            context = _ref.context;
        return handler.apply(context, rest);
      });
    }
  }]);

  return Events;
}();

exports.default = Events;

},{}],23:[function(require,module,exports){
'use strict';

var _autoLogout = require('./auto-logout');

var _autoLogout2 = _interopRequireDefault(_autoLogout);

var _countdownTimer = require('./countdown-timer');

var _countdownTimer2 = _interopRequireDefault(_countdownTimer);

var _msFormatter = require('./ms-formatter');

var _msFormatter2 = _interopRequireDefault(_msFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.LoginGov = window.LoginGov || {};
var LoginGov = window.LoginGov;
var documentElement = window.document.documentElement;

documentElement.className = documentElement.className.replace(/no-js/, '');

LoginGov.autoLogout = _autoLogout2.default;
LoginGov.countdownTimer = _countdownTimer2.default;
LoginGov.msFormatter = _msFormatter2.default;

},{"./auto-logout":20,"./countdown-timer":21,"./ms-formatter":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function formatMinutes(minutes) {
  return minutes || 0;
}

function formatSeconds(seconds) {
  return seconds < 10 ? "0" + seconds : seconds;
}

exports.default = function (milliseconds) {
  var seconds = milliseconds / 1000;
  var minutes = parseInt(seconds / 60, 10);
  var remainingSeconds = parseInt(seconds % 60, 10);

  var displayMinutes = formatMinutes(minutes);
  var displaySeconds = formatSeconds(remainingSeconds);

  return displayMinutes + ":" + displaySeconds;
};

},{}],25:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":32}],26:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":33}],27:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":34}],28:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],29:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":27}],30:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":26}],31:[function(require,module,exports){
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		if (ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

}


},{}],32:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":85,"../modules/es6.string.iterator":89,"../modules/web.dom.iterable":90}],33:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":41,"../../modules/es6.object.assign":87}],34:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":41,"../../modules/es6.object.define-property":88}],35:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],36:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],37:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":55}],38:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":76,"./_to-iobject":78,"./_to-length":79}],39:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":40,"./_wks":83}],40:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],41:[function(require,module,exports){
var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],42:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":35}],43:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],44:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":48}],45:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":49,"./_is-object":55}],46:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],47:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":41,"./_ctx":42,"./_global":49,"./_hide":51}],48:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],49:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],50:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],51:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":44,"./_object-dp":63,"./_property-desc":70}],52:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":49}],53:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":44,"./_dom-create":45,"./_fails":48}],54:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":40}],55:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],56:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":51,"./_object-create":62,"./_property-desc":70,"./_set-to-string-tag":72,"./_wks":83}],57:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":47,"./_has":50,"./_hide":51,"./_iter-create":56,"./_iterators":59,"./_library":60,"./_object-gpo":66,"./_redefine":71,"./_set-to-string-tag":72,"./_wks":83}],58:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],59:[function(require,module,exports){
module.exports = {};

},{}],60:[function(require,module,exports){
module.exports = true;

},{}],61:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":48,"./_iobject":54,"./_object-gops":65,"./_object-keys":68,"./_object-pie":69,"./_to-object":80}],62:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":37,"./_dom-create":45,"./_enum-bug-keys":46,"./_html":52,"./_object-dps":64,"./_shared-key":73}],63:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":37,"./_descriptors":44,"./_ie8-dom-define":53,"./_to-primitive":81}],64:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":37,"./_descriptors":44,"./_object-dp":63,"./_object-keys":68}],65:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],66:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":50,"./_shared-key":73,"./_to-object":80}],67:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":38,"./_has":50,"./_shared-key":73,"./_to-iobject":78}],68:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":46,"./_object-keys-internal":67}],69:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],70:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],71:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":51}],72:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":50,"./_object-dp":63,"./_wks":83}],73:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":74,"./_uid":82}],74:[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":49}],75:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":43,"./_to-integer":77}],76:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":77}],77:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],78:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":43,"./_iobject":54}],79:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":77}],80:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":43}],81:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":55}],82:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],83:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":49,"./_shared":74,"./_uid":82}],84:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":39,"./_core":41,"./_iterators":59,"./_wks":83}],85:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":37,"./_core":41,"./core.get-iterator-method":84}],86:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":36,"./_iter-define":57,"./_iter-step":58,"./_iterators":59,"./_to-iobject":78}],87:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":47,"./_object-assign":61}],88:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":44,"./_export":47,"./_object-dp":63}],89:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":57,"./_string-at":75}],90:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":49,"./_hide":51,"./_iterators":59,"./_wks":83,"./es6.array.iterator":86}],91:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FieldKit = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(_dereq_,module,exports){
(function (process){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('InputSim', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.InputSim = mod.exports;
  }
})(this, function (exports) {
  /*! jshint esnext:true, undef:true, unused:true */

  /** @private */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var A = 65;
  /** @private */
  var Y = 89;
  /** @private */
  var Z = 90;
  /** @private */
  var ZERO = 48;
  /** @private */
  var NINE = 57;
  /** @private */
  var LEFT = 37;
  /** @private */
  var RIGHT = 39;
  /** @private */
  var UP = 38;
  /** @private */
  var DOWN = 40;
  /** @private */
  var BACKSPACE = 8;
  /** @private */
  var DELETE = 46;
  /** @private */
  var TAB = 9;
  /** @private */
  var ENTER = 13;

  /**
   * @namespace KEYS
   */
  var KEYS = {
    A: A,
    Y: Y,
    Z: Z,
    ZERO: ZERO,
    NINE: NINE,
    LEFT: LEFT,
    RIGHT: RIGHT,
    UP: UP,
    DOWN: DOWN,
    BACKSPACE: BACKSPACE,
    DELETE: DELETE,
    TAB: TAB,
    ENTER: ENTER,

    /**
     * @param {number} keyCode
     * @returns {boolean}
     */
    isDigit: function isDigit(keyCode) {
      return ZERO <= keyCode && keyCode <= NINE;
    },

    /**
     * Is an arrow keyCode.
     *
     * @param {number} keyCode
     * @returns {boolean}
     */
    isDirectional: function isDirectional(keyCode) {
      return keyCode === LEFT || keyCode === RIGHT || keyCode === UP || keyCode === DOWN;
    }
  };

  var CTRL = 1 << 0;
  var META = 1 << 1;
  var ALT = 1 << 2;
  var SHIFT = 1 << 3;

  var cache = {};

  /**
   * Builds a BindingSet based on the current platform.
   *
   * @param {string} platform A string name of a platform (e.g. "OSX").
   * @returns {BindingSet} keybindings appropriate for the given platform.
   */
  function keyBindingsForPlatform(platform) {
    var osx = platform === 'OSX';
    var ctrl = osx ? META : CTRL;

    if (!cache[platform]) {
      cache[platform] = build(function (bind) {
        bind(A, ctrl, 'selectAll');
        bind(LEFT, null, 'moveLeft');
        bind(LEFT, ALT, 'moveWordLeft');
        bind(LEFT, SHIFT, 'moveLeftAndModifySelection');
        bind(LEFT, ALT | SHIFT, 'moveWordLeftAndModifySelection');
        bind(RIGHT, null, 'moveRight');
        bind(RIGHT, ALT, 'moveWordRight');
        bind(RIGHT, SHIFT, 'moveRightAndModifySelection');
        bind(RIGHT, ALT | SHIFT, 'moveWordRightAndModifySelection');
        bind(UP, null, 'moveUp');
        bind(UP, ALT, 'moveToBeginningOfParagraph');
        bind(UP, SHIFT, 'moveUpAndModifySelection');
        bind(UP, ALT | SHIFT, 'moveParagraphBackwardAndModifySelection');
        bind(DOWN, null, 'moveDown');
        bind(DOWN, ALT, 'moveToEndOfParagraph');
        bind(DOWN, SHIFT, 'moveDownAndModifySelection');
        bind(DOWN, ALT | SHIFT, 'moveParagraphForwardAndModifySelection');
        bind(BACKSPACE, null, 'deleteBackward');
        bind(BACKSPACE, SHIFT, 'deleteBackward');
        bind(BACKSPACE, ALT, 'deleteWordBackward');
        bind(BACKSPACE, ALT | SHIFT, 'deleteWordBackward');
        bind(BACKSPACE, ctrl, 'deleteBackwardToBeginningOfLine');
        bind(BACKSPACE, ctrl | SHIFT, 'deleteBackwardToBeginningOfLine');
        bind(DELETE, null, 'deleteForward');
        bind(DELETE, ALT, 'deleteWordForward');
        bind(TAB, null, 'insertTab');
        bind(TAB, SHIFT, 'insertBackTab');
        bind(ENTER, null, 'insertNewline');
        bind(Z, ctrl, 'undo');

        if (osx) {
          bind(LEFT, META, 'moveToBeginningOfLine');
          bind(LEFT, META | SHIFT, 'moveToBeginningOfLineAndModifySelection');
          bind(RIGHT, META, 'moveToEndOfLine');
          bind(RIGHT, META | SHIFT, 'moveToEndOfLineAndModifySelection');
          bind(UP, META, 'moveToBeginningOfDocument');
          bind(UP, META | SHIFT, 'moveToBeginningOfDocumentAndModifySelection');
          bind(DOWN, META, 'moveToEndOfDocument');
          bind(DOWN, META | SHIFT, 'moveToEndOfDocumentAndModifySelection');
          bind(BACKSPACE, CTRL, 'deleteBackwardByDecomposingPreviousCharacter');
          bind(BACKSPACE, CTRL | SHIFT, 'deleteBackwardByDecomposingPreviousCharacter');
          bind(Z, META | SHIFT, 'redo');
        } else {
          bind(Y, CTRL, 'redo');
        }
      });
    }

    return cache[platform];
  }

  function build(callback) {
    var result = new BindingSet();
    callback(function () {
      return result.bind.apply(result, arguments);
    });
    return result;
  }

  /**
   * @private
   */

  var BindingSet = (function () {
    function BindingSet() {
      _classCallCheck(this, BindingSet);

      this.bindings = {};
    }

    /**
     * Enum for text direction affinity.
     *
     * @const
     * @enum {number}
     * @private
     */

    /**
     * @param {number} keyCode
     * @param {number} modifiers
     * @param {string} action
     */

    _createClass(BindingSet, [{
      key: 'bind',
      value: function bind(keyCode, modifiers, action) {
        if (!this.bindings[keyCode]) {
          this.bindings[keyCode] = {};
        }
        this.bindings[keyCode][modifiers || 0] = action;
      }

      /**
       * @param {Event} event
       * @returns {?string}
       */
    }, {
      key: 'actionForEvent',
      value: function actionForEvent(event) {
        var bindingsForKeyCode = this.bindings[event.keyCode];
        if (bindingsForKeyCode) {
          var modifiers = 0;
          if (event.altKey) {
            modifiers |= ALT;
          }
          if (event.ctrlKey) {
            modifiers |= CTRL;
          }
          if (event.metaKey) {
            modifiers |= META;
          }
          if (event.shiftKey) {
            modifiers |= SHIFT;
          }
          return bindingsForKeyCode[modifiers];
        }
      }
    }]);

    return BindingSet;
  })();

  var Affinity = {
    UPSTREAM: 0,
    DOWNSTREAM: 1,
    NONE: null
  };

  /**
   * Tests is string passed in is a single word.
   *
   * @param {string} chr
   * @returns {boolean}
   * @private
   */
  function isWordChar(chr) {
    return chr && /^\w$/.test(chr);
  }

  /**
   * Checks if char to the left of {index} in {string}
   * is a break (non-char).
   *
   * @param {string} text
   * @param {number} index
   * @returns {boolean}
   * @private
   */
  function hasLeftWordBreakAtIndex(text, index) {
    if (index === 0) {
      return true;
    } else {
      return !isWordChar(text[index - 1]) && isWordChar(text[index]);
    }
  }

  /**
   * Checks if char to the right of {index} in {string}
   * is a break (non-char).
   *
   * @param {string} text
   * @param {number} index
   * @returns {boolean}
   * @private
   */
  function hasRightWordBreakAtIndex(text, index) {
    if (index === text.length - 1) {
      return true;
    } else {
      return isWordChar(text[index]) && !isWordChar(text[index + 1]);
    }
  }

  var Input = (function () {
    /**
      * Sets up the initial properties of the TextField and
      * sets  up the event listeners
      *
      * @param {string} value
      * @param {Object} range ({start: 0, length: 0})
      */

    function Input(value, range) {
      _classCallCheck(this, Input);

      this._value = '';
      this._selectedRange = {
        start: 0,
        length: 0
      };
      this.shouldCancelEvents = true;
      this.selectionAffinity = Affinity.NONE;

      if (value) {
        this.setText(value);
      }
      if (range) {
        this.setSelectedRange(range);
      }
      this._buildKeybindings();
    }

    /**
     * Clears all characters in the existing selection.
     *
     * @example
     *     // 12|34567|8
     *     clearSelection();
     *     // 12|8
     *
     */

    _createClass(Input, [{
      key: 'clearSelection',
      value: function clearSelection() {
        this.replaceSelection('');
      }

      /**
       * Deletes backward one character or clears a non-empty selection.
       *
       * @example
       *
       *     // |What's up, doc?
       *     deleteBackward(event);
       *     // |What's up, doc?
       *
       *     // What'|s up, doc?
       *     deleteBackward(event);
       *     // What|s up, doc?
       *
       *     // |What's| up, doc?
       *     deleteBackward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteBackward',
      value: function deleteBackward(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length === 0) {
          range.start--;
          range.length++;
          this.setSelectedRange(range);
        }
        this.clearSelection();
      }

      /**
       * Deletes backward one word or clears a non-empty selection.
       *
       * @example
       *     // |What's up, doc?
       *     deleteWordBackward(event);
       *     // |What's up, doc?
       *
       *     // What'|s up, doc?
       *     deleteWordBackward(event);
       *     // |s up, doc?
       *
       *     // |What's| up, doc?
       *     deleteWordBackward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteWordBackward',
      value: function deleteWordBackward(event) {
        if (this.hasSelection()) {
          this.deleteBackward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          var start = this._lastWordBreakBeforeIndex(range.start);
          range.length += range.start - start;
          range.start = start;
          this.setSelectedRange(range);
          this.clearSelection();
        }
      }

      /**
       * Deletes backward one character, clears a non-empty selection, or decomposes
       * an accented character to its simple form.
       *
       * @TODO Make this work as described.
       *
       * @example
       *     // |fiancée
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // |What's up, doc?
       *
       *     // fianc|é|e
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // fianc|e
       *
       *     // fiancé|e
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // fiance|e
       *
       */
    }, {
      key: 'deleteBackwardByDecomposingPreviousCharacter',
      value: function deleteBackwardByDecomposingPreviousCharacter(event) {
        this.deleteBackward(event);
      }

      /**
       * Deletes all characters before the cursor or clears a non-empty selection.
       *
       * @example
       *     // The quick |brown fox.
       *     deleteBackwardToBeginningOfLine(event);
       *     // |brown fox.
       *
       *     // The |quick |brown fox.
       *     deleteBackwardToBeginningOfLine(event);
       *     // The brown fox.
       *
       */
    }, {
      key: 'deleteBackwardToBeginningOfLine',
      value: function deleteBackwardToBeginningOfLine(event) {
        if (this.hasSelection()) {
          this.deleteBackward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          range.length = range.start;
          range.start = 0;
          this.setSelectedRange(range);
          this.clearSelection();
        }
      }

      /**
       * Deletes forward one character or clears a non-empty selection.
       *
       * @example
       *     // What's up, doc?|
       *     deleteForward(event);
       *     // What's up, doc?|
       *
       *     // What'|s up, doc?
       *     deleteForward(event);
       *     // What'| up, doc?
       *
       *     // |What's| up, doc?
       *     deleteForward(event);
       *     // | up, doc?
       *
       */
    }, {
      key: 'deleteForward',
      value: function deleteForward(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length === 0) {
          range.length++;
          this.setSelectedRange(range);
        }
        this.clearSelection();
      }

      /**
       * Deletes forward one word or clears a non-empty selection.
       *
       * @example
       *     // What's up, doc?|
       *     deleteWordForward(event);
       *     // What's up, doc?|
       *
       *     // What's |up, doc?
       *     deleteWordForward(event);
       *     // What's |, doc?
       *
       *     // |What's| up, doc?
       *     deleteWordForward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteWordForward',
      value: function deleteWordForward(event) {
        if (this.hasSelection()) {
          return this.deleteForward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          var end = this._nextWordBreakAfterIndex(range.start + range.length);
          this.setSelectedRange({
            start: range.start,
            length: end - range.start
          });
          this.clearSelection();
        }
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(event) {
        if (typeof event === 'undefined') {
          throw new Error('cannot handle and event that isn\'t passed');
        }
        var action = this._bindings.actionForEvent(event);
        if (action) this[action](event);
        return action;
      }

      /**
       * Determines whether this field has any selection.
       *
       * @returns {boolean} true if there is at least one character selected
       */
    }, {
      key: 'hasSelection',
      value: function hasSelection() {
        return this.selectedRange().length !== 0;
      }

      /**
       * Handles the back tab key.
       *
       */
    }, {
      key: 'insertBackTab',
      value: function insertBackTab() {}

      /**
       * Handles a key event could be trying to end editing.
       *
       */
    }, {
      key: 'insertNewline',
      value: function insertNewline() {}

      /**
       * Handles the tab key.
       *
       */
    }, {
      key: 'insertTab',
      value: function insertTab() {}

      /**
       * Handles a event that is trying to insert a character.
       *
       * @param {string} text
       */
    }, {
      key: 'insertText',
      value: function insertText(text) {
        var range;
        if (this.hasSelection()) {
          this.clearSelection();
        }

        this.replaceSelection(text);
        range = this.selectedRange();
        range.start += range.length;
        range.length = 0;
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor up, which because this is a single-line text field, means
       * moving to the beginning of the value.
       *
       * @example
       *     // Hey guys|
       *     moveUp(event);
       *     // |Hey guys
       *
       *     // Hey |guys|
       *     moveUp(event);
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveUp',
      value: function moveUp(event) {
        this._handleEvent(event);
        this.setSelectedRange({
          start: 0,
          length: 0
        });
      }

      /**
       * Moves the cursor up to the beginning of the current paragraph, which because
       * this is a single-line text field, means moving to the beginning of the
       * value.
       *
       * @example
       *     // Hey guys|
       *     moveToBeginningOfParagraph(event)
       *     // |Hey guys
       *
       *     // Hey |guys|
       *     moveToBeginningOfParagraph(event)
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfParagraph',
      value: function moveToBeginningOfParagraph(event) {
        this.moveUp(event);
      }

      /**
       * Moves the cursor up, keeping the current anchor point and extending the
       * selection to the beginning as moveUp would.
       *
       * @example
       *     // rightward selections are shrunk
       *     // Hey guys, |where> are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, |where are you?
       *
       *     // leftward selections are extended
       *     // Hey guys, <where| are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, where| are you?
       *
       *     // neutral selections are extended
       *     // Hey guys, |where| are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, where| are you?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveUpAndModifySelection',
      value: function moveUpAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            // 12<34 56|78  =>  <1234 56|78
            range.length += range.start;
            range.start = 0;
            break;
          case Affinity.DOWNSTREAM:
            // 12|34 56>78   =>   <12|34 5678
            range.length = range.start;
            range.start = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the free end of the selection to the beginning of the paragraph, or
       * since this is a single-line text field to the beginning of the line.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveParagraphBackwardAndModifySelection',
      value: function moveParagraphBackwardAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            // 12<34 56|78  =>  <1234 56|78
            range.length += range.start;
            range.start = 0;
            break;
          case Affinity.DOWNSTREAM:
            // 12|34 56>78  =>  12|34 5678
            range.length = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor to the beginning of the document.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfDocument',
      value: function moveToBeginningOfDocument(event) {
        // Since we only support a single line this is just an alias.
        this.moveToBeginningOfLine(event);
      }

      /**
       * Moves the selection start to the beginning of the document.
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfDocumentAndModifySelection',
      value: function moveToBeginningOfDocumentAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length += range.start;
        range.start = 0;
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor down, which because this is a single-line text field, means
       * moving to the end of the value.
       *
       * @example
       *     // Hey |guys
       *     moveDown(event)
       *     // Hey guys|
       *
       *     // |Hey| guys
       *     moveDown(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveDown',
      value: function moveDown(event) {
        this._handleEvent(event);
        // 12|34 56|78  =>  1234 5678|
        var range = {
          start: this.text().length,
          length: 0
        };
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the cursor up to the end of the current paragraph, which because this
       * is a single-line text field, means moving to the end of the value.
       *
       * @example
       *     // |Hey guys
       *     moveToEndOfParagraph(event)
       *     // Hey guys|
       *
       *     // Hey |guys|
       *     moveToEndOfParagraph(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfParagraph',
      value: function moveToEndOfParagraph(event) {
        this.moveDown(event);
      }

      /**
       * Moves the cursor down, keeping the current anchor point and extending the
       * selection to the end as moveDown would.
       *
       * @example
       *     // leftward selections are shrunk
       *     // Hey guys, <where| are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, where| are you?>
       *
       *     // rightward selections are extended
       *     // Hey guys, |where> are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, |where are you?>
       *
       *     // neutral selections are extended
       *     // Hey guys, |where| are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, |where are you?>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveDownAndModifySelection',
      value: function moveDownAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var end = this.text().length;
        if (this.selectionAffinity === Affinity.UPSTREAM) {
          range.start += range.length;
        }
        range.length = end - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the free end of the selection to the end of the paragraph, or since
       * this is a single-line text field to the end of the line.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveParagraphForwardAndModifySelection',
      value: function moveParagraphForwardAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            // 12|34 56>78  =>  12|34 5678>
            range.length = this.text().length - range.start;
            break;
          case Affinity.UPSTREAM:
            // 12<34 56|78  =>  12|34 5678
            range.start += range.length;
            range.length = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the cursor to the end of the document.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfDocument',
      value: function moveToEndOfDocument(event) {
        // Since we only support a single line this is just an alias.
        this.moveToEndOfLine(event);
      }

      /**
       * Moves the selection end to the end of the document.
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfDocumentAndModifySelection',
      value: function moveToEndOfDocumentAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length = this.text().length - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the cursor to the left, counting selections as a thing to move past.
       *
       * @example
       *     // no selection just moves the cursor left
       *     // Hey guys|
       *     moveLeft(event)
       *     // Hey guy|s
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveLeft(event)
       *     // Hey |guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveLeft',
      value: function moveLeft(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length !== 0) {
          range.length = 0;
        } else {
          range.start--;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the free end of the selection one to the left.
       *
       * @example
       *     // no selection just selects to the left
       *     // Hey guys|
       *     moveLeftAndModifySelection(event)
       *     // Hey guy<s|
       *
       *     // left selections are extended
       *     // Hey <guys|
       *     moveLeftAndModifySelection(event)
       *     // Hey< guys|
       *
       *     // right selections are shrunk
       *     // Hey |guys>
       *     moveLeftAndModifySelection(event)
       *     // Hey |guy>s
       *
       *     // neutral selections are extended
       *     // Hey |guys|
       *     moveLeftAndModifySelection(event)
       *     //Hey< guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveLeftAndModifySelection',
      value: function moveLeftAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.UPSTREAM;
            range.start--;
            range.length++;
            break;
          case Affinity.DOWNSTREAM:
            range.length--;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor left until the start of a word is found.
       *
       * @example
       *     // no selection just moves the cursor left
       *     // Hey guys|
       *     moveWordLeft(event)
       *     // Hey |guys
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveWordLeft(event)
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordLeft',
      value: function moveWordLeft(event) {
        this._handleEvent(event);
        var index = this._lastWordBreakBeforeIndex(this.selectedRange().start - 1);
        this.setSelectedRange({ start: index, length: 0 });
      }

      /**
       * Moves the free end of the current selection to the beginning of the previous
       * word.
       *
       * @example
       *     // no selection just selects to the left
       *     // Hey guys|
       *     moveWordLeftAndModifySelection(event)
       *     // Hey <guys|
       *
       *     // left selections are extended
       *     // Hey <guys|
       *     moveWordLeftAndModifySelection(event)
       *     // <Hey guys|
       *
       *     // right selections are shrunk
       *     // |Hey guys>
       *     moveWordLeftAndModifySelection(event)
       *     // |Hey >guys
       *
       *     // neutral selections are extended
       *     // Hey |guys|
       *     moveWordLeftAndModifySelection(event)
       *     // <Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordLeftAndModifySelection',
      value: function moveWordLeftAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.UPSTREAM;
            var start = this._lastWordBreakBeforeIndex(range.start - 1);
            range.length += range.start - start;
            range.start = start;
            break;
          case Affinity.DOWNSTREAM:
            var end = this._lastWordBreakBeforeIndex(range.start + range.length);
            if (end < range.start) {
              end = range.start;
            }
            range.length -= range.start + range.length - end;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor to the beginning of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToBeginningOfLine(event)
       *     // |Hey guys, where are ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfLine',
      value: function moveToBeginningOfLine(event) {
        this._handleEvent(event);
        this.setSelectedRange({ start: 0, length: 0 });
      }

      /**
       * Select from the free end of the selection to the beginning of line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToBeginningOfLineAndModifySelection(event)
       *     // <Hey guys, where| are ya?
       *
       *     // Hey guys, where| are> ya?
       *     moveToBeginningOfLineAndModifySelection(event)
       *     // <Hey guys, where are| ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfLineAndModifySelection',
      value: function moveToBeginningOfLineAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length += range.start;
        range.start = 0;
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor to the right, counting selections as a thing to move past.
       *
       * @example
       *     // no selection just moves the cursor right
       *     // Hey guy|s
       *     moveRight(event)
       *     // Hey guys|
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveRight(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveRight',
      value: function moveRight(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length !== 0) {
          range.start += range.length;
          range.length = 0;
        } else {
          range.start++;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the free end of the selection one to the right.
       *
       * @example
       *     // no selection just selects to the right
       *     // Hey |guys
       *     moveRightAndModifySelection(event)
       *     // Hey |g>uys
       *
       *     // right selections are extended
       *     // Hey |gu>ys
       *     moveRightAndModifySelection(event)
       *     // Hey |guy>s
       *
       *     // left selections are shrunk
       *     // <Hey |guys
       *     moveRightAndModifySelection(event)
       *     // H<ey |guys
       *
       *     // neutral selections are extended
       *     // |Hey| guys
       *     moveRightAndModifySelection(event)
       *     // |Hey >guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveRightAndModifySelection',
      value: function moveRightAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            range.start++;
            range.length--;
            break;
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.DOWNSTREAM;
            range.length++;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor right until the end of a word is found.
       *
       * @example
       *     // no selection just moves the cursor right
       *     // Hey| guys
       *     moveWordRight(event)
       *     // Hey guys|
       *
       *     // selections are removed
       *     // |Hey| guys
       *     moveWordRight(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordRight',
      value: function moveWordRight(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var index = this._nextWordBreakAfterIndex(range.start + range.length);
        this.setSelectedRange({ start: index, length: 0 });
      }

      /**
       * Moves the free end of the current selection to the next end of word.
       *
       * @example
       *     // no selection just selects to the right
       *     // Hey |guys
       *     moveWordRightAndModifySelection(event)
       *     // Hey |guys|
       *
       *     // right selections are extended
       *     // Hey |g>uys
       *     moveWordRightAndModifySelection(event)
       *     // Hey |guys>
       *
       *     // left selections are shrunk
       *     // He<y |guys
       *     moveWordRightAndModifySelection(event)
       *     // Hey< |guys
       *
       *     // neutral selections are extended
       *     // He|y |guys
       *     moveWordRightAndModifySelection(event)
       *     // He|y guys>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordRightAndModifySelection',
      value: function moveWordRightAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var start = range.start;
        var end = range.start + range.length;
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            start = Math.min(this._nextWordBreakAfterIndex(start), end);
            break;
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.DOWNSTREAM;
            end = this._nextWordBreakAfterIndex(range.start + range.length);
            break;
        }
        this.setSelectedRange({ start: start, length: end - start });
      }

      /**
       * Moves the cursor to the end of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToEndOfLine(event)
       *     // |Hey guys, where are ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfLine',
      value: function moveToEndOfLine(event) {
        this._handleEvent(event);
        this.setSelectedRange({ start: this.text().length, length: 0 });
      }

      /**
       * Moves the free end of the selection to the end of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToEndOfLineAndModifySelection(event)
       *     // Hey guys, where| are ya?>
       *
       *     // Hey guys, <where| are ya?
       *     moveToEndOfLineAndModifySelection(event)
       *     // Hey guys, |where are ya?>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfLineAndModifySelection',
      value: function moveToEndOfLineAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length = this.text().length - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Replaces the characters within the selection with given text.
       *
       * @example
       *     // 12|34567|8
       *     replaceSelection('00')
       *     // 12|00|8
       *
       * @param {string} replacement
       */
    }, {
      key: 'replaceSelection',
      value: function replaceSelection(replacement) {
        var range = this.selectedRange();
        var end = range.start + range.length;
        var text = this.text();
        text = text.substring(0, range.start) + replacement + text.substring(end);
        range.length = replacement.length;
        this.setText(text);
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Find ends of 'words' for navigational purposes.
       *
       * @example
       *     // given value of '123456789' and text of '123-45-6789'
       *     rightWordBreakIndexes()
       *     //=> [3, 5, 9]
       *
       * @returns {number[]}
       */
    }, {
      key: 'rightWordBreakIndexes',
      value: function rightWordBreakIndexes() {
        var result = [];
        var text = this.text();
        for (var i = 0, l = text.length; i < l; i++) {
          if (hasRightWordBreakAtIndex(text, i)) {
            result.push(i + 1);
          }
        }
        return result;
      }

      /**
       * Expands the selection to contain all the characters in the content.
       *
       * @example
       *     // 123|45678
       *     selectAll(event)
       *     // |12345678|
       *
       * @param {Event} event
       */
    }, {
      key: 'selectAll',
      value: function selectAll(event) {
        this._handleEvent(event);
        this.setSelectedRangeWithAffinity({
          start: 0,
          length: this.text().length
        }, Affinity.NONE);
      }

      /**
       * Gets the object value. This is the value that should be considered the
       * 'real' value of the field.
       *
       * @returns {String}
       */
    }, {
      key: 'text',
      value: function text() {
        return this._value;
      }

      /**
       * Sets the object value of the field.
       *
       * @param {string} value
       */
    }, {
      key: 'setText',
      value: function setText(value) {
        this._value = '' + value;
        this.setSelectedRange({
          start: this._value.length,
          length: 0
        });
      }

      /**
       * Gets the range of the current selection.
       *
       * @returns {Object} {start: number, length: number}
       */
    }, {
      key: 'selectedRange',
      value: function selectedRange() {
        return this._selectedRange;
      }

      /**
       * Sets the range of the current selection without changing the affinity.
       * @param {Object} range ({start: 0, length: 0})
       */
    }, {
      key: 'setSelectedRange',
      value: function setSelectedRange(range) {
        this.setSelectedRangeWithAffinity(range, this.selectionAffinity);
      }

      /**
       * Sets the range of the current selection and the selection affinity.
       *
       * @param {Object} range {start: number, length: number}
       * @param {Affinity} affinity
       * @returns {Object} {start: 0, length: 0}
       */
    }, {
      key: 'setSelectedRangeWithAffinity',
      value: function setSelectedRangeWithAffinity(range, affinity) {
        var min = 0;
        var max = this.text().length;
        var caret = {
          start: Math.max(min, Math.min(max, range.start)),
          end: Math.max(min, Math.min(max, range.start + range.length))
        };
        this._selectedRange = {
          start: caret.start,
          length: caret.end - caret.start
        };
        this.selectionAffinity = range.length === 0 ? Affinity.NONE : affinity;
        return this._selectedRange;
      }

      /**
       * Gets the position of the current selection's anchor point, i.e. the point
       * that the selection extends from, if any.
       *
       * @returns {number}
       */
    }, {
      key: 'selectionAnchor',
      value: function selectionAnchor() {
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            return range.start + range.length;
          case Affinity.DOWNSTREAM:
            return range.start;
          default:
            return Affinity.NONE;
        }
      }

      /**
       * Builds the key bindings for platform
       *
       * @TODO: Make this better
       * @private
       */
    }, {
      key: '_buildKeybindings',
      value: function _buildKeybindings() {
        var osx;

        if (typeof navigator !== 'undefined') {
          osx = /^Mozilla\/[\d\.]+ \(Macintosh/.test(navigator.userAgent);
        } else if (typeof process !== 'undefined') {
          osx = /darwin/.test(process.platform);
        }
        this._bindings = keyBindingsForPlatform(osx ? 'OSX' : 'Default');
      }

      /**
       * Handles the event based on the `shouldCancelEvents` prop.
       *
       * @param {Event} event
       * @private
       */
    }, {
      key: '_handleEvent',
      value: function _handleEvent(event) {
        if (event && this.shouldCancelEvents) {
          event.preventDefault();
        }
      }

      /**
       * Finds the start of the 'word' before index.
       *
       * @param {number} index position at which to start looking
       * @returns {number} index in value less than or equal to the given index
       * @private
       */
    }, {
      key: '_lastWordBreakBeforeIndex',
      value: function _lastWordBreakBeforeIndex(index) {
        var indexes = this._leftWordBreakIndexes();
        var result = indexes[0];
        for (var i = 0, l = indexes.length; i < l; i++) {
          var wordBreakIndex = indexes[i];
          if (index > wordBreakIndex) {
            result = wordBreakIndex;
          } else {
            break;
          }
        }
        return result;
      }

      /**
       * Find starts of 'words' for navigational purposes.
       *
       * @example
       *     // given value of '123456789' and text of '123-45-6789'
       *     leftWordBreakIndexes()
       *     // => [0, 3, 5]
       *
       * @returns {number[]} indexes in value of word starts.
       * @private
       */
    }, {
      key: '_leftWordBreakIndexes',
      value: function _leftWordBreakIndexes() {
        var result = [];
        var text = this.text();
        for (var i = 0, l = text.length; i < l; i++) {
          if (hasLeftWordBreakAtIndex(text, i)) {
            result.push(i);
          }
        }
        return result;
      }

      /**
       * Finds the end of the 'word' after index.
       *
       * @param {number} index position in value at which to start looking.
       * @returns {number}
       * @private
       */
    }, {
      key: '_nextWordBreakAfterIndex',
      value: function _nextWordBreakAfterIndex(index) {
        var indexes = this.rightWordBreakIndexes().reverse();
        var result = indexes[0];
        for (var i = 0, l = indexes.length; i < l; i++) {
          var wordBreakIndex = indexes[i];
          if (index < wordBreakIndex) {
            result = wordBreakIndex;
          } else {
            break;
          }
        }
        return result;
      }
    }]);

    return Input;
  })();

  exports.Input = Input;
  exports.KEYS = KEYS;
  exports.keyBindingsForPlatform = keyBindingsForPlatform;
});


}).call(this,_dereq_('_process'))
},{"_process":1}],3:[function(_dereq_,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('stround', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.stround = mod.exports;
  }
})(this, function (exports) {
  /* jshint sub:true, esnext:true, undef:true, unused:true */

  /**
   * Enum for the available rounding modes.
   *
   * @enum {number}
   */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.parse = parse;
  exports.format = format;
  exports.shiftParts = shiftParts;
  exports.shift = shift;
  exports.round = round;
  var modes = {
    CEILING: 0,
    FLOOR: 1,
    DOWN: 2,
    UP: 3,
    HALF_EVEN: 4,
    HALF_DOWN: 5,
    HALF_UP: 6
  };

  exports.modes = modes;
  /**
   * @const
   * @private
   */
  var NEG = '-';

  /**
   * @const
   * @private
   */
  var SEP = '.';

  /**
   * @const
   * @private
   */
  var NEG_PATTERN = '-';

  /**
   * @const
   * @private
   */
  var SEP_PATTERN = '\\.';

  /**
   * @const
   * @private
   */
  var NUMBER_PATTERN = new RegExp('^(' + NEG_PATTERN + ')?(\\d*)(?:' + SEP_PATTERN + '(\\d*))?$');

  /**
   * Increments the given integer represented by a string by one.
   *
   * @example
   *
   *   increment('1');  // '2'
   *   increment('99'); // '100'
   *   increment('');   // '1'
   *
   * @param {string} strint
   * @return {string}
   * @private
   */
  function increment(strint) {
    var length = strint.length;

    if (length === 0) {
      return '1';
    }

    var last = parseInt(strint[length - 1], 10);

    if (last === 9) {
      return increment(strint.slice(0, length - 1)) + '0';
    } else {
      return strint.slice(0, length - 1) + (last + 1);
    }
  }

  /**
   * Parses the given decimal string into its component parts.
   *
   * @example
   *
   *   stround.parse('3.14');  // [false, '3', '14']
   *   stround.parse('-3.45'); // [true, '3', '45']
   *
   * @param {string} strnum
   * @return {?Array}
   */

  function parse(strnum) {
    switch (strnum) {
      case 'NaN':case 'Infinity':case '-Infinity':
        return null;
    }

    var match = strnum.match(NUMBER_PATTERN);

    if (!match) {
      throw new Error('cannot round malformed number: ' + strnum);
    }

    return [match[1] !== undefined, match[2], match[3] || ''];
  }

  /**
   * Format the given number configuration as a number string.
   *
   * @example
   *
   *   stround.format([false, '12', '34']); // '12.34'
   *   stround.format([true, '8', '']);     // '-8'
   *   stround.format([true, '', '7']);     // '-0.7'
   *
   * @param {Array} parts
   * @return {string}
   */

  function format(_ref) {
    var _ref2 = _slicedToArray(_ref, 3);

    var negative = _ref2[0];
    var intPart = _ref2[1];
    var fracPart = _ref2[2];

    if (intPart.length === 0) {
      intPart = '0';
    } else {
      var firstNonZeroIndex = undefined;
      for (firstNonZeroIndex = 0; firstNonZeroIndex < intPart.length; firstNonZeroIndex++) {
        if (intPart[firstNonZeroIndex] !== '0') {
          break;
        }
      }

      if (firstNonZeroIndex !== intPart.length) {
        intPart = intPart.slice(firstNonZeroIndex);
      }
    }

    return (negative ? NEG + intPart : intPart) + (fracPart.length ? SEP + fracPart : '');
  }

  /**
   * Shift the exponent of the given number (in parts) by the given amount.
   *
   * @example
   *
   *   stround.shiftParts([false, '12', ''], 2);  // [false, '1200', '']
   *   stround.shiftParts([false, '12', ''], -2); // [false, '', '12']
   *
   * @param {Array} parts
   * @param {number} exponent
   * @return {Array}
   */

  function shiftParts(_ref3, exponent) {
    var _ref32 = _slicedToArray(_ref3, 3);

    var negative = _ref32[0];
    var intPart = _ref32[1];
    var fracPart = _ref32[2];

    var partToMove = undefined;

    if (exponent > 0) {
      partToMove = fracPart.slice(0, exponent);
      while (partToMove.length < exponent) {
        partToMove += '0';
      }
      intPart += partToMove;
      fracPart = fracPart.slice(exponent);
    } else if (exponent < 0) {
      while (intPart.length < -exponent) {
        intPart = '0' + intPart;
      }
      partToMove = intPart.slice(intPart.length + exponent);
      fracPart = partToMove + fracPart;
      intPart = intPart.slice(0, intPart.length - partToMove.length);
    }

    return [negative, intPart, fracPart];
  }

  /**
   * Shift the exponent of the given number (as a string) by the given amount.
   *
   *   shift('12', 2);  // '1200'
   *   shift('12', -2); // '0.12'
   *
   * @param {string|number} strnum
   * @param {number} exponent
   * @return {string}
   */

  function shift(strnum, exponent) {
    if (typeof strnum === 'number') {
      strnum = '' + strnum;
    }

    var parsed = parse(strnum);
    if (parsed === null) {
      return strnum;
    } else {
      return format(shiftParts(parsed, exponent));
    }
  }

  /**
   * Round the given number represented by a string according to the given
   * precision and mode.
   *
   * @param {string|number} strnum
   * @param {number|null|undefined=} precision
   * @param {modes=} mode
   * @return {string}
   */

  function round(strnum, precision, mode) {
    if (typeof strnum === 'number') {
      strnum = '' + strnum;
    }

    if (typeof strnum !== 'string') {
      throw new Error('expected a string or number, got: ' + strnum);
    }

    if (strnum.length === 0) {
      return strnum;
    }

    if (precision === null || precision === undefined) {
      precision = 0;
    }

    if (mode === undefined) {
      mode = modes.HALF_EVEN;
    }

    var parsed = parse(strnum);

    if (parsed === null) {
      return strnum;
    }

    if (precision > 0) {
      parsed = shiftParts(parsed, precision);
    }

    var _parsed = parsed;

    var _parsed2 = _slicedToArray(_parsed, 3);

    var negative = _parsed2[0];
    var intPart = _parsed2[1];
    var fracPart = _parsed2[2];

    switch (mode) {
      case modes.CEILING:case modes.FLOOR:case modes.UP:
        var foundNonZeroDigit = false;
        for (var i = 0, _length = fracPart.length; i < _length; i++) {
          if (fracPart[i] !== '0') {
            foundNonZeroDigit = true;
            break;
          }
        }
        if (foundNonZeroDigit) {
          if (mode === modes.UP || negative !== (mode === modes.CEILING)) {
            intPart = increment(intPart);
          }
        }
        break;

      case modes.HALF_EVEN:case modes.HALF_DOWN:case modes.HALF_UP:
        var shouldRoundUp = false;
        var firstFracPartDigit = parseInt(fracPart[0], 10);

        if (firstFracPartDigit > 5) {
          shouldRoundUp = true;
        } else if (firstFracPartDigit === 5) {
          if (mode === modes.HALF_UP) {
            shouldRoundUp = true;
          }

          if (!shouldRoundUp) {
            for (var i = 1, _length2 = fracPart.length; i < _length2; i++) {
              if (fracPart[i] !== '0') {
                shouldRoundUp = true;
                break;
              }
            }
          }

          if (!shouldRoundUp && mode === modes.HALF_EVEN) {
            var lastIntPartDigit = parseInt(intPart[intPart.length - 1], 10);
            shouldRoundUp = lastIntPartDigit % 2 !== 0;
          }
        }

        if (shouldRoundUp) {
          intPart = increment(intPart);
        }
        break;
    }

    return format(shiftParts([negative, intPart, ''], -precision));
  }
});

},{}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _amex_card_formatter = _dereq_('./amex_card_formatter');

var _amex_card_formatter2 = _interopRequireDefault(_amex_card_formatter);

var _default_card_formatter = _dereq_('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

var _card_utils = _dereq_('./card_utils');

/**
 * AdaptiveCardFormatter will decide if it needs to use
 * {@link AmexCardFormatter} or {@link DefaultCardFormatter}.
 */

var AdaptiveCardFormatter = (function () {
  function AdaptiveCardFormatter() {
    _classCallCheck(this, AdaptiveCardFormatter);

    /** @private */
    this.amexCardFormatter = new _amex_card_formatter2['default']();
    /** @private */
    this.defaultCardFormatter = new _default_card_formatter2['default']();
    /** @private */
    this.formatter = this.defaultCardFormatter;
  }

  /**
   * Will pick the right formatter based on the `pan` and will return the
   * formatted string.
   *
   * @param {string} pan
   * @returns {string} formatted string
   */

  _createClass(AdaptiveCardFormatter, [{
    key: 'format',
    value: function format(pan) {
      return this._formatterForPan(pan).format(pan);
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      return this.formatter.parse(text, error);
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(!string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      this.formatter = this._formatterForPan(change.proposed.text);
      return this.formatter.isChangeValid(change, error);
    }

    /**
     * Decides which formatter to use.
     *
     * @param {string} pan
     * @returns {Formatter}
     * @private
     */
  }, {
    key: '_formatterForPan',
    value: function _formatterForPan(pan) {
      if ((0, _card_utils.determineCardType)(pan.replace(/[^\d]+/g, '')) === _card_utils.AMEX) {
        return this.amexCardFormatter;
      } else {
        return this.defaultCardFormatter;
      }
    }
  }]);

  return AdaptiveCardFormatter;
})();

exports['default'] = AdaptiveCardFormatter;
module.exports = exports['default'];

},{"./amex_card_formatter":5,"./card_utils":7,"./default_card_formatter":9}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default_card_formatter = _dereq_('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

/**
 * Amex credit card formatter.
 *
 * @extends DefaultCardFormatter
 */

var AmexCardFormatter = (function (_DefaultCardFormatter) {
  _inherits(AmexCardFormatter, _DefaultCardFormatter);

  function AmexCardFormatter() {
    _classCallCheck(this, AmexCardFormatter);

    _get(Object.getPrototypeOf(AmexCardFormatter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AmexCardFormatter, [{
    key: 'hasDelimiterAtIndex',

    /**
     * @override
     */
    value: function hasDelimiterAtIndex(index) {
      return index === 4 || index === 11;
    }

    /**
     * @override
     */
  }, {
    key: 'maximumLength',
    get: function get() {
      return 15 + 2;
    }
  }]);

  return AmexCardFormatter;
})(_default_card_formatter2['default']);

exports['default'] = AmexCardFormatter;
module.exports = exports['default'];

},{"./default_card_formatter":9}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _text_field = _dereq_('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _adaptive_card_formatter = _dereq_('./adaptive_card_formatter');

var _adaptive_card_formatter2 = _interopRequireDefault(_adaptive_card_formatter);

var _card_utils = _dereq_('./card_utils');

/**
 * Enum for card mask strategies.
 *
 * @readonly
 * @enum {number}
 * @private
 */
var CardMaskStrategy = {
  None: 'None',
  DoneEditing: 'DoneEditing'
};

/**
 * CardTextField add some functionality for credit card inputs
 *
 * @extends TextField
 */

var CardTextField = (function (_TextField) {
  _inherits(CardTextField, _TextField);

  /**
   * @param {HTMLElement} element
   */

  function CardTextField(element) {
    _classCallCheck(this, CardTextField);

    _get(Object.getPrototypeOf(CardTextField.prototype), 'constructor', this).call(this, element, new _adaptive_card_formatter2['default']());
    this.setCardMaskStrategy(CardMaskStrategy.None);

    /**
     * Whether we are currently masking the displayed text.
     *
     * @private
     */
    this._masked = false;

    /**
     * Whether we are currently editing.
     *
     * @private
     */
    this._editing = false;
  }

  /**
   * Gets the card type for the current value.
   *
   * @returns {string} Returns one of 'visa', 'mastercard', 'amex' and 'discover'.
   */

  _createClass(CardTextField, [{
    key: 'cardType',
    value: function cardType() {
      return (0, _card_utils.determineCardType)(this.value());
    }

    /**
     * Gets the type of masking this field uses.
     *
     * @returns {CardMaskStrategy}
     */
  }, {
    key: 'cardMaskStrategy',
    value: function cardMaskStrategy() {
      return this._cardMaskStrategy;
    }

    /**
     * Sets the type of masking this field uses.
     *
     * @param {CardMaskStrategy} cardMaskStrategy One of CardMaskStrategy.
     */
  }, {
    key: 'setCardMaskStrategy',
    value: function setCardMaskStrategy(cardMaskStrategy) {
      if (cardMaskStrategy !== this._cardMaskStrategy) {
        this._cardMaskStrategy = cardMaskStrategy;
        this._syncMask();
      }
    }

    /**
     * Returns a masked version of the current formatted PAN. Example:
     *
     * @example
     *     field.setText('4111 1111 1111 1111');
     *     field.cardMask(); // "•••• •••• •••• 1111"
     *
     * @returns {string} Returns a masked card string.
     */
  }, {
    key: 'cardMask',
    value: function cardMask() {
      var text = this.text();
      var last4 = text.slice(-4);
      var toMask = text.slice(0, -4);

      return toMask.replace(/\d/g, '•') + last4;
    }

    /**
     * Gets the formatted PAN for this field.
     *
     * @returns {string}
     */
  }, {
    key: 'text',
    value: function text() {
      if (this._masked) {
        return this._unmaskedText;
      } else {
        return _get(Object.getPrototypeOf(CardTextField.prototype), 'text', this).call(this);
      }
    }

    /**
     * Sets the formatted PAN for this field.
     *
     * @param {string} text A formatted PAN.
     */
  }, {
    key: 'setText',
    value: function setText(text) {
      if (this._masked) {
        this._unmaskedText = text;
        text = this.cardMask();
      }
      _get(Object.getPrototypeOf(CardTextField.prototype), 'setText', this).call(this, text);
    }

    /**
     * Called by our superclass, used to implement card masking.
     *
     * @private
     */
  }, {
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {
      this._editing = false;
      this._syncMask();
    }

    /**
     * Called by our superclass, used to implement card masking.
     *
     * @private
     */
  }, {
    key: 'textFieldDidBeginEditing',
    value: function textFieldDidBeginEditing() {
      this._editing = true;
      this._syncMask();
    }

    /**
     * Enables masking if it is not already enabled.
     *
     * @private
     */
  }, {
    key: '_enableMasking',
    value: function _enableMasking() {
      if (!this._masked) {
        this._unmaskedText = this.text();
        this._masked = true;
        this.setText(this._unmaskedText);
      }
    }

    /**
     * Disables masking if it is currently enabled.
     *
     * @private
     */
  }, {
    key: '_disableMasking',
    value: function _disableMasking() {
      if (this._masked) {
        this._masked = false;
        this.setText(this._unmaskedText);
        this._unmaskedText = null;
      }
    }

    /**
     * Enables or disables masking based on the mask settings.
     *
     * @private
     */
  }, {
    key: '_syncMask',
    value: function _syncMask() {
      if (this.cardMaskStrategy() === CardMaskStrategy.DoneEditing) {
        if (this._editing) {
          this._disableMasking();
        } else {
          this._enableMasking();
        }
      }
    }

    /**
     * Enum for card mask strategies.
     *
     * @readonly
     * @enum {number}
     */
  }], [{
    key: 'CardMaskStrategy',
    get: function get() {
      return CardMaskStrategy;
    }
  }]);

  return CardTextField;
})(_text_field2['default']);

exports['default'] = CardTextField;
module.exports = exports['default'];

},{"./adaptive_card_formatter":4,"./card_utils":7,"./text_field":20}],7:[function(_dereq_,module,exports){
/**
 * @TODO Make this an enum
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.determineCardType = determineCardType;
exports.luhnCheck = luhnCheck;
exports.validCardLength = validCardLength;
var AMEX = 'amex';
exports.AMEX = AMEX;
var DISCOVER = 'discover';
exports.DISCOVER = DISCOVER;
var JCB = 'jcb';
exports.JCB = JCB;
var MASTERCARD = 'mastercard';
exports.MASTERCARD = MASTERCARD;
var VISA = 'visa';

exports.VISA = VISA;
/**
 * Pass in a credit card number and it'll return the
 * type of card it is.
 *
 * @param {string} pan
 * @returns {?string} returns the type of card based in the digits
 */

function determineCardType(pan) {
  if (pan === null || pan === undefined) {
    return null;
  }

  pan = pan.toString();
  var firsttwo = parseInt(pan.slice(0, 2), 10);
  var iin = parseInt(pan.slice(0, 6), 10);
  var halfiin = parseInt(pan.slice(0, 3), 10);

  if (pan[0] === '4') {
    return VISA;
  } else if (pan.slice(0, 4) === '6011' || firsttwo === 65 || halfiin >= 664 && halfiin <= 649 || iin >= 622126 && iin <= 622925) {
    return DISCOVER;
  } else if (pan.slice(0, 4) === '2131' || pan.slice(0, 4) === '1800' || firsttwo === 35) {
    return JCB;
  } else if (firsttwo >= 51 && firsttwo <= 55) {
    return MASTERCARD;
  } else if (firsttwo === 34 || firsttwo === 37) {
    return AMEX;
  }
}

/**
 * Pass in a credit card number and it'll return if it
 * passes the [luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm)
 *
 * @param {string} pan
 * @returns {boolean}
 */

function luhnCheck(pan) {
  var sum = 0;
  var flip = true;
  for (var i = pan.length - 1; i >= 0; i--) {
    var digit = parseInt(pan.charAt(i), 10);
    sum += (flip = !flip) ? Math.floor(digit * 2 / 10) + Math.floor(digit * 2 % 10) : digit;
  }

  return sum % 10 === 0;
}

/**
 * Pass in a credit card number and it'll return if it
 * is a valid length for that type. If it doesn't know the
 * type it'll return false
 *
 * @param {string} pan
 * @returns {boolean}
 */

function validCardLength(pan) {
  switch (determineCardType(pan)) {
    case VISA:
      return pan.length === 13 || pan.length === 16;
    case DISCOVER:case MASTERCARD:
      return pan.length === 16;
    case JCB:
      return pan.length === 15 || pan.length === 16;
    case AMEX:
      return pan.length === 15;
    default:
      return false;
  }
}

},{}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = installCaret;

function installCaret() {
  var _document = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

  var getCaret = undefined;
  var setCaret = undefined;

  if (!_document) {
    throw new Error('Caret does not have access to document');
  } else if ('selectionStart' in _document.createElement('input')) {
    getCaret = function (element) {
      return {
        start: element.selectionStart,
        end: element.selectionEnd
      };
    };
    setCaret = function (element, start, end) {
      element.selectionStart = start;
      element.selectionEnd = end;
    };
  } else if (_document.selection) {
    getCaret = function (element) {
      var selection = _document.selection;
      var value = element.value;
      var range = selection.createRange().duplicate();

      range.moveEnd('character', value.length);

      var start = range.text === '' ? value.length : value.lastIndexOf(range.text);
      range = selection.createRange().duplicate();

      range.moveStart('character', -value.length);

      var end = range.text.length;
      return { start: start, end: end };
    };
    setCaret = function (element, start, end) {
      var range = element.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    };
  } else {
    throw new Error('Caret unknown input selection capabilities');
  }

  return { getCaret: getCaret, setCaret: setCaret };
}

;
module.exports = exports['default'];

},{}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _card_utils = _dereq_('./card_utils');

/**
 * A generic credit card formatter.
 *
 * @extends DelimitedTextFormatter
 */

var DefaultCardFormatter = (function (_DelimitedTextFormatter) {
  _inherits(DefaultCardFormatter, _DelimitedTextFormatter);

  function DefaultCardFormatter() {
    _classCallCheck(this, DefaultCardFormatter);

    _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), 'constructor', this).call(this, ' ');
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(DefaultCardFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 4 || index === 9 || index === 14;
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      var value = this._valueFromText(text);
      if (typeof error === 'function') {
        if (!(0, _card_utils.validCardLength)(value)) {
          error('card-formatter.number-too-short');
        }
        if (!(0, _card_utils.luhnCheck)(value)) {
          error('card-formatter.invalid-number');
        }
      }
      return _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), 'parse', this).call(this, text, error);
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     * @private
     */
  }, {
    key: '_valueFromText',
    value: function _valueFromText(text) {
      return _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), '_valueFromText', this).call(this, (text || '').replace(/[^\d]/g, ''));
    }

    /**
     * Gets the maximum length of a formatted default card number.
     *
     * @returns {number}
     */
  }, {
    key: 'maximumLength',
    get: function get() {
      return 16 + 3;
    }
  }]);

  return DefaultCardFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = DefaultCardFormatter;
module.exports = exports['default'];

},{"./card_utils":7,"./delimited_text_formatter":10}],10:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = _dereq_('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

/**
 * A generic delimited formatter.
 *
 * @extends Formatter
 */

var DelimitedTextFormatter = (function (_Formatter) {
  _inherits(DelimitedTextFormatter, _Formatter);

  /**
   * @param {string=} delimiter
   * @param {boolean=} isLazy
   * @throws {Error} delimiter must have just one character
   */

  function DelimitedTextFormatter(delimiter) {
    var isLazy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, DelimitedTextFormatter);

    _get(Object.getPrototypeOf(DelimitedTextFormatter.prototype), 'constructor', this).call(this);

    if (arguments.length === 0) {
      return;
    }

    if (delimiter === null || delimiter === undefined || delimiter.length !== 1) {
      throw new Error('delimiter must have just one character');
    }
    this.delimiter = delimiter;

    // If the formatter is lazy, delimiter will not be added until input has gone
    // past the delimiter index. Useful for 'optional' extension, like zip codes.
    // 94103  ->  type '1'  ->  94103-1
    this.isLazy = isLazy;
  }

  /**
   * Determines the delimiter character at the given index.
   *
   * @param {number} index
   * @returns {?string}
   */

  _createClass(DelimitedTextFormatter, [{
    key: 'delimiterAt',
    value: function delimiterAt(index) {
      if (!this.hasDelimiterAtIndex(index)) {
        return null;
      }
      return this.delimiter;
    }

    /**
     * Determines whether the given character is a delimiter.
     *
     * @param {string} chr
     * @returns {boolean}
     */
  }, {
    key: 'isDelimiter',
    value: function isDelimiter(chr) {
      return chr === this.delimiter;
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      return this._textFromValue(value);
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     * @private
     */
  }, {
    key: '_textFromValue',
    value: function _textFromValue(value) {
      if (!value) {
        return '';
      }

      var result = '';
      var delimiter = undefined;
      var maximumLength = this.maximumLength;

      for (var i = 0, l = value.length; i < l; i++) {
        while (delimiter = this.delimiterAt(result.length)) {
          result += delimiter;
        }
        result += value[i];
        if (!this.isLazy) {
          while (delimiter = this.delimiterAt(result.length)) {
            result += delimiter;
          }
        }
      }

      if (maximumLength !== undefined && maximumLength !== null) {
        return result.slice(0, maximumLength);
      } else {
        return result;
      }
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     */
  }, {
    key: 'parse',
    value: function parse(text) {
      return this._valueFromText(text);
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     * @private
     */
  }, {
    key: '_valueFromText',
    value: function _valueFromText(text) {
      if (!text) {
        return '';
      }
      var result = '';
      for (var i = 0, l = text.length; i < l; i++) {
        if (!this.isDelimiter(text[i])) {
          result += text[i];
        }
      }
      return result;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (!_get(Object.getPrototypeOf(DelimitedTextFormatter.prototype), 'isChangeValid', this).call(this, change, error)) {
        return false;
      }

      var newText = change.proposed.text;
      var range = change.proposed.selectedRange;
      var hasSelection = range.length !== 0;

      var startMovedLeft = range.start < change.current.selectedRange.start;
      var startMovedRight = range.start > change.current.selectedRange.start;
      var endMovedLeft = range.start + range.length < change.current.selectedRange.start + change.current.selectedRange.length;
      var endMovedRight = range.start + range.length > change.current.selectedRange.start + change.current.selectedRange.length;

      var startMovedOverADelimiter = startMovedLeft && this.hasDelimiterAtIndex(range.start) || startMovedRight && this.hasDelimiterAtIndex(range.start - 1);
      var endMovedOverADelimiter = endMovedLeft && this.hasDelimiterAtIndex(range.start + range.length) || endMovedRight && this.hasDelimiterAtIndex(range.start + range.length - 1);

      if (this.isDelimiter(change.deleted.text)) {
        var newCursorPosition = change.deleted.start - 1;
        // delete any immediately preceding delimiters
        while (this.isDelimiter(newText.charAt(newCursorPosition))) {
          newText = newText.substring(0, newCursorPosition) + newText.substring(newCursorPosition + 1);
          newCursorPosition--;
        }
        // finally delete the real character that was intended
        newText = newText.substring(0, newCursorPosition) + newText.substring(newCursorPosition + 1);
      }

      // adjust the cursor / selection
      if (startMovedLeft && startMovedOverADelimiter) {
        // move left over any immediately preceding delimiters
        while (this.delimiterAt(range.start - 1)) {
          range.start--;
          range.length++;
        }
        // finally move left over the real intended character
        range.start--;
        range.length++;
      }

      if (startMovedRight) {
        // move right over any delimiters found on the way, including any leading delimiters
        for (var i = change.current.selectedRange.start; i < range.start + range.length; i++) {
          if (this.delimiterAt(i)) {
            range.start++;
            if (range.length > 0) {
              range.length--;
            }
          }
        }

        while (this.delimiterAt(range.start)) {
          range.start++;
          range.length--;
        }
      }

      if (hasSelection) {
        // Otherwise, the logic for the range start takes care of everything.
        if (endMovedOverADelimiter) {
          if (endMovedLeft) {
            // move left over any immediately preceding delimiters
            while (this.delimiterAt(range.start + range.length - 1)) {
              range.length--;
            }
            // finally move left over the real intended character
            range.length--;
          }

          if (endMovedRight) {
            // move right over any immediately following delimiters
            while (this.delimiterAt(range.start + range.length)) {
              range.length++;
            }
            // finally move right over the real intended character
            range.length++;
          }
        }

        // trailing delimiters in the selection
        while (this.hasDelimiterAtIndex(range.start + range.length - 1)) {
          if (startMovedLeft || endMovedLeft) {
            range.length--;
          } else {
            range.length++;
          }
        }

        while (this.hasDelimiterAtIndex(range.start)) {
          if (startMovedRight || endMovedRight) {
            range.start++;
            range.length--;
          } else {
            range.start--;
            range.length++;
          }
        }
      } else {
        range.length = 0;
      }

      var result = true;

      var value = this._valueFromText(newText, function () {
        result = false;
        error.apply(undefined, arguments);
      });

      if (result) {
        change.proposed.text = this._textFromValue(value);
      }

      return result;
    }
  }]);

  return DelimitedTextFormatter;
})(_formatter2['default']);

exports['default'] = DelimitedTextFormatter;
module.exports = exports['default'];

},{"./formatter":14}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var EmployerIdentificationNumberFormatter = (function (_DelimitedTextFormatter) {
  _inherits(EmployerIdentificationNumberFormatter, _DelimitedTextFormatter);

  function EmployerIdentificationNumberFormatter() {
    _classCallCheck(this, EmployerIdentificationNumberFormatter);

    _get(Object.getPrototypeOf(EmployerIdentificationNumberFormatter.prototype), 'constructor', this).call(this, '-');
    this.maximumLength = 9 + 1;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(EmployerIdentificationNumberFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 2;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(Object.getPrototypeOf(EmployerIdentificationNumberFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }
  }]);

  return EmployerIdentificationNumberFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = EmployerIdentificationNumberFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],12:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _text_field = _dereq_('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _expiry_date_formatter = _dereq_('./expiry_date_formatter');

var _expiry_date_formatter2 = _interopRequireDefault(_expiry_date_formatter);

/**
 * Adds a default formatter for expiration dates.
 *
 * @extends TextField
 */

var ExpiryDateField = (function (_TextField) {
  _inherits(ExpiryDateField, _TextField);

  /**
   * @param {HTMLElement} element
   */

  function ExpiryDateField(element) {
    _classCallCheck(this, ExpiryDateField);

    _get(Object.getPrototypeOf(ExpiryDateField.prototype), 'constructor', this).call(this, element, new _expiry_date_formatter2['default']());
  }

  /**
   * Called by our superclass, used to post-process the text.
   *
   * @private
   */

  _createClass(ExpiryDateField, [{
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {
      var value = this.value();
      if (value) {
        this.setText(this.formatter().format(value));
      }
    }
  }]);

  return ExpiryDateField;
})(_text_field2['default']);

exports['default'] = ExpiryDateField;
module.exports = exports['default'];

},{"./expiry_date_formatter":13,"./text_field":20}],13:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _utils = _dereq_('./utils');

/**
 * Give this function a 2 digit year it'll return with 4.
 *
 * @example
 *     interpretTwoDigitYear(15);
 *     // => 2015
 *     interpretTwoDigitYear(97);
 *     // => 1997
 * @param {number} year
 * @returns {number}
 * @private
 */
function interpretTwoDigitYear(year) {
  var thisYear = new Date().getFullYear();
  var thisCentury = thisYear - thisYear % 100;
  var centuries = [thisCentury, thisCentury - 100, thisCentury + 100].sort(function (a, b) {
    return Math.abs(thisYear - (year + a)) - Math.abs(thisYear - (year + b));
  });
  return year + centuries[0];
}

/**
 * @extends DelimitedTextFormatter
 */

var ExpiryDateFormatter = (function (_DelimitedTextFormatter) {
  _inherits(ExpiryDateFormatter, _DelimitedTextFormatter);

  function ExpiryDateFormatter() {
    _classCallCheck(this, ExpiryDateFormatter);

    _get(Object.getPrototypeOf(ExpiryDateFormatter.prototype), 'constructor', this).call(this, '/');
    this.maximumLength = 5;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(ExpiryDateFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 2;
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      if (!value) {
        return '';
      }

      var month = value.month;
      var year = value.year;

      year = year % 100;

      return _get(Object.getPrototypeOf(ExpiryDateFormatter.prototype), 'format', this).call(this, (0, _utils.zpad2)(month) + (0, _utils.zpad2)(year));
    }

    /**
     * Parses the given text
     *
     * @param {string} text
     * @param {Function(string)} error
     * @returns {?Object} { month: month, year: year }
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      var monthAndYear = text.split(this.delimiter);
      var month = monthAndYear[0];
      var year = monthAndYear[1];
      if (month && month.match(/^(0?[1-9]|1\d)$/) && year && year.match(/^\d\d?$/)) {
        month = Number(month);
        year = interpretTwoDigitYear(Number(year));
        return { month: month, year: year };
      } else {
        if (typeof error === 'function') {
          error('expiry-date-formatter.invalid-date');
        }
        return null;
      }
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (!error) {
        error = function () {};
      }

      var isBackspace = change.proposed.text.length < change.current.text.length;
      var newText = change.proposed.text;

      if (change.inserted.text === this.delimiter && change.current.text === '1') {
        newText = '01' + this.delimiter;
      } else if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
        error('expiry-date-formatter.only-digits-allowed');
        return false;
      } else {
        if (isBackspace) {
          if (change.deleted.text === this.delimiter) {
            newText = newText[0];
          }
          if (newText === '0') {
            newText = '';
          }
          if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
            error('expiry-date-formatter.only-digits-allowed');
            return false;
          }
        }

        // 4| -> 04|
        if (/^[2-9]$/.test(newText)) {
          newText = '0' + newText;
        }

        // 1|1|/5 -> 11|/5
        if (/^1[3-9].+$/.test(newText)) {
          error('expiry-date-formatter.invalid-month');
          return false;
        }

        // 15| -> 01/5|
        if (/^1[3-9]$/.test(newText)) {
          newText = '01' + this.delimiter + newText.slice(-1);
        }

        // Don't allow 00
        if (newText === '00') {
          error('expiry-date-formatter.invalid-month');
          return false;
        }

        // 11| -> 11/
        if (/^(0[1-9]|1[0-2])$/.test(newText)) {
          newText += this.delimiter;
        }

        var match = newText.match(/^(\d\d)(.)(\d\d?).*$/);
        if (match && match[2] === this.delimiter) {
          newText = match[1] + this.delimiter + match[3];
        }
      }

      change.proposed.text = newText;
      change.proposed.selectedRange = { start: newText.length, length: 0 };

      return true;
    }
  }]);

  return ExpiryDateFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = ExpiryDateFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10,"./utils":22}],14:[function(_dereq_,module,exports){
/**
 * Base class providing basic formatting, parsing, and change validation to be
 * customized in subclasses.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Formatter = (function () {
  function Formatter() {
    _classCallCheck(this, Formatter);
  }

  _createClass(Formatter, [{
    key: 'format',

    /**
     * @param {string} text
     * @returns {string}
     */
    value: function format(text) {
      if (text === undefined || text === null) {
        text = '';
      }
      if (this.maximumLength !== undefined && this.maximumLength !== null) {
        text = text.substring(0, this.maximumLength);
      }
      return text;
    }

    /**
     * @param {string} text
     * @returns {string}
     */
  }, {
    key: 'parse',
    value: function parse(text) {
      if (text === undefined || text === null) {
        text = '';
      }
      if (this.maximumLength !== undefined && this.maximumLength !== null) {
        text = text.substring(0, this.maximumLength);
      }
      return text;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change) {
      var selectedRange = change.proposed.selectedRange;
      var text = change.proposed.text;
      if (this.maximumLength !== undefined && this.maximumLength !== null && text.length > this.maximumLength) {
        var available = this.maximumLength - (text.length - change.inserted.text.length);
        var newText = change.current.text.substring(0, change.current.selectedRange.start);
        if (available > 0) {
          newText += change.inserted.text.substring(0, available);
        }
        newText += change.current.text.substring(change.current.selectedRange.start + change.current.selectedRange.length);
        var truncatedLength = text.length - newText.length;
        change.proposed.text = newText;
        selectedRange.start -= truncatedLength;
      }
      return true;
    }
  }]);

  return Formatter;
})();

exports['default'] = Formatter;
module.exports = exports['default'];

},{}],15:[function(_dereq_,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _adaptive_card_formatter = _dereq_('./adaptive_card_formatter');

var _adaptive_card_formatter2 = _interopRequireDefault(_adaptive_card_formatter);

var _amex_card_formatter = _dereq_('./amex_card_formatter');

var _amex_card_formatter2 = _interopRequireDefault(_amex_card_formatter);

var _card_text_field = _dereq_('./card_text_field');

var _card_text_field2 = _interopRequireDefault(_card_text_field);

var _card_utils = _dereq_('./card_utils');

var _default_card_formatter = _dereq_('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _employer_identification_number_formatter = _dereq_('./employer_identification_number_formatter');

var _employer_identification_number_formatter2 = _interopRequireDefault(_employer_identification_number_formatter);

var _expiry_date_field = _dereq_('./expiry_date_field');

var _expiry_date_field2 = _interopRequireDefault(_expiry_date_field);

var _expiry_date_formatter = _dereq_('./expiry_date_formatter');

var _expiry_date_formatter2 = _interopRequireDefault(_expiry_date_formatter);

var _formatter = _dereq_('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _number_formatter = _dereq_('./number_formatter');

var _number_formatter2 = _interopRequireDefault(_number_formatter);

var _number_formatter_settings_formatter = _dereq_('./number_formatter_settings_formatter');

var _number_formatter_settings_formatter2 = _interopRequireDefault(_number_formatter_settings_formatter);

var _phone_formatter = _dereq_('./phone_formatter');

var _phone_formatter2 = _interopRequireDefault(_phone_formatter);

var _social_security_number_formatter = _dereq_('./social_security_number_formatter');

var _social_security_number_formatter2 = _interopRequireDefault(_social_security_number_formatter);

var _text_field = _dereq_('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _undo_manager = _dereq_('./undo_manager');

var _undo_manager2 = _interopRequireDefault(_undo_manager);

/**
 * @namespace FieldKit
 * @readonly
 */
module.exports = {
  AdaptiveCardFormatter: _adaptive_card_formatter2['default'],
  AmexCardFormatter: _amex_card_formatter2['default'],
  CardTextField: _card_text_field2['default'],
  CardUtils: {
    AMEX: _card_utils.AMEX,
    DISCOVER: _card_utils.DISCOVER,
    VISA: _card_utils.VISA,
    MASTERCARD: _card_utils.MASTERCARD,
    determineCardType: _card_utils.determineCardType,
    luhnCheck: _card_utils.luhnCheck,
    validCardLength: _card_utils.validCardLength
  },
  DefaultCardFormatter: _default_card_formatter2['default'],
  DelimitedTextFormatter: _delimited_text_formatter2['default'],
  EmployerIdentificationNumberFormatter: _employer_identification_number_formatter2['default'],
  ExpiryDateField: _expiry_date_field2['default'],
  ExpiryDateFormatter: _expiry_date_formatter2['default'],
  Formatter: _formatter2['default'],
  NumberFormatter: _number_formatter2['default'],
  NumberFormatterSettingsFormatter: _number_formatter_settings_formatter2['default'],
  PhoneFormatter: _phone_formatter2['default'],
  SocialSecurityNumberFormatter: _social_security_number_formatter2['default'],
  TextField: _text_field2['default'],
  UndoManager: _undo_manager2['default']
};

},{"./adaptive_card_formatter":4,"./amex_card_formatter":5,"./card_text_field":6,"./card_utils":7,"./default_card_formatter":9,"./delimited_text_formatter":10,"./employer_identification_number_formatter":11,"./expiry_date_field":12,"./expiry_date_formatter":13,"./formatter":14,"./number_formatter":16,"./number_formatter_settings_formatter":17,"./phone_formatter":18,"./social_security_number_formatter":19,"./text_field":20,"./undo_manager":21}],16:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = _dereq_('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _number_formatter_settings_formatter = _dereq_('./number_formatter_settings_formatter');

var _number_formatter_settings_formatter2 = _interopRequireDefault(_number_formatter_settings_formatter);

var _utils = _dereq_('./utils');

var _stround = _dereq_('stround');

// Style
var NONE = 0;
var CURRENCY = 1;
var PERCENT = 2;

var DEFAULT_LOCALE = 'en-US';
var DEFAULT_COUNTRY = 'US';

/**
 * @param {string} locale
 * @returns {Object} {lang: lang, country: country}
 * @private
 */
function splitLocaleComponents(locale) {
  var match = locale.match(/^([a-z][a-z])(?:[-_]([a-z][a-z]))?$/i);
  if (match) {
    var lang = match[1] && match[1].toLowerCase();
    var country = match[2] && match[2].toLowerCase();
    return { lang: lang, country: country };
  }
}

/**
 * This simple property getter assumes that properties will never be functions
 * and so attempts to run those functions using the given args.
 *
 * @private
 */
function get(object, key) {
  if (object) {
    var value = object[key];
    if (typeof value === 'function') {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return value.apply(undefined, args);
    } else {
      return value;
    }
  }
}

/**
 * @param {string} string
 * @param {string} currencySymbol
 * @return {string}
 * @private
 */
function replaceCurrencySymbol(string, currencySymbol) {
  return string.replace(/¤/g, currencySymbol);
}

/**
 * @param {string} string
 * @param {string} plusSign
 * @returns {string}
 * @private
 */
function replacePlusSign(string, plusSign) {
  return string.replace(/\+/g, plusSign);
}
/**
 * @param {string} string
 * @param {string} minusSign
 * @returns {string}
 * @private
 */
function replaceMinusSign(string, minusSign) {
  return string.replace(/-/g, minusSign);
}

/**
 * Formats and parses numbers. There are many configuration options for how to
 * format numbers as strings, but for many users simply adjusting the
 * {@link NumberFormatter#numberStyle}, {@link NumberFormatter#locale},
 * {@link NumberFormatter#currencyCode}, and {@link NumberFormatter#countryCode}
 * values will be sufficient. NumberFormatter natively understands how to
 * format numbers, currencies, and percentages for a variety of locales.
 *
 * @example
 *
 *   // Configure a NumberFormatter to display currencies.
 *   var f = new FieldKit.NumberFormatter();
 *   f.setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY);
 *
 *   // Configure the current locale info.
 *   f.setLocale('en-US');
 *   f.setCountryCode('US');
 *   f.setCurrencyCode('USD');
 *
 *   // Showing USD in US uses abbreviated currency.
 *   f.format(6.17);  // '$6.17'
 *
 *   // Showing CAD in US uses fully-qualified currency.
 *   f.setCurrencyCode('CAD');
 *   f.format(6.17);  // 'CA$6.17'
 *
 *   // Showing CAD in CA again uses abbreviated currency.
 *   f.setLocale('en-CA');
 *   f.setCountryCode('CA');
 *   f.format(6.17);  // '$6.17'
 *
 *   // Showing CAD in CA to a French speaker uses correct formatting.
 *   f.setLocale('fr-CA');
 *   f.format(6.17);  // '6,17 $'
 *
 *   // You may customize the behavior of NumberFormatter to achieve whatever
 *   // number formatting you need using the setter methods for the various
 *   // settings, or you can use the {@link NumberFormatter#positiveFormat} and
 *   // {@link NumberFormatter#negativeFormat} shorthand templates.
 *
 *   var f = new FieldKit.NumberFormatter();
 *
 *   // Using this template string…
 *   f.setPositiveFormat('¤#0.00');
 *
 *   // …is equivalent to this:
 *   f.setPositivePrefix('¤');
 *   f.setPositiveSuffix('');
 *   f.setMinimumIntegerDigits(1);
 *   f.setMinimumFractionDigits(2);
 *   f.setMaximumFractionDigits(2);
 *
 *   // And you can determine what the template string is for however you've
 *   // configured the NumberFormatter:
 *   f.setUsesGroupingSeparator(true);
 *   f.setGroupingSize(2);
 *   f.positiveFormat(); // '¤#,#0.00'
 *
 * @extends Formatter
 */

var NumberFormatter = (function (_Formatter) {
  _inherits(NumberFormatter, _Formatter);

  function NumberFormatter() {
    _classCallCheck(this, NumberFormatter);

    _get(Object.getPrototypeOf(NumberFormatter.prototype), 'constructor', this).call(this);
    this.setNumberStyle(NONE);
  }

  /**
   * Defaults
   */

  /** @private */

  /**
   * Gets whether this formatter will parse float number values. This value does
   * not apply to formatting. To prevent formatting floats, set
   * maximumFractionDigits to 0.
   *
   * @returns {boolean}
   */

  _createClass(NumberFormatter, [{
    key: 'allowsFloats',
    value: function allowsFloats() {
      return this._get('allowsFloats');
    }

    /**
     * Sets whether this formatter will parse float number values.
     *
     * @param {boolean} allowsFloats
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setAllowsFloats',
    value: function setAllowsFloats(allowsFloats) {
      this._allowsFloats = allowsFloats;
      return this;
    }

    /**
     * Gets whether this formatter should show the decimal separator.
     *
     * @returns {boolean}
     */
  }, {
    key: 'alwaysShowsDecimalSeparator',
    value: function alwaysShowsDecimalSeparator() {
      return this._get('alwaysShowsDecimalSeparator');
    }

    /**
     * Sets whether this formatter will show the decimal separator.
     *
     * @param {boolean} alwaysShowsDecimalSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setAlwaysShowsDecimalSeparator',
    value: function setAlwaysShowsDecimalSeparator(alwaysShowsDecimalSeparator) {
      this._alwaysShowsDecimalSeparator = alwaysShowsDecimalSeparator;
      return this;
    }

    /**
     * Gets the country code for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'countryCode',
    value: function countryCode() {
      return this._countryCode || DEFAULT_COUNTRY;
    }

    /**
     * Sets the country code for formatter.
     *
     * @param {string} countryCode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCountryCode',
    value: function setCountryCode(countryCode) {
      this._countryCode = countryCode;
      return this;
    }

    /**
     * Gets the currency code for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'currencyCode',
    value: function currencyCode() {
      return this._get('currencyCode');
    }

    /**
     * Sets the currency code for formatter.
     *
     * @param {string} currencyCode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCurrencyCode',
    value: function setCurrencyCode(currencyCode) {
      this._currencyCode = currencyCode;
      return this;
    }

    /**
     * Gets the currency symbol for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'currencySymbol',
    value: function currencySymbol() {
      if (this._shouldShowNativeCurrencySymbol()) {
        return this._get('currencySymbol');
      } else {
        return this._get('internationalCurrencySymbol');
      }
    }

    /**
     * Sets the currency symbol for formatter.
     *
     * @param {string} currencySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCurrencySymbol',
    value: function setCurrencySymbol(currencySymbol) {
      this._currencySymbol = currencySymbol;
      return this;
    }

    /**
     * @returns {boolean}
     * @private
     */
  }, {
    key: '_shouldShowNativeCurrencySymbol',
    value: function _shouldShowNativeCurrencySymbol() {
      var regionDefaultCurrencyCode = this._regionDefaults().currencyCode;
      if (typeof regionDefaultCurrencyCode === 'function') {
        regionDefaultCurrencyCode = regionDefaultCurrencyCode();
      }
      return this.currencyCode() === regionDefaultCurrencyCode;
    }

    /**
     * Gets the decimal separator for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'decimalSeparator',
    value: function decimalSeparator() {
      return this._get('decimalSeparator');
    }

    /**
     * Sets the decimal separator for formatter.
     *
     * @param {string} decimalSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setDecimalSeparator',
    value: function setDecimalSeparator(decimalSeparator) {
      this._decimalSeparator = decimalSeparator;
      return this;
    }

    /**
     * Gets the number of decimal places to shift numbers before formatting.
     *
     * @returns {string}
     */
  }, {
    key: 'exponent',
    value: function exponent() {
      return this._get('exponent');
    }

    /**
     * Sets the number of decimal places to shift numbers before formatting.
     *
     * @param exponent
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setExponent',
    value: function setExponent(exponent) {
      this._exponent = exponent;
      return this;
    }
  }, {
    key: 'groupingSeparator',
    value: function groupingSeparator() {
      return this._get('groupingSeparator');
    }

    /**
     * @param {string} groupingSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setGroupingSeparator',
    value: function setGroupingSeparator(groupingSeparator) {
      this._groupingSeparator = groupingSeparator;
      return this;
    }

    /**
     * Gets the grouping size for formatter.
     *
     * @returns {number}
     */
  }, {
    key: 'groupingSize',
    value: function groupingSize() {
      return this._get('groupingSize');
    }

    /**
     * @param {number} groupingSize
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setGroupingSize',
    value: function setGroupingSize(groupingSize) {
      this._groupingSize = groupingSize;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'internationalCurrencySymbol',
    value: function internationalCurrencySymbol() {
      return this._get('internationalCurrencySymbol');
    }

    /**
     * @param {string} internationalCurrencySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setInternationalCurrencySymbol',
    value: function setInternationalCurrencySymbol(internationalCurrencySymbol) {
      this._internationalCurrencySymbol = internationalCurrencySymbol;
      return this;
    }

    /**
     * @returns {boolean}
     */
  }, {
    key: 'isLenient',
    value: function isLenient() {
      return this._lenient;
    }

    /**
     * @param {boolean} lenient
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setLenient',
    value: function setLenient(lenient) {
      this._lenient = lenient;
      return this;
    }

    /**
     * Gets the locale identifier for which this formatter is currently
     * configured to format strings. This setting controls default settings such
     * as the grouping separator character, decimal separator character, placement
     * of currency and percent symbols, etc.
     *
     * @returns {string}
     */
  }, {
    key: 'locale',
    value: function locale() {
      return this._locale || DEFAULT_LOCALE;
    }

    /**
     * Sets the locale identifier used for default settings values.
     *
     * @see {@link NumberFormatter#locale}
     * @param {string} locale
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximum',
    value: function maximum() {
      return this._maximum;
    }

    /**
     * @param {number} max
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximum',
    value: function setMaximum(max) {
      this._maximum = max;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimum',
    value: function minimum() {
      return this._minimum;
    }

    /**
     * @param {number} min
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimum',
    value: function setMinimum(min) {
      this._minimum = min;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximumFractionDigits',
    value: function maximumFractionDigits() {
      var result = this._get('maximumFractionDigits');
      var minimumFractionDigits = this._minimumFractionDigits;
      if (result !== null && result !== undefined && minimumFractionDigits !== null && minimumFractionDigits !== undefined && minimumFractionDigits > result) {
        result = minimumFractionDigits;
      }
      return result;
    }

    /**
     * @param {number} maximumFractionDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximumFractionDigits',
    value: function setMaximumFractionDigits(maximumFractionDigits) {
      this._maximumFractionDigits = maximumFractionDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimumFractionDigits',
    value: function minimumFractionDigits() {
      var result = this._get('minimumFractionDigits');
      var maximumFractionDigits = this._maximumFractionDigits;
      if (result !== null && result !== undefined && maximumFractionDigits !== null && maximumFractionDigits !== undefined && maximumFractionDigits < result) {
        result = maximumFractionDigits;
      }
      return result;
    }

    /**
     * @param {number} minimumFractionDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimumFractionDigits',
    value: function setMinimumFractionDigits(minimumFractionDigits) {
      this._minimumFractionDigits = minimumFractionDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximumIntegerDigits',
    value: function maximumIntegerDigits() {
      var result = this._get('maximumIntegerDigits');
      var minimumIntegerDigits = this._minimumIntegerDigits;
      if (result !== null && result !== undefined && minimumIntegerDigits !== null && minimumIntegerDigits !== undefined && minimumIntegerDigits > result) {
        result = minimumIntegerDigits;
      }
      return result;
    }

    /**
     * @param {number} maximumIntegerDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximumIntegerDigits',
    value: function setMaximumIntegerDigits(maximumIntegerDigits) {
      this._maximumIntegerDigits = maximumIntegerDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimumIntegerDigits',
    value: function minimumIntegerDigits() {
      var result = this._get('minimumIntegerDigits');
      var maximumIntegerDigits = this._maximumIntegerDigits;
      if (result !== null && result !== undefined && maximumIntegerDigits !== null && maximumIntegerDigits !== undefined && maximumIntegerDigits < result) {
        result = maximumIntegerDigits;
      }
      return result;
    }

    /**
     * @param {number} minimumIntegerDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimumIntegerDigits',
    value: function setMinimumIntegerDigits(minimumIntegerDigits) {
      this._minimumIntegerDigits = minimumIntegerDigits;
      return this;
    }

    /**
     * Gets the minus sign used for negative numbers in some locales.
     *
     * @returns {?string}
     */
  }, {
    key: 'minusSign',
    value: function minusSign() {
      return this._get('minusSign');
    }

    /**
     * Sets the minus sign used for negative numbers in some locales.
     *
     * @param {?string} minusSign
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinusSign',
    value: function setMinusSign(minusSign) {
      this._minusSign = minusSign;
      return this;
    }

    /**
     * Gets the negative number format string for the current settings. For
     * example, changing `minimumFractionDigits` from 0 to 3 would change this
     * value from "-#" to "-#.000".
     *
     * @return {string}
     */
  }, {
    key: 'negativeFormat',
    value: function negativeFormat() {
      return this.numberFormatFormatter().format({
        alwaysShowsDecimalSeparator: this.alwaysShowsDecimalSeparator(),
        groupingSize: this.groupingSize(),
        maximumFractionDigits: this.maximumFractionDigits(),
        minimumFractionDigits: this.minimumFractionDigits(),
        minimumIntegerDigits: this.minimumIntegerDigits(),
        prefix: this._get('negativePrefix'),
        suffix: this._get('negativeSuffix'),
        usesGroupingSeparator: this.usesGroupingSeparator()
      });
    }

    /**
     * Configures this number formatter according to the given format string.
     * For most usages you should simply use
     * {@link NumberFormatter#setPositiveFormat} and configure the negative
     * prefix and suffix separately.
     *
     * @param negativeFormat
     */
  }, {
    key: 'setNegativeFormat',
    value: function setNegativeFormat(negativeFormat) {
      var settings = this.numberFormatFormatter().parse(negativeFormat);
      this.setNegativePrefix(settings.prefix);
      this.setNegativeSuffix(settings.suffix);
      this.setGroupingSize(settings.groupingSize);
      this.setMaximumFractionDigits(settings.maximumFractionDigits);
      this.setMinimumFractionDigits(settings.minimumFractionDigits);
      this.setMinimumIntegerDigits(settings.minimumIntegerDigits);
      this.setUsesGroupingSeparator(settings.usesGroupingSeparator);
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativeInfinitySymbol',
    value: function negativeInfinitySymbol() {
      return this._get('negativeInfinitySymbol');
    }

    /**
     * @param {string} negativeInfinitySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativeInfinitySymbol',
    value: function setNegativeInfinitySymbol(negativeInfinitySymbol) {
      this._negativeInfinitySymbol = negativeInfinitySymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativePrefix',
    value: function negativePrefix() {
      return replaceCurrencySymbol(replaceMinusSign(this._get('negativePrefix'), this._get('minusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativePrefix',
    value: function setNegativePrefix(prefix) {
      this._negativePrefix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativeSuffix',
    value: function negativeSuffix() {
      return replaceCurrencySymbol(replaceMinusSign(this._get('negativeSuffix'), this._get('minusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativeSuffix',
    value: function setNegativeSuffix(prefix) {
      this._negativeSuffix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'notANumberSymbol',
    value: function notANumberSymbol() {
      return this._get('notANumberSymbol');
    }

    /**
     * @param {string} notANumberSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNotANumberSymbol',
    value: function setNotANumberSymbol(notANumberSymbol) {
      this._notANumberSymbol = notANumberSymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'nullSymbol',
    value: function nullSymbol() {
      return this._get('nullSymbol');
    }

    /**
     * @param {string} nullSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNullSymbol',
    value: function setNullSymbol(nullSymbol) {
      this._nullSymbol = nullSymbol;
      return this;
    }

    /**
     * @return {NumberFormatterSettingsFormatter}
     * @private
     */
  }, {
    key: 'numberFormatFormatter',
    value: function numberFormatFormatter() {
      if (!this._numberFormatFormatter) {
        this._numberFormatFormatter = new _number_formatter_settings_formatter2['default']();
      }
      return this._numberFormatFormatter;
    }

    /**
     * Gets the number style used to configure various default setting values.
     *
     * @returns {NumberFormatter.Style}
     */
  }, {
    key: 'numberStyle',
    value: function numberStyle() {
      return this._numberStyle;
    }

    /**
     * Sets the number style used to configure various default setting values.
     *
     * @param {string} numberStyle
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNumberStyle',
    value: function setNumberStyle(numberStyle) {
      this._numberStyle = numberStyle;
      switch (this._numberStyle) {
        case NONE:
          this._styleDefaults = StyleDefaults.NONE;
          break;
        case PERCENT:
          this._styleDefaults = StyleDefaults.PERCENT;
          break;
        case CURRENCY:
          this._styleDefaults = StyleDefaults.CURRENCY;
          break;
        default:
          this._styleDefaults = null;
      }
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'percentSymbol',
    value: function percentSymbol() {
      return this._get('percentSymbol');
    }

    /**
     * @param {string} percentSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPercentSymbol',
    value: function setPercentSymbol(percentSymbol) {
      this._percentSymbol = percentSymbol;
      return this;
    }

    /**
     * Gets the plus sign used in positive numbers in some locales.
     *
     * @returns {string}
     */
  }, {
    key: 'plusSign',
    value: function plusSign() {
      return this._get('plusSign');
    }

    /**
     * Sets the plus sign used in positive numbers in some locales.
     *
     * @param {?string} plusSign
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPlusSign',
    value: function setPlusSign(plusSign) {
      this._plusSign = plusSign;
      return this;
    }

    /**
     * Gets the positive number format string for the current settings. For
     * example, changing `minimumFractionDigits` from 0 to 3 would change this
     * value from "#" to "#.000".
     *
     * @return {string}
     */
  }, {
    key: 'positiveFormat',
    value: function positiveFormat() {
      return this.numberFormatFormatter().format({
        alwaysShowsDecimalSeparator: this.alwaysShowsDecimalSeparator(),
        groupingSize: this.groupingSize(),
        maximumFractionDigits: this.maximumFractionDigits(),
        minimumFractionDigits: this.minimumFractionDigits(),
        minimumIntegerDigits: this.minimumIntegerDigits(),
        prefix: this._get('positivePrefix'),
        suffix: this._get('positiveSuffix'),
        usesGroupingSeparator: this.usesGroupingSeparator()
      });
    }

    /**
     * Configures this number formatter according to the given format string.
     *
     * @example
     *
     *   // Use '0' for padding, '.' for decimal separator.
     *   formatter.setPositiveFormat('00.000');
     *   formatter.format(2);     // '02.000'
     *   formatter.format(-5.03); // '-05.030'
     *   formatter.setLocale('fr-FR');
     *   formatter.format(2);     // '02,000'
     *
     *   // Use '#' for maximum fraction digits.
     *   formatter.setPositiveFormat('#.##');
     *   formatter.format(3.456); // '3.46'
     *
     *   // Use '¤' as the currency placeholder.
     *   formatter.setPositiveFormat('¤#0.00');
     *   formatter.format(1.23); // '$1.23'
     *   formatter.setCurrencyCode('JPY');
     *   formatter.format(81);   // 'JP¥81.00'
     *   formatter.setLocale('jp-JP');
     *   formatter.format(7);   // '¥7.00'
     *
     *   // Use ',' for grouping separator placement.
     *   formatter.setPositiveFormat('#,##');
     *   formatter.format(123); // '1,23'
     *
     * @param positiveFormat
     */
  }, {
    key: 'setPositiveFormat',
    value: function setPositiveFormat(positiveFormat) {
      var settings = this.numberFormatFormatter().parse(positiveFormat);
      this.setPositivePrefix(settings.prefix);
      this.setPositiveSuffix(settings.suffix);
      this.setGroupingSize(settings.groupingSize);
      this.setMaximumFractionDigits(settings.maximumFractionDigits);
      this.setMinimumFractionDigits(settings.minimumFractionDigits);
      this.setMinimumIntegerDigits(settings.minimumIntegerDigits);
      this.setUsesGroupingSeparator(settings.usesGroupingSeparator);
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positiveInfinitySymbol',
    value: function positiveInfinitySymbol() {
      return this._get('positiveInfinitySymbol');
    }

    /**
     * @param {string} positiveInfinitySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositiveInfinitySymbol',
    value: function setPositiveInfinitySymbol(positiveInfinitySymbol) {
      this._positiveInfinitySymbol = positiveInfinitySymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positivePrefix',
    value: function positivePrefix() {
      return replaceCurrencySymbol(replacePlusSign(this._get('positivePrefix'), this._get('plusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositivePrefix',
    value: function setPositivePrefix(prefix) {
      this._positivePrefix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positiveSuffix',
    value: function positiveSuffix() {
      return replaceCurrencySymbol(replacePlusSign(this._get('positiveSuffix'), this._get('plusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositiveSuffix',
    value: function setPositiveSuffix(prefix) {
      this._positiveSuffix = prefix;
      return this;
    }

    /**
     * @returns {Function}
     */
  }, {
    key: 'roundingMode',
    value: function roundingMode() {
      return this._get('roundingMode');
    }

    /**
     * @param {Function} roundingMode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setRoundingMode',
    value: function setRoundingMode(roundingMode) {
      this._roundingMode = roundingMode;
      return this;
    }

    /**
     * @returns {boolean}
     */
  }, {
    key: 'usesGroupingSeparator',
    value: function usesGroupingSeparator() {
      return this._get('usesGroupingSeparator');
    }

    /**
     * @param {boolean} usesGroupingSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setUsesGroupingSeparator',
    value: function setUsesGroupingSeparator(usesGroupingSeparator) {
      this._usesGroupingSeparator = usesGroupingSeparator;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'zeroSymbol',
    value: function zeroSymbol() {
      return this._get('zeroSymbol');
    }

    /**
     * @param {string} zeroSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setZeroSymbol',
    value: function setZeroSymbol(zeroSymbol) {
      this._zeroSymbol = zeroSymbol;
      return this;
    }

    /**
     * @param {string} attr
     * @returns {*}
     * @private
     */
  }, {
    key: '_get',
    value: function _get(attr) {
      var value = this['_' + attr];
      if (value !== null && value !== undefined) {
        return value;
      }
      var styleDefaults = this._styleDefaults;
      var localeDefaults = this._localeDefaults();
      var regionDefaults = this._regionDefaults();
      value = get(styleDefaults, attr, this, localeDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(localeDefaults, attr, this, styleDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(regionDefaults, attr, this, styleDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(this._currencyDefaults(), attr, this, localeDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      return null;
    }

    /**
     * Formats the given number as a string according to the settings applied to
     * this formatter. This may cause the number to be truncated, rounded, or
     * otherwise differ from what you might expect.
     *
     * @example
     *
     *   // By default no fraction digits are shown.
     *   var f = new FieldKit.NumberFormatter();
     *   f.format(Math.PI);  // '3'
     *
     *   // Let's format as a currency.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY);
     *   f.format(Math.PI);  // '$3.14'
     *
     *   // Or as a percentage, which illustrates usage of {@link NumberFormatter#exponent}.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.PERCENT);
     *   f.format(Math.PI);  // '314%'
     *
     *   // For the rest of the examples we'll go back to normal.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.NONE);
     *
     *   // The default rounding mode is {@link NumberFormatter.Rounding.HALF_EVEN}.
     *   f.setMaximumFractionDigits(4);
     *   f.format(Math.PI);  // '3.1416'
     *
     *   // And we can change the rounding mode if we like.
     *   f.setRoundingMode(FieldKit.NumberFormatter.Rounding.FLOOR);
     *   f.format(Math.PI);  // '3.1415'
     *
     * @param {number} number
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(number) {
      if (number === '') {
        return '';
      }

      var zeroSymbol = this.zeroSymbol();
      if (zeroSymbol !== undefined && zeroSymbol !== null && number === 0) {
        return zeroSymbol;
      }

      var nullSymbol = this.nullSymbol();
      if (nullSymbol !== undefined && nullSymbol !== null && number === null) {
        return nullSymbol;
      }

      var notANumberSymbol = this.notANumberSymbol();
      if (notANumberSymbol !== undefined && notANumberSymbol !== null && isNaN(number)) {
        return notANumberSymbol;
      }

      var positiveInfinitySymbol = this.positiveInfinitySymbol();
      if (positiveInfinitySymbol !== undefined && positiveInfinitySymbol !== null && number === Infinity) {
        return positiveInfinitySymbol;
      }

      var negativeInfinitySymbol = this.negativeInfinitySymbol();
      if (negativeInfinitySymbol !== undefined && negativeInfinitySymbol !== null && number === -Infinity) {
        return negativeInfinitySymbol;
      }

      var negative = number < 0;

      var parts = ('' + Math.abs(number)).split('.');
      var integerPart = parts[0];
      var fractionPart = parts[1] || '';

      var exponent = this.exponent();
      if (exponent !== undefined && exponent !== null) {
        var shifted = (0, _stround.shiftParts)([negative, integerPart, fractionPart], exponent);
        negative = shifted[0];
        integerPart = shifted[1];
        fractionPart = shifted[2];
        while (integerPart[0] === '0') {
          integerPart = integerPart.slice(1);
        }
      }

      // round fraction part to the maximum length
      var maximumFractionDigits = this.maximumFractionDigits();
      if (fractionPart.length > maximumFractionDigits) {
        var unrounded = integerPart + '.' + fractionPart;
        var rounded = this._round(negative ? '-' + unrounded : unrounded);
        if (rounded[0] === '-') {
          rounded = rounded.slice(1);
        }
        parts = rounded.split('.');
        integerPart = parts[0];
        fractionPart = parts[1] || '';
      }

      // right-pad fraction zeros up to the minimum length
      var minimumFractionDigits = this.minimumFractionDigits();
      while (fractionPart.length < minimumFractionDigits) {
        fractionPart += '0';
      }

      // left-pad integer zeros up to the minimum length
      var minimumIntegerDigits = this.minimumIntegerDigits();
      while (integerPart.length < minimumIntegerDigits) {
        integerPart = '0' + integerPart;
      }

      // eat any unneeded trailing zeros
      while (fractionPart.length > minimumFractionDigits && fractionPart.slice(-1) === '0') {
        fractionPart = fractionPart.slice(0, -1);
      }

      // left-truncate any integer digits over the maximum length
      var maximumIntegerDigits = this.maximumIntegerDigits();
      if (maximumIntegerDigits !== undefined && maximumIntegerDigits !== null && integerPart.length > maximumIntegerDigits) {
        integerPart = integerPart.slice(-maximumIntegerDigits);
      }

      // add the decimal separator
      if (fractionPart.length > 0 || this.alwaysShowsDecimalSeparator()) {
        fractionPart = this.decimalSeparator() + fractionPart;
      }

      if (this.usesGroupingSeparator()) {
        var integerPartWithGroupingSeparators = '';
        var copiedCharacterCount = 0;

        for (var i = integerPart.length - 1; i >= 0; i--) {
          if (copiedCharacterCount > 0 && copiedCharacterCount % this.groupingSize() === 0) {
            integerPartWithGroupingSeparators = this.groupingSeparator() + integerPartWithGroupingSeparators;
          }
          integerPartWithGroupingSeparators = integerPart[i] + integerPartWithGroupingSeparators;
          copiedCharacterCount++;
        }
        integerPart = integerPartWithGroupingSeparators;
      }

      var result = integerPart + fractionPart;

      // surround with the appropriate prefix and suffix
      if (negative) {
        result = this.negativePrefix() + result + this.negativeSuffix();
      } else {
        result = this.positivePrefix() + result + this.positiveSuffix();
      }
      return result;
    }

    /**
     * @param {number} number
     * @returns {number}
     * @private
     */
  }, {
    key: '_round',
    value: function _round(number) {
      return (0, _stround.round)(number, this.maximumFractionDigits(), this.roundingMode());
    }

    /**
     * Parses the given string according to the current formatting settings.
     * When parsing values with a guaranteed regular format you can simply
     * configure the formatter correctly and call this method. However, when
     * dealing with human input it is often useful to configure
     * {@link NumberFormatter#isLenient} to be true, allowing more leeway in what
     * may be parsed as a valid number.
     *
     * @example
     *
     *   var f = new FieldKit.NumberFormatter();
     *   f.parse('89'); // 89
     *
     * @param {string} string
     * @param {function(string)} error
     * @returns {?number}
     */
  }, {
    key: 'parse',
    value: function parse(string, error) {
      var result = undefined;
      var positivePrefix = this.positivePrefix();
      var negativePrefix = this.negativePrefix();
      var positiveSuffix = this.positiveSuffix();
      var negativeSuffix = this.negativeSuffix();

      if (this.isLenient()) {
        string = string.replace(/\s/g, '');
        positivePrefix = (0, _utils.trim)(positivePrefix);
        negativePrefix = (0, _utils.trim)(negativePrefix);
        positiveSuffix = (0, _utils.trim)(positiveSuffix);
        negativeSuffix = (0, _utils.trim)(negativeSuffix);
      }

      var zeroSymbol = undefined;
      var nullSymbol = undefined;
      var notANumberSymbol = undefined;
      var positiveInfinitySymbol = undefined;
      var negativeInfinitySymbol = undefined;
      var innerString = undefined;

      if ((zeroSymbol = this.zeroSymbol()) !== undefined && zeroSymbol !== null && string === zeroSymbol) {
        result = 0;
      } else if ((nullSymbol = this.nullSymbol()) !== undefined && nullSymbol !== null && string === nullSymbol) {
        result = null;
      } else if ((notANumberSymbol = this.notANumberSymbol()) !== undefined && notANumberSymbol !== null && string === notANumberSymbol) {
        result = NaN;
      } else if ((positiveInfinitySymbol = this.positiveInfinitySymbol()) !== undefined && positiveInfinitySymbol !== null && string === positiveInfinitySymbol) {
        result = Infinity;
      } else if ((negativeInfinitySymbol = this.negativeInfinitySymbol()) !== undefined && negativeInfinitySymbol !== null && string === negativeInfinitySymbol) {
        result = -Infinity;
      } else {
        var hasNegativePrefix = (0, _utils.startsWith)(negativePrefix, string);
        var hasNegativeSuffix = (0, _utils.endsWith)(negativeSuffix, string);
        if (hasNegativePrefix && (this.isLenient() || hasNegativeSuffix)) {
          innerString = string.slice(negativePrefix.length);
          if (hasNegativeSuffix) {
            innerString = innerString.slice(0, innerString.length - negativeSuffix.length);
          }
          result = this._parseAbsoluteValue(innerString, error);
          if (result !== undefined && result !== null) {
            result *= -1;
          }
        } else {
          var hasPositivePrefix = (0, _utils.startsWith)(positivePrefix, string);
          var hasPositiveSuffix = (0, _utils.endsWith)(positiveSuffix, string);
          if (this.isLenient() || hasPositivePrefix && hasPositiveSuffix) {
            innerString = string;
            if (hasPositivePrefix) {
              innerString = innerString.slice(positivePrefix.length);
            }
            if (hasPositiveSuffix) {
              innerString = innerString.slice(0, innerString.length - positiveSuffix.length);
            }
            result = this._parseAbsoluteValue(innerString, error);
          } else {
            if (typeof error === 'function') {
              error('number-formatter.invalid-format');
            }
            return null;
          }
        }
      }

      if (result !== undefined && result !== null) {
        var minimum = this.minimum();
        if (minimum !== undefined && minimum !== null && result < minimum) {
          if (typeof error === 'function') {
            error('number-formatter.out-of-bounds.below-minimum');
          }
          return null;
        }

        var maximum = this.maximum();
        if (maximum !== undefined && maximum !== null && result > maximum) {
          if (typeof error === 'function') {
            error('number-formatter.out-of-bounds.above-maximum');
          }
          return null;
        }
      }

      return result;
    }

    /**
     * @param {string} string
     * @param {function(string)} error
     * @returns {?number} returns value with delimiters removed
     * @private
     */
  }, {
    key: '_parseAbsoluteValue',
    value: function _parseAbsoluteValue(string, error) {
      var number = undefined;
      if (string.length === 0) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var parts = string.split(this.decimalSeparator());
      if (parts.length > 2) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var integerPart = parts[0];
      var fractionPart = parts[1] || '';

      if (this.usesGroupingSeparator()) {
        var groupingSize = this.groupingSize();
        var groupParts = integerPart.split(this.groupingSeparator());

        if (!this.isLenient()) {
          if (groupParts.length > 1) {
            // disallow 1000,000
            if (groupParts[0].length > groupingSize) {
              if (typeof error === 'function') {
                error('number-formatter.invalid-format.grouping-size');
              }
              return null;
            }

            // disallow 1,00
            var groupPartsTail = groupParts.slice(1);
            for (var i = 0, l = groupPartsTail.length; i < l; i++) {
              if (groupPartsTail[i].length !== groupingSize) {
                if (typeof error === 'function') {
                  error('number-formatter.invalid-format.grouping-size');
                }
                return null;
              }
            }
          }
        }

        // remove grouping separators
        integerPart = groupParts.join('');
      }

      if (!(0, _utils.isDigits)(integerPart) || !(0, _utils.isDigits)(fractionPart)) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var exponent = this.exponent();
      if (exponent !== undefined && exponent !== null) {
        var shifted = (0, _stround.shiftParts)([false, integerPart, fractionPart], -exponent);
        integerPart = shifted[1];
        fractionPart = shifted[2];
      }

      number = Number(integerPart) + Number('.' + (fractionPart || '0'));

      if (!this.allowsFloats() && number !== ~ ~number) {
        if (typeof error === 'function') {
          error('number-formatter.floats-not-allowed');
        }
        return null;
      }

      return number;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_currencyDefaults',
    value: function _currencyDefaults() {
      var result = {};

      (0, _utils.forEach)(CurrencyDefaults['default'], function (value, key) {
        result[key] = value;
      });

      (0, _utils.forEach)(CurrencyDefaults[this.currencyCode()], function (value, key) {
        result[key] = value;
      });

      return result;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_regionDefaults',
    value: function _regionDefaults() {
      var result = {};

      (0, _utils.forEach)(RegionDefaults['default'], function (value, key) {
        result[key] = value;
      });

      (0, _utils.forEach)(RegionDefaults[this.countryCode()], function (value, key) {
        result[key] = value;
      });

      return result;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_localeDefaults',
    value: function _localeDefaults() {
      var locale = this.locale();
      var countryCode = this.countryCode();
      var lang = splitLocaleComponents(locale).lang;
      var result = {};

      var defaultFallbacks = [RegionDefaults['default'], LocaleDefaults['default'], RegionDefaults[countryCode], // CA
      LocaleDefaults[lang], // fr
      LocaleDefaults[locale] // fr-CA
      ];

      (0, _utils.forEach)(defaultFallbacks, function (defaults) {
        (0, _utils.forEach)(defaults, function (value, key) {
          result[key] = value;
        });
      });

      return result;
    }
  }]);

  return NumberFormatter;
})(_formatter2['default']);

NumberFormatter.prototype._allowsFloats = null;
/** @private */
NumberFormatter.prototype._alwaysShowsDecimalSeparator = null;
/** @private */
NumberFormatter.prototype._countryCode = null;
/** @private */
NumberFormatter.prototype._currencyCode = null;
/** @private */
NumberFormatter.prototype._exponent = null;
/** @private */
NumberFormatter.prototype._groupingSeparator = null;
/** @private */
NumberFormatter.prototype._groupingSize = null;
/** @private */
NumberFormatter.prototype._lenient = false;
/** @private */
NumberFormatter.prototype._locale = null;
/** @private */
NumberFormatter.prototype._internationalCurrencySymbol = null;
/** @private */
NumberFormatter.prototype._maximumFractionDigits = null;
/** @private */
NumberFormatter.prototype._minimumFractionDigits = null;
/** @private */
NumberFormatter.prototype._maximumIntegerDigits = null;
/** @private */
NumberFormatter.prototype._minimumIntegerDigits = null;
/** @private */
NumberFormatter.prototype._maximum = null;
/** @private */
NumberFormatter.prototype._minimum = null;
/** @private */
NumberFormatter.prototype._notANumberSymbol = null;
/** @private */
NumberFormatter.prototype._nullSymbol = null;
/** @private */
NumberFormatter.prototype._numberStyle = null;
/** @private */
NumberFormatter.prototype._roundingMode = null;
/** @private */
NumberFormatter.prototype._usesGroupingSeparator = null;
/** @private */
NumberFormatter.prototype._zeroSymbol = null;

/**
 * Aliases
 */

NumberFormatter.prototype.stringFromNumber = NumberFormatter.prototype.format;
NumberFormatter.prototype.numberFromString = NumberFormatter.prototype.parse;

NumberFormatter.Rounding = _stround.modes;

/**
 * @enum {number}
 * @readonly
 */
NumberFormatter.Style = {
  NONE: NONE,
  CURRENCY: CURRENCY,
  PERCENT: PERCENT
};

/**
 * @namespace StyleDefaults
 */
var StyleDefaults = {
  NONE: {
    usesGroupingSeparator: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumIntegerDigits: 0
  },
  PERCENT: {
    usesGroupingSeparator: false,
    exponent: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumIntegerDigits: 1,
    positiveSuffix: function positiveSuffix(formatter) {
      return formatter.percentSymbol();
    },
    negativeSuffix: function negativeSuffix(formatter) {
      return formatter.percentSymbol();
    }
  },
  CURRENCY: {
    positivePrefix: function positivePrefix(formatter, locale) {
      return get(locale, 'positiveCurrencyPrefix', formatter, this);
    },
    positiveSuffix: function positiveSuffix(formatter, locale) {
      return get(locale, 'positiveCurrencySuffix', formatter, this);
    },
    negativePrefix: function negativePrefix(formatter, locale) {
      return get(locale, 'negativeCurrencyPrefix', formatter, this);
    },
    negativeSuffix: function negativeSuffix(formatter, locale) {
      return get(locale, 'negativeCurrencySuffix', formatter, this);
    }
  }
};

/**
 * Contains the default values for various number formatter settings, including
 * per-locale overrides. Some of these characters will not be used as-is and
 * instead serve as placeholders:
 *
 *   "¤"  placeholder for `currencySymbol()`.
 *   "-"  placeholder for `minusSign()`.
 *   "+"  placeholder for `plusSign()`.
 *
 * @namespace LocaleDefaults
 */
var LocaleDefaults = {
  'default': {
    allowsFloats: true,
    alwaysShowsDecimalSeparator: false,
    decimalSeparator: '.',
    groupingSeparator: ',',
    groupingSize: 3,
    minusSign: '-',
    negativeInfinitySymbol: '-∞',
    negativePrefix: '-',
    negativeSuffix: '',
    notANumberSymbol: 'NaN',
    nullSymbol: '',
    percentSymbol: '%',
    positiveInfinitySymbol: '+∞',
    positivePrefix: '',
    positiveSuffix: '',
    plusSign: '+',
    roundingMode: NumberFormatter.Rounding.HALF_EVEN,
    positiveCurrencyPrefix: '¤',
    positiveCurrencySuffix: '',
    negativeCurrencyPrefix: '(¤',
    negativeCurrencySuffix: ')'
  },
  fr: {
    decimalSeparator: ',',
    groupingSeparator: ' ',
    percentSymbol: ' %',
    positiveCurrencyPrefix: '',
    positiveCurrencySuffix: ' ¤',
    negativeCurrencyPrefix: '(',
    negativeCurrencySuffix: ' ¤)'
  },
  ja: {
    negativeCurrencyPrefix: '-¤',
    negativeCurrencySuffix: ''
  },
  'en-GB': {
    negativeCurrencyPrefix: '-¤',
    negativeCurrencySuffix: ''
  }
};

/**
 * @namespace RegionDefaults
 */
var RegionDefaults = {
  AE: {
    currencyCode: 'AED'
  },
  AG: {
    currencyCode: 'XCD'
  },
  AI: {
    currencyCode: 'XCD'
  },
  AL: {
    currencyCode: 'ALL'
  },
  AM: {
    currencyCode: 'AMD'
  },
  AO: {
    currencyCode: 'AOA'
  },
  AR: {
    currencyCode: 'ARS'
  },
  AT: {
    currencyCode: 'EUR'
  },
  AU: {
    currencyCode: 'AUD'
  },
  AW: {
    currencyCode: 'AWG'
  },
  AZ: {
    currencyCode: 'AZN'
  },
  BA: {
    currencyCode: 'BAM'
  },
  BB: {
    currencyCode: 'BBD'
  },
  BD: {
    currencyCode: 'BDT'
  },
  BE: {
    currencyCode: 'EUR'
  },
  BF: {
    currencyCode: 'XOF'
  },
  BG: {
    currencyCode: 'BGN'
  },
  BH: {
    currencyCode: 'BHD'
  },
  BJ: {
    currencyCode: 'XOF'
  },
  BM: {
    currencyCode: 'BMD'
  },
  BN: {
    currencyCode: 'BND'
  },
  BO: {
    currencyCode: 'BOB'
  },
  BR: {
    currencyCode: 'BRL'
  },
  BS: {
    currencyCode: 'BSD'
  },
  BT: {
    currencyCode: 'BTN'
  },
  BW: {
    currencyCode: 'BWP'
  },
  BY: {
    currencyCode: 'BYR'
  },
  BZ: {
    currencyCode: 'BZD'
  },
  CA: {
    currencyCode: 'CAD'
  },
  CG: {
    currencyCode: 'CDF'
  },
  CH: {
    currencyCode: 'CHF'
  },
  CI: {
    currencyCode: 'XOF'
  },
  CL: {
    currencyCode: 'CLP'
  },
  CM: {
    currencyCode: 'XAF'
  },
  CN: {
    currencyCode: 'CNY'
  },
  CO: {
    currencyCode: 'COP'
  },
  CR: {
    currencyCode: 'CRC'
  },
  CV: {
    currencyCode: 'CVE'
  },
  CY: {
    currencyCode: 'EUR'
  },
  CZ: {
    currencyCode: 'CZK'
  },
  DE: {
    currencyCode: 'EUR'
  },
  DK: {
    currencyCode: 'DKK'
  },
  DM: {
    currencyCode: 'XCD'
  },
  DO: {
    currencyCode: 'DOP'
  },
  DZ: {
    currencyCode: 'DZD'
  },
  EC: {
    currencyCode: 'USD'
  },
  EE: {
    currencyCode: 'EUR'
  },
  EG: {
    currencyCode: 'EGP'
  },
  ES: {
    currencyCode: 'EUR'
  },
  ET: {
    currencyCode: 'ETB'
  },
  FI: {
    currencyCode: 'EUR'
  },
  FJ: {
    currencyCode: 'FJD'
  },
  FM: {
    currencyCode: 'USD'
  },
  FR: {
    currencyCode: 'EUR'
  },
  GA: {
    currencyCode: 'XAF'
  },
  GB: {
    currencyCode: 'GBP'
  },
  GD: {
    currencyCode: 'XCD'
  },
  GE: {
    currencyCode: 'GEL'
  },
  GH: {
    currencyCode: 'GHS'
  },
  GI: {
    currencyCode: 'GIP'
  },
  GM: {
    currencyCode: 'GMD'
  },
  GR: {
    currencyCode: 'EUR'
  },
  GT: {
    currencyCode: 'GTQ'
  },
  GU: {
    currencyCode: 'USD'
  },
  GW: {
    currencyCode: 'XOF'
  },
  GY: {
    currencyCode: 'GYD'
  },
  HK: {
    currencyCode: 'HKD'
  },
  HN: {
    currencyCode: 'HNL'
  },
  HR: {
    currencyCode: 'HRK'
  },
  HT: {
    currencyCode: 'HTG'
  },
  HU: {
    currencyCode: 'HUF'
  },
  ID: {
    currencyCode: 'IDR'
  },
  IE: {
    currencyCode: 'EUR'
  },
  IL: {
    currencyCode: 'ILS'
  },
  IN: {
    currencyCode: 'INR'
  },
  IS: {
    currencyCode: 'ISK'
  },
  IT: {
    currencyCode: 'EUR'
  },
  JM: {
    currencyCode: 'JMD'
  },
  JO: {
    currencyCode: 'JOD'
  },
  JP: {
    currencyCode: 'JPY'
  },
  KE: {
    currencyCode: 'KES'
  },
  KG: {
    currencyCode: 'KGS'
  },
  KH: {
    currencyCode: 'KHR'
  },
  KN: {
    currencyCode: 'XCD'
  },
  KR: {
    currencyCode: 'KRW'
  },
  KW: {
    currencyCode: 'KWD'
  },
  KY: {
    currencyCode: 'KYD'
  },
  KZ: {
    currencyCode: 'KZT'
  },
  LA: {
    currencyCode: 'LAK'
  },
  LB: {
    currencyCode: 'LBP'
  },
  LC: {
    currencyCode: 'XCD'
  },
  LI: {
    currencyCode: 'CHF'
  },
  LK: {
    currencyCode: 'LKR'
  },
  LR: {
    currencyCode: 'LRD'
  },
  LT: {
    currencyCode: 'LTL'
  },
  LU: {
    currencyCode: 'EUR'
  },
  LV: {
    currencyCode: 'EUR'
  },
  MA: {
    currencyCode: 'MAD'
  },
  MD: {
    currencyCode: 'MDL'
  },
  MG: {
    currencyCode: 'MGA'
  },
  MK: {
    currencyCode: 'MKD'
  },
  ML: {
    currencyCode: 'XOF'
  },
  MM: {
    currencyCode: 'MMK'
  },
  MN: {
    currencyCode: 'MNT'
  },
  MO: {
    currencyCode: 'MOP'
  },
  MP: {
    currencyCode: 'USD'
  },
  MR: {
    currencyCode: 'MRO'
  },
  MS: {
    currencyCode: 'XCD'
  },
  MT: {
    currencyCode: 'EUR'
  },
  MU: {
    currencyCode: 'MUR'
  },
  MW: {
    currencyCode: 'MWK'
  },
  MX: {
    currencyCode: 'MXN'
  },
  MY: {
    currencyCode: 'MYR'
  },
  MZ: {
    currencyCode: 'MZN'
  },
  NA: {
    currencyCode: 'NAD'
  },
  NE: {
    currencyCode: 'XOF'
  },
  NG: {
    currencyCode: 'NGN'
  },
  NI: {
    currencyCode: 'NIO'
  },
  NL: {
    currencyCode: 'EUR'
  },
  NO: {
    currencyCode: 'NOK'
  },
  NP: {
    currencyCode: 'NPR'
  },
  NZ: {
    currencyCode: 'NZD'
  },
  OM: {
    currencyCode: 'OMR'
  },
  PA: {
    currencyCode: 'PAB'
  },
  PE: {
    currencyCode: 'PEN'
  },
  PG: {
    currencyCode: 'PGK'
  },
  PH: {
    currencyCode: 'PHP'
  },
  PK: {
    currencyCode: 'PKR'
  },
  PL: {
    currencyCode: 'PLN'
  },
  PR: {
    currencyCode: 'USD'
  },
  PT: {
    currencyCode: 'EUR'
  },
  PW: {
    currencyCode: 'USD'
  },
  PY: {
    currencyCode: 'PYG'
  },
  QA: {
    currencyCode: 'QAR'
  },
  RO: {
    currencyCode: 'RON'
  },
  RS: {
    currencyCode: 'RSD'
  },
  RU: {
    currencyCode: 'RUB'
  },
  RW: {
    currencyCode: 'RWF'
  },
  SA: {
    currencyCode: 'SAR'
  },
  SB: {
    currencyCode: 'SBD'
  },
  SC: {
    currencyCode: 'SCR'
  },
  SE: {
    currencyCode: 'SEK'
  },
  SG: {
    currencyCode: 'SGD'
  },
  SI: {
    currencyCode: 'EUR'
  },
  SK: {
    currencyCode: 'EUR'
  },
  SL: {
    currencyCode: 'SLL'
  },
  SN: {
    currencyCode: 'XOF'
  },
  SR: {
    currencyCode: 'SRD'
  },
  ST: {
    currencyCode: 'STD'
  },
  SV: {
    currencyCode: 'SVC'
  },
  SZ: {
    currencyCode: 'SZL'
  },
  TC: {
    currencyCode: 'USD'
  },
  TD: {
    currencyCode: 'XAF'
  },
  TG: {
    currencyCode: 'XOF'
  },
  TH: {
    currencyCode: 'THB'
  },
  TJ: {
    currencyCode: 'TJS'
  },
  TM: {
    currencyCode: 'TMT'
  },
  TN: {
    currencyCode: 'TND'
  },
  TR: {
    currencyCode: 'TRY'
  },
  TT: {
    currencyCode: 'TTD'
  },
  TW: {
    currencyCode: 'TWD'
  },
  TZ: {
    currencyCode: 'TZS'
  },
  UA: {
    currencyCode: 'UAH'
  },
  UG: {
    currencyCode: 'UGX'
  },
  US: {
    currencyCode: 'USD'
  },
  UY: {
    currencyCode: 'UYU'
  },
  UZ: {
    currencyCode: 'UZS'
  },
  VC: {
    currencyCode: 'XCD'
  },
  VE: {
    currencyCode: 'VEF'
  },
  VG: {
    currencyCode: 'USD'
  },
  VI: {
    currencyCode: 'USD'
  },
  VN: {
    currencyCode: 'VND'
  },
  YE: {
    currencyCode: 'YER'
  },
  ZA: {
    currencyCode: 'ZAR'
  },
  ZM: {
    currencyCode: 'ZMW'
  },
  ZW: {
    currencyCode: 'USD'
  }
};

/**
 * @namespace CurrencyDefaults
 */
var CurrencyDefaults = {
  'default': {
    currencySymbol: function currencySymbol(formatter) {
      return formatter.currencyCode();
    },
    internationalCurrencySymbol: function internationalCurrencySymbol(formatter) {
      return formatter.currencyCode();
    },
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    usesGroupingSeparator: true
  },
  AED: {
    currencySymbol: 'د.إ',
    internationalCurrencySymbol: 'د.إ'
  },
  ALL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  AMD: {
    currencySymbol: 'դր.',
    internationalCurrencySymbol: 'դր.'
  },
  AOA: {
    currencySymbol: 'Kz',
    internationalCurrencySymbol: 'Kz'
  },
  ARS: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  AUD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  AWG: {
    currencySymbol: 'ƒ',
    internationalCurrencySymbol: 'ƒ'
  },
  AZN: {
    currencySymbol: '₼',
    internationalCurrencySymbol: '₼'
  },
  BAM: {
    currencySymbol: 'КМ',
    internationalCurrencySymbol: 'КМ'
  },
  BBD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BDT: {
    currencySymbol: '৳',
    internationalCurrencySymbol: '৳'
  },
  BGN: {
    currencySymbol: 'лв',
    internationalCurrencySymbol: 'лв'
  },
  BHD: {
    currencySymbol: 'ب.د',
    internationalCurrencySymbol: 'ب.د',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  BMD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BND: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BOB: {
    currencySymbol: 'Bs.',
    internationalCurrencySymbol: 'Bs.'
  },
  BRL: {
    currencySymbol: 'R$',
    internationalCurrencySymbol: 'R$'
  },
  BSD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BTN: {
    currencySymbol: 'Nu.',
    internationalCurrencySymbol: 'Nu.'
  },
  BWP: {
    currencySymbol: 'P',
    internationalCurrencySymbol: 'P'
  },
  BYR: {
    currencySymbol: 'Br',
    internationalCurrencySymbol: 'Br'
  },
  BZD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CAD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CDF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  CHF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  CLP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  CNY: {
    currencySymbol: '¥',
    internationalCurrencySymbol: '¥'
  },
  COP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CRC: {
    currencySymbol: '₡',
    internationalCurrencySymbol: '₡'
  },
  CVE: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CZK: {
    currencySymbol: 'Kč',
    internationalCurrencySymbol: 'Kč'
  },
  DKK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  DOP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  DZD: {
    currencySymbol: 'د.ج',
    internationalCurrencySymbol: 'د.ج'
  },
  EGP: {
    currencySymbol: 'E£',
    internationalCurrencySymbol: 'E£'
  },
  ETB: {
    currencySymbol: 'ብር',
    internationalCurrencySymbol: 'ብር'
  },
  EUR: {
    currencySymbol: '€',
    internationalCurrencySymbol: '€'
  },
  FJD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  GBP: {
    currencySymbol: '£',
    internationalCurrencySymbol: '£'
  },
  GEL: {
    currencySymbol: 'ლ,',
    internationalCurrencySymbol: 'ლ,'
  },
  GHS: {
    currencySymbol: '₵',
    internationalCurrencySymbol: '₵'
  },
  GIP: {
    currencySymbol: '£',
    internationalCurrencySymbol: '£'
  },
  GMD: {
    currencySymbol: 'D',
    internationalCurrencySymbol: 'D'
  },
  GTQ: {
    currencySymbol: 'Q',
    internationalCurrencySymbol: 'Q'
  },
  GYD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  HKD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  HNL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  HRK: {
    currencySymbol: 'kn',
    internationalCurrencySymbol: 'kn'
  },
  HTG: {
    currencySymbol: 'G',
    internationalCurrencySymbol: 'G'
  },
  HUF: {
    currencySymbol: 'Ft',
    internationalCurrencySymbol: 'Ft'
  },
  IDR: {
    currencySymbol: 'Rp',
    internationalCurrencySymbol: 'Rp'
  },
  ILS: {
    currencySymbol: '₪',
    internationalCurrencySymbol: '₪'
  },
  INR: {
    currencySymbol: '₹',
    internationalCurrencySymbol: '₹'
  },
  ISK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  JMD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  JOD: {
    currencySymbol: 'د.ا',
    internationalCurrencySymbol: 'د.ا',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  JPY: {
    currencySymbol: '¥',
    internationalCurrencySymbol: '¥',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  KES: {
    currencySymbol: 'KSh',
    internationalCurrencySymbol: 'KSh'
  },
  KGS: {
    currencySymbol: 'som',
    internationalCurrencySymbol: 'som'
  },
  KHR: {
    currencySymbol: '៛',
    internationalCurrencySymbol: '៛'
  },
  KRW: {
    currencySymbol: '₩',
    internationalCurrencySymbol: '₩',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  KWD: {
    currencySymbol: 'د.ك',
    internationalCurrencySymbol: 'د.ك',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  KYD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  KZT: {
    currencySymbol: '〒',
    internationalCurrencySymbol: '〒'
  },
  LAK: {
    currencySymbol: '₭',
    internationalCurrencySymbol: '₭'
  },
  LBP: {
    currencySymbol: 'ل.ل',
    internationalCurrencySymbol: 'ل.ل'
  },
  LKR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  LRD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  LTL: {
    currencySymbol: 'Lt',
    internationalCurrencySymbol: 'Lt'
  },
  MAD: {
    currencySymbol: 'د.م.',
    internationalCurrencySymbol: 'د.م.'
  },
  MDL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  MGA: {
    currencySymbol: 'Ar',
    internationalCurrencySymbol: 'Ar',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  MKD: {
    currencySymbol: 'ден',
    internationalCurrencySymbol: 'ден'
  },
  MMK: {
    currencySymbol: 'K',
    internationalCurrencySymbol: 'K'
  },
  MNT: {
    currencySymbol: '₮',
    internationalCurrencySymbol: '₮'
  },
  MOP: {
    currencySymbol: 'P',
    internationalCurrencySymbol: 'P'
  },
  MRO: {
    currencySymbol: 'UM',
    internationalCurrencySymbol: 'UM',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  MUR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  MWK: {
    currencySymbol: 'MK',
    internationalCurrencySymbol: 'MK'
  },
  MXN: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  MYR: {
    currencySymbol: 'RM',
    internationalCurrencySymbol: 'RM'
  },
  MZN: {
    currencySymbol: 'MTn',
    internationalCurrencySymbol: 'MTn'
  },
  NAD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  NGN: {
    currencySymbol: '₦',
    internationalCurrencySymbol: '₦'
  },
  NIO: {
    currencySymbol: 'C$',
    internationalCurrencySymbol: 'C$'
  },
  NOK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  NPR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  NZD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  OMR: {
    currencySymbol: 'ر.ع.',
    internationalCurrencySymbol: 'ر.ع.',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  PAB: {
    currencySymbol: 'B/.',
    internationalCurrencySymbol: 'B/.'
  },
  PEN: {
    currencySymbol: 'S/.',
    internationalCurrencySymbol: 'S/.'
  },
  PGK: {
    currencySymbol: 'K',
    internationalCurrencySymbol: 'K'
  },
  PHP: {
    currencySymbol: '₱',
    internationalCurrencySymbol: '₱'
  },
  PKR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  PLN: {
    currencySymbol: 'zł',
    internationalCurrencySymbol: 'zł'
  },
  PYG: {
    currencySymbol: '₲',
    internationalCurrencySymbol: '₲'
  },
  QAR: {
    currencySymbol: 'ر.ق',
    internationalCurrencySymbol: 'ر.ق'
  },
  RON: {
    currencySymbol: 'Lei',
    internationalCurrencySymbol: 'Lei'
  },
  RSD: {
    currencySymbol: 'РСД',
    internationalCurrencySymbol: 'РСД'
  },
  RUB: {
    currencySymbol: '₽',
    internationalCurrencySymbol: '₽'
  },
  RWF: {
    currencySymbol: 'FRw',
    internationalCurrencySymbol: 'FRw'
  },
  SAR: {
    currencySymbol: 'ر.س',
    internationalCurrencySymbol: 'ر.س'
  },
  SBD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  SCR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  SEK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  SGD: {
    currencySymbol: 'S$',
    internationalCurrencySymbol: 'S$'
  },
  SLL: {
    currencySymbol: 'Le',
    internationalCurrencySymbol: 'Le'
  },
  SRD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  STD: {
    currencySymbol: 'Db',
    internationalCurrencySymbol: 'Db'
  },
  SVC: {
    currencySymbol: '₡',
    internationalCurrencySymbol: '₡'
  },
  SZL: {
    currencySymbol: 'E',
    internationalCurrencySymbol: 'E'
  },
  THB: {
    currencySymbol: '฿',
    internationalCurrencySymbol: '฿'
  },
  TJS: {
    currencySymbol: 'ЅМ',
    internationalCurrencySymbol: 'ЅМ'
  },
  TMT: {
    currencySymbol: 'm',
    internationalCurrencySymbol: 'm'
  },
  TND: {
    currencySymbol: 'د.ت',
    internationalCurrencySymbol: 'د.ت',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  TRY: {
    currencySymbol: '₺',
    internationalCurrencySymbol: '₺'
  },
  TTD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  TWD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  TZS: {
    currencySymbol: 'Sh',
    internationalCurrencySymbol: 'Sh'
  },
  UAH: {
    currencySymbol: '₴',
    internationalCurrencySymbol: '₴'
  },
  UGX: {
    currencySymbol: 'USh',
    internationalCurrencySymbol: 'USh'
  },
  USD: {
    currencySymbol: '$',
    internationalCurrencySymbol: 'US$'
  },
  UYU: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  UZS: {
    currencySymbol: 'лв',
    internationalCurrencySymbol: 'лв'
  },
  VEF: {
    currencySymbol: 'Bs F',
    internationalCurrencySymbol: 'Bs F'
  },
  VND: {
    currencySymbol: '₫',
    internationalCurrencySymbol: '₫',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  XAF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  XCD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  XOF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  YER: {
    currencySymbol: '﷼',
    internationalCurrencySymbol: '﷼'
  },
  ZAR: {
    currencySymbol: 'R',
    internationalCurrencySymbol: 'R'
  },
  ZMW: {
    currencySymbol: 'ZMK',
    internationalCurrencySymbol: 'ZMK'
  }
};

exports['default'] = NumberFormatter;
module.exports = exports['default'];

},{"./formatter":14,"./number_formatter_settings_formatter":17,"./utils":22,"stround":3}],17:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _formatter = _dereq_('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var NumberFormatterSettings = function NumberFormatterSettings() {
  _classCallCheck(this, NumberFormatterSettings);

  /** @type boolean */
  this.alwaysShowsDecimalSeparator = false;

  /** @type number */
  this.groupingSize = 0;

  /** @type number */
  this.maximumFractionDigits = 0;

  /** @type number */
  this.minimumFractionDigits = 0;

  /** @type number */
  this.minimumIntegerDigits = 0;

  /** @type string */
  this.prefix = '';

  /** @type string */
  this.suffix = '';

  /** @type boolean */
  this.usesGroupingSeparator = false;
}

/**
 * Returns a string composed of the given character repeated `length` times.
 *
 * @param {string} character
 * @param {number} length
 * @returns {string}
 * @private
 */
;

function chars(character, length) {
  return new Array(length + 1).join(character);
}

/**
 * @const
 * @private
 */
var DIGIT = '#';

/**
 * @const
 * @private
 */
var PADDING = '0';

/**
 * @const
 * @private
 */
var DECIMAL_SEPARATOR = '.';

/**
 * @const
 * @private
 */
var GROUPING_SEPARATOR = ',';

var NumberFormatterSettingsFormatter = (function (_Formatter) {
  _inherits(NumberFormatterSettingsFormatter, _Formatter);

  function NumberFormatterSettingsFormatter() {
    _classCallCheck(this, NumberFormatterSettingsFormatter);

    _get(Object.getPrototypeOf(NumberFormatterSettingsFormatter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NumberFormatterSettingsFormatter, [{
    key: 'format',

    /**
     * @param {NumberFormatterSettings} settings
     * @returns {string}
     */
    value: function format(settings) {
      var result = '';

      var minimumIntegerDigits = settings.minimumIntegerDigits;
      if (minimumIntegerDigits !== 0) {
        result += chars(PADDING, minimumIntegerDigits);
      }

      result = DIGIT + result;

      if (settings.usesGroupingSeparator) {
        while (result.length <= settings.groupingSize) {
          result = DIGIT + result;
        }

        result = result.slice(0, -settings.groupingSize) + GROUPING_SEPARATOR + result.slice(-settings.groupingSize);
      }

      var minimumFractionDigits = settings.minimumFractionDigits;
      var maximumFractionDigits = settings.maximumFractionDigits;
      var hasFractionalPart = settings.alwaysShowsDecimalSeparator || minimumFractionDigits > 0 || maximumFractionDigits > 0;

      if (hasFractionalPart) {
        result += DECIMAL_SEPARATOR;
        for (var i = 0, _length = maximumFractionDigits; i < _length; i++) {
          result += i < minimumFractionDigits ? PADDING : DIGIT;
        }
      }

      return settings.prefix + result + settings.suffix;
    }

    /**
     * @param {string} string
     * @returns {?NumberFormatterSettings}
     */
  }, {
    key: 'parse',
    value: function parse(string) {
      var result = new NumberFormatterSettings();

      var hasPassedPrefix = false;
      var hasStartedSuffix = false;
      var decimalSeparatorIndex = null;
      var groupingSeparatorIndex = null;
      var lastIntegerDigitIndex = null;

      for (var i = 0, length = string.length; i < length; i++) {
        var c = string[i];

        switch (c) {
          case DIGIT:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            if (decimalSeparatorIndex !== null) {
              result.maximumFractionDigits++;
            }
            break;

          case PADDING:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            if (decimalSeparatorIndex === null) {
              result.minimumIntegerDigits++;
            } else {
              result.minimumFractionDigits++;
              result.maximumFractionDigits++;
            }
            break;

          case DECIMAL_SEPARATOR:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            decimalSeparatorIndex = i;
            lastIntegerDigitIndex = i - 1;
            break;

          case GROUPING_SEPARATOR:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            groupingSeparatorIndex = i;
            break;

          default:
            if (hasPassedPrefix) {
              hasStartedSuffix = true;
              result.suffix += c;
            } else {
              result.prefix += c;
            }
        }
      }

      if (decimalSeparatorIndex === null) {
        lastIntegerDigitIndex = length - 1;
      }

      if (decimalSeparatorIndex === length - 1) {
        result.alwaysShowsDecimalSeparator = true;
      }

      if (groupingSeparatorIndex !== null) {
        result.groupingSize = lastIntegerDigitIndex - groupingSeparatorIndex;
        result.usesGroupingSeparator = true;
      }

      return result;
    }
  }]);

  return NumberFormatterSettingsFormatter;
})(_formatter2['default']);

exports['default'] = NumberFormatterSettingsFormatter;
module.exports = exports['default'];

},{"./formatter":14}],18:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var NANPPhoneDelimiters = {
  name: 'NANPPhoneDelimiters',
  0: '(',
  4: ')',
  5: ' ',
  9: '-'
};

/**
 * @const
 * @private
 */
var NANPPhoneDelimitersWithOne = {
  name: 'NANPPhoneDelimitersWithOne',
  1: ' ',
  2: '(',
  6: ')',
  7: ' ',
  11: '-'
};

/**
 * @const
 * @private
 */
var E164PhoneDelimitersWithOneDigit = {
  name: 'E164PhoneDelimitersWithOneDigit',
  2: ' ',
  3: '(',
  7: ')',
  8: ' ',
  12: '-'
};

/**
 * @const
 * @private
 */
var E164PhoneDelimitersWithTwoDigit = {
  name: 'E164PhoneDelimitersWithTwoDigit',
  3: ' ',
  4: '(',
  8: ')',
  9: ' ',
  13: '-'
};

/**
 * @const
 * @private
 */
var E164PhoneDelimitersWithThreeDigit = {
  name: 'E164PhoneDelimitersWithThreeDigit',
  4: ' ',
  5: '(',
  9: ')',
  10: ' ',
  14: '-'
};

/**
 * This should match any characters in the maps above.
 *
 * @const
 * @private
 */
var DELIMITER_PATTERN = /[-\(\) ]/g;

/**
 * @const
 * @private
 */
var DEFAULT_COUNTRY_CODE = {
  "E164": "1",
  "country": ["American Samoa", "Anguilla", "Antigua and Barbuda", "Bahamas", "Barbados", "Bermuda", "British Virgin Islands", "Canada", "Cayman Islands", "Dominica", "Dominican Republic", "Grenada", "Guam", "Jamaica", "Montserrat", "Northern Mariana Islands", "Puerto Rico", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Vincent and the Grenadines", "Sint Maarten", "Trinidad and Tobago", "Turks and Caicos Islands", "U.S. Virgin Islands", "United States"]
};

/**
 * This is an internal store for the current country
 *
 * @private
 */
var currentCountryCode = DEFAULT_COUNTRY_CODE;

/**
 * @extends DelimitedTextFormatter
 */

var PhoneFormatter = (function (_DelimitedTextFormatter) {
  _inherits(PhoneFormatter, _DelimitedTextFormatter);

  /**
   * @throws {Error} if anything is passed in
   * @param {Array} args
   */

  function PhoneFormatter() {
    _classCallCheck(this, PhoneFormatter);

    _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'constructor', this).call(this);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length !== 0) {
      throw new Error('were you trying to set a delimiter (' + args[0] + ')?');
    }
  }

  /**
   * @param {string} chr
   * @returns {boolean}
   */

  _createClass(PhoneFormatter, [{
    key: 'isDelimiter',
    value: function isDelimiter(chr) {
      var map = this.delimiterMap;
      for (var index in map) {
        if (map.hasOwnProperty(index)) {
          if (map[index] === chr) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * @param {number} index
     * @returns {?string}
     */
  }, {
    key: 'delimiterAt',
    value: function delimiterAt(index) {
      return this.delimiterMap[index];
    }

    /**
     * @param {number} index
     * @returns {boolean}
     */
  }, {
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      var delimiter = this.delimiterAt(index);
      return delimiter !== undefined && delimiter !== null;
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      if (!error) {
        error = function () {};
      }
      var digits = this.digitsWithoutCountryCode(text);
      // Source: http://en.wikipedia.org/wiki/North_American_Numbering_Plan
      //
      // Area Code
      if (text.length < 10) {
        error('phone-formatter.number-too-short');
      }
      if (digits[0] === '0') {
        error('phone-formatter.area-code-zero');
      }
      if (digits[0] === '1') {
        error('phone-formatter.area-code-one');
      }
      if (digits[1] === '9') {
        error('phone-formatter.area-code-n9n');
      }
      // Central Office Code
      if (digits[3] === '1') {
        error('phone-formatter.central-office-one');
      }
      if (digits.slice(4, 6) === '11') {
        error('phone-formatter.central-office-n11');
      }
      return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'parse', this).call(this, text, error);
    }

    /**
     * @param {string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      this.guessFormatFromText(value);
      return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'format', this).call(this, this.removeDelimiterMapChars(value));
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      this.guessFormatFromText(change.proposed.text);

      if (change.inserted.text.length > 1) {
        // handle pastes
        var text = change.current.text;
        var selectedRange = change.current.selectedRange;
        var toInsert = change.inserted.text;

        // Replace the selection with the new text, remove non-digits, then format.
        var formatted = this.format((text.slice(0, selectedRange.start) + toInsert + text.slice(selectedRange.start + selectedRange.length)).replace(/[^\d]/g, ''));

        change.proposed = {
          text: formatted,
          selectedRange: {
            start: formatted.length - (text.length - (selectedRange.start + selectedRange.length)),
            length: 0
          }
        };

        return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      }

      if (/^\d*$/.test(change.inserted.text) || change.proposed.text.indexOf('+') === 0) {
        var formatName = this.delimiterMap.name;

        // First guess at the localized format
        if (currentCountryCode.localizedFormat) {
          this.delimiterMap = currentCountryCode.localizedFormat;
          this.maximumLength = currentCountryCode.localizedFormat.maximumLength;
          formatName = 'localized-' + currentCountryCode.E164;
        }

        // We need to store the change and current format guess so that if the isChangeValid
        // call to super changes the proposed text such that the format we thought is no longer
        // valid. If that does happen we actually just rerun it through with the correct format
        var originalProposed = change.proposed.text;
        var _isChangeValid = _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);

        this.guessFormatFromText(change.proposed.text);

        // Make sure if the localizedFormat changed, respect that
        if (currentCountryCode.localizedFormat) {
          this.delimiterMap = currentCountryCode.localizedFormat;
          this.maximumLength = currentCountryCode.localizedFormat.maximumLength;
          this.delimiterMap.name = 'localized-' + currentCountryCode.E164;
        }

        if (formatName === this.delimiterMap.name) {
          return _isChangeValid;
        } else {
          var originalChange = change;
          originalChange.proposed.text = originalProposed;
          return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'isChangeValid', this).call(this, originalChange, error);
        }
      } else {
        return false;
      }
    }

    /**
     * Re-configures this formatter to use the delimiters appropriate
     * for the given text.
     *
     * @param {string} text A potentially formatted string containing a phone number.
     * @private
     */
  }, {
    key: 'guessFormatFromText',
    value: function guessFormatFromText(text) {
      currentCountryCode = DEFAULT_COUNTRY_CODE;
      if (text && text[0] === '+') {
        if (text.length > 1) {
          var isValidCountryCode = function isValidCountryCode(countryCode) {
            var matchingCodes = COUNTRY_CODES.filter(function (country) {
              return country.E164 === countryCode;
            });

            return matchingCodes.length > 0;
          };

          var rawText = this.removeDelimiterMapChars(text);
          if (currentCountryCode = isValidCountryCode(rawText[1])) {
            this.delimiterMap = E164PhoneDelimitersWithOneDigit;
            this.maximumLength = 1 + 1 + 10 + 5;
          } else if (text.length > 2 && (currentCountryCode = isValidCountryCode(rawText.slice(1, 3)))) {
            this.delimiterMap = E164PhoneDelimitersWithTwoDigit;
            this.maximumLength = 1 + 2 + 10 + 5;
          } else {
            currentCountryCode = isValidCountryCode(rawText.slice(1, 4)) || DEFAULT_COUNTRY_CODE;
            this.delimiterMap = E164PhoneDelimitersWithThreeDigit;
            this.maximumLength = 1 + 3 + 10 + 5;
          }
        } else {

          this.delimiterMap = E164PhoneDelimitersWithThreeDigit;
          this.maximumLength = 1 + 3 + 10 + 5;
        }
      } else if (text && text[0] === '1') {
        this.delimiterMap = NANPPhoneDelimitersWithOne;
        this.maximumLength = 1 + 10 + 5;
      } else if (text && text[0] === ' ') {
        this.delimiterMap = NANPPhoneDelimiters;
        this.maximumLength = 10 + 5;
      } else {
        this.delimiterMap = NANPPhoneDelimiters;
        this.maximumLength = 10 + 4;
      }
    }

    /**
     * Gives back just the phone number digits as a string without the
     * country code. Future-proofing internationalization where the country code
     * isn't just +1.
     *
     * @param {string} text
     * @private
     */
  }, {
    key: 'digitsWithoutCountryCode',
    value: function digitsWithoutCountryCode(text) {
      var digits = (text || '').replace(/[^\d]/g, '');
      var extraDigits = digits.length - 10;
      if (extraDigits > 0) {
        digits = digits.substr(extraDigits);
      }
      return digits;
    }

    /**
     * Removes characters from the phone number that will be added
     * by the formatter.
     *
     * @param {string} text
     * @private
     */
  }, {
    key: 'removeDelimiterMapChars',
    value: function removeDelimiterMapChars(text) {
      return (text || '').replace(DELIMITER_PATTERN, '');
    }
  }]);

  return PhoneFormatter;
})(_delimited_text_formatter2['default']);

var COUNTRY_CODES = [{
  "E164": "93",
  "country": "Afghanistan"
}, {
  "E164": "355",
  "country": "Albania"
}, {
  "E164": "213",
  "country": "Algeria"
}, {
  "E164": "1",
  "country": ["American Samoa", "Anguilla", "Antigua and Barbuda", "Bahamas", "Barbados", "Bermuda", "British Virgin Islands", "Canada", "Cayman Islands", "Dominica", "Dominican Republic", "Grenada", "Guam", "Jamaica", "Montserrat", "Northern Mariana Islands", "Puerto Rico", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Vincent and the Grenadines", "Sint Maarten", "Trinidad and Tobago", "Turks and Caicos Islands", "U.S. Virgin Islands", "United States"]
}, {
  "E164": "376",
  "country": "Andorra"
}, {
  "E164": "244",
  "country": "Angola"
}, {
  "E164": "672",
  "country": "Antarctica"
}, {
  "E164": "54",
  "country": "Argentina"
}, {
  "E164": "374",
  "country": "Armenia"
}, {
  "E164": "297",
  "country": "Aruba"
}, {
  "E164": "43",
  "country": "Austria"
}, {
  "E164": "994",
  "country": "Azerbaijan"
}, {
  "E164": "973",
  "country": "Bahrain"
}, {
  "E164": "880",
  "country": "Bangladesh"
}, {
  "E164": "375",
  "country": "Belarus"
}, {
  "E164": "32",
  "country": "Belgium"
}, {
  "E164": "501",
  "country": "Belize"
}, {
  "E164": "229",
  "country": "Benin"
}, {
  "E164": "975",
  "country": "Bhutan"
}, {
  "E164": "591",
  "country": "Bolivia"
}, {
  "E164": "387",
  "country": "Bosnia and Herzegovina"
}, {
  "E164": "267",
  "country": "Botswana"
}, {
  "E164": "55",
  "country": "Brazil"
}, {
  "E164": "246",
  "country": "British Indian Ocean Territory"
}, {
  "E164": "673",
  "country": "Brunei"
}, {
  "E164": "359",
  "country": "Bulgaria"
}, {
  "E164": "226",
  "country": "Burkina Faso"
}, {
  "E164": "257",
  "country": "Burundi"
}, {
  "E164": "855",
  "country": "Cambodia"
}, {
  "E164": "237",
  "country": "Cameroon"
}, {
  "E164": "238",
  "country": "Cape Verde"
}, {
  "E164": "236",
  "country": "Central African Republic"
}, {
  "E164": "235",
  "country": "Chad"
}, {
  "E164": "56",
  "country": "Chile"
}, {
  "E164": "86",
  "country": "China"
}, {
  "E164": "61",
  "country": ["Australia", "Christmas Island", "Cocos Islands"]
}, {
  "E164": "57",
  "country": "Colombia"
}, {
  "E164": "269",
  "country": "Comoros"
}, {
  "E164": "682",
  "country": "Cook Islands"
}, {
  "E164": "506",
  "country": "Costa Rica"
}, {
  "E164": "385",
  "country": "Croatia"
}, {
  "E164": "53",
  "country": "Cuba"
}, {
  "E164": "599",
  "country": ["Curacao", "Netherlands Antilles"]
}, {
  "E164": "357",
  "country": "Cyprus"
}, {
  "E164": "420",
  "country": "Czech Republic"
}, {
  "E164": "243",
  "country": "Democratic Republic of the Congo"
}, {
  "E164": "45",
  "country": "Denmark"
}, {
  "E164": "253",
  "country": "Djibouti"
}, {
  "E164": "670",
  "country": "East Timor"
}, {
  "E164": "593",
  "country": "Ecuador"
}, {
  "E164": "20",
  "country": "Egypt"
}, {
  "E164": "503",
  "country": "El Salvador"
}, {
  "E164": "240",
  "country": "Equatorial Guinea"
}, {
  "E164": "291",
  "country": "Eritrea"
}, {
  "E164": "372",
  "country": "Estonia"
}, {
  "E164": "251",
  "country": "Ethiopia"
}, {
  "E164": "500",
  "country": "Falkland Islands"
}, {
  "E164": "298",
  "country": "Faroe Islands"
}, {
  "E164": "679",
  "country": "Fiji"
}, {
  "E164": "358",
  "country": "Finland"
}, {
  "E164": "33",
  "country": "France"
}, {
  "E164": "689",
  "country": "French Polynesia"
}, {
  "E164": "241",
  "country": "Gabon"
}, {
  "E164": "220",
  "country": "Gambia"
}, {
  "E164": "995",
  "country": "Georgia"
}, {
  "E164": "49",
  "country": "Germany"
}, {
  "E164": "233",
  "country": "Ghana"
}, {
  "E164": "350",
  "country": "Gibraltar"
}, {
  "E164": "30",
  "country": "Greece"
}, {
  "E164": "299",
  "country": "Greenland"
}, {
  "E164": "502",
  "country": "Guatemala"
}, {
  "E164": "44",
  "country": ["Guernsey", "Isle of Man", "Jersey", "United Kingdom"]
}, {
  "E164": "224",
  "country": "Guinea"
}, {
  "E164": "245",
  "country": "Guinea-Bissau"
}, {
  "E164": "592",
  "country": "Guyana"
}, {
  "E164": "509",
  "country": "Haiti"
}, {
  "E164": "504",
  "country": "Honduras"
}, {
  "E164": "852",
  "country": "Hong Kong"
}, {
  "E164": "36",
  "country": "Hungary"
}, {
  "E164": "354",
  "country": "Iceland"
}, {
  "E164": "91",
  "country": "India"
}, {
  "E164": "62",
  "country": "Indonesia"
}, {
  "E164": "98",
  "country": "Iran"
}, {
  "E164": "964",
  "country": "Iraq"
}, {
  "E164": "353",
  "country": "Ireland"
}, {
  "E164": "972",
  "country": "Israel"
}, {
  "E164": "39",
  "country": ["Italy", "Vatican"]
}, {
  "E164": "225",
  "country": "Ivory Coast"
}, {
  "E164": "81",
  "country": "Japan"
}, {
  "E164": "962",
  "country": "Jordan"
}, {
  "E164": "7",
  "country": ["Kazakhstan", "Russia"],
  "localizedFormat": {
    "maximumLength": 1 + 1 + 10 + 6,
    2: ' ',
    3: '(',
    7: ')',
    8: ' ',
    12: '-',
    15: '-'
  }
}, {
  "E164": "254",
  "country": "Kenya"
}, {
  "E164": "686",
  "country": "Kiribati"
}, {
  "E164": "383",
  "country": "Kosovo"
}, {
  "E164": "965",
  "country": "Kuwait"
}, {
  "E164": "996",
  "country": "Kyrgyzstan"
}, {
  "E164": "856",
  "country": "Laos"
}, {
  "E164": "371",
  "country": "Latvia"
}, {
  "E164": "961",
  "country": "Lebanon"
}, {
  "E164": "266",
  "country": "Lesotho"
}, {
  "E164": "231",
  "country": "Liberia"
}, {
  "E164": "218",
  "country": "Libya"
}, {
  "E164": "423",
  "country": "Liechtenstein"
}, {
  "E164": "370",
  "country": "Lithuania"
}, {
  "E164": "352",
  "country": "Luxembourg"
}, {
  "E164": "853",
  "country": "Macao"
}, {
  "E164": "389",
  "country": "Macedonia"
}, {
  "E164": "261",
  "country": "Madagascar"
}, {
  "E164": "265",
  "country": "Malawi"
}, {
  "E164": "60",
  "country": "Malaysia"
}, {
  "E164": "960",
  "country": "Maldives"
}, {
  "E164": "223",
  "country": "Mali"
}, {
  "E164": "356",
  "country": "Malta"
}, {
  "E164": "692",
  "country": "Marshall Islands"
}, {
  "E164": "222",
  "country": "Mauritania"
}, {
  "E164": "230",
  "country": "Mauritius"
}, {
  "E164": "262",
  "country": ["Mayotte", "Reunion"]
}, {
  "E164": "52",
  "country": "Mexico"
}, {
  "E164": "691",
  "country": "Micronesia"
}, {
  "E164": "373",
  "country": "Moldova"
}, {
  "E164": "377",
  "country": "Monaco"
}, {
  "E164": "976",
  "country": "Mongolia"
}, {
  "E164": "382",
  "country": "Montenegro"
}, {
  "E164": "212",
  "country": ["Morocco", "Western Sahara"]
}, {
  "E164": "258",
  "country": "Mozambique"
}, {
  "E164": "95",
  "country": "Myanmar"
}, {
  "E164": "264",
  "country": "Namibia"
}, {
  "E164": "674",
  "country": "Nauru"
}, {
  "E164": "977",
  "country": "Nepal"
}, {
  "E164": "31",
  "country": "Netherlands"
}, {
  "E164": "687",
  "country": "New Caledonia"
}, {
  "E164": "64",
  "country": "New Zealand"
}, {
  "E164": "64",
  "country": "Pitcairn"
}, {
  "E164": "505",
  "country": "Nicaragua"
}, {
  "E164": "227",
  "country": "Niger"
}, {
  "E164": "234",
  "country": "Nigeria"
}, {
  "E164": "683",
  "country": "Niue"
}, {
  "E164": "850",
  "country": "North Korea"
}, {
  "E164": "47",
  "country": ["Norway", "Svalbard and Jan Mayen"]
}, {
  "E164": "968",
  "country": "Oman"
}, {
  "E164": "92",
  "country": "Pakistan"
}, {
  "E164": "680",
  "country": "Palau"
}, {
  "E164": "970",
  "country": "Palestine"
}, {
  "E164": "507",
  "country": "Panama"
}, {
  "E164": "675",
  "country": "Papua New Guinea"
}, {
  "E164": "595",
  "country": "Paraguay"
}, {
  "E164": "51",
  "country": "Peru"
}, {
  "E164": "63",
  "country": "Philippines"
}, {
  "E164": "48",
  "country": "Poland"
}, {
  "E164": "351",
  "country": "Portugal"
}, {
  "E164": "974",
  "country": "Qatar"
}, {
  "E164": "242",
  "country": "Republic of the Congo"
}, {
  "E164": "40",
  "country": "Romania"
}, {
  "E164": "250",
  "country": "Rwanda"
}, {
  "E164": "590",
  "country": "Saint Barthelemy"
}, {
  "E164": "290",
  "country": "Saint Helena"
}, {
  "E164": "508",
  "country": "Saint Pierre and Miquelon"
}, {
  "E164": "685",
  "country": "Samoa"
}, {
  "E164": "378",
  "country": "San Marino"
}, {
  "E164": "239",
  "country": "Sao Tome and Principe"
}, {
  "E164": "966",
  "country": "Saudi Arabia"
}, {
  "E164": "221",
  "country": "Senegal"
}, {
  "E164": "381",
  "country": "Serbia"
}, {
  "E164": "248",
  "country": "Seychelles"
}, {
  "E164": "232",
  "country": "Sierra Leone"
}, {
  "E164": "65",
  "country": "Singapore"
}, {
  "E164": "421",
  "country": "Slovakia"
}, {
  "E164": "386",
  "country": "Slovenia"
}, {
  "E164": "677",
  "country": "Solomon Islands"
}, {
  "E164": "252",
  "country": "Somalia"
}, {
  "E164": "27",
  "country": "South Africa"
}, {
  "E164": "82",
  "country": "South Korea"
}, {
  "E164": "211",
  "country": "South Sudan"
}, {
  "E164": "34",
  "country": "Spain"
}, {
  "E164": "94",
  "country": "Sri Lanka"
}, {
  "E164": "249",
  "country": "Sudan"
}, {
  "E164": "597",
  "country": "Suriname"
}, {
  "E164": "268",
  "country": "Swaziland"
}, {
  "E164": "46",
  "country": "Sweden"
}, {
  "E164": "41",
  "country": "Switzerland"
}, {
  "E164": "963",
  "country": "Syria"
}, {
  "E164": "886",
  "country": "Taiwan"
}, {
  "E164": "992",
  "country": "Tajikistan"
}, {
  "E164": "255",
  "country": "Tanzania"
}, {
  "E164": "66",
  "country": "Thailand"
}, {
  "E164": "228",
  "country": "Togo"
}, {
  "E164": "690",
  "country": "Tokelau"
}, {
  "E164": "676",
  "country": "Tonga"
}, {
  "E164": "216",
  "country": "Tunisia"
}, {
  "E164": "90",
  "country": "Turkey"
}, {
  "E164": "993",
  "country": "Turkmenistan"
}, {
  "E164": "688",
  "country": "Tuvalu"
}, {
  "E164": "256",
  "country": "Uganda"
}, {
  "E164": "380",
  "country": "Ukraine"
}, {
  "E164": "971",
  "country": "United Arab Emirates"
}, {
  "E164": "598",
  "country": "Uruguay"
}, {
  "E164": "998",
  "country": "Uzbekistan"
}, {
  "E164": "678",
  "country": "Vanuatu"
}, {
  "E164": "58",
  "country": "Venezuela"
}, {
  "E164": "84",
  "country": "Vietnam"
}, {
  "E164": "681",
  "country": "Wallis and Futuna"
}, {
  "E164": "967",
  "country": "Yemen"
}, {
  "E164": "260",
  "country": "Zambia"
}, {
  "E164": "263",
  "country": "Zimbabwe"
}];
exports['default'] = PhoneFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],19:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = _dereq_('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var SocialSecurityNumberFormatter = (function (_DelimitedTextFormatter) {
  _inherits(SocialSecurityNumberFormatter, _DelimitedTextFormatter);

  function SocialSecurityNumberFormatter() {
    _classCallCheck(this, SocialSecurityNumberFormatter);

    _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'constructor', this).call(this, '-');
    this.maximumLength = 9 + 2;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(SocialSecurityNumberFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 3 || index === 6;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }
  }]);

  return SocialSecurityNumberFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = SocialSecurityNumberFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],20:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = _dereq_('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _undo_manager = _dereq_('./undo_manager');

var _undo_manager2 = _interopRequireDefault(_undo_manager);

var _utils = _dereq_('./utils');

var _caret = _dereq_('./caret');

var _caret2 = _interopRequireDefault(_caret);

/**
 * Simulates input behavior.
 *
 * @external InputSim
 * @see https://github.com/iamJoeTaylor/input-sim
 */

var _inputSim = _dereq_('input-sim');

/**
 * TextField is the simplest input and the base for more complex
 * types to inherit.
 *
 * @extends external:InputSim.Input
 */

var _installCaret = (0, _caret2['default'])();

var getCaret = _installCaret.getCaret;
var setCaret = _installCaret.setCaret;

var TextField = (function (_Input) {
  _inherits(TextField, _Input);

  /**
   * Sets up the initial properties of the TextField and
   * sets  up the event listeners
   *
   * @param {HTMLElement} element
   * @param {Formatter} formatter
   */

  function TextField(element, formatter) {
    _classCallCheck(this, TextField);

    _get(Object.getPrototypeOf(TextField.prototype), 'constructor', this).call(this);

    var caret = getCaret(element);
    if (typeof element.get === 'function') {
      console.warn('DEPRECATION: FieldKit.TextField instances should no longer be ' + 'created with a jQuery-wrapped element.');
      element = element.get(0);
    }
    this.element = element;
    this._formatter = formatter;
    this._enabled = true;
    this._manualCaret = { start: 0, end: 0 };
    this._placeholder = null;
    this._disabledPlaceholder = null;
    this._focusedPlaceholder = null;
    this._unfocusedPlaceholder = null;
    this._isDirty = false;
    this._valueOnFocus = '';
    this._currentValue = '';
    // Make sure textDidChange fires while the value is correct
    this._needsKeyUpTextDidChangeTrigger = false;
    this._blur = (0, _utils.bind)(this._blur, this);
    this._focus = (0, _utils.bind)(this._focus, this);
    this._click = (0, _utils.bind)(this._click, this);
    this._paste = (0, _utils.bind)(this._paste, this);
    this._keyUp = (0, _utils.bind)(this._keyUp, this);
    this._keyPress = (0, _utils.bind)(this._keyPress, this);
    this._keyDown = (0, _utils.bind)(this._keyDown, this);
    if (element['field-kit-text-field']) {
      throw new Error('already attached a TextField to this element');
    } else {
      element['field-kit-text-field'] = this;
    }
    element.addEventListener('keydown', this._keyDown);
    element.addEventListener('keypress', this._keyPress);
    element.addEventListener('keyup', this._keyUp);
    element.addEventListener('click', this._click);
    element.addEventListener('paste', this._paste);
    element.addEventListener('focus', this._focus);
    element.addEventListener('blur', this._blur);

    if (!element.getAttribute('autocapitalize')) {
      element.setAttribute('autocapitalize', 'off');
    }

    var window = element.ownerDocument.defaultView;

    /**
     * Fixes caret bug (Android) that caused the input
     * to place inserted characters in the wrong place
     * Expected: 1234 5678|  =>  1234 5678 9|
     * Bug: 1234 5678|  =>  1234 5679| 8
     *
     * @private
     */
    this._needsManualCaret = window.navigator.userAgent.toLowerCase().indexOf('android') > -1;

    this.setText(element.value);

    this.setSelectedRange({
      start: caret.start,
      length: caret.end - caret.start
    });
  }

  /**
   * Helps calculate the changes after an event on a FieldKit.TextField.
   *
   * @private
   */

  /**
   * **** Public Events ****
   */

  /**
   * Called when the user has changed the text of the field. Can be used in
   * subclasses to perform actions suitable for this event.
   *
   * @private
   */

  _createClass(TextField, [{
    key: 'textDidChange',
    value: function textDidChange() {}

    /**
     * Called when the user has in some way declared that they are done editing,
     * such as leaving the field or perhaps pressing enter. Can be used in
     * subclasses to perform actions suitable for this event.
     *
     * @private
     */
  }, {
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {}

    /**
     * Performs actions necessary for beginning editing.
     *
     * @private
     */
  }, {
    key: 'textFieldDidBeginEditing',
    value: function textFieldDidBeginEditing() {}

    /**
     * **** Private Events ****
     */

    /**
     * Performs actions necessary for text change.
     *
     * @private
     */
  }, {
    key: '_textDidChange',
    value: function _textDidChange() {
      var delegate = this._delegate;
      this.textDidChange();
      if (delegate && typeof delegate.textDidChange === 'function') {
        delegate.textDidChange(this);
      }

      // manually fire the HTML5 input event
      this._fireEvent('input');
    }

    /**
     * Performs actions necessary for ending editing.
     *
     * @private
     */
  }, {
    key: '_textFieldDidEndEditing',
    value: function _textFieldDidEndEditing() {
      var delegate = this._delegate;
      this.textFieldDidEndEditing();
      if (delegate && typeof delegate.textFieldDidEndEditing === 'function') {
        delegate.textFieldDidEndEditing(this);
      }

      // manually fire the HTML5 change event, only when a change has been made since focus
      if (this._isDirty && this._valueOnFocus !== this.element.value) {
        this._fireEvent('change');
      }

      // reset the dirty property
      this._isDirty = false;
      this._valueOnFocus = '';
    }

    /**
     * Performs actions necessary for beginning editing.
     *
     * @private
     */
  }, {
    key: '_textFieldDidBeginEditing',
    value: function _textFieldDidBeginEditing() {
      var delegate = this._delegate;
      this.textFieldDidBeginEditing();
      if (delegate && typeof delegate.textFieldDidBeginEditing === 'function') {
        delegate.textFieldDidBeginEditing(this);
      }
    }

    /**
     * **** Public Methods ****
     */

    /**
     * Gets the current delegate for this text field.
     *
     * @returns {TextFieldDelegate}
     */
  }, {
    key: 'delegate',
    value: function delegate() {
      return this._delegate;
    }

    /**
     * Sets the current delegate for this text field.
     *
     * @param {TextFieldDelegate} delegate
     */
  }, {
    key: 'setDelegate',
    value: function setDelegate(delegate) {
      this._delegate = delegate;
    }

    /**
     * Tears down FieldKit
     */
  }, {
    key: 'destroy',
    value: function destroy() {
      var element = this.element;
      element.removeEventListener('keydown', this._keyDown);
      element.removeEventListener('keypress', this._keyPress);
      element.removeEventListener('keyup', this._keyUp);
      element.removeEventListener('click', this._click);
      element.removeEventListener('paste', this._paste);
      element.removeEventListener('focus', this._focus);
      element.removeEventListener('blur', this._blur);
      delete element['field-kit-text-field'];
    }

    /**
     * Gets the current formatter. Formatters are used to translate between text
     * and value properties of the field.
     *
     * @returns {Formatter}
     */
  }, {
    key: 'formatter',
    value: function formatter() {
      if (!this._formatter) {
        this._formatter = new _formatter2['default']();
        var maximumLengthString = this.element.getAttribute('maxlength');
        if (maximumLengthString !== undefined && maximumLengthString !== null) {
          this._formatter.maximumLength = parseInt(maximumLengthString, 10);
        }
      }

      return this._formatter;
    }

    /**
     * Sets the current formatter.
     *
     * @param {Formatter} formatter
     */
  }, {
    key: 'setFormatter',
    value: function setFormatter(formatter) {
      var value = this.value();
      this._formatter = formatter;
      this.setValue(value);
    }

    /**
     * Builds a change instance and formats the change to see if it's valid
     *
     * @param   {object} current
     * @param   {object} proposed
     * @returns {?object} false if change doesn't have changes or change isn't valid. Change object if it is.
     */
  }, {
    key: 'hasChangesAndIsValid',
    value: function hasChangesAndIsValid(current, proposed) {
      var _this = this;

      var change = new TextFieldStateChange(this);
      var error = function error(errorType) {
        var delegate = _this.delegate();
        if (delegate) {
          if (typeof delegate.textFieldDidFailToValidateChange === 'function') {
            delegate.textFieldDidFailToValidateChange(_this, change, errorType);
          }
        }
      };
      change.current = { text: current.text, selectedRange: current.selectedRange };
      change.proposed = { text: proposed.text, selectedRange: proposed.selectedRange };
      if (change.hasChanges() && this.formatter().isChangeValid(change, error)) {
        return change;
      }
      return null;
    }

    /**
     * Handles a key event could be trying to end editing.
     *
     */
  }, {
    key: 'insertNewline',
    value: function insertNewline() {
      this._textFieldDidEndEditing();
      this._didEndEditingButKeptFocus = true;
    }

    /**
     * Debug support
     *
     * @returns {string}
     */
  }, {
    key: 'inspect',
    value: function inspect() {
      return '#<TextField text="' + this.text() + '">';
    }

    /**
     * Replaces the current selection with text from the given pasteboard.
     *
     * @param {DataTransfer} pasteboard
     */
  }, {
    key: 'readSelectionFromPasteboard',
    value: function readSelectionFromPasteboard(pasteboard) {
      var range = undefined,
          text = undefined;
      text = pasteboard.getData('Text');
      this.replaceSelection(text);
      range = this.selectedRange();
      range.start += range.length;
      range.length = 0;
      this.setSelectedRange(range);
    }

    /**
     * Checks changes after invoking the passed function for validity and rolls
     * them back if the changes turned out to be invalid.
     *
     * @returns {Object} whatever object `callback` returns
     */
  }, {
    key: 'rollbackInvalidChanges',
    value: function rollbackInvalidChanges(callback) {
      var result = null;
      var errorType = null;
      var change = TextFieldStateChange.build(this, function () {
        return result = callback();
      });
      var error = function error(type) {
        errorType = type;
      };
      if (change.hasChanges()) {
        var formatter = this.formatter();
        if (formatter && typeof formatter.isChangeValid === 'function') {
          if (!this._isDirty) {
            this._valueOnFocus = change.current.text || '';
            this._isDirty = true;
          }
          if (formatter.isChangeValid(change, error)) {
            change.recomputeDiff();
            this.setText(change.proposed.text);
            this.setSelectedRange(change.proposed.selectedRange);
          } else {
            var delegate = this.delegate();
            if (delegate) {
              if (typeof delegate.textFieldDidFailToValidateChange === 'function') {
                delegate.textFieldDidFailToValidateChange(this, change, errorType);
              }
            }
            this.setText(change.current.text);
            this.setSelectedRange(change.current.selectedRange);
            return result;
          }
        }
        if (change.inserted.text.length || change.deleted.text.length) {
          this.undoManager().proxyFor(this)._applyChangeFromUndoManager(change);
          this._textDidChange();
        }
      }
      return result;
    }

    /**
     * Gets the object value. This is the value that should be considered the
     * 'real' value of the field.
     *
     * @returns {Object}
     */
  }, {
    key: 'value',
    value: function value() {
      var _this2 = this;

      var text = this.text();
      var delegate = this.delegate();
      var formatter = this.formatter();
      if (!formatter) {
        return text;
      }

      return formatter.parse(text, function (errorType) {
        if (delegate) {
          if (typeof delegate.textFieldDidFailToParseString === 'function') {
            delegate.textFieldDidFailToParseString(_this2, text, errorType);
          }
        }
      });
    }

    /**
     * Sets the object value of the field.
     *
     * @param {string} value
     */
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this._formatter) {
        value = this._formatter.format(value);
      }
      this.setText('' + value);
    }

    /**
     * **** InputSim Overrides ****
     */

    /**
     * Gets the formatted text value. This is the same as the value of the
     * underlying input element.
     *
     * @augments external:InputSim.Input#text
     * @returns {string}
     */
  }, {
    key: 'text',
    value: function text() {
      return this.element.value;
    }

    /**
     * Sets the formatted text value. This generally should not be used. Instead,
     * use the value setter.
     *
     * @augments external:InputSim.Input#setText
     * @param {string} text
     */
  }, {
    key: 'setText',
    value: function setText(text) {
      this.element.value = text;
      this._currentValue = text;
    }

    /**
     * Gets the range of the current selection.
     *
     * @augments external:InputSim.Input#selectedRange
     * @returns {Object} {start: number, length: number}
     */
  }, {
    key: 'selectedRange',
    value: function selectedRange() {
      var caret = this._needsManualCaret ? this._manualCaret : getCaret(this.element);

      return {
        start: caret.start,
        length: caret.end - caret.start
      };
    }

    /**
     * Sets the range of the current selection and the selection affinity.
     *
     * @augments external:InputSim.Input#setSelectedRangeWithAffinity
     * @param {{start: number, length: number}} range
     * @param {Affinity} affinity
     */
  }, {
    key: 'setSelectedRangeWithAffinity',
    value: function setSelectedRangeWithAffinity(range, affinity) {
      var newRange = _get(Object.getPrototypeOf(TextField.prototype), 'setSelectedRangeWithAffinity', this).call(this, range, affinity);
      var caret = {
        start: newRange.start,
        end: newRange.start + newRange.length
      };
      this._manualCaret = caret;
      setCaret(this.element, caret.start, caret.end);
      this.selectionAffinity = range.length === 0 ? null : affinity;
    }

    /**
     * **** Undo Support ****
     */

    /**
     * Gets whether this text field records undo actions with its undo manager.
     *
     * @returns {boolean}
     */
  }, {
    key: 'allowsUndo',
    value: function allowsUndo() {
      return this._allowsUndo;
    }

    /**
     * Sets whether this text field records undo actions with its undo manager.
     *
     * @param {boolean} allowsUndo
     */
  }, {
    key: 'setAllowsUndo',
    value: function setAllowsUndo(allowsUndo) {
      this._allowsUndo = allowsUndo;
    }

    /**
     * Triggers a redo in the underlying UndoManager, if applicable.
     *
     * @param {Event} event
     */
  }, {
    key: 'redo',
    value: function redo(event) {
      if (this.undoManager().canRedo()) {
        this.undoManager().redo();
      }
      event.preventDefault();
    }

    /**
     * Triggers an undo in the underlying UndoManager, if applicable.
     *
     * @param {Event} event
     */
  }, {
    key: 'undo',
    value: function undo(event) {
      if (this.undoManager().canUndo()) {
        this.undoManager().undo();
      }
      event.preventDefault();
    }

    /**
     * Gets the UndoManager for this text field.
     *
     * @returns {UndoManager}
     */
  }, {
    key: 'undoManager',
    value: function undoManager() {
      return this._undoManager || (this._undoManager = new _undo_manager2['default']());
    }

    /**
     * **** Enabled/disabled support *****
     */

    /**
     * Removes focus from this field if it has focus.
     */
  }, {
    key: 'becomeFirstResponder',
    value: function becomeFirstResponder() {
      var _this3 = this;

      this.element.focus();
      this.rollbackInvalidChanges(function () {
        _this3.element.select();
        _this3._syncPlaceholder();
      });
    }

    /**
     * Determines whether this field has focus.
     *
     * @returns {boolean} true if this field has focus
     */
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.element.ownerDocument.activeElement === this.element;
    }

    /**
     * Determines whether this field is enabled or disabled.
     *
     * @returns {boolean} true if this field is enabled
     */
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this._enabled;
    }

    /**
     * Sets whether this text field is enabled
     * and syncs the placeholder to match
     *
     * @param {boolean} enabled
     */
  }, {
    key: 'setEnabled',
    value: function setEnabled(enabled) {
      this._enabled = enabled;
      this._syncPlaceholder();
    }

    /**
     * Removes focus from this field if it has focus.
     *
     * @param {Event} event
     */
  }, {
    key: 'resignFirstResponder',
    value: function resignFirstResponder(event) {
      if (event !== undefined && event !== null) {
        event.preventDefault();
      }
      this.element.blur();
      this._syncPlaceholder();
    }

    /*
     * **** Placeholder support ****
     */

    /**
     * Gets the disabled placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'disabledPlaceholder',
    value: function disabledPlaceholder() {
      return this._disabledPlaceholder;
    }

    /**
     * Sets the disabled placeholder.
     *
     * @param {string} disabledPlaceholder
     */
  }, {
    key: 'setDisabledPlaceholder',
    value: function setDisabledPlaceholder(disabledPlaceholder) {
      this._disabledPlaceholder = disabledPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * Gets the focused placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'focusedPlaceholder',
    value: function focusedPlaceholder() {
      return this._focusedPlaceholder;
    }

    /**
     * Sets the focused placeholder.
     *
     * @param {string} focusedPlaceholder
     */
  }, {
    key: 'setFocusedPlaceholder',
    value: function setFocusedPlaceholder(focusedPlaceholder) {
      this._focusedPlaceholder = focusedPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * Gets the placeholder if one has
     * been set.
     *
     * @TODO Does this do anything?
     *
     * @returns {string}
     */
  }, {
    key: 'placeholder',
    value: function placeholder() {
      return this._placeholder;
    }

    /**
     * Sets the placeholder.
     *
     * @param {string} placeholder
     */
  }, {
    key: 'setPlaceholder',
    value: function setPlaceholder(placeholder) {
      this._placeholder = placeholder;
      this.element.setAttribute('placeholder', this._placeholder);
    }

    /**
     * Gets the unfocused placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'unfocusedPlaceholder',
    value: function unfocusedPlaceholder() {
      return this._unfocusedPlaceholder;
    }

    /**
     * Sets the unfocused placeholder.
     *
     * @param {string} unfocusedPlaceholder
     */
  }, {
    key: 'setUnfocusedPlaceholder',
    value: function setUnfocusedPlaceholder(unfocusedPlaceholder) {
      this._unfocusedPlaceholder = unfocusedPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * **** Private Methods ****
     */

    /**
     * Applies the given change as an undo/redo.
     *
     * @param {Object} change object with current and proposed properties
     * @private
     */
  }, {
    key: '_applyChangeFromUndoManager',
    value: function _applyChangeFromUndoManager(change) {
      this.undoManager().proxyFor(this)._applyChangeFromUndoManager(change);

      if (this.undoManager().isUndoing()) {
        this.setText(change.current.text);
        this.setSelectedRange(change.current.selectedRange);
      } else {
        this.setText(change.proposed.text);
        this.setSelectedRange(change.proposed.selectedRange);
      }

      this._textDidChange();
    }

    /**
     * Handles clicks by resetting the selection affinity.
     *
     * @private
     */
  }, {
    key: '_click',
    value: function _click() {
      this._manualCaret = getCaret(this.element);
      this._selectedRange = {
        start: this._manualCaret.start,
        length: this._manualCaret.end - this._manualCaret.start
      };
      this.selectionAffinity = null;
    }

    /**
     * Fires event on the element
     *
     * @param {string} eventType
     * @private
     */
  }, {
    key: '_fireEvent',
    value: function _fireEvent(eventType) {
      var document = this.element.ownerDocument;
      var window = document.defaultView;
      if (typeof window.CustomEvent === 'function') {
        this.element.dispatchEvent(new window.CustomEvent(eventType, {}));
      } else {
        var _event = document.createEvent('Event');
        _event.initEvent(eventType, false, false);
        this.element.dispatchEvent(_event);
      }
    }

    /**
     * Handles gaining focus. This method delegates to other methods, and syncs
     * the placeholder appropriately.
     *
     * @private
     */
  }, {
    key: '_focus',
    value: function _focus() {
      this._textFieldDidBeginEditing();
      this._syncPlaceholder();
    }

    /**
     * Handles losing focus. This method delegates to other methods, and syncs the
     * placeholder appropriately.
     *
     * @private
     */
  }, {
    key: '_blur',
    value: function _blur() {
      this._textFieldDidEndEditing();
      this._syncPlaceholder();
    }

    /**
     * Handles keyDown events. This method essentially just delegates to other,
     * more semantic, methods based on the modifier keys and the pressed key of the
     * event.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyDown',
    value: function _keyDown(event) {
      var _this4 = this;

      if (this._didEndEditingButKeptFocus) {
        this._textFieldDidBeginEditing();
        this._didEndEditingButKeptFocus = false;
      }

      var action = this._bindings.actionForEvent(event);
      if (action) {
        switch (action) {
          case 'undo':
          case 'redo':
            this[action](event);
            break;

          default:
            this.rollbackInvalidChanges(function () {
              return _this4[action](event);
            });
            break;
        }
      }
    }

    /**
     * Handles inserting characters based on the typed key for normal keyboards.
     *
     * NOTE: Does not fire on some versions of Android, in which case we handle
     * changes in _keyUp instead.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyPress',
    value: function _keyPress(event) {
      var _this5 = this;

      var keyCode = event.keyCode;
      if (!event.metaKey && !event.ctrlKey && keyCode !== _inputSim.KEYS.ENTER && keyCode !== _inputSim.KEYS.TAB && keyCode !== _inputSim.KEYS.BACKSPACE) {
        if (event.charCode !== 0) {
          (function () {
            var newText = String.fromCharCode(event.charCode || event.keyCode);

            _this5._processChange({
              currentText: _this5.text(),
              proposedText: (0, _utils.replaceStringSelection)(newText, _this5.text(), _this5.selectedRange()),
              onSuccess: function onSuccess(change, changeTriggeredFormatting) {
                if (!changeTriggeredFormatting && event instanceof KeyboardEvent) {
                  // HACK(JoeTaylor) Use Browser's native input when using the formatter
                  // would not make a difference https://code.google.com/p/chromium/issues/detail?id=32865
                  if (!_this5._isDirty) {
                    _this5._valueOnFocus = change.current.text || '';
                    _this5._isDirty = true;
                  }
                  _this5.undoManager().proxyFor(_this5)._applyChangeFromUndoManager(change);
                  _this5._manualCaret = {
                    start: change.proposed.selectedRange.start,
                    end: change.proposed.selectedRange.start + change.proposed.selectedRange.length
                  };
                  _this5._needsKeyUpTextDidChangeTrigger = true;
                } else {
                  event.preventDefault();
                  _this5.rollbackInvalidChanges(function () {
                    return _this5.insertText(newText);
                  });
                }
                _this5._currentValue = change.proposed.text;
              },
              onFail: function onFail() {
                event.preventDefault();
                _this5.rollbackInvalidChanges(function () {
                  return _this5.insertText(newText);
                });
              }
            });
          })();
        } else {
          event.preventDefault();
        }
      }
    }

    /**
     * Handles keyup events. On Some Android we need to do all input processing
     * here because no other information comes in.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyUp',
    value: function _keyUp(event) {
      var _this6 = this;

      if (this._needsKeyUpTextDidChangeTrigger) {
        this._textDidChange();
        this._needsKeyUpTextDidChangeTrigger = false;
      }
      var keyCode = event.keyCode;
      // NOTE: Certain Androids on Chrome always return 229
      // https://code.google.com/p/chromium/issues/detail?id=118639
      if (keyCode === 229) {
        (function () {
          // Text has already been changed at this point, so we check the previous text
          // to determine whether we need to undo the change.
          var previousText = _this6._currentValue || '';
          _this6._processChange({
            currentText: previousText,
            proposedText: _this6.text(),
            onSuccess: function onSuccess(change, changeTriggeredFormatting) {
              if (changeTriggeredFormatting) {
                var newText = change.proposed.text;
                _this6.setSelectedRange(change.proposed.selectedRange);
                _this6.setText(newText);
              }
              if (!_this6._isDirty) {
                _this6._valueOnFocus = change.current.text || '';
                _this6._isDirty = true;
              }
              _this6.undoManager().proxyFor(_this6)._applyChangeFromUndoManager(change);
              _this6._textDidChange();
              _this6._currentValue = change.proposed.text;
            },
            onFail: function onFail() {
              // Need to rollback the letter input in the Keyup event because it is not valid,
              // so we set text to the previous state (as collected from the UndoManager).
              _this6.setText(previousText);
            }
          });
        })();
      } else {
        this.rollbackInvalidChanges(function () {
          if (event.keyCode === _inputSim.KEYS.TAB) {
            _this6.selectAll(event);
          }
        });
      }
    }

    /**
     * Checks if a change is valid and calls `onSuccess` if so,
     * and `onFail` if not.
     *
     * @param {object} options
     * @param {string} options.currentText
     * @param {string} options.proposedText
     * @param {function} options.onSuccess
     * @param {function=} options.onFail
     * @private
     */
  }, {
    key: '_processChange',
    value: function _processChange(_ref) {
      var currentText = _ref.currentText;
      var proposedText = _ref.proposedText;
      var onSuccess = _ref.onSuccess;
      var _ref$onFail = _ref.onFail;
      var onFail = _ref$onFail === undefined ? function () {} : _ref$onFail;

      var current = {
        text: currentText,
        selectedRange: this.selectedRange()
      };
      var proposed = {
        text: proposedText,
        selectedRange: { start: current.selectedRange.start + 1, length: 0 }
      };
      var change = this.hasChangesAndIsValid(current, proposed);
      var changeTriggeredFormatting = change && (change.proposed.text !== proposed.text || change.proposed.selectedRange.start !== proposed.selectedRange.start || change.proposed.selectedRange.length !== proposed.selectedRange.length);

      if (change) {
        onSuccess(change, changeTriggeredFormatting);
      } else {
        onFail();
      }
    }

    /**
     * Handles paste events.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_paste',
    value: function _paste(event) {
      var _this7 = this;

      event.preventDefault();
      this.rollbackInvalidChanges(function () {
        _this7.readSelectionFromPasteboard(event.clipboardData);
      });
    }

    /**
     * @private
     */
  }, {
    key: '_syncPlaceholder',
    value: function _syncPlaceholder() {
      if (!this._enabled) {
        var disabledPlaceholder = this._disabledPlaceholder;
        if (disabledPlaceholder !== undefined && disabledPlaceholder !== null) {
          this.setPlaceholder(disabledPlaceholder);
        }
      } else if (this.hasFocus()) {
        var focusedPlaceholder = this._focusedPlaceholder;
        if (focusedPlaceholder !== undefined && focusedPlaceholder !== null) {
          this.setPlaceholder(focusedPlaceholder);
        }
      } else {
        var unfocusedPlaceholder = this._unfocusedPlaceholder;
        if (unfocusedPlaceholder !== undefined && unfocusedPlaceholder !== null) {
          this.setPlaceholder(unfocusedPlaceholder);
        }
      }
    }
  }]);

  return TextField;
})(_inputSim.Input);

var TextFieldStateChange = (function () {
  /**
   * @param {TextField} field
   */

  function TextFieldStateChange(field) {
    _classCallCheck(this, TextFieldStateChange);

    this.field = field;
  }

  /**
   * Builds a new {TextFieldStateChange} that will allow you to
   * compute differences, and see the current vs proposed changes.
   *
   * @param {TextField} field
   * @param {Function} callback called when you want changes to the field
   *    take place. Current will be calculated before this callback.
   *    Proposed will be calculated after this callback.
   *
   * @returns {Object} change object with current and proposed properties
   */

  /**
   * Determines whether this field has changes.
   *
   * @returns {boolean} true if either the current text doesn't match the proposed text
   *    or the current selection range doesn't match the proposed selection range
   */

  _createClass(TextFieldStateChange, [{
    key: 'hasChanges',
    value: function hasChanges() {
      this.recomputeDiff();
      return this.current.text !== this.proposed.text || this.current.selectedRange.start !== this.proposed.selectedRange.start || this.current.selectedRange.length !== this.proposed.selectedRange.length;
    }

    /**
     * Updates {TextFieldStateChange} inserted and {TextFieldStateChange} deleted
     * based on proposed and current
     */
  }, {
    key: 'recomputeDiff',
    value: function recomputeDiff() {
      if (this.proposed.text !== this.current.text) {
        var ctext = this.current.text;
        var ptext = this.proposed.text;
        var sharedPrefixLength = 0;
        var sharedSuffixLength = 0;
        var minTextLength = Math.min(ctext.length, ptext.length);
        var i = undefined;

        for (i = 0; i < minTextLength; i++) {
          if (ptext[i] === ctext[i]) {
            sharedPrefixLength = i + 1;
          } else {
            break;
          }
        }

        for (i = 0; i < minTextLength - sharedPrefixLength; i++) {
          if (ptext[ptext.length - 1 - i] === ctext[ctext.length - 1 - i]) {
            sharedSuffixLength = i + 1;
          } else {
            break;
          }
        }

        var inserted = {
          start: sharedPrefixLength,
          end: ptext.length - sharedSuffixLength
        };
        var deleted = {
          start: sharedPrefixLength,
          end: ctext.length - sharedSuffixLength
        };
        inserted.text = ptext.substring(inserted.start, inserted.end);
        deleted.text = ctext.substring(deleted.start, deleted.end);
        this.inserted = inserted;
        this.deleted = deleted;
      } else {
        this.inserted = {
          start: this.proposed.selectedRange.start,
          end: this.proposed.selectedRange.start + this.proposed.selectedRange.length,
          text: ''
        };
        this.deleted = {
          start: this.current.selectedRange.start,
          end: this.current.selectedRange.start + this.current.selectedRange.length,
          text: ''
        };
      }
    }
  }]);

  return TextFieldStateChange;
})();

TextFieldStateChange.build = function (field, callback) {
  var change = new this(field);
  change.current = {
    text: field.text(),
    selectedRange: field.selectedRange()
  };
  callback();
  change.proposed = {
    text: field.text(),
    selectedRange: field.selectedRange()
  };
  change.recomputeDiff();
  return change;
};

exports['default'] = TextField;
module.exports = exports['default'];

},{"./caret":8,"./formatter":14,"./undo_manager":21,"./utils":22,"input-sim":2}],21:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = _dereq_('./utils');

/**
 * UndoManager is a general-purpose recorder of operations for undo and redo.
 *
 * Registering an undo action is done by specifying the changed object, along
 * with a method to invoke to revert its state and the arguments for that
 * method. When performing undo an UndoManager saves the operations reverted so
 * that you can redo the undos.
 */

var UndoManager = (function () {
  function UndoManager() {
    _classCallCheck(this, UndoManager);

    /** @private */
    this._undos = [];
    /** @private */
    this._redos = [];
    /** @private */
    this._isUndoing = false;
    /** @private */
    this._isRedoing = false;
  }

  /**
   * Determines whether there are any undo actions on the stack.
   *
   * @returns {boolean}
   */

  _createClass(UndoManager, [{
    key: 'canUndo',
    value: function canUndo() {
      return this._undos.length !== 0;
    }

    /**
     * Determines whether there are any redo actions on the stack.
     *
     * @returns {boolean}
     */
  }, {
    key: 'canRedo',
    value: function canRedo() {
      return this._redos.length !== 0;
    }

    /**
     * Indicates whether or not this manager is currently processing an undo.
     *
     * @returns {boolean}
     */
  }, {
    key: 'isUndoing',
    value: function isUndoing() {
      return this._isUndoing;
    }

    /**
     * Indicates whether or not this manager is currently processing a redo.
     *
     * @returns {boolean}
     */
  }, {
    key: 'isRedoing',
    value: function isRedoing() {
      return this._isRedoing;
    }

    /**
     * Manually registers an simple undo action with the given args.
     *
     * If this undo manager is currently undoing then this will register a redo
     * action instead. If this undo manager is neither undoing or redoing then the
     * redo stack will be cleared.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     */
  }, {
    key: 'registerUndo',
    value: function registerUndo(target, selector) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (this._isUndoing) {
        this._appendRedo.apply(this, [target, selector].concat(args));
      } else {
        if (!this._isRedoing) {
          this._redos.length = 0;
        }
        this._appendUndo.apply(this, [target, selector].concat(args));
      }
    }

    /**
     * Appends an undo action to the internal stack.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     * @private
     */
  }, {
    key: '_appendUndo',
    value: function _appendUndo(target, selector) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      this._undos.push({
        target: target,
        selector: selector,
        args: args
      });
    }

    /**
     * Appends a redo action to the internal stack.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     * @private
     */
  }, {
    key: '_appendRedo',
    value: function _appendRedo(target, selector) {
      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      this._redos.push({
        target: target,
        selector: selector,
        args: args
      });
    }

    /**
     * Performs the top-most undo action on the stack.
     *
     * @throws {Error} Raises an error if there are no available undo actions.
     */
  }, {
    key: 'undo',
    value: function undo() {
      if (!this.canUndo()) {
        throw new Error('there are no registered undos');
      }
      var data = this._undos.pop();
      var target = data.target;
      var selector = data.selector;
      var args = data.args;
      this._isUndoing = true;
      target[selector].apply(target, args);
      this._isUndoing = false;
    }

    /**
     * Performs the top-most redo action on the stack.
     *
     * @throws {Error} Raises an error if there are no available redo actions.
     */
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        throw new Error('there are no registered redos');
      }
      var data = this._redos.pop();
      var target = data.target;
      var selector = data.selector;
      var args = data.args;
      this._isRedoing = true;
      target[selector].apply(target, args);
      this._isRedoing = false;
    }

    /**
     * Returns a proxy object based on target that will register undo/redo actions
     * by calling methods on the proxy.
     *
     * @example
     *     setSize(size) {
     *       this.undoManager.proxyFor(this).setSize(this._size);
     *       this._size = size;
     *     }
     *
     * @param {Object} target call `selector` on this object
     * @returns {Object}
     */
  }, {
    key: 'proxyFor',
    value: function proxyFor(target) {
      var proxy = {};
      var self = this;

      function proxyMethod(selector) {
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          self.registerUndo.apply(self, [target, selector].concat(args));
        };
      }

      (0, _utils.getAllPropertyNames)(target).forEach(function (selector) {
        // don't trigger anything that has a getter
        if ((0, _utils.hasGetter)(target, selector)) {
          return;
        }

        // don't try to proxy properties that aren't functions
        if (typeof target[selector] !== 'function') {
          return;
        }

        // set up a proxy function to register an undo
        proxy[selector] = proxyMethod(selector);
      });

      return proxy;
    }
  }]);

  return UndoManager;
})();

exports['default'] = UndoManager;
module.exports = exports['default'];

},{"./utils":22}],22:[function(_dereq_,module,exports){
/**
 * @const
 * @private
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isDigits = isDigits;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.zpad = zpad;
exports.zpad2 = zpad2;
exports.bind = bind;
exports.replaceStringSelection = replaceStringSelection;
exports.forEach = forEach;
exports.hasGetter = hasGetter;
exports.getAllPropertyNames = getAllPropertyNames;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var DIGITS_PATTERN = /^\d*$/;

/**
 * @const
 * @private
 */
var SURROUNDING_SPACE_PATTERN = /(^\s+|\s+$)/;

/**
 * @param {string} string
 * @returns {boolean}
 */

function isDigits(string) {
  return DIGITS_PATTERN.test(string);
}

/**
 * @param {string} prefix
 * @param {string} string
 * @returns {boolean}
 */

function startsWith(prefix, string) {
  return string.slice(0, prefix.length) === prefix;
}

/**
 * @param {string} suffix
 * @param {string} string
 * @returns {boolean}
 */

function endsWith(suffix, string) {
  return string.slice(string.length - suffix.length) === suffix;
}

/**
 * @param {string} string
 * @returns {string}
 */
var trim = typeof ''.trim === 'function' ? function (string) {
  return string.trim();
} : function (string) {
  return string.replace(SURROUNDING_SPACE_PATTERN, '');
};

exports.trim = trim;
/**
 * Will pad n with `0` up until length.
 *
 * @example
 *     zpad(16, '1234');
 *     // => 0000000000001234
 *
 * @param {number} length
 * @param {(string|number)} n
 * @returns {string}
 */

function zpad(length, n) {
  var result = '' + n;
  while (result.length < length) {
    result = '0' + result;
  }
  return result;
}

/**
 * Will pad n with `0` up until length is 2.
 *
 * @example
 *     zpad2('2');
 *     // => 02
 *
 * @param {(string|number)} n
 * @returns {string}
 */

function zpad2(n) {
  return zpad(2, n);
}

/**
 * PhantomJS 1.9 does not have Function.bind.
 *
 * @param {Function} fn
 * @param {*} context
 * @returns {*}
 */

function bind(fn, context) {
  return fn.bind(context);
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    for (var _len = arguments.length, prependedArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      prependedArgs[_key - 1] = arguments[_key];
    }

    var self = this;
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return self.apply(context, prependedArgs.concat(args));
    };
  };
}

/**
 * Replaces the characters within the selection with given text.
 *
 * @example
 *     // 12|34567|8
 *     replaceStringSelection('12345678', '00', { start: 2, length: 5 });
 *     // 12|00|8
 *
 * @param   {string} replacement
 * @param   {string} text
 * @param   {object} {start: number, length: number}
 * @returns {string}
 */

function replaceStringSelection(replacement, text, range) {
  var end = range.start + range.length;
  return text.substring(0, range.start) + replacement + text.substring(end);
}

var hasOwnProp = Object.prototype.hasOwnProperty;
/**
 * @param {*} iterable
 * @param {Function} iterator
 */

function forEach(iterable, iterator) {
  if (iterable && typeof iterable.forEach === 'function') {
    iterable.forEach(iterator);
  } else if (({}).toString.call(iterable) === '[object Array]') {
    for (var i = 0, l = iterable.length; i < l; i++) {
      iterator.call(null, iterable[i], i, iterable);
    }
  } else {
    for (var key in iterable) {
      if (hasOwnProp.call(iterable, key)) {
        iterator.call(null, iterable[key], key, iterable);
      }
    }
  }
}

var getOwnPropertyNames = (function () {
  var getOwnPropertyNames = Object.getOwnPropertyNames;

  try {
    Object.getOwnPropertyNames({}, 'sq');
  } catch (e) {
    // IE 8
    getOwnPropertyNames = function (object) {
      var result = [];
      for (var key in object) {
        if (hasOwnProp.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    };
  }

  return getOwnPropertyNames;
})();

var getPrototypeOf = Object.getPrototypeOf || function (object) {
  return object.__proto__;
};
/**
 * @param {Object} object
 * @param {string} property
 * @returns {boolean}
 */

function hasGetter(object, property) {
  // Skip if getOwnPropertyDescriptor throws (IE8)
  try {
    Object.getOwnPropertyDescriptor({}, 'sq');
  } catch (e) {
    return false;
  }

  var descriptor = undefined;

  if (object && object.constructor && object.constructor.prototype) {
    descriptor = Object.getOwnPropertyDescriptor(object.constructor.prototype, property);
  }

  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(object, property);
  }

  if (descriptor && descriptor.get) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {Object} object
 * @returns {?string[]}
 */

function getAllPropertyNames(object) {
  if (object === null || object === undefined) {
    return [];
  }

  var result = getOwnPropertyNames(object);

  var prototype = object.constructor && object.constructor.prototype;
  while (prototype) {
    result.push.apply(result, _toConsumableArray(getOwnPropertyNames(prototype)));
    prototype = getPrototypeOf(prototype);
  }

  return result;
}

},{}]},{},[15])(15)
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],92:[function(require,module,exports){
var tabbable = require('tabbable');

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;

  var container = (typeof element === 'string')
    ? document.querySelector(element)
    : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = (userOptions && userOptions.returnFocusOnDeactivate !== undefined)
    ? userOptions.returnFocusOnDeactivate
    : true;
  config.escapeDeactivates = (userOptions && userOptions.escapeDeactivates !== undefined)
    ? userOptions.escapeDeactivates
    : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: (activateOptions && activateOptions.onActivate !== undefined)
        ? activateOptions.onActivate
        : config.onActivate,
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: (deactivateOptions && deactivateOptions.returnFocus !== undefined)
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate,
      onDeactivate: (deactivateOptions && deactivateOptions.onDeactivate !== undefined)
        ? deactivateOptions.onDeactivate
        : config.onDeactivate,
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    tryFocus(firstFocusNode());
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    e.preventDefault();
    updateTabbableNodes();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);
    var lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
    var firstTabbableNode = tabbableNodes[0];

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;

},{"tabbable":103}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DIGIT_PLACEHOLDER = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.close_dangling_braces = close_dangling_braces;
exports.count_occurences = count_occurences;
exports.repeat = repeat;

var _metadata = require('./metadata');

var _parse = require('./parse');

var _format = require('./format');

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Used in phone number format template creation.
// Could be any digit, I guess.
// This is an enhanced port of Google Android `libphonenumber`'s
// `asyoutypeformatter.js` of 17th November, 2016.
//
// https://github.com/googlei18n/libphonenumber/blob/8d21a365061de2ba0675c878a710a7b24f74d2ae/javascript/i18n/phonenumbers/asyoutypeformatter.js

var DUMMY_DIGIT = '9';
var DUMMY_DIGIT_MATCHER = new RegExp(DUMMY_DIGIT, 'g');
// I don't know why is it exactly `15`
var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15;
// Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.
var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH);

// The digits that have not been entered yet will be represented by a \u2008,
// the punctuation space.
var DIGIT_PLACEHOLDER = exports.DIGIT_PLACEHOLDER = 'x'; // '\u2008' (punctuation space)
var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER);
var DIGIT_PLACEHOLDER_MATCHER_GLOBAL = new RegExp(DIGIT_PLACEHOLDER, 'g');

// A pattern that is used to match character classes in regular expressions.
// An example of a character class is "[1-4]".
var CHARACTER_CLASS_PATTERN = /\[([^\[\]])*\]/g;

// Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.
var STANDALONE_DIGIT_PATTERN = /\d(?=[^,}][^,}])/g;

// A pattern that is used to determine if a `format` is eligible
// to be used by the "as you type formatter".
// It is eligible when the `format` contains groups of the dollar sign
// followed by a single digit, separated by valid phone number punctuation.
// This prevents invalid punctuation (such as the star sign in Israeli star numbers)
// getting into the output of the "as you type formatter".
var ELIGIBLE_FORMAT_PATTERN = new RegExp('^' + '[' + _parse.VALID_PUNCTUATION + ']*' + '(\\$\\d[' + _parse.VALID_PUNCTUATION + ']*)+' + '$');

// This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.
var MIN_LEADING_DIGITS_LENGTH = 3;

var VALID_INCOMPLETE_PHONE_NUMBER = '[' + _parse.PLUS_CHARS + ']{0,1}' + '[' + _parse.VALID_PUNCTUATION + _parse.VALID_DIGITS + ']*';

var VALID_INCOMPLETE_PHONE_NUMBER_PATTERN = new RegExp('^' + VALID_INCOMPLETE_PHONE_NUMBER + '$', 'i');

var as_you_type = function () {
	function as_you_type(country_code, metadata) {
		(0, _classCallCheck3.default)(this, as_you_type);

		// Sanity check
		if (!metadata) {
			throw new Error('Metadata not passed');
		}

		if (country_code && metadata.countries[country_code]) {
			this.default_country = country_code;
		}

		this.metadata = metadata;

		this.reset();
	}

	(0, _createClass3.default)(as_you_type, [{
		key: 'input',
		value: function input(text) {
			// Parse input

			var extracted_number = (0, _parse.extract_formatted_phone_number)(text);

			// Special case for a lone '+' sign
			// since it's not considered a possible phone number.
			if (!extracted_number) {
				if (text && text.indexOf('+') >= 0) {
					extracted_number = '+';
				}
			}

			// Validate possible first part of a phone number
			if (!(0, _common.matches_entirely)(extracted_number, VALID_INCOMPLETE_PHONE_NUMBER_PATTERN)) {
				return this.current_output;
			}

			return this.process_input((0, _parse.parse_phone_number)(extracted_number));
		}
	}, {
		key: 'process_input',
		value: function process_input(input) {
			// If an out of position '+' sign detected
			// (or a second '+' sign),
			// then just drop it from the input.
			if (input[0] === '+') {
				if (!this.parsed_input) {
					this.parsed_input += '+';

					// If a default country was set
					// then reset it because an explicitly international
					// phone number is being entered
					this.reset_countriness();
				}

				input = input.slice(1);
			}

			// Raw phone number
			this.parsed_input += input;

			// // Reset phone number validation state
			// this.valid = false

			// Add digits to the national number
			this.national_number += input;

			// Try to format the parsed input

			if (this.is_international()) {
				if (!this.country_phone_code) {
					// If one looks at country phone codes
					// then he can notice that no one country phone code
					// is ever a (leftmost) substring of another country phone code.
					// So if a valid country code is extracted so far
					// then it means that this is the country code.

					// If no country phone code could be extracted so far,
					// then just return the raw phone number,
					// because it has no way of knowing
					// how to format the phone number so far.
					if (!this.extract_country_phone_code()) {
						// Return raw phone number
						return this.parsed_input;
					}

					// Initialize country-specific data
					this.initialize_phone_number_formats_for_this_country_phone_code();
					this.reset_format();
					this.determine_the_country();
				}
				// `this.country` could be `undefined`,
				// for instance, when there is ambiguity
				// in a form of several different countries
				// each corresponding to the same country phone code
				// (e.g. NANPA: USA, Canada, etc),
				// and there's not enough digits entered
				// to reliably determine the country
				// the phone number belongs to.
				// Therefore, in cases of such ambiguity,
				// each time something is input,
				// try to determine the country
				// (if it's not determined yet).
				else if (!this.country) {
						this.determine_the_country();
					}
			} else {
				// Some national prefixes are substrings of other national prefixes
				// (for the same country), therefore try to extract national prefix each time
				// because a longer national prefix might be available at some point in time.

				var previous_national_prefix = this.national_prefix;
				this.national_number = this.national_prefix + this.national_number;

				// Possibly extract a national prefix
				this.extract_national_prefix();

				if (this.national_prefix !== previous_national_prefix) {
					// National number has changed
					// (due to another national prefix been extracted)
					// therefore national number has changed
					// therefore reset all previous formatting data.
					// (and leading digits matching state)
					this.matching_formats = this.available_formats;
					this.reset_format();
				}
			}

			if (!this.should_format()) {
				return this.format_as_non_formatted_number();
			}

			// Check the available phone number formats
			// based on the currently available leading digits.
			this.match_formats_by_leading_digits();

			// Format the phone number (given the next digits)
			var formatted_national_phone_number = this.format_national_phone_number(input);

			// If the phone number could be formatted,
			// then return it, possibly prepending with country phone code
			// (for international phone numbers only)
			if (formatted_national_phone_number) {
				return this.full_phone_number(formatted_national_phone_number);
			}

			// If the phone number couldn't be formatted,
			// then just fall back to the raw phone number.
			return this.parsed_input;
		}
	}, {
		key: 'format_as_non_formatted_number',
		value: function format_as_non_formatted_number() {
			if (this.is_international() && this.country_phone_code) {
				if (this.national_number) {
					// For convenience, the public `.template` property
					// contains the whole international number
					// if the phone number being input is international:
					// 'x' for the '+' sign, 'x'es for the country phone code,
					// a spacebar and then the template for the national number digits.
					this.template = DIGIT_PLACEHOLDER + repeat(DIGIT_PLACEHOLDER, this.country_phone_code.length) + ' ' + repeat(DIGIT_PLACEHOLDER, this.national_number.length);

					return '+' + this.country_phone_code + ' ' + this.national_number;
				}

				return '+' + this.country_phone_code;
			}

			return this.parsed_input;
		}
	}, {
		key: 'format_national_phone_number',
		value: function format_national_phone_number(next_digits) {
			// Format the next phone number digits
			// using the previously chosen phone number format.
			//
			// This is done here because if `attempt_to_format_complete_phone_number`
			// was placed before this call then the `template`
			// wouldn't reflect the situation correctly (and would therefore be inconsistent)
			//
			var national_number_formatted_with_previous_format = void 0;
			if (this.chosen_format) {
				national_number_formatted_with_previous_format = this.format_next_national_number_digits(next_digits);
			}

			// See if the input digits can be formatted properly already. If not,
			// use the results from format_next_national_number_digits(), which does formatting
			// based on the formatting pattern chosen.

			var formatted_number = this.attempt_to_format_complete_phone_number();

			// Just because a phone number doesn't have a suitable format
			// that doesn't mean that the phone is invalid
			// because phone number formats only format phone numbers,
			// they don't validate them and some (rare) phone numbers
			// are meant to stay non-formatted.
			if (formatted_number) {
				// if (this.country)
				// {
				// 	this.valid = true
				// }

				return formatted_number;
			}

			// For some phone number formats national prefix

			// If the previously chosen phone number format
			// didn't match the next (current) digit being input
			// (leading digits pattern didn't match).
			if (this.choose_another_format()) {
				// And a more appropriate phone number format
				// has been chosen for these `leading digits`,
				// then format the national phone number (so far)
				// using the newly selected phone number pattern.

				// Will return `undefined` if it couldn't format
				// the supplied national number
				// using the selected phone number pattern.

				return this.reformat_national_number();
			}

			// If could format the next (current) digit
			// using the previously chosen phone number format
			// then return the formatted number so far.

			// If no new phone number format could be chosen,
			// and couldn't format the supplied national number
			// using the selected phone number pattern,
			// then it will return `undefined`.

			return national_number_formatted_with_previous_format;
		}
	}, {
		key: 'reset',
		value: function reset() {
			// Input stripped of non-phone-number characters.
			// Can only contain a possible leading '+' sign and digits.
			this.parsed_input = '';

			this.current_output = '';

			// This contains the national prefix that has been extracted. It contains only
			// digits without formatting.
			this.national_prefix = '';

			this.national_number = '';

			this.reset_countriness();

			this.reset_format();

			// this.valid = false

			return this;
		}
	}, {
		key: 'reset_country',
		value: function reset_country() {
			if (this.default_country && !this.is_international()) {
				this.country = this.default_country;
			} else {
				this.country = undefined;
			}
		}
	}, {
		key: 'reset_countriness',
		value: function reset_countriness() {
			this.reset_country();

			if (this.default_country && !this.is_international()) {
				this.country_metadata = this.metadata.countries[this.default_country];
				this.country_phone_code = this.country_metadata.phone_code;

				this.initialize_phone_number_formats_for_this_country_phone_code();
			} else {
				this.country_metadata = undefined;
				this.country_phone_code = undefined;

				this.available_formats = [];
				this.matching_formats = this.available_formats;
			}
		}
	}, {
		key: 'reset_format',
		value: function reset_format() {
			this.chosen_format = undefined;
			this.template = undefined;
			this.partially_populated_template = undefined;
			this.last_match_position = -1;
		}

		// Format each digit of national phone number (so far)
		// using the newly selected phone number pattern.

	}, {
		key: 'reformat_national_number',
		value: function reformat_national_number() {
			// Format each digit of national phone number (so far)
			// using the selected phone number pattern.
			return this.format_next_national_number_digits(this.national_number);
		}
	}, {
		key: 'initialize_phone_number_formats_for_this_country_phone_code',
		value: function initialize_phone_number_formats_for_this_country_phone_code() {
			// Get all "eligible" phone number formats for this country
			this.available_formats = (0, _metadata.get_formats)(this.country_metadata).filter(function (format) {
				return ELIGIBLE_FORMAT_PATTERN.test((0, _metadata.get_format_international_format)(format));
			});

			this.matching_formats = this.available_formats;
		}
	}, {
		key: 'match_formats_by_leading_digits',
		value: function match_formats_by_leading_digits() {
			var leading_digits = this.national_number;

			// "leading digits" patterns start with a maximum of 3 digits,
			// and then with each additional digit
			// a more precise "leading digits" pattern is specified.

			var index_of_leading_digits_pattern = leading_digits.length - MIN_LEADING_DIGITS_LENGTH;

			if (index_of_leading_digits_pattern < 0) {
				index_of_leading_digits_pattern = 0;
			}

			this.matching_formats = this.matching_formats.filter(function (format) {
				var leading_digits_pattern_count = (0, _metadata.get_format_leading_digits_patterns)(format).length;

				// Keep everything that isn't restricted by leading digits.
				if (leading_digits_pattern_count === 0) {
					return true;
				}

				var leading_digits_pattern_index = Math.min(index_of_leading_digits_pattern, leading_digits_pattern_count - 1);
				var leading_digits_pattern = (0, _metadata.get_format_leading_digits_patterns)(format)[leading_digits_pattern_index];

				// Brackets are required for `^` to be applied to
				// all or-ed (`|`) parts, not just the first one.
				return new RegExp('^(' + leading_digits_pattern + ')').test(leading_digits);
			});

			// If there was a phone number format chosen
			// and it no longer holds given the new leading digits then reset it
			if (this.chosen_format && this.matching_formats.indexOf(this.chosen_format) === -1) {
				this.reset_format();
			}
		}
	}, {
		key: 'should_format',
		value: function should_format() {
			// Start matching any formats at all when the national number
			// entered so far is at least 3 digits long,
			// otherwise format matching would give false negatives
			// like when the digits entered so far are `2`
			// and the leading digits pattern is `21` –
			// it's quite obvious in this case that the format could be the one
			// but due to the absence of further digits it would give false negative.
			//
			// Google could have provided leading digits patterns starting
			// with a single digit but they chose not to (for whatever reasons).
			//
			return this.national_number >= MIN_LEADING_DIGITS_LENGTH;
		}

		// Check to see if there is an exact pattern match for these digits. If so, we
		// should use this instead of any other formatting template whose
		// leadingDigitsPattern also matches the input.

	}, {
		key: 'attempt_to_format_complete_phone_number',
		value: function attempt_to_format_complete_phone_number() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(this.matching_formats), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var format = _step.value;

					var matcher = new RegExp('^(?:' + (0, _metadata.get_format_pattern)(format) + ')$');

					if (!matcher.test(this.national_number)) {
						continue;
					}

					if (!this.validate_format(format)) {
						continue;
					}

					// To leave the formatter in a consistent state
					this.reset_format();
					this.chosen_format = format;

					var formatted_number = (0, _format.format_national_number_using_format)(this.national_number, format, this.is_international(), this.national_prefix.length > 0, this.country_metadata);

					// Set `this.template` and `this.partially_populated_template`.
					//
					// `else` case doesn't ever happen
					// with the current metadata,
					// but just in case.
					//
					/* istanbul ignore else */
					if (this.create_formatting_template(format)) {
						// Populate `this.partially_populated_template`
						this.reformat_national_number();
					} else {
						// Prepend `+CountryCode` in case of an international phone number
						var full_number = this.full_phone_number(formatted_number);
						this.template = full_number.replace(/[\d\+]/g, DIGIT_PLACEHOLDER);
						this.partially_populated_template = full_number;
					}

					return formatted_number;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}

		// Prepends `+CountryCode` in case of an international phone number

	}, {
		key: 'full_phone_number',
		value: function full_phone_number(formatted_national_number) {
			if (this.is_international()) {
				return '+' + this.country_phone_code + ' ' + formatted_national_number;
			}

			return formatted_national_number;
		}

		// Extracts the country calling code from the beginning
		// of the entered `national_number` (so far),
		// and places the remaining input into the `national_number`.

	}, {
		key: 'extract_country_phone_code',
		value: function extract_country_phone_code() {
			if (!this.national_number) {
				return;
			}

			var _parse_phone_number_a = (0, _parse.parse_phone_number_and_country_phone_code)(this.parsed_input, this.metadata),
			    country_phone_code = _parse_phone_number_a.country_phone_code,
			    number = _parse_phone_number_a.number;

			if (!country_phone_code) {
				return;
			}

			this.country_phone_code = country_phone_code;
			this.national_number = number;

			return this.country_metadata = (0, _metadata.get_metadata_by_country_phone_code)(country_phone_code, this.metadata);
		}
	}, {
		key: 'extract_national_prefix',
		value: function extract_national_prefix() {
			this.national_prefix = '';

			if (!this.country_metadata) {
				return;
			}

			var national_number = (0, _parse.strip_national_prefix)(this.national_number, this.country_metadata);

			if (national_number !== this.national_number) {
				this.national_prefix = this.national_number.slice(0, this.national_number.length - national_number.length);
				this.national_number = national_number;
			}

			return this.national_prefix;
		}
	}, {
		key: 'choose_another_format',
		value: function choose_another_format() {
			// When there are multiple available formats, the formatter uses the first
			// format where a formatting template could be created.
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = (0, _getIterator3.default)(this.matching_formats), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var format = _step2.value;

					// If this format is currently being used
					// and is still possible, then stick to it.
					if (this.chosen_format === format) {
						return;
					}

					// If this `format` is suitable for "as you type",
					// then extract the template from this format
					// and use it to format the phone number being input.

					if (!this.validate_format(format)) {
						continue;
					}

					if (!this.create_formatting_template(format)) {
						continue;
					}

					this.chosen_format = format;

					// With a new formatting template, the matched position
					// using the old template needs to be reset.
					this.last_match_position = -1;

					return true;
				}

				// No format matches the phone number,
				// therefore set `country` to `undefined`
				// (or to the default country).
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.reset_country();

			// No format matches the national phone number entered
			this.reset_format();
		}
	}, {
		key: 'validate_format',
		value: function validate_format(format) {
			// If national prefix is mandatory for this phone number format
			// and the user didn't input the national prefix,
			// then this phone number format isn't suitable.
			if (!this.is_international() && !this.national_prefix && (0, _metadata.get_format_national_prefix_is_mandatory_when_formatting)(format, this.country_metadata)) {
				return;
			}

			return true;
		}
	}, {
		key: 'create_formatting_template',
		value: function create_formatting_template(format) {
			// The formatter doesn't format numbers when numberPattern contains '|', e.g.
			// (20|3)\d{4}. In those cases we quickly return.
			// (Though there's no such format in current metadata)
			/* istanbul ignore if */
			if ((0, _metadata.get_format_pattern)(format).indexOf('|') >= 0) {
				return;
			}

			var national_prefix_formatting_rule = (0, _metadata.get_format_national_prefix_formatting_rule)(format, this.country_metadata);

			// A very smart trick by the guys at Google
			var number_pattern = (0, _metadata.get_format_pattern)(format)
			// Replace anything in the form of [..] with \d
			.replace(CHARACTER_CLASS_PATTERN, '\\d')
			// Replace any standalone digit (not the one in `{}`) with \d
			.replace(STANDALONE_DIGIT_PATTERN, '\\d');

			// This match will always succeed,
			// because the "longest dummy phone number"
			// has enough length to accomodate any possible
			// national phone number format pattern.
			var dummy_phone_number_matching_format_pattern = LONGEST_DUMMY_PHONE_NUMBER.match(number_pattern)[0];

			// If the national number entered is too long
			// for any phone number format, then abort.
			if (this.national_number.length > dummy_phone_number_matching_format_pattern.length) {
				return;
			}

			// Prepare the phone number format
			var number_format = this.get_format_format(format, national_prefix_formatting_rule);

			// Get a formatting template which can be used to efficiently format
			// a partial number where digits are added one by one.

			// Create formatting template for this phone number format
			var template = dummy_phone_number_matching_format_pattern
			// Format the dummy phone number according to the format
			.replace(new RegExp(number_pattern, 'g'), number_format)
			// Replace each dummy digit with a DIGIT_PLACEHOLDER
			.replace(DUMMY_DIGIT_MATCHER, DIGIT_PLACEHOLDER);

			// This one is for national number only
			this.partially_populated_template = template;

			// For convenience, the public `.template` property
			// contains the whole international number
			// if the phone number being input is international:
			// 'x' for the '+' sign, 'x'es for the country phone code,
			// a spacebar and then the template for the formatted national number.
			if (this.is_international()) {
				this.template = DIGIT_PLACEHOLDER + repeat(DIGIT_PLACEHOLDER, this.country_phone_code.length) + ' ' + template;
			}
			// For local numbers, replace national prefix
			// with a digit placeholder.
			else {
					this.template = template.replace(/\d/g, DIGIT_PLACEHOLDER);
				}

			// This one is for the full phone number
			return this.template;
		}
	}, {
		key: 'format_next_national_number_digits',
		value: function format_next_national_number_digits(digits) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = (0, _getIterator3.default)(digits), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var digit = _step3.value;

					// If there is room for more digits in current `template`,
					// then set the next digit in the `template`,
					// and return the formatted digits so far.

					// If more digits are entered than the current format could handle
					if (this.partially_populated_template.slice(this.last_match_position + 1).search(DIGIT_PLACEHOLDER_MATCHER) === -1) {
						// Reset the current format,
						// so that the new format will be chosen
						// in a subsequent `this.choose_another_format()` call
						// later in code.
						this.chosen_format = undefined;
						this.template = undefined;
						this.partially_populated_template = undefined;
						return;
					}

					this.last_match_position = this.partially_populated_template.search(DIGIT_PLACEHOLDER_MATCHER);
					this.partially_populated_template = this.partially_populated_template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
				}

				// Return the formatted phone number so far
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return close_dangling_braces(this.partially_populated_template, this.last_match_position + 1).replace(DIGIT_PLACEHOLDER_MATCHER_GLOBAL, ' ');
		}
	}, {
		key: 'is_international',
		value: function is_international() {
			return this.parsed_input && this.parsed_input[0] === '+';
		}
	}, {
		key: 'get_format_format',
		value: function get_format_format(format, national_prefix_formatting_rule) {
			var number_format = this.is_international() ? (0, _metadata.get_format_international_format)(format) : (0, _metadata.get_format_format)(format);

			// If national prefix formatting rule is set
			// for this phone number format
			if (national_prefix_formatting_rule) {
				// If the user did input the national prefix
				// (or if the national prefix formatting rule does not require national prefix)
				// then maybe make it part of the phone number template
				if (this.national_prefix || !(0, _metadata.get_format_uses_national_prefix)(national_prefix_formatting_rule)) {
					// Make the national prefix part of the phone number template
					number_format = number_format.replace(_format.FIRST_GROUP_PATTERN, national_prefix_formatting_rule);
				}
			}

			if (this.is_international()) {
				return (0, _format.local_to_international_style)(number_format);
			}

			return number_format;
		}

		// Determines the country of the phone number
		// entered so far based on the country phone code
		// and the national phone number.

	}, {
		key: 'determine_the_country',
		value: function determine_the_country() {
			this.country = (0, _parse.find_country_code)(this.country_phone_code, this.national_number, this.metadata);
		}
	}]);
	return as_you_type;
}();

exports.default = as_you_type;
function close_dangling_braces(template, cut_before) {
	var retained_template = template.slice(0, cut_before);

	var opening_braces = count_occurences('(', retained_template);
	var closing_braces = count_occurences(')', retained_template);

	var dangling_braces = opening_braces - closing_braces;

	while (dangling_braces > 0 && cut_before < template.length) {
		if (template[cut_before] === ')') {
			dangling_braces--;
		}
		cut_before++;
	}

	return template.slice(0, cut_before);
}

// Counts all occurences of a symbol in a string
function count_occurences(symbol, string) {
	var count = 0;

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = (0, _getIterator3.default)(string), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var character = _step4.value;

			if (character === symbol) {
				count++;
			}
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	return count;
}

// Repeats a string (or a symbol) N times.
// http://stackoverflow.com/questions/202605/repeat-string-javascript
function repeat(string, times) {
	if (times < 1) {
		return '';
	}

	var result = '';

	while (times > 1) {
		if (times & 1) {
			result += string;
		}

		times >>= 1;
		string += string;
	}

	return result + string;
}
//# sourceMappingURL=as you type.js.map
},{"./common":94,"./format":95,"./metadata":97,"./parse":98,"babel-runtime/core-js/get-iterator":25,"babel-runtime/helpers/classCallCheck":28,"babel-runtime/helpers/createClass":29}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.matches_entirely = matches_entirely;
// Checks whether the entire input sequence can be matched
// against the regular expression.
function matches_entirely() {
	var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var regular_expression = arguments[1];

	if (typeof regular_expression === 'string') {
		regular_expression = '^(?:' + regular_expression + ')$';
	}

	var matched_groups = text.match(regular_expression);
	return matched_groups && matched_groups[0].length === text.length;
}

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FIRST_GROUP_PATTERN = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = format;
exports.format_national_number_using_format = format_national_number_using_format;
exports.format_national_number = format_national_number;
exports.choose_format_for_number = choose_format_for_number;
exports.local_to_international_style = local_to_international_style;

var _common = require('./common');

var _parse = require('./parse');

var _metadata = require('./metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Formats a phone number
//
// Example use cases:
//
// ```js
// format('8005553535', 'RU', 'International')
// format('8005553535', 'RU', 'International', metadata)
// format({ phone: '8005553535', country: 'RU' }, 'International')
// format({ phone: '8005553535', country: 'RU' }, 'International', metadata)
// format('+78005553535', 'National')
// format('+78005553535', 'National', metadata)
// ```
//
function format(first_argument, second_argument, third_argument, fourth_argument) {
	var _sort_out_arguments = sort_out_arguments(first_argument, second_argument, third_argument, fourth_argument),
	    input = _sort_out_arguments.input,
	    format_type = _sort_out_arguments.format_type,
	    metadata = _sort_out_arguments.metadata;

	var country_metadata = void 0;

	if (input.country) {
		country_metadata = metadata.countries[input.country];
	}

	var _parse_phone_number_a = (0, _parse.parse_phone_number_and_country_phone_code)(input.phone, metadata),
	    country_phone_code = _parse_phone_number_a.country_phone_code,
	    number = _parse_phone_number_a.number;

	if (country_phone_code) {
		// Check country restriction
		if (input.country && country_metadata && country_phone_code !== (0, _metadata.get_phone_code)(country_metadata)) {
			return input.phone;
		}

		country_metadata = (0, _metadata.get_metadata_by_country_phone_code)(country_phone_code, metadata);
	}

	if (!country_metadata) {
		return input.phone;
	}

	switch (format_type) {
		case 'International':
			if (!number) {
				return '+' + (0, _metadata.get_phone_code)(country_metadata);
			}
			var national_number = format_national_number(number, 'International', false, country_metadata);
			return '+' + (0, _metadata.get_phone_code)(country_metadata) + ' ' + national_number;

		case 'International_plaintext':
			return '+' + (0, _metadata.get_phone_code)(country_metadata) + input.phone;

		case 'National':
			if (!number) {
				return '';
			}
			return format_national_number(number, 'National', false, country_metadata);
	}
}

// This was originally set to $1 but there are some countries for which the
// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly.  Therefore, we use \d, so that the first
// group actually used in the pattern will be matched.
// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of 17th November, 2016.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js

var FIRST_GROUP_PATTERN = exports.FIRST_GROUP_PATTERN = /(\$\d)/;

function format_national_number_using_format(number, format, international, enforce_national_prefix, country_metadata) {
	var format_pattern_matcher = new RegExp((0, _metadata.get_format_pattern)(format));

	var national_prefix_formatting_rule = (0, _metadata.get_format_national_prefix_formatting_rule)(format, country_metadata);

	// National prefix is omitted if there's no national prefix formatting rule
	// set for this country, or when this rule is set but
	// national prefix is optional for this phone number format
	// (and it is not enforced explicitly)
	var national_prefix_may_be_omitted = !national_prefix_formatting_rule || national_prefix_formatting_rule && (0, _metadata.get_format_national_prefix_is_optional_when_formatting)(format, country_metadata) && !enforce_national_prefix;

	if (!international && !national_prefix_may_be_omitted) {
		return number.replace(format_pattern_matcher, (0, _metadata.get_format_format)(format).replace(FIRST_GROUP_PATTERN, national_prefix_formatting_rule));
	}

	var formatted_number = number.replace(format_pattern_matcher, international ? (0, _metadata.get_format_international_format)(format) : (0, _metadata.get_format_format)(format));

	if (international) {
		return local_to_international_style(formatted_number);
	}

	return formatted_number;
}

function format_national_number(number, format_as, enforce_national_prefix, country_metadata) {
	var format = choose_format_for_number((0, _metadata.get_formats)(country_metadata), number);

	if (!format) {
		return number;
	}

	return format_national_number_using_format(number, format, format_as === 'International', enforce_national_prefix, country_metadata);
}

function choose_format_for_number(available_formats, national_number) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = (0, _getIterator3.default)(available_formats), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _format = _step.value;

			// Validate leading digits
			if ((0, _metadata.get_format_leading_digits_patterns)(_format).length > 0) {
				// The last leading_digits_pattern is used here, as it is the most detailed
				var last_leading_digits_pattern = (0, _metadata.get_format_leading_digits_patterns)(_format)[(0, _metadata.get_format_leading_digits_patterns)(_format).length - 1];

				// If leading digits don't match then move on to the next phone number format
				if (national_number.search(last_leading_digits_pattern) !== 0) {
					continue;
				}
			}

			// Check that the national number matches the phone number format regular expression
			if ((0, _common.matches_entirely)(national_number, new RegExp((0, _metadata.get_format_pattern)(_format)))) {
				return _format;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}

// Removes brackets and replaces dashes with spaces.
//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
function local_to_international_style(local) {
	return local.replace(new RegExp('[' + _parse.VALID_PUNCTUATION + ']+', 'g'), ' ').trim();
}

// Sort out arguments
function sort_out_arguments() {
	var first_argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var second_argument = arguments[1];
	var third_argument = arguments[2];
	var fourth_argument = arguments[3];

	var input = void 0;
	var format_type = void 0;
	var metadata = void 0;

	// Sort out arguments
	if (typeof first_argument === 'string') {
		// If country code is supplied
		if (typeof third_argument === 'string') {
			// Will be `parse()`d later in code
			input = {
				phone: first_argument,
				country: second_argument
			};

			format_type = third_argument;
			metadata = fourth_argument;
		}
		// Just an international phone number is supplied
		else {
				// Will be `parse()`d later in code
				input = {
					phone: first_argument
				};

				if (typeof second_argument !== 'string') {
					throw new Error('Format type argument not passed for `format()`');
				}

				format_type = second_argument;
				metadata = third_argument;
			}
	} else {
		input = first_argument;
		format_type = second_argument;
		metadata = third_argument;
	}

	// Sanity check
	if (!metadata) {
		throw new Error('Metadata not passed');
	}

	switch (format_type) {
		case 'International':
		case 'International_plaintext':
		case 'National':
			break;
		default:
			throw new Error('Unknown format type argument passed to "format()": "' + format_type + '"');
	}

	return { input: input, format_type: format_type, metadata: metadata };
}

},{"./common":94,"./metadata":97,"./parse":98,"babel-runtime/core-js/get-iterator":25}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = get_number_type;
exports.is_of_type = is_of_type;
exports.sort_out_arguments = sort_out_arguments;

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _common = require('./common');

var _metadata = require('./metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Finds out national phone number type (fixed line, mobile, etc)
function get_number_type(first_argument, second_argument, third_argument) {
	var _sort_out_arguments = sort_out_arguments(first_argument, second_argument, third_argument),
	    input = _sort_out_arguments.input,
	    metadata = _sort_out_arguments.metadata;

	// Sanity check


	if (!metadata) {
		throw new Error('Metadata not passed');
	}

	// When no input was passed
	if (!input) {
		return;
	}

	// When `parse()` returned `{}`
	// meaning that the phone number is not a valid one.
	if (!input.country) {
		return;
	}

	var national_number = input.phone;
	var country_metadata = metadata.countries[input.country];

	// The following is copy-pasted from the original function:
	// https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835

	// Is this national number even valid for this country
	if (!is_of_type(national_number, (0, _metadata.get_national_number_pattern)(country_metadata))) {
		return; // 'UNKNOWN'
	}

	if (is_of_type(national_number, (0, _metadata.get_type_premium_rate)(country_metadata))) {
		return 'PREMIUM_RATE';
	}

	if (is_of_type(national_number, (0, _metadata.get_type_toll_free)(country_metadata))) {
		return 'TOLL_FREE';
	}

	/* istanbul ignore if */
	if (is_of_type(national_number, (0, _metadata.get_type_shared_cost)(country_metadata))) {
		return 'SHARED_COST';
	}

	/* istanbul ignore if */
	if (is_of_type(national_number, (0, _metadata.get_type_voip)(country_metadata))) {
		return 'VOIP';
	}

	if (is_of_type(national_number, (0, _metadata.get_type_personal_number)(country_metadata))) {
		return 'PERSONAL_NUMBER';
	}

	/* istanbul ignore if */
	if (is_of_type(national_number, (0, _metadata.get_type_pager)(country_metadata))) {
		return 'PAGER';
	}

	/* istanbul ignore if */
	if (is_of_type(national_number, (0, _metadata.get_type_uan)(country_metadata))) {
		return 'UAN';
	}

	/* istanbul ignore if */
	if (is_of_type(national_number, (0, _metadata.get_type_voice_mail)(country_metadata))) {
		return 'VOICEMAIL';
	}

	// Is it fixed line number
	if (is_of_type(national_number, (0, _metadata.get_type_fixed_line)(country_metadata))) {
		// Because duplicate regular expressions are removed
		// to reduce metadata size, if there's no "mobile" pattern
		// then it means it was removed due to being a duplicate of some other pattern.
		//
		if (!(0, _metadata.get_type_mobile)(country_metadata)) {
			return 'FIXED_LINE_OR_MOBILE';
		}

		// Check if the number happens to qualify as both fixed line and mobile.
		// (no such country in the minimal metadata set)
		/* istanbul ignore if */
		if (is_of_type(national_number, (0, _metadata.get_type_mobile)(country_metadata))) {
			return 'FIXED_LINE_OR_MOBILE';
		}

		return 'FIXED_LINE';
	}

	if (is_of_type(national_number, (0, _metadata.get_type_mobile)(country_metadata))) {
		return 'MOBILE';
	}

	// return 'UNKNOWN'
}

function is_of_type(national_number, type) {
	// // Check if any possible number lengths are present;
	// // if so, we use them to avoid checking
	// // the validation pattern if they don't match.
	// // If they are absent, this means they match
	// // the general description, which we have
	// // already checked before a specific number type.
	// if (get_possible_lengths(type) &&
	// 	get_possible_lengths(type).indexOf(national_number.length) === -1)
	// {
	// 	return false
	// }

	// get_type_pattern(type) === type
	return (0, _common.matches_entirely)(national_number, type);
}

// Sort out arguments
function sort_out_arguments(first_argument, second_argument, third_argument) {
	var input = void 0;
	var metadata = void 0;

	if (typeof first_argument === 'string') {
		// If country code is supplied
		if (typeof second_argument === 'string') {
			metadata = third_argument;

			// `parse` extracts phone numbers from raw text,
			// therefore it will cut off all "garbage" characters,
			// while this `validate` function needs to verify
			// that the phone number contains no "garbage"
			// therefore the explicit `is_viable_phone_number` check.
			if ((0, _parse.is_viable_phone_number)(first_argument)) {
				input = (0, _parse2.default)(first_argument, second_argument, metadata);
			}
		}
		// Just an international phone number is supplied
		else {
				metadata = second_argument;

				// `parse` extracts phone numbers from raw text,
				// therefore it will cut off all "garbage" characters,
				// while this `validate` function needs to verify
				// that the phone number contains no "garbage"
				// therefore the explicit `is_viable_phone_number` check.
				if ((0, _parse.is_viable_phone_number)(first_argument)) {
					input = (0, _parse2.default)(first_argument, metadata);
				}
			}
	} else {
		// The `first_argument` must be a valid phone number
		// as a whole, not just a part of it which gets parsed here.
		if (first_argument && first_argument.phone && (0, _parse.is_viable_phone_number)(first_argument.phone)) {
			input = first_argument;
		}

		metadata = second_argument;
	}

	return { input: input, metadata: metadata };
}
//# sourceMappingURL=get number type.js.map
},{"./common":94,"./metadata":97,"./parse":98}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.get_phone_code = get_phone_code;
exports.get_national_number_pattern = get_national_number_pattern;
exports.get_formats = get_formats;
exports.get_national_prefix = get_national_prefix;
exports.get_national_prefix_formatting_rule = get_national_prefix_formatting_rule;
exports.get_national_prefix_for_parsing = get_national_prefix_for_parsing;
exports.get_national_prefix_transform_rule = get_national_prefix_transform_rule;
exports.get_national_prefix_is_optional_when_formatting = get_national_prefix_is_optional_when_formatting;
exports.get_leading_digits = get_leading_digits;
exports.get_format_pattern = get_format_pattern;
exports.get_format_format = get_format_format;
exports.get_format_leading_digits_patterns = get_format_leading_digits_patterns;
exports.get_format_national_prefix_formatting_rule = get_format_national_prefix_formatting_rule;
exports.get_format_national_prefix_is_optional_when_formatting = get_format_national_prefix_is_optional_when_formatting;
exports.get_format_national_prefix_is_mandatory_when_formatting = get_format_national_prefix_is_mandatory_when_formatting;
exports.get_format_uses_national_prefix = get_format_uses_national_prefix;
exports.get_format_international_format = get_format_international_format;
exports.get_metadata_by_country_phone_code = get_metadata_by_country_phone_code;
exports.get_types = get_types;
exports.get_type_fixed_line = get_type_fixed_line;
exports.get_type_mobile = get_type_mobile;
exports.get_type_toll_free = get_type_toll_free;
exports.get_type_premium_rate = get_type_premium_rate;
exports.get_type_personal_number = get_type_personal_number;
exports.get_type_voice_mail = get_type_voice_mail;
exports.get_type_uan = get_type_uan;
exports.get_type_pager = get_type_pager;
exports.get_type_voip = get_type_voip;
exports.get_type_shared_cost = get_type_shared_cost;
exports.get_country_phone_code = get_country_phone_code;
function get_phone_code(country_metadata) {
	return country_metadata[0];
}

function get_national_number_pattern(country_metadata) {
	return country_metadata[1];
}

function get_formats(country_metadata) {
	return country_metadata[2] || [];
}

function get_national_prefix(country_metadata) {
	return country_metadata[3];
}

function get_national_prefix_formatting_rule(country_metadata) {
	return country_metadata[4];
}

function get_national_prefix_for_parsing(country_metadata) {
	var national_prefix_for_parsing = country_metadata[5];

	// If `national_prefix_for_parsing` is not set explicitly,
	// then infer it from `national_prefix` (if any)
	if (!national_prefix_for_parsing) {
		national_prefix_for_parsing = get_national_prefix(country_metadata);
	}

	return national_prefix_for_parsing;
}

function get_national_prefix_transform_rule(country_metadata) {
	return country_metadata[6];
}

function get_national_prefix_is_optional_when_formatting(country_metadata) {
	return country_metadata[7];
}

function get_leading_digits(country_metadata) {
	return country_metadata[8];
}

function get_format_pattern(format_array) {
	return format_array[0];
}

function get_format_format(format_array) {
	return format_array[1];
}

function get_format_leading_digits_patterns(format_array) {
	return format_array[2] || [];
}

function get_format_national_prefix_formatting_rule(format_array, country_metadata) {
	return format_array[3] || get_national_prefix_formatting_rule(country_metadata);
}

function get_format_national_prefix_is_optional_when_formatting(format_array, country_metadata) {
	return format_array[4] || get_national_prefix_is_optional_when_formatting(country_metadata);
}

function get_format_national_prefix_is_mandatory_when_formatting(format_array, country_metadata) {
	var national_prefix_formatting_rule = get_format_national_prefix_formatting_rule(format_array, country_metadata);

	// National prefix is omitted if there's no national prefix formatting rule
	// set for this country, or when the national prefix formatting rule
	// contains no national prefix itself, or when this rule is set but
	// national prefix is optional for this phone number format
	// (and it is not enforced explicitly)
	return national_prefix_formatting_rule &&
	// Check that national prefix formatting rule is not a dummy one.
	// Check that national prefix formatting rule actually has national prefix digit(s).
	get_format_uses_national_prefix(national_prefix_formatting_rule) &&
	// Or maybe national prefix is optional for this format
	!get_format_national_prefix_is_optional_when_formatting(format_array, country_metadata);
}

// Checks whether national prefix formatting rule contains national prefix
function get_format_uses_national_prefix(national_prefix_formatting_rule) {
	// Check that national prefix formatting rule is not a dummy one
	return national_prefix_formatting_rule !== '$1' &&
	// Check that national prefix formatting rule actually has national prefix digit(s)
	/\d/.test(national_prefix_formatting_rule.replace('$1', ''));
}

function get_format_international_format(format_array) {
	return format_array[5] || get_format_format(format_array);
}

// Formatting information for regions which share
// a country calling code is contained by only one region
// for performance reasons. For example, for NANPA region
// ("North American Numbering Plan Administration",
//  which includes USA, Canada, Cayman Islands, Bahamas, etc)
// it will be contained in the metadata for `US`.
function get_metadata_by_country_phone_code(country_phone_code, metadata) {
	var country_code = metadata.country_phone_code_to_countries[country_phone_code][0];
	return metadata.countries[country_code];
}

function get_types(country_metadata) {
	return country_metadata[9];
}

function get_type(country_metadata, index) {
	return get_types(country_metadata) ? get_types(country_metadata)[index] : undefined;
}

function get_type_fixed_line(country_metadata) {
	return get_type(country_metadata, 0);
}

function get_type_mobile(country_metadata) {
	return get_type(country_metadata, 1);
}

function get_type_toll_free(country_metadata) {
	return get_type(country_metadata, 2);
}

function get_type_premium_rate(country_metadata) {
	return get_type(country_metadata, 3);
}

function get_type_personal_number(country_metadata) {
	return get_type(country_metadata, 4);
}

function get_type_voice_mail(country_metadata) {
	return get_type(country_metadata, 5);
}

function get_type_uan(country_metadata) {
	return get_type(country_metadata, 6);
}

function get_type_pager(country_metadata) {
	return get_type(country_metadata, 7);
}

function get_type_voip(country_metadata) {
	return get_type(country_metadata, 8);
}

function get_type_shared_cost(country_metadata) {
	return get_type(country_metadata, 9);
}

function get_country_phone_code(country, country_metadata) {
	return get_phone_code(country_metadata[country]);
}

},{}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VALID_PUNCTUATION = exports.VALID_DIGITS = exports.PLUS_CHARS = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = parse;
exports.normalize = normalize;
exports.replace_characters = replace_characters;
exports.is_viable_phone_number = is_viable_phone_number;
exports.extract_formatted_phone_number = extract_formatted_phone_number;
exports.parse_phone_number = parse_phone_number;
exports.parse_phone_number_and_country_phone_code = parse_phone_number_and_country_phone_code;
exports.strip_national_prefix = strip_national_prefix;
exports.find_country_code = find_country_code;

var _common = require('./common');

var _metadata = require('./metadata');

var _format = require('./format');

var _getNumberType = require('./get number type');

var _getNumberType2 = _interopRequireDefault(_getNumberType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is a port of Google Android `libphonenumber`'s
// `phonenumberutil.js` of 17th November, 2016.
//
// https://github.com/googlei18n/libphonenumber/commits/master/javascript/i18n/phonenumbers/phonenumberutil.js

var PLUS_CHARS = exports.PLUS_CHARS = '+\uFF0B';

// Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).
var VALID_DIGITS = exports.VALID_DIGITS = '0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9';

// `DASHES` will be right after the opening square bracket of the "character class"
var DASHES = '-\u2010-\u2015\u2212\u30FC\uFF0D';
var SLASHES = '\uFF0F/';
var DOTS = '\uFF0E.';
var WHITESPACE = ' \xA0\xAD\u200B\u2060\u3000';
var BRACKETS = '()\uFF08\uFF09\uFF3B\uFF3D\\[\\]';
var TILDES = '~\u2053\u223C\uFF5E';

// Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.
var VALID_PUNCTUATION = exports.VALID_PUNCTUATION = '' + DASHES + SLASHES + DOTS + WHITESPACE + BRACKETS + TILDES;

//  Regular expression of viable phone numbers. This is location independent.
//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//
var MIN_LENGTH_PHONE_NUMBER_PATTERN = '[' + VALID_DIGITS + ']{' + MIN_LENGTH_FOR_NSN + '}';
//
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//
var VALID_PHONE_NUMBER = '[' + PLUS_CHARS + ']{0,1}' + '(?:' + '[' + VALID_PUNCTUATION + ']*' + '[' + VALID_DIGITS + ']' + '){3,}' + '[' + VALID_PUNCTUATION + VALID_DIGITS + ']*';

// The combined regular expression for valid phone numbers:
//
var VALID_PHONE_NUMBER_PATTERN = new RegExp(
// Either a short two-digit-only phone number
'^' + MIN_LENGTH_PHONE_NUMBER_PATTERN + '$' + '|' +
// Or a longer fully parsed phone number (min 3 characters)
'^' + VALID_PHONE_NUMBER +
// screw phone number extensions
// '(?:' + EXTN_PATTERNS_FOR_PARSING + ')?' +
'$', 'i');

// This consists of the plus symbol, digits, and arabic-indic digits.
var PHONE_NUMBER_START_PATTERN = new RegExp('[' + PLUS_CHARS + VALID_DIGITS + ']');

// Regular expression of trailing characters that we want to remove.
var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp('[^' + VALID_DIGITS + ']+$');

var LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+');

// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
var DIGIT_MAPPINGS = {
	'0': '0',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	'6': '6',
	'7': '7',
	'8': '8',
	'9': '9',
	'\uFF10': '0', // Fullwidth digit 0
	'\uFF11': '1', // Fullwidth digit 1
	'\uFF12': '2', // Fullwidth digit 2
	'\uFF13': '3', // Fullwidth digit 3
	'\uFF14': '4', // Fullwidth digit 4
	'\uFF15': '5', // Fullwidth digit 5
	'\uFF16': '6', // Fullwidth digit 6
	'\uFF17': '7', // Fullwidth digit 7
	'\uFF18': '8', // Fullwidth digit 8
	'\uFF19': '9', // Fullwidth digit 9
	'\u0660': '0', // Arabic-indic digit 0
	'\u0661': '1', // Arabic-indic digit 1
	'\u0662': '2', // Arabic-indic digit 2
	'\u0663': '3', // Arabic-indic digit 3
	'\u0664': '4', // Arabic-indic digit 4
	'\u0665': '5', // Arabic-indic digit 5
	'\u0666': '6', // Arabic-indic digit 6
	'\u0667': '7', // Arabic-indic digit 7
	'\u0668': '8', // Arabic-indic digit 8
	'\u0669': '9', // Arabic-indic digit 9
	'\u06F0': '0', // Eastern-Arabic digit 0
	'\u06F1': '1', // Eastern-Arabic digit 1
	'\u06F2': '2', // Eastern-Arabic digit 2
	'\u06F3': '3', // Eastern-Arabic digit 3
	'\u06F4': '4', // Eastern-Arabic digit 4
	'\u06F5': '5', // Eastern-Arabic digit 5
	'\u06F6': '6', // Eastern-Arabic digit 6
	'\u06F7': '7', // Eastern-Arabic digit 7
	'\u06F8': '8', // Eastern-Arabic digit 8
	'\u06F9': '9' // Eastern-Arabic digit 9
};

// The maximum length of the country calling code.
var MAX_LENGTH_COUNTRY_CODE = 3;

// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2;

// The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.
var MAX_LENGTH_FOR_NSN = 17;

// We don't allow input strings for parsing to be longer than 250 chars.
// This prevents malicious input from consuming CPU.
var MAX_INPUT_STRING_LENGTH = 250;

var default_options = {
	country: {}
};

// `options`:
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//
function parse(first_argument, second_argument, third_argument) {
	var _sort_out_arguments = sort_out_arguments(first_argument, second_argument, third_argument),
	    text = _sort_out_arguments.text,
	    options = _sort_out_arguments.options,
	    metadata = _sort_out_arguments.metadata;

	if (!options) {
		options = (0, _extends3.default)({}, default_options);
	}

	// Validate country codes

	// Validate `default` country
	if (options.country.default && !metadata.countries[options.country.default]) {
		throw new Error('Unknown country code: ' + options.country.default);
	}

	// Validate `restrict` country
	if (options.country.restrict && !metadata.countries[options.country.restrict]) {
		throw new Error('Unknown country code: ' + options.country.restrict);
	}

	// Parse the phone number

	var formatted_phone_number = extract_formatted_phone_number(text);

	// If the phone number is not viable, then abort.
	if (!is_viable_phone_number(formatted_phone_number)) {
		return {};
	}

	var _parse_phone_number_a = parse_phone_number_and_country_phone_code(formatted_phone_number, metadata),
	    country_phone_code = _parse_phone_number_a.country_phone_code,
	    number = _parse_phone_number_a.number;

	// Maybe invalid country phone code encountered


	if (!number) {
		return {};
	}

	var country = void 0;
	var country_metadata = void 0;

	// Whether the phone number is formatted as an international phone number
	var is_international = false;

	if (country_phone_code) {
		is_international = true;

		// Check country restriction
		if (options.country.restrict && country_phone_code !== (0, _metadata.get_phone_code)(metadata.countries[options.country.restrict])) {
			return {};
		}

		// Formatting information for regions which share
		// a country calling code is contained by only one region
		// for performance reasons. For example, for NANPA region
		// ("North American Numbering Plan Administration",
		//  which includes USA, Canada, Cayman Islands, Bahamas, etc)
		// it will be contained in the metadata for `US`.
		country_metadata = (0, _metadata.get_metadata_by_country_phone_code)(country_phone_code, metadata);

		// `country` will be set later,
		// because, for example, for NANPA countries
		// there are several countries corresponding
		// to the same `1` country phone code.
		// Therefore, to reliably determine the exact country,
		// national (significant) number should be parsed first.
	} else if (options.country.restrict || options.country.default) {
		country = options.country.restrict || options.country.default;
		country_metadata = metadata.countries[country];

		number = normalize(text);
	}

	if (!country_metadata) {
		return {};
	}

	var national_number = strip_national_prefix(number, country_metadata);

	var did_have_national_prefix = national_number !== number;

	// https://github.com/catamphetamine/libphonenumber-js/issues/67
	// if (!is_international && !did_have_national_prefix &&
	// 		is_national_prefix_required(national_number, country_metadata))
	// {
	// 	return {}
	// }

	// Sometimes there are several countries
	// corresponding to the same country phone code
	// (e.g. NANPA countries all having `1` country phone code).
	// Therefore, to reliably determine the exact country,
	// national (significant) number should have been parsed first.
	//
	if (!country) {
		// When `metadata.json` is generated, all "ambiguous" country phone codes
		// get their countries populated with the full set of
		// "phone number type" regular expressions.
		country = find_country_code(country_phone_code, national_number, metadata);

		// Just in case there appears to be a bug in Google's metadata
		// and the exact country could not be extracted from the phone number.
		/* istanbul ignore if */
		if (!country) {
			return {};
		}

		// Update metadata to be for this specific country
		country_metadata = metadata.countries[country];
	}

	// Validate national (significant) number length.
	//
	// A sidenote:
	//
	// They say that sometimes national (significant) numbers
	// can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
	// https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
	// Such numbers will just be discarded.
	//
	if (national_number.length > MAX_LENGTH_FOR_NSN) {
		return {};
	}

	// National number pattern is different for each country,
	// even for those ones which are part of the "NANPA" group.
	var national_number_rule = new RegExp((0, _metadata.get_national_number_pattern)(country_metadata));

	// Check if national phone number pattern matches the number
	if (!(0, _common.matches_entirely)(national_number, national_number_rule)) {
		return {};
	}

	return { country: country, phone: national_number };
}

// Normalizes a string of characters representing a phone number.
// This converts wide-ascii and arabic-indic numerals to European numerals,
// and strips punctuation and alpha characters.
function normalize(number) {
	return replace_characters(number, DIGIT_MAPPINGS);
}

// For any character not being part of `replacements`
// it is removed from the phone number.
function replace_characters(text, replacements) {
	var replaced = '';

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = (0, _getIterator3.default)(text), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var character = _step.value;

			var replacement = replacements[character.toUpperCase()];

			if (replacement !== undefined) {
				replaced += replacement;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return replaced;
}

// Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//
function is_viable_phone_number(number) {
	return number.length >= MIN_LENGTH_FOR_NSN && (0, _common.matches_entirely)(number, VALID_PHONE_NUMBER_PATTERN);
}

function extract_formatted_phone_number(text) {
	if (!text || text.length > MAX_INPUT_STRING_LENGTH) {
		return '';
	}

	// Attempt to extract a possible number from the string passed in

	var starts_at = text.search(PHONE_NUMBER_START_PATTERN);

	if (starts_at < 0) {
		return '';
	}

	return text
	// Trim everything to the left of the phone number
	.slice(starts_at)
	// Remove trailing non-numerical characters
	.replace(AFTER_PHONE_NUMBER_END_PATTERN, '');
}

// Parses a formatted phone number.
function parse_phone_number(number) {
	if (!number) {
		return '';
	}

	var is_international = LEADING_PLUS_CHARS_PATTERN.test(number);

	// Remove non-digits
	// (and strip the possible leading '+')
	number = normalize(number);

	if (is_international) {
		return '+' + number;
	}

	return number;
}

// Parses a formatted phone number
// and returns `{ country_phone_code, number }`
// where `number` is the national (significant) phone number.
//
// (aka `maybeExtractCountryPhoneCode`)
//
function parse_phone_number_and_country_phone_code(number, metadata) {
	number = parse_phone_number(number);

	if (!number) {
		return {};
	}

	// If this is not an international phone number,
	// then don't extract country phone code.
	if (number[0] !== '+') {
		return { number: number };
	}

	// Strip the leading '+' sign
	number = number.slice(1);

	// Fast abortion: country codes do not begin with a '0'
	if (number[0] === '0') {
		return {};
	}

	// The thing with country phone codes
	// is that they are orthogonal to each other
	// i.e. there's no such country phone code A
	// for which country phone code B exists
	// where B starts with A.
	// Therefore, while scanning digits,
	// if a valid country code is found,
	// that means that it is the country code.
	//
	var i = 1;
	while (i <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
		var country_phone_code = number.slice(0, i);

		if (metadata.country_phone_code_to_countries[country_phone_code]) {
			return { country_phone_code: country_phone_code, number: number.slice(i) };
		}

		i++;
	}

	return {};
}

// Strips any national prefix (such as 0, 1) present in the number provided
function strip_national_prefix(number, country_metadata) {
	var national_prefix_for_parsing = (0, _metadata.get_national_prefix_for_parsing)(country_metadata);

	if (!number || !national_prefix_for_parsing) {
		return number;
	}

	// Attempt to parse the first digits as a national prefix
	var national_prefix_pattern = new RegExp('^(?:' + national_prefix_for_parsing + ')');
	var national_prefix_matcher = national_prefix_pattern.exec(number);

	// If no national prefix is present in the phone number,
	// but if the national prefix is optional for this country,
	// then consider this phone number valid.
	//
	// Google's reference `libphonenumber` implementation
	// wouldn't recognize such phone numbers as valid,
	// but I think it would perfectly make sense
	// to consider such phone numbers as valid
	// because if a national phone number was originally
	// formatted without the national prefix
	// then it must be parseable back into the original national number.
	// In other words, `parse(format(number))`
	// must always be equal to `number`.
	//
	if (!national_prefix_matcher) {
		return number;
	}

	var national_significant_number = void 0;

	// `national_prefix_for_parsing` capturing groups
	// (used only for really messy cases: Argentina, Brazil, Mexico, Somalia)
	var any_groups_were_captured = national_prefix_matcher[national_prefix_matcher.length - 1];
	var national_prefix_transform_rule = (0, _metadata.get_national_prefix_transform_rule)(country_metadata);

	// If the national number tranformation is needed then do it
	if (national_prefix_transform_rule && any_groups_were_captured) {
		national_significant_number = number.replace(national_prefix_pattern, national_prefix_transform_rule);
	}
	// Else, no transformation is necessary,
	// and just strip the national prefix.
	else {
			national_significant_number = number.slice(national_prefix_matcher[0].length);
		}

	// Verify the parsed national (significant) number for this country
	var national_number_rule = new RegExp((0, _metadata.get_national_number_pattern)(country_metadata));

	// If the original number (before stripping national prefix) was viable,
	// and the resultant number is not, then prefer the original phone number.
	// This is because for some countries (e.g. Russia) the same digit could be both
	// a national prefix and a leading digit of a valid national phone number,
	// like `8` is the national prefix for Russia and both
	// `8 800 555 35 35` and `800 555 35 35` are valid numbers.
	if ((0, _common.matches_entirely)(number, national_number_rule) && !(0, _common.matches_entirely)(national_significant_number, national_number_rule)) {
		return number;
	}

	// Return the parsed national (significant) number
	return national_significant_number;
}

function find_country_code(country_phone_code, national_phone_number, metadata) {
	// Is always non-empty, because `country_phone_code` is always valid
	var possible_countries = metadata.country_phone_code_to_countries[country_phone_code];

	// If there's just one country corresponding to the country code,
	// then just return it, without further phone number digits validation.
	if (possible_countries.length === 1) {
		return possible_countries[0];
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = (0, _getIterator3.default)(possible_countries), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var country_code = _step2.value;

			var country = metadata.countries[country_code];

			// Leading digits check would be the simplest one
			if ((0, _metadata.get_leading_digits)(country)) {
				if (national_phone_number && national_phone_number.search((0, _metadata.get_leading_digits)(country)) === 0) {
					return country_code;
				}
			}
			// Else perform full validation with all of those bulky
			// fixed-line/mobile/etc regular expressions.
			else if ((0, _getNumberType2.default)({ phone: national_phone_number, country: country_code }, metadata)) {
					return country_code;
				}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}
}

// export function is_national_prefix_required(national_number, country_metadata)
// {
// 	const format = choose_format_for_number(get_formats(country_metadata), national_number)
//
// 	if (format)
// 	{
// 		return get_format_national_prefix_is_mandatory_when_formatting(format, country_metadata)
// 	}
// }

// Sort out arguments
function sort_out_arguments(first_argument, second_argument, third_argument) {
	var text = void 0;
	var options = void 0;
	var metadata = void 0;

	if (typeof first_argument === 'string') {
		text = first_argument;
	}

	// Covert `resrict` country to an `options` object
	if (typeof second_argument === 'string') {
		var restrict_to_country = second_argument;

		options = (0, _extends3.default)({}, default_options, {

			country: {
				restrict: restrict_to_country
			}
		});

		metadata = third_argument;
	} else {
		// Differentiate `metadata` from `options`
		if (second_argument && second_argument.countries) {
			metadata = second_argument;
		} else {
			options = second_argument;
			metadata = third_argument;
		}
	}

	// Sanity check
	if (!metadata) {
		throw new Error('Metadata not passed');
	}

	return { text: text, options: options, metadata: metadata };
}

},{"./common":94,"./format":95,"./get number type":96,"./metadata":97,"babel-runtime/core-js/get-iterator":25,"babel-runtime/helpers/extends":30}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = is_valid;

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _getNumberType = require('./get number type');

var _getNumberType2 = _interopRequireDefault(_getNumberType);

var _metadata = require('./metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks if a given phone number is valid
//
// Example use cases:
//
// ```js
// is_valid('8005553535', 'RU')
// is_valid('8005553535', 'RU', metadata)
// is_valid({ phone: '8005553535', country: 'RU' })
// is_valid({ phone: '8005553535', country: 'RU' }, metadata)
// is_valid('+78005553535')
// is_valid('+78005553535', metadata)
// ```
//
function is_valid(first_argument, second_argument, third_argument) {
	var _sort_out_arguments = (0, _getNumberType.sort_out_arguments)(first_argument, second_argument, third_argument),
	    input = _sort_out_arguments.input,
	    metadata = _sort_out_arguments.metadata;

	// Sanity check


	if (!metadata) {
		throw new Error('Metadata not passed');
	}

	if (!input) {
		return false;
	}

	if (!input.country) {
		return false;
	}

	var country_metadata = metadata.countries[input.country];

	if ((0, _metadata.get_types)(country_metadata)) {
		if (!(0, _getNumberType2.default)(input, metadata)) {
			return false;
		}
	}

	return true;
}

},{"./get number type":96,"./metadata":97,"./parse":98}],100:[function(require,module,exports){
'use strict'

exports = module.exports = {}

exports.parse             = require('./build/parse').default
exports.format            = require('./build/format').default
exports.get_number_type   = require('./build/get number type').default
exports.is_valid_number   = require('./build/validate').default
exports.as_you_type       = require('./build/as you type').default
exports.DIGIT_PLACEHOLDER = require('./build/as you type').DIGIT_PLACEHOLDER

// camelCase aliases
exports.getNumberType = exports.get_number_type
exports.isValidNumber = exports.is_valid_number
exports.asYouType     = exports.as_you_type

var get_phone_code = require('./build/metadata').get_phone_code

exports.getPhoneCode = function(country, metadata)
{
	if (!metadata.countries[country])
	{
		throw new Error('Unknown country: "' + country + '"')
	}

	return get_phone_code(metadata.countries[country])
}

// exports['default'] = ...
},{"./build/as you type":93,"./build/format":95,"./build/get number type":96,"./build/metadata":97,"./build/parse":98,"./build/validate":99}],101:[function(require,module,exports){
'use strict'

var custom   = require('./custom')
var metadata = require('./metadata.min.json')

exports = module.exports = {}

exports.parse = function parse()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(metadata)
	return custom.parse.apply(this, parameters)
}

exports.format = function format()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(metadata)
	return custom.format.apply(this, parameters)
}

exports.get_number_type = function get_number_type()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(metadata)
	return custom.getNumberType.apply(this, parameters)
}

exports.is_valid_number = function is_valid_number()
{
	var parameters = Array.prototype.slice.call(arguments)
	parameters.push(metadata)
	return custom.isValidNumber.apply(this, parameters)
}

exports.as_you_type = function as_you_type(country)
{
	custom.asYouType.call(this, country, metadata)
}

exports.as_you_type.prototype = Object.create(custom.asYouType.prototype, {})
exports.as_you_type.prototype.constructor = exports.as_you_type

exports.DIGIT_PLACEHOLDER = custom.DIGIT_PLACEHOLDER

// camelCase aliases
exports.getNumberType = exports.get_number_type
exports.isValidNumber = exports.is_valid_number
exports.asYouType = exports.as_you_type

exports.getPhoneCode = function(country)
{
	return custom.getPhoneCode(country, metadata)
}
},{"./custom":100,"./metadata.min.json":102}],102:[function(require,module,exports){
module.exports={"country_phone_code_to_countries":{"1":["US","AG","AI","AS","BB","BM","BS","CA","DM","DO","GD","GU","JM","KN","KY","LC","MP","MS","PR","SX","TC","TT","VC","VG","VI"],"7":["RU","KZ"],"20":["EG"],"27":["ZA"],"30":["GR"],"31":["NL"],"32":["BE"],"33":["FR"],"34":["ES"],"36":["HU"],"39":["IT","VA"],"40":["RO"],"41":["CH"],"43":["AT"],"44":["GB","GG","IM","JE"],"45":["DK"],"46":["SE"],"47":["NO","SJ"],"48":["PL"],"49":["DE"],"51":["PE"],"52":["MX"],"53":["CU"],"54":["AR"],"55":["BR"],"56":["CL"],"57":["CO"],"58":["VE"],"60":["MY"],"61":["AU","CC","CX"],"62":["ID"],"63":["PH"],"64":["NZ"],"65":["SG"],"66":["TH"],"81":["JP"],"82":["KR"],"84":["VN"],"86":["CN"],"90":["TR"],"91":["IN"],"92":["PK"],"93":["AF"],"94":["LK"],"95":["MM"],"98":["IR"],"211":["SS"],"212":["MA","EH"],"213":["DZ"],"216":["TN"],"218":["LY"],"220":["GM"],"221":["SN"],"222":["MR"],"223":["ML"],"224":["GN"],"225":["CI"],"226":["BF"],"227":["NE"],"228":["TG"],"229":["BJ"],"230":["MU"],"231":["LR"],"232":["SL"],"233":["GH"],"234":["NG"],"235":["TD"],"236":["CF"],"237":["CM"],"238":["CV"],"239":["ST"],"240":["GQ"],"241":["GA"],"242":["CG"],"243":["CD"],"244":["AO"],"245":["GW"],"246":["IO"],"247":["AC"],"248":["SC"],"249":["SD"],"250":["RW"],"251":["ET"],"252":["SO"],"253":["DJ"],"254":["KE"],"255":["TZ"],"256":["UG"],"257":["BI"],"258":["MZ"],"260":["ZM"],"261":["MG"],"262":["RE","YT"],"263":["ZW"],"264":["NA"],"265":["MW"],"266":["LS"],"267":["BW"],"268":["SZ"],"269":["KM"],"290":["SH","TA"],"291":["ER"],"297":["AW"],"298":["FO"],"299":["GL"],"350":["GI"],"351":["PT"],"352":["LU"],"353":["IE"],"354":["IS"],"355":["AL"],"356":["MT"],"357":["CY"],"358":["FI","AX"],"359":["BG"],"370":["LT"],"371":["LV"],"372":["EE"],"373":["MD"],"374":["AM"],"375":["BY"],"376":["AD"],"377":["MC"],"378":["SM"],"380":["UA"],"381":["RS"],"382":["ME"],"385":["HR"],"386":["SI"],"387":["BA"],"389":["MK"],"420":["CZ"],"421":["SK"],"423":["LI"],"500":["FK"],"501":["BZ"],"502":["GT"],"503":["SV"],"504":["HN"],"505":["NI"],"506":["CR"],"507":["PA"],"508":["PM"],"509":["HT"],"590":["GP","BL","MF"],"591":["BO"],"592":["GY"],"593":["EC"],"594":["GF"],"595":["PY"],"596":["MQ"],"597":["SR"],"598":["UY"],"599":["CW","BQ"],"670":["TL"],"672":["NF"],"673":["BN"],"674":["NR"],"675":["PG"],"676":["TO"],"677":["SB"],"678":["VU"],"679":["FJ"],"680":["PW"],"681":["WF"],"682":["CK"],"683":["NU"],"685":["WS"],"686":["KI"],"687":["NC"],"688":["TV"],"689":["PF"],"690":["TK"],"691":["FM"],"692":["MH"],"800":["001"],"808":["001"],"850":["KP"],"852":["HK"],"853":["MO"],"855":["KH"],"856":["LA"],"870":["001"],"878":["001"],"880":["BD"],"881":["001"],"882":["001"],"883":["001"],"886":["TW"],"888":["001"],"960":["MV"],"961":["LB"],"962":["JO"],"963":["SY"],"964":["IQ"],"965":["KW"],"966":["SA"],"967":["YE"],"968":["OM"],"970":["PS"],"971":["AE"],"972":["IL"],"973":["BH"],"974":["QA"],"975":["BT"],"976":["MN"],"977":["NP"],"979":["001"],"992":["TJ"],"993":["TM"],"994":["AZ"],"995":["GE"],"996":["KG"],"998":["UZ"]},"countries":{"AC":["247","[46]\\d{4}|[01589]\\d{5}"],"AD":["376","[16]\\d{5,8}|[37-9]\\d{5}",[["(\\d{3})(\\d{3})","$1 $2",["[137-9]|6[0-8]"]],["(\\d{4})(\\d{4})","$1 $2",["180","180[02]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["690"]]]],"AE":["971","[2-79]\\d{7,8}|800\\d{2,9}",[["([2-4679])(\\d{3})(\\d{4})","$1 $2 $3",["[2-4679][2-8]"]],["(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"]],["([479]00)(\\d)(\\d{5})","$1 $2 $3",["[479]0"],"$1"],["([68]00)(\\d{2,9})","$1 $2",["60|8"],"$1"]],"0","0$1"],"AF":["93","[2-7]\\d{8}",[["([2-7]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"]]],"0","0$1"],"AG":["1","[2589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"268"],"AI":["1","[2589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"264"],"AL":["355","[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}",[["(4)(\\d{3})(\\d{4})","$1 $2 $3",["4[0-6]"]],["(6\\d)(\\d{3})(\\d{4})","$1 $2 $3",["6"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4[7-9]"]],["(\\d{3})(\\d{3,5})","$1 $2",["[235][16-9]|8[016-9]|[79]"]]],"0","0$1"],"AM":["374","[1-9]\\d{7}",[["(\\d{2})(\\d{6})","$1 $2",["1|47"]],["(\\d{2})(\\d{6})","$1 $2",["4[1349]|[5-7]|88|9[1-9]"],"0$1"],["(\\d{3})(\\d{5})","$1 $2",["[23]"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8|90"],"0 $1"]],"0","(0$1)"],"AO":["244","[29]\\d{8}",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3"]]],"AR":["54","11\\d{8}|[2368]\\d{9}|9\\d{10}",[["([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"]],["(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],null,null,"$1 $2 $3-$4"],["(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[234689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],null,null,"$1 $2 $3-$4"],["(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],null,null,"$1 $2 $3-$4"],["(11)(\\d{4})(\\d{4})","$1 $2-$3",["1"],null,"true"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],null,"true"],["(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],null,"true"]],"0","0$1","0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?","9$1"],"AS":["1","[5689]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"684"],"AT":["43","[1-9]\\d{3,12}",[["(116\\d{3})","$1",["116"],"$1"],["(1)(\\d{3,12})","$1 $2",["1"]],["(5\\d)(\\d{3,5})","$1 $2",["5[079]"]],["(5\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["5[079]"]],["(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"]],["(\\d{3})(\\d{3,10})","$1 $2",["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"]],["(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"]]],"0","0$1"],"AU":["61","1\\d{4,9}|[2-578]\\d{8}",[["([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[45]|14"],"0$1"],["(16)(\\d{3,4})","$1 $2",["16"],"0$1"],["(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[38]0|90)","1(?:[38]00|90)"],"$1"],["(180)(2\\d{3})","$1 $2",["180","1802"],"$1"],["(19\\d)(\\d{3})","$1 $2",["19[13]"],"$1"],["(19\\d{2})(\\d{4})","$1 $2",["19[679]"],"$1"],["(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"],"$1"]],"0",null,null,null,null,null,["[237]\\d{8}|8(?:[6-8]\\d{3}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}","14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}","180(?:0\\d{3}|2)\\d{3}","19(?:0[0126]\\d|[679])\\d{5}","500\\d{6}",null,null,"16\\d{3,7}","550\\d{6}","13(?:00\\d{3}|45[0-4]|\\d)\\d{3}"]],"AW":["297","[25-9]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"AX":["358","[15]\\d{6,9}|2\\d{4,9}|3\\d{5,9}|4\\d{7,10}|[67]\\d{7,9}|8\\d{7,8}",[["(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]00|[6-8]0)"]],["(116\\d{3})","$1",["116"],"$1"],["(\\d{2})(\\d{3,9})","$1 $2",["1(?:0[1-9]|[3-9])|2(?:0[1-9]|9)|30[1-9]|4|50|7(?:[13]|5[03-9])"]],["(\\d)(\\d{5,9})","$1 $2",["[235689][1-8]"]],["(39\\d)(\\d{3})(\\d{3})","$1 $2 $3",["39"]]],"0",null,null,null,null,null,["18[1-8]\\d{4,6}","4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{6,8}","800\\d{5,6}","[67]00\\d{5,6}",null,null,"10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{6,8})|3(?:0(?:0\\d{3,7}|[1-57-9]\\d{5,7}|6(?:\\d{3}|\\d{5,7}))|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})"]],"AZ":["994","[1-9]\\d{8}",[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["(?:1[28]|2(?:[45]2|[0-36])|365)"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[4-8]"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],"0","(0$1)"],"BA":["387","[3-9]\\d{7,8}",[["(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6[047]"]]],"0","0$1"],"BB":["1","[2589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"246"],"BD":["880","[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}",[["(2)(\\d{7,8})","$1-$2",["2"]],["(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"]],["(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"]],["(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"]]],"0","0$1"],"BE":["32","[1-9]\\d{7,8}",[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[6-9]"]],["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[156]|7[018]|8(?:0[1-9]|[1-79])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"]]],"0","0$1"],"BF":["226","[25-7]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"BG":["359","[23567]\\d{5,7}|[489]\\d{6,8}",[["(2)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"]],["(2)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"]],["(\\d{3})(\\d{4})","$1 $2",["43[124-7]|70[1-9]"]],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[124-7]|70[1-9]"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[78]00"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["999"]],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"]],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["48|8[7-9]|9[08]"]]],"0","0$1"],"BH":["973","[136-9]\\d{7}",[["(\\d{4})(\\d{4})","$1 $2"]]],"BI":["257","[267]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"BJ":["229","[2689]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"]]]],"BL":["590","[56]\\d{8}",[["([56]90)(\\d{2})(\\d{4})","$1 $2-$3"]],"0",null,null,null,null,null,["590(?:2[7-9]|5[12]|87)\\d{4}","690(?:0[05-9]|[1-9]\\d)\\d{4}"]],"BM":["1","[4589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"441"],"BN":["673","[2-578]\\d{6}",[["([2-578]\\d{2})(\\d{4})","$1 $2"]]],"BO":["591","[23467]\\d{7}|8\\d{8}",[["([234])(\\d{7})","$1 $2",["[234]"]],["([67]\\d{7})","$1",["[67]"]],["(800)(\\d{2})(\\d{4})","$1 $2 $3",["800"]]],"0",null,"0(1\\d)?"],"BQ":["599","[347]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2",["[13-7]"]],["(9)(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],null,null,null,null,null,null,["(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}","(?:31(?:8[14-8]|9[14578])|416[145-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}"]],"BR":["55","[1-46-9]\\d{7,10}|5(?:[0-4]\\d{7,9}|5(?:[2-8]\\d{7}|9\\d{7,8}))",[["(\\d{4})(\\d{4})","$1-$2",["(?:300|40[02])","(?:300|40(?:0|20))"]],["([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],["(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)"],["(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)"]],"0",null,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"BS":["1","[2589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"242"],"BT":["975","[1-8]\\d{6,7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1|77"]],["([2-8])(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]]]],"BW":["267","[2-79]\\d{6,7}",[["(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],["(7\\d)(\\d{3})(\\d{3})","$1 $2 $3",["7"]],["(90)(\\d{5})","$1 $2",["9"]]]],"BY":["375","[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}",[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])","1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],["(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],["([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],["(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],["(800)(\\d{3})","$1 $2",["800"],"8 $1"],["(800)(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"]],"8",null,"8?0?"],"BZ":["501","[2-8]\\d{6}|0\\d{10}",[["(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],["(0)(800)(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]]],"CA":["1","[2-9]\\d{9}|3\\d{6}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,null,["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}|310\\d{4}","(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}","8(?:00|33|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}","900[2-9]\\d{6}","5(?:00|22|33|44|66|77|88)[2-9]\\d{6}"]],"CC":["61","[1458]\\d{5,9}",[["([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[45]|14"],"0$1"],["(16)(\\d{3,4})","$1 $2",["16"],"0$1"],["(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[38]0|90)","1(?:[38]00|90)"],"$1"],["(180)(2\\d{3})","$1 $2",["180","1802"],"$1"],["(19\\d)(\\d{3})","$1 $2",["19[13]"],"$1"],["(19\\d{2})(\\d{4})","$1 $2",["19[679]"],"$1"],["(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"],"$1"]],"0",null,null,null,null,null,["89162\\d{4}","14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}","180(?:0\\d{3}|2)\\d{3}","190[0126]\\d{6}","500\\d{6}",null,null,null,"550\\d{6}","13(?:00\\d{2})?\\d{4}"]],"CD":["243","[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}",[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["12"]],["([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[0-2459]|9"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"]],["(\\d{2})(\\d{5})","$1 $2",["[1-6]"]]],"0","0$1"],"CF":["236","[278]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"CG":["242","[028]\\d{8}",[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["800"]]]],"CH":["41","[2-9]\\d{8}|860\\d{9}",[["([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]|[89]1"]],["([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"]],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["860"]]],"0","0$1"],"CI":["225","[02-8]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"CK":["682","[2-8]\\d{4}",[["(\\d{2})(\\d{3})","$1 $2"]]],"CL":["56","(?:[2-9]|600|123)\\d{7,8}",[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]"],"($1)"],["(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],["(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],["([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"],"$1"],["(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"],"$1"],["(1230)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"$1"],["(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"]],"0","0$1","0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))"],"CM":["237","[2368]\\d{7,8}",[["([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|88"]]]],"CN":["86","[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}",[["(80\\d{2})(\\d{4})","$1 $2",["80[2678]"],"0$1","true"],["([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],["(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1"],["(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d{2}[19]","[3-9]\\d{2}(?:10|9[56])"],"0$1"],["(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","true"],["([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"],"0$1","true"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],"0$1","true"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"],"0$1","true"],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","true"],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-578]"]],["(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],["(\\d{3})(\\d{7,8})","$1 $2",["950"]]],"0",null,"(1(?:[129]\\d{3}|79\\d{2}))|0"],"CO":["57","(?:[13]\\d{0,3}|[24-8])\\d{7}",[["(\\d)(\\d{7})","$1 $2",["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]","1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"],"($1)"],["(\\d{3})(\\d{7})","$1 $2",["3"]],["(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1",null,"$1 $2 $3"]],"0",null,"0([3579]|4(?:44|56))?"],"CR":["506","[24-9]\\d{7,9}",[["(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]0"]]],null,null,"(19(?:0[012468]|1[09]|20|66|77|99))"],"CU":["53","[2-57]\\d{5,7}",[["(\\d)(\\d{6,7})","$1 $2",["7"]],["(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"]],["(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],"0","(0$1)"],"CV":["238","[259]\\d{6}",[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]]],"CW":["599","[169]\\d{6,7}",[["(\\d{3})(\\d{4})","$1 $2",["[13-7]"]],["(9)(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],null,null,null,null,null,null,["9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}","9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}",null,null,null,null,null,"955\\d{5}",null,"60[0-2]\\d{4}"]],"CX":["61","[1458]\\d{5,9}",[["([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[45]|14"],"0$1"],["(16)(\\d{3,4})","$1 $2",["16"],"0$1"],["(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],["(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[38]0|90)","1(?:[38]00|90)"],"$1"],["(180)(2\\d{3})","$1 $2",["180","1802"],"$1"],["(19\\d)(\\d{3})","$1 $2",["19[13]"],"$1"],["(19\\d{2})(\\d{4})","$1 $2",["19[679]"],"$1"],["(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"],"$1"]],"0",null,null,null,null,null,["89164\\d{4}","14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}","180(?:0\\d{3}|2)\\d{3}","190[0126]\\d{6}","500\\d{6}",null,null,null,"550\\d{6}","13(?:00\\d{2})?\\d{4}"]],"CY":["357","[257-9]\\d{7}",[["(\\d{2})(\\d{6})","$1 $2"]]],"CZ":["420","[2-8]\\d{8}|9\\d{8,11}",[["([2-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],["(96\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]],["(9\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]]]],"DE":["49","[1-35-9]\\d{3,14}|4(?:[0-8]\\d{3,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})",[["(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"]],["(15\\d{3})(\\d{6})","$1 $2",["15[0568]"]],["(1\\d{3})(\\d{7})","$1 $2",["15"]],["(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"]],["(\\d{3})(\\d{3,11})","$1 $2",["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"]],["(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])","[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"]],["(3\\d{4})(\\d{1,10})","$1 $2",["3"]],["(800)(\\d{7,12})","$1 $2",["800"]],["(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["(?:18|90)0|137","1(?:37|80)|900[1359]"]],["(1\\d{2})(\\d{5,11})","$1 $2",["181"]],["(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"]],["(18\\d{2})(\\d{7})","$1 $2",["18[68]"]],["(18\\d)(\\d{8})","$1 $2",["18[2-579]"]],["(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"]],["(138)(\\d{4})","$1 $2",["138"]],["(15[013-68])(\\d{2})(\\d{8})","$1 $2 $3",["15[013-68]"]],["(15[279]\\d)(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"]],["(1[67]\\d)(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"]]],"0","0$1"],"DJ":["253","[27]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"DK":["45","[2-9]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"DM":["1","[57-9]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"767"],"DO":["1","[589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"8[024]9"],"DZ":["213","(?:[1-4]|[5-9]\\d)\\d{7}",[["([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"]],["([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"]],["(9\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"]]],"0","0$1"],"EC":["593","1\\d{9,10}|[2-8]\\d{7}|9\\d{8}",[["(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],null,null,"$1-$2-$3"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],["(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["1"],"$1"]],"0","(0$1)"],"EE":["372","[3-9]\\d{6,7}|800\\d{6,7}",[["([3-79]\\d{2})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],["(70)(\\d{2})(\\d{4})","$1 $2 $3",["70"]],["(8000)(\\d{3})(\\d{3})","$1 $2 $3",["800","8000"]],["([458]\\d{3})(\\d{3,4})","$1 $2",["40|5|8(?:00|[1-5])","40|5|8(?:00[1-9]|[1-5])"]]]],"EG":["20","1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}",[["(\\d)(\\d{7,8})","$1 $2",["[23]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[012]|[89]00"]],["(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|[89][2-9]"]]],"0","0$1"],"EH":["212","[5-9]\\d{8}",[["([5-7]\\d{2})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"]],["([58]\\d{3})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|92)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|924)|892"]],["(5\\d{4})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"]],["([5]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:4[067]|5[03])"]],["(8[09])(\\d{7})","$1-$2",["8(?:0|9[013-9])"]]],"0",null,null,null,null,"528[89]"],"ER":["291","[178]\\d{6}",[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3"]],"0","0$1"],"ES":["34","[5-9]\\d{8}",[["([89]00)(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],["([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|[79][0-8]"]]]],"ET":["251","[1-59]\\d{8}",[["([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3"]],"0","0$1"],"FI":["358","[16]\\d{6,9}|2\\d{4,9}|[35]\\d{5,9}|4\\d{7,10}|7\\d{7,9}|[89]\\d{6,8}",[["(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]00|[6-8]0)"]],["(116\\d{3})","$1",["116"],"$1"],["(\\d{2})(\\d{3,9})","$1 $2",["1(?:0[1-9]|[3-9])|2(?:0[1-9]|9)|30[1-9]|4|50|7(?:[13]|5[03-9])"]],["(\\d)(\\d{5,9})","$1 $2",["[235689][1-8]"]],["(39\\d)(\\d{3})(\\d{3})","$1 $2 $3",["39"]]],"0","0$1",null,null,null,null,["1[3-79][1-8]\\d{4,6}|[235689][1-8]\\d{5,7}","4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{4,8}","800\\d{5,6}","[67]00\\d{5,6}",null,null,"10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{6,8})|3(?:0(?:0\\d{3,7}|[1-57-9]\\d{5,7}|6(?:\\d{3}|\\d{5,7}))|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})"]],"FJ":["679","[35-9]\\d{6}|0\\d{10}",[["(\\d{3})(\\d{4})","$1 $2",["[35-9]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]]],"FK":["500","[2-7]\\d{4}"],"FM":["691","[39]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"FO":["298","[2-9]\\d{5}",[["(\\d{6})","$1"]],null,null,"(10(?:01|[12]0|88))"],"FR":["33","[1-9]\\d{8}",[["([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"]],["(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],"0","0$1"],"GA":["241","0?\\d{7}",[["(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]]],"GB":["44","\\d{7,10}",[["(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"]],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"]],["(1\\d{3})(\\d{5,6})","$1 $2",["1"]],["(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"]],["(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"]],["(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"]],["(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"]],["([58]00)(\\d{6})","$1 $2",["[58]00"]]],"0","0$1",null,null,null,null,["2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-48]|[46][0-4]|5[0-26-9]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}","7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}","80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}","(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}","70\\d{8}",null,"(?:3[0347]|55)\\d{8}","76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","56\\d{8}","8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})"]],"GD":["1","[4589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"473"],"GE":["995","[34578]\\d{8}",[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5"],"$1"]],"0"],"GF":["594","[56]\\d{8}",[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],"0","0$1"],"GG":["44","[135789]\\d{6,9}",[["(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"]],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"]],["(1\\d{3})(\\d{5,6})","$1 $2",["1"]],["(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"]],["(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"]],["(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"]],["(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"]],["([58]00)(\\d{6})","$1 $2",["[58]00"]]],"0",null,null,null,null,null,["1481[25-9]\\d{5}","7(?:781\\d|839\\d|911[17])\\d{5}","80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}","(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}","70\\d{8}",null,"(?:3[0347]|55)\\d{8}","76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","56\\d{8}","8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})"]],"GH":["233","[235]\\d{8}|8\\d{7}",[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{5})","$1 $2",["8"]]],"0","0$1"],"GI":["350","[256]\\d{7}",[["(\\d{3})(\\d{5})","$1 $2",["2"]]]],"GL":["299","[1-689]\\d{5}",[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]]],"GM":["220","[2-9]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"GN":["224","[367]\\d{7,8}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]]],"GP":["590","[56]\\d{8}",[["([56]90)(\\d{2})(\\d{4})","$1 $2-$3"]],"0","0$1",null,null,null,null,["590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}","690(?:0[05-9]|[1-9]\\d)\\d{4}"]],"GQ":["240","[23589]\\d{8}",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],["(\\d{3})(\\d{6})","$1 $2",["[89]"]]]],"GR":["30","[26-9]\\d{9}",[["([27]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[2-9]1|[689]"]],["(2\\d{3})(\\d{6})","$1 $2",["2[2-9][02-9]"]]]],"GT":["502","[2-7]\\d{7}|1[89]\\d{9}",[["(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],["(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]]],"GU":["1","[5689]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"671"],"GW":["245","(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["44|9[567]"]],["(\\d{3})(\\d{4})","$1 $2",["40"]]]],"GY":["592","[2-46-9]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"HK":["852","[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}",[["(\\d{4})(\\d{4})","$1 $2",["[235-7]|[89](?:0[1-9]|[1-9])"]],["(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"]],["(900)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["900"]],["(900)(\\d{2,5})","$1 $2",["900"]]]],"HN":["504","[237-9]\\d{7}",[["(\\d{4})(\\d{4})","$1-$2"]]],"HR":["385","[1-7]\\d{5,8}|[89]\\d{6,8}",[["(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"]],["([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"]],["(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"]],["(6[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"]],["([67]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"]],["(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["8"]],["(80[01])(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],"0","0$1"],"HT":["509","[2-489]\\d{7}",[["(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3"]]],"HU":["36","[1-9]\\d{7,8}",[["(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"]]],"06","($1)"],"ID":["62","(?:[1-79]\\d{6,10}|8\\d{7,11})",[["(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],["(\\d{3})(\\d{5,8})","$1 $2",["[4579]|2[035-9]|[36][02-9]"],"(0$1)"],["(8\\d{2})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"]],["(8\\d{2})(\\d{4})(\\d{4,5})","$1-$2-$3",["8[1-35-9]"]],["(1)(500)(\\d{3})","$1 $2 $3",["15"],"$1"],["(177)(\\d{6,8})","$1 $2",["17"]],["(800)(\\d{5,7})","$1 $2",["800"]],["(804)(\\d{3})(\\d{4})","$1 $2 $3",["804"]],["(80\\d)(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80[79]"]]],"0","0$1"],"IE":["353","[124-9]\\d{6,9}",[["(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],["(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"]],["(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"]],["(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"]],["(818)(\\d{3})(\\d{3})","$1 $2 $3",["81"]],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],["(8\\d)(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8[35-9]5"],"0$1"],["(700)(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:8[059]|5)","1(?:8[059]0|5)"],"$1"]],"0","(0$1)"],"IL":["972","1\\d{6,11}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}|7\\d{6,9}",[["([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],["([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],["(153)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["153"]],["(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],["(1255)(\\d{3})","$1-$2",["125"]],["(1200)(\\d{3})(\\d{3})","$1-$2-$3",["120"]],["(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121"]],["(1599)(\\d{6})","$1-$2",["1599"]],["(151)(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["151"]],["(\\d{4})","*$1",["[2-689]"]]],"0","$1"],"IM":["44","[135789]\\d{6,9}",[["(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"]],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"]],["(1\\d{3})(\\d{5,6})","$1 $2",["1"]],["(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"]],["(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"]],["(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"]],["(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"]],["([58]00)(\\d{6})","$1 $2",["[58]00"]]],"0",null,null,null,null,null,["1624[5-8]\\d{5}","7(?:4576|[59]24\\d|624[2-4])\\d{5}","808162\\d{4}","(?:872299|90[0167]624)\\d{4}","70\\d{8}",null,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}","7624[01689]\\d{5}","56\\d{8}","8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}"]],"IN":["91","008\\d{9}|1\\d{7,12}|[2-9]\\d{9,10}",[["(\\d{8})","$1",["561","5616","56161"],"$1"],["(\\d{5})(\\d{5})","$1 $2",["600|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9","600|7(?:[078]|19[0-5]|2(?:[02356-9]|[14][017-9]|9[389])|3(?:[025-9]|1[017-9]|[34][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02346-9]|1[017-9]|5[017-9])|6(?:[02-9]|1[0-257-9])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:0[07-9]|[14][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9","600|7(?:0|19[0-5]|2(?:[0235679]|[14][017-9]|8(?:[0-569]|[78][089])|9[389])|3(?:[05-8]|1(?:[0189]|7[5-9])|2(?:[5-8]|[0-49][089])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2345][089]|40|7[0189]))|4(?:[056]|1(?:[0135-9]|[23][089]|2[089]|4[089])|2(?:0[089]|[1-7][089]|[89])|3(?:[0-8][089]|9)|4(?:[089]|11|7[02-8])|7(?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389])|9(?:[0-7][089]|[89]))|5(?:[0346-9]|1[017-9]|2(?:[03-9]|[12][089])|5[017-9])|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]\\d|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[05-9]))|1(?:[02-57-9]|1(?:[0-35-9]|4[0-46-9])|6(?:[089]|7[02-8]))|2(?:0(?:[089]|7[02])|[14](?:[089]|7[02-8])|[235-9])|3(?:[0357-9]|1(?:[089]|7[02-6])|2(?:[09]|77|8[0-689])|4(?:0[1-7]|[1-9])|6(?:[089]|7[02-7]))|[45]|6(?:[02457-9]|1(?:[089]|7[02-8])|3(?:[089]|7[02-8])|6(?:[08]|7[02-8]|9\\d))|7(?:0[07-9]|[1-69]|7(?:[089]|7[02-8])|8(?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-68]))|9(?:[02-9]|1(?:[0289]|7[2-6])))|9"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-9]|80[2-46]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|7[1257]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"]],["(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"]],["(\\d{2})(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3 $4",["008"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],"$1"],["(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1"],["(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],"$1"],["(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["180","1800"],"$1"],["(\\d{4})(\\d{3,4})(\\d{4})","$1 $2 $3",["186","1860"],"$1"],["(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18[06]"],"$1"]],"0","0$1",null,null,true],"IO":["246","3\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"IQ":["964","[1-7]\\d{7,9}",[["(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"]],["(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"]]],"0","0$1"],"IR":["98","[1-8]\\d{5,9}|9(?:[0-4]\\d{8}|9\\d{8})",[["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"]],["(\\d{2})(\\d{4,5})","$1 $2",["[1-8]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"]]],"0","0$1"],"IS":["354","[4-9]\\d{6}|38\\d{7}",[["(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],["(3\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]]],"IT":["39","[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})",[["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|55"]],["(0[26])(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(0[26])(\\d{4,6})","$1 $2",["0[26]"]],["(0\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(0\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["0[13-57-9][2-46-8]"]],["(0\\d{3})(\\d{2,6})","$1 $2",["0[13-57-9][2-46-8]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13]|8(?:00|4[08]|9[59])","[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],["(\\d{4})(\\d{4})","$1 $2",["894","894[5-9]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]]],null,null,null,null,null,null,["0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})","3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})","80(?:0\\d{6}|3\\d{3})","0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})","1(?:78\\d|99)\\d{6}",null,null,null,"55\\d{8}","84(?:[08]\\d{6}|[17]\\d{3})"]],"JE":["44","[135789]\\d{6,9}",[["(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"]],["(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"]],["(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"]],["(1\\d{3})(\\d{5,6})","$1 $2",["1"]],["(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"]],["(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"]],["(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"]],["(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"]],["([58]00)(\\d{6})","$1 $2",["[58]00"]]],"0",null,null,null,null,null,["1534[0-24-8]\\d{5}","7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}","80(?:07(?:35|81)|8901)\\d{4}","(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}","701511\\d{4}",null,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}","76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}","56\\d{8}","8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}"]],"JM":["1","[589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"876"],"JO":["962","[235-9]\\d{7,8}",[["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],["(7)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"]],["(\\d{2})(\\d{7})","$1 $2",["70"]],["(\\d{3})(\\d{5,6})","$1 $2",["8[0158]|9"]]],"0","0$1"],"JP":["81","[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})",[["(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"]],["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"]],["(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"]],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])","1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))","1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))","1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"]],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"]],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:9[14-79]|74|[34]7|[56]9)|82|993"]],["(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"]],["(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"]]],"0","0$1"],"KE":["254","20\\d{6,7}|[4-9]\\d{6,9}",[["(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"]],["(\\d{3})(\\d{6})","$1 $2",["7"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"]]],"0","0$1","005|0"],"KG":["996","[235-8]\\d{8,9}",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[25-7]|31[25]"]],["(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"]],["(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"]]],"0","0$1"],"KH":["855","[1-9]\\d{7,9}",[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],["(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0"]]],"0"],"KI":["686","[2458]\\d{4}|3\\d{4,7}|7\\d{7}",[],null,null,"0"],"KM":["269","[3478]\\d{6}",[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]]],"KN":["1","[589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"869"],"KP":["850","1\\d{9}|[28]\\d{7}",[["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],"0","0$1"],"KR":["82","007\\d{9,11}|[1-7]\\d{3,9}|8\\d{8}",[["(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["1(?:0|1[19]|[69]9|5[458])|[57]0","1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"]],["(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]","1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"]],["(\\d{3})(\\d)(\\d{4})","$1-$2-$3",["131","1312"]],["(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["131","131[13-9]"]],["(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["13[2-9]"]],["(\\d{2})(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3-$4",["30"]],["(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"]],["(\\d)(\\d{3,4})","$1-$2",["21[0-46-9]"]],["(\\d{2})(\\d{3,4})","$1-$2",["[3-6][1-9]1","[3-6][1-9]1(?:[0-46-9])"]],["(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[04678]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))"],"$1"]],"0","0$1","0(8[1-46-8]|85\\d{2})?"],"KW":["965","[12569]\\d{6,7}",[["(\\d{4})(\\d{3,4})","$1 $2",["[16]|2(?:[0-35-9]|4[0-35-9])|9[024-9]|52[25]"]],["(\\d{3})(\\d{5})","$1 $2",["244|5(?:[015]|6[56])"]]]],"KY":["1","[3589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"345"],"KZ":["7","(?:33\\d|7\\d{2}|80[09])\\d{7}",[["([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[34689]"]],["(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"]]],"8",null,null,null,null,null,["33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}","7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}","800\\d{7}","809\\d{7}",null,null,null,null,"751\\d{7}"]],"LA":["856","[2-8]\\d{7,9}",[["(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"]],["([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"]],["(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"]]],"0","0$1"],"LB":["961","[13-9]\\d{6,7}",[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"],"0$1"],["([7-9]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]],"0"],"LC":["1","[5789]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"758"],"LI":["423","6\\d{8}|[23789]\\d{6}",[["(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[23789]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],["(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],"0",null,"0|10(?:01|20|66)"],"LK":["94","[1-9]\\d{8}",[["(\\d{2})(\\d{1})(\\d{6})","$1 $2 $3",["[1-689]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"]]],"0","0$1"],"LR":["231","2\\d{7,8}|[378]\\d{8}|4\\d{6}|5\\d{6,8}",[["(2\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2"]],["([4-5])(\\d{3})(\\d{3})","$1 $2 $3",["[45]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23578]"]]],"0","0$1"],"LS":["266","[2568]\\d{7}",[["(\\d{4})(\\d{4})","$1 $2"]]],"LT":["370","[3-9]\\d{7}",[["([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"]],["([3-6]\\d{2})(\\d{5})","$1 $2",["3[148]|4(?:[24]|6[09])|528|6"]],["([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1"],["(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"]]],"8","(8-$1)","[08]",null,true],"LU":["352","[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})",[["(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"]],["(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"]],["(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["70|80[01]|90[015]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],null,null,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)"],"LV":["371","[2689]\\d{7}",[["([2689]\\d)(\\d{3})(\\d{3})","$1 $2 $3"]]],"LY":["218","[25679]\\d{8}",[["([25679]\\d)(\\d{7})","$1-$2"]],"0","0$1"],"MA":["212","[5-9]\\d{8}",[["([5-7]\\d{2})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"]],["([58]\\d{3})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|92)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|924)|892"]],["(5\\d{4})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"]],["([5]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:4[067]|5[03])"]],["(8[09])(\\d{7})","$1-$2",["8(?:0|9[013-9])"]]],"0","0$1",null,null,null,null,["5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])\\d|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])\\d|4[067]\\d{2}|5[03]\\d{2})\\d{4}","(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[07][07]|6[12]))\\d{6}","80\\d{7}","89\\d{7}",null,null,null,null,"5924[01]\\d{4}"]],"MC":["377","[34689]\\d{7,8}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"],"$1"],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"]],["(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"]],["(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"],"$1"]],"0","0$1"],"MD":["373","[235-9]\\d{7}",[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"]],["([25-7]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["2[13-9]|[5-7]"]],["([89]\\d{2})(\\d{5})","$1 $2",["[89]"]]],"0","0$1"],"ME":["382","[2-9]\\d{7,8}",[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]|6[036-9]"]]],"0","0$1"],"MF":["590","[56]\\d{8}",[["([56]90)(\\d{2})(\\d{4})","$1 $2-$3"]],"0",null,null,null,null,null,["590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}","690(?:0[05-9]|[1-9]\\d)\\d{4}"]],"MG":["261","[23]\\d{8}",[["([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4"]],"0","0$1"],"MH":["692","[2-6]\\d{6}",[["(\\d{3})(\\d{4})","$1-$2"]],"1"],"MK":["389","[2-578]\\d{7}",[["(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"]],["([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[347]"]],["([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"]]],"0","0$1"],"ML":["223","[246-9]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[246-9]"]]]],"MM":["95","[178]\\d{5,7}|[24-6]\\d{5,8}|9(?:[279]\\d{0,2}|5|[34]\\d{1,2}|6(?:\\d{1,2})?|8(?:\\d{2})?)\\d{6}",[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"]],["(2)(\\d{4})(\\d{4})","$1 $2 $3",["251"]],["(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"]],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["432|67|81"]],["(\\d{2})(\\d{2})(\\d{3,4})","$1 $2 $3",["[4-8]"]],["(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"]],["(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"]],["(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"]],["(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"]]],"0","0$1"],"MN":["976","[12]\\d{7,9}|[57-9]\\d{7}",[["([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"]],["([12]2\\d)(\\d{5,6})","$1 $2",["[12]2[1-3]"]],["([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)2"]],["(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],["([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"]]],"0","0$1"],"MO":["853","[268]\\d{7}",[["([268]\\d{3})(\\d{4})","$1 $2"]]],"MP":["1","[5689]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"670"],"MQ":["596","[56]\\d{8}",[["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],"0","0$1"],"MR":["222","[2-48]\\d{7}",[["([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"MS":["1","[5689]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"664"],"MT":["356","[2357-9]\\d{7}",[["(\\d{4})(\\d{4})","$1 $2"]]],"MU":["230","[2-9]\\d{6,7}",[["([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],["(5\\d{3})(\\d{4})","$1 $2",["5"]]]],"MV":["960","[346-8]\\d{6,9}|9(?:00\\d{7}|\\d{6})",[["(\\d{3})(\\d{4})","$1-$2",["[3467]|9(?:[1-9]|0[1-9])"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]00"]]]],"MW":["265","(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}",[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1"]],["(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1789]"]]],"0","0$1"],"MX":["52","[1-9]\\d{9,10}",[["([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"]],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"]],["(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",null,"$1 $2 $3 $4"],["(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",null,"$1 $2 $3 $4"]],"01","01 $1","0[12]|04[45](\\d{10})","1$1",true],"MY":["60","[13-9]\\d{7,9}",[["([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],["(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],["([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",["1[02-46-9][1-9]|8"],"0$1"],["(1)([36-8]00)(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]0"]],["(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],["(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"]],"0"],"MZ":["258","[28]\\d{7,8}",[["([28]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],["(80\\d)(\\d{3})(\\d{3})","$1 $2 $3",["80"]]]],"NA":["264","[68]\\d{7,8}",[["(8\\d)(\\d{3})(\\d{4})","$1 $2 $3",["8[1235]"]],["(6\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["6"]],["(88)(\\d{3})(\\d{3})","$1 $2 $3",["88"]],["(870)(\\d{3})(\\d{3})","$1 $2 $3",["870"]]],"0","0$1"],"NC":["687","[2-57-9]\\d{5}",[["(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-46-9]|5[0-4]"]]]],"NE":["227","[0289]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[289]|09"]],["(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]]],"NF":["672","[13]\\d{5}",[["(\\d{2})(\\d{4})","$1 $2",["1"]],["(\\d)(\\d{5})","$1 $2",["3"]]]],"NG":["234","[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}",[["(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"]],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[235-9]"]],["([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"]],["([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]00"]],["(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"]]],"0","0$1"],"NI":["505","[12578]\\d{7}",[["(\\d{4})(\\d{4})","$1 $2"]]],"NL":["31","1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}",[["([1-578]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"]],["([1-5]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"]],["(6)(\\d{8})","$1 $2",["6[0-57-9]"]],["(66)(\\d{7})","$1 $2",["66"]],["(14)(\\d{3,4})","$1 $2",["14"],"$1"],["([89]0\\d)(\\d{4,7})","$1 $2",["80|9"]]],"0","0$1"],"NO":["47","0\\d{4}|[2-9]\\d{7}",[["([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],["([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],null,null,null,null,null,null,["(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}","(?:4[015-8]|5[89]|87|9\\d)\\d{6}","80[01]\\d{5}","82[09]\\d{5}","880\\d{5}","81[23]\\d{5}","0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",null,"85[0-5]\\d{5}","810(?:0[0-6]|[2-8]\\d)\\d{3}"]],"NP":["977","[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})",[["(1)(\\d{7})","$1-$2",["1[2-6]"]],["(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"]],["(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],"0","0$1"],"NR":["674","[458]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"NU":["683","[1-5]\\d{3}"],"NZ":["64","6[235-9]\\d{6}|[2-57-9]\\d{7,9}",[["(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["240|[346]|7[2-57-9]|9[1-9]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["21"]],["(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"]],["(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"]],["(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["90"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|5|[89]0"]]],"0","0$1"],"OM":["968","(?:5|[279]\\d)\\d{6}|800\\d{5,6}",[["(2\\d)(\\d{6})","$1 $2",["2"]],["([79]\\d{3})(\\d{4})","$1 $2",["[79]"]],["([58]00)(\\d{4,6})","$1 $2",["[58]"]]]],"PA":["507","[1-9]\\d{6,7}",[["(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],["(\\d{4})(\\d{4})","$1-$2",["6"]]]],"PE":["51","[14-9]\\d{7,8}",[["(1)(\\d{7})","$1 $2",["1"]],["([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"]],["(\\d{3})(\\d{5})","$1 $2",["80"]],["(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],"0","(0$1)"],"PF":["689","4\\d{5,7}|8\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]]],"PG":["675","[1-9]\\d{6,7}",[["(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],["(\\d{4})(\\d{4})","$1 $2",["20|7"]]]],"PH":["63","2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}",[["(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],["(2)(\\d{5})","$1 $2",["2"],"(0$1)"],["(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],["(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],["([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],"0$1"],["(1800)(\\d{3})(\\d{4})","$1 $2 $3",["1"]],["(1800)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],"0"],"PK":["92","1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))",[["(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"]],["(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"]],["(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"]],["(\\d{3})(\\d{6,7})","$1 $2",["2[349]|45|5(?:4|8[12])|60|72|8[2-5]|9[2-9]","(?:2[349]|45|5(?:4|8[12])|60|72|8[2-5]|9[2-9])\\d[2-9]"]],["(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],["(1\\d{3})(\\d{5,6})","$1 $2",["1"],"$1"],["(586\\d{2})(\\d{5})","$1 $2",["586"]],["([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"]],"0","(0$1)"],"PL":["48","[12]\\d{6,8}|[3-57-9]\\d{8}|6\\d{5,8}",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]],["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],["(\\d{2})(\\d{1})(\\d{4})","$1 $2 $3",["[12]2"]],["(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],["(\\d{3})(\\d{3})","$1 $2",["64"]]]],"PM":["508","[45]\\d{5}",[["([45]\\d)(\\d{2})(\\d{2})","$1 $2 $3"]],"0","0$1"],"PR":["1","[5789]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"787|939"],"PS":["970","1\\d{9}|[24589]\\d{7,8}",[["([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]"]],["(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["5"]],["(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"$1"]],"0","0$1"],"PT":["351","[2-46-9]\\d{8}",[["(2\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],["([2-46-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[3-9]|[346-9]"]]]],"PW":["680","[2-8]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"PY":["595","5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}",[["(\\d{2})(\\d{5})","$1 $2",["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"],"(0$1)"],["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"],"(0$1)"],["(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],["(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8700"]],["(\\d{3})(\\d{4,5})","$1 $2",["[2-8][1-9]"],"(0$1)"],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8][1-9]"],"0$1"]],"0"],"QA":["974","[2-8]\\d{6,7}",[["([28]\\d{2})(\\d{4})","$1 $2",["[28]"]],["([3-7]\\d{3})(\\d{4})","$1 $2",["[3-7]"]]]],"RE":["262","[268]\\d{8}",[["([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],"0","0$1",null,null,null,"262|69|8"],"RO":["40","[23]\\d{5,8}|[7-9]\\d{8}",[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"]],["(\\d{2})(\\d{4})","$1 $2",["[23]1"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23][3-7]|[7-9]"]],["(2\\d{2})(\\d{3})","$1 $2",["2[3-6]"]]],"0","0$1"],"RS":["381","[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})",[["([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"]],["([1-3]\\d)(\\d{5,10})","$1 $2",["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"]],["(6\\d)(\\d{6,8})","$1 $2",["6"]],["([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"]],["(7[26])(\\d{4,9})","$1 $2",["7[26]"]],["(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"]]],"0","0$1"],"RU":["7","[3489]\\d{9}",[["([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[34689]"]],["(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"]]],"8","8 ($1)",null,null,true,null,["(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}","9\\d{9}","80[04]\\d{7}","80[39]\\d{7}"]],"RW":["250","[027-9]\\d{7,8}",[["(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"$1"],["([7-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],["(0\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],"0"],"SA":["966","1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}",[["([1-467])(\\d{3})(\\d{4})","$1 $2 $3",["[1-467]"]],["(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"]],["(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"]],["(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],["(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"$1"],["(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["81"]]],"0","0$1"],"SB":["677","[1-9]\\d{4,6}",[["(\\d{2})(\\d{5})","$1 $2",["[7-9]"]]]],"SC":["248","[24689]\\d{5,6}",[["(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]]],"SD":["249","[19]\\d{8}",[["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3"]],"0","0$1"],"SE":["46","[1-35-9]\\d{5,11}|4\\d{6,8}",[["(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],null,null,"$1 $2 $3 $4"],["([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],null,null,"$1 $2 $3 $4"],["([1-469]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["1[136]|2[136]|3[356]|4[0246]|6[03]|90"],null,null,"$1 $2 $3"],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],null,null,"$1 $2 $3 $4"],["(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],null,null,"$1 $2 $3"],["(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],null,null,"$1 $2 $3 $4"],["(77)(\\d{2})(\\d{2})","$1-$2$3",["7"],null,null,"$1 $2 $3"],["(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],null,null,"$1 $2 $3"],["(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],null,null,"$1 $2 $3 $4"],["(9[034]\\d)(\\d{4})","$1-$2",["9[034]"],null,null,"$1 $2"],["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["25[245]|67[3-6]"],null,null,"$1 $2 $3 $4 $5"]],"0","0$1"],"SG":["65","[36]\\d{7}|[17-9]\\d{7,10}",[["([3689]\\d{3})(\\d{4})","$1 $2",["[369]|8[1-9]"]],["(1[89]00)(\\d{3})(\\d{4})","$1 $2 $3",["1[89]"]],["(7000)(\\d{4})(\\d{3})","$1 $2 $3",["70"]],["(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"]]]],"SH":["290","[256]\\d{4}",[],null,null,null,null,null,null,["2(?:[0-57-9]\\d|6[4-9])\\d{2}","[56]\\d{4}",null,null,null,null,null,null,"262\\d{2}"]],"SI":["386","[1-7]\\d{6,7}|[89]\\d{4,7}",[["(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|3[24-8]|4[24-8]|5[2-8]|7[3-8]"],"(0$1)"],["([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"]],["([89][09])(\\d{3,6})","$1 $2",["[89][09]"]],["([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"]]],"0","0$1"],"SJ":["47","0\\d{4}|[45789]\\d{7}",[["([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],["([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],null,null,null,null,null,null,["79\\d{6}","(?:4[015-8]|5[89]|9\\d)\\d{6}","80[01]\\d{5}","82[09]\\d{5}","880\\d{5}","81[23]\\d{5}","0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",null,"85[0-5]\\d{5}","810(?:0[0-6]|[2-8]\\d)\\d{3}"]],"SK":["421","(?:[2-68]\\d{5,8}|9\\d{6,8})",[["(2)(1[67])(\\d{3,4})","$1 $2 $3",["21[67]"]],["([3-5]\\d)(1[67])(\\d{2,3})","$1 $2 $3",["[3-5]"]],["(2)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"]],["([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"]],["([689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"]],["(9090)(\\d{3})","$1 $2",["9090"]]],"0","0$1"],"SL":["232","[2-9]\\d{7}",[["(\\d{2})(\\d{6})","$1 $2"]],"0","(0$1)"],"SM":["378","[05-7]\\d{7,9}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],["(0549)(\\d{6})","$1 $2",["0"],null,null,"($1) $2"],["(\\d{6})","0549 $1",["[89]"],null,null,"(0549) $1"]],null,null,"(?:0549)?([89]\\d{5})","0549$1"],"SN":["221","[3789]\\d{8}",[["(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],["(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]]],"SO":["252","[1-9]\\d{5,8}",[["(\\d{6})","$1",["[134]"]],["(\\d)(\\d{6})","$1 $2",["2[0-79]|[13-5]"]],["(\\d)(\\d{7})","$1 $2",["24|[67]"]],["(\\d{2})(\\d{4})","$1 $2",["8[125]"]],["(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3[59]|4[89]|6[24-6]|79|8[08]|90"]]],"0"],"SR":["597","[2-8]\\d{5,6}",[["(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],["(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],["(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]]],"SS":["211","[19]\\d{8}",[["(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",null,"0$1"]],"0"],"ST":["239","[29]\\d{6}",[["(\\d{3})(\\d{4})","$1 $2"]]],"SV":["503","[267]\\d{7}|[89]\\d{6}(?:\\d{4})?",[["(\\d{4})(\\d{4})","$1 $2",["[267]"]],["(\\d{3})(\\d{4})","$1 $2",["[89]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]]],"SX":["1","[5789]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"721"],"SY":["963","[1-59]\\d{7,8}",[["(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"]],["(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],"0","0$1",null,null,true],"SZ":["268","[027]\\d{7}",[["(\\d{4})(\\d{4})","$1 $2",["[027]"]]]],"TA":["290","8\\d{3}",[],null,null,null,null,null,null,["8\\d{3}"]],"TC":["1","[5689]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"649"],"TD":["235","[2679]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]]],"TG":["228","[29]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[29]"]]]],"TH":["66","[2-9]\\d{7,8}|1\\d{3}(?:\\d{5,6})?",[["(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"]],["([13-9]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"]],["(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"$1"]],"0","0$1"],"TJ":["992","[3-57-9]\\d{8}",[["([349]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"]],["([457-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[148]|[578]|9(?:1[59]|[0235-9])"]],["(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"]],["(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"]]],"8","$1",null,null,true],"TK":["690","[2-47]\\d{3,6}"],"TL":["670","[2-489]\\d{6}|7\\d{6,7}",[["(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],["(\\d{4})(\\d{4})","$1 $2",["7[3-8]"]]]],"TM":["993","[1-6]\\d{7}",[["(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"]],["(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"],["(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["13|[2-5]"]]],"8","(8 $1)"],"TN":["216","[2-57-9]\\d{7}",[["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3"]]],"TO":["676","[02-8]\\d{4,6}",[["(\\d{2})(\\d{3})","$1-$2",["[1-6]|7[0-4]|8[05]"]],["(\\d{3})(\\d{4})","$1 $2",["7[5-9]|8[47-9]"]],["(\\d{4})(\\d{3})","$1 $2",["0"]]]],"TR":["90","[2-589]\\d{9}|444\\d{4}",[["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)","true"],["(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[02-69]"],"0$1","true"],["(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["51|[89]"],"0$1","true"],["(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"]]],"0"],"TT":["1","[589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"868"],"TV":["688","[279]\\d{4,6}"],"TW":["886","2\\d{6,8}|[3-689]\\d{7,8}|7\\d{7,9}",[["(20)(\\d)(\\d{4})","$1 $2 $3",["202"]],["(20)(\\d{3})(\\d{4})","$1 $2 $3",["20[013-9]"]],["([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["2[23-8]|[3-6]|[78][1-9]"]],["([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["80|9"]],["(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"]]],"0","0$1"],"TZ":["255","\\d{9}",[["([24]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[24]"]],["([67]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"]],["([89]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"]]],"0","0$1"],"UA":["380","[3-9]\\d{8}",[["([3-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|7|9[1-9]","[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"]],["([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"]],["([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])","3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"]]],"0","0$1"],"UG":["256","\\d{9}",[["(\\d{3})(\\d{6})","$1 $2",["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"]],["(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"]],["(2024)(\\d{5})","$1 $2",["2024"]]],"0","0$1"],"US":["1","[2-9]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,true,null,["(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}",null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}","900[2-9]\\d{6}","5(?:00|22|33|44|66|77|88)[2-9]\\d{6}"]],"UY":["598","[2489]\\d{6,7}",[["(\\d{4})(\\d{4})","$1 $2",["[24]"]],["(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],["(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],"0"],"UZ":["998","[679]\\d{8}",[["([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],"8","8 $1"],"VA":["39","(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))",[["(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|55"]],["(0[26])(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],["(0[26])(\\d{4,6})","$1 $2",["0[26]"]],["(0\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],["(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],["(0\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["0[13-57-9][2-46-8]"]],["(0\\d{3})(\\d{2,6})","$1 $2",["0[13-57-9][2-46-8]"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13]|8(?:00|4[08]|9[59])","[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],["(\\d{4})(\\d{4})","$1 $2",["894","894[5-9]"]],["(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]]],null,null,null,null,null,null,["06698\\d{5}","3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})","80(?:0\\d{6}|3\\d{3})","0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})","1(?:78\\d|99)\\d{6}",null,null,null,"55\\d{8}","84(?:[08]\\d{6}|[17]\\d{3})"]],"VC":["1","[5789]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"784"],"VE":["58","[24589]\\d{9}",[["(\\d{3})(\\d{7})","$1-$2"]],"0","0$1"],"VG":["1","[2589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"284"],"VI":["1","[3589]\\d{9}",[["(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",null,null,null,"$1-$2-$3"]],"1",null,null,null,null,"340"],"VN":["84","[167]\\d{6,9}|[2-59]\\d{7,9}|8\\d{6,8}",[["([17]99)(\\d{4})","$1 $2",["[17]99"]],["([48])(\\d{4})(\\d{4})","$1 $2 $3",["4|8(?:[2-5]|6[236]|7[13])"]],["(\\d{2})(\\d{4})(\\d{3,4})","$1 $2 $3",["2[48]|5[5-9]|6[0-46-8]|7[0235]"]],["(80)(\\d{5})","$1 $2",["80"]],["(69\\d)(\\d{4,5})","$1 $2",["69"]],["(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2[0-35-79]|50|65"]],["([89]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8(?:8|9[89])|9"]],["(1[2689]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[26]|8[68]|99)"]],["(86[89])(\\d{3})(\\d{3})","$1 $2 $3",["86[89]"]],["(1[89]00)(\\d{4,6})","$1 $2",["1[89]0"],"$1"]],"0","0$1",null,null,true],"VU":["678","[2-57-9]\\d{4,6}",[["(\\d{3})(\\d{4})","$1 $2",["[579]"]]]],"WF":["681","[4-8]\\d{5}",[["(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]]],"WS":["685","[2-8]\\d{4,6}",[["(8\\d{2})(\\d{3,4})","$1 $2",["8"]],["(7\\d)(\\d{5})","$1 $2",["7"]],["(\\d{5})","$1",["[2-6]"]]]],"YE":["967","[1-7]\\d{6,8}",[["([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"]],["(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"]]],"0","0$1"],"YT":["262","[268]\\d{8}",[["([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],"0",null,null,null,null,"269|63"],"ZA":["27","[1-79]\\d{8}|8\\d{4,8}",[["(860)(\\d{3})(\\d{3})","$1 $2 $3",["860"]],["(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"]],["(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"]],["(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-79]|8(?:[0-57]|6[1-9])"]]],"0","0$1"],"ZM":["260","[289]\\d{8}",[["([29]\\d)(\\d{7})","$1 $2",["[29]"]],["(800)(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],"0","0$1"],"ZW":["263","2(?:[0-2457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{5,8}",[["([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"]],["(7\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["7"]],["(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"]],["([2356]\\d{2})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"]],["(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"]],["([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[02569]|3[0-69]|5[05689]|6\\d"]],["([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"]],["([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"]],["(8\\d{3})(\\d{6})","$1 $2",["86"]],["(80\\d)(\\d{4})","$1 $2",["80"]]],"0","0$1"],"001":["979","\\d{9}",[["(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]]]}}
},{}],103:[function(require,module,exports){
module.exports = function(el) {
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable();

  var candidateSelectors = [
    'input',
    'select',
    'a[href]',
    'textarea',
    'button',
    '[tabindex]',
  ];

  var candidates = el.querySelectorAll(candidateSelectors);

  var candidate, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndex = parseInt(candidate.getAttribute('tabindex'), 10) || candidate.tabIndex;

    if (
      candidateIndex < 0
      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
      || candidate.disabled
      || isUnavailable(candidate)
    ) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        tabIndex: candidateIndex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(function(a, b) {
      return a.tabIndex - b.tabIndex;
    })
    .map(function(a) {
      return a.node
    });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
}

function createIsUnavailable() {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === document.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || window.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === document.documentElement) return false;

    var computedStyle = window.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  }
}

},{}]},{},[1]);
