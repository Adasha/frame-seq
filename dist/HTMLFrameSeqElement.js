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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var _DEFAULT_FPS = new WeakMap();

var _currentFrame = new WeakMap();

var _totalFrames = new WeakMap();

var _fps = new WeakMap();

var _frameTimer = new WeakMap();

var _duration = new WeakMap();

var _width = new WeakMap();

var _height = new WeakMap();

var _playing = new WeakMap();

var _paused = new WeakMap();

var _stopped = new WeakMap();

var _reverse = new WeakMap();

var _loop = new WeakMap();

var _pingpong = new WeakMap();

var _autoplay = new WeakMap();

var _shadow = new WeakMap();

var _startTimer = new WeakSet();

var _clearTimer = new WeakSet();

var _update = new WeakSet();

var _clearFrames = new WeakSet();

var _clearStates = new WeakSet();

var _cleanUp = new WeakSet();

/**
 * Class representing a HTMLFrameSeqElement.
 * @version 0.2.2a
 * @author Adam Shailer <adasha76@outlook.com>
 * @class
 * @extends HTMLElement
 */
var HTMLFrameSeqElement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(HTMLFrameSeqElement, _HTMLElement);

  var _super = _createSuper(HTMLFrameSeqElement);

  _createClass(HTMLFrameSeqElement, null, [{
    key: "observedAttributes",
    // #frames = [];
    get: function get() {
      return ['autoplay', 'firstframe', 'fps', 'height', 'loop', 'pingpong', 'preload', 'reverse', 'src', 'width'];
    }
    /**
     * Create a HTMLFrameSeqElement instance.
     * @constructor
     * @fires HTMLFrameSeqElement#stateChanged
     * @fires HTMLFrameSeqElement#enterFrame
     */

  }]);

  function HTMLFrameSeqElement() {
    var _this;

    _classCallCheck(this, HTMLFrameSeqElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _cleanUp.add(_assertThisInitialized(_this));

    _clearStates.add(_assertThisInitialized(_this));

    _clearFrames.add(_assertThisInitialized(_this));

    _update.add(_assertThisInitialized(_this));

    _clearTimer.add(_assertThisInitialized(_this));

    _startTimer.add(_assertThisInitialized(_this));

    _DEFAULT_FPS.set(_assertThisInitialized(_this), {
      writable: true,
      value: 15
    });

    _currentFrame.set(_assertThisInitialized(_this), {
      writable: true,
      value: 1
    });

    _totalFrames.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _fps.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _frameTimer.set(_assertThisInitialized(_this), {
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

    _playing.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _paused.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _stopped.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _reverse.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _loop.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _pingpong.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _autoplay.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _shadow.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(_assertThisInitialized(_this), _shadow, _this.attachShadow({
      mode: 'open'
    }));

    while (_this.children.length > 0) {
      // this.#frames.push(this.removeChild(this.children[0]));
      _classPrivateFieldGet(_assertThisInitialized(_this), _shadow).appendChild(_this.removeChild(_this.children[0]));
    }

    _classPrivateMethodGet(_assertThisInitialized(_this), _clearFrames, _clearFrames2).call(_assertThisInitialized(_this));

    _this.redraw = _this.redraw.bind(_assertThisInitialized(_this));
    return _this;
  } // PROPERTIES


  _createClass(HTMLFrameSeqElement, [{
    key: "play",
    //METHODS

    /**
     * Begin playback from the first frame, or the last frame if 'reverse' is true.
     */
    value: function play() {
      this.currentFrame = this.reverse ? this.totalFrames : 1;

      _classPrivateMethodGet(this, _startTimer, _startTimer2).call(this);

      _classPrivateMethodGet(this, _clearStates, _clearStates2).call(this);

      _classPrivateFieldSet(this, _playing, true);

      this.dispatchEvent(new Event('stateChanged'));
    }
    /**
     * Pause playback at the current frame.
     */

  }, {
    key: "pause",
    value: function pause() {
      _classPrivateMethodGet(this, _clearTimer, _clearTimer2).call(this);

      _classPrivateMethodGet(this, _clearStates, _clearStates2).call(this);

      _classPrivateFieldSet(this, _paused, true);

      this.dispatchEvent(new Event('stateChanged'));
    }
    /**
     * Resume playback at the current frame.
     */

  }, {
    key: "resume",
    value: function resume() {
      _classPrivateMethodGet(this, _startTimer, _startTimer2).call(this);

      _classPrivateMethodGet(this, _clearStates, _clearStates2).call(this);

      _classPrivateFieldSet(this, _playing, true);

      this.dispatchEvent(new Event('stateChanged'));
    }
    /**
     * Stop playback and return to the first frame, or the last frame if 'reverse' is true.
     */

  }, {
    key: "stop",
    value: function stop() {
      _classPrivateMethodGet(this, _clearTimer, _clearTimer2).call(this);

      this.currentFrame = this.reverse ? this.totalFrames : 1;

      _classPrivateMethodGet(this, _clearStates, _clearStates2).call(this);

      _classPrivateFieldSet(this, _stopped, true);

      this.dispatchEvent(new Event('stateChanged'));
    }
    /**
     * Go to a specific frame and resume playback from there.
     * @param {number} frame 
     */

  }, {
    key: "gotoAndPlay",
    value: function gotoAndPlay(frame) {
      this.currentFrame = frame;
      this.resume();
    }
    /**
     * Go to a specific frame and pause playback.
     * @param {number} frame 
     */

  }, {
    key: "gotoAndPause",
    value: function gotoAndPause(frame) {
      this.currentFrame = frame;
      this.pause();
    }
    /**
     * Advance by one frame.
     */

  }, {
    key: "nextFrame",
    value: function nextFrame() {
      this.currentFrame = Math.min(this.currentFrame + 1, this.totalFrames);
    }
    /**
     * Go back one frame.
     */

  }, {
    key: "prevFrame",
    value: function prevFrame() {
      this.currentFrame = Math.max(this.currentFrame - 1, 1);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.autoplay) {
        this.play();
      } else {
        this.stop();
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'autoplay':
          break;

        case 'reverse':
          break;

        case 'loop':
          break;

        case 'pingpong':
          break;

        case 'fps':
          if (isNaN(this.fps)) {
            throw new TypeError('FPS must be a number.');
          }

          if (_classPrivateFieldGet(this, _frameTimer)) {
            this.resume();
          }

          break;

        case 'width':
        case 'height':
          break;

        default:
          throw new Error("".concat(name, " is not a recognised attribute."));
      }

      this.dispatchEvent(new Event('stateChanged'));
    }
  }, {
    key: "redraw",
    value: function redraw(timestamp) {
      _classPrivateMethodGet(this, _clearFrames, _clearFrames2).call(this);

      this.dispatchEvent(new Event('enterFrame')); // this.#shadow.appendChild(this.#frames[this.currentFrame-1]);
      // this.#shadow.children[this.currentFrame-1].style.display = 'block';

      _classPrivateFieldGet(this, _shadow).children[this.currentFrame - 1].style.removeProperty('display');

      _classPrivateMethodGet(this, _cleanUp, _cleanUp2).call(this);
    }
  }, {
    key: "currentFrame",
    get: function get() {
      return _classPrivateFieldGet(this, _currentFrame);
    },
    set: function set(num) {
      if (isNaN(num)) {
        throw new TypeError('Frame number must be a number.');
      }

      if (Math.floor(num) !== num) {
        console.log('WARN: frame number must be an integer. Fraction discarded.');
        num = Math.floor(num);
      }

      if (num < 1 || num > this.totalFrames) {
        console.log('WARN: frame number out of range. Closest value used.');
        num = Math.min(Math.max(1, num), this.totalFrames);
      }

      _classPrivateFieldSet(this, _currentFrame, num);

      window.requestAnimationFrame(this.redraw);
    }
  }, {
    key: "totalFrames",
    get: function get() {
      // return this.#frames.length;
      return _classPrivateFieldGet(this, _shadow).children.length;
    }
  }, {
    key: "fps",
    get: function get() {
      return this.getAttribute('fps');
    },
    set: function set(value) {
      this.setAttribute('fps', value);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.totalFrames / this.fps;
    }
  }, {
    key: "autoplay",
    get: function get() {
      return this.hasAttribute('autoplay');
    },
    set: function set(bool) {
      if (!!bool) {
        this.setAttribute('autoplay', '');
      } else {
        this.removeAttribute('autoplay');
      }
    }
  }, {
    key: "loop",
    get: function get() {
      return this.hasAttribute('loop');
    },
    set: function set(bool) {
      if (!!bool) {
        this.setAttribute('loop', '');
      } else {
        this.removeAttribute('loop');
      }
    }
  }, {
    key: "reverse",
    get: function get() {
      return this.hasAttribute('reverse');
    },
    set: function set(bool) {
      if (!!bool) {
        this.setAttribute('reverse', '');
      } else {
        this.removeAttribute('reverse');
      }
    }
  }, {
    key: "pingpong",
    get: function get() {
      return this.hasAttribute('pingpong');
    },
    set: function set(bool) {
      if (!!bool) {
        this.setAttribute('pingpong', '');
      } else {
        this.removeAttribute('pingpong');
      }
    }
  }, {
    key: "preload",
    get: function get() {
      return this.hasAttribute('preload');
    },
    set: function set(bool) {
      if (!!bool) {
        this.setAttribute('preload', '');
      } else {
        this.removeAttribute('preload');
      }
    }
  }, {
    key: "width",
    get: function get() {
      return this.getAttribute('width');
    },
    set: function set(value) {
      this.setAttribute('width', value);
    }
  }, {
    key: "height",
    get: function get() {
      return this.getAttribute('height');
    },
    set: function set(value) {
      this.setAttribute('height', value);
    }
  }, {
    key: "playing",
    get: function get() {
      return _classPrivateFieldGet(this, _playing);
    }
  }, {
    key: "paused",
    get: function get() {
      return _classPrivateFieldGet(this, _paused);
    }
  }, {
    key: "stopped",
    get: function get() {
      return _classPrivateFieldGet(this, _stopped);
    }
  }]);

  return HTMLFrameSeqElement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

var _startTimer2 = function _startTimer2() {
  var _this2 = this;

  _classPrivateMethodGet(this, _clearTimer, _clearTimer2).call(this);

  var fps = this.fps || _classPrivateFieldGet(this, _DEFAULT_FPS),
      ms = Math.floor(1000 / fps);

  _classPrivateFieldSet(this, _frameTimer, window.setInterval(function () {
    return _classPrivateMethodGet(_this2, _update, _update2).call(_this2);
  }, ms));
};

var _clearTimer2 = function _clearTimer2() {
  if (_classPrivateFieldGet(this, _frameTimer)) {
    window.clearInterval(_classPrivateFieldGet(this, _frameTimer));

    _classPrivateFieldSet(this, _frameTimer, null);
  }
};

var _update2 = function _update2() {
  if (this.reverse) {
    if (this.currentFrame > 1) {
      this.currentFrame--;
    } else if (this.loop) {
      this.currentFrame = this.totalFrames;
    } else {
      this.pause();
    }
  } else {
    if (this.currentFrame < this.totalFrames) {
      this.currentFrame++;
    } else if (this.loop) {
      this.currentFrame = 1;
    } else {
      this.pause();
    }
  }
};

var _clearFrames2 = function _clearFrames2() {
  // while(this.#shadow.firstChild)
  // {
  //     this.#shadow.removeChild(this.#shadow.lastChild);
  // }
  for (var i = 0; i < _classPrivateFieldGet(this, _shadow).children.length; i++) {
    _classPrivateFieldGet(this, _shadow).children[i].style.display = 'none';
  }
};

var _clearStates2 = function _clearStates2() {
  _classPrivateFieldSet(this, _playing, false);

  _classPrivateFieldSet(this, _paused, false);

  _classPrivateFieldSet(this, _stopped, false);
};

var _cleanUp2 = function _cleanUp2() {};

customElements.define('frame-seq', HTMLFrameSeqElement);