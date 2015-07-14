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
      value: function fromRange(root, range) {
        if (root === undefined) {
          throw new Error('missing required parameter "root"');
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS1hbmNob3ItdGV4dC1wb3NpdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2xELFFBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMxRSxXQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUM1Qjs7TUFHb0Isa0JBQWtCO0FBQzFCLGFBRFEsa0JBQWtCLENBQ3pCLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFOzRCQURYLGtCQUFrQjs7QUFFbkMsVUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3RCLGNBQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztPQUN0RDtBQUNELFVBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN2QixjQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7T0FDdkQ7QUFDRCxVQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDckIsY0FBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO09BQ3JEO0FBQ0QsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsVUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7S0FDaEI7O2lCQWRrQixrQkFBa0I7O2FBa0U5QixtQkFBRztBQUNSLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsWUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMxQyxZQUFJLElB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QUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUMsbUJBQU8sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxxQkFBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1dBQ3hDLE1BQU07QUFDTCxtQkFBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsbUJBQU8sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxxQkFBUyxHQUFHLENBQUMsQ0FBQztXQUNmO1NBQ0Y7O0FBRUQsWUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUxRSxZQUFJLEtBQUssR0FBRyxzQkFBSyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEMsWUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLHNCQUFLLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFdEMsZUFBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLEdBQUcsV0FBVyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQztPQUMzRTs7O2FBRWtCLHNCQUFDLElBQUksRUFBaUI7WUFBZixRQUFRLHlEQUFHLEVBQUU7O0FBQ3JDLGVBQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDbkU7OztXQWhFa0Isa0JBQWtCOzs7bUJBQWxCLGtCQUFrQiIsImZpbGUiOiJkb20tYW5jaG9yLXRleHQtcG9zaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VlayBmcm9tICdkb20tc2VlaydcblxuXG5mdW5jdGlvbiBnZXRGaXJzdFRleHROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gbm9kZTtcbiAgbGV0IHdhbGtlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19URVhUKTtcbiAgcmV0dXJuIHdhbGtlci5maXJzdENoaWxkKCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFBvc2l0aW9uQW5jaG9yIHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc3RhcnQsIGVuZCkge1xuICAgIGlmIChyb290ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyb290XCInKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJzdGFydFwiJyk7XG4gICAgfVxuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcImVuZFwiJyk7XG4gICAgfVxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICB9XG5cbiAgc3RhdGljIGZyb21SYW5nZShyb290LCByYW5nZSkge1xuICAgIGlmIChyb290ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyb290XCInKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyYW5nZVwiJyk7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0Tm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgIGxldCBzdGFydE9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXG4gICAgaWYgKHN0YXJ0Tm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChzdGFydE9mZnNldCA9PT0gc3RhcnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzW3N0YXJ0T2Zmc2V0IC0gMV07XG4gICAgICAgIHN0YXJ0Tm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoc3RhcnROb2RlKTtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBzdGFydE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnROb2RlID0gc3RhcnROb2RlLmNoaWxkTm9kZXNbc3RhcnRPZmZzZXRdO1xuICAgICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZW5kTm9kZSA9IHJhbmdlLmVuZENvbnRhaW5lcjtcbiAgICBsZXQgZW5kT2Zmc2V0ID0gcmFuZ2UuZW5kT2Zmc2V0O1xuXG4gICAgaWYgKGVuZE5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBpZiAoZW5kT2Zmc2V0ID09PSBlbmROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGVuZE5vZGUgPSBlbmROb2RlLmNoaWxkTm9kZXNbZW5kT2Zmc2V0IC0gMV07XG4gICAgICAgIGVuZE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKGVuZE5vZGUpO1xuICAgICAgICBlbmRPZmZzZXQgPSBlbmROb2RlLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuZE5vZGUgPSBlbmROb2RlLmNoaWxkTm9kZXNbZW5kT2Zmc2V0XTtcbiAgICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICAgIGVuZE9mZnNldCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGl0ZXIgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QsIE5vZGVGaWx0ZXIuU0hPV19URVhUKTtcblxuICAgIGxldCBzdGFydCA9IHNlZWsoaXRlciwgc3RhcnROb2RlKTtcbiAgICBsZXQgZW5kID0gc3RhcnQgKyBzZWVrKGl0ZXIsIGVuZE5vZGUpO1xuXG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Iocm9vdCwgc3RhcnQgKyBzdGFydE9mZnNldCwgZW5kICsgZW5kT2Zmc2V0KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2VsZWN0b3Iocm9vdCwgc2VsZWN0b3IgPSB7fSkge1xuICAgIHJldHVybiBuZXcgVGV4dFBvc2l0aW9uQW5jaG9yKHJvb3QsIHNlbGVjdG9yLnN0YXJ0LCBzZWxlY3Rvci5lbmQpO1xuICB9XG5cbiAgdG9SYW5nZSgpIHtcbiAgICBsZXQgcm9vdCA9IHRoaXMucm9vdDtcbiAgICBsZXQgcmFuZ2UgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBsZXQgaXRlciA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xuXG4gICAgbGV0IHtzdGFydCwgZW5kfSA9IHRoaXM7XG4gICAgbGV0IGNvdW50ID0gc2VlayhpdGVyLCBzdGFydCk7XG4gICAgbGV0IHJlbWFpbmRlciA9IHN0YXJ0IC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0U3RhcnQoaXRlci5yZWZlcmVuY2VOb2RlLCByZW1haW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgICBpdGVyLnByZXZpb3VzTm9kZSgpO1xuICAgIH1cblxuICAgIGxldCBsZW5ndGggPSAoZW5kIC0gc3RhcnQpICsgcmVtYWluZGVyO1xuXG4gICAgY291bnQgPSBzZWVrKGl0ZXIsIGxlbmd0aCk7XG4gICAgcmVtYWluZGVyID0gbGVuZ3RoIC0gY291bnQ7XG5cbiAgICBpZiAoaXRlci5wb2ludGVyQmVmb3JlUmVmZXJlbmNlTm9kZSkge1xuICAgICAgcmFuZ2Uuc2V0RW5kKGl0ZXIucmVmZXJlbmNlTm9kZSwgcmVtYWluZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2Uuc2V0RW5kKGl0ZXIubmV4dE5vZGUoKSwgcmVtYWluZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH1cblxuICB0b1NlbGVjdG9yKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnVGV4dFBvc2l0aW9uU2VsZWN0b3InLFxuICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuZW5kLFxuICAgIH07XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLi8ifQ==