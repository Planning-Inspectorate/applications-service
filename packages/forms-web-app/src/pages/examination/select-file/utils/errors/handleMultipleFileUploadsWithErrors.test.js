const { saveFileToDisk } = require('../../../_utils/file-upload/fileManagement');
const { handleMultipleFileUploadsWithErrors } = require('./handleMultipleFileUploadsWithErrors');
const { addFileToSession } = require('../../../_utils/file-upload/fileSessionManagement');

const { mockI18n } = require('../../../../_mocks/i18n');

const commonTranslations_EN = require('../../../../../locales/en/common.json');
const examinationTranslations_EN = require('../../../_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	examination: examinationTranslations_EN
});

jest.mock('../../../_utils/file-upload/fileManagement', () => ({
	saveFileToDisk: jest.fn()
}));
jest.mock('../../../_utils/file-upload/fileSessionManagement', () => ({
	addFileToSession: jest.fn()
}));

describe('#handleMultipleFileUploadsWithErrors', () => {
	describe('When an array of files could have file errors', () => {
		const goodFile = { name: 'mock file', size: 100, mimetype: 'application/pdf' };
		const emptyFile = { name: 'bad-size-file', size: 0, mimetype: 'application/pdf' };
		const badMimeTypeFile = {
			name: 'bad-mime-type-file',
			size: 100,
			mimetype: 'application/bad'
		};
		const badTooBigFile = {
			name: 'bad-too-bog-file',
			size: 63096545,
			mimetype: 'application/pdf'
		};

		describe('and the array has no errors', () => {
			const files = [goodFile];
			const session = {};
			const saveFileDiskMockResponse = { name: 'data' };
			let result;
			beforeEach(async () => {
				saveFileToDisk.mockResolvedValue(saveFileDiskMockResponse);
				result = await handleMultipleFileUploadsWithErrors(i18n, session, files);
			});

			it('should save files to disk', () => {
				expect(saveFileToDisk).toHaveBeenCalledWith(goodFile);
			});

			it('should save files to session', () => {
				expect(addFileToSession).toHaveBeenCalledWith(session, {
					raw: goodFile,
					...saveFileDiskMockResponse
				});
			});

			it('should return an empty array', () => {
				expect(result).toEqual([]);
			});
		});
		describe('and the array of files has good files and bad files', () => {
			const files = [goodFile, emptyFile, badMimeTypeFile, badTooBigFile];
			const session = {};
			const saveFileDiskMockResponse = { name: 'data' };
			let result;
			beforeEach(async () => {
				saveFileToDisk.mockResolvedValue(saveFileDiskMockResponse);
				result = await handleMultipleFileUploadsWithErrors(i18n, session, files);
			});

			it('should save the good file to disk', () => {
				expect(saveFileToDisk).toHaveBeenCalledWith(goodFile);
			});

			it('should save the good file to session', () => {
				expect(addFileToSession).toHaveBeenCalledWith(session, {
					raw: goodFile,
					...saveFileDiskMockResponse
				});
			});

			it('should return empty errors', () => {
				expect(result).toEqual([
					'bad-size-file is empty',
					'bad-mime-type-file must be a JPG, BMP, PNG, TIF, TIFF, DOC, JPEG, XLS, XSLX or PDF.',
					'bad-too-bog-file must be smaller than 50MB.'
				]);
			});
		});
		describe('and the array of files has files with disallowed mimetypes', () => {
			const files = [badMimeTypeFile];
			const session = {};
			let result;
			beforeEach(async () => {
				result = await handleMultipleFileUploadsWithErrors(i18n, session, files);
			});

			it('should return errors', () => {
				expect(result).toEqual([
					'bad-mime-type-file must be a JPG, BMP, PNG, TIF, TIFF, DOC, JPEG, XLS, XSLX or PDF.'
				]);
			});
		});
		describe('and the array of files has a file that is empty', () => {
			const files = [emptyFile];
			const session = {};
			let result;
			beforeEach(async () => {
				result = await handleMultipleFileUploadsWithErrors(i18n, session, files);
			});

			it('should return errors', () => {
				expect(result).toEqual(['bad-size-file is empty']);
			});
		});
		describe('and the array of files has a file that exceeds the maximum file upload size', () => {
			const files = [badTooBigFile];
			const session = {};
			let result;
			beforeEach(async () => {
				result = await handleMultipleFileUploadsWithErrors(i18n, session, files);
			});

			it('should return errors', () => {
				expect(result).toEqual(['bad-too-bog-file must be smaller than 50MB.']);
			});
		});
	});
});
