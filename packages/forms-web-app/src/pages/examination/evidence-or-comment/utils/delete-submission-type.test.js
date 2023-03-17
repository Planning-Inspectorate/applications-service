const { deleteSubmissionType } = require('./delete-submission-type');

let {
	deleteKeyFromActiveSubmissionItem,
	getActiveSubmissionItem
} = require('../../_session/submission-items-session');
const { iterateDeleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');

jest.mock('../../_session/submission-items-session', () => ({
	deleteKeyFromActiveSubmissionItem: jest.fn(),
	getActiveSubmissionItem: jest.fn()
}));

jest.mock('../../_utils/file-upload/fileManagement', () => ({
	iterateDeleteFileOnDisk: jest.fn()
}));

describe('examination/evidence-or-comment/utils/delete-submission-type', () => {
	const req = {
		session: 'mock session'
	};
	describe('#deleteSubmissionType', () => {
		describe('When the deleteSubmissionType function is called', () => {
			describe('and the submission type value is equal to "comment"', () => {
				describe('and the submission has files uploaded', () => {
					beforeEach(async () => {
						getActiveSubmissionItem.mockReturnValue({ files: ['mock-file'] });
						iterateDeleteFileOnDisk.mockResolvedValueOnce();
						await deleteSubmissionType(req.session, 'comment');
					});
					it('should call the getActiveSubmissionItem function', () => {
						expect(getActiveSubmissionItem).toHaveBeenCalledWith(req.session);
					});
					it('should call the iterateDeleteFileOnDisk function', () => {
						expect(iterateDeleteFileOnDisk).toHaveBeenCalledWith(['mock-file']);
					});
					it('should call the deleteKeyFromActiveSubmissionItem function', () => {
						expect(deleteKeyFromActiveSubmissionItem).toHaveBeenCalledWith(req.session, 'files');
					});
				});
				describe('and the submission does NOT have files uploaded', () => {
					beforeEach(async () => {
						getActiveSubmissionItem.mockReturnValue({});
						iterateDeleteFileOnDisk.mockResolvedValueOnce();
						await deleteSubmissionType(req.session, 'comment');
					});
					it('should call the getActiveSubmissionItem function', () => {
						expect(getActiveSubmissionItem).toHaveBeenCalledWith(req.session);
					});
					it('should call the iterateDeleteFileOnDisk function', () => {
						expect(iterateDeleteFileOnDisk).not.toHaveBeenCalled();
					});
					it('should call the deleteKeyFromActiveSubmissionItem function', () => {
						expect(deleteKeyFromActiveSubmissionItem).toHaveBeenCalledWith(req.session, 'files');
					});
				});
			});

			describe('and the submission type value is equal to "upload"', () => {
				beforeEach(async () => {
					await deleteSubmissionType(req.session, 'upload');
				});
				it('should call the deleteKeyFromActiveSubmissionItem function', () => {
					expect(deleteKeyFromActiveSubmissionItem).toHaveBeenCalledWith(req.session, 'comment');
				});
			});
			describe('and the submission type is not equal to "comment" or "upload"', () => {
				beforeEach(async () => {
					await deleteSubmissionType(req.session, 'both');
				});
				it('should call the deleteKeyFromActiveSubmissionItem function', () => {
					expect(deleteKeyFromActiveSubmissionItem).toBeCalledTimes(0);
				});
			});
		});
	});
});
