const { submitFile } = require('../../../src/services/ni.file.service');
const {
	REQUEST_FILE_DATA,
	SUBMISSION_DATA,
	FILE_DATA,
	RESPONSE_FILE_DATA
} = require('../../__data__/file');

jest.mock('../../../src/services/submission.service');
jest.mock('../../../src/services/ni.api.service');

const uploadFileService = require('../../../src/services/ni.api.service').uploadFile;
const updateSubmissionService =
	require('../../../src/services/submission.service').updateSubmission;

describe('ni file service', () => {
	describe('submitFile', () => {
		it('invokes ni file upload and makes submission', async () => {
			const submissionData = await submitFile(SUBMISSION_DATA, REQUEST_FILE_DATA);

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
});
