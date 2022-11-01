const {
	submitUserUploadedFile,
	submitRepresentationFile
} = require('../../../src/services/ni.file.service');
const {
	REQUEST_FILE_DATA,
	SUBMISSION_DATA,
	FILE_DATA,
	RESPONSE_FILE_DATA
} = require('../../__data__/file');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/ni.api.service');
jest.mock('../../../src/utils/pdf');

const uploadFileService = require('../../../src/services/ni.api.service').uploadFile;
const updateSubmissionService =
	require('../../../src/services/submission.service').updateSubmission;
const textToPdfUtil = require('../../../src/utils/pdf').textToPdf;

describe('ni file service', () => {
	describe('submitUserUploadedFile', () => {
		it('invokes ni file upload and makes submission', async () => {
			const submissionData = await submitUserUploadedFile(SUBMISSION_DATA, REQUEST_FILE_DATA);

			expect(uploadFileService).toBeCalledWith(FILE_DATA);
			expect(updateSubmissionService).toBeCalledWith({
				id: 123,
				file: FILE_DATA
			});
			expect(submissionData).toEqual({
				...SUBMISSION_DATA,
				file: RESPONSE_FILE_DATA
			});
		});
	});

	describe('submitRepresentationFile', () => {
		const mockPDFFileBuffer = Buffer.from('some pdf bytes');
		const mockPDFFileBufferSize = mockPDFFileBuffer.length;
		const mockPDFFileMD5 = '83e558163511ae9c04dd03b3a7eeb45f';
		const submissionData = {
			...SUBMISSION_DATA,
			representation: 'hello world'
		};

		it('invokes ni file upload with generated pdf', async () => {
			textToPdfUtil.mockReturnValueOnce(mockPDFFileBuffer);

			const updatedSubmissionData = await submitRepresentationFile(submissionData);

			expect(textToPdfUtil).toBeCalledWith('Submission ID: 123\n\nhello world');
			expect(uploadFileService).toBeCalledWith({
				name: 'Joe-Bloggs-Written-Representation-123-1.pdf',
				originalName: 'Joe-Bloggs-Written-Representation-123-1.pdf',
				buffer: mockPDFFileBuffer,
				size: mockPDFFileBufferSize,
				mimeType: 'application/pdf',
				md5: mockPDFFileMD5
			});
			expect(updatedSubmissionData).toEqual({
				...submissionData,
				file: {
					name: 'Joe-Bloggs-Written-Representation-123-1.pdf',
					originalName: 'Joe-Bloggs-Written-Representation-123-1.pdf',
					size: mockPDFFileBufferSize,
					md5: mockPDFFileMD5
				}
			});
		});
	});
});
