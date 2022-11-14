const {
	getPageData
} = require('../../../../../../src/controllers/examination/check-submission-item/utils/get-page-data');

describe('controllers/examination/check-submission-item/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the check submission item page', () => {
			const result = getPageData();
			it('should return the page data', () => {
				expect(result).toEqual({
					id: 'examination-check-submission-item',
					nextPageUrl: '/examination/add-another-deadline-item',
					pageTitle: 'Check your answers',
					title: 'Check your answers'
				});
			});
		});
	});
});
