const {
	getPageData
} = require('../../../../../../src/controllers/examination/check-your-answers/utils/get-page-data');

const { getDeadlineTitle } = require('../../../../../../src/controllers/session/deadline');

jest.mock('../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineTitle: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the check your answers page', () => {
			let result;
			const req = {
				session: { mockSession: 'mock session' }
			};
			const mockDeadlineTitle = 'mock deadline title';
			beforeEach(() => {
				getDeadlineTitle.mockReturnValue(mockDeadlineTitle);
				result = getPageData(req.session);
			});
			it('should call the functions', () => {
				expect(getDeadlineTitle).toHaveBeenCalledWith(req.session);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: '/examination/add-another-deadline-item',
					deadlineTitle: mockDeadlineTitle,
					pageTitle: 'Check your answers',
					summaryListDetailsTitle: 'Your details',
					summaryListSubmissionItemsTitle: 'Your submissions',
					title: 'Check your answers'
				});
			});
		});
	});
});
