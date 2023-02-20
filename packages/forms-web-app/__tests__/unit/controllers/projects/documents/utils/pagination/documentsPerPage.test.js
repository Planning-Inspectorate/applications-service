const {
	documentsPerPage
} = require('../../../../../../../src/controllers/projects/documents/utils/pagination/documentsPerPage');
describe('#documentsPerPage', () => {
	describe('When getting the documents per page ', () => {
		describe('and no query params are set', () => {
			const mockQuery = {};
			const result = documentsPerPage(mockQuery);
			it('should return the documents per page object with the size and query params (page remove & itemPerPage added)', () => {
				expect(result).toEqual({
					twentyFive: {
						link: '?itemsPerPage=25',
						size: 25
					},
					fifty: {
						link: '?itemsPerPage=50',
						size: 50
					},
					oneHundred: {
						link: '?itemsPerPage=100',
						size: 100
					}
				});
			});
		});
		describe('and query params are set', () => {
			const mockQuery = { 'param-1': ['item-1', 'item-2'], 'param-2': 'item-1' };
			const result = documentsPerPage(mockQuery);
			it('should return the documents per page object with the size and query params (page remove & itemPerPage added)', () => {
				expect(result).toEqual({
					twentyFive: {
						link: '?param-1=item-1&param-1=item-2&param-2=item-1&itemsPerPage=25',
						size: 25
					},
					fifty: {
						link: '?param-1=item-1&param-1=item-2&param-2=item-1&itemsPerPage=50',
						size: 50
					},
					oneHundred: {
						link: '?param-1=item-1&param-1=item-2&param-2=item-1&itemsPerPage=100',
						size: 100
					}
				});
			});
		});
	});
});
