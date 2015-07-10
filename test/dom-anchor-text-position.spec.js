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
});
