const { detailedInformationRoute, detailedInformationI18nNamespace } = require('./config');

describe('pages/detailed-information/config', () => {
	describe('#detailedInformationRoute', () => {
		it('should return the detailed information route', () => {
			expect(detailedInformationRoute).toEqual('detailed-information');
		});
	});

	describe('#detailedInformationI18nNamespace', () => {
		it('should return the detailed information i18n namespace route', () => {
			expect(detailedInformationI18nNamespace).toEqual('detailedInformation');
		});
	});
});
