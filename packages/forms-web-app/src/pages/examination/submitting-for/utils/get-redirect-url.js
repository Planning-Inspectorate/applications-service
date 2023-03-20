const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers, nameAgent, nameMyself, nameOrganisation, submittingFor }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query, selectedSubmittingForValue) => {
	let redirectUrl;

	if (isQueryModeEdit(query)) redirectUrl = `${checkYourAnswers.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[1].value)
		redirectUrl = `${nameMyself.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[2].value)
		redirectUrl = `${nameOrganisation.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[3].value)
		redirectUrl = `${nameAgent.route}`;

	return redirectUrl;
};

module.exports = { getRedirectUrl };
