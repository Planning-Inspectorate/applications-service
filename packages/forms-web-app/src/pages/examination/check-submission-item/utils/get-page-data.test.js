const { getPageData } = require('./get-page-data');

describe('examination/check-submission-item/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the check submission item page', () => {
			const result = getPageData();
			it('should return the page data', () => {
				expect(result).toEqual({
					id: 'examination-check-submission-item',
					nextPageUrl: 'add-another-deadline-item'
				});
			});
		});
	});
});
