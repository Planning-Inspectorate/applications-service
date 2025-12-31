const { getMapAccessToken } = require('./get-map-access-token');

jest.mock('node-fetch');
const fetch = require('node-fetch');

describe('_services/get-map-access-token', () => {
	describe('#getMapAccessToken', () => {
		describe('When getting the map access token', () => {
			describe('and there are no issues', () => {
				let mapAccessToken;

				beforeEach(async () => {
					fetch.mockResolvedValue({
						status: 200,
						json: () => Promise.resolve({ access_token: 'mock map access token' })
					});
					mapAccessToken = await getMapAccessToken();
				});

				it('should return the map access token', () => {
					expect(mapAccessToken).toEqual('mock map access token');
				});
			});
		});
	});
});
