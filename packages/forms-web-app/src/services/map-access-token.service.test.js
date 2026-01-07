const { getMapAccessToken } = require('./map-access-token.service');

jest.mock('../api/_services/os-maps-token-oauth.service');
const {
	getMapAccessToken: getOAuthToken
} = require('../api/_services/os-maps-token-oauth.service');

describe('services/map-access-token', () => {
	describe('#getMapAccessToken', () => {
		describe('When getting the map access token', () => {
			describe('and there are no issues', () => {
				let mapAccessToken;

				beforeEach(async () => {
					getOAuthToken.mockResolvedValue('mock map access token');
					mapAccessToken = await getMapAccessToken();
				});

				it('should return the map access token', () => {
					expect(mapAccessToken).toEqual('mock map access token');
				});
			});
		});
	});
});
