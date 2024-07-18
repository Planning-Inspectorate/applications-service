const { getSubmittingFor, postSubmittingFor } = require('./controller');

const { getPageData } = require('./utils/get-page-data');
const { getRedirectUrl } = require('./utils/get-redirect-url');
const { setDeadlineDetailsSubmittingFor } = require('../_session/deadline');
const { mockI18n } = require('../../_mocks/i18n');
const examinationTranslations__EN = require('../_translations/en.json');

jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('./utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));
jest.mock('../_session/deadline', () => ({
	setDeadlineDetailsSubmittingFor: jest.fn()
}));

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

describe('pages/examination/submitting-for/controller', () => {
	const req = {
		body: {},
		i18n,
		session: { examination: {} },
		query: { mock: 'query' }
	};
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	describe('#getSubmittingFor', () => {
		describe('When rendering the submitting for page', () => {
			describe('and there are no issues', () => {
				beforeEach(() => {
					getPageData.mockReturnValue({ mock: 'page data' });
					getSubmittingFor(req, res);
				});
				it('should get the page data', () => {
					expect(getPageData).toHaveBeenCalledWith(req.i18n, req.query, req.session);
				});
				it('should render the submitting for page with the page data', () => {
					expect(res.render).toHaveBeenCalledWith('examination/submitting-for/view.njk', {
						mock: 'page data'
					});
				});
			});

			describe('and there is an issue', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getSubmittingFor(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postSubmittingFor', () => {
		describe('When handling a submitting page for post request', () => {
			describe('and there is an error', () => {
				const mockErrorValue = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				beforeEach(() => {
					req.body = mockErrorValue;
					getPageData.mockReturnValue({ mock: 'page data' });
					postSubmittingFor(req, res);
				});
				it('should render the submitting for page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('examination/submitting-for/view.njk', {
						...mockErrorValue,
						mock: 'page data'
					});
				});
			});
			describe('and there are no issues', () => {
				const mockRedirectUrlValue = 'mock/redirect/url';
				const mockSelectedSubmittingForValue = 'mock selected submitting for value';
				beforeEach(() => {
					req.body = {
						'examination-submitting-for': mockSelectedSubmittingForValue
					};
					getRedirectUrl.mockReturnValue(mockRedirectUrlValue);
					setDeadlineDetailsSubmittingFor.mockImplementation(() => {});
					postSubmittingFor(req, res);
				});
				it('should call the get redirect URL function', () => {
					expect(getRedirectUrl).toHaveBeenCalledWith(req.query, mockSelectedSubmittingForValue);
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrlValue);
				});
			});
			describe('and there is an issue', () => {
				beforeEach(() => {
					getRedirectUrl.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postSubmittingFor(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
