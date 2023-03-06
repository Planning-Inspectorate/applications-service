const {
	getAllCommentsAndFilesLength
} = require('../../../../../../src/controllers/examination/process-submission/utils/get-all-comments-and-files-length');

const {
	getExaminationSubmissionItems
} = require('../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSubmissionItems: jest.fn()
}));

getExaminationSubmissionItems;
describe('controllers/examination/process-submission/utils/get-all-comments-and-files-length', () => {
	describe('#getAllCommentsAndFilesLength', () => {
		describe('When getting the length of all the examination session submission item comments and files', () => {
			describe('and the examination session submission items have comments and files', () => {
				let result;
				beforeEach(() => {
					getExaminationSubmissionItems.mockReturnValue([
						{
							comment: 'mock comment 1',
							files: ['mock file 1', 'mock file 2']
						},
						{
							comment: 'mock comment 2',
							files: []
						},
						{
							files: ['mock file 1', 'mock file 2']
						}
					]);
					result = getAllCommentsAndFilesLength();
				});

				it('should return the total number of submission item comments and files', () => {
					expect(result).toEqual(6);
				});
			});
		});
	});
});
