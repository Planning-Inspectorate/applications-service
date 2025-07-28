const {
	getUserHasInterestedPartyNumber,
	isUserApplicant
} = require('../../_session/deadline/helpers');
const {
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListApplicant,
	getSummaryListName,
	getSummaryListItemEmail
} = require('./summary-list-item');

const getSummaryListDetails = (i18n, session) => {
	const summaryListDetails = [];
	const userHasInterestedPartyNumber = getUserHasInterestedPartyNumber(session);
	const userApplicant = isUserApplicant(session);

	summaryListDetails.push(getSummaryListItemHasInterestedPartyNumber(i18n, session));
	if (userHasInterestedPartyNumber)
		summaryListDetails.push(getSummaryListItemInterestedPartyNumber(i18n, session));
	if (!userApplicant) summaryListDetails.push(getSummaryListItemSubmittingFor(i18n, session));
	if (userApplicant) summaryListDetails.push(getSummaryListApplicant(i18n, session));
	if (!userApplicant) summaryListDetails.push(getSummaryListName(i18n, session));
	summaryListDetails.push(getSummaryListItemEmail(i18n, session));

	return summaryListDetails;
};

module.exports = { getSummaryListDetails };
