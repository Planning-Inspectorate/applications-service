const { parseFormDataProperties } = require('../../../src/middleware/parseFormDataProperties');

describe('request middleware', () => {
	describe('parseFormDataProperties', () => {
		it('should parse string representations of numbers and booleans in the request body', () => {
			const req = {
				body: {
					name: 'Foo',
					isActive: 'true',
					numberOfThings: '1'
				}
			};
			const res = jest.fn();
			const next = jest.fn();

			parseFormDataProperties(['isActive'], ['numberOfThings'])(req, res, next);

			expect(req.body.isActive).toEqual(true);
			expect(req.body.numberOfThings).toEqual(1);
		});
	});
});
