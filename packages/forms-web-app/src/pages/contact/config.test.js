const { contactRoute } = require('./config');

describe('pages/contact/config', () => {
	describe('#contactRoute', () => {
		it('should return the contact route', () => {
			expect(contactRoute).toEqual('contact');
		});
	});
});
