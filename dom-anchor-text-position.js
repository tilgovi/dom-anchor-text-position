import seek from 'dom-seek'


function getFirstTextNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return node;
  let walker = global.document.createTreeWalker(
    node, NodeFilter.SHOW_TEXT, null, false);
  return walker.firstChild();
}


export default class TextPositionAnchor {
  constructor(start, end) {
    if (start === undefined) {
      throw new Error('missing required parameter "start"');
    }
    if (end === undefined) {
      throw new Error('missing required parameter "end"');
    }
    this.start = start;
    this.end = end;
  }

  static fromRange(range) {
    if (range === undefined) {
      throw new Error('missing required parameter "range"');
    }

    let startNode = range.startContainer;
    let startOffset = range.startOffset;

    if (startNode.nodeType !== Node.TEXT_NODE) {
      if (startOffset > 0) {
        startNode = startNode.childNodes[startOffset];
      }
      startNode = getFirstTextNode(startNode);
      startOffset = 0;
    }

    let endNode = range.endContainer;
    let endOffset = range.endOffset;

    if (endNode.nodeType !== Node.TEXT_NODE) {
      if (endOffset > 0) {
        endNode = endNode.childNodes[endOffset];
      }
      endNode = getFirstTextNode(endNode);
      endOffset = 0;
    }

    let iter = global.document.createNodeIterator(
      global.document.body, NodeFilter.SHOW_TEXT, null, false);

    let start = seek(iter, startNode);
    let end = start + seek(iter, endNode);

    return new TextPositionAnchor(start + startOffset, end + endOffset);
  }

  static fromSelector(selector) {
    if (selector === undefined) {
      throw new Error('missing required parameter "selector"');
    }
    return new TextPositionAnchor(selector.start, selector.end);
  }

  toRange() {
    let range = global.document.createRange();
    let iter = global.document.createNodeIterator(
      global.document.body, NodeFilter.SHOW_TEXT, null, false);

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
