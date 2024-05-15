const { preExaminationRoute, preExaminationURL, preExaminationI18nNamespace } = require('./config');

describe('pages/process-guide/pre-examination/config', () => {
	it('should return the pre-examination stage config', () => {
		expect(preExaminationRoute).toEqual('pre-examination');
		expect(preExaminationURL).toEqual('/decision-making-process-guide/pre-examination');
		expect(preExaminationI18nNamespace).toEqual('preExamination');
	});
});
