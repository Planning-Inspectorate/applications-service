const { getPageData } = require('./page-data');
let { getActiveSubmissionItem } = require('../../_session/submission-items-session');
let { getBackLinkUrl } = require('./get-back-link-url');
let { getCurrentViewSession } = require('../../../../controllers/session/current-view-session');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

jest.mock('../../../../controllers/session/current-view-session', () => ({
	getCurrentViewSession: jest.fn()
}));

describe('#getPageData', () => {
	const mockBackLinkUrl = {
		backLinkUrl: 'back link url'
	};
	const mockPageData = {
		hintHtml:
			"<span>Check if your submission contains information about:</span><ul><li>children</li><li>health</li><li>crime</li></ul><span>This also includes any information relating to an individual's:</span><ul><li>race</li><li>ethnic origin</li><li>politics</li><li>religion</li><li>trade union membership</li><li>genetics</li><li>biometrics</li><li>sex life</li><li>sexual orientation</li></ul>",
		options: [
			{
				text: 'Yes',
				value: 'yes'
			},
			{
				text: 'No',
				value: 'no'
			}
		]
	};
	const mockSessionCurrentView = {
		id: 'id',
		pageTitle: 'pageTitle',
		title: 'title'
	};
	describe('when setting the page data', () => {
		describe('and there is not a personalInformation value', () => {
			let result;
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue({});
				getCurrentViewSession.mockReturnValue(mockSessionCurrentView);
				getBackLinkUrl.mockReturnValue(mockBackLinkUrl.backLinkUrl);
				result = getPageData({});
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					...mockBackLinkUrl,
					...mockPageData,
					...mockSessionCurrentView
				});
			});
		});
		describe('and there is a personalInformation value', () => {
			let result;
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue({ personalInformation: 'yes' });
				getCurrentViewSession.mockReturnValue(mockSessionCurrentView);
				getBackLinkUrl.mockReturnValue(mockBackLinkUrl.backLinkUrl);
				result = getPageData({});
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					...mockBackLinkUrl,
					...mockPageData,
					...mockSessionCurrentView,
					options: [
						{
							...mockPageData.options[0],
							checked: 'checked'
						},
						mockPageData.options[1]
					]
				});
			});
		});
	});
});
