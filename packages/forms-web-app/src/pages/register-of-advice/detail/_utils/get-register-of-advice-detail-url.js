const { getRegisterOfAdviceURL } = require('../../_utils/get-register-of-advice-url');
const { registerOfAdviceDetailRouteParam } = require('../config');

const getRegisterOfAdviceDetailURL = (detailId = `:${registerOfAdviceDetailRouteParam}`) => {
	const registerOfAdviceURL = getRegisterOfAdviceURL();

	return `${registerOfAdviceURL}/${detailId}`;
};

module.exports = { getRegisterOfAdviceDetailURL };
