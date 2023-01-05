const {
	getPageData
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/get-page-data');
const {
	mapSubmissionItems
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/mapSubmissionItems');

const {
	hasMoreDeadlineItemsToSubmit
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/hasMoreDeadlineItemsToSubmit');
const {
	getBackLinkUrl
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/get-back-link-url');

jest.mock(
	'../../../../../../src/controllers/examination/add-another-deadline-item/utils/mapSubmissionItems',
	() => ({
		mapSubmissionItems: jest.fn()
	})
);

jest.mock(
	'../../../../../../src/controllers/examination/add-another-deadline-item/utils/hasMoreDeadlineItemsToSubmit',
	() => ({
		hasMoreDeadlineItemsToSubmit: jest.fn()
	})
);

jest.mock(
	'../../../../../../src/controllers/examination/add-another-deadline-item/utils/get-back-link-url',
	() => ({
		getBackLinkUrl: jest.fn()
	})
);
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
				result = getPageData(mockSession);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					hintHtml: 'Do you need to add another deadline item?',
					id: 'examination-add-another-deadline-item',
					name: 'You added one deadline item',
					options: [
						{
							text: 'Yes',
							value: 'yes'
						},
						{
							text: 'no',
							value: 'no'
						}
					],
					moreDeadlineItems: 'mocked deadline items to submit',
					pageTitle: 'You added one deadline item',
					submissionItems: 'mock items',
					title: 'You added one deadline item',
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
				result = getPageData(mockSession);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					hintHtml: 'Do you need to add another deadline item?',
					id: 'examination-add-another-deadline-item',
					name: 'You added one deadline item',
					options: [
						{
							text: 'Yes',
							value: 'yes'
						},
						{
							text: 'no',
							value: 'no'
						}
					],
					moreDeadlineItems: 'mocked deadline items to submit',
					pageTitle: 'You added one deadline item',
					hasNoSubmissionItems: true,
					title: 'You added one deadline item',
					backLinkUrl: 'mock back link'
				});
			});
		});
	});
});
