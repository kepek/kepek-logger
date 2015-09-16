/*! kepek-logger - v1.0.0
 *  Release on: 2015-09-16
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

var Logger = function (options) {
  options = options || {};
  options.level = options.level || 'debug';
  options.silent = options.silent || false;

  if (!window.console) {
    return null;
  }

  var logger = {},
    nativeConsole = window.console || {},
    levels = Logger.Levels,
    shouldLog = function (level) {
      return levels.indexOf(level) >= levels.indexOf(options.level);
    };

  levels.forEach(function (level) {
    logger[level] = function () {
      if (typeof nativeConsole[level] === 'undefined') {
        return;
      }

      if (!shouldLog(level) || options.silent === true) {
        return;
      }

      var prefix = options.prefix,
        normalizedLevel;

      switch (level) {
        case 'fatal': normalizedLevel = 'error'; break;
        default: normalizedLevel = level;
      }

      if (prefix) {
        if (typeof prefix === 'function') {
          prefix = prefix();
        }

        arguments[0] = util.format(prefix, arguments[0]);
      }

      nativeConsole[normalizedLevel].apply(nativeConsole, arguments);
    };
  });

  return logger;
};

Logger.Levels = [
  'debug',
  'log',
  'info',
  'warn',
  'error',
  'fatal',
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
  'trace',
];

module.exports = Logger;


}));
