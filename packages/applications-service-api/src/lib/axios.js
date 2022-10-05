const https = require('https');
const axios = require('axios');
const AxiosLogger = require('axios-logger');

const createAxiosInstance = (rejectUnauthorized = true, verboseLogging = false) => {
	const axiosInstance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: rejectUnauthorized
		})
	});

	if (verboseLogging) {
		axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
		axiosInstance.interceptors.response.use(AxiosLogger.responseLogger);
	}

	return axiosInstance;
};

module.exports = {
	createAxiosInstance
};
