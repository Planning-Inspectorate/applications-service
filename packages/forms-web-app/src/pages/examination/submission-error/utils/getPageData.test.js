const { getPageData } = require('./get-page-data');
const { getExaminationSubmitCommentsURL } = require('./get-examination-submit-comments-url');
const { getProjectEmailAddress } = require('../../../../controllers/session/app-data-session');
jest.mock('../../../../controllers/session/app-data-session', () => ({
	getProjectEmailAddress: jest.fn()
}));

jest.mock('./get-examination-submit-comments-url', () => ({
	getExaminationSubmitCommentsURL: jest.fn()
}));

describe('examination/submission-error/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the submission error page', () => {
			const mockProjectEmailAddress = 'projectemail@planninginspectorate.gov.uk';
			const mockSubmitCommentsURL = 'examination/have-your-say';
			const mockSession = { mockSession: 'mock session' };

			let result;
			beforeEach(() => {
				getProjectEmailAddress.mockReturnValue(mockProjectEmailAddress);
				getExaminationSubmitCommentsURL.mockReturnValue(mockSubmitCommentsURL);
				result = getPageData(mockSession);
			});

			it('should return the page data', () => {
				expect(result).toEqual({
					id: 'examination-submission-error',
					projectEmail: mockProjectEmailAddress,
					submitCommentsURL: mockSubmitCommentsURL
				});
			});
		});
	});
});
