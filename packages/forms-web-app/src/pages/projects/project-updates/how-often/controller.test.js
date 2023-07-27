const { getProjectUpdatesHowOften, postProjectUpdatesHowOften } = require('./controller');

const { postProjectUpdatesSubscription } = require('../../../../lib/application-api-wrapper');

jest.mock('../../../../lib/application-api-wrapper', () => ({
	postProjectUpdatesSubscription: jest.fn()
}));

describe('projects/project-updates/how-often/controller', () => {
	describe('#getProjectUpdatesHowOften', () => {
		describe('and there are no issues', () => {
			const req = {};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesHowOften(req, res, next);
			});

			it('should render the page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/project-updates/how-often/view.njk', {
					backLinkUrl: 'email',
					displayContent: 'index',
					inputNameId: 'howOften',
					pageHeading: 'How often do you want to get emails about the project?',
					pageTitle: 'How often do you want to get emails about the project?'
				});
			});
		});

		describe('and there is an issue', () => {
			const req = null;
			const res = null;
			const next = jest.fn();

			beforeEach(() => {
				getProjectUpdatesHowOften(req, res, next);
			});

			it('should throw and error', () => {
				expect(next).toHaveBeenCalledWith(
					new TypeError(`Cannot read properties of null (reading 'render')`)
				);
			});
		});
	});

	describe('#postProjectUpdatesHowOften', () => {
		describe('When posting the selection', () => {
			describe('and no selection has been made', () => {
				const req = {
					body: {
						howOften: '',
						errors: {
							email: {
								value: '',
								msg: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								param: 'subscriptionTypes',
								location: 'body'
							}
						},
						errorSummary: [
							{
								text: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								href: '#subscriptionTypes'
							}
						]
					},
					params: {
						caseRef: 'mock case ref'
					},
					session: {}
				};
				const res = {
					render: jest.fn()
				};

				beforeEach(async () => {
					await postProjectUpdatesHowOften(req, res);
				});

				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('projects/project-updates/how-often/view.njk', {
						backLinkUrl: 'email',
						displayContent: 'index',
						inputNameId: 'howOften',
						pageHeading: 'How often do you want to get emails about the project?',
						pageTitle: 'How often do you want to get emails about the project?',
						errors: {
							email: {
								location: 'body',
								msg: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								param: 'subscriptionTypes',
								value: ''
							}
						},
						errorSummary: [
							{
								text: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								href: '#subscriptionTypes'
							}
						]
					});
				});
			});

			describe('and the posted array contains exclusive value', () => {
				const req = {
					body: {
						howOften: ['allUpdates', 'thisValueShouldNotBeHere'],
						errors: {
							email: {
								value: ['allUpdates', 'thisValueShouldNotBeHere'],
								msg: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								param: 'subscriptionTypes',
								location: 'body'
							}
						},
						errorSummary: [
							{
								text: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								href: '#howOften'
							}
						]
					},
					params: {
						caseRef: 'mock case ref'
					},
					session: {}
				};
				const res = {
					render: jest.fn()
				};

				beforeEach(async () => {
					await postProjectUpdatesHowOften(req, res);
				});

				it('should render the page with errors', async () => {
					expect(res.render).toHaveBeenCalledWith('projects/project-updates/how-often/view.njk', {
						backLinkUrl: 'email',
						displayContent: 'index',
						inputNameId: 'howOften',
						pageHeading: 'How often do you want to get emails about the project?',
						pageTitle: 'How often do you want to get emails about the project?',
						errors: {
							email: {
								location: 'body',
								msg: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								param: 'subscriptionTypes',
								value: ['allUpdates', 'thisValueShouldNotBeHere']
							}
						},
						errorSummary: [
							{
								text: 'Select the top checkbox only OR select as many of the bottom three checkboxes as needed',
								href: '#howOften'
							}
						]
					});
				});
			});

			describe('and there is an issue when posting the project updates subscription', () => {
				const req = {
					body: { howOften: ['allUpdates'] },
					params: {
						caseRef: 'mock case ref'
					},
					session: {
						projectUpdates: {
							email: 'mock@email.com'
						}
					}
				};
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};

				beforeEach(async () => {
					postProjectUpdatesSubscription.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					await postProjectUpdatesHowOften(req, res);
				});

				it('should render the error page', async () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('projects/project-updates/how-often/view.njk', {
						backLinkUrl: null,
						displayContent: 'error',
						inputNameId: 'howOften',
						pageHeading: 'There has been a problem with our system',
						pageTitle: 'There has been a problem'
					});
				});
			});

			describe('and there are no issues', () => {
				const req = {
					body: { howOften: 'allUpdates' },
					params: {
						caseRef: 'mock case ref'
					},
					session: {
						projectUpdates: {
							email: 'mock@email.com'
						}
					}
				};
				const res = {
					redirect: jest.fn()
				};

				beforeEach(async () => {
					postProjectUpdatesSubscription.mockImplementation(() => {
						return {
							resp_code: 200
						};
					});
					await postProjectUpdatesHowOften(req, res);
				});

				it('should redirect to next page', async () => {
					expect(res.redirect).toHaveBeenCalledWith('confirm-your-email');
				});
			});
		});
	});
});
