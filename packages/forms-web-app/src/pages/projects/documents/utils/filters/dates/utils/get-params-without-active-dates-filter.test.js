const { getParamsWithoutActiveDatesFilter } = require('./get-params-without-active-dates-filter');

describe('projects/documents/utils/filters/dates/utils/get-params-without-active-dates-filter', () => {
	describe('#getParamsWithoutActiveDatesFilter', () => {
		describe('When getting the params url for the active dates filter', () => {
			let result;
			beforeEach(() => {
				const mockQuery = {
					'mock-date-day': 'mock date day value',
					'mock-date-month': 'mock date month value',
					'mock-date-year': 'mock date year value',
					'mock-filter-1': 'mock filter 1 value',
					'mock-filter-2': ['mock filter 2 item 1 value', 'mock filter 2 item 2 value']
				};
				result = getParamsWithoutActiveDatesFilter(mockQuery, 'mock-date');
			});
			it('should return the params url without the active filters values', () => {
				expect(result).toEqual(
					'?mock-filter-1=mock+filter+1+value&mock-filter-2=mock+filter+2+item+1+value&mock-filter-2=mock+filter+2+item+2+value'
				);
			});
		});
	});
});
