const { getProjectUpdatesStart } = require('./controller');

describe('projects/project-updates/start/controller', () => {
	describe('#getProjectUpdatesStart', () => {
		it('getProjectUpdatesStart - should render the page and add the project updates key to the session', async () => {
			const res = {
				render: jest.fn(),
				locals: { projectName: 'mock project name' }
			};
			const req = {
				session: {}
			};
			await getProjectUpdatesStart(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/project-updates/start/view.njk', {
				nextPageRoute: 'email',
				pageHeading: 'Get updates about this project',
				pageTitle: 'Get updates | mock project name'
			});
			expect(req.session).toEqual({ projectUpdates: {} });
		});
	});
});
