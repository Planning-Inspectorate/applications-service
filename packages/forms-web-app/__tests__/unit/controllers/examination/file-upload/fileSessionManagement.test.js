let {
	getSelectedDeadlineItemFromSession
} = require('../../../../../src/controllers/examination/utils/sessionHelpers');

const {
	addFileToSession,
	deleteFileInSession,
	getUploadedFilesFromSession
} = require('../../../../../src/controllers/examination/file-upload/fileSessionManagement');

jest.mock('../../../../../src/controllers/examination/utils/sessionHelpers', () => ({
	getSelectedDeadlineItemFromSession: jest.fn()
}));

describe('controllers/examination/file-upload/fileSessionManagement', () => {
	describe('#addFileToSession', () => {
		describe('when adding a file to session that is empty', () => {
			const session = {
				examination: {}
			};
			const selectedDeadline = {};
			const singleFile = { name: 'mock file name' };
			beforeEach(() => {
				getSelectedDeadlineItemFromSession.mockReturnValue(selectedDeadline);
				addFileToSession(session, singleFile);
			});

			it('should add the file to an array', () => {
				expect(selectedDeadline.files).toEqual([singleFile]);
			});
		});
		describe('when adding a single file to session that has items', () => {
			const singleFile = { name: 'mock file name' };
			const file2 = { name: 'mock file name two' };
			const session = {
				examination: {}
			};
			const selectedDeadline = { files: [singleFile] };
			beforeEach(() => {
				getSelectedDeadlineItemFromSession.mockReturnValue(selectedDeadline);
				addFileToSession(session, file2);
			});

			it('should add the file into the array', () => {
				expect(selectedDeadline.files).toEqual([singleFile, file2]);
			});
		});
		describe('when adding an array of files to session that has items', () => {
			const singleFile = { name: 'mock file name' };
			const session = {
				examination: {}
			};
			const selectedDeadline = { files: [singleFile] };
			const arrayOfFiles = [{ name: 'mock file name two' }, { name: 'mock file name three' }];

			beforeEach(() => {
				getSelectedDeadlineItemFromSession.mockReturnValue(selectedDeadline);
				addFileToSession(session, arrayOfFiles);
			});

			it('should add the file into the array', () => {
				expect(selectedDeadline.files).toEqual([singleFile, arrayOfFiles]);
			});
		});
	});
	describe('#deleteFileInSession', () => {
		describe('when deleting a file in the session', () => {
			const itemToDelete = { uniqueFileName: 'two' };
			const expectedArray = [{ uniqueFileName: 'one' }, { uniqueFileName: 'three' }];
			const session = {
				examination: {}
			};
			const selectedDeadline = {
				files: [...expectedArray, itemToDelete]
			};
			beforeEach(() => {
				getSelectedDeadlineItemFromSession.mockReturnValue(selectedDeadline);
				deleteFileInSession(session, 'two');
			});

			it('should add the file to an array', () => {
				expect(selectedDeadline.files).toEqual(expectedArray);
			});
		});
	});
	describe('#getUploadedFilesFromSession', () => {
		describe('when getting any uploaded file from session', () => {
			describe('and there are no files in session', () => {
				let result;
				beforeEach(() => {
					getSelectedDeadlineItemFromSession.mockReturnValue({});
					result = getUploadedFilesFromSession();
				});

				it('should return an empty array', function () {
					expect(result).toEqual([]);
				});
			});
			describe('and there are files stored in session', () => {
				const mockSession = { examination: {} };
				const selectedDeadline = {
					files: ['i am a file']
				};
				let result;
				beforeEach(() => {
					getSelectedDeadlineItemFromSession.mockReturnValue(selectedDeadline);
					result = getUploadedFilesFromSession(mockSession);
				});
				it('should return an array of files', function () {
					expect(result).toEqual(['i am a file']);
				});
			});
		});
	});
});
