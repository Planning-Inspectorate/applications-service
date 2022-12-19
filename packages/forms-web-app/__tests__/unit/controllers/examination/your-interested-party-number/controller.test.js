const {
	getYourInterestedPartyNumber,
	postYourInterestedPartyNumber
} = require('../../../../../src/controllers/examination/your-interested-party-number/controller');
const {
	getPageData
} = require('../../../../../src/controllers/examination/your-interested-party-number/utils/get-page-data');
const {
	getRedirectUrl
} = require('../../../../../src/controllers/examination/your-interested-party-number/utils/get-redirect-url');

const {
	setDeadlineDetailsApplicant,
	setDeadlineDetailsInterestedPartyNumber
} = require('../../../../../src/controllers/examination/session/deadline');

jest.mock(
	'../../../../../src/controllers/examination/your-interested-party-number/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);

jest.mock(
	'../../../../../src/controllers/examination/your-interested-party-number/utils/get-redirect-url',
	() => ({
		getRedirectUrl: jest.fn()
	})
);

jest.mock('../../../../../src/controllers/examination/session/deadline', () => ({
	setDeadlineDetailsInterestedPartyNumber: jest.fn(),
	setDeadlineDetailsApplicant: jest.fn()
}));
describe('controllers/examination/your-interested-party-number/controller', () => {
	describe('#getYourInterestedPartyNumber', () => {
		describe('When getting the party number page', () => {
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
					getYourInterestedPartyNumber(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/your-interested-party-number',
						{
							text: 'mock page data'
						}
					);
				});
			});
			describe('and there errors', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getYourInterestedPartyNumber(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postYourInterestedPartyNumber', () => {
		describe('When handling a party number', () => {
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
					postYourInterestedPartyNumber(req, res);
				});
				it('Should render the interested party number page with errors', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/your-interested-party-number',
						{
							...mockErrorValue,
							id: 'examination-your-interested-party-number',
							text: 'mock page data'
						}
					);
				});
			});

			describe('and there are no issues', () => {
				const mockPageDataValue = { id: 'examination-your-interested-party-number' };
				const mockPageDataIdValue = 'party value';
				const mockRedirectUrl = 'redirect url';
				beforeEach(() => {
					req.body = {
						[mockPageDataValue.id]: mockPageDataIdValue
					};
					setDeadlineDetailsInterestedPartyNumber.mockReturnValue();
					setDeadlineDetailsApplicant.mockReturnValue();
					getRedirectUrl.mockReturnValue(mockRedirectUrl);
					postYourInterestedPartyNumber(req, res);
				});
				it('should call session funcs', () => {
					expect(setDeadlineDetailsInterestedPartyNumber).toHaveBeenCalledWith(
						{ text: 'mock session' },
						'party value'
					);
					expect(setDeadlineDetailsApplicant).toHaveBeenCalledWith({ text: 'mock session' }, '');
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
