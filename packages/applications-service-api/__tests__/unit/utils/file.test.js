const { generateRepresentationPDF } = require('../../../src/utils/file');

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

	describe('uploadToBlobStorage', () => {
		it('invokes blob storage client with file', () => {
			// TODO: ASB-1830 - upload file data
			expect(1).toEqual(1);
		});
	});
});
