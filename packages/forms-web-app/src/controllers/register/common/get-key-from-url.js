const { keys } = require('./keys');
const getKeyFromUrl = (url) => {
	const key = url.split('/')[2];
	if (!(key in keys)) throw new Error('No key matches the registration journey pattern');
	return key;
};

module.exports = {
	getKeyFromUrl
};
