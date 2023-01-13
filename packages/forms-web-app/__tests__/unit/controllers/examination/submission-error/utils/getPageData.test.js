const {
	getPageData
} = require('../../../../../../src/controllers/examination/submission-error/utils/get-page-data');

const {
	getProjectEmailAddress
} = require('../../../../../../../forms-web-app/src/controllers/session/app-data-session');
jest.mock('../../../../../../../forms-web-app/src/controllers/session/app-data-session', () => ({
	getProjectEmailAddress: jest.fn()
}));

const {
	getExaminationSubmitCommentsURL
} = require('../../../../../../../forms-web-app/src/controllers/examination/submission-error/utils/get-examination-submit-comments-url');
jest.mock(
	'../../../../../../../forms-web-app/src/controllers/examination/submission-error/utils/get-examination-submit-comments-url',
	() => ({
		getExaminationSubmitCommentsURL: jest.fn()
	})
);

describe('controllers/examination/submission-error/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the submission error page', () => {
			const mockProjectEmailAddress = 'mock email';
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
					projectEmailAddress: mockProjectEmailAddress,
					submitCommentsURL: mockSubmitCommentsURL,
					pageTitle: 'Sorry, there is a problem with the service',
					title: 'Sorry, there is a problem with the service'
				});
			});
		});
	});
});
