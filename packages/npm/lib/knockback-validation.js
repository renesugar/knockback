/*
  knockback.js 0.16.3
  (c) 2011, 2012 Kevin Malakoff.
  Knockback.js is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
*/

(function() {
  return (function(factory) {
    // AMD
    if (typeof define === 'function' && define.amd) {
      return define('knockback', ['underscore', 'backbone', 'knockout'], factory);
    }
    // CommonJS/NodeJS or No Loader
    else {
      return factory.call(this);
    }
  })(function() {// Generated by CoffeeScript 1.3.3
var Backbone, EMAIL_REGEXP, NUMBER_REGEXP, URL_REGEXP, kb, ko, _;

kb = !window.kb && (typeof require !== 'undefined') ? require('knockback') : window.kb;

_ = kb._;

Backbone = kb.Backbone;

ko = kb.ko;

/*
  knockback-validators.js
  (c) 2011, 2012 Kevin Malakoff.
  Knockback.Observable is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
*/


URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

kb.validators = {
  required: function(value) {
    return !value;
  },
  url: function(value) {
    return !URL_REGEXP.test(value);
  },
  email: function(value) {
    return !EMAIL_REGEXP.test(value);
  },
  number: function(value) {
    return !NUMBER_REGEXP.test(value);
  }
};

kb.valueValidator = function(value, checks) {
  _.isArray(checks) || (checks = [checks]);
  return ko.dependentObservable(function() {
    var check, current_value, results, validator, _i, _len;
    results = {
      invalid: false
    };
    current_value = ko.utils.unwrapObservable(value);
    for (_i = 0, _len = checks.length; _i < _len; _i++) {
      check = checks[_i];
      validator = kb.validators[check];
      if (!validator) {
        continue;
      }
      results[check] = validator(current_value);
      results.invalid |= results[check];
    }
    results.valid = !results.invalid;
    return results;
  });
};

kb.inputValidator = function(view_model, el, value_accessor) {
  var $input_el, bindings, checks, input_name, options, result, skip_attach;
  $input_el = $(el);
  if ((input_name = $input_el.attr('name')) && !_.isString(input_name)) {
    input_name = null;
  }
  skip_attach = value_accessor && value_accessor.skip_attach;
  if (!(bindings = $input_el.attr('data-bind'))) {
    return null;
  }
  options = ko.utils.buildEvalWithinScopeFunction("{" + bindings + "}", 1)([view_model]);
  if (!(options && options.value)) {
    return null;
  }
  checks = [];
  switch ($input_el.attr('type')) {
    case 'url':
      checks.push('url');
      break;
    case 'email':
      checks.push('email');
      break;
    case 'number':
      checks.push('number');
  }
  if ($input_el.attr('required')) {
    checks.push('required');
  }
  result = kb.valueValidator(options.value, checks);
  if (input_name && !skip_attach) {
    view_model["$" + input_name] = result;
  }
  return result;
};

kb.formValidator = function(view_model, el) {
  var $root_el, form_name, input_el, name, results, validator, validators, _i, _len, _ref;
  results = {};
  validators = [];
  $root_el = $(el);
  if ((form_name = $root_el.attr('name')) && !_.isString(form_name)) {
    form_name = null;
  }
  _ref = $root_el.find('input');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    input_el = _ref[_i];
    if (!(name = $(input_el).attr('name'))) {
      continue;
    }
    validator = kb.inputValidator(view_model, input_el, form_name ? {
      skip_attach: true
    } : null);
    !validator || validators.push(results[name] = validator);
  }
  results.valid = ko.dependentObservable(function() {
    var valid, _j, _len1;
    valid = true;
    for (_j = 0, _len1 = validators.length; _j < _len1; _j++) {
      validator = validators[_j];
      valid &= validator().valid;
    }
    return valid;
  });
  results.invalid = ko.dependentObservable(function() {
    return !results.valid();
  });
  if (form_name) {
    view_model["$" + form_name] = results;
  }
  return results;
};
; return kb;});
}).call(this);