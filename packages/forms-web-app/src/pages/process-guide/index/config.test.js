const { processGuideURL, processGuideTitle, processGuideI18nNamespace } = require('./config');

describe('pages/process-guide/config', () => {
	describe('#processGuideURL', () => {
		it('should return the process guide url', () => {
			expect(processGuideURL).toEqual('/decision-making-process-guide');
		});
	});

	describe('#processGuideTitle', () => {
		it('should return the process guide title', () => {
			expect(processGuideTitle).toEqual(
				'The process for Nationally Significant Infrastructure Projects (NSIPs)'
			);
		});
	});

	describe('#processGuideI18nNamespace', () => {
		it('should return the process guide i18n namespace route', () => {
			expect(processGuideI18nNamespace).toEqual('processGuide');
		});
	});
});
