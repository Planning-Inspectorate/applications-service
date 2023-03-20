const { getCheckSubmissionItem, postCheckSubmissionItem } = require('./controller');

const { getBackLinkUrl } = require('./utils/get-back-link-url');
const { getPageData } = require('./utils/get-page-data');
const { getSummaryList } = require('./utils/get-summary-list');
const {
	setActiveSubmissionItemSubmitted,
	deleteActiveSubmissionItemId
} = require('../_session/submission-items-session');

jest.mock('./utils/get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));
jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));
jest.mock('./utils/get-summary-list', () => ({
	getSummaryList: jest.fn()
}));
jest.mock('../_session/submission-items-session', () => ({
	setActiveSubmissionItemSubmitted: jest.fn(),
	deleteActiveSubmissionItemId: jest.fn()
}));

describe('examination/check-submission-item/controller', () => {
	const mockSession = 'mock session';
	const res = {
		redirect: jest.fn(),
		render: jest.fn(),
		status: jest.fn(() => res)
	};
	const req = {
		session: mockSession
	};

	const getMockPageDataValue = { mockPageDataValue: 'get mock page data value' };
	const getMockBackLinkUrlValue = { mockBackLinkUrlValue: 'get mock back link URL value' };
	const getMockSummaryListValue = { mockSummaryListValue: 'get mock summary list value' };

	describe('#getCheckSubmissionItem', () => {
		describe('When rendering check submission item page', () => {
			describe('and the render is successful', () => {
				beforeEach(() => {
					getPageData.mockReturnValue(getMockPageDataValue);
					getBackLinkUrl.mockReturnValue(getMockBackLinkUrlValue);
					getSummaryList.mockReturnValue(getMockSummaryListValue);
					getCheckSubmissionItem(req, res);
				});
				it('should render the page', () => {
					expect(res.render).toHaveBeenCalledWith('examination/check-submission-item/view.njk', {
						...getPageData(),
						...getMockBackLinkUrlValue,
						...getMockSummaryListValue
					});
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getCheckSubmissionItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
	describe('#postCheckSubmissionItem', () => {
		describe('When handling the check submission item post request', () => {
			describe('and the post is successful', () => {
				beforeEach(() => {
					postCheckSubmissionItem(req, res);
				});
				it('should should submit the submission item', () => {
					expect(setActiveSubmissionItemSubmitted).toHaveBeenCalledWith(req.session, true);
				});
				it('should delete the active submission item id', () => {
					expect(deleteActiveSubmissionItemId).toHaveBeenCalledWith(req.session);
				});
				it('should redirct to the next page', () => {
					expect(res.redirect).toHaveBeenCalledWith('add-another-deadline-item');
				});
			});
			describe('and there is an error', () => {
				beforeEach(() => {
					setActiveSubmissionItemSubmitted.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					postCheckSubmissionItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
	});
});
