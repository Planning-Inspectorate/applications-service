const { getRelevantRepresentationURL } = require('./get-relevant-representation-url');

describe('pages/projects/relevant-representations/_utils/get-relevant-representation-url', () => {
	describe('#getRelevantRepresentationURL', () => {
		describe('When getting the relevant representation URL', () => {
			describe('and a case reference and an id reference are not provided', () => {
				const relevantRepresentationURL = getRelevantRepresentationURL();
				it('should return the relevant-representations URL with the case reference', () => {
					expect(relevantRepresentationURL).toEqual('/projects/:case_ref/representations/:id');
				});
			});

			describe('and a case reference and an id reference are provided', () => {
				const relevantRepresentationURL = getRelevantRepresentationURL(
					'mock-case-reference',
					'mock-id'
				);
				it('should return the relevant-representations URL with the case reference', () => {
					expect(relevantRepresentationURL).toEqual(
						'/projects/mock-case-reference/representations/mock-id'
					);
				});
			});
		});
	});
});
