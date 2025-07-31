const {
	noFileSelected,
	moreThanXAmountFiles,
	multipleFileValidations
} = require('./fileValidation');

const { mockI18n } = require('../../../../_mocks/i18n');

const examinationTranslations_EN = require('../../../_translations/en.json');

jest.mock('../../../_utils/file-upload/fileManagement', () => ({
	saveFileToDisk: jest.fn()
}));
jest.mock('../../../_utils/file-upload/fileSessionManagement', () => ({
	addFileToSession: jest.fn()
}));

const i18n = mockI18n({
	examination: examinationTranslations_EN
});

describe('examination/file-upload/fileValidation', () => {
	describe('#noFileSelected', () => {
		describe('When a file has not been selected to upload', () => {
			const files = [];
			const result = noFileSelected(i18n, files);
			it('should return the no file selected error', function () {
				expect(result).toEqual('Select a file');
			});
		});
		describe('When a file has been selected to upload', () => {
			const files = ['i am a file'];
			const result = noFileSelected(i18n, files);
			it('should return empty errors', function () {
				expect(result).toEqual();
			});
		});
	});

	describe('#moreThanXAmountFiles', () => {
		describe('when the amount of files uploaded and in session', () => {
			describe('are more than the total allowed', () => {
				const filesToAdd = [21];
				const currentFiles = 20;
				const result = moreThanXAmountFiles(i18n, filesToAdd, currentFiles);
				it('should then return the maximum file upload error', () => {
					expect(result).toEqual('You can only select a total of 20 files per submission');
				});
			});
			describe('are less than the total allowed', () => {
				const filesToAdd = [5];
				const currentFiles = [1, 2, 3, 4];
				const result = moreThanXAmountFiles(i18n, filesToAdd, currentFiles);
				it('should return empty', () => {
					expect(result).toEqual();
				});
			});
		});
	});

	describe('#multipleFileValidations', () => {
		describe('When a file has a potential error', () => {
			describe('and the file is okay', () => {
				const goodFile = { name: 'mock file', size: 100, mimetype: 'application/pdf' };
				const result = multipleFileValidations(i18n, goodFile);
				it('should return the file is empty error', () => {
					expect(result).toBeUndefined();
				});
			});
			describe('and the file is empty', () => {
				const emptyFile = { name: 'bad-size-file', size: 0, mimetype: 'application/pdf' };
				const result = multipleFileValidations(i18n, emptyFile);
				it('should return the file is empty error', () => {
					expect(result).toEqual('bad-size-file is empty');
				});
			});
			describe('and the file is larger than the allowed limit', () => {
				const badTooBigFile = {
					name: 'bad-too-bog-file',
					size: 63096545,
					mimetype: 'application/pdf'
				};
				const result = multipleFileValidations(i18n, badTooBigFile);
				it('should return the file is larger error', () => {
					expect(result).toEqual('bad-too-bog-file must be smaller than 50MB.');
				});
			});
			describe('and the file mimetype is not allowed', () => {
				const badMimeTypeFile = {
					name: 'bad-mime-type-file',
					size: 100,
					mimetype: 'application/bad'
				};
				const result = multipleFileValidations(i18n, badMimeTypeFile);
				it('should return the nad mimetype error', () => {
					expect(result).toEqual(
						'bad-mime-type-file must be a JPG, BMP, PNG, TIF, TIFF, DOC, JPEG, XLS, XSLX or PDF.'
					);
				});
			});
		});
	});
});
