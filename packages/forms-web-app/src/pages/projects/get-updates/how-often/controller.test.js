const {
	getGetUpdatesHowOftenController,
	postGetUpdatesHowOftenController
} = require('./controller');
const { postGetUpdatesSubscription } = require('../../../../lib/application-api-wrapper');
const { mockI18n } = require('../../../_mocks/i18n');
const getUpdatesHowOftenTranslations_EN = require('./_translations/en.json');
const getUpdatesHowOftenTranslation = { getUpdatesHowOften: getUpdatesHowOftenTranslations_EN };
const i18n = mockI18n(getUpdatesHowOftenTranslation);

jest.mock('../../../../lib/application-api-wrapper', () => ({
	postGetUpdatesSubscription: jest.fn()
}));

describe('projects/get-updates/how-often/controller', () => {
	describe('#getGetUpdatesHowOftenController', () => {
		describe('and there are no issues', () => {
			const req = {
				params: { case_ref: 'mock-case-ref' },
				i18n
			};
			const res = {
				render: jest.fn()
			};
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesHowOftenController(req, res, next);
			});

			console.log('test:>>', i18n);

			it('should render the page', () => {
				expect(res.render).toHaveBeenCalledWith('projects/get-updates/how-often/view.njk', {
					backLinkUrl: '/projects/mock-case-ref/get-updates/email',
					displayContent: 'index',
					inputNameId: 'howOften',
					pageHeading: 'How often do you want to get emails about the project?',
					pageTitle: 'How often do you want to get emails about the project?'
				});
			});
		});

		describe('and there is an issue', () => {
			const req = {
				params: { case_ref: 'mock-case-ref' }
			};
			const res = null;
			const next = jest.fn();

			beforeEach(() => {
				getGetUpdatesHowOftenController(req, res, next);
			});

			it('should throw and error', () => {
				expect(next).toHaveBeenCalledWith(
					new TypeError(`Cannot read properties of null (reading 'render')`)
				);
			});
		});
	});

	describe('#postGetUpdatesHowOftenController', () => {
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
						case_ref: 'mock-case-ref'
					},
					session: {},
					i18n
				};
				const res = {
					render: jest.fn()
				};

				beforeEach(async () => {
					await postGetUpdatesHowOftenController(req, res);
				});

				it('should render the page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('projects/get-updates/how-often/view.njk', {
						backLinkUrl: '/projects/mock-case-ref/get-updates/email',
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
						case_ref: 'mock-case-ref'
					},
					session: {},
					i18n
				};
				const res = {
					render: jest.fn()
				};

				beforeEach(async () => {
					await postGetUpdatesHowOftenController(req, res);
				});

				it('should render the page with errors', async () => {
					expect(res.render).toHaveBeenCalledWith('projects/get-updates/how-often/view.njk', {
						backLinkUrl: '/projects/mock-case-ref/get-updates/email',
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

			describe('and there is an issue when posting the get updates subscription', () => {
				const req = {
					body: { howOften: ['allUpdates'] },
					params: {
						case_ref: 'mock-case-ref'
					},
					session: {
						getUpdates: {
							email: 'mock@email.com'
						}
					},
					i18n
				};
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};

				beforeEach(async () => {
					postGetUpdatesSubscription.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					await postGetUpdatesHowOftenController(req, res);
				});

				it('should render the error page', async () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('projects/get-updates/how-often/view.njk', {
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
						case_ref: 'mock-case-ref'
					},
					session: {
						getUpdates: {
							email: 'mock@email.com'
						}
					},
					i18n
				};
				const res = {
					redirect: jest.fn()
				};

				beforeEach(async () => {
					postGetUpdatesSubscription.mockImplementation(() => {
						return {
							resp_code: 200
						};
					});
					await postGetUpdatesHowOftenController(req, res);
				});

				it('should redirect to next page', async () => {
					expect(res.redirect).toHaveBeenCalledWith(
						'/projects/mock-case-ref/get-updates/confirm-your-email'
					);
				});
			});
		});
	});
});
