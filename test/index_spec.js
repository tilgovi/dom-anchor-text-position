import TextPositionAnchor from '../TextPositionAnchor';

describe('TextPositionAnchor', () => {
  before(() => {
    fixture.setBase('test/fixtures');
  });

  beforeEach(() => {
    fixture.load('test.html');
  });

  afterEach(() => {
    fixture.cleanup();
  });

  describe('constructor', () => {
    it('is a function', () => {
      assert.isFunction(TextPositionAnchor);
    });

    it('requires a root argument', () => {
      let construct = () => new TextPositionAnchor();
      assert.throws(construct, 'required parameter');
    });

    it('requires a start argument', () => {
      let construct = () => new TextPositionAnchor(fixture.el);
      assert.throws(construct, 'required parameter');
    });

    it('requires an end argument', () => {
      let construct = () => new TextPositionAnchor(fixture.el, 100);
      assert.throws(construct, 'required parameter');
    });

    it('constructs a new instance with the given parameters', () => {
      let anchor = new TextPositionAnchor(fixture.el, 100, 150);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(anchor.root, fixture.el);
      assert.equal(anchor.start, 100);
      assert.equal(anchor.end, 150);
    });
  });

  describe('fromRange', () => {
    it('requires a root argument', () => {
      let construct = () => TextPositionAnchor.fromRange();
      assert.throws(construct, 'required parameter');
    });

    it('requires a range argument', () => {
      let construct = () => TextPositionAnchor.fromRange(fixture.el);
      assert.throws(construct, 'required parameter');
    });

    it('can describe a whole, single text node', () => {
      let root = fixture.el;
      let range = document.createRange();
      let codeNode = root.querySelector('code');
      let textNode = codeNode.childNodes[0];
      range.selectNodeContents(textNode);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, 'commodo vitae');
    });

    it('can describe part of a single text node', () => {
      let root = fixture.el;
      let range = document.createRange();
      let codeNode = root.querySelector('code');
      let textNode = codeNode.childNodes[0];
      range.setStart(textNode, 5);
      range.setEnd(textNode, 12);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, 'do vita');
    });

    it('can describe a range from one text node to another', () => {
      let root = fixture.el;
      let range = document.createRange();
      let emNode = root.querySelector('em');
      let emTextNode = emNode.childNodes[0];
      let codeNode = root.querySelector('code');
      let codeTextNode = codeNode.childNodes[0];
      range.setStart(emTextNode, 7);
      range.setEnd(codeTextNode, 7);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('');
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, expected);
    });

    it('can describe a whole, single element', () => {
      let root = fixture.el;
      let range = document.createRange();
      let node = root.querySelector('code');
      range.selectNodeContents(node);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, 'commodo vitae');
    });

    it('can describe a range between elements', () => {
      let root = fixture.el;
      let range = document.createRange();
      let emNode = root.querySelector('em');
      let codeNode = root.querySelector('code');
      range.setStartBefore(emNode);
      range.setEndAfter(codeNode);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, expected);
    });

    it('can describe a range between an element and a text node', () => {
      let root = fixture.el;
      let range = document.createRange();
      let emNode = root.querySelector('em');
      let codeNode = root.querySelector('code');
      let codeTextNode = codeNode.childNodes[0];
      range.setStartBefore(emNode);
      range.setEnd(codeTextNode, 7);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('');
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, expected);
    });

    it('can describe a range between a text node and an element', () => {
      let root = fixture.el;
      let range = document.createRange();
      let emNode = root.querySelector('em');
      let emTextNode = emNode.childNodes[0];
      let codeNode = root.querySelector('code');
      range.setStart(emTextNode, 7);
      range.setEndAfter(codeNode, 7);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, expected);
    });

    it('can describe a range that starts at the end of the container', () => {
      let root = fixture.el;
      let range = document.createRange();
      let node = root.querySelector('code');
      range.setStart(node, 1);
      let siblingList = Array.prototype.slice.call(node.parentNode.childNodes);
      let startContainerIndex = siblingList.indexOf(node);
      let nextSibling = siblingList[startContainerIndex + 1];
      range.setEnd(nextSibling, 8);
      let anchor = TextPositionAnchor.fromRange(root, range);
      let {start, end} = anchor;
      let text = root.textContent.substr(start, end - start);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert.equal(text, ', ornare');
    });
  });

  describe('fromSelector', () => {
    it('requires a root argument', () => {
      let construct = () => TextPositionAnchor.fromSelector();
      assert.throws(construct, 'required parameter');
    });

    it('requires a selector argument with start and end', () => {
      let selectors = [undefined, {}, {start: 1}, {end: 2}];
      for (let s in selectors) {
        let construct = () => TextPositionAnchor.fromSelector(fixture.el, s);
        assert.throws(construct, 'required parameter');
      }
    });

    it('returns a TextPositionAnchor from the value of the selector', () => {
      let selector = {
        start: 100,
        end: 200,
      };
      let anchor = TextPositionAnchor.fromSelector(fixture.el, selector);
      assert.instanceOf(anchor, TextPositionAnchor);
      assert(anchor.root === fixture.el);
      assert(anchor.start === selector.start);
      assert(anchor.end === selector.end);
    });
  });

  describe('toRange', () => {
    it('returns a range selecting a whole text node', () => {
      let root = fixture.el;
      let expected = 'commodo vitae';
      let start = root.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(root, start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });

    it('returns a range selecting part of a text node', () => {
      let root = fixture.el;
      let expected = 'do vit';
      let start = root.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(root, start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });

    it('returns a range selecting part of multiple text nodes', () => {
      let root = fixture.el;
      let expected = 'do vitae, ornare';
      let start = root.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(root, start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });
  });

  describe('toSelector', () => {
    it('returns a selector for the stored positions', () => {
      let anchor = new TextPositionAnchor(fixture.el, 100, 200);
      let selector = anchor.toSelector();
      assert.equal(selector.type, 'TextPositionSelector');
      assert.equal(selector.start, 100);
      assert.equal(selector.end, 200);
    });
  });
});
