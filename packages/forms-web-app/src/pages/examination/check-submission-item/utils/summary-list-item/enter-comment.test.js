const { getSummaryListItemEnterComment } = require('./index');

const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../_translations/en.json');

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

describe('examination/check-submission-item/utils/summary-list-item/enter-comment', () => {
	describe('#getSummaryListItemEnterComment', () => {
		describe('When getting the enter comment summary list item', () => {
			describe('and the submission item has a comment', () => {
				const mockSubmissionItem = {
					comment: 'comment'
				};
				const result = getSummaryListItemEnterComment(i18n, mockSubmissionItem);
				it('should return the summary list item', () => {
					expect(result).toEqual({
						actions: {
							items: [
								{
									href: 'enter-a-comment?mode=edit',
									text: 'Change',
									visuallyHiddenText: 'Your comment'
								}
							]
						},
						key: { text: 'Your comment' },
						value: { html: 'comment' }
					});
				});
			});
			describe('and the submission item does not have a comment', () => {
				const mockSubmissionItem = {};
				it('should throw an error', () => {
					expect(() => getSummaryListItemEnterComment(i18n, mockSubmissionItem)).toThrow(
						'Submission item does not have a comment'
					);
				});
			});
		});
	});
});
