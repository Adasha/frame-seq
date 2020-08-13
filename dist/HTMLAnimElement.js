"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _DEFAULT_FPS = new WeakMap();

var _frames = new WeakMap();

var _currentFrame = new WeakMap();

var _totalFrames = new WeakMap();

var _fps = new WeakMap();

var _duration = new WeakMap();

var _width = new WeakMap();

var _height = new WeakMap();

var _autoplay = new WeakMap();

var _loop = new WeakMap();

var _reverse = new WeakMap();

var _pingpong = new WeakMap();

/**
 * Class representing a HTMLAnimElement.
 * @extends HTMLElement
 */
var HTMLAnimElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(HTMLAnimElement, _HTMLElement);

  var _super = _createSuper(HTMLAnimElement);

  _createClass(HTMLAnimElement, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['autoplay', 'fps', 'height', 'loop', 'pingpong', 'reverse', 'src', 'width'];
    }
    /**
     * Create a new HTMLAnimElement.
     */

  }]);

  function HTMLAnimElement() {
    var _this;

    _classCallCheck(this, HTMLAnimElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    /*
            var shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
                <style>
                    frame-anim
                    {
                        width: 300px;
                        height: 300px;
                        position: relative;
                    }
                </style>
            `;
            */

    _DEFAULT_FPS.set(_assertThisInitialized(_this), {
      writable: true,
      value: 30
    });

    _frames.set(_assertThisInitialized(_this), {
      writable: true,
      value: []
    });

    _currentFrame.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _totalFrames.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _fps.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _duration.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _width.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _height.set(_assertThisInitialized(_this), {
      writable: true,
      value: 0
    });

    _autoplay.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _loop.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _reverse.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _pingpong.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _this.redraw = _this.redraw.bind(_assertThisInitialized(_this));
    return _this;
  } // PROPERTIES


  _createClass(HTMLAnimElement, [{
    key: "play",
    //METHODS
    value: function play() {}
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "gotoAndPlay",
    value: function gotoAndPlay(frame) {}
  }, {
    key: "gotoAndStop",
    value: function gotoAndStop(frame) {}
  }, {
    key: "nextFrame",
    value: function nextFrame() {}
  }, {
    key: "prevFrame",
    value: function prevFrame() {}
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      while (this.children.length > 0) {
        _classPrivateFieldGet(this, _frames).push(this.removeChild(this.children[0]));
      }

      var frameTimer = window.setInterval(function () {
        return window.requestAnimationFrame(_this2.redraw);
      }, 100);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (!(name in this)) throw new Error("".concat(name, " is not a recognised attribute."));else this[name] = newValue;
    }
  }, {
    key: "redraw",
    value: function redraw(timestamp) {
      if (this.firstChild) while (this.firstChild) {
        this.removeChild(this.lastChild);
      }
      this.appendChild(_classPrivateFieldGet(this, _frames)[this.currentFrame]);
      this.currentFrame = ++this.currentFrame % this.totalFrames;
    }
  }, {
    key: "currentFrame",
    get: function get() {
      return _classPrivateFieldGet(this, _currentFrame);
    },
    set: function set(num) {
      _classPrivateFieldSet(this, _currentFrame, num);
    }
  }, {
    key: "totalFrames",
    get: function get() {
      return _classPrivateFieldGet(this, _frames).length;
    }
  }, {
    key: "fps",
    get: function get() {
      return this.getAttribute('fps');
    },
    set: function set(value) {
      console.log('hfxhfdx');
      this.setAttribute('fps', value);
      var v = Number(value);
      if (isNaN(v)) throw new Error("".concat(value, " is not a number."));
      if (v <= 0) throw new Error("FPS must be a positive number.");

      _classPrivateFieldSet(this, _fps, v + 1);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.totalFrames / this.FPS;
    }
  }, {
    key: "autoplay",
    get: function get() {
      return _classPrivateFieldGet(this, _autoplay);
    },
    set: function set(bool) {
      _classPrivateFieldSet(this, _autoplay, !!bool);
    }
  }, {
    key: "loop",
    get: function get() {
      return _classPrivateFieldGet(this, _loop);
    },
    set: function set(bool) {
      _classPrivateFieldSet(this, _loop, !!bool);
    }
  }, {
    key: "reverse",
    get: function get() {
      return _classPrivateFieldGet(this, _reverse);
    },
    set: function set(bool) {
      _classPrivateFieldSet(this, _reverse, !!bool);
    }
  }, {
    key: "pingpong",
    get: function get() {
      return _classPrivateFieldGet(this, _pingpong);
    },
    set: function set(bool) {
      _classPrivateFieldSet(this, _pingpong, !!bool);
    }
  }, {
    key: "direction",
    get: function get() {
      return null; // TODO: ;
    }
  }, {
    key: "width",
    get: function get() {
      return _classPrivateFieldGet(this, _width);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _width, value);
    }
  }, {
    key: "height",
    get: function get() {
      return _classPrivateFieldGet(this, _height);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _height, value);
    }
  }]);

  return HTMLAnimElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('frame-anim', HTMLAnimElement);