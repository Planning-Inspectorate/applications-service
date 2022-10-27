const {
	deleteHandler,
	uploadHandler
} = require('../../../../../src/controllers/examination/file-upload/handlers');

const {
	getSelectedDeadlineFilesLength
} = require('../../../../../src/controllers/examination/utils/sessionHelpers');

const {
	deleteFileOnDisk
} = require('../../../../../src/controllers/examination/file-upload/fileManagement');
const {
	deleteFileInSession,
	getUploadedFilesFromSession
} = require('../../../../../src/controllers/examination/file-upload/fileSessionManagement');
const {
	noFileSelected,
	moreThanXAmountFiles
} = require('../../../../../src/controllers/examination/file-upload/fileValidation');
const {
	mapErrorMessage,
	makeIntoArray,
	mapMultipleFileUploadErrors
} = require('../../../../../src/controllers/examination/file-upload/utils');
const {
	handleMultipleFileUploadsWithErrors
} = require('../../../../../src/controllers/examination/file-upload/handleMultipleFileUploadsWithErrors');

jest.mock('../../../../../src/controllers/examination/file-upload/fileManagement', () => ({
	deleteFileOnDisk: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/utils/sessionHelpers', () => ({
	getSelectedDeadlineFilesLength: jest.fn()
}));

jest.mock('../../../../../src/controllers/examination/file-upload/utils', () => ({
	mapErrorMessage: jest.fn(),
	makeIntoArray: jest.fn(),
	mapMultipleFileUploadErrors: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/file-upload/fileSessionManagement', () => ({
	deleteFileInSession: jest.fn(),
	getUploadedFilesFromSession: jest.fn()
}));
jest.mock('../../../../../src/controllers/examination/file-upload/fileValidation', () => ({
	noFileSelected: jest.fn(),
	moreThanXAmountFiles: jest.fn()
}));

jest.mock(
	'../../../../../src/controllers/examination/file-upload/handleMultipleFileUploadsWithErrors',
	() => ({
		handleMultipleFileUploadsWithErrors: jest.fn()
	})
);
describe('controllers/examination/file-upload/fileValidation', () => {
	describe('#deleteHandler', () => {
		describe('When deleting a file', () => {
			const session = 'mock session';
			const fileName = 'mock-delete-me-file-name';
			beforeEach(() => {
				deleteHandler(session, fileName);
			});
			it('should delete the file from disk', () => {
				expect(deleteFileOnDisk).toHaveBeenCalledWith(fileName);
			});
			it('should delete the file from session', () => {
				expect(deleteFileInSession).toHaveBeenCalledWith(session, fileName);
			});
		});
	});

	describe('#uploadHandler', () => {
		describe('When a file needs to be validated', () => {
			const session = {};
			const noFileSelectedError = 'mock no file selected error';
			describe('and a file has not been selected', () => {
				let result;
				const files = [];
				beforeEach(async () => {
					noFileSelected.mockReturnValue(noFileSelectedError);
					mapErrorMessage.mockReturnValue(noFileSelectedError);
					result = await uploadHandler(session, files);
				});
				it('should return the no file selected error response', () => {
					expect(result).toEqual(noFileSelectedError);
				});
			});
			describe('and the amount of files is more than the allowed amount', () => {
				let result;
				const files = { documents: { name: 'file-name' } };
				const noFileSelectedError = undefined;
				const moreThanXAmountFilesError = 'mock more than error';
				beforeEach(async () => {
					noFileSelected.mockReturnValue(noFileSelectedError);
					makeIntoArray.mockReturnValue([{ name: 'file-name' }]);
					getSelectedDeadlineFilesLength.mockReturnValue('');
					mapErrorMessage.mockReturnValue(moreThanXAmountFilesError);
					moreThanXAmountFiles.mockReturnValue(moreThanXAmountFilesError);
					result = await uploadHandler(session, files);
				});
				it('should turn a single file into an array if not already', () => {
					expect(moreThanXAmountFiles).toHaveBeenCalledWith([{ name: 'file-name' }], '');
				});

				it('should return the more files than allowed error response', () => {
					expect(result).toEqual(moreThanXAmountFilesError);
				});
			});
			describe('and the files have a combination of good and bad files', () => {
				let result;
				const files = { documents: [{ name: 'file-name' }] };
				const noFileSelectedError = undefined;
				const moreThanXAmountFilesError = undefined;
				const multipleErrors = ['error-1', 'error-2'];
				const mappedFileErrors = 'mapped multiple errors';
				beforeEach(async () => {
					noFileSelected.mockReturnValue(noFileSelectedError);
					moreThanXAmountFiles.mockReturnValue(moreThanXAmountFilesError);
					getUploadedFilesFromSession.mockReturnValue('');
					makeIntoArray.mockReturnValue([{ name: 'file-name' }]);
					handleMultipleFileUploadsWithErrors.mockResolvedValue(multipleErrors);
					mapMultipleFileUploadErrors.mockReturnValue(mappedFileErrors);
					result = await uploadHandler(session, files);
				});
				it('should call the multiple file upload error function with session and an array of files', () => {
					expect(handleMultipleFileUploadsWithErrors).toHaveBeenCalledWith(
						session,
						files.documents
					);
				});

				it('should call the map multiple errors function', () => {
					expect(mapMultipleFileUploadErrors).toHaveBeenCalledWith(multipleErrors);
				});

				it('should return mapped multiple file errors', () => {
					expect(result).toEqual(mappedFileErrors);
				});
			});
			describe('and there are no errors', () => {
				let result;
				const files = { documents: [{ name: 'file-name' }] };
				const noFileSelectedError = undefined;
				const moreThanXAmountFilesError = undefined;
				const multipleErrors = [];
				beforeEach(async () => {
					noFileSelected.mockReturnValue(noFileSelectedError);
					moreThanXAmountFiles.mockReturnValue(moreThanXAmountFilesError);
					getUploadedFilesFromSession.mockReturnValue('');
					makeIntoArray.mockReturnValue([{ name: 'file-name' }]);
					handleMultipleFileUploadsWithErrors.mockResolvedValue(multipleErrors);
					mapMultipleFileUploadErrors.mockReturnValue('');
					result = await uploadHandler(session, files);
				});
				it('should call the multiple file upload error function with session and an array of files', () => {
					expect(handleMultipleFileUploadsWithErrors).toHaveBeenCalledWith(
						session,
						files.documents
					);
				});

				it('should return mapped multiple file errors', () => {
					expect(result).toEqual({
						errorMessage: false,
						errorSummary: []
					});
				});
			});
		});
	});
});
