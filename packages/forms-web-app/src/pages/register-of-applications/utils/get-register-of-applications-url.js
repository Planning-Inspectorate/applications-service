const { getOriginURL } = require('../../_utils/get-origin-url');
const { registerOfApplicationsRoute } = require('../config');

const getRegisterOfApplicationsURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${registerOfApplicationsRoute}`;
};

module.exports = { getRegisterOfApplicationsURL };
