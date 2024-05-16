const { preserveLinebreaks } = require('../../../src/lib/preserve-line-breaks');

describe('lib/preserve-line-breaks', () => {
	describe('preserveLinebreaks', () => {
		it('replaces line breaks with the <br> tag successfully', () => {
			expect(preserveLinebreaks('Items: \n - item 1\n - item 2\n - item 3')).toEqual(
				'Items: <br> - item 1<br> - item 2<br> - item 3'
			);
		});

		it('does not process undefined', () => {
			expect(preserveLinebreaks(undefined)).toEqual(undefined);
		});
	});
});
