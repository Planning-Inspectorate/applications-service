const getKeyFromUrl = (url) => url.split('/')[2];

const keyMap = (key) => {
	let response;
	if (key === 'myself') {
		response = {
			upperCaseKey: key.toUpperCase(),
			sessionKey: 'mySelfRegdata',
			viewKey: {
				email: 'EMAIL_ADDRESS'
			}
		};
	}

	if (key === 'organisation') {
		response = {
			upperCaseKey: key.toUpperCase(),
			sessionKey: 'orgRegdata',
			extra: '',
			viewKey: {
				email: 'EMAIL'
			}
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
