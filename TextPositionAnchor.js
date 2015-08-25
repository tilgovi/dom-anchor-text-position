import createNodeIterator from 'node-iterator-shim';
import seek from 'dom-seek';

const SHOW_TEXT = NodeFilter.SHOW_TEXT;


function getFirstTextNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return node;
  let document = node.ownerDocument;
  let walker = document.createTreeWalker(node, SHOW_TEXT, null, false);
  return walker.firstChild();
}


export default class TextPositionAnchor {
  constructor(root, start, end) {
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

  static fromRange(root, range) {
    if (root === undefined) {
      throw new Error('missing required parameter "root"');
    }
    if (range === undefined) {
      throw new Error('missing required parameter "range"');
    }

    let startNode = range.startContainer;
    let startOffset = range.startOffset;

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

    let endNode = range.endContainer;
    let endOffset = range.endOffset;

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

    let iter = createNodeIterator(root, SHOW_TEXT);
    let start = seek(iter, startNode);
    let end = start + seek(iter, endNode);

    return new TextPositionAnchor(root, start + startOffset, end + endOffset);
  }

  static fromSelector(root, selector = {}) {
    return new TextPositionAnchor(root, selector.start, selector.end);
  }

  toRange() {
    let root = this.root;
    let document = root.ownerDocument;
    let range = document.createRange();
    let iter = createNodeIterator(root, SHOW_TEXT);

    let {start, end} = this;
    let count = seek(iter, start);
    let remainder = start - count;

    if (iter.pointerBeforeReferenceNode) {
      range.setStart(iter.referenceNode, remainder);
    } else {
      // If the iterator advanced it will be left with its pointer after the
      // reference node. The next node that is needed to create the range.
      range.setStart(iter.nextNode(), remainder);
      iter.previousNode();  // Rewind so as not to change the next result.
    }

    let length = (end - start) + remainder;
    count = seek(iter, length);
    remainder = length - count;

    if (iter.pointerBeforeReferenceNode) {
      range.setEnd(iter.referenceNode, remainder);
    } else {
      // Same as above, but no need to rewind.
      range.setEnd(iter.nextNode(), remainder);
    }

    return range;
  }

  toSelector() {
    return {
      type: 'TextPositionSelector',
      start: this.start,
      end: this.end,
    };
  }
}
