const formSanitisation = require('../../../src/middleware/form-sanitisation');

describe('middleware/form-sanitisation', () => {
	const baseReq = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: {
			inputOne:
				'Example%20of%20a%20String%20with%20some%20special%20characters%20which%20are%20%26%20and%20%C2%A3.',
			inputTwo: '<script>Oh no!</script>'
		}
	};
	const next = jest.fn();

	const expected = {
		inputOne: 'Example of a String with some special characters which are & and £.',
		inputTwo: 'Oh no!'
	};

	it(`should apply sanitisation for JSON POST`, () => {
		const req = {
			...baseReq
		};
		formSanitisation()(req, {}, next);

		expect(req.body.inputOne).toEqual(expected.inputOne);
		expect(req.body.inputTwo).toEqual(expected.inputTwo);
	});

	it(`should apply sanitisation for form POST`, () => {
		const req = {
			...baseReq,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		};
		formSanitisation()(req, {}, next);

		expect(req.body.inputOne).toEqual(expected.inputOne);
		expect(req.body.inputTwo).toEqual(expected.inputTwo);
	});

	it(`should not apply sanitisation for text`, () => {
		const req = {
			...baseReq,
			headers: {
				'content-type': 'plain/text'
			}
		};
		formSanitisation()(req, {}, next);

		expect(req.body.inputOne).toEqual(baseReq.body.inputOne);
		expect(req.body.inputTwo).toEqual(baseReq.body.inputTwo);
	});

	it(`should not apply sanitisation GET`, () => {
		const req = {
			...baseReq,
			method: 'GET'
		};
		formSanitisation()(req, {}, next);

		expect(req.body.inputOne).toEqual(baseReq.body.inputOne);
		expect(req.body.inputTwo).toEqual(baseReq.body.inputTwo);
	});
});
