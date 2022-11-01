const FormData = require('form-data');
const { StatusCodes } = require('http-status-codes');

const config = require('../lib/config');
const { createAxiosInstance } = require('../lib/axios');

const API_HOST = `https://${config.ni.host}`;
const axiosInstance = createAxiosInstance(false, config.ni.verboseRequestLogging);

const fetchToken = async () => {
	const formData = new FormData();
	formData.append('grant_type', 'password');
	formData.append('username', config.ni.oauth.username);
	formData.append('password', config.ni.oauth.password);

	const response = await axiosInstance.post(API_HOST, formData, {
		params: {
			oauth: 'token'
		},
		headers: formData.getHeaders(),
		auth: {
			username: config.ni.oauth.clientId,
			password: config.ni.oauth.clientSecret
		}
	});

	if (response.status !== StatusCodes.OK) {
		throw new Error('Unable to fetch OAuth token');
	}

	return response.data;
};

const uploadFile = async (file) => {
	const oauthResponse = await fetchToken();

	const formData = new FormData();
	formData.append('file', file.buffer, {
		filename: file.name,
		contentType: file.mimeType,
		knownLength: file.size
	});

	const response = await axiosInstance.post(`${API_HOST}/api/v1/submissionsupload/file`, formData, {
		params: {
			access_token: oauthResponse.access_token
		}
	});

	if (response.status !== StatusCodes.OK) {
		throw new Error('Error uploading file');
	}
};

module.exports = {
	fetchToken,
	uploadFile
};
