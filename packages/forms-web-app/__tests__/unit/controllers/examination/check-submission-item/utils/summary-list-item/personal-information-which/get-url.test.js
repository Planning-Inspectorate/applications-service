const {
	getPersonalInformationWhichUrl
} = require('../../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/get-url');

let {
	getSubmissionItemType
} = require('../../../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock(
	'../../../../../../../../src/controllers/examination/session/submission-items-session',
	() => ({
		getSubmissionItemType: jest.fn()
	})
);

describe('controllers/examination/check-submission-item/utils/summary-list-item/personal-information-which/get-url', () => {
	describe('#getPersonalInformationWhichUrl', () => {
		describe('When calling get personal information which URL function', () => {
			describe('and the submission type is equal to "upload"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('upload');
					result = getPersonalInformationWhichUrl();
				});
				it('should return', () => {
					expect(result).toEqual('/examination/which-files-have-personal-information-or-not');
				});
			});
			describe('and the submission type is equal to "both"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('both');
					result = getPersonalInformationWhichUrl();
				});
				it('should return', () => {
					expect(result).toEqual(
						'/examination/select-which-files-comments-have-personal-information'
					);
				});
			});
			describe('and the submission type does not match an option', () => {
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('');
				});
				it('should throw an error', () => {
					expect(() => getPersonalInformationWhichUrl()).toThrow(
						'Submission item type does not match an option'
					);
				});
			});
		});
	});
});
