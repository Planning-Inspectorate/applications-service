const { getPageData } = require('./page-data');

let { getActiveSubmissionItem } = require('../../_session/submission-items-session');
let { getBackLinkUrl } = require('./get-back-link-url');
let { getCurrentViewSession } = require('../../../../controllers/session/current-view-session');

const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../locales/en/common.json');

const i18n = mockI18n({ common: commonTranslations_EN }, 'en');

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
		id: 'id'
	};
	describe('when setting the page data', () => {
		describe('and there is not a personalInformation value', () => {
			let result;
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue({});
				getCurrentViewSession.mockReturnValue(mockSessionCurrentView);
				getBackLinkUrl.mockReturnValue(mockBackLinkUrl.backLinkUrl);
				result = getPageData(i18n, {});
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
				result = getPageData(i18n, {});
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
