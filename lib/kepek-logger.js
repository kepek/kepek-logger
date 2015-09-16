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
