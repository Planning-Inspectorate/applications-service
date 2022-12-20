const {
	getEmail,
	postEmail
} = require('../../../../../src/controllers/examination/email/controller');
const {
	getPageData
} = require('../../../../../src/controllers/examination/email/utils/get-page-data');
const {
	getDeadlineDetailsEmailOrDefault,
	setDeadlineDetailsEmail
} = require('../../../../../src/controllers/examination/session/deadline');

const {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/email/utils/get-redirect-url');

jest.mock('../../../../../src/controllers/examination/email/utils/get-page-data', () => ({
	getPageData: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/email/utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/session/deadline', () => ({
	getDeadlineDetailsEmailOrDefault: jest.fn(),
	setDeadlineDetailsEmail: jest.fn()
}));
describe('controllers/examination/email/controller', () => {
	describe('#getEmail', () => {
		describe('When getting the email page', () => {
			const req = {
				body: {},
				session: { text: 'mock session' },
				query: { text: 'mock query' }
			};
			const res = {
				redirect: jest.fn(),
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and there are no errors', () => {
				beforeEach(() => {
					getPageData.mockReturnValue({ text: 'mock page data' });
					getDeadlineDetailsEmailOrDefault.mockReturnValue('mock email');
					getEmail(req, res);
				});
				it('should return the page template and page data', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/email', {
						email: 'mock email',
						text: 'mock page data'
					});
				});
			});
			describe('and there are errors', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getEmail(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});

	describe('#postEmail', () => {
		describe('When handling an email', () => {
			const req = {
				body: {},
				session: { text: 'mock session' },
				query: { text: 'mock query' }
			};
			const res = {
				redirect: jest.fn(),
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and there is an error', () => {
				const mockErrorValue = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				beforeEach(() => {
					req.body = mockErrorValue;
					getPageData.mockReturnValue({ text: 'mock page data' });
					postEmail(req, res);
				});
				it('Should render the email page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/email', {
						...mockErrorValue,
						text: 'mock page data'
					});
				});
			});

			describe('and there are no issues', () => {
				const mockPageDataValue = { id: 'examination-email' };
				const mockPageDataIdValue = 'email value';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					setDeadlineDetailsEmail.mockReturnValue();
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postEmail(req, res);
				});
				it('should call session funcs', () => {
					expect(setDeadlineDetailsEmail).toHaveBeenCalledWith(
						{ text: 'mock session' },
						'email value'
					);
				});
				it('should call the functions', () => {
					expect(getRedirectUrl).toHaveBeenCalledWith({ text: 'mock query' });
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
		});
	});
});
