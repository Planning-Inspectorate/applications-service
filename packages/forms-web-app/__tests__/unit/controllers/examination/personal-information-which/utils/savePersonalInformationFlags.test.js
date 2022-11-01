const {
	addKeyValueToActiveSubmissionItem
} = require('../../../../../../src/controllers/examination/session/submission-items-session');
const {
	savePersonalInformationFlags
} = require('../../../../../../src/controllers/examination/personal-information-which/utils/savePersonalInformationFlags');
const {
	getUploadedFilesFromSession
} = require('../../../../../../src/controllers/examination/file-upload/fileSessionManagement');

jest.mock('../../../../../../src/controllers/examination/session/submission-items-session', () => ({
	addKeyValueToActiveSubmissionItem: jest.fn()
}));

jest.mock(
	'../../../../../../src/controllers/examination/file-upload/fileSessionManagement',
	() => ({
		getUploadedFilesFromSession: jest.fn()
	})
);

describe('#savePersonalInformationFlags', () => {
	describe('When marking an item as personal information', () => {
		describe('and the item is a comment', () => {
			describe('and the comment is to be marked', () => {
				const mockSession = 'mock session';
				const mockPersonalMarks = ['comment'];
				beforeEach(() => {
					getUploadedFilesFromSession.mockReturnValue([]);
					savePersonalInformationFlags(mockSession, mockPersonalMarks);
				});
				it('should add the comment personal information key to session', () => {
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						mockSession,
						'commentPersonalInformation',
						'yes'
					);
				});
			});
			describe('and the comment is NOT to be marked', () => {
				const mockSession = 'mock session';
				const mockPersonalMarks = [];
				beforeEach(() => {
					getUploadedFilesFromSession.mockReturnValue([]);
					savePersonalInformationFlags(mockSession, mockPersonalMarks);
				});
				it('should add the comment personal information key to session', () => {
					expect(addKeyValueToActiveSubmissionItem).toHaveBeenCalledWith(
						mockSession,
						'commentPersonalInformation',
						'no'
					);
				});
			});
		});
		describe('and the item is a unique file name', () => {
			const mockSession = 'mock session';
			const mockPersonalMarks = [
				'unique-file-name-should-not-be-here',
				'unique-file-name',
				'unique-file-name-3'
			];
			const mockFilesInSession = [
				{ uniqueFileName: 'unique-file-name' },
				{ uniqueFileName: 'unique-file-name-2' },
				{ uniqueFileName: 'unique-file-name-3' }
			];
			beforeEach(() => {
				getUploadedFilesFromSession.mockReturnValue(mockFilesInSession);
				savePersonalInformationFlags(mockSession, mockPersonalMarks);
			});
			it('should mark personal information as yes or no', () => {
				expect(mockFilesInSession).toEqual([
					{
						uniqueFileName: 'unique-file-name',
						personalInformation: 'yes'
					},
					{
						uniqueFileName: 'unique-file-name-2',
						personalInformation: 'no'
					},
					{
						uniqueFileName: 'unique-file-name-3',
						personalInformation: 'yes'
					}
				]);
			});
		});
		describe('and the item is a unique file name with personal information flag already set', () => {
			const mockSession = 'mock session';
			const mockPersonalMarks = ['unique-file-name-3'];
			const mockFilesInSession = [
				{ uniqueFileName: 'unique-file-name', personalInformation: 'yes' },
				{ uniqueFileName: 'unique-file-name-2' },
				{ uniqueFileName: 'unique-file-name-3' }
			];
			beforeEach(() => {
				getUploadedFilesFromSession.mockReturnValue(mockFilesInSession);
				savePersonalInformationFlags(mockSession, mockPersonalMarks);
			});
			it('should mark only files in the body with the flag', () => {
				expect(mockFilesInSession).toEqual([
					{
						uniqueFileName: 'unique-file-name',
						personalInformation: 'no'
					},
					{
						uniqueFileName: 'unique-file-name-2',
						personalInformation: 'no'
					},
					{
						uniqueFileName: 'unique-file-name-3',
						personalInformation: 'yes'
					}
				]);
			});
		});
	});
});
