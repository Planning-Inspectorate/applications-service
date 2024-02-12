const { getGetUpdatesIndexController } = require('./controller');

describe('projects/get-updates/index/controller', () => {
	describe('#getGetUpdatesIndexController', () => {
		describe('when attempting to start Get Updates journey', () => {
			describe('and the project has post-decision status', () => {
				describe('and the confirmed date of decision has NOT passed', () => {
					it('should render the page and delete the get updates key', async () => {
						jest.useFakeTimers().setSystemTime(new Date('2024-01-30'));

						const req = {
							session: {},
							params: { case_ref: 'mock case ref' }
						};
						const res = {
							render: jest.fn(),
							locals: {
								projectName: 'mock project name',
								applicationData: {
									confirmedDateOfDecision: '2025-03-10',
									status: {
										number: 7
									}
								}
							}
						};

						await getGetUpdatesIndexController(req, res);
						expect(res.render).toHaveBeenCalledWith('projects/get-updates/index/view.njk', {
							nextPageRoute: '/projects/mock case ref/get-updates/email',
							pageHeading: 'Get updates about this project',
							pageTitle: 'Get updates | mock project name',
							decisionDatePassed: false
						});
						expect(req.session.getUpdates).toBeUndefined();
					});
				});
			});

			describe('and the project does NOT have post-decision status', () => {
				describe('and the confirmed date of decision has passed', () => {
					it('should render the page and delete the get updates key', async () => {
						jest.useFakeTimers().setSystemTime(new Date('2024-01-30'));

						const req = {
							session: { getUpdates: {} },
							params: { case_ref: 'mock case ref' }
						};
						const res = {
							render: jest.fn(),
							locals: {
								projectName: 'mock project name',
								applicationData: {
									confirmedDateOfDecision: '2023-03-10',
									status: {
										number: 4
									}
								}
							}
						};

						await getGetUpdatesIndexController(req, res);
						expect(res.render).toHaveBeenCalledWith('projects/get-updates/index/view.njk', {
							nextPageRoute: '/projects/mock case ref/get-updates/email',
							pageHeading: 'Get updates about this project',
							pageTitle: 'Get updates | mock project name',
							decisionDatePassed: true
						});
						expect(req.session.getUpdates).toBeUndefined();
					});
				});

				describe('and the confirmed date of decision has NOT passed', () => {
					it('should render the page and add the case ref to session', async () => {
						jest.useFakeTimers().setSystemTime(new Date('2024-01-30'));

						const req = {
							session: {},
							params: { case_ref: 'mock case ref' }
						};
						const res = {
							render: jest.fn(),
							locals: {
								projectName: 'mock project name',
								applicationData: {
									confirmedDateOfDecision: '2025-03-10',
									status: {
										number: 4
									}
								}
							}
						};

						await getGetUpdatesIndexController(req, res);
						expect(res.render).toHaveBeenCalledWith('projects/get-updates/index/view.njk', {
							nextPageRoute: '/projects/mock case ref/get-updates/email',
							pageHeading: 'Get updates about this project',
							pageTitle: 'Get updates | mock project name',
							decisionDatePassed: false
						});
						expect(req.session).toEqual({ getUpdates: { caseRef: 'mock case ref' } });
					});
				});
			});
		});
	});
});
