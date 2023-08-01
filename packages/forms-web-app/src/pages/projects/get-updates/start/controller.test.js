const { getGetUpdatesStart } = require('./controller');

describe('projects/get-updates/start/controller', () => {
	describe('#getGetUpdatesStart', () => {
		it('should render the page and add the get updates key to the session', async () => {
			const res = {
				render: jest.fn(),
				locals: { projectName: 'mock project name' }
			};
			const req = {
				session: {}
			};
			await getGetUpdatesStart(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/get-updates/start/view.njk', {
				nextPageRoute: 'email',
				pageHeading: 'Get updates about this project',
				pageTitle: 'Get updates | mock project name'
			});
			expect(req.session).toEqual({ getUpdates: {} });
		});
	});
});
