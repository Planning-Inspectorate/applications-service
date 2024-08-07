const { getPageData } = require('./get-page-data');

const { mapSubmissionItems } = require('./mapSubmissionItems');
const { hasMoreDeadlineItemsToSubmit } = require('./hasMoreDeadlineItemsToSubmit');
const { getBackLinkUrl } = require('./get-back-link-url');
const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslationsEN = require('../../../../locales/en/common.json');

const i18n = mockI18n({
	common: commonTranslationsEN
});

jest.mock('./mapSubmissionItems', () => ({
	mapSubmissionItems: jest.fn()
}));
jest.mock('./hasMoreDeadlineItemsToSubmit', () => ({
	hasMoreDeadlineItemsToSubmit: jest.fn()
}));
jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

describe('#getPageData', () => {
	describe('When getting the page data for add another deadline item', () => {
		describe('and there are no issues', () => {
			let result;
			const mockSession = 'mock session';
			const mockedSubmissionItems = { submissionItems: 'mock items' };
			const mockedDeadlineItemsToSubmit = 'mocked deadline items to submit';
			beforeEach(() => {
				mapSubmissionItems.mockReturnValue(mockedSubmissionItems);
				hasMoreDeadlineItemsToSubmit.mockReturnValue(mockedDeadlineItemsToSubmit);
				getBackLinkUrl.mockReturnValue('mock back link');
				result = getPageData(i18n, mockSession);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					id: 'examination-add-another-deadline-item',
					options: [
						{
							text: 'Yes',
							value: 'yes'
						},
						{
							text: 'No',
							value: 'no'
						}
					],
					moreDeadlineItems: 'mocked deadline items to submit',
					submissionItems: 'mock items',
					backLinkUrl: 'mock back link'
				});
			});
		});
		describe('and there there are no submission items', () => {
			let result;
			const mockSession = 'mock session';
			const mockedSubmissionItems = { hasNoSubmissionItems: true };
			const mockedDeadlineItemsToSubmit = 'mocked deadline items to submit';
			beforeEach(() => {
				mapSubmissionItems.mockReturnValue(mockedSubmissionItems);
				hasMoreDeadlineItemsToSubmit.mockReturnValue(mockedDeadlineItemsToSubmit);
				getBackLinkUrl.mockReturnValue('mock back link');
				result = getPageData(i18n, mockSession);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					id: 'examination-add-another-deadline-item',
					options: [
						{
							text: 'Yes',
							value: 'yes'
						},
						{
							text: 'No',
							value: 'no'
						}
					],
					moreDeadlineItems: 'mocked deadline items to submit',
					hasNoSubmissionItems: true,
					backLinkUrl: 'mock back link'
				});
			});
		});
	});
});
