const path = require('path');
const fs = require('fs');

const {
	fileUploadPath,
	saveFileToDisk,
	deleteFileOnDisk,
	iterateDeleteFileOnDisk
} = require('./fileManagement');

const pathToController = path.join(__dirname, '../../../../../../../uploads/');

jest.mock('fs');
describe('examination/file-upload/fileManagement', () => {
	describe('#fileUploadPath', () => {
		describe('when getting the file upload path', () => {
			const mockFileName = 'mock-file-name';
			const result = fileUploadPath(mockFileName);
			it('should return the default calculated max file size', () => {
				expect(result).toContain(`${pathToController}${mockFileName}`);
			});
		});
	});

	describe('#saveFileToDisk', () => {
		describe('when saving a file to the disk', () => {
			const file = {
				name: 'file',
				mv: jest.fn()
			};
			let result;
			let uniqueFileName;
			beforeEach(async () => {
				Date.now = jest.fn(() => 1487076708000);
				uniqueFileName = Date.now() + `-${file.name}`;
				result = await saveFileToDisk(file);
			});
			it('should save the file to disk and return a file object', () => {
				expect(file.mv).toHaveBeenCalledWith(`${pathToController}${uniqueFileName}`);
				expect(result).toEqual({
					fileName: file.name,
					uniqueFileName: uniqueFileName,
					uploadPath: `${pathToController}${uniqueFileName}`
				});
			});
			it('should create a unique file name using the date and file name', () => {
				expect(result.uniqueFileName).toEqual(uniqueFileName);
			});
		});
	});

	describe('#deleteFileOnDisk', () => {
		describe('when deleting a file from the disk is successful', () => {
			const fileName = 'mock-file-name-to-delete';

			beforeEach(async () => {
				fs.unlinkSync = jest.fn().mockResolvedValue();
				await deleteFileOnDisk(fileName);
			});
			it('should save the file to disk and return a file object', () => {
				expect(fs.unlinkSync).toHaveBeenCalledWith(`${pathToController}${fileName}`);
			});
		});
		describe('when deleting a file from the disk fails', () => {
			const fileName = 'mock-file-name-to-delete';
			const error = new Error('Failed to remove file');
			beforeEach(() => {
				fs.unlinkSync = () => {
					throw error;
				};
			});
			it('should save the file to disk and return a file object', async () => {
				await expect(deleteFileOnDisk(fileName)).rejects.toThrow(error);
			});
		});
	});
	describe('#iterateDeleteFileOnDisk', () => {
		describe('when deleting all files from the disk for a submission item', () => {
			const files = [{ uniqueFileName: 'file-1' }, { uniqueFileName: 'file-2' }];

			beforeEach(async () => {
				fs.unlinkSync = jest.fn().mockResolvedValue();
				await iterateDeleteFileOnDisk(files);
			});
			it('should remove the first file on disk', () => {
				expect(fs.unlinkSync).toHaveBeenNthCalledWith(
					1,
					`${pathToController}${files[0].uniqueFileName}`
				);
			});
			it('should remove the second file  on disk', () => {
				expect(fs.unlinkSync).toHaveBeenNthCalledWith(
					2,
					`${pathToController}${files[1].uniqueFileName}`
				);
			});
		});
	});
});
