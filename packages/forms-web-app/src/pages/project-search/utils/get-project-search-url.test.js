const { getProjectSearchURL } = require('./get-project-search-url');

describe('pages/project-search/utils/get-project-search-url', () => {
	describe('#getProjectSearchURL', () => {
		const projectSearchURL = getProjectSearchURL();
		it('should return the index URL', () => {
			expect(projectSearchURL).toEqual('/project-search');
		});
	});
});
