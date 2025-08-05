jest.mock('../../../src/lib/blobStorage');
jest.mock('uuid');
const { upload } = require('../../../src/lib/blobStorage');
const uuid = require('uuid');

const {
	generateRepresentationPDF,
	uploadSubmissionFileToBlobStorage
} = require('../../../src/utils/file');

describe('file utils', () => {
	describe('generateRepresentationPDF', () => {
		it('returns file data', () => {
			const fileData = generateRepresentationPDF(1, 'hi', 'hi.pdf');

			expect(fileData.name).toEqual('hi.pdf');
			expect(fileData.originalName).toEqual('hi.pdf');
			expect(fileData.size).toEqual(3233);
			expect(fileData.mimeType).toEqual('application/pdf');
		});
	});

	describe('uploadSubmissionFileToBlobStorage', () => {
		it('invokes blob storage client with file', async () => {
			uuid.v4.mockReturnValue('some-uuid');
			const fileData = {
				originalName: 'Test.pdf',
				buffer: Buffer.from([]),
				mimeType: 'application/pdf'
			};

			await uploadSubmissionFileToBlobStorage(fileData);

			expect(upload).toBeCalledWith(fileData.buffer, fileData.mimeType, 'some-uuid/1');
		});
	});
});
