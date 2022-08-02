const decodeUri = require('../../../src/middleware/decode-uri');

describe('middleware/decode-uri', () => {
	const req = {
		session: {
			inputOne:
				'Example%20of%20a%20String%20with%20some%20special%20characters%20which%20are%20%26%20and%20%C2%A3.',
			inputTwo: `%3C%20%3E%20%26%20%22%20'`
		}
	};
	const next = jest.fn();

	const expected = {
		inputOne: 'Example of a String with some special characters which are & and £.',
		inputTwo: `< > & " '`
	};

	decodeUri('session', ['inputOne', 'inputTwo'])(req, {}, next);

	test(`try decode uri`, () => {
		expect(req.session.inputOne).toEqual(expected.inputOne);
		expect(req.session.inputTwo).toEqual(expected.inputTwo);
	});

	decodeUri('session', null)(req, {}, next);

	test(`catch decode uri`, () => {
		expect(req.session.inputOne).toEqual(req.session.inputOne);
		expect(req.session.inputTwo).toEqual(req.session.inputTwo);
	});
});
