'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  holder: {
    position: 'relative',
    display: 'inline-block'
  },
  overlayHolder: {
    position: 'relative',
    display: 'block'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 10,
    borderRadius: 5,
    border: '1px solid #fff'
  },
  overlayMobile: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 5000
  },
  overlayMobileBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0%, 0%, 0%, .75)',
    zIndex: 1
  },
  overlayMobileHolder: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  overlayMobileHolderInner: {
    position: 'relative',
    border: '1px solid #fff',
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 3
  },
  arrow: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    width: 0,
    height: 0,
    marginLeft: -10,
    border: 'solid transparent',
    pointerEvents: 'none',
    borderColor: 'rgba(136, 183, 213, 0)',
    borderBottomColor: '#fff',
    borderWidth: 10
  },
  overlayCrossLeft: {
    width: 1,
    backgroundColor: '#fff',
    height: 20,
    position: 'absolute',
    top: 10,
    right: 20,
    transform: 'rotate(45deg)'
  },
  overlayCrossRight: {
    width: 1,
    backgroundColor: '#fff',
    height: 20,
    position: 'absolute',
    top: 10,
    right: 20,
    transform: 'rotate(-45deg)'
  }
};

var POSITION_LEFT = 'left';
var POSITION_RIGHT = 'right';
var POSITION_CENTER = 'center';

