const { isQueryModeEdit } = require('../../../utils/is-query-mode-edit');
const { getUserHasInterestedPartyNumber } = require('../../session/deadline/helpers');
const { getExaminationApplicantValue } = require('../../session/deadline/details/applicant');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { applicant, checkYourAnswers, yourInterestedPartyNumber }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query, session) => {
	let backLinkUrl;

	if (isQueryModeEdit(query)) backLinkUrl = `${directory}${checkYourAnswers.route}`;
	else if (getUserHasInterestedPartyNumber(session))
		backLinkUrl = `${directory}${yourInterestedPartyNumber.route}`;
	else if (getExaminationApplicantValue(session) === applicant.options[2].value)
		backLinkUrl = `${directory}${applicant.route}`;
	else throw new Error('Submitting for page back link URL can not be set');

	return backLinkUrl;
};

module.exports = { getBackLinkUrl };
