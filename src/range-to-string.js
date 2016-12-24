/* global Node */

/**
 * Return the next node after `node` in a tree order traversal of the document.
 */
function nextNode(node, skipChildren) {
  if (!skipChildren && node.firstChild) {
    return node.firstChild
  }

  do {
    if (node.nextSibling) {
      return node.nextSibling
    }
    node = node.parentNode
  } while (node)

  /* istanbul ignore next */
  return node
}

function firstNode(range) {
  if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
    const node = range.startContainer.childNodes[range.startOffset]
    return node || nextNode(range.startContainer, true /* skip children */)
  }
  return range.startContainer
}

function firstNodeAfter(range) {
  if (range.endContainer.nodeType === Node.ELEMENT_NODE) {
    const node = range.endContainer.childNodes[range.endOffset]
    return node || nextNode(range.endContainer, true /* skip children */)
  }
  return nextNode(range.endContainer)
}

function forEachNodeInRange(range, cb) {
  let node = firstNode(range)
  const pastEnd = firstNodeAfter(range)
  while (node !== pastEnd) {
    cb(node)
    node = nextNode(node)
  }
}

/**
 * A ponyfill for Range.toString().
 * Spec: https://dom.spec.whatwg.org/#dom-range-stringifier
 *
 * Works around the buggy Range.toString() implementation in IE and Edge.
 * See https://github.com/tilgovi/dom-anchor-text-position/issues/4
 */
export default function rangeToString(range) {
  // This is a fairly direct translation of the Range.toString() implementation
  // in Blink.
  let text = ''
  forEachNodeInRange(range, (node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      return
    }
    const start = node === range.startContainer ? range.startOffset : 0
    const end = node === range.endContainer ? range.endOffset : node.textContent.length
    text += node.textContent.slice(start, end)
  })
  return text
}

