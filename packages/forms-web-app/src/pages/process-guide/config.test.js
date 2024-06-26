const { processGuideSubdirectory, processGuideI18nNamespace } = require('./config');

describe('pages/process-guide/config', () => {
	describe('#processGuideSubdirectory', () => {
		it('should return the process-guide config', () => {
			expect(processGuideSubdirectory).toEqual('decision-making-process-guide');
		});
	});

	describe('#processGuideI18nNamespace', () => {
		it('should return the process guide i18n namespace', () => {
			expect(processGuideI18nNamespace).toEqual('processGuide');
		});
	});
});
