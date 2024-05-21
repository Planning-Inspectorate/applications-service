const { haveYourSayGuideSubdirectory, haveYourSayGuideI18nNamespace } = require('./config');

describe('pages/have-your-say-guide/config', () => {
	describe('#haveYourSayGuideSubdirectory', () => {
		it('should return the have your say guide subdirectory', () => {
			expect(haveYourSayGuideSubdirectory).toEqual('having-your-say-guide');
		});
	});

	describe('#haveYourSayGuideI18nNamespace', () => {
		it('should return the have your say guide i18n namespace', () => {
			expect(haveYourSayGuideI18nNamespace).toEqual('haveYourSayGuide');
		});
	});
});
