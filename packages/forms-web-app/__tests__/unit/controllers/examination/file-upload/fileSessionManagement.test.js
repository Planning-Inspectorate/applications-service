const {
	addFileToSession,
	deleteFileInSession,
	getUploadedFilesFromSession
} = require('../../../../../src/controllers/examination/file-upload/fileSessionManagement');
const {
	getActiveSubmissionItem
} = require('../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../src/controllers/examination/session/submission-items-session', () => ({
	getActiveSubmissionItem: jest.fn()
}));

describe('controllers/examination/file-upload/fileSessionManagement', () => {
	describe('#addFileToSession', () => {
		describe('when adding a file to session that is empty', () => {
			const session = {
				examination: {}
			};
			const selectedDeadline = {};
			const singleFile = { name: 'mock file name', raw: { data: '' } };
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(selectedDeadline);
				addFileToSession(session, singleFile);
			});

			it('should add the file to an array', () => {
				expect(selectedDeadline.files).toEqual([singleFile]);
			});
		});
		describe('when adding a single file to session that has items', () => {
			const singleFile = { name: 'mock file name', raw: { data: '' } };
			const file2 = { name: 'mock file name two', raw: { data: '' } };
			const session = {
				examination: {}
			};
			const selectedDeadline = { files: [singleFile] };
			beforeEach(() => {
				getActiveSubmissionItem.mockReturnValue(selectedDeadline);
				addFileToSession(session, file2);
			});

			it('should add the file into the array', () => {
				expect(selectedDeadline.files).toEqual([singleFile, file2]);
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
				getActiveSubmissionItem.mockReturnValue(selectedDeadline);
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
					getActiveSubmissionItem.mockReturnValue({});
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
					getActiveSubmissionItem.mockReturnValue(selectedDeadline);
					result = getUploadedFilesFromSession(mockSession);
				});
				it('should return an array of files', function () {
					expect(result).toEqual(['i am a file']);
				});
			});
		});
	});
});
