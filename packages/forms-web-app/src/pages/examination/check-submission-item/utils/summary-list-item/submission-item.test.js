const { getSummaryListItemSubmissionItem } = require('./index');

const { showDeadlineItemChangeUrl } = require('./show-deadline-item-change-url');
const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../_translations/en.json');

jest.mock('./show-deadline-item-change-url', () => ({
	showDeadlineItemChangeUrl: jest.fn()
}));

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

describe('examination/check-submission-item/utils/summary-list-item/submission-item', () => {
	describe('#getSummaryListItemSubmissionItem', () => {
		describe('When invoking the getSummaryListItemSubmissionItem function', () => {
			describe('and the session has a submission item value', () => {
				describe('and submission items has less than the number of items in deadline items', () => {
					let result;

					const mockSession = {
						examination: {
							activeSubmissionItemId: 1,
							submissionItems: [
								{
									itemId: 1,
									submissionItem: 'mock submission item',
									submissionItemWelsh: 'mock submission item Welsh'
								}
							]
						}
					};

					beforeEach(() => {
						showDeadlineItemChangeUrl.mockReturnValue(true);
						result = getSummaryListItemSubmissionItem(i18n, mockSession);
					});

					it('should return the object', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-deadline-item?mode=edit',
										text: 'Change',
										visuallyHiddenText: 'Deadline item'
									}
								]
							},
							key: { text: 'Deadline item' },
							value: { text: 'mock submission item' }
						});
					});
				});

				describe('and submission items has the same number of items as deadline items', () => {
					let result;

					const mockSession = {
						examination: {
							activeSubmissionItemId: 1,
							submissionItems: [
								{
									itemId: 1,
									submissionItem: 'mock submission item',
									submissionItemWelsh: 'mock submission item Welsh'
								}
							]
						}
					};

					beforeEach(() => {
						showDeadlineItemChangeUrl.mockReturnValue(false);
						result = getSummaryListItemSubmissionItem(i18n, mockSession);
					});

					it('should return the object', () => {
						expect(result).toEqual({
							key: { text: 'Deadline item' },
							value: { text: 'mock submission item' }
						});
					});
				});
			});

			describe('and the session does not have a submission item value', () => {
				const mockSession = {
					examination: {
						activeSubmissionItemId: 1,
						submissionItems: [
							{
								itemId: 2,
								submissionItem: 'mock submission item',
								submissionItemWelsh: 'mock submission item Welsh'
							}
						]
					}
				};

				it('should return throw an error', () => {
					expect(() => getSummaryListItemSubmissionItem(i18n, mockSession)).toThrow(
						'Can not find active submission item'
					);
				});
			});
		});
	});
});
