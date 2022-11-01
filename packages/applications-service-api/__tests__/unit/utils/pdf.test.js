const { textToPdf } = require('../../../src/utils/pdf');

describe('pdf utils', () => {
	describe('textToPdf', () => {
		it('given text, returns buffer of pdf file', () => {
			const inputText = "Here's some text";
			const output = textToPdf(inputText);
			expect(output.byteLength).toEqual(3153);
		});
	});
});
