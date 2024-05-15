const {
	normaliseArrayQueryParams,
	parseIntegerQueryParams,
	parseIntegerPathParams,
	parseBooleanQueryParams
} = require('../../../src/middleware/parseParamProperties');

describe('parseQueryParamProperties middleware', () => {
	describe('normaliseArrayQueryParams', () => {
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
				query: {}
			};
			normaliseArrayQueryParams(['foo'])(req, {}, jest.fn());

			expect(req).toEqual({
				query: {}
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

		it('converts empty string to empty array', () => {
			const req = {
				query: {
					foo: ''
				}
			};
			normaliseArrayQueryParams(['foo'])(req, {}, jest.fn());
			expect(req).toEqual({
				query: {
					foo: []
				}
			});
		});
	});

	describe('parseIntegerQueryParams', () => {
		it('parses given query params values to integer', () => {
			const req = {
				query: {
					foo: '1',
					bar: '123'
				}
			};
			parseIntegerQueryParams(['foo', 'bar'])(req, {}, jest.fn());

			expect(req).toEqual({
				query: {
					foo: 1,
					bar: 123
				}
			});
		});
	});

	describe('parseIntegerPathParams', () => {
		it('parses given path params values to integer', () => {
			const req = {
				params: {
					foo: '1',
					bar: '123'
				}
			};
			parseIntegerPathParams(['foo', 'bar'])(req, {}, jest.fn());

			expect(req).toEqual({
				params: {
					foo: 1,
					bar: 123
				}
			});
		});
	});

	describe('parseBooleanQueryParams', () => {
		it('parses given query params values to booleans', () => {
			const req = {
				query: {
					foo: 'true',
					bar: 'false'
				}
			};
			parseBooleanQueryParams(['foo', 'bar'])(req, {}, jest.fn());

			expect(req).toEqual({
				query: {
					foo: true,
					bar: false
				}
			});
		});
	});
});
