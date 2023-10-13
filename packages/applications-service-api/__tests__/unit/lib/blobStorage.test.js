jest.mock('../../../src/lib/logger');
const logger = require('../../../src/lib/logger');

const mockUploadData = jest.fn();
const mockBlobServiceClient = jest.fn();
jest.mock('@azure/storage-blob', () => ({
	BlobServiceClient: mockBlobServiceClient
}));

const { REQUEST_FILE_DATA } = require('../../__data__/file');
const { upload } = require('../../../src/lib/blobStorage');

describe('blob storage', () => {
	describe('upload', () => {
		afterEach(() => {
			mockUploadData.mockReset();
			mockBlobServiceClient.mockReset();
		});
		const error = new Error('some error');

		it('invokes azure sdk upload function with file', async () => {
			mockBlobServiceClient.mockReturnValue({
				getContainerClient: jest.fn().mockReturnValue({
					getBlockBlobClient: jest.fn().mockReturnValue({
						uploadData: mockUploadData
					})
				})
			});

			await upload(REQUEST_FILE_DATA.buffer, REQUEST_FILE_DATA.mimeType, 'some-path/Test.pdf');

			expect(mockUploadData).toBeCalledWith(REQUEST_FILE_DATA.buffer, {
				blobHTTPHeaders: { blobContentType: REQUEST_FILE_DATA.mimeType }
			});
		});

		it('logs an error and rethrows if upload fails', async () => {
			mockBlobServiceClient.mockReturnValue({
				getContainerClient: jest.fn().mockReturnValue({
					getBlockBlobClient: jest.fn().mockReturnValue({
						uploadData: mockUploadData
					})
				})
			});
			mockUploadData.mockImplementation(() => {
				throw error;
			});

			await expect(() =>
				upload(REQUEST_FILE_DATA.buffer, REQUEST_FILE_DATA.mimeType, 'some-path/Test.pdf')
			).rejects.toEqual(error);
			expect(logger.error).toBeCalledWith('Error uploading file to Blob Storage');
		});

		it('logs an error message and rethrows if creating blob client fails', async () => {
			mockBlobServiceClient.mockImplementation(() => {
				throw error;
			});

			await expect(() =>
				upload(REQUEST_FILE_DATA.buffer, REQUEST_FILE_DATA.mimeType, 'some-path/Test.pdf')
			).rejects.toEqual(error);
			expect(logger.error).toBeCalledWith('Error creating BlobServiceClient');
		});
	});
});
