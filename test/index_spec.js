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

    it('can describe a range that starts at the end of the container', () => {
      let root = fixture.el
      let range = document.createRange()
      let node = root.querySelector('code')
      range.setStart(node, 1)
      let siblingList = Array.prototype.slice.call(node.parentNode.childNodes)
      let startContainerIndex = siblingList.indexOf(node)
      let nextSibling = siblingList[startContainerIndex + 1]
      range.setEnd(nextSibling, 8)
      let anchor = fromRange(root, range)
      let {start, end} = anchor
      let text = root.textContent.substr(start, end - start)
      assert.equal(text, ', ornare')
    })
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
      let root = fixture.el
      let range = toRange(root)
      let text = range.toString()
      assert.equal(text, '')
      assert.isTrue(range.collapsed)
    })
  })
})
