const {
	getBackLinkUrl
} = require('../../../../../../src/controllers/examination/check-submission-item/utils/get-back-link-url');

let {
	getActiveSubmissionItem,
	getActiveSubmissionItemFiles,
	getSubmissionItemPersonalInformation,
	getSubmissionItemType
} = require('../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn(),
	getActiveSubmissionItemFiles: jest.fn(),
	getSubmissionItemPersonalInformation: jest.fn(),
	getSubmissionItemType: jest.fn()
}));

describe('controllers/examination/check-submission-item/utils/get-back-link-url', () => {
	describe('#getBackLinkUrl', () => {
		describe('When getting the back link for check submission item page', () => {
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(true);
			});
			describe('and the submission type value is equal to "comment"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('comment');
					result = getBackLinkUrl();
				});
				it('Should return the back link url', () => {
					expect(result).toEqual({
						backLinkUrl: '/examination/comment-has-personal-information-or-not'
					});
				});
			});
			describe('and the submission type value is equal to "upload"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('upload');
				});
				describe('and there is more than one file and personal information is equal to "yes"', () => {
					beforeEach(() => {
						getSubmissionItemPersonalInformation.mockReturnValue('yes');
						getActiveSubmissionItemFiles.mockReturnValue(2);
						result = getBackLinkUrl();
					});
					it('Should return the back link url', () => {
						expect(result).toEqual({
							backLinkUrl: '/examination/which-files-have-personal-information-or-not'
						});
					});
				});
				describe('and has files and personal information is equal to "no"', () => {
					beforeEach(() => {
						getSubmissionItemPersonalInformation.mockReturnValue('no');
						getActiveSubmissionItemFiles.mockReturnValue(1);
						result = getBackLinkUrl();
					});
					it('Should return the back link url', () => {
						expect(result).toEqual({
							backLinkUrl: '/examination/files-have-personal-information-or-not'
						});
					});
				});
			});
			describe('and the submission type value is equal to "both"', () => {
				let result;
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('both');
					result = getBackLinkUrl();
				});
				describe('and the personal information value is equal to "yes"', () => {
					beforeEach(() => {
						getSubmissionItemPersonalInformation.mockReturnValue('yes');
						result = getBackLinkUrl();
					});
					it('Should return the back link url', () => {
						expect(result).toEqual({
							backLinkUrl: '/examination/select-which-files-comments-have-personal-information'
						});
					});
				});
				describe('and the personal information value is equal to "no"', () => {
					beforeEach(() => {
						getSubmissionItemPersonalInformation.mockReturnValue('no');
						result = getBackLinkUrl();
					});
					it('Should return the back link url', () => {
						expect(result).toEqual({
							backLinkUrl: '/examination/comment-file-has-personal-information-or-not'
						});
					});
				});
			});
			describe('and no required conditions are met', () => {
				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('no');
				});
				it('should throw the error', () => {
					expect(() => getBackLinkUrl()).toThrow('Unable to assign back link URL');
				});
			});
		});
	});
});
