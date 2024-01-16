const { VIEW } = require('../../../../../../lib/views');
const { keys } = require('../../../../../../controllers/register/common/keys');
const getRedirectUrl = (query, key) => {
	let redirectURl = '';
	if (query.mode === 'edit') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].CHECK_YOUR_ANSWERS}`;
	} else if (key === keys.agent) {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].ADDRESS}`;
	} else {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].TELL_US_ABOUT_PROJECT}`;
	}
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
