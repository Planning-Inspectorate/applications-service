const { myselfObj, organisationObj, agentObj, keys } = require('./keys');
const getKeyFromUrl = (url) => url.split('/')[2];

const keyMap = (key) => {
	let response;
	if (key === keys.myself) response = myselfObj;
	if (key === keys.organisation) response = organisationObj;
	if (key === keys.agent) response = agentObj;

	return response;
};

module.exports = {
	keyMap,
	getKeyFromUrl
};
