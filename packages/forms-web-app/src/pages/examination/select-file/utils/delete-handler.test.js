const { deleteHandler } = require('./delete-handler');
const { deleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');
const { deleteFileInSession } = require('../../_utils/file-upload/fileSessionManagement');

jest.mock('../../_utils/file-upload/fileManagement', () => ({
	deleteFileOnDisk: jest.fn()
}));

jest.mock('../../_utils/file-upload/fileSessionManagement', () => ({
	deleteFileInSession: jest.fn()
}));

describe('examination/file-upload/fileValidation', () => {
	describe('#deleteHandler', () => {
		describe('When deleting a file', () => {
			const session = 'mock session';
			const fileName = 'mock-delete-me-file-name';
			beforeEach(() => {
				deleteHandler(session, fileName);
			});
			it('should delete the file from disk', () => {
				expect(deleteFileOnDisk).toHaveBeenCalledWith(fileName);
			});
			it('should delete the file from session', () => {
				expect(deleteFileInSession).toHaveBeenCalledWith(session, fileName);
			});
		});
	});
});
