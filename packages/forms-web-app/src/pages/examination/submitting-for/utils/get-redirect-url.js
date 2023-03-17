const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { checkYourAnswers, nameAgent, nameMyself, nameOrganisation, submittingFor }
		}
	}
} = require('../../../../routes/config');

const getRedirectUrl = (query, selectedSubmittingForValue) => {
	let redirectUrl;

	if (isQueryModeEdit(query)) redirectUrl = `${directory}${checkYourAnswers.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[1].value)
		redirectUrl = `${directory}${nameMyself.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[2].value)
		redirectUrl = `${directory}${nameOrganisation.route}`;
	else if (selectedSubmittingForValue === submittingFor.options[3].value)
		redirectUrl = `${directory}${nameAgent.route}`;

	return redirectUrl;
};

module.exports = { getRedirectUrl };
