import TextPositionAnchor from '../dom-anchor-text-position'

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

  it('is a function', () => {
    assert.isFunction(TextPositionAnchor);
  });

  describe('fromRange', () => {
    it('requires a range argument', () => {
      let construct = () => TextPositionAnchor.fromRange();
      assert.throws(construct, 'required parameter');
    });

    it('can describe a whole, single text node', () => {
      let range = global.document.createRange();
      let codeNode = global.document.getElementsByTagName('code')[0];
      let textNode = codeNode.childNodes[0];
      range.selectNodeContents(textNode);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      assert.equal(text, 'commodo vitae');
    });

    it('can describe part of a single text node', () => {
      let range = global.document.createRange();
      let codeNode = global.document.getElementsByTagName('code')[0];
      let textNode = codeNode.childNodes[0];
      range.setStart(textNode, 5);
      range.setEnd(textNode, 12);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      assert.equal(text, 'do vita');
    });

    it('can describe a range from one text node to another', () => {
      let range = global.document.createRange();
      let emNode = global.document.getElementsByTagName('em')[0];
      let emTextNode = emNode.childNodes[0];
      let codeNode = global.document.getElementsByTagName('code')[0];
      let codeTextNode = codeNode.childNodes[0];
      range.setStart(emTextNode, 7);
      range.setEnd(codeTextNode, 7);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('');
      assert.equal(text, expected);
    });

    it('can describe a range between elements', () => {
      let range = global.document.createRange();
      let emNode = global.document.getElementsByTagName('em')[0];
      let codeNode = global.document.getElementsByTagName('code')[0];
      range.setStartBefore(emNode);
      range.setEndAfter(codeNode);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      assert.equal(text, expected);
    });

    it('can describe a range between an element and a text node', () => {
      let range = global.document.createRange();
      let emNode = global.document.getElementsByTagName('em')[0];
      let codeNode = global.document.getElementsByTagName('code')[0];
      let codeTextNode = codeNode.childNodes[0];
      range.setStartBefore(emNode);
      range.setEnd(codeTextNode, 7);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      let expected = [
        'Aenean ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo',
      ].join('');
      assert.equal(text, expected);
    });

    it('can describe a range between a text node and an element', () => {
      let range = global.document.createRange();
      let emNode = global.document.getElementsByTagName('em')[0];
      let emTextNode = emNode.childNodes[0];
      let codeNode = global.document.getElementsByTagName('code')[0];
      range.setStart(emTextNode, 7);
      range.setEndAfter(codeNode, 7);
      let anchor = TextPositionAnchor.fromRange(range);
      let {start, end} = anchor;
      let text = global.document.body.textContent.substr(start, end - start);
      let expected = [
        'ultricies mi vitae est.',
        ' Mauris placerat eleifend\n  leo. Quisque sit amet est',
        ' et sapien ullamcorper pharetra. Vestibulum erat\n',
        '  wisi, condimentum sed, commodo vitae',
      ].join('');
      assert.equal(text, expected);
    });
  });

  describe('fromSelector', () => {
    it('requires a selector argument', () => {
      let construct = () => TextPositionAnchor.fromSelector();
      assert.throws(construct, 'required parameter');
    });

    it('returns a TextPosition from the value of the selector', () => {
      let selector = {
        start: 100,
        end: 200,
      };
      let anchor = TextPositionAnchor.fromSelector(selector);
      assert(anchor.start === selector.start);
      assert(anchor.end === selector.end);
    });
  });

  describe('toRange', () => {
    it('returns a range selecting a whole text node', () => {
      let expected = 'commodo vitae';
      let start = global.document.body.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });

    it('returns a range selecting part of a text node', () => {
      let expected = 'do vit';
      let start = global.document.body.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });

    it('returns a range selecting part of multiple text nodes', () => {
      let expected = 'do vitae, ornare';
      let start = global.document.body.textContent.indexOf(expected);
      let end = start + expected.length;
      let anchor = new TextPositionAnchor(start, end);
      let range = anchor.toRange();
      let text = range.toString();
      assert.equal(text, expected);
    });
  });

  describe('toSelector', () => {
    it('returns a selector for the stored positions', () => {
      let anchor = new TextPositionAnchor(100, 200);
      let selector = anchor.toSelector();
      assert.equal(selector.type, 'TextPositionSelector');
      assert.equal(selector.start, 100);
      assert.equal(selector.end, 200);
    });
  });
});
