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
    global.domAnchorTextPosition = mod.exports;
  }
})(this, function (exports, module, _domSeek) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _seek = _interopRequireDefault(_domSeek);

  function getFirstTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node;
    var walker = global.document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    return walker.firstChild();
  }

  var TextPositionAnchor = (function () {
    function TextPositionAnchor(start, end) {
      _classCallCheck(this, TextPositionAnchor);

      if (start === undefined) {
        throw new Error('missing required parameter "start"');
      }
      if (end === undefined) {
        throw new Error('missing required parameter "end"');
      }
      this.start = start;
      this.end = end;
    }

    _createClass(TextPositionAnchor, [{
      key: 'toRange',
      value: function toRange() {
        var range = global.document.createRange();
        var iter = global.document.createNodeIterator(global.document.body, NodeFilter.SHOW_TEXT, null, false);

        var start = this.start;
        var end = this.end;

        var count = (0, _seek['default'])(iter, start);
        var remainder = start - count;

        if (iter.pointerBeforeReferenceNode) {
          range.setStart(iter.referenceNode, remainder);
        } else {
          range.setStart(iter.nextNode(), remainder);
          iter.previousNode();
        }

        var length = end - start + remainder;

        count = (0, _seek['default'])(iter, length);
        remainder = length - count;

        if (iter.pointerBeforeReferenceNode) {
          range.setEnd(iter.referenceNode, remainder);
        } else {
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
      value: function fromRange(range) {
        if (range === undefined) {
          throw new Error('missing required parameter "range"');
        }

        var startNode = range.startContainer;
        var startOffset = range.startOffset;

        if (startNode.nodeType !== Node.TEXT_NODE) {
          if (startOffset > 0) {
            startNode = startNode.childNodes[startOffset];
          }
          startNode = getFirstTextNode(startNode);
          startOffset = 0;
        }

        var endNode = range.endContainer;
        var endOffset = range.endOffset;

        if (endNode.nodeType !== Node.TEXT_NODE) {
          if (endOffset > 0) {
            endNode = endNode.childNodes[endOffset];
          }
          endNode = getFirstTextNode(endNode);
          endOffset = 0;
        }

        var iter = global.document.createNodeIterator(global.document.body, NodeFilter.SHOW_TEXT, null, false);

        var start = (0, _seek['default'])(iter, startNode);
        var end = start + (0, _seek['default'])(iter, endNode);

        start += startOffset;
        end += endOffset;

        return new TextPositionAnchor(start, end);
      }
    }, {
      key: 'fromSelector',
      value: function fromSelector(selector) {
        if (selector === undefined) {
          throw new Error('missing required parameter "selector"');
        }
        return new TextPositionAnchor(selector.start, selector.end);
      }
    }]);

    return TextPositionAnchor;
  })();

  module.exports = TextPositionAnchor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS1hbmNob3ItdGV4dC1wb3NpdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2xELFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQzNDLElBQUksRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzQyxXQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUM1Qjs7TUFHb0Isa0JBQWtCO0FBQzFCLGFBRFEsa0JBQWtCLENBQ3pCLEtBQUssRUFBRSxHQUFHLEVBQUU7NEJBREwsa0JBQWtCOztBQUVuQyxVQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsY0FBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO09BQ3ZEO0FBQ0QsVUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3JCLGNBQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztPQUNyRDtBQUNELFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ2hCOztpQkFWa0Isa0JBQWtCOzthQTBEOUIsbUJBQUc7QUFDUixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzFDLFlBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQUV0RCxLQUFLLEdBQVMsSUFBSSxDQUFsQixL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QixlQUFPLElBQUksa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO09BQzNDOzs7YUFFa0Isc0JBQUMsUUFBUSxFQUFFO0FBQzVCLFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQixnQkFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO0FBQ0QsZUFBTyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQzdEOzs7V0F4RGtCLGtCQUFrQjs7O21CQUFsQixrQkFBa0IiLCJmaWxlIjoiZG9tLWFuY2hvci10ZXh0LXBvc2l0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlZWsgZnJvbSAnZG9tLXNlZWsnXG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RUZXh0Tm9kZShub2RlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIG5vZGU7XG4gIGxldCB3YWxrZXIgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICBub2RlLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuICByZXR1cm4gd2Fsa2VyLmZpcnN0Q2hpbGQoKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0UG9zaXRpb25BbmNob3Ige1xuICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJzdGFydFwiJyk7XG4gICAgfVxuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcImVuZFwiJyk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmFuZ2UocmFuZ2UpIHtcbiAgICBpZiAocmFuZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcInJhbmdlXCInKTtcbiAgICB9XG5cbiAgICBsZXQgc3RhcnROb2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgbGV0IHN0YXJ0T2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cbiAgICBpZiAoc3RhcnROb2RlLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgaWYgKHN0YXJ0T2Zmc2V0ID4gMCkge1xuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuY2hpbGROb2Rlc1tzdGFydE9mZnNldF07XG4gICAgICB9XG4gICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICBzdGFydE9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgbGV0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IGVuZE9mZnNldCA9IHJhbmdlLmVuZE9mZnNldDtcblxuICAgIGlmIChlbmROb2RlLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgaWYgKGVuZE9mZnNldCA+IDApIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXRdO1xuICAgICAgfVxuICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICBlbmRPZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGxldCBpdGVyID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihcbiAgICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgbGV0IHN0YXJ0ID0gc2VlayhpdGVyLCBzdGFydE5vZGUpO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHNlZWsoaXRlciwgZW5kTm9kZSk7XG5cbiAgICBzdGFydCArPSBzdGFydE9mZnNldDtcbiAgICBlbmQgKz0gZW5kT2Zmc2V0O1xuXG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Ioc3RhcnQsIGVuZCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgaWYgKHNlbGVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJzZWxlY3RvclwiJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVGV4dFBvc2l0aW9uQW5jaG9yKHNlbGVjdG9yLnN0YXJ0LCBzZWxlY3Rvci5lbmQpO1xuICB9XG5cbiAgdG9SYW5nZSgpIHtcbiAgICBsZXQgcmFuZ2UgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBsZXQgaXRlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IoXG4gICAgICBnbG9iYWwuZG9jdW1lbnQuYm9keSwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwsIGZhbHNlKTtcblxuICAgIGxldCB7c3RhcnQsIGVuZH0gPSB0aGlzO1xuICAgIGxldCBjb3VudCA9IHNlZWsoaXRlciwgc3RhcnQpO1xuICAgIGxldCByZW1haW5kZXIgPSBzdGFydCAtIGNvdW50O1xuXG4gICAgaWYgKGl0ZXIucG9pbnRlckJlZm9yZVJlZmVyZW5jZU5vZGUpIHtcbiAgICAgIHJhbmdlLnNldFN0YXJ0KGl0ZXIucmVmZXJlbmNlTm9kZSwgcmVtYWluZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5uZXh0Tm9kZSgpLCByZW1haW5kZXIpO1xuICAgICAgaXRlci5wcmV2aW91c05vZGUoKTtcbiAgICB9XG5cbiAgICBsZXQgbGVuZ3RoID0gKGVuZCAtIHN0YXJ0KSArIHJlbWFpbmRlcjtcblxuICAgIGNvdW50ID0gc2VlayhpdGVyLCBsZW5ndGgpO1xuICAgIHJlbWFpbmRlciA9IGxlbmd0aCAtIGNvdW50O1xuXG4gICAgaWYgKGl0ZXIucG9pbnRlckJlZm9yZVJlZmVyZW5jZU5vZGUpIHtcbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLnJlZmVyZW5jZU5vZGUsIHJlbWFpbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9XG5cbiAgdG9TZWxlY3RvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1RleHRQb3NpdGlvblNlbGVjdG9yJyxcbiAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4vIn0=