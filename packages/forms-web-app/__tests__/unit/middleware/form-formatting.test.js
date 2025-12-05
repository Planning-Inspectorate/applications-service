const formFormatting = require('../../../src/middleware/form-formatting');

describe('middleware/form-formatting', () => {
	let req = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		}
	};
	const next = jest.fn();

	describe('format POSTed form data:', () => {
		it(`should normalise spacing`, () => {
			req = {
				...req,
				body: {
					inputOne: '  test string with leading, trailing and mid sentence       spaces   '
				}
			};
			formFormatting()(req, {}, next);

			expect(req.body.inputOne).toEqual(
				'test string with leading, trailing and mid sentence spaces'
			);
		});

		it(`should normalise line breaks`, () => {
			req = {
				...req,
				body: {
					inputOne: 'test\n\n\n\n\n string with too many newlines'
				}
			};
			formFormatting()(req, {}, next);

			expect(req.body.inputOne).toBe('test\n\nstring with too many newlines');
		});
	});

	it(`should NOT apply form formatting to GET request`, () => {
		req = {
			...req,
			method: 'GET',
			body: {
				inputOne: '  test string with leading and trailing spaces   '
			}
		};
		formFormatting()(req, {}, next);

		expect(req.body.inputOne).toEqual(req.body.inputOne);
	});
});
