const { getRelevantRepresentationsQuery } = require('./get-relevant-representations-query');

describe('pages/projects/relevant-representations/_utils/get-relevant-representations-query', () => {
	describe('#getRelevantRepresentationsQuery', () => {
		describe('When getting the relevant representations query', () => {
			describe('and there are no query values', () => {
				const mockParams = { case_ref: 'mock case ref' };
				const mockQuery = {};
				const relevantRepresentationsQuery = getRelevantRepresentationsQuery(mockParams, mockQuery);
				it('should return the default query string', () => {
					expect(relevantRepresentationsQuery).toEqual(
						'?applicationId=mock%20case%20ref&size=25&page=1'
					);
				});
			});
			describe('and there are query values', () => {
				const mockParams = { case_ref: 'mock case ref' };
				const mockQuery = {
					itemsPerPage: 50,
					page: 2,
					searchTerm: 'mock search term',
					type: ['mock type 1', 'mock type 2']
				};
				const relevantRepresentationsQuery = getRelevantRepresentationsQuery(mockParams, mockQuery);
				it('should return the query string with values', () => {
					expect(relevantRepresentationsQuery).toEqual(
						'?applicationId=mock%20case%20ref&size=50&page=2&searchTerm=mock%20search%20term&type=mock%20type%201&type=mock%20type%202'
					);
				});
			});
		});
	});
});
