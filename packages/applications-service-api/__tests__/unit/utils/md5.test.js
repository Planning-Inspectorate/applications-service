const { md5 } = require('../../../src/utils/md5');
describe('md5', () => {
	it('returns hash of string', () => {
		expect(md5('hello')).toEqual('5d41402abc4b2a76b9719d911017c592');
	});
});
