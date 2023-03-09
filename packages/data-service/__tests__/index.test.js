const { getProjectCount } = require('../src');

describe('index', () => {
	describe('getProjectCount', () => {
		it('returns a count', async () => {
			expect(await getProjectCount()).toEqual(0);
		});
	});
});
