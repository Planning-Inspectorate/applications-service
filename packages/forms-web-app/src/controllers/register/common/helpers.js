const getKeyFromUrl = (url) => url.split('/')[2];
const keyMap = (key) => {
	let response;
	if (key === 'myself') {
		response = {
			upperCaseKey: key.toUpperCase(),
			sessionKey: 'mySelfRegdata'
		};
	}

	if (key === 'organisation') {
		response = {
			upperCaseKey: key.toUpperCase(),
			sessionKey: 'orgRegdata'
		};
	}

	if (key === 'agent') {
		response = {
			upperCaseKey: key.toUpperCase(),
			sessionKey: 'behalfRegdata'
		};
	}

	return response;
};

module.exports = {
	keyMap,
	getKeyFromUrl
};
