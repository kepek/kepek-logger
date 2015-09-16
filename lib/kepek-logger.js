'use strict';

var util = require('util');

var KepekLogger = function (options) {
  options = options || {};
  options.level = options.level || 'debug';
  options.silent = options.silent || false;

  if (!window.console) {
    return null;
  }

  var logger = {},
    nativeConsole = window.console || {},
    levels = KepekLogger.Levels,
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

KepekLogger.Levels = [
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

return KepekLogger;
