import createNodeIterator from 'dom-node-iterator'
import seek from 'dom-seek'

const SHOW_TEXT = 4
const TEXT_NODE = 3


export function fromRange(root, range) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"')
  }
  if (range === undefined) {
    throw new Error('missing required parameter "range"')
  }

  let startNode = range.startContainer
  let startOffset = range.startOffset

  // Drill down to a text node if the range starts at the container boundary.
  if (startNode.nodeType !== TEXT_NODE) {
    if (startOffset === startNode.childNodes.length) {
      startNode = startNode.childNodes[startOffset - 1]
      startNode = getFirstTextNode(startNode)
      startOffset = startNode.textContent.length
    } else {
      startNode = startNode.childNodes[startOffset]
      startNode = getFirstTextNode(startNode)
      startOffset = 0
    }
  }

  let endNode = range.endContainer
  let endOffset = range.endOffset

  // Drill down to a text node if the range ends at the container boundary.
  if (endNode.nodeType !== TEXT_NODE) {
    if (endOffset === endNode.childNodes.length) {
      endNode = endNode.childNodes[endOffset - 1]
      endNode = getFirstTextNode(endNode)
      endOffset = endNode.textContent.length
    } else {
      endNode = endNode.childNodes[endOffset]
      endNode = getFirstTextNode(endNode)
      endOffset = 0
    }
  }

  let iter = createNodeIterator(root, SHOW_TEXT)
  let start = seek(iter, startNode)
  let end = start + seek(iter, endNode)

  return {
    type: 'TextPositionSelector',
    start: start + startOffset,
    end: end + endOffset,
  }
}


export function toRange(root, selector = {}) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"')
  }

  let document = root.ownerDocument
  let range = document.createRange()
  let iter = createNodeIterator(root, SHOW_TEXT)

  let start = selector.start || 0
  let end = selector.end || start
  let count = seek(iter, start)
  let remainder = start - count

  if (iter.pointerBeforeReferenceNode) {
    range.setStart(iter.referenceNode, remainder)
  } else {
    range.setStart(iter.nextNode(), remainder)
    iter.previousNode()
  }

  let length = (end - start) + remainder
  count = seek(iter, length)
  remainder = length - count

  if (iter.pointerBeforeReferenceNode) {
    range.setEnd(iter.referenceNode, remainder)
  } else {
    range.setEnd(iter.nextNode(), remainder)
  }

  return range
}


function getFirstTextNode(node) {
  let iter = createNodeIterator(node, SHOW_TEXT)
  return iter.nextNode()
}
