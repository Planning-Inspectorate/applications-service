const { personalInformationWhichIsValid } = require('./is-valid');

let {
	getSubmissionItemType,
	getSubmissionItemFiles,
	getSubmissionItemPersonalInformation
} = require('../../../../_session/submission-items-session');

jest.mock('../../../../_session/submission-items-session', () => ({
	getSubmissionItemType: jest.fn(),
	getSubmissionItemFiles: jest.fn(),
	getSubmissionItemPersonalInformation: jest.fn()
}));

describe('examination/check-submission-item/utils/summary-list-item/personal-information-which/is-valid', () => {
	describe('#personalInformationWhichIsValid', () => {
		describe('When the function is invoked', () => {
			describe('and the submission item personal information is equal to "no"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemPersonalInformation.mockReturnValue('no');
					result = personalInformationWhichIsValid();
				});
				it('should return the boolean', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and the submission item personal information is equal to "yes"', () => {
				beforeEach(() => {
					getSubmissionItemPersonalInformation.mockReturnValue('yes');
				});
				describe('and the submission type is equal to "upload"', () => {
					beforeEach(() => {
						getSubmissionItemType.mockReturnValue('upload');
					});
					describe('and there is one file', () => {
						let result;
						beforeEach(() => {
							getSubmissionItemFiles.mockReturnValue(['file 1']);
							result = personalInformationWhichIsValid();
						});
						it('should return the boolean', () => {
							expect(result).toEqual(false);
						});
					});
					describe('and there is more than one file', () => {
						let result;
						beforeEach(() => {
							getSubmissionItemFiles.mockReturnValue(['file 1', 'file 2']);
							result = personalInformationWhichIsValid();
						});
						it('should return the boolean', () => {
							expect(result).toEqual(true);
						});
					});
				});
				describe('and the submission type is equal to "both"', () => {
					let result;
					beforeEach(() => {
						getSubmissionItemType.mockReturnValue('both');
						result = personalInformationWhichIsValid();
					});
					it('should return the boolean', () => {
						expect(result).toEqual(true);
					});
				});
				describe('and the submission type does not match a condition', () => {
					let result;
					beforeEach(() => {
						getSubmissionItemType.mockReturnValue('comment');
						result = personalInformationWhichIsValid();
					});
					it('should return the boolean', () => {
						expect(result).toEqual(false);
					});
				});
			});
		});
	});
});
