const { getRelevantRepresentationsURL } = require('./get-relevant-representations-url');

describe('pages/projects/relevant-representations/_utils/get-relevant-representations-url', () => {
	describe('#getRelevantRepresentationsURL', () => {
		describe('When getting the relevant representations URL', () => {
			describe('and a case reference is not provided', () => {
				const relevantRepresentationsURL = getRelevantRepresentationsURL();
				it('should return the relevant-representations URL with the route parameters', () => {
					expect(relevantRepresentationsURL).toEqual('/projects/:case_ref/representations');
				});
			});
			describe('and a case reference is provided', () => {
				const relevantRepresentationsURL = getRelevantRepresentationsURL('mock-case-reference');
				it('should return the relevant-representations URL with the case reference', () => {
					expect(relevantRepresentationsURL).toEqual(
						'/projects/mock-case-reference/representations'
					);
				});
			});
		});
	});
});
