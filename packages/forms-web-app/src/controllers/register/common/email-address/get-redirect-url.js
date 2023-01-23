const { VIEW } = require('../../../../lib/views');
const getRedirectUrl = (query, key) => {
	let redirectURl = '';
	if (query.mode === 'edit') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].CHECK_YOUR_ANSWERS}`;
	} else if (key === 'agent') {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].TELEPHONE}`;
	} else {
		redirectURl = `/${VIEW.REGISTER[key.toUpperCase()].ADDRESS}`;
	}
	return redirectURl;
};

module.exports = {
	getRedirectUrl
};
