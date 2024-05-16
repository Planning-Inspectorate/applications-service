const { examinationRoute, examinationURL, examinationI18nNamespace } = require('./config');

describe('pages/process-guide/examination/config', () => {
	it('should return the examination stage config', () => {
		expect(examinationRoute).toEqual('examination-of-the-application');
		expect(examinationURL).toEqual('/decision-making-process-guide/examination-of-the-application');
		expect(examinationI18nNamespace).toEqual('examination');
	});
});
