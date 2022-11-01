const {
	getPersonalInformationWhich,
	postPersonalInformationWhich
} = require('../../../../../src/controllers/examination/personal-information-which/controller');
const {
	getPageData
} = require('../../../../../src/controllers/examination/personal-information-which/utils/getPageData');
const {
	clearAllPersonalInformationFlags,
	savePersonalInformationFlags
} = require('../../../../../src/controllers/examination/personal-information-which/utils/savePersonalInformationFlags');

jest.mock(
	'../../../../../src/controllers/examination/personal-information-which/utils/getPageData',
	() => ({
		getPageData: jest.fn()
	})
);

jest.mock(
	'../../../../../src/controllers/examination/personal-information-which/utils/savePersonalInformationFlags',
	() => ({
		clearAllPersonalInformationFlags: jest.fn(),
		savePersonalInformationFlags: jest.fn()
	})
);

describe('controllers/examination/personal-information-which/controller', () => {
	describe('#getPersonalInformationWhich', () => {
		describe('When getting the personal information page', () => {
			describe('and the page successfully renders', () => {
				const req = { session: 'mock session' };
				const res = { render: jest.fn() };
				beforeEach(() => {
					getPageData.mockReturnValue({ data: 'mock page data' });
					getPersonalInformationWhich(req, res);
				});
				it('should render the personal information page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information-which', {
						data: 'mock page data'
					});
				});
			});
			describe('and there is an error', () => {
				const req = { session: 'mock session' };
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getPersonalInformationWhich(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postPersonalInformationWhich', () => {
		describe('When handling the personal information which post', () => {
			describe('and there is an error', () => {
				const req = { session: 'mock session' };
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				beforeEach(() => {
					clearAllPersonalInformationFlags.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postPersonalInformationWhich(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there is an error in the body', () => {
				const req = {
					session: 'mock session',
					body: {
						errors: { 'page-id': 'i am an error' },
						errorSummary: ['an error']
					}
				};
				const mockPageData = { id: 'page-id' };
				const res = {
					render: jest.fn(),
					status: jest.fn(() => res)
				};
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageData);
					clearAllPersonalInformationFlags.mockReturnValue();
					postPersonalInformationWhich(req, res);
				});
				it('should render page with errors', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/personal-information-which', {
						errorSummary: ['an error'],
						errors: { 'page-id': 'i am an error' },
						id: 'page-id'
					});
				});
			});
			describe('and there are no errors', () => {
				const req = {
					session: 'mock session',
					body: {
						'page-id': ['options']
					}
				};
				const mockPageData = { id: 'page-id' };
				const res = {
					redirect: jest.fn()
				};
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageData);
					clearAllPersonalInformationFlags.mockReturnValue();
					postPersonalInformationWhich(req, res);
				});
				it('should save the personal information flags', () => {
					expect(savePersonalInformationFlags).toHaveBeenCalledWith('mock session', ['options']);
				});
				it('should redirect to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
				});
			});
		});
	});
});
