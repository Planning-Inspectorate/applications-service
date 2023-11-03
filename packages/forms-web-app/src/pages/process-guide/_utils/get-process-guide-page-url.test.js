const { getProcessGuidePageURL } = require('./get-process-guide-page-url');

describe('pages/process-guide/_utils/get-process-guide-page-url', () => {
	describe('When getting the process guide page url', () => {
		describe('and there is no route provided', () => {
			const processGuidePageURL = getProcessGuidePageURL();
			it('should return the process guide page base URL', () => {
				expect(processGuidePageURL).toEqual('/decision-making-process-guide');
			});
		});
		describe('and there is a route provided', () => {
			const processGuidePageURL = getProcessGuidePageURL('mock-route');
			it('should return the process guide page base URL', () => {
				expect(processGuidePageURL).toEqual('/decision-making-process-guide/mock-route');
			});
		});
	});
});
