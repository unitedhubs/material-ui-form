'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps; // eslint-disable-line import/no-extraneous-dependencies

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Form = require('material-ui/Form');

var _Input = require('material-ui/Input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getErrorAndHelperText(field) {
  var helperText = void 0;
  var isError = false;
  if (!_lodash2.default.isEmpty(field) && field.validations.length > 0) {
    helperText = field.validations[0].message;
    isError = true;
  }
  return { helperText: helperText, isError: isError };
}

var FormControlClone = (_temp = _class = function (_React$Component) {
  _inherits(FormControlClone, _React$Component);

  function FormControlClone(props) {
    _classCallCheck(this, FormControlClone);

    var _this = _possibleConstructorReturn(this, (FormControlClone.__proto__ || Object.getPrototypeOf(FormControlClone)).call(this, props));

    _initialiseProps.call(_this);

    var _props$formControlEle = props.formControlElement.props,
        error = _props$formControlEle.error,
        required = _props$formControlEle.required;


    var name = void 0;
    var value = void 0;
    var helperText = void 0;
    var isError = error;

    _react2.default.Children.forEach(props.formControlElement.props.children, function (child) {
      if (child.type === _Form.FormHelperText) {
        helperText = String(child.props.children);
        _this.helperText = helperText;
      } else if (child.type !== _Form.FormLabel && child.type !== _Input.InputLabel && child.props.name !== undefined && child.props.value !== undefined) {
        name = child.props.name; // eslint-disable-line prefer-destructuring
        value = child.props.value; // eslint-disable-line prefer-destructuring
      }
    });

    if (props.formControlElement.type !== _Form.FormControl || name === undefined || value === undefined) {
      throw new Error('invalid FormControl control children');
    }

    if (props.field.value === undefined) {
      props.onConstruct({ name: name, value: value, required: required });
    } else {
      value = props.field.value; // eslint-disable-line prefer-destructuring
      if (!_lodash2.default.isEmpty(props.field) && props.field.validations.length > 0) {
        var fieldError = getErrorAndHelperText(props.field);
        helperText = fieldError.helperText; // eslint-disable-line prefer-destructuring
        isError = fieldError.isError; // eslint-disable-line prefer-destructuring
      }
    }

    _this.name = name;
    _this.state = {
      helperText: helperText,
      isError: isError,
      value: value
    };
    return _this;
  }

  _createClass(FormControlClone, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!_lodash2.default.isEmpty(nextProps.field)) {
        var _getErrorAndHelperTex = getErrorAndHelperText(nextProps.field),
            helperText = _getErrorAndHelperTex.helperText,
            isError = _getErrorAndHelperTex.isError;

        this.setState({
          helperText: helperText,
          isError: isError,
          value: nextProps.field.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          formControlElement = _props.formControlElement,
          props = _props.formControlElement.props;


      var hasHelperText = false;
      var children = _react2.default.Children.map(props.children, function (child) {
        // label
        if (child.type === _Form.FormLabel || child.type === _Input.InputLabel) {
          return child;
        }
        // helper text
        if (child.type === _Form.FormHelperText) {
          hasHelperText = true;
          return _react2.default.cloneElement(child, {
            children: _this2.state.helperText
          });
        }
        // field
        return _react2.default.cloneElement(child, {
          onChange: child.props.onChange || _this2.onChange,
          value: _this2.state.value
        });
      });
      // support for dynamic helper text
      if (!hasHelperText && this.state.helperText !== undefined) {
        children.push(_react2.default.createElement(
          _Form.FormHelperText,
          { key: 1 },
          this.state.helperText
        ));
      }

      return _react2.default.cloneElement(formControlElement, {
        error: this.state.isError,
        children: children
      });
    }
  }]);

  return FormControlClone;
}(_react2.default.Component), _class.propTypes = {
  field: _propTypes2.default.object,
  formControlElement: _propTypes2.default.object.isRequired,
  onValueChange: _propTypes2.default.func.isRequired,
  onConstruct: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
  field: {}
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (event) {
    var value = event.target.value;

    _this3.setState({ isError: false, helperText: _this3.helperText, value: value });
    _this3.props.onValueChange(_this3.name, value);
  };
}, _temp);
exports.default = FormControlClone;