const { projectSearchRoute } = require('./config');

describe('pages/project-search/config', () => {
	describe('#projectSearchRoute', () => {
		it('should return the project search route', () => {
			expect(projectSearchRoute).toEqual('project-search');
		});
	});
});
