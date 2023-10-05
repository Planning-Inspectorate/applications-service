const { processGuideSubdirectory, processGuideURL, processGuideTitle } = require('./config');

describe('pages/process-guide/config', () => {
	describe('#processGuideSubdirectory', () => {
		it('should return the planning process subdirectory', () => {
			expect(processGuideSubdirectory).toEqual('decision-making-process-guide');
		});
	});

	describe('#processGuideURL', () => {
		it('should return the planning process url', () => {
			expect(processGuideURL).toEqual('/decision-making-process-guide');
		});
	});

	describe('#processGuideTitle', () => {
		it('should return the planning process title', () => {
			expect(processGuideTitle).toEqual(
				'The process for nationally significant infrastructure projects (NSIPs)'
			);
		});
	});
});
