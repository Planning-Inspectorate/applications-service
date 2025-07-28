const { getSummaryListItemSelectFile } = require('./index');

const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../_translations/en.json');

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

describe('examination/check-submission-item/utils/summary-list-item', () => {
	describe('#getSummaryListItemSelectFile', () => {
		describe('When invoking the getSummaryListItemSelectFile function', () => {
			describe('and the function is invoked', () => {
				describe('and the submission item does not have files', () => {
					const mockSubmissionItem = {};
					it('should throw an error', () => {
						expect(() => getSummaryListItemSelectFile(i18n, mockSubmissionItem)).toThrow(
							'No files for submission item'
						);
					});
				});
				describe('and the submission item has one file', () => {
					const mockSubmissionItem = {
						files: [
							{
								fileName: 'file name 1'
							}
						]
					};
					const result = getSummaryListItemSelectFile(i18n, mockSubmissionItem);
					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-a-file?mode=edit',
										text: 'Change',
										visuallyHiddenText: 'Documents uploaded'
									}
								]
							},
							key: { text: 'Documents uploaded' },
							value: { html: '<ul class="govuk-list"><li>file name 1</li></ul>' }
						});
					});
				});
				describe('and the submission item has more than one file', () => {
					const mockSubmissionItem = {
						files: [
							{
								fileName: 'file name 1'
							},
							{
								fileName: 'file name 2'
							}
						]
					};
					const result = getSummaryListItemSelectFile(i18n, mockSubmissionItem);
					it('should return the summary list item', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: 'select-a-file?mode=edit',
										text: 'Change',
										visuallyHiddenText: 'Documents uploaded'
									}
								]
							},
							key: { text: 'Documents uploaded' },
							value: {
								html: '<ul class="govuk-list"><li>file name 1</li><li>file name 2</li></ul>'
							}
						});
					});
				});
			});
		});
	});
});
