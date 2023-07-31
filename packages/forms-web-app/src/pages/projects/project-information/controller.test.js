const { getProjectOverview } = require('./controller');

describe('projects/project-information/controller', () => {
	describe('#getProjectOverview', () => {
		it('should render the page', async () => {
			const req = {};
			const res = {
				render: jest.fn(),
				locals: {
					applicationData: {
						projectName: 'Mock project name',
						caseRef: 'EN010085',
						summary: 'Mock case summary',
						webAddress: 'www.mock.com',
						proposal: 'EN01 - Generating Stations'
					}
				}
			};
			const next = jest.fn();

			await getProjectOverview(req, res, next);
			expect(res.render).toHaveBeenCalledWith('projects/project-information/view.njk', {
				pageHeading: `Project Information`,
				pageTitle: `Mock project name - Project Information`,
				summary: 'Mock case summary',
				webAddress: 'www.mock.com',
				proposal: 'Generating Stations'
			});
		});
	});
});
