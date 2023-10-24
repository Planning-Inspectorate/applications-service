const { processGuideSubdirectory } = require('./config');

describe('pages/process-guide/config.js', () => {
	it('should return the process-guide config', () => {
		expect(processGuideSubdirectory).toEqual('decision-making-process-guide');
	});
});
