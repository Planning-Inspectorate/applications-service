const {
	getKeyFromUrl
} = require('../../../../../src/controllers/register/common/get-key-from-url');

describe('#getKeyFromUrl', () => {
	describe('When getting the key form the URL', () => {
		describe('and the key is in the list of valid keys', () => {
			const mockUrl = '/register/myself';
			const response = getKeyFromUrl(mockUrl);
			it('should return the valid key', () => {
				expect(response).toEqual('myself');
			});
		});
		describe('and the key is not in the valid list', () => {
			it('should throw an error', () => {
				const mockUrl = 'register/failure';
				expect(() => getKeyFromUrl(mockUrl)).toThrow(
					'No key matches the registration journey pattern'
				);
			});
		});
	});
});
