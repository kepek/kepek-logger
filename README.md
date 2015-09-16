# kepek-logger

[![Build Status](https://secure.travis-ci.org/kepek/kepek-logger.png?branch=master)](http://travis-ci.org/kepek/kepek-logger)

The Console API wrapper with silent mode and logging depending on the chosen log level.

## Installation

```
$ npm install --save kepek-logger
```

## Usage

```js
window.console = require('kepek-logger')({
    silent: false, // isDebugMode
});
```

## Documentation

### Options

#### silent

A ``bool`` to specify silent mode. It will help you to hide all console messages.

Defaults to ``false``.

```js
silent: false
```


#### level

A ``string`` to specify the log level. 

Defaults to ``debug``.

```js
level: 'debug'
```

#### prefix

Specify this option if you want to set a prefix for all log messages. Must be a ``string``.

Defaults to ``undefined``.

```js
prefix: function () {
    return new Date().toString();
}
```

## API

Support browser native console API. See https://goo.gl/QC43CC for more details.

## License

MIT

## ఠ ͟ಠ Pull requests are welcome, naturally

![](http://i.imgur.com/Ikzywtp.gif)
