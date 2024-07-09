const { examinationI18nNamespace } = require('./config');

describe('pages/examination/config', () => {
	describe('#examinationI18nNamespace', () => {
		it('should return the examination namespace', () => {
			expect(examinationI18nNamespace).toEqual('examination');
		});
	});
});
