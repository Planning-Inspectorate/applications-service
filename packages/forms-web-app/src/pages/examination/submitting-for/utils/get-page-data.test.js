const { getPageData } = require('./get-page-data');

const { getBackLinkUrl } = require('./get-back-link-url');
const { getSubmittingForOptions } = require('./get-submitting-for-options');
const { getDeadlineDetailsInterestedPartyNumberOrDefault } = require('../../_session/deadline');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));
jest.mock('./get-submitting-for-options', () => ({
	getSubmittingForOptions: jest.fn()
}));

jest.mock('../../_session/deadline', () => ({
	getDeadlineDetailsInterestedPartyNumberOrDefault: jest.fn()
}));

describe('controllers/examination/submitting-for/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the submitting for page', () => {
			let result;
			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('mock/return/url');
				getSubmittingForOptions.mockReturnValue([
					'mock option 1',
					'mock option 2',
					'mock option 3'
				]);
				getDeadlineDetailsInterestedPartyNumberOrDefault.mockReturnValue('');
				result = getPageData();
			});
			it('should return the submitting for page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'mock/return/url',
					id: 'examination-submitting-for',
					interestedPartyNumber: '',
					options: ['mock option 1', 'mock option 2', 'mock option 3'],
					pageTitle: 'Who are you making the submission for?',
					title: 'Who are you making the submission for?'
				});
			});
		});
	});
});
