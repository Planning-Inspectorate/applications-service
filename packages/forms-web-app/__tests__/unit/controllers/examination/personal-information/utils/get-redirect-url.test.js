const {
	getRedirectUrl
} = require('../../../../../../src/controllers/examination/personal-information/utils/get-redirect-url');

let {
	getActiveSubmissionItemFiles
} = require('../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItemFiles: jest.fn()
}));

describe('controllers/examination/personal-information/utils/get-redirect-url', () => {
	const mockSession = {};
	const personalInformationComment = 'examination-personal-information-comment';
	const personalInformationCommentFilesId = 'examination-personal-information-comment-files';
	const personalInformationFilesId = 'examination-personal-information-files';

	describe('#getRedirectUrl', () => {
		describe('When invoking the function', () => {
			describe(`and the id is not equal to '${personalInformationComment}'`, () => {
				describe(`and the value is equal to 'yes'`, () => {
					describe(`and the id is equal to '${personalInformationCommentFilesId}'`, () => {
						const result = getRedirectUrl(mockSession, personalInformationCommentFilesId, 'yes');
						it('should return the URL', () => {
							expect(result).toEqual(
								'/examination/select-which-files-comments-have-personal-information'
							);
						});
					});

					describe(`and the id is equal to '${personalInformationFilesId}'`, () => {
						describe(`and the examination session contains more than one file`, () => {
							let result;
							beforeEach(() => {
								getActiveSubmissionItemFiles.mockReturnValue(['file 1', 'file 2']);
								result = getRedirectUrl(mockSession, personalInformationFilesId, 'yes');
							});
							it('should return the URL', () => {
								expect(result).toEqual('/examination/which-files-have-personal-information-or-not');
							});
						});
						describe(`and the examination session contains one file`, () => {
							let result;
							beforeEach(() => {
								getActiveSubmissionItemFiles.mockReturnValue(['file 1']);
								result = getRedirectUrl(mockSession, personalInformationFilesId, 'yes');
							});
							it('should return the URL', () => {
								expect(result).toEqual('/examination/check-your-deadline-item');
							});
						});
					});
				});
			});
			describe(`in all other scenarios`, () => {
				const result = getRedirectUrl(mockSession, personalInformationComment, 'no');
				it('should return the URL', () => {
					expect(result).toEqual('/examination/check-your-deadline-item');
				});
			});
		});
	});
});
