const unescapeStrings = require('../../../src/middleware/unescape-strings');

describe('middleware/unescape-strings', () => {
  const req = {
    session: {
      inputOne: 'A sentence with an example of a URL &quot;https://www.example.com/&quot;.',
      inputTwo: `&lt; &gt; &amp; &quot; &#39;`,
    }
  };
  const next = jest.fn();

  const expected = {
    inputOne: 'A sentence with an example of a URL "https://www.example.com/".',
    inputTwo: `< > & " '`
  };

  unescapeStrings('session', ['inputOne', 'inputTwo'])(req, {}, next);

  test(`unescape strings`, () => {
		expect(req.session.inputOne).toEqual(expected.inputOne);
    expect(req.session.inputTwo).toEqual(expected.inputTwo);
	});
});
