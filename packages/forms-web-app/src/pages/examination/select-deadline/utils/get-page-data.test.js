const { getPageData } = require('./get-page-data');

const { markActiveDeadlineItemAsChecked } = require('./markActiveDeadlineItemAsChecked');
const { getDeadlineItemStillToSubmit } = require('../../_session/deadlineItems-session');
const { getActiveSubmissionItemId } = require('../../_session/submission-items-session');
const { getBackLinkUrl } = require('./get-back-link-url');

jest.mock('./markActiveDeadlineItemAsChecked', () => ({
	markActiveDeadlineItemAsChecked: jest.fn()
}));
jest.mock('../../_session/deadlineItems-session', () => ({
	getDeadlineItemStillToSubmit: jest.fn()
}));
jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItemId: jest.fn()
}));
jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

describe('examination/select-deadline/utils/get-page-data', () => {
	const req = {
		query: 'mock query',
		session: 'mock session'
	};

	const pageData = {
		backLinkUrl: 'mock back link url',
		hintText:
			'Select the item you want to submit against. You can submit against another item later.',
		id: 'examination-select-deadline',
		options: 'mock deadline items array',
		pageTitle: 'Which item would you like to submit against for this deadline?',
		title: 'Which item would you like to submit against for this deadline?'
	};

	const mockDeadlineItems = 'mock deadline items array';
	const mockActiveSubmissionItemId = 'mock active submission item id';
	const mockDeadlineItemsWithChecked = 'mock deadline items array with a checked value';

	describe('#getPageData', () => {
		describe('When getting the page data for the select deadline page', () => {
			describe('and there is no active submission item id', () => {
				let result;
				beforeEach(() => {
					getBackLinkUrl.mockReturnValue(pageData.backLinkUrl);
					getDeadlineItemStillToSubmit.mockReturnValue(mockDeadlineItems);
					result = getPageData(req.query, req.session);
				});
				it('should call the functions', () => {
					expect(getBackLinkUrl).toHaveBeenCalledWith(req.query, req.session);
					expect(getDeadlineItemStillToSubmit).toHaveBeenCalledWith(req.session);
				});
				it('should return the page data with no checked option', () => {
					expect(result).toEqual(pageData);
				});
			});
			describe('and there is an active submission item id', () => {
				let result;
				beforeEach(() => {
					getBackLinkUrl.mockReturnValue(pageData.backLinkUrl);
					getDeadlineItemStillToSubmit.mockReturnValue(mockDeadlineItems);
					getActiveSubmissionItemId.mockReturnValue(mockActiveSubmissionItemId);
					markActiveDeadlineItemAsChecked.mockReturnValue(mockDeadlineItemsWithChecked);
					result = getPageData(req.query, req.session);
				});
				it('should call the functions', () => {
					expect(getBackLinkUrl).toHaveBeenCalledWith(req.query, req.session);
					expect(getDeadlineItemStillToSubmit).toHaveBeenCalledWith(req.session);
					expect(getActiveSubmissionItemId).toHaveBeenCalledWith(req.session);
					expect(markActiveDeadlineItemAsChecked).toHaveBeenCalledWith(
						mockDeadlineItems,
						mockActiveSubmissionItemId
					);
				});
				it('should return the page data with a checked option', () => {
					expect(result).toEqual({ ...pageData, options: mockDeadlineItemsWithChecked });
				});
			});
		});
	});
});
