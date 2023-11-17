const { getGetUpdatesIndex } = require('./controller');

describe('projects/get-updates/index/controller', () => {
	describe('#getGetUpdatesIndex', () => {
		it('should render the page and add the get updates key to the session', async () => {
			const res = {
				render: jest.fn(),
				locals: { projectName: 'mock project name' }
			};
			const req = {
				session: {}
			};
			await getGetUpdatesIndex(req, res);
			expect(res.render).toHaveBeenCalledWith('projects/get-updates/index/view.njk', {
				nextPageRoute: 'email',
				pageHeading: 'Get updates about this project',
				pageTitle: 'Get updates | mock project name'
			});
			expect(req.session).toEqual({ getUpdates: {} });
		});
	});
});
