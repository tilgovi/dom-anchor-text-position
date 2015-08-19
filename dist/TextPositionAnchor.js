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
    var document = node.ownerDocument;
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
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
        var iter = document.createNodeIterator(root, NodeFilter.SHOW_TEXT);

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
        var iter = document.createNodeIterator(root, NodeFilter.SHOW_TEXT);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHRQb3NpdGlvbkFuY2hvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFdBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2xELFFBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDbEMsUUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkUsV0FBTyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDNUI7O01BR29CLGtCQUFrQjtBQUMxQixhQURRLGtCQUFrQixDQUN6QixJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTs0QkFEWCxrQkFBa0I7O0FBRW5DLFVBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN0QixjQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7T0FDdEQ7QUFDRCxVQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsY0FBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO09BQ3ZEO0FBQ0QsVUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3JCLGNBQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztPQUNyRDtBQUNELFVBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ2hCOztpQkFka0Isa0JBQWtCOzthQW9FOUIsbUJBQUc7QUFDUixZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLFlBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFD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QyxNQUFNLEVBQUU7QUFDM0MsbUJBQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1QyxtQkFBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLHFCQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7V0FDeEMsTUFBTTtBQUNMLG1CQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QyxtQkFBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLHFCQUFTLEdBQUcsQ0FBQyxDQUFDO1dBQ2Y7U0FDRjs7QUFFRCxZQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0FBQ2xDLFlBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25FLFlBQUksS0FBSyxHQUFHLHNCQUFLLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNsQyxZQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsc0JBQUssSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUV0QyxlQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxXQUFXLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO09BQzNFOzs7YUFFa0Isc0JBQUMsSUFBSSxFQUFpQjtZQUFmLFFBQVEseURBQUcsRUFBRTs7QUFDckMsZUFBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNuRTs7O1dBbEVrQixrQkFBa0I7OzttQkFBbEIsa0JBQWtCIiwiZmlsZSI6IlRleHRQb3NpdGlvbkFuY2hvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZWVrIGZyb20gJ2RvbS1zZWVrJztcblxuXG5mdW5jdGlvbiBnZXRGaXJzdFRleHROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gbm9kZTtcbiAgbGV0IGRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICBsZXQgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCk7XG4gIHJldHVybiB3YWxrZXIuZmlyc3RDaGlsZCgpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRQb3NpdGlvbkFuY2hvciB7XG4gIGNvbnN0cnVjdG9yKHJvb3QsIHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwic3RhcnRcIicpO1xuICAgIH1cbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyByZXF1aXJlZCBwYXJhbWV0ZXIgXCJlbmRcIicpO1xuICAgIH1cbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmFuZ2Uocm9vdCwgcmFuZ2UpIHtcbiAgICBpZiAocm9vdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicm9vdFwiJyk7XG4gICAgfVxuICAgIGlmIChyYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVyIFwicmFuZ2VcIicpO1xuICAgIH1cblxuICAgIGxldCBzdGFydE5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcbiAgICBsZXQgc3RhcnRPZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIHN0YXJ0cyBhdCB0aGUgY29udGFpbmVyIGJvdW5kYXJ5LlxuICAgIGlmIChzdGFydE5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICBpZiAoc3RhcnRPZmZzZXQgPT09IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUuY2hpbGROb2Rlc1tzdGFydE9mZnNldCAtIDFdO1xuICAgICAgICBzdGFydE5vZGUgPSBnZXRGaXJzdFRleHROb2RlKHN0YXJ0Tm9kZSk7XG4gICAgICAgIHN0YXJ0T2Zmc2V0ID0gc3RhcnROb2RlLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZS5jaGlsZE5vZGVzW3N0YXJ0T2Zmc2V0XTtcbiAgICAgICAgc3RhcnROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShzdGFydE5vZGUpO1xuICAgICAgICBzdGFydE9mZnNldCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IGVuZE9mZnNldCA9IHJhbmdlLmVuZE9mZnNldDtcblxuICAgIC8vIERyaWxsIGRvd24gdG8gYSB0ZXh0IG5vZGUgaWYgdGhlIHJhbmdlIGVuZHMgYXQgdGhlIGNvbnRhaW5lciBib3VuZGFyeS5cbiAgICBpZiAoZW5kTm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgIGlmIChlbmRPZmZzZXQgPT09IGVuZE5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXQgLSAxXTtcbiAgICAgICAgZW5kTm9kZSA9IGdldEZpcnN0VGV4dE5vZGUoZW5kTm9kZSk7XG4gICAgICAgIGVuZE9mZnNldCA9IGVuZE5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUuY2hpbGROb2Rlc1tlbmRPZmZzZXRdO1xuICAgICAgICBlbmROb2RlID0gZ2V0Rmlyc3RUZXh0Tm9kZShlbmROb2RlKTtcbiAgICAgICAgZW5kT2Zmc2V0ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnQ7XG4gICAgbGV0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xuICAgIGxldCBzdGFydCA9IHNlZWsoaXRlciwgc3RhcnROb2RlKTtcbiAgICBsZXQgZW5kID0gc3RhcnQgKyBzZWVrKGl0ZXIsIGVuZE5vZGUpO1xuXG4gICAgcmV0dXJuIG5ldyBUZXh0UG9zaXRpb25BbmNob3Iocm9vdCwgc3RhcnQgKyBzdGFydE9mZnNldCwgZW5kICsgZW5kT2Zmc2V0KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tU2VsZWN0b3Iocm9vdCwgc2VsZWN0b3IgPSB7fSkge1xuICAgIHJldHVybiBuZXcgVGV4dFBvc2l0aW9uQW5jaG9yKHJvb3QsIHNlbGVjdG9yLnN0YXJ0LCBzZWxlY3Rvci5lbmQpO1xuICB9XG5cbiAgdG9SYW5nZSgpIHtcbiAgICBsZXQgcm9vdCA9IHRoaXMucm9vdDtcbiAgICBsZXQgZG9jdW1lbnQgPSByb290Lm93bmVyRG9jdW1lbnQ7XG4gICAgbGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICBsZXQgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihyb290LCBOb2RlRmlsdGVyLlNIT1dfVEVYVCk7XG5cbiAgICBsZXQge3N0YXJ0LCBlbmR9ID0gdGhpcztcbiAgICBsZXQgY291bnQgPSBzZWVrKGl0ZXIsIHN0YXJ0KTtcbiAgICBsZXQgcmVtYWluZGVyID0gc3RhcnQgLSBjb3VudDtcblxuICAgIGlmIChpdGVyLnBvaW50ZXJCZWZvcmVSZWZlcmVuY2VOb2RlKSB7XG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLnJlZmVyZW5jZU5vZGUsIHJlbWFpbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHRoZSBpdGVyYXRvciBhZHZhbmNlZCBpdCB3aWxsIGJlIGxlZnQgd2l0aCBpdHMgcG9pbnRlciBhZnRlciB0aGVcbiAgICAgIC8vIHJlZmVyZW5jZSBub2RlLiBUaGUgbmV4dCBub2RlIHRoYXQgaXMgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgcmFuZ2UuXG4gICAgICByYW5nZS5zZXRTdGFydChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgICBpdGVyLnByZXZpb3VzTm9kZSgpOyAgLy8gUmV3aW5kIHNvIGFzIG5vdCB0byBjaGFuZ2UgdGhlIG5leHQgcmVzdWx0LlxuICAgIH1cblxuICAgIGxldCBsZW5ndGggPSAoZW5kIC0gc3RhcnQpICsgcmVtYWluZGVyO1xuICAgIGNvdW50ID0gc2VlayhpdGVyLCBsZW5ndGgpO1xuICAgIHJlbWFpbmRlciA9IGxlbmd0aCAtIGNvdW50O1xuXG4gICAgaWYgKGl0ZXIucG9pbnRlckJlZm9yZVJlZmVyZW5jZU5vZGUpIHtcbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLnJlZmVyZW5jZU5vZGUsIHJlbWFpbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNhbWUgYXMgYWJvdmUsIGJ1dCBubyBuZWVkIHRvIHJld2luZC5cbiAgICAgIHJhbmdlLnNldEVuZChpdGVyLm5leHROb2RlKCksIHJlbWFpbmRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9XG5cbiAgdG9TZWxlY3RvcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ1RleHRQb3NpdGlvblNlbGVjdG9yJyxcbiAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmVuZCxcbiAgICB9O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii4vIn0=