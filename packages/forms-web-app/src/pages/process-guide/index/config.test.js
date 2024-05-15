const { processGuideURL, processGuideIndexI18nNamespace } = require('./config');

describe('pages/process-guide/config', () => {
	describe('#processGuideURL', () => {
		it('should return the process guide url', () => {
			expect(processGuideURL).toEqual('/decision-making-process-guide');
		});
	});

	describe('#processGuideIndexI18nNamespace', () => {
		it('should return the process guide index i18n namespace', () => {
			expect(processGuideIndexI18nNamespace).toEqual('processGuideIndex');
		});
	});
});
