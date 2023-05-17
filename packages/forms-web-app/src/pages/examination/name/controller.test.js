const { getName, postName } = require('./controller');

const { getPageData } = require('./utils/get-page-data');
const { getDeadlineDetailsNameOrDefault, setDeadlineDetailsName } = require('../_session/deadline');
const { getRedirectUrl } = require('./utils/get-redirect-url');

jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('../_session/deadline', () => ({
	getDeadlineDetailsNameOrDefault: jest.fn(),
	setDeadlineDetailsName: jest.fn()
}));
jest.mock('./utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));

describe('examination/name/controller', () => {
	describe('#getName', () => {
		describe('When getting the name page', () => {
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
					getPageData.mockReturnValue({ view: 'mock view', data: 'mock data' });
					getDeadlineDetailsNameOrDefault.mockReturnValue('mock name');
					getName(req, res);
				});
				it('should render the correct template and page data', () => {
					expect(res.render).toHaveBeenCalledWith('mock view', {
						view: 'mock view',
						data: 'mock data',
						name: 'mock name'
					});
				});
			});
			describe('and there errors', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getName(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});

	describe('#postName', () => {
		describe('When handling a name', () => {
			const req = {
				body: {},
				session: { text: 'mock session' },
				query: { text: 'mock query' }
			};
			const res = {
				redirect: jest.fn(),
				render: jest.fn(),
				send: jest.fn(),
				status: jest.fn(() => res)
			};

			describe('and there is an error', () => {
				const mockErrorValue = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};

				it('Should render the name page with errors', () => {
					req.body = mockErrorValue;
					getPageData.mockReturnValue({ id: 'a', text: 'mock page data', view: 'mock name view' });
					postName(req, res);

					expect(res.render).toHaveBeenCalledWith('mock name view', {
						...mockErrorValue,
						id: 'a',
						text: 'mock page data',
						view: 'mock name view'
					});
				});

				it('Should send the response with errors', () => {
					req.body = {
						...mockErrorValue
					};
					const pageData = {
						id: 'a',
						text: 'mock page data',
						view: 'mock name view',
						url: '/mock-url'
					};
					getPageData.mockReturnValue(pageData);
					postName(req, res);

					expect(res.render).toHaveBeenCalledWith(pageData.view, {
						...pageData,
						...mockErrorValue
					});
				});
			});

			describe('and there is a request', () => {
				const mockPageDataValue = { id: 'examination-name' };
				const mockPageDataIdValue = 'name value';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					getPageData.mockReturnValue({ id: 'examination-name' });
					setDeadlineDetailsName.mockReturnValue();
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postName(req, res);
				});
				it('should call session funcs', () => {
					expect(setDeadlineDetailsName).toHaveBeenCalledWith(
						{ text: 'mock session' },
						'name value'
					);
				});
				it('should call the functions', () => {
					expect(getRedirectUrl).toHaveBeenCalledWith({ text: 'mock query' });
				});
				it('should response to redirect to the next page to be sent', () => {
					expect(res.redirect).toHaveBeenCalledWith('redirect url');
				});
			});

			describe('and there are no issues', () => {
				const mockPageDataValue = { id: 'examination-name' };
				const mockPageDataIdValue = 'name value';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					getPageData.mockReturnValue({ id: 'examination-name' });
					setDeadlineDetailsName.mockReturnValue();
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postName(req, res);
				});
				it('should call session funcs', () => {
					expect(setDeadlineDetailsName).toHaveBeenCalledWith(
						{ text: 'mock session' },
						'name value'
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
