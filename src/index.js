import createNodeIterator from 'dom-node-iterator'
import seek from 'dom-seek'

const SHOW_TEXT = 4


export function fromRange(root, range) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"')
  }
  if (range === undefined) {
    throw new Error('missing required parameter "range"')
  }

  let document = root.ownerDocument
  let prefix = document.createRange()

  let startNode = range.startContainer
  let startOffset = range.startOffset

  prefix.setStart(root, 0)
  prefix.setEnd(startNode, startOffset)

  let start = prefix.toString().length
  let end = start + range.toString().length

  return {
    start: start,
    end: end,
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
