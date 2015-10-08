Text Position Anchor
====================

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/dom-anchor-text-position.svg)](https://www.npmjs.com/package/dom-anchor-text-position)
[![Build Status](https://travis-ci.org/tilgovi/dom-anchor-text-position.svg?branch=master)](https://travis-ci.org/tilgovi/dom-anchor-text-position)
[![Coverage Status](https://coveralls.io/repos/tilgovi/dom-anchor-text-position/badge.svg?branch=master)](https://coveralls.io/r/tilgovi/dom-anchor-text-position?branch=master)

This library offers conversion between a DOM `Range` instance and a text
position selector as defined by the Web Annotation Data Model.

For more information on `Range` see
[the documentation](https://developer.mozilla.org/en-US/docs/Web/API/Range).

For more information on the fragment selector see
[the specification](http://www.w3.org/TR/annotation-model/#text-position-selector).

Installation
============

There are a few different ways to include the library.

With a CommonJS bundler, to `require('dom-anchor-text-position')`:

    npm install dom-anchor-text-position

With a script tag, include one of the scripts from the `dist` directory.
For this to work, you will also need to include the compatibility library
[node-iterator-shim](https://github.com/tilgovi/node-iterator-shim).

With AMD loaders, these scripts should also work.

Usage
=====

## API Documentation

The module exposes a single constructor function, `TextPositionAnchor`.

### `new TextPositionAnchor(root, start, end)`

This constructor creates a new `TextPositionAnchor`. The arguments describe
textual offsets within the root `Element`. All arguments are required.

### `TextPositionAnchor.fromRange(root, range)`

Provided with an existing `Range` instance this will return a
`TextPositionAnchor` that stores the offsets of the beginning and end of the
text selected by the range as measured from the beginning of the `root`
`Element`.

### `TextPositionAnchor.fromSelector(root, selector)`

Provided with an `Object` containing `start` and `end` keys this will return
a `TextPositionAnchor` that corresponds to these offsets within the `root`
`Element`.

### `TextPositionAnchor.prototype.toRange()`

This method returns a `Range` object that selects the text corresponding to
the substring of the text content of the anchor root over the interval
[start, end).

### `TextPositionAnchor.prototype.toSelector()`

This method returns an `Object` that has keys `type`, `start`, and `end` where
`type` is `"TextPositionSelector"` and the `start` and `end` keys have values
corresponding to the stored `start` and `end` offsets of the anchor.
