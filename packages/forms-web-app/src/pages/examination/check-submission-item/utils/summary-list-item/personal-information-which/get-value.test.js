const { getPersonalInformationWhichValue } = require('./get-value');

let { getSubmissionItemFiles } = require('../../../../_session/submission-items-session');
const { mockI18n } = require('../../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../../_translations/en.json');

jest.mock('../../../../_session/submission-items-session', () => ({
	getSubmissionItemFiles: jest.fn()
}));

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

describe('examination/check-submission-item/utils/summary-list-item/personal-information-which/get-value', () => {
	describe('#getPersonalInformationWhichValue', () => {
		describe('When getting the value for the personal information which summary list item', () => {
			describe('and there are files that have personal informaion', () => {
				const mockSubmissionFiles = [
					{
						fileName: 'file name 1',
						personalInformation: 'no'
					},
					{
						fileName: 'file name 2',
						personalInformation: 'yes'
					}
				];
				beforeEach(() => {
					getSubmissionItemFiles.mockReturnValue(mockSubmissionFiles);
				});
				describe('and there is a comment that has personal information', () => {
					let result;
					beforeEach(() => {
						const mockSubmissionItem = {};
						mockSubmissionItem.commentPersonalInformation = 'yes';
						result = getPersonalInformationWhichValue(i18n, mockSubmissionItem);
					});
					it('should return a list', () => {
						expect(result).toEqual(
							'<ul class="govuk-list"><li>My comment</li><li>file name 2</li></ul>'
						);
					});
				});
				describe('and there is a comment that does NOT have personal information', () => {
					let result;
					beforeEach(() => {
						const mockSubmissionItem = {};
						mockSubmissionItem.commentPersonalInformation = 'no';
						result = getPersonalInformationWhichValue(i18n, mockSubmissionItem);
					});
					it('should return a list', () => {
						expect(result).toEqual('<ul class="govuk-list"><li>file name 2</li></ul>');
					});
				});
			});
			describe('and there are files that do NOT have personal informaion', () => {
				const mockSubmissionFiles = [
					{
						fileName: 'file name 1',
						personalInformation: 'no'
					},
					{
						fileName: 'file name 2',
						personalInformation: 'no'
					}
				];
				beforeEach(() => {
					getSubmissionItemFiles.mockReturnValue(mockSubmissionFiles);
				});
				describe('and there is a comment that does NOT have personal information', () => {
					const mockSubmissionItem = {};
					beforeEach(() => {
						mockSubmissionItem.commentPersonalInformation = 'no';
					});
					it('should throw an error', () => {
						expect(() => getPersonalInformationWhichValue(i18n, mockSubmissionItem)).toThrow(
							'Submission item does not contain any files or comment with personal information'
						);
					});
				});
			});
		});
	});
});
