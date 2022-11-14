const {
	getPersonalInformation,
	postPersonalInformation
} = require('../../../../../src/controllers/examination/personal-information/controller');

let {
	getPageData
} = require('../../../../../src/controllers/examination/personal-information/utils/page-data');

let {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/personal-information/utils/get-redirect-url');

let {
	addKeyValueToActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');
const {
	clearAllPersonalInformationFlags
} = require('../../../../../src/controllers/examination/personal-information-which/utils/savePersonalInformationFlags');

jest.mock(
	'../../../../../src/controllers/examination/personal-information-which/utils/savePersonalInformationFlags',
	() => ({
		clearAllPersonalInformationFlags: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/personal-information/utils/page-data',
	() => ({
		getPageData: jest.fn()
	})
);

jest.mock(
	'../../../../../src/controllers/examination/personal-information/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));

describe('controllers/examination/personal-information/controller', () => {
	const mockSession = 'mock session';
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	const req = {
		body: 'mock body',
		session: mockSession
	};
	const mockPageDataValue = { id: 'examination-personal-information' };

	describe('#getPersonalInformation', () => {
		describe('When rendering the personal information page', () => {
			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					getPersonalInformation(req, res);
				});
				it('should render the personal information page without a selected value', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/personal-information',
						mockPageDataValue
					);
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getPersonalInformation(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postPersonalInformation', () => {
		describe('When handling a personal information post', () => {
			describe('and there is an error', () => {
				const mockErrorValue = {
					errors: { a: 'b' },
					errorSummary: [{ text: 'Error summary', href: '#' }]
				};
				beforeEach(() => {
					req.body = mockErrorValue;
					getPageData.mockReturnValue(mockPageDataValue);
					postPersonalInformation(req, res);
				});
				it('should render the personal information page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information', {
						...mockPageDataValue,
						...mockErrorValue
					});
				});
			});
			describe('and there are no issues', () => {
				const mockPageDataIdValue = 'personal information value';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					getPageData.mockReturnValue(mockPageDataValue);
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					clearAllPersonalInformationFlags.mockReturnValue();
					postPersonalInformation(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toHaveBeenCalledWith(mockSession);
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						mockSession,
						'personalInformation',
						mockPageDataIdValue
					);
					expect(getRedirectUrl).toHaveBeenCalledWith(
						mockSession,
						mockPageDataValue.id,
						mockPageDataIdValue
					);
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
			describe('and the response is NO', () => {
				const mockPageDataIdValue = 'no';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					getPageData.mockReturnValue(mockPageDataValue);
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					clearAllPersonalInformationFlags.mockReturnValue();
					postPersonalInformation(req, res);
				});
				it('should clear all the personal information stored', () => {
					expect(clearAllPersonalInformationFlags).toHaveBeenCalledWith(mockSession);
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith(mockRedirectUrl);
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postPersonalInformation(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
