const { registerCheckAnswersRoute } = require('../../../_common/check-answers/config');
const { getRegisterMyselfURL } = require('../../_utils/get-register-myself-url');

const getRegisterMyselfCheckAnswersURL = (caseRef) => {
	const registerMyselfURL = getRegisterMyselfURL(caseRef);

	return `${registerMyselfURL}/${registerCheckAnswersRoute}`;
};

module.exports = { getRegisterMyselfCheckAnswersURL };
