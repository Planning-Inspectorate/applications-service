const { getRepresentationURL } = require('./get-representation-url');

describe('pages/projects/representations/representation/_utils/get-representation-url', () => {
	describe('#getRepresentationURL', () => {
		describe('When getting the representation URL', () => {
			describe('and a case reference and id are not provided', () => {
				const representationURL = getRepresentationURL();
				it('should return the representation URL with the route parameters', () => {
					expect(representationURL).toEqual('/projects/:case_ref/representations/:id');
				});
			});

			describe('and a case reference and id are provided', () => {
				const representationURL = getRepresentationURL('mock-case-reference', 'mock-id');
				it('should return the representation URL with the case reference and id', () => {
					expect(representationURL).toEqual(
						'/projects/mock-case-reference/representations/mock-id'
					);
				});
			});
		});
	});
});
