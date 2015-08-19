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

  function getFirstTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node;
    var walker = global.document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
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
        var range = global.document.createRange();
        var iter = global.document.createNodeIterator(root, NodeFilter.SHOW_TEXT);

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

        var iter = global.document.createNodeIterator(root, NodeFilter.SHOW_TEXT);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHRQb3NpdGlvbkFuY2hvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2xELFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRSxXQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUM1Qjs7TUFHb0Isa0JBQWtCO0FBQzFCLGFBRFEsa0JBQWtCLENBQ3pCLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFOzRCQURYLGtCQUFrQjs7QUFFbkMsVUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3RCLGNBQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztPQUN0RDtBQUNELFVBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN2QixjQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7T0FDdkQ7QUFDRCxVQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDckIsY0FBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO09BQ3JEO0FBQ0QsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsVUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7S0FDaEI7O2lCQWRrQixrQkFBa0I7O2FBbUU5QixtQkFBRztBQUNSLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsWUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMxQyxZQUFJLElBQUksR0FB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UyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVDLG1CQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMscUJBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztXQUN4QyxNQUFNO0FBQ0wsbUJBQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLG1CQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMscUJBQVMsR0FBRyxDQUFDLENBQUM7V0FDZjtTQUNGOztBQUVELFlBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRSxZQUFJLEtBQUssR0FBRyxzQkFBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsWUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLHNCQUFLLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFdEMsZUFBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsV0FBVyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQztPQUMzRTs7O2FBRWtCLHNCQUFDLElBQUksRUFBaUI7WUFBZixRQUFRLHlEQUFHLEVBQUU7O0FBQ3JDLGVBQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDbkU7OztXQWpFa0Isa0JBQWtCOzs7bUJBQWxCLGtCQUFrQiIsImZpbGUiOiJUZXh0UG9zaXRpb25BbmNob3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VlayBmcm9tICdkb20tc2Vlayc7XG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RUZXh0Tm9kZShub2RlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIG5vZGU7XG4gIGxldCB3YWxrZXIgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCk7XG4gIHJldHVybiB3YWxrZXIuZmlyc3RDaGlsZCgpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRQb3NpdGlvbkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwic3RhcnRcIicpO1xuICAgIH1cbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJlbmRcIicpO1xuICAgIH1cbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmFuZ2Uocm9vdCwgcmFuZ2UpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChyYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicmFuZ2VcIicpO1xuICAgIH1cblxuICAgIGxldCBzdGFydE5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcbiAgICBsZXQgc3RhcnRPZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIHN0YXJ0cyBhdCB0aGUgY29udGFpbmVyIGJvdW5kYXJ5LlxuICAgIGlmIChzdGFydE5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBpZiAoc3RhcnRPZmZzZXQgPT09IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuY2hpbGROb2Rlc1tzdGFydE9mZnNldCAtIDFdO1xuICAgICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gc3RhcnROb2RlLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzW3N0YXJ0T2Zmc2V0XTtcbiAgICAgICAgc3RhcnROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShzdGFydE5vZGUpO1xuICAgICAgICBzdGFydE9mZnNldCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IGVuZE9mZnNldCA9IHJhbmdlLmVuZE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIGVuZHMgYXQgdGhlIGNvbnRhaW5lciBib3VuZGFyeS5cbiAgICBpZiAoZW5kTm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChlbmRPZmZzZXQgPT09IGVuZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXQgLSAxXTtcbiAgICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICAgIGVuZE9mZnNldCA9IGVuZE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXRdO1xuICAgICAgICBlbmROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShlbmROb2RlKTtcbiAgICAgICAgZW5kT2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaXRlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xuICAgIGxldCBzdGFydCA9IHNlZWsoaXRlciwgc3RhcnROb2RlKTtcbiAgICBsZXQgZW5kID0gc3RhcnQgKyBzZWVrKGl0ZXIsIGVuZE5vZGUpO1xuXG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Iocm9vdCwgc3RhcnQgKyBzdGFydE9mZnNldCwgZW5kICsgZW5kT2Zmc2V0KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2VsZWN0b3Iocm9vdCwgc2VsZWN0b3IgPSB7fSkge1xuICAgIHJldHVybiBuZXcgVGV4dFBvc2l0aW9uQW5jaG9yKHJvb3QsIHNlbGVjdG9yLnN0YXJ0LCBzZWxlY3Rvci5lbmQpO1xuICB9XG5cbiAgdG9SYW5nZSgpIHtcbiAgICBsZXQgcm9vdCA9IHRoaXMucm9vdDtcbiAgICBsZXQgcmFuZ2UgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBsZXQgaXRlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xuXG4gICAgbGV0IHtzdGFydCwgZW5kfSA9IHRoaXM7XG4gICAgbGV0IGNvdW50ID0gc2VlayhpdGVyLCBzdGFydCk7XG4gICAgbGV0IHJlbWFpbmRlciA9IHN0YXJ0IC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgaXRlcmF0b3IgYWR2YW5jZWQgaXQgd2lsbCBiZSBsZWZ0IHdpdGggaXRzIHBvaW50ZXIgYWZ0ZXIgdGhlXG4gICAgICAvLyByZWZlcmVuY2Ugbm9kZS4gVGhlIG5leHQgbm9kZSB0aGF0IGlzIG5lZWRlZCB0byBjcmVhdGUgdGhlIHJhbmdlLlxuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5uZXh0Tm9kZSgpLCByZW1haW5kZXIpO1xuICAgICAgaXRlci5wcmV2aW91c05vZGUoKTsgIC8vIFJld2luZCBzbyBhcyBub3QgdG8gY2hhbmdlIHRoZSBuZXh0IHJlc3VsdC5cbiAgICB9XG5cbiAgICBsZXQgbGVuZ3RoID0gKGVuZCAtIHN0YXJ0KSArIHJlbWFpbmRlcjtcbiAgICBjb3VudCA9IHNlZWsoaXRlciwgbGVuZ3RoKTtcbiAgICByZW1haW5kZXIgPSBsZW5ndGggLSBjb3VudDtcblxuICAgIGlmIChpdGVyLnBvaW50ZXJCZWZvcmVSZWZlcmVuY2VOb2RlKSB7XG4gICAgICByYW5nZS5zZXRFbmQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTYW1lIGFzIGFib3ZlLCBidXQgbm8gbmVlZCB0byByZXdpbmQuXG4gICAgICByYW5nZS5zZXRFbmQoaXRlci5uZXh0Tm9kZSgpLCByZW1haW5kZXIpO1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfVxuXG4gIHRvU2VsZWN0b3IoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdUZXh0UG9zaXRpb25TZWxlY3RvcicsXG4gICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgIGVuZDogdGhpcy5lbmQsXG4gICAgfTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIuLyJ9