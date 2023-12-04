const { getContactURL } = require('./get-contact-url');

describe('pages/contact/_utils/get-contact-url', () => {
	describe('#getContactURL', () => {
		const contactURL = getContactURL();
		it('should return the contact URL', () => {
			expect(contactURL).toEqual('/contact');
		});
	});
});
