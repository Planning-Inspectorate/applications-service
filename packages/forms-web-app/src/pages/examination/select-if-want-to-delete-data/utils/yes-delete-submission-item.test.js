const { yesDeleteSubmissionItem } = require('./yes-delete-submission-item');
const { getDeadlineItemToDelete } = require('../../_session/deadlineItems-session');
const {
	findSubmissionItemToDelete,
	deleteSubmissionItem
} = require('../../_session/submission-items-session');
const { iterateDeleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');

jest.mock('../../_session/deadlineItems-session', () => ({
	getDeadlineItemToDelete: jest.fn()
}));
jest.mock('../../_session/submission-items-session', () => ({
	deleteSubmissionItem: jest.fn(),
	findSubmissionItemToDelete: jest.fn()
}));
jest.mock('../../_utils/file-upload/fileManagement', () => ({
	iterateDeleteFileOnDisk: jest.fn()
}));
describe('#yesDeleteSubmissionItem', () => {
	describe('When the user wants to remove a submitted submission item', () => {
		const mockSession = { mockSession: 'mock session' };
		const mockDeadlineItemToDelete = 1;
		describe('and the submission item has files', () => {
			let mockSubmissionItem = { files: ['mock files'] };
			beforeEach(() => {
				getDeadlineItemToDelete.mockReturnValue(mockDeadlineItemToDelete);
				findSubmissionItemToDelete.mockReturnValue(mockSubmissionItem);
				iterateDeleteFileOnDisk.mockReturnValue();
				deleteSubmissionItem.mockReturnValue();
				yesDeleteSubmissionItem(mockSession);
			});

			it('should find the submission item', () => {
				expect(findSubmissionItemToDelete).toHaveBeenCalledWith(
					mockSession,
					mockDeadlineItemToDelete
				);
			});
			it('should should delete item on the disk', () => {
				expect(iterateDeleteFileOnDisk).toHaveBeenCalledWith(['mock files']);
			});
			it('should delete the submission item', () => {
				expect(deleteSubmissionItem).toHaveBeenCalledWith(mockSession, mockDeadlineItemToDelete);
			});
		});
		describe('and the submission item does not have files', () => {
			let mockSubmissionItem = {};
			beforeEach(() => {
				getDeadlineItemToDelete.mockReturnValue(mockDeadlineItemToDelete);
				findSubmissionItemToDelete.mockReturnValue(mockSubmissionItem);
				iterateDeleteFileOnDisk.mockReturnValue();
				deleteSubmissionItem.mockReturnValue();
				yesDeleteSubmissionItem(mockSession);
			});
			it('should find the submission item', () => {
				expect(findSubmissionItemToDelete).toHaveBeenCalledWith(
					mockSession,
					mockDeadlineItemToDelete
				);
			});
			it('should should not try and deleet item on the disk', () => {
				expect(iterateDeleteFileOnDisk).not.toHaveBeenCalled();
			});
			it('should delete the submission item', () => {
				expect(deleteSubmissionItem).toHaveBeenCalledWith(mockSession, mockDeadlineItemToDelete);
			});
		});
	});
});
