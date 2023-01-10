const { objectHandler } = require('./objectHandler');
const getKeyFromUrl = (url) => url.split('/')[2];

const getObjectHandler = (key) => {
	const objThing = objectHandler[key];

	if (!objThing.key) throw new Error('No key matches the registration journey pattern');
	return objThing;
};
module.exports = {
	getKeyFromUrl,
	getObjectHandler
};