var ResponsiveDropdown = function (_Component) {
  _inherits(ResponsiveDropdown, _Component);

  function ResponsiveDropdown(props) {
    _classCallCheck(this, ResponsiveDropdown);

    var _this = _possibleConstructorReturn(this, (ResponsiveDropdown.__proto__ || Object.getPrototypeOf(ResponsiveDropdown)).call(this, props));

    _this.onWindowClick = function () {
      return _this.__onWindowClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onResize = function () {
      return _this.__onResize__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleClickOverlay = function () {
      return _this.__handleClickOverlay__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      position: {},
      size: {}
    };
    return _this;
  }

  _createClass(ResponsiveDropdown, [{
    key: '__handleClickOverlay__REACT_HOT_LOADER__',
    value: function __handleClickOverlay__REACT_HOT_LOADER__() {
      return this.__handleClickOverlay__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onResize__REACT_HOT_LOADER__',
    value: function __onResize__REACT_HOT_LOADER__() {
      return this.__onResize__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onWindowClick__REACT_HOT_LOADER__',
    value: function __onWindowClick__REACT_HOT_LOADER__() {
      return this.__onWindowClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'getPlacement',
    value: function getPlacement() {
      var _state = this.state,
          element = _state.element,
          size = _state.size;
      var width = this.props.width;

      if (element.x < width / 2) {
        return POSITION_LEFT;
      }
      if (element.x + width > size.width) {
        return POSITION_RIGHT;
      }
      return POSITION_CENTER;
    }
  }, {
    key: 'styleForOverlay',
    value: function styleForOverlay() {
      var size = this.state.size;
      var _props = this.props,
          arrowSize = _props.arrowSize,
          backgroundColor = _props.backgroundColor,
          borderColor = _props.borderColor,
          borderRadius = _props.borderRadius,
          borderWidth = _props.borderWidth,
          overlayOffsetTop = _props.overlayOffsetTop,
          overlayOffsetRight = _props.overlayOffsetRight,
          overlayOffsetLeft = _props.overlayOffsetLeft,
          width = _props.width;

      if (this.isMobile()) {
        return Object.assign({}, styles.overlayMobile, { height: size.height });
      }
      var baseProps = Object.assign({}, styles.overlay, {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        top: arrowSize + borderWidth + overlayOffsetTop
      });
      switch (this.getPlacement()) {
        case POSITION_LEFT:
          return Object.assign({}, baseProps, {
            width: width,
            left: 0 + overlayOffsetLeft
          });
        case POSITION_RIGHT:
          return Object.assign({}, baseProps, {
            width: width,
            left: 'auto',
            right: 0 + overlayOffsetRight
          });
        default:
          return Object.assign({}, baseProps, {
            width: width,
            left: '50%',
            marginLeft: '-' + (parseInt(width / 2, 10) + overlayOffsetLeft) + 'px'
          });
      }
    }
  }, {
    key: 'styleForArrow',
    value: function styleForArrow() {
      var element = this.state.element;
      var _props2 = this.props,
          arrowOffsetLeft = _props2.arrowOffsetLeft,
          arrowOffsetRight = _props2.arrowOffsetRight,
          arrowOffsetTop = _props2.arrowOffsetTop,
          arrowSize = _props2.arrowSize,
          borderColor = _props2.borderColor,
          borderWidth = _props2.borderWidth;

      var baseProps = Object.assign({}, styles.arrow, {
        borderBottomColor: borderColor,
        borderWidth: arrowSize + borderWidth + 1,
        marginTop: borderWidth * -1 + arrowOffsetTop,
        marginLeft: (arrowSize + borderWidth + borderWidth + 1) * -1
      });
      switch (this.getPlacement()) {
        case POSITION_LEFT:
          return Object.assign({}, baseProps, {
            left: parseInt(element.width / 2, 10) + arrowOffsetLeft
          });
        case POSITION_RIGHT:
          return Object.assign({}, baseProps, {
            left: 'auto',
            marginRight: baseProps.marginLeft,
            right: parseInt(element.width / 2, 10) + arrowOffsetRight
          });
        default:
          return Object.assign({}, baseProps);
      }
    }
  }, {
    key: 'styleForArrowInner',
    value: function styleForArrowInner() {
      var element = this.state.element;
      var _props3 = this.props,
          arrowOffsetLeft = _props3.arrowOffsetLeft,
          arrowOffsetRight = _props3.arrowOffsetRight,
          arrowOffsetTop = _props3.arrowOffsetTop,
          arrowSize = _props3.arrowSize,
          backgroundColor = _props3.backgroundColor,
          borderWidth = _props3.borderWidth;

      var baseProps = Object.assign({}, styles.arrow, {
        borderBottomColor: backgroundColor,
        marginTop: -1 + arrowOffsetTop,
        borderWidth: arrowSize,
        marginLeft: (arrowSize + borderWidth) * -1
      });
      switch (this.getPlacement()) {
        case POSITION_LEFT:
          return Object.assign({}, baseProps, {
            left: parseInt(element.width / 2, 10) + arrowOffsetLeft
          });
        case POSITION_RIGHT:
          return Object.assign({}, baseProps, {
            left: 'auto',
            marginRight: baseProps.marginLeft,
            right: parseInt(element.width / 2, 10) + arrowOffsetRight
          });
        default:
          return Object.assign({}, baseProps);
      }
    }
  }, {
    key: 'styleForInner',
    value: function styleForInner() {
      var size = this.state.size;
      var _props4 = this.props,
          width = _props4.width,
          backgroundColor = _props4.backgroundColor,
          borderColor = _props4.borderColor,
          borderWidth = _props4.borderWidth;

      return Object.assign({}, styles.overlayMobileHolderInner, {
        width: Math.min(width, size.width),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getPosition();
      global.addEventListener('resize', this.onResize);
      global.addEventListener('click', this.onWindowClick);
      this.visible = this.props.visible;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      global.removeEventListener('resize', this.onResize);
      global.removeEventListener('click', this.onWindowClick);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (this.props.visible !== prevProps.visible || this.props.cacheKey !== prevProps.cacheKey) {
        this.getPosition();
      }
      setTimeout(function () {
        _this2.visible = _this2.props.visible;
      });
    }
  }, {
    key: '__onWindowClick__REACT_HOT_LOADER__',
    value: function __onWindowClick__REACT_HOT_LOADER__(event) {
      if (this.rootElement && this.props.visible && this.visible) {
        var domNode = this.rootElement;
        if (event.target !== domNode && !domNode.contains(event.target) && this.props.hideOnOutsideClick) {
          this.handleClickOverlay();
        }
      }
    }
  }, {
    key: '__onResize__REACT_HOT_LOADER__',
    value: function __onResize__REACT_HOT_LOADER__(event) {
      var _this3 = this;

      (0, _lodash2.default)(function () {
        _this3.getSize();
      }, 500);
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      if (this.rootElement) {
        var domNode = this.rootElement;
        this.setState({
          element: {
            x: domNode.offsetLeft,
            y: domNode.offsetTop,
            width: domNode.offsetWidth,
            height: domNode.offsetHeight
          },
          size: this.getSize(true)
        });
      }
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      var onlyReturn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.rootElement) {
        var _state$size = this.state.size,
            width = _state$size.width,
            height = _state$size.height;
        var _global = global,
            innerWidth = _global.innerWidth,
            innerHeight = _global.innerHeight;

        var newSize = {
          width: innerWidth,
          height: innerHeight
        };
        if (onlyReturn) {
          return newSize;
        }
        if (width !== innerWidth || height !== innerHeight) {
          this.setState({ size: newSize });
        }
      }
    }
  }, {
    key: 'isMobile',
    value: function isMobile() {
      var _props5 = this.props,
          width = _props5.width,
          breakpoint = _props5.breakpoint;
      var size = this.state.size;

      return size.width < breakpoint || width > size.width;
    }
  }, {
    key: '__handleClickOverlay__REACT_HOT_LOADER__',
    value: function __handleClickOverlay__REACT_HOT_LOADER__() {
      this.props.clickOverlay && this.props.clickOverlay();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props6 = this.props,
          children = _props6.children,
          dropdownView = _props6.dropdownView,
          visible = _props6.visible;

      if (!visible) {
        return _react2.default.Children.only(this.props.children);
      } else {
        var element = this.state.element;

        return _react2.default.createElement(
          'div',
          {
            style: styles.holder,
            ref: function ref(element) {
              _this4.rootElement = element;
            }
          },
          children,
          element && _react2.default.createElement(
            'div',
            { style: styles.overlayHolder },
            _react2.default.createElement(
              'div',
              { style: this.styleForOverlay() },
              this.isMobile() && _react2.default.createElement(
                'div',
                { style: styles.overlayMobileHolder },
                _react2.default.createElement(
                  'div',
                  { style: styles.overlayMobileBackground, onClick: this.handleClickOverlay },
                  _react2.default.createElement('div', { style: styles.overlayCrossLeft }),
                  _react2.default.createElement('div', { style: styles.overlayCrossRight })
                ),
                _react2.default.createElement(
                  'div',
                  { style: this.styleForInner() },
                  dropdownView
                )
              ),
              !this.isMobile() && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('div', { style: this.styleForArrow() }),
                _react2.default.createElement('div', { style: this.styleForArrowInner() }),
                dropdownView
              )
            )
          )
        );
      }
    }
  }]);

  return ResponsiveDropdown;
}(_react.Component);

ResponsiveDropdown.defaultProps = {
  width: 200,
  breakpoint: 500,
  cacheKey: 'hello world',
  backgroundColor: '#ffffff',
  borderColor: '#ffffff',
  borderRadius: 4,
  borderWidth: 1,
  arrowSize: 10,
  hideOnOutsideClick: true,
  overlayOffsetTop: 0,
  overlayOffsetLeft: 0,
  overlayOffsetRight: 0,
  arrowOffsetTop: 0,
  arrowOffsetLeft: 0,
  arrowOffsetRight: 0
};

ResponsiveDropdown.propTypes = {
  children: _propTypes2.default.any.isRequired,
  dropdownView: _propTypes2.default.element.isRequired,
  visible: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  breakpoint: _propTypes2.default.number,
  cacheKey: _propTypes2.default.string,
  backgroundColor: _propTypes2.default.string,
  borderColor: _propTypes2.default.string,
  clickOverlay: _propTypes2.default.func,
  borderRadius: _propTypes2.default.number,
  borderWidth: _propTypes2.default.number,
  arrowSize: _propTypes2.default.number,
  hideOnOutsideClick: _propTypes2.default.bool,
  overlayOffsetLeft: _propTypes2.default.number,
  overlayOffsetRight: _propTypes2.default.number,
  overlayOffsetTop: _propTypes2.default.number,
  arrowOffsetLeft: _propTypes2.default.number,
  arrowOffsetRight: _propTypes2.default.number,
  arrowOffsetTop: _propTypes2.default.number
};

var _default = ResponsiveDropdown;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(styles, 'styles', 'src/ResponsiveDropdown.js');

  __REACT_HOT_LOADER__.register(POSITION_LEFT, 'POSITION_LEFT', 'src/ResponsiveDropdown.js');

  __REACT_HOT_LOADER__.register(POSITION_RIGHT, 'POSITION_RIGHT', 'src/ResponsiveDropdown.js');

  __REACT_HOT_LOADER__.register(POSITION_CENTER, 'POSITION_CENTER', 'src/ResponsiveDropdown.js');

  __REACT_HOT_LOADER__.register(ResponsiveDropdown, 'ResponsiveDropdown', 'src/ResponsiveDropdown.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/ResponsiveDropdown.js');
}();

;