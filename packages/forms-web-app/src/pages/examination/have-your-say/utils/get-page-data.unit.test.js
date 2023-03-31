const { getPageData } = require('./get-page-data');

describe('have your say #getPageData', () => {
	describe('When getting the page data for the have your say page', () => {
		const response = getPageData('mock case ref');
		it('should return the page data', () => {
			expect(response).toEqual({
				backLinkUrl: '/projects/mock case ref/examination-timetable',
				startNowUrl: 'have-an-interested-party-number'
			});
		});
	});
});
