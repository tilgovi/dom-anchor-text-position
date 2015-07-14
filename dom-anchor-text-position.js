import seek from 'dom-seek'


function getFirstTextNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return node;
  let walker = global.document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
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

    let iter = global.document.createNodeIterator(root, NodeFilter.SHOW_TEXT);

    let start = seek(iter, startNode);
    let end = start + seek(iter, endNode);

    return new TextPositionAnchor(root, start + startOffset, end + endOffset);
  }

  static fromSelector(root, selector = {}) {
    return new TextPositionAnchor(root, selector.start, selector.end);
  }

  toRange() {
    let root = this.root;
    let range = global.document.createRange();
    let iter = global.document.createNodeIterator(root, NodeFilter.SHOW_TEXT);

    let {start, end} = this;
    let count = seek(iter, start);
    let remainder = start - count;

    if (iter.pointerBeforeReferenceNode) {
      range.setStart(iter.referenceNode, remainder);
    } else {
      range.setStart(iter.nextNode(), remainder);
      iter.previousNode();
    }

    let length = (end - start) + remainder;

    count = seek(iter, length);
    remainder = length - count;

    if (iter.pointerBeforeReferenceNode) {
      range.setEnd(iter.referenceNode, remainder);
    } else {
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
