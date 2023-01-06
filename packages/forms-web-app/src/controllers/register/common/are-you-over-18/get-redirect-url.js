const { VIEW } = require('../../../../lib/views');
const getRedirectUrl = (query, key, mappy) => {
	let redirectURl = '';
	if (query.mode === 'edit') {
		redirectURl = `/${VIEW.REGISTER[mappy.upperCaseKey].CHECK_YOUR_ANSWERS}`;
	} else if (key === 'organisation') {
		redirectURl = `/${VIEW.REGISTER[mappy.upperCaseKey].ORGANISATION_NAME}`;
	} else {
		redirectURl = `/${VIEW.REGISTER[mappy.upperCaseKey].ADDRESS}`;
	}
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
