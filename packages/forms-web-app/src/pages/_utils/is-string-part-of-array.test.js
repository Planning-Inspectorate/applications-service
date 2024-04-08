const { isStringPartOfArray } = require('./is-string-part-of-array');

describe('_utils/is-string-part-of-array.js', () => {
	describe('#isStringPartOfArray', () => {
		describe('should determine if a string is part of an array regardless of strings case:', () => {
			const mockArray = ['MOCKSTRING'];
			const tests2 = [
				['true if string uppercase and part of the array', 'MOCKSTRING'],
				['true if string is lowercase and part of the array', 'mockstring'],
				['true if string is a mix of upper and lower case and part of the array', 'MOCKstring']
			];

			it('should return false if string is not part of the array', () => {
				expect(isStringPartOfArray(mockArray, 'NOTINARRAY')).toBe(false);
			});

			it.each(tests2)('%s', (name, testString) => {
				expect(isStringPartOfArray(mockArray, testString)).toBe(true);
			});
		});
	});
});
