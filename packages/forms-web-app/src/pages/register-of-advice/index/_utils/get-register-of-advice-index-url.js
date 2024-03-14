const { getRegisterOfAdviceURL } = require('../../_utils/get-register-of-advice-url');
const { registerOfAdviceIndexRoute } = require('../config');

const getRegisterOfAdviceIndexURL = () => {
	const registerOfAdviceURL = getRegisterOfAdviceURL();
	const registerOfAdviceIndexPath = registerOfAdviceIndexRoute
		? `/${registerOfAdviceIndexRoute}`
		: '';

	return `${registerOfAdviceURL}${registerOfAdviceIndexPath}`;
};

module.exports = { getRegisterOfAdviceIndexURL };
