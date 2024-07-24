const { uploadHandler } = require('./upload-handler');

const { noFileSelected, moreThanXAmountFiles } = require('./errors/fileValidation');
const { mapErrorMessage, makeIntoArray, mapMultipleFileUploadErrors } = require('./helpers');
const {
	handleMultipleFileUploadsWithErrors
} = require('./errors/handleMultipleFileUploadsWithErrors');
const { getSubmissionFilesLength } = require('../../_session/submission-items-session');

const { mockI18n } = require('../../../_mocks/i18n');

const examinationTranslations_EN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslations_EN
});

jest.mock('./helpers', () => ({
	mapErrorMessage: jest.fn(),
	makeIntoArray: jest.fn(),
	mapMultipleFileUploadErrors: jest.fn()
}));

jest.mock('./errors/fileValidation', () => ({
	noFileSelected: jest.fn(),
	moreThanXAmountFiles: jest.fn()
}));

jest.mock('../../_session/submission-items-session', () => ({
	getSubmissionFilesLength: jest.fn()
}));

jest.mock('./errors/handleMultipleFileUploadsWithErrors', () => ({
	handleMultipleFileUploadsWithErrors: jest.fn()
}));
describe('examination/file-upload/fileValidation', () => {
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
					result = await uploadHandler(i18n, session, files);
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
					getSubmissionFilesLength.mockReturnValue('');
					mapErrorMessage.mockReturnValue(moreThanXAmountFilesError);
					moreThanXAmountFiles.mockReturnValue(moreThanXAmountFilesError);
					result = await uploadHandler(i18n, session, files);
				});
				it('should turn a single file into an array if not already', () => {
					expect(moreThanXAmountFiles).toHaveBeenCalledWith(i18n, [{ name: 'file-name' }], '');
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
					getSubmissionFilesLength.mockReturnValue('');
					makeIntoArray.mockReturnValue([{ name: 'file-name' }]);
					handleMultipleFileUploadsWithErrors.mockResolvedValue(multipleErrors);
					mapMultipleFileUploadErrors.mockReturnValue(mappedFileErrors);
					result = await uploadHandler(i18n, session, files);
				});
				it('should call the multiple file upload error function with session and an array of files', () => {
					expect(handleMultipleFileUploadsWithErrors).toHaveBeenCalledWith(
						i18n,
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
					getSubmissionFilesLength.mockReturnValue('');
					makeIntoArray.mockReturnValue([{ name: 'file-name' }]);
					handleMultipleFileUploadsWithErrors.mockResolvedValue(multipleErrors);
					mapMultipleFileUploadErrors.mockReturnValue('');
					result = await uploadHandler(i18n, session, files);
				});
				it('should call the multiple file upload error function with session and an array of files', () => {
					expect(handleMultipleFileUploadsWithErrors).toHaveBeenCalledWith(
						i18n,
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
