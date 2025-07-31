const { PNG_FILE } = require('../../__data__/file');
const { fetchToken, uploadFile } = require('../../../src/services/ni.api.service');

const mockFormDataAppend = jest.fn();
const mockFormDataHeaders = jest.fn();
const mockFormData = {
	append: (k, v) => mockFormDataAppend(k, v),
	getHeaders: () => mockFormDataHeaders()
};
jest.mock('form-data', () => {
	return function () {
		return mockFormData;
	};
});

jest.mock('../../../src/lib/config.js', () => ({
	ni: {
		host: 'example.com',
		oauth: {
			clientId: 'some-client-id',
			clientSecret: 'some-client-secret',
			username: 'some-username',
			password: 'some-password'
		}
	}
}));

const mockAxiosPost = jest.fn();
jest.mock('../../../src/lib/axios', () => {
	return {
		createAxiosInstance: jest.fn().mockImplementation(() => ({
			post: (url, data, config) => mockAxiosPost(url, data, config)
		}))
	};
});

describe('ni api service', () => {
	afterEach(() => jest.resetAllMocks());
	describe('getToken', () => {
		it('calls post with correct params and headers', async () => {
			mockAxiosPost.mockResolvedValueOnce({
				status: 200,
				data: {
					access_token: 'some-token'
				}
			});
			mockFormDataHeaders.mockReturnValueOnce({
				some: 'header'
			});

			await fetchToken();

			expect(mockAxiosPost).toBeCalledWith('https://example.com', mockFormData, {
				params: {
					oauth: 'token'
				},
				headers: {
					some: 'header'
				},
				auth: {
					username: 'some-client-id',
					password: 'some-client-secret'
				}
			});
		});

		it('throws error when post returns non-200 response', async () => {
			mockAxiosPost.mockResolvedValueOnce({
				status: 500
			});

			await expect(fetchToken()).rejects.toThrowError();
		});
	});

	describe('uploadFile', () => {
		it('calls post with correct data and params', async () => {
			mockAxiosPost.mockResolvedValueOnce({
				status: 200,
				data: {
					access_token: 'some-token'
				}
			});
			mockAxiosPost.mockResolvedValueOnce({
				status: 200
			});

			await uploadFile({
				buffer: PNG_FILE,
				fileName: 'Tiny-1234-1.png',
				mimeType: 'image/png',
				size: 83
			});

			expect(mockAxiosPost.mock.calls[1][0]).toEqual(
				'https://example.com/api/v1/submissionsupload/file'
			);
			expect(mockAxiosPost.mock.calls[1][1]).toEqual(mockFormData);
			expect(mockAxiosPost.mock.calls[1][2]).toEqual({
				params: {
					access_token: 'some-token'
				}
			});
		});
	});
});
