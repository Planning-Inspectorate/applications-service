const { getOriginURL } = require('../../_utils/get-origin-url');
const { registerOfAdviceRoute } = require('../config');

const getRegisterOfAdviceURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${registerOfAdviceRoute}`;
};

module.exports = { getRegisterOfAdviceURL };
