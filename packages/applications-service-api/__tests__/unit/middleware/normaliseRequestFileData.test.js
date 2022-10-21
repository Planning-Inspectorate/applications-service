const { normaliseRequestFileData } = require('../../../src/middleware/normaliseRequestFileData');
const { ORIGINAL_REQUEST_FILE_DATA, REQUEST_FILE_DATA } = require('../../__data__/file');

describe('normaliseRequestFileData middleware', () => {
	describe('normaliseRequestFileData', () => {
		it('normalises incoming file properties', () => {
			const req = {
				files: {
					file: ORIGINAL_REQUEST_FILE_DATA
				}
			};

			normaliseRequestFileData(req, {}, jest.fn());

			expect(req.file).toEqual(REQUEST_FILE_DATA);
		});
	});
});
