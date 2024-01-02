const { VIEW } = require('../../../../../../lib/views');
const getRedirectUrl = (key) => `/${VIEW.REGISTER[key.toUpperCase()].REGISTRATION_COMPLETE}`;

module.exports = {
	getRedirectUrl
};
