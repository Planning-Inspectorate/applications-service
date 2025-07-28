const { VIEW } = require('../../../../../../lib/views');
const getRedirectUrl = (key) => `/${VIEW.REGISTER[key.toUpperCase()].REGISTRATION_COMPLETE}`;

const getAlreadySubmittedUrl = (key) => `/${VIEW.REGISTER[key.toUpperCase()].ALREADY_REGISTERED}`;

module.exports = {
	getRedirectUrl,
	getAlreadySubmittedUrl
};
