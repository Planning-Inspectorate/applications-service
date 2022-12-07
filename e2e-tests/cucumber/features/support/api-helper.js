const axios = require('axios');

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json'
	}
});

const sendRequest = async function (method, path, body) {
	try {
		return await axiosInstance.request({
			url: path,
			method: method,
			data: body,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		if (!error.response) throw error;
		return error.response;
	}
};

module.exports = {
	sendRequest
};
