(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'dom-seek'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('dom-seek'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.seek);
    global.TextPositionAnchor = mod.exports;
  }
})(this, function (exports, module, _domSeek) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _seek = _interopRequireDefault(_domSeek);

  var SHOW_TEXT = NodeFilter.SHOW_TEXT;

  function getFirstTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node;
    var document = node.ownerDocument;
    var walker = document.createTreeWalker(node, SHOW_TEXT, null, false);
    return walker.firstChild();
  }

  var TextPositionAnchor = (function () {
    function TextPositionAnchor(root, start, end) {
      _classCallCheck(this, TextPositionAnchor);

      if (root === undefined) {
        throw new Error('missing required parameter "root"');
      }
      if (start === undefined) {
        throw new Error('missing required parameter "start"');
      }
      if (end === undefined) {
        throw new Error('missing required parameter "end"');
      }
      this.root = root;
      this.start = start;
      this.end = end;
    }

    _createClass(TextPositionAnchor, [{
      key: 'toRange',
      value: function toRange() {
        var root = this.root;
        var document = root.ownerDocument;
        var range = document.createRange();
        var iter = document.createNodeIterator(root, SHOW_TEXT, null, false);

        var start = this.start;
        var end = this.end;

        var count = (0, _seek['default'])(iter, start);
        var remainder = start - count;

        if (iter.pointerBeforeReferenceNode) {
          range.setStart(iter.referenceNode, remainder);
        } else {
          // If the iterator advanced it will be left with its pointer after the
          // reference node. The next node that is needed to create the range.
          range.setStart(iter.nextNode(), remainder);
          iter.previousNode(); // Rewind so as not to change the next result.
        }

        var length = end - start + remainder;
        count = (0, _seek['default'])(iter, length);
        remainder = length - count;

        if (iter.pointerBeforeReferenceNode) {
          range.setEnd(iter.referenceNode, remainder);
        } else {
          // Same as above, but no need to rewind.
          range.setEnd(iter.nextNode(), remainder);
        }

        return range;
      }
    }, {
      key: 'toSelector',
      value: function toSelector() {
        return {
          type: 'TextPositionSelector',
          start: this.start,
          end: this.end
        };
      }
    }], [{
      key: 'fromRange',
      value: function fromRange(root, range) {
        if (root === undefined) {
          throw new Error('missing required parameter "root"');
        }
        if (range === undefined) {
          throw new Error('missing required parameter "range"');
        }

        var startNode = range.startContainer;
        var startOffset = range.startOffset;

        // Drill down to a text node if the range starts at the container boundary.
        if (startNode.nodeType !== Node.TEXT_NODE) {
          if (startOffset === startNode.childNodes.length) {
            startNode = startNode.childNodes[startOffset - 1];
            startNode = getFirstTextNode(startNode);
            startOffset = startNode.textContent.length;
          } else {
            startNode = startNode.childNodes[startOffset];
            startNode = getFirstTextNode(startNode);
            startOffset = 0;
          }
        }

        var endNode = range.endContainer;
        var endOffset = range.endOffset;

        // Drill down to a text node if the range ends at the container boundary.
        if (endNode.nodeType !== Node.TEXT_NODE) {
          if (endOffset === endNode.childNodes.length) {
            endNode = endNode.childNodes[endOffset - 1];
            endNode = getFirstTextNode(endNode);
            endOffset = endNode.textContent.length;
          } else {
            endNode = endNode.childNodes[endOffset];
            endNode = getFirstTextNode(endNode);
            endOffset = 0;
          }
        }

        var document = root.ownerDocument;
        var iter = document.createNodeIterator(root, SHOW_TEXT, null, false);
        var start = (0, _seek['default'])(iter, startNode);
        var end = start + (0, _seek['default'])(iter, endNode);

        return new TextPositionAnchor(root, start + startOffset, end + endOffset);
      }
    }, {
      key: 'fromSelector',
      value: function fromSelector(root) {
        var selector = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return new TextPositionAnchor(root, selector.start, selector.end);
      }
    }]);

    return TextPositionAnchor;
  })();

  module.exports = TextPositionAnchor;
});
//# sourceMappingURL=data:application/json;base64,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cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZWVrIGZyb20gJ2RvbS1zZWVrJztcblxuY29uc3QgU0hPV19URVhUID0gTm9kZUZpbHRlci5TSE9XX1RFWFQ7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RUZXh0Tm9kZShub2RlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIG5vZGU7XG4gIGxldCBkb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgbGV0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgU0hPV19URVhULCBudWxsLCBmYWxzZSk7XG4gIHJldHVybiB3YWxrZXIuZmlyc3RDaGlsZCgpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRQb3NpdGlvbkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwic3RhcnRcIicpO1xuICAgIH1cbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJlbmRcIicpO1xuICAgIH1cbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmFuZ2Uocm9vdCwgcmFuZ2UpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChyYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicmFuZ2VcIicpO1xuICAgIH1cblxuICAgIGxldCBzdGFydE5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcbiAgICBsZXQgc3RhcnRPZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIHN0YXJ0cyBhdCB0aGUgY29udGFpbmVyIGJvdW5kYXJ5LlxuICAgIGlmIChzdGFydE5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBpZiAoc3RhcnRPZmZzZXQgPT09IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuY2hpbGROb2Rlc1tzdGFydE9mZnNldCAtIDFdO1xuICAgICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gc3RhcnROb2RlLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzW3N0YXJ0T2Zmc2V0XTtcbiAgICAgICAgc3RhcnROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShzdGFydE5vZGUpO1xuICAgICAgICBzdGFydE9mZnNldCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IGVuZE9mZnNldCA9IHJhbmdlLmVuZE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIGVuZHMgYXQgdGhlIGNvbnRhaW5lciBib3VuZGFyeS5cbiAgICBpZiAoZW5kTm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChlbmRPZmZzZXQgPT09IGVuZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXQgLSAxXTtcbiAgICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICAgIGVuZE9mZnNldCA9IGVuZE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXRdO1xuICAgICAgICBlbmROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShlbmROb2RlKTtcbiAgICAgICAgZW5kT2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnQ7XG4gICAgbGV0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCwgU0hPV19URVhULCBudWxsLCBmYWxzZSk7XG4gICAgbGV0IHN0YXJ0ID0gc2VlayhpdGVyLCBzdGFydE5vZGUpO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHNlZWsoaXRlciwgZW5kTm9kZSk7XG5cbiAgICByZXR1cm4gbmV3IFRleHRQb3NpdGlvbkFuY2hvcihyb290LCBzdGFydCArIHN0YXJ0T2Zmc2V0LCBlbmQgKyBlbmRPZmZzZXQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21TZWxlY3Rvcihyb290LCBzZWxlY3RvciA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Iocm9vdCwgc2VsZWN0b3Iuc3RhcnQsIHNlbGVjdG9yLmVuZCk7XG4gIH1cblxuICB0b1JhbmdlKCkge1xuICAgIGxldCByb290ID0gdGhpcy5yb290O1xuICAgIGxldCBkb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudDtcbiAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGxldCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QsIFNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgbGV0IHtzdGFydCwgZW5kfSA9IHRoaXM7XG4gICAgbGV0IGNvdW50ID0gc2VlayhpdGVyLCBzdGFydCk7XG4gICAgbGV0IHJlbWFpbmRlciA9IHN0YXJ0IC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgaXRlcmF0b3IgYWR2YW5jZWQgaXQgd2lsbCBiZSBsZWZ0IHdpdGggaXRzIHBvaW50ZXIgYWZ0ZXIgdGhlXG4gICAgICAvLyByZWZlcmVuY2Ugbm9kZS4gVGhlIG5leHQgbm9kZSB0aGF0IGlzIG5lZWRlZCB0byBjcmVhdGUgdGhlIHJhbmdlLlxuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5uZXh0Tm9kZSgpLCByZW1haW5kZXIpO1xuICAgICAgaXRlci5wcmV2aW91c05vZGUoKTsgIC8vIFJld2luZCBzbyBhcyBub3QgdG8gY2hhbmdlIHRoZSBuZXh0IHJlc3VsdC5cbiAgICB9XG5cbiAgICBsZXQgbGVuZ3RoID0gKGVuZCAtIHN0YXJ0KSArIHJlbWFpbmRlcjtcbiAgICBjb3VudCA9IHNlZWsoaXRlciwgbGVuZ3RoKTtcbiAgICByZW1haW5kZXIgPSBsZW5ndGggLSBjb3VudDtcblxuICAgIGlmIChpdGVyLnBvaW50ZXJCZWZvcmVSZWZlcmVuY2VOb2RlKSB7XG4gICAgICByYW5nZS5zZXRFbmQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTYW1lIGFzIGFib3ZlLCBidXQgbm8gbmVlZCB0byByZXdpbmQuXG4gICAgICByYW5nZS5zZXRFbmQoaXRlci5uZXh0Tm9kZSgpLCByZW1haW5kZXIpO1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfVxuXG4gIHRvU2VsZWN0b3IoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdUZXh0UG9zaXRpb25TZWxlY3RvcicsXG4gICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbmQsXG4gICAgfTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLyJ9