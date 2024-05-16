const { contactRoute } = require('./config');

describe('pages/contact/config', () => {
	describe('#contactRoute', () => {
		it('should return the contact route', () => {
			expect(contactRoute).toEqual('contact');
		});
	});

	describe('#contactI18nNamespace', () => {
		it('should return the contact i18n namespace', () => {
			expect(contactRoute).toEqual('contact');
		});
	});
});
