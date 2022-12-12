const {
	getBody
} = require('../../../../../../../src/controllers/projects/docments/utils/documents/body/getBody');
describe('#getBody', () => {
	describe('When getting the body for search document ', () => {
		describe('and there is no search term or filters', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = {};
			let response;
			beforeEach(() => {
				response = getBody(mockCaseRef, mockQuery);
			});
			it('should return the body with minimal data required', () => {
				expect(response).toEqual({
					caseReference: 'mock case ref',
					filters: [],
					page: 1
				});
			});
		});
		describe('and there are filters, a search term and a page number', () => {
			const mockCaseRef = 'mock case ref';
			const mockQuery = { 'stage-1': 'mock filter', searchTerm: 'mock search term', page: 3 };
			let response;
			beforeEach(() => {
				response = getBody(mockCaseRef, mockQuery);
			});
			it('should return the body with filters, search term and page', () => {
				expect(response).toEqual({
					caseReference: 'mock case ref',
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
					page: 3
				});
			});
		});
	});
});
