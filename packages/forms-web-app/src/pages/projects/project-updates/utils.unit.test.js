const { createUpdatesPageUrl } = require('./utils/url-mapper');

describe('#getProjectUpdates utilities:', () => {
	it('- createUpdatesPageUrl should construct correctly formed url', async () => {
		const mockUrl = createUpdatesPageUrl('testCaseRef', 'test');

		expect(mockUrl).toBe(`/projects/testCaseRef/get-updates/test`);
	});
});
