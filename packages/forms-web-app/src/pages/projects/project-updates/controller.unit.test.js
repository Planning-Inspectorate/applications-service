const { getProjectUpdates } = require('./controller');
describe('#getProjectUpdates', () => {
	it('getProjectUpdates - should render the page', async () => {
		const res = {
			render: jest.fn(),
			locals: { projectName: 'mock project name' }
		};
		const req = {};
		await getProjectUpdates(req, res);
		expect(res.render).toHaveBeenCalledWith('projects/project-updates/index.njk', {
			title: 'Get updates about this project',
			pageTitle: 'Get updates | mock project name'
		});
	});
});
