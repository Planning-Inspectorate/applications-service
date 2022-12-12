const {
	isTheFirstPage
} = require('../../../../../../../src/controllers/projects/docments/utils/documents/body/isTheFirstPage');
describe('#isTheFirstPage', () => {
	describe('When landing on the first page the examination library document needs to be at the top of the list on the first page', () => {
		describe('and the the page is not set ', () => {
			const mockQuery = {};
			const response = isTheFirstPage(mockQuery);
			it('should be true', () => {
				expect(response).toBe(true);
			});
		});
		describe('and the the page is 1 ', () => {
			const mockQuery = { page: '1' };
			const response = isTheFirstPage(mockQuery);
			it('should be true', () => {
				expect(response).toBe(true);
			});
		});
	});
});
