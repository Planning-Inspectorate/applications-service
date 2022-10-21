const { parseBoolean, parseInteger } = require('../../../src/utils/parse');
describe('parse utils', () => {
	describe('parseBoolean', () => {
		it.each([
			[true, true],
			[false, false],
			['true', true],
			['false', false],
			['hi', null],
			[1, true],
			[0, false],
			[1.1, null],
			[null, null],
			[{}, null]
		])('given %s, returns %s', (input, expected) => {
			expect(parseBoolean(input)).toBe(expected);
		});
	});

	describe('parseInteger', () => {
		it.each([
			[1, 1],
			[1.111, 1],
			['1.111', 1],
			['', null],
			[{}, null]
		])('given %s, returns %s', (input, expected) => {
			expect(parseInteger(input)).toBe(expected);
		});
	});
});
