/*! kepek-logger - v1.1.3
 *  Release on: 2015-09-17
 *  https://github.com/kepek/kepek-logger
 *  Copyright (c) 2015 
 *  Licensed MIT */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

'use strict';

var util = require('util');

var KepekLogger = function (options) {
  var Api, nativeConsole, methods, shouldLog, modifyMethod, prefix, noop;

  options = options || {};
  options.method = options.method || 'debug';
  options.silent = options.silent || false;

  if (!window.console) {
    return null;
  }

  Api = {};
  methods = KepekLogger.Methods;
  nativeConsole = window.console || {};

  noop = function () {};

  shouldLog = function (methodName) {
    return methods.indexOf(methodName) >= methods.indexOf(options.method);
  };

  modifyMethod = function (methodName) {
    Api[methodName] = function () {
      var method = nativeConsole[methodName];

      if (typeof method === 'undefined') {
        return noop;
      }

      if (!shouldLog(methodName) || options.silent === true) {
        return;
      }

      if (prefix) {
        if (typeof prefix === 'function') {
          prefix = prefix();
        }

        arguments[0] = util.format(prefix, arguments[0]);
      }

      Function.prototype.apply.apply(method, [nativeConsole, arguments]);
    };
  };

  methods.forEach(modifyMethod);

  return Api;
};

KepekLogger.Methods = [
  'debug',
  'log',
  'info',
  'warn',
  'error',
  'assert',
  'clear',
  'count',
  'dir',
  'dirxml',
  'exception',
  'group',
  'groupCollapsed',
  'groupEnd',
  'markTimeline',
  'profile',
  'profileEnd',
  'table',
  'time',
  'timeEnd',
  'timeStamp',
  'timeline',
  'timelineEnd',
  'trace'
];

return KepekLogger;


}));
