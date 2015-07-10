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
  });
});
