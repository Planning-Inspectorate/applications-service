const { VIEW } = require('../../../../../../lib/views');
const getRedirectUrl = (query, key) => {
	let redirectURl = '';
	if (query.mode === 'edit') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].CHECK_YOUR_ANSWERS}`;
	} else if (key === 'agent') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].ORGANISATION_NAME}`;
	} else {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].OVER_18}`;
	}
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
