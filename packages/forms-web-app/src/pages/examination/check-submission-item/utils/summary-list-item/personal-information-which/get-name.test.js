const { getPersonalInformationWhichName } = require('./get-name');

let { getSubmissionItemType } = require('../../../../_session/submission-items-session');

const { mockI18n } = require('../../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../../_translations/en.json');

jest.mock('../../../../_session/submission-items-session', () => ({
	getSubmissionItemType: jest.fn()
}));

const i18n = mockI18n({ common: commonTranslations_EN, examination: examinationTranslations_EN });

describe('controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/get-name', () => {
	describe('#getPersonalInformationWhichName', () => {
		describe('When calling get personal information which name function', () => {
			describe('and the submission type is equal to "upload"', () => {
				let result;

				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('upload');
					result = getPersonalInformationWhichName(i18n, {});
				});

				it('should return', () => {
					expect(result).toEqual('Documents containing personal information');
				});
			});

			describe('and the submission type is equal to "both"', () => {
				let result;

				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('both');
					result = getPersonalInformationWhichName(i18n, []);
				});

				it('should return', () => {
					expect(result).toEqual('Documents or comments containing personal information');
				});
			});

			describe('and the submission type does not match an option', () => {
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('');
				});

				it('should throw an error', () => {
					expect(() => getPersonalInformationWhichName(i18n, {})).toThrow(
						'Submission item type does not match an option'
					);
				});
			});
		});
	});
});
