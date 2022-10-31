const {
	deleteHandler
} = require('../../../../../../src/controllers/examination/select-file/utils/delete-handler');
const {
	deleteFileOnDisk
} = require('../../../../../../src/controllers/examination/file-upload/fileManagement');
const {
	deleteFileInSession
} = require('../../../../../../src/controllers/examination/file-upload/fileSessionManagement');

jest.mock('../../../../../../src/controllers/examination/file-upload/fileManagement', () => ({
	deleteFileOnDisk: jest.fn()
}));

jest.mock(
	'../../../../../../src/controllers/examination/file-upload/fileSessionManagement',
	() => ({
		deleteFileInSession: jest.fn()
	})
);

describe('controllers/examination/file-upload/fileValidation', () => {
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
