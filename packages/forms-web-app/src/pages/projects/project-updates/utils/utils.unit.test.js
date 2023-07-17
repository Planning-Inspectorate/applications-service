const { createUpdatesPageUrl } = require('./url-mapper');

describe('project-updates/utils', () => {
	describe('#createUpdatesPageUrl:', () => {
		it('should construct correctly formed url', async () => {
			const mockUrl = createUpdatesPageUrl('testCaseRef', 'test');

			expect(mockUrl).toBe(`/projects/testCaseRef/get-updates/test`);
		});
	});
});
