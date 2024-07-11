const { getName, postName } = require('./controller');

const { mockI18n } = require('../../_mocks/i18n');

const examinationTranslations__EN = require('../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

describe('pages/examination/name/controller', () => {
	describe('#getName', () => {
		let req = {};
		let res = {};

		describe('When getting the name page', () => {
			describe('and there errors', () => {
				beforeEach(() => {
					req = {
						body: {},
						i18n,
						session: { currentView: { route: 'your-name', id: 'mock id' } }
					};

					res = {
						redirect: jest.fn(),
						render: jest.fn(),
						status: jest.fn(() => res)
					};

					getName(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});

			describe('and there are no errors', () => {
				beforeEach(() => {
					req = {
						body: {},
						i18n,
						session: { examination: {}, currentView: { route: 'your-name', id: 'mock id' } }
					};

					res = {
						redirect: jest.fn(),
						render: jest.fn(),
						status: jest.fn(() => res)
					};

					getName(req, res);
				});
				it('should render the correct template and page data', () => {
					expect(res.render).toHaveBeenCalledWith('examination/name/view.njk', {
						backLinkUrl: 'who-are-you-submitting-for',
						id: 'mock id',
						name: undefined,
						pageTitle: 'What is your full name?',
						title: 'What is your full name?'
					});
				});
			});
		});
	});

	describe('#postName', () => {
		let req = {};
		let res = {};

		describe('When handling a name', () => {
			describe('and there is an error', () => {
				beforeEach(() => {
					req = {
						body: {
							errors: { 'examination-name': 'mock error' },
							errorSummary: [{ text: 'Error summary', href: '#' }]
						},
						i18n,
						session: {
							examination: {},
							currentView: { route: 'your-name', id: 'examination-name' }
						}
					};

					res = {
						redirect: jest.fn(),
						render: jest.fn(),
						status: jest.fn(() => res)
					};

					postName(req, res);
				});

				it('Should render the name page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('examination/name/view.njk', {
						backLinkUrl: 'who-are-you-submitting-for',
						errorSummary: [{ href: '#', text: 'Error summary' }],
						errors: { 'examination-name': 'mock error' },
						id: 'examination-name',
						name: undefined,
						pageTitle: 'What is your full name?',
						title: 'What is your full name?'
					});
				});
			});

			describe('and there are no issues', () => {
				beforeEach(() => {
					req = {
						body: {
							'examination-name': 'mock name'
						},
						i18n,
						session: {
							examination: {},
							currentView: { route: 'your-name', id: 'examination-name' }
						}
					};

					res = {
						redirect: jest.fn(),
						render: jest.fn(),
						status: jest.fn(() => res)
					};

					postName(req, res);
				});

				it('should add the name to the session', () => {
					expect(req.session).toEqual({
						currentView: { id: 'examination-name', route: 'your-name' },
						examination: { name: 'mock name' }
					});
				});

				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith('your-email-address');
				});
			});
		});
	});
});
