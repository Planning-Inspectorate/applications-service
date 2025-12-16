const { getMapAccessToken } = require('./get-map-token');

global.fetch = jest.fn();

jest.mock('../../../config', () => ({
	maps: {
		osMapsApiKey: 'test-key',
		osMapsApiSecret: 'test-secret'
	}
}));

describe('getMapAccessToken', () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	it('should return access token on successful API call', async () => {
		fetch.mockResolvedValue({
			json: jest.fn().mockResolvedValue({ access_token: 'mock-token' })
		});

		const token = await getMapAccessToken();

		expect(token).toBe('mock-token');
		expect(fetch).toHaveBeenCalledWith('https://api.os.uk/oauth2/token/v1', {
			method: 'POST',
			body: expect.any(URLSearchParams),
			headers: {
				Authorization: 'Basic dGVzdC1rZXk6dGVzdC1zZWNyZXQ='
			}
		});
	});

	it('should throw error when no access token returned', async () => {
		fetch.mockResolvedValue({
			json: jest.fn().mockResolvedValue({})
		});

		await expect(getMapAccessToken()).rejects.toThrow(
			'Map token error: Failed to retrieve map access token'
		);
	});

	it('should throw error when fetch fails', async () => {
		fetch.mockRejectedValue(new Error('Network error'));

		await expect(getMapAccessToken()).rejects.toThrow('Map token error: Network error');
	});
});
