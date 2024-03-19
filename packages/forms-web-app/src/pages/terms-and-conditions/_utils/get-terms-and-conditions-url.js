const { getOriginURL } = require('../../_utils/get-origin-url');
const { termsAndConditionsRoute } = require('../config');

const getTermsAndConditionsURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${termsAndConditionsRoute}`;
};

module.exports = { getTermsAndConditionsURL };
