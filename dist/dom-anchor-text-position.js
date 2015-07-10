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

        var iter = global.document.createNodeIterator(global.document.body, NodeFilter.SHOW_TEXT, null, false);

        var start = (0, _seek['default'])(iter, startNode);
        var end = start + (0, _seek['default'])(iter, endNode);

        return new TextPositionAnchor(start + startOffset, end + endOffset);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS1hbmNob3ItdGV4dC1wb3NpdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2xELFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQzNDLElBQUksRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzQyxXQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUM1Qjs7TUFHb0Isa0JBQWtCO0FBQzFCLGFBRFEsa0JBQWtCLENBQ3pCLEtBQUssRUFBRSxHQUFHLEVBQUU7NEJBREwsa0JBQWtCOztBQUVuQyxVQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsY0FBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO09BQ3ZEO0FBQ0QsVUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3JCLGNBQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztPQUNyRDtBQUNELFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ2hCOztpQkFWa0Isa0JBQWtCOzthQStEOUIsbUJBQUc7QUFDUixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzFDLFlBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQUV0RCxLQUFLLEdBQVMsSUFBSSxDQUFsQixL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Z0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMscUJBQVMsR0FBRyxDQUFDLENBQUM7V0FDZjtTQUNGOztBQUVELFlBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUUzRCxZQUFJLEtBQUssR0FBRyxzQkFBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsWUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLHNCQUFLLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFdEMsZUFBTyxJQUFJLGtCQUFrQixDQUFDLEtBQUssR0FBRyxXQUFXLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO09BQ3JFOzs7YUFFa0Isc0JBQUMsUUFBUSxFQUFFO0FBQzVCLFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQixnQkFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1NBQzFEO0FBQ0QsZUFBTyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQzdEOzs7V0E3RGtCLGtCQUFrQjs7O21CQUFsQixrQkFBa0IiLCJmaWxlIjoiZG9tLWFuY2hvci10ZXh0LXBvc2l0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNlZWsgZnJvbSAnZG9tLXNlZWsnXG5cblxuZnVuY3Rpb24gZ2V0Rmlyc3RUZXh0Tm9kZShub2RlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIG5vZGU7XG4gIGxldCB3YWxrZXIgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICBub2RlLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuICByZXR1cm4gd2Fsa2VyLmZpcnN0Q2hpbGQoKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0UG9zaXRpb25BbmNob3Ige1xuICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKSB7XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJzdGFydFwiJyk7XG4gICAgfVxuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcImVuZFwiJyk7XG4gICAgfVxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmFuZ2UocmFuZ2UpIHtcbiAgICBpZiAocmFuZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcInJhbmdlXCInKTtcbiAgICB9XG5cbiAgICBsZXQgc3RhcnROb2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG4gICAgbGV0IHN0YXJ0T2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cbiAgICBpZiAoc3RhcnROb2RlLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgaWYgKHN0YXJ0T2Zmc2V0ID09PSBzdGFydE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgc3RhcnROb2RlID0gc3RhcnROb2RlLmNoaWxkTm9kZXNbc3RhcnRPZmZzZXQgLSAxXTtcbiAgICAgICAgc3RhcnROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShzdGFydE5vZGUpO1xuICAgICAgICBzdGFydE9mZnNldCA9IHN0YXJ0Tm9kZS50ZXh0Q29udGVudC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuY2hpbGROb2Rlc1tzdGFydE9mZnNldF07XG4gICAgICAgIHN0YXJ0Tm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoc3RhcnROb2RlKTtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBlbmROb2RlID0gcmFuZ2UuZW5kQ29udGFpbmVyO1xuICAgIGxldCBlbmRPZmZzZXQgPSByYW5nZS5lbmRPZmZzZXQ7XG5cbiAgICBpZiAoZW5kTm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChlbmRPZmZzZXQgPT09IGVuZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXQgLSAxXTtcbiAgICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICAgIGVuZE9mZnNldCA9IGVuZE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXRdO1xuICAgICAgICBlbmROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShlbmROb2RlKTtcbiAgICAgICAgZW5kT2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgaXRlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IoXG4gICAgICBnbG9iYWwuZG9jdW1lbnQuYm9keSwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwsIGZhbHNlKTtcblxuICAgIGxldCBzdGFydCA9IHNlZWsoaXRlciwgc3RhcnROb2RlKTtcbiAgICBsZXQgZW5kID0gc3RhcnQgKyBzZWVrKGl0ZXIsIGVuZE5vZGUpO1xuXG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Ioc3RhcnQgKyBzdGFydE9mZnNldCwgZW5kICsgZW5kT2Zmc2V0KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBpZiAoc2VsZWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcInNlbGVjdG9yXCInKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Ioc2VsZWN0b3Iuc3RhcnQsIHNlbGVjdG9yLmVuZCk7XG4gIH1cblxuICB0b1JhbmdlKCkge1xuICAgIGxldCByYW5nZSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGxldCBpdGVyID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihcbiAgICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCwgZmFsc2UpO1xuXG4gICAgbGV0IHtzdGFydCwgZW5kfSA9IHRoaXM7XG4gICAgbGV0IGNvdW50ID0gc2VlayhpdGVyLCBzdGFydCk7XG4gICAgbGV0IHJlbWFpbmRlciA9IHN0YXJ0IC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgICBpdGVyLnByZXZpb3VzTm9kZSgpO1xuICAgIH1cblxuICAgIGxldCBsZW5ndGggPSAoZW5kIC0gc3RhcnQpICsgcmVtYWluZGVyO1xuXG4gICAgY291bnQgPSBzZWVrKGl0ZXIsIGxlbmd0aCk7XG4gICAgcmVtYWluZGVyID0gbGVuZ3RoIC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0RW5kKGl0ZXIucmVmZXJlbmNlTm9kZSwgcmVtYWluZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKGl0ZXIubmV4dE5vZGUoKSwgcmVtYWluZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH1cblxuICB0b1NlbGVjdG9yKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnVGV4dFBvc2l0aW9uU2VsZWN0b3InLFxuICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgIH07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi8ifQ==