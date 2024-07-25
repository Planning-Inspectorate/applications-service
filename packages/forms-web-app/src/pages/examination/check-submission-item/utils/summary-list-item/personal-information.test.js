const { getSummaryListItemPersonalInformation } = require('./index');

const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');

const i18n = mockI18n({
	common: commonTranslations_EN
});

describe('examination/check-submission-item/utils/summary-list-item', () => {
	describe('#getSummaryListItemPersonalInformation', () => {
		describe('When getting the personal information summary list item', () => {
			describe('and the submission item has a personal information value', () => {
				describe('and is equal to "yes"', () => {
					describe('and the submission item has a submission type value', () => {
						describe('and is equal to "comment"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'comment'
							};

							const result = getSummaryListItemPersonalInformation(i18n, mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: 'comment-has-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('and is equal to "upload"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'upload'
							};

							const result = getSummaryListItemPersonalInformation(i18n, mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: 'files-have-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('and is equal to "both"', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: 'both'
							};

							const result = getSummaryListItemPersonalInformation(i18n, mockSubmissionItem);

							it('should return a summary list item', () => {
								expect(result).toEqual({
									actions: {
										items: [
											{
												href: 'comment-file-has-personal-information-or-not',
												text: 'Change',
												visuallyHiddenText: 'Personal information'
											}
										]
									},
									key: { text: 'Personal information' },
									value: { html: 'Yes' }
								});
							});
						});
						describe('that does not match a required option', () => {
							const mockSubmissionItem = {
								personalInformation: 'yes',
								submissionType: ''
							};

							it('should return throw an error', () => {
								expect(() =>
									getSummaryListItemPersonalInformation(i18n, mockSubmissionItem)
								).toThrow('Submission item submission type value does not match a required option');
							});
						});
					});
				});
				describe('and is equal to "no"', () => {
					const mockSubmissionItem = {
						personalInformation: 'no',
						submissionType: 'comment'
					};

					const result = getSummaryListItemPersonalInformation(i18n, mockSubmissionItem);

					it('should return a summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'comment-has-personal-information-or-not',
										text: 'Change',
										visuallyHiddenText: 'Personal information'
									}
								]
							},
							key: { text: 'Personal information' },
							value: { html: 'No' }
						});
					});
				});
				describe('that does not match a required option', () => {
					const mockSubmissionItem = {
						personalInformation: ''
					};

					it('should return throw an error', () => {
						expect(() => getSummaryListItemPersonalInformation(i18n, mockSubmissionItem)).toThrow(
							'Submission item personal information value is not a required option'
						);
					});
				});
			});
		});
	});
});
