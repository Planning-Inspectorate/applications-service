const { normaliseArrayQueryParams } = require('../../../src/middleware/normaliseArrayQueryParams');

describe('normaliseArrayQueryParams middleware', () => {
	it('coerces specified non-array query param into array', () => {
		const req = {
			query: {
				foo: 'a'
			}
		};
		normaliseArrayQueryParams(['foo'])(req, {}, jest.fn());

		expect(req).toEqual({
			query: {
				foo: ['a']
			}
		});
	});

	it('does not modify query param if does not exist', () => {
		const req = {
			query: {
			}
		};
		normaliseArrayQueryParams(['foo'])(req, {}, jest.fn());

		expect(req).toEqual({
			query: {
			}
		});
	});

	it('does not modify query param if it is already an array', () => {
		const req = {
			query: {
				foo: ['a', 'b']
			}
		};
		normaliseArrayQueryParams(['foo'])(req, {}, jest.fn());

		expect(req).toEqual({
			query: {
				foo: ['a', 'b']
			}
		});
	});
});
