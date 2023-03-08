const { pageData } = require('./page-data');
describe('#pageData', () => {
	describe('When getting the page data', () => {
		const response = pageData('mock-case-ref');
		it('should return the case ref, base url and page url', () => {
			expect(response).toEqual({
				caseRef: 'mock-case-ref',
				baseUrl: '/projects/mock-case-ref',
				pageUrl: 'documents'
			});
		});
	});
});
