const { getSummaryListItemEvidenceOrComment } = require('./evidence-or-comment');

const { mockI18n } = require('../../../../_mocks/i18n');

const commonTranslationsEN = require('../../../../../locales/en/common.json');
const examinationTranslationsEN = require('../../../_translations/en.json');

const i18n = mockI18n({
	common: commonTranslationsEN,
	examination: examinationTranslationsEN
});

describe('examination/check-submission-item/utils/summary-list-item/evidence-or-comment', () => {
	describe('#getSummaryListItemEvidenceOrComment', () => {
		describe('When getting the evidence or comment summary list item', () => {
			describe('and the submission item has a submission type value', () => {
				describe('and the value is equal to "comment"', () => {
					const mockSubmissionItem = {
						submissionType: 'comment'
					};

					const result = getSummaryListItemEvidenceOrComment(i18n, mockSubmissionItem);

					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { text: 'Make a comment' }
						});
					});
				});

				describe('and the value is equal to "upload"', () => {
					const mockSubmissionItem = {
						submissionType: 'upload'
					};

					const result = getSummaryListItemEvidenceOrComment(i18n, mockSubmissionItem);

					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { text: 'Upload files' }
						});
					});
				});

				describe('and the value is equal to "both"', () => {
					const mockSubmissionItem = {
						submissionType: 'both'
					};

					const result = getSummaryListItemEvidenceOrComment(i18n, mockSubmissionItem);

					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-upload-evidence-or-comment?mode=edit',
										text: 'Change',
										visuallyHiddenText: "How you've submitted your representation"
									}
								]
							},
							key: { text: "How you've submitted your representation" },
							value: { text: 'Make a comment and upload files' }
						});
					});
				});
			});

			describe('and the submission item does not have a submission type value', () => {
				it('it should throw an error', () => {
					expect(() => getSummaryListItemEvidenceOrComment(i18n, {})).toThrow(
						'Submission item submission type value is not a required option'
					);
				});
			});
		});
	});
});
