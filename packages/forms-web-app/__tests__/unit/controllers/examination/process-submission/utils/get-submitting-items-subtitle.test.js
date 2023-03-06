const {
	getSubmittingItemsSubtitle
} = require('../../../../../../src/controllers/examination/process-submission/utils/get-submitting-items-subtitle');

const {
	getAllCommentsAndFilesLength
} = require('../../../../../../src/controllers/examination/process-submission/utils/get-all-comments-and-files-length');

jest.mock(
	'../../../../../../src/controllers/examination/process-submission/utils/get-all-comments-and-files-length',
	() => ({
		getAllCommentsAndFilesLength: jest.fn()
	})
);

describe('controllers/examination/process-submission/utils/get-submitting-items-subtitle', () => {
	describe('#getSubmittingItemsSubtitle', () => {
		describe('When getting the submitting items subtitle for the processing submission page', () => {
			describe('and there is one submission item', () => {
				let result;
				beforeEach(() => {
					getAllCommentsAndFilesLength.mockReturnValue(1);
					result = getSubmittingItemsSubtitle();
				});
				it('should return the subtitle', () => {
					expect(result).toEqual('We are processing 1 item');
				});
			});
			describe('and there is more than one submission item', () => {
				let result;
				beforeEach(() => {
					getAllCommentsAndFilesLength.mockReturnValue(2);
					result = getSubmittingItemsSubtitle();
				});
				it('should return the subtitle', () => {
					expect(result).toEqual('We are processing 2 items');
				});
			});
		});
	});
});
