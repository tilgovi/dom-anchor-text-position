(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'node-iterator-shim', 'dom-seek'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('node-iterator-shim'), require('dom-seek'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.createNodeIterator, global.seek);
    global.TextPositionAnchor = mod.exports;
  }
})(this, function (exports, module, _nodeIteratorShim, _domSeek) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _createNodeIterator = _interopRequireDefault(_nodeIteratorShim);

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
        var iter = (0, _createNodeIterator['default'])(root, SHOW_TEXT);

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

        var iter = (0, _createNodeIterator['default'])(root, SHOW_TEXT);
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
//# sourceMappingURL=data:application/json;base64,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LFNBQVMsS0FBSyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMzQyxtQkFBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVDLG1CQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMscUJBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztXQUN4QyxNQUFNO0FBQ0wsbUJBQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLG1CQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMscUJBQVMsR0FBRyxDQUFDLENBQUM7V0FDZjtTQUNGOztBQUVELFlBQUksSUFBSSxHQUFHLG9DQUFtQixJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDL0MsWUFBSSxLQUFLLEdBQUcsc0JBQUssSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLFlBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxzQkFBSyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXRDLGVBQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLFdBQVcsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7T0FDM0U7OzthQUVrQixzQkFBQyxJQUFJLEVBQWlCO1lBQWYsUUFBUSx5REFBRyxFQUFFOztBQUNyQyxlQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ25FOzs7V0FqRWtCLGtCQUFrQjs7O21CQUFsQixrQkFBa0IiLCJmaWxlIjoiVGV4dFBvc2l0aW9uQW5jaG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZU5vZGVJdGVyYXRvciBmcm9tICdub2RlLWl0ZXJhdG9yLXNoaW0nO1xuaW1wb3J0IHNlZWsgZnJvbSAnZG9tLXNlZWsnO1xuXG5jb25zdCBTSE9XX1RFWFQgPSBOb2RlRmlsdGVyLlNIT1dfVEVYVDtcblxuXG5mdW5jdGlvbiBnZXRGaXJzdFRleHROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gbm9kZTtcbiAgbGV0IGRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICBsZXQgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihub2RlLCBTSE9XX1RFWFQsIG51bGwsIGZhbHNlKTtcbiAgcmV0dXJuIHdhbGtlci5maXJzdENoaWxkKCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFBvc2l0aW9uQW5jaG9yIHtcbiAgY29uc3RydWN0b3Iocm9vdCwgc3RhcnQsIGVuZCkge1xuICAgIGlmIChyb290ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyb290XCInKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJzdGFydFwiJyk7XG4gICAgfVxuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlciBcImVuZFwiJyk7XG4gICAgfVxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICB9XG5cbiAgc3RhdGljIGZyb21SYW5nZShyb290LCByYW5nZSkge1xuICAgIGlmIChyb290ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyb290XCInKTtcbiAgICB9XG4gICAgaWYgKHJhbmdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJyYW5nZVwiJyk7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0Tm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgIGxldCBzdGFydE9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXG4gICAgLy8gRHJpbGwgZG93biB0byBhIHRleHQgbm9kZSBpZiB0aGUgcmFuZ2Ugc3RhcnRzIGF0IHRoZSBjb250YWluZXIgYm91bmRhcnkuXG4gICAgaWYgKHN0YXJ0Tm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChzdGFydE9mZnNldCA9PT0gc3RhcnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzW3N0YXJ0T2Zmc2V0IC0gMV07XG4gICAgICAgIHN0YXJ0Tm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoc3RhcnROb2RlKTtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBzdGFydE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnROb2RlID0gc3RhcnROb2RlLmNoaWxkTm9kZXNbc3RhcnRPZmZzZXRdO1xuICAgICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZW5kTm9kZSA9IHJhbmdlLmVuZENvbnRhaW5lcjtcbiAgICBsZXQgZW5kT2Zmc2V0ID0gcmFuZ2UuZW5kT2Zmc2V0O1xuXG4gICAgLy8gRHJpbGwgZG93biB0byBhIHRleHQgbm9kZSBpZiB0aGUgcmFuZ2UgZW5kcyBhdCB0aGUgY29udGFpbmVyIGJvdW5kYXJ5LlxuICAgIGlmIChlbmROb2RlLm5vZGVUeXBlICE9PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgaWYgKGVuZE9mZnNldCA9PT0gZW5kTm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBlbmROb2RlID0gZW5kTm9kZS5jaGlsZE5vZGVzW2VuZE9mZnNldCAtIDFdO1xuICAgICAgICBlbmROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShlbmROb2RlKTtcbiAgICAgICAgZW5kT2Zmc2V0ID0gZW5kTm9kZS50ZXh0Q29udGVudC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbmROb2RlID0gZW5kTm9kZS5jaGlsZE5vZGVzW2VuZE9mZnNldF07XG4gICAgICAgIGVuZE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKGVuZE5vZGUpO1xuICAgICAgICBlbmRPZmZzZXQgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBpdGVyID0gY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QsIFNIT1dfVEVYVCk7XG4gICAgbGV0IHN0YXJ0ID0gc2VlayhpdGVyLCBzdGFydE5vZGUpO1xuICAgIGxldCBlbmQgPSBzdGFydCArIHNlZWsoaXRlciwgZW5kTm9kZSk7XG5cbiAgICByZXR1cm4gbmV3IFRleHRQb3NpdGlvbkFuY2hvcihyb290LCBzdGFydCArIHN0YXJ0T2Zmc2V0LCBlbmQgKyBlbmRPZmZzZXQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21TZWxlY3Rvcihyb290LCBzZWxlY3RvciA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Iocm9vdCwgc2VsZWN0b3Iuc3RhcnQsIHNlbGVjdG9yLmVuZCk7XG4gIH1cblxuICB0b1JhbmdlKCkge1xuICAgIGxldCByb290ID0gdGhpcy5yb290O1xuICAgIGxldCBkb2N1bWVudCA9IHJvb3Qub3duZXJEb2N1bWVudDtcbiAgICBsZXQgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGxldCBpdGVyID0gY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QsIFNIT1dfVEVYVCk7XG5cbiAgICBsZXQge3N0YXJ0LCBlbmR9ID0gdGhpcztcbiAgICBsZXQgY291bnQgPSBzZWVrKGl0ZXIsIHN0YXJ0KTtcbiAgICBsZXQgcmVtYWluZGVyID0gc3RhcnQgLSBjb3VudDtcblxuICAgIGlmIChpdGVyLnBvaW50ZXJCZWZvcmVSZWZlcmVuY2VOb2RlKSB7XG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLnJlZmVyZW5jZU5vZGUsIHJlbWFpbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBpdGVyYXRvciBhZHZhbmNlZCBpdCB3aWxsIGJlIGxlZnQgd2l0aCBpdHMgcG9pbnRlciBhZnRlciB0aGVcbiAgICAgIC8vIHJlZmVyZW5jZSBub2RlLiBUaGUgbmV4dCBub2RlIHRoYXQgaXMgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgcmFuZ2UuXG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgICBpdGVyLnByZXZpb3VzTm9kZSgpOyAgLy8gUmV3aW5kIHNvIGFzIG5vdCB0byBjaGFuZ2UgdGhlIG5leHQgcmVzdWx0LlxuICAgIH1cblxuICAgIGxldCBsZW5ndGggPSAoZW5kIC0gc3RhcnQpICsgcmVtYWluZGVyO1xuICAgIGNvdW50ID0gc2VlayhpdGVyLCBsZW5ndGgpO1xuICAgIHJlbWFpbmRlciA9IGxlbmd0aCAtIGNvdW50O1xuXG4gICAgaWYgKGl0ZXIucG9pbnRlckJlZm9yZVJlZmVyZW5jZU5vZGUpIHtcbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLnJlZmVyZW5jZU5vZGUsIHJlbWFpbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNhbWUgYXMgYWJvdmUsIGJ1dCBubyBuZWVkIHRvIHJld2luZC5cbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9XG5cbiAgdG9TZWxlY3RvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1RleHRQb3NpdGlvblNlbGVjdG9yJyxcbiAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4vIn0=