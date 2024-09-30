const { getBody } = require('./getBody');

const {
	getDatesFilterPublishedDates
} = require('../../dates/utils/get-dates-filter-published-dates');

jest.mock('../../dates/utils/get-dates-filter-published-dates', () => ({
	getDatesFilterPublishedDates: jest.fn()
}));

describe('#getBody', () => {
	describe('When getting the body for search document ', () => {
		describe('and there is no search term or filters', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = {};
			let response;

			beforeEach(() => {
				getDatesFilterPublishedDates.mockReturnValue({});
				response = getBody(mockCaseRef, mockQuery);
			});

			it('should return the body with minimal data required', () => {
				expect(response).toEqual({
					caseReference: 'mock case ref',
					filters: [],
					page: 1,
					size: 25
				});
			});
		});

		describe('and there are filters, a search term, page number and from and to dates', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = {
				'stage-1': 'mock filter',
				searchTerm: 'mock search term',
				page: 3,
				isMaterialChange: true
			};
			let response;
			beforeEach(() => {
				getDatesFilterPublishedDates.mockReturnValue({
					datePublishedFrom: 'mock date published from',
					datePublishedTo: 'mock date published to'
				});
				response = getBody(mockCaseRef, mockQuery);
			});
			it('should return the body with filters, search term and page', () => {
				expect(response).toEqual({
					caseReference: 'mock case ref',
					datePublishedFrom: 'mock date published from',
					datePublishedTo: 'mock date published to',
					filters: [
						{
							name: 'stage',
							type: [
								{
									value: 'mock filter'
								}
							],
							value: '1'
						}
					],
					searchTerm: 'mock search term',
					isMaterialChange: true,
					page: 3,
					size: 25
				});
			});
		});
	});
});
