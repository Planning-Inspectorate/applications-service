const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers, nameAgent, nameMyself, nameOrganisation }
		}
	}
} = require('../../../../routes/config');
const { submittingForOptionValues } = require('../config');

const getRedirectUrl = (query, selectedSubmittingForValue) => {
	let redirectUrl;

	if (isQueryModeEdit(query)) redirectUrl = `${checkYourAnswers.route}`;
	else if (selectedSubmittingForValue === submittingForOptionValues[1])
		redirectUrl = `${nameMyself.route}`;
	else if (selectedSubmittingForValue === submittingForOptionValues[2])
		redirectUrl = `${nameOrganisation.route}`;
	else if (selectedSubmittingForValue === submittingForOptionValues[3])
		redirectUrl = `${nameAgent.route}`;

	return redirectUrl;
};

module.exports = { getRedirectUrl };
