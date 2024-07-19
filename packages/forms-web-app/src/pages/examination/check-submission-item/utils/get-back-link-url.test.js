const { getBackLinkUrl } = require('./get-back-link-url');

const {
	getActiveSubmissionItem,
	getActiveSubmissionItemFiles,
	getSubmissionItemPersonalInformation,
	getSubmissionItemType
} = require('../../_session/submission-items-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../_session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn(),
	getActiveSubmissionItemFiles: jest.fn(),
	getSubmissionItemPersonalInformation: jest.fn(),
	getSubmissionItemType: jest.fn()
}));
jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

describe('examination/check-submission-item/utils/get-back-link-url', () => {
	describe('#getBackLinkUrl', () => {
		describe('When getting the back link for check submission item page', () => {
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(true);
				isQueryModeEdit.mockReturnValue(false);
			});

			describe('and has mode = edit in the query', () => {
				let result;

				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(true);
					result = getBackLinkUrl();
				});

				it('Should return the back link url', () => {
					expect(result).toEqual({
						backLinkUrl: 'add-another-deadline-item'
					});
				});
			});

			describe('and the submission type value is equal to "comment"', () => {
				let result;

				beforeEach(() => {
					getSubmissionItemType.mockReturnValue('comment');
					result = getBackLinkUrl();
				});

				it('Should return the back link url', () => {
					expect(result).toEqual({
						backLinkUrl: 'comment-has-personal-information-or-not'
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
							backLinkUrl: 'which-files-have-personal-information-or-not'
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
							backLinkUrl: 'files-have-personal-information-or-not'
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
							backLinkUrl: 'select-which-files-comments-have-personal-information'
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
							backLinkUrl: 'comment-file-has-personal-information-or-not'
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
