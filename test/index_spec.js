import {fromRange, toRange} from '../src'

describe('textPosition', () => {
  before(() => fixture.setBase('test/fixtures'))
  beforeEach(() => fixture.load('test.html'))
  afterEach(() => fixture.cleanup())

  describe('fromRange', () => {
    it('requires a root argument', () => {
      let construct = () => fromRange()
      assert.throws(construct, 'required parameter')
    })

    it('requires a range argument', () => {
      let construct = () => fromRange(fixture.el)
      assert.throws(construct, 'required parameter')
    })

    it('can describe a whole, single text node', () => {
      let root = fixture.el
      let range = document.createRange()
      let codeNode = root.querySelector('code')
      let textNode = codeNode.childNodes[0]
      range.selectNodeContents(textNode)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, 'commodo vitae')
    })

    it('can describe part of a single text node', () => {
      let root = fixture.el
      let range = document.createRange()
      let codeNode = root.querySelector('code')
      let textNode = codeNode.childNodes[0]
      range.setStart(textNode, 5)
      range.setEnd(textNode, 12)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, 'do vita')
    })

    it('can describe a range from one text node to another', () => {
      let root = fixture.el
      let range = document.createRange()
      let emNode = root.querySelector('em')
      let emTextNode = emNode.childNodes[0]
      let codeNode = root.querySelector('code')
      let codeTextNode = codeNode.childNodes[0]
      range.setStart(emTextNode, 7)
      range.setEnd(codeTextNode, 7)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('')
      assert.equal(text, expected)
    })

    it('can describe a whole, single element', () => {
      let root = fixture.el
      let range = document.createRange()
      let node = root.querySelector('code')
      range.selectNodeContents(node)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, 'commodo vitae')
    })

    it('can describe a range between elements', () => {
      let root = fixture.el
      let range = document.createRange()
      let emNode = root.querySelector('em')
      let codeNode = root.querySelector('code')
      range.setStartBefore(emNode)
      range.setEndAfter(codeNode)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('')
      assert.equal(text, expected)
    })

    it('can describe a range between an element and a text node', () => {
      let root = fixture.el
      let range = document.createRange()
      let emNode = root.querySelector('em')
      let codeNode = root.querySelector('code')
      let codeTextNode = codeNode.childNodes[0]
      range.setStartBefore(emNode)
      range.setEnd(codeTextNode, 7)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('')
      assert.equal(text, expected)
    })

    it('can describe a range between a text node and an element', () => {
      let root = fixture.el
      let range = document.createRange()
      let emNode = root.querySelector('em')
      let emTextNode = emNode.childNodes[0]
      let codeNode = root.querySelector('code')
      range.setStart(emTextNode, 7)
      range.setEndAfter(codeNode, 7)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('')
      assert.equal(text, expected)
    })

    it('can describe a range starting at an empty element', () => {
      let root = fixture.el
      let range = document.createRange()
      let hrEl = root.querySelector('hr')
      range.setStart(hrEl, 0)
      range.setEnd(hrEl.nextSibling.firstChild, 16)
      let {start, end} = fromRange(root, range)
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, 'Praesent dapibus')
    });

    it('can describe a range ending at an empty element', () => {
      let root = fixture.el
      let range = document.createRange()
      let hrEl = root.querySelector('hr')
      let prevText = hrEl.previousSibling.lastChild
      range.setStart(prevText, prevText.textContent.length - 9)
      range.setEnd(hrEl, 0)
      let {start, end} = fromRange(root, range)
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, 'Ut felis.')
    });

    it('can describe a range beginning at the end of a non-empty element', () => {
      let root = fixture.el
      let range = document.createRange()
      let strongEl = root.querySelector('strong')
      range.setStart(strongEl, 1)
      range.setEnd(strongEl.nextSibling, 9)
      let {start, end} = fromRange(root, range)
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, ' senectus')
    });

    it('can describe a collapsed range', () => {
      let root = fixture.el
      let range = document.createRange()
      let strongEl = root.querySelector('strong')
      range.setStart(strongEl.firstChild, 10)
      range.setEnd(strongEl.firstChild, 5)
      let {start, end} = fromRange(root, range)
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, '')
    });
  })

  describe('toRange', () => {
    it('requires a root argument', () => {
      let construct = () => toRange()
      assert.throws(construct, 'required parameter')
    })

    it('returns a range selecting a whole text node', () => {
      let root = fixture.el
      let expected = 'commodo vitae'
      let start = root.textContent.indexOf(expected)
      let end = start + expected.length
      let range = toRange(root, {start, end})
      let text = range.toString()
      assert.equal(text, expected)
    })

    it('returns a range selecting part of a text node', () => {
      let root = fixture.el
      let expected = 'do vit'
      let start = root.textContent.indexOf(expected)
      let end = start + expected.length
      let range = toRange(root, {start, end})
      let text = range.toString()
      assert.equal(text, expected)
    })

    it('returns a range selecting part of multiple text nodes', () => {
      let root = fixture.el
      let expected = 'do vitae, ornare'
      let start = root.textContent.indexOf(expected)
      let end = start + expected.length
      let range = toRange(root, {start, end})
      let text = range.toString()
      assert.equal(text, expected)
    })

    it('defaults to a collapsed range', () => {
      let range = toRange(fixture.el)
      assert.isTrue(range.collapsed)
    })

    it('returns a range selecting the first text of the root element', () => {
      let root = fixture.el
      let expected = 'Pellentesque'
      let start = 0
      let end = expected.length
      let range = toRange(root, {start, end})
      let text = range.toString()
      assert.equal(text, expected)
    })

    it('returns a range selecting the last text of the root element', () => {
      let root = fixture.el
      let expected = 'erat.'
      let end = root.textContent.length
      let start = end - 5
      let range = toRange(root, {start, end})
      let text = range.toString()
      assert.equal(text, expected)
    })

    it('returns an empty range selecting the end of the root element', () => {
      let root = fixture.el
      let end = root.textContent.length
      let range = toRange(root, {start: end, end})
      let text = range.toString()
      assert.equal(text, '')
    })

    it('throws an error if the start offset is out of range', () => {
      let root = fixture.el
      assert.throws(() => {
        let start = 10000
        let end = start + 1
        toRange(root, {start, end})
      }, RangeError)
    })

    it('throws an error if the end offset is out of range', () => {
      let root = fixture.el
      assert.throws(() => {
        let start = 0
        let end = 10000
        toRange(root, {start, end})
      }, RangeError)
    })

    it('handles an empty root element', () => {
      let root = document.createElement('div');

      // This case throws to preserve the invariant that the returned `Range`
      // always has a text node as the `startContainer` and `endContainer`.
      assert.throws(() => {
        toRange(root, {start:0, end: 0})
      }, RangeError);
    })

    it('handles a root element with an empty text node', () => {
      let root = document.createElement('div');
      root.appendChild(document.createTextNode(''))
      let range = toRange(root, {start:0, end: 0})
      assert.equal(range.toString(), '')
    })

    it('handles an `end` offset less than the `start` offset', () => {
      let root = fixture.el
      let expected = 'do vit'
      let start = root.textContent.indexOf(expected)
      let end = start + expected.length
      let range = toRange(root, {start: end, end: start})
      let text = range.toString()

      // This case could reasonably throw or simply return a collapsed range.
      // It returns a collapsed range as that seems like it would be more
      // convenient for the caller.
      assert.equal(text, '')
    })
  })
})
