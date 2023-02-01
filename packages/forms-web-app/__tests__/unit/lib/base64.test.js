const { toBase64, fromBase64 } = require('../../../src/lib/base64');

describe("base64 module's", () => {
	describe('toBase64', () => {
		it('converts text to base64 encoded text', () => {
			expect(toBase64('Hello Workd')).toEqual('SGVsbG8gV29ya2Q=');
		});

		it('handles undefined', () => {
			expect(toBase64(undefined)).toEqual('');
		});
	});

	describe('fromBase64', () => {
		it('converts base64 encoded text to text', () => {
			expect(fromBase64('SGVsbG8gV29ya2Q=')).toEqual('Hello Workd');
		});

		it('handles undefined', () => {
			expect(fromBase64(undefined)).toEqual('');
		});
	});
});
