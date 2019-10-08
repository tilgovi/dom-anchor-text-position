import createNodeIterator from 'dom-node-iterator'
import seek from 'dom-seek'

import rangeToString from './range-to-string'

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

  let start = rangeToString(prefix).length
  let end = start + rangeToString(range).length

  return {
    start: start,
    end: end,
  }
}


export function toRange(root, selector = {}) {
  if (root === undefined) {
    throw new Error('missing required parameter "root"')
  }

  const document = root.ownerDocument
  const range = document.createRange()
  const iter = createNodeIterator(root, SHOW_TEXT)

  const start = selector.start || 0
  const end = selector.end || start

  const startOffset = start - seek(iter, start);
  const startNode = iter.referenceNode;

  const remainder = end - start + startOffset;

  const endOffset = remainder - seek(iter, remainder);
  const endNode = iter.referenceNode;

  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)

  return range
}
