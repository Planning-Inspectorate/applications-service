const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const { getUserHasInterestedPartyNumber } = require('../../_session/deadline/helpers');
const { getExaminationApplicantValue } = require('../../_session/deadline/details/applicant');
const { applicantOptionValues } = require('../../applicant/config');
const {
	routesConfig: {
		examination: {
			pages: { applicant, checkYourAnswers, yourInterestedPartyNumber }
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (query, session) => {
	let backLinkUrl;

	if (isQueryModeEdit(query)) backLinkUrl = `${checkYourAnswers.route}`;
	else if (getUserHasInterestedPartyNumber(session))
		backLinkUrl = `${yourInterestedPartyNumber.route}`;
	else if (getExaminationApplicantValue(session) === applicantOptionValues[2])
		backLinkUrl = `${applicant.route}`;
	else throw new Error('Submitting for page back link URL can not be set');

	return backLinkUrl;
};

module.exports = { getBackLinkUrl };
