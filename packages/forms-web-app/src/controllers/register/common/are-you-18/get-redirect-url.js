const { VIEW } = require('../../../../lib/views');
const { keys } = require('../keys');
const getRedirectUrl = (query, key) => {
	let redirectURl = '';
	if (query.mode === 'edit') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].CHECK_YOUR_ANSWERS}`;
	} else if (key === keys.organisation) {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].ORGANISATION_NAME}`;
	} else {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].EMAIL_ADDRESS}`;
	}
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
