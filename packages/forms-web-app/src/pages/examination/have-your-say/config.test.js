const { examinationHaveYourSayI18nNamespace } = require('./config');

describe('pages/examination/have-your-say/config', () => {
	describe('#examinationHaveYourSayI18nNamespace', () => {
		it('should return the examination have your say namespace', () => {
			expect(examinationHaveYourSayI18nNamespace).toEqual('examinationHaveYourSay');
		});
	});
});
