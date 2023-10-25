const { getHaveYourSayGuidePageURL } = require('./get-have-your-say-guide-page-url');

describe('pages/have-your-say-guide/_utils/get-have-your-say-guide-page-url', () => {
	describe('When getting the have your say guide page url', () => {
		describe('and there is no route provided', () => {
			const processGuidePageURL = getHaveYourSayGuidePageURL();
			it('should return the have your say guide page base URL', () => {
				expect(processGuidePageURL).toEqual('/having-your-say-guide');
			});
		});
		describe('and there is a route provided', () => {
			const processGuidePageURL = getHaveYourSayGuidePageURL('mock-route');
			it('should return the have your say guide page base URL', () => {
				expect(processGuidePageURL).toEqual('/having-your-say-guide/mock-route');
			});
		});
	});
});
