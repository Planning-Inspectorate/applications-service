const {
	getPageData
} = require('../../../../../src/controllers/examination/name/utils/get-page-data');

const { getName, postName } = require('../../../../../src/controllers/examination/name/controller');
const {
	getDeadlineDetailsNameOrDefault,
	setDeadlineDetailsName
} = require('../../../../../src/controllers/examination/session/deadline');

const {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/name/utils/get-redirect-url');

jest.mock('../../../../../src/controllers/examination/name/utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/name/utils/get-redirect-url', () => ({
	getRedirectUrl: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/session/deadline', () => ({
	getDeadlineDetailsNameOrDefault: jest.fn(),
	setDeadlineDetailsName: jest.fn()
}));

describe('controllers/examination/name/controller', () => {
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
				status: jest.fn(() => res)
			};
			describe('and there is an error', () => {
				const mockErrorValue = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				beforeEach(() => {
					req.body = mockErrorValue;
					getPageData.mockReturnValue({ id: 'a', text: 'mock page data', view: 'mock name view' });
					postName(req, res);
				});
				it('Should render the name page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('mock name view', {
						...mockErrorValue,
						id: 'a',
						text: 'mock page data',
						view: 'mock name view'
					});
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
