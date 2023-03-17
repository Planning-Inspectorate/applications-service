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

const getSummaryListDetails = (session) => {
	const summaryListDetails = [];
	const userHasInterestedPartyNumber = getUserHasInterestedPartyNumber(session);
	const userApplicant = isUserApplicant(session);

	summaryListDetails.push(getSummaryListItemHasInterestedPartyNumber(session));
	if (userHasInterestedPartyNumber)
		summaryListDetails.push(getSummaryListItemInterestedPartyNumber(session));
	if (!userApplicant) summaryListDetails.push(getSummaryListItemSubmittingFor(session));
	if (userApplicant) summaryListDetails.push(getSummaryListApplicant(session));
	if (!userApplicant) summaryListDetails.push(getSummaryListName(session));
	summaryListDetails.push(getSummaryListItemEmail(session));

	return summaryListDetails;
};

module.exports = { getSummaryListDetails };
