const { parseFormDataProperties } = require('../../../src/middleware/parseFormDataProperties');

describe('request middleware', () => {
	const res = jest.fn();
	const next = jest.fn();

	describe('parseFormDataProperties', () => {
		it('should parse string representations of numbers and booleans in the request body', () => {
			const req = {
				body: {
					name: 'Foo',
					isActive: 'true',
					numberOfThings: '1'
				}
			};

			parseFormDataProperties(['isActive'], ['numberOfThings'])(req, res, next);

			expect(req.body.isActive).toEqual(true);
			expect(req.body.numberOfThings).toEqual(1);
		});
	});
});
